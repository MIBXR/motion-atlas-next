import type { LabState, ClockState, Clip, SoundEvent } from "./types";
import type { Grid } from "./grid";
import { KITS, EVOICES, layer } from "./constants";
import { clamp, mod, hash } from "./math";
import { totalMs } from "./curve";
export const levelVol = (S: LabState, lv: string) => (lv === 'sub' ? S.lv.sub : lv === 'beat' ? S.lv.beat : lv === 'acc' ? (S.lv.bar + S.lv.beat) / 2 : S.lv.bar);
export function createScore(S: LabState, model: Grid, T: ClockState) {
const { clip, grid, evs } = model;
function gen(a: number, b: number, opt: { c?: Clip; bar?: number; abPhase?: number; offline?: boolean } = {}): SoundEvent[] {
  const c = opt.c || clip(), bar = opt.bar ?? T.bar, abPhase = opt.abPhase ?? T.abPhase, out: SoundEvent[] = [], g = grid(), vol = S.vol / 100, kit = KITS[S.kit];

  for (let n = Math.floor(a) - 1; n <= Math.ceil(b); n++) {
    const bib = mod(n - bar, c.bpb);
    for (let k = 0; k < g.length; k++) {
      const pos = n + g[k];
      if (pos < a || pos >= b) continue;
      const lv = k ? 'sub' : bib === 0 ? 'bar' : c.acc.has(bib) ? 'acc' : 'beat', lvl = levelVol(S, lv) / 100;
      if (lvl <= 0) continue;
      for (const [v, lp] of kit[lv]) { const [p, lg] = layer(lp); out.push({ kind: 'metro', lv, pos, v, p, gain: vol * lvl * lg, seed: hash(v + Math.round(pos * 1000)) }); }
    }
  }

  const ca = c.o + (a - bar) * c.spb, cb = c.o + (b - bar) * c.spb;
  const m0 = Math.floor(ca / c.L) - 1, m1 = Math.floor(cb / c.L) + 1;
  if (S.mode !== 'off' && !(T.rec && !opt.offline)) {
    const list = evs().filter((e) => e.inLoop), ev = EVOICES[S.evVoice];
    for (let m = m0; m <= m1; m++) {
      const ab = S.mode === 'ab' ? (mod(m - abPhase, 2) ? 'b' : 'a') : S.mode;
      const layers: [string, number][] = ab === 'both' ? [['a', -0.55], ['b', 0.55]] : [[ab, 0]];
      for (const [which, pan] of layers) {
        for (const e of list) {
          const pos = bar + (m * c.L + (which === 'a' ? e.t : e.snap) - c.o) / c.spb;
          if (pos >= a && pos < b) out.push({ kind: which === 'a' ? 'evA' : 'evB', lv: e.i, pos, v: ev.v, p: ev.p, gain: vol * 0.85, pan, seed: hash(which + e.i), cyc: m });
        }
      }
    }
  }
  if (S.startCue) {
    for (let m = m0; m <= m1; m++) {
      const pos = bar + (m * c.L - c.o) / c.spb;
      if (pos >= a && pos < b) out.push({ kind: 'cue0', pos, v: 'blip', p: { note: 'C7', vel: 0.7, decay: 0.07 }, gain: vol * 0.5, seed: 3, cyc: m });
    }
  }

  if (S.sync && S.cue) {
    const tot = totalMs(S) / 1000, tb = tot / c.spb, land = S.align === 'land';
    for (let k = Math.floor((a - bar) / c.bpb) - 1; k <= Math.ceil((b - bar + tb) / c.bpb) + 1; k++) {
      const s0 = bar + k * c.bpb - (land ? tb : 0);
      if (s0 >= a && s0 < b) out.push({ kind: 'cueW', pos: s0, v: 'whoosh', p: land ? { dur: clamp(tot, 0.15, 2), dir: 'up', peak: 0.9, vel: 0.6 } : { dur: clamp(tot, 0.15, 2), dir: 'down', peak: 0.12, vel: 0.55 }, gain: vol * 1.1, seed: 11 });
      for (let i = 0; i < S.count; i++) {
        const pos = s0 + (i * S.stag + S.dur) / 1000 / c.spb;
        if (pos >= a && pos < b) out.push({ kind: 'cueT', lv: i, pos, v: 'tick', p: { f: 2900 + i * 110, vel: 0.85 }, gain: vol * 1.3, pan: S.count > 1 ? -0.5 + i / (S.count - 1) : 0, seed: 20 + i });
      }
    }
  }
  return out;
}

return gen;
}
