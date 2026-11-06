import type { LabState, Clip, GridPoint, EventDetail } from "./types";
import { METERS, accOf, EXAMPLES } from "./constants";
import { mod, r3 } from "./math";
export function createGrid(S: LabState) {
function clip() {
  const m = METERS[S.meter], bpb = m.n, spb = 60 / S.bpm, loopBeats = bpb * S.bars, L = loopBeats * spb;
  return { m, bpb, spb, loopBeats, L, bars: S.bars, o: mod(S.offset / 1000, L), acc: accOf(m) };
}
const swingOn = () => S.div === 2 || S.div === 4;

function grid() {
  const d = S.div, sw = swingOn() ? S.swing / 100 : 0, g = [];
  for (let k = 0; k < d; k++) g.push(k / d + (k % 2 ? sw / (3 * d) : 0));
  return g;
}

function snapX(x: number, g = grid(), min = -Infinity) {
  const n0 = Math.floor(x);
  let best: GridPoint | null = null, bd = Infinity;
  for (let n = n0 - 1; n <= n0 + 2; n++) {
    for (let k = 0; k < g.length; k++) {
      const p = n + g[k];
      if (p < min) continue;
      const d = Math.abs(x - p);
      if (d <= bd + 1e-12) { bd = d; best = { p, n, k }; } // 相等时取后一个（与四舍五入一致）
    }
  }
  return best || { p: x, n: n0, k: 0 };
}
function kindOf(n: number, k: number, c: Clip) {
  if (k === 0) { const b = mod(n, c.bpb); return b === 0 ? 'down' : c.acc.has(b) ? 'acc' : 'on'; }
  if (S.div === 3) return 'trip';
  if (S.div === 2 || k === 2) return 'off';
  return 'weak';
}
const posLabel = (q: GridPoint, c: Clip) => `${mod(Math.floor(q.n / c.bpb), S.bars) + 1}.${mod(q.n, c.bpb) + 1}${S.div > 1 ? '.' + (q.k + 1) : ''}`;

let evCache: EventDetail[] | null = null;
const bump = () => { evCache = null; };

function evs() {
  if (evCache) return evCache;
  const c = clip(), g = grid(), s = S.strength / 100, minX = -c.o / c.spb - 1e-9;
  const list = S.ev.map((t, i) => {
    const x = (t - c.o) / c.spb, q = snapX(x, g, minX), full = c.o + q.p * c.spb, snap = t + s * (full - t);
    return { dup: 1, i, t, x, q, full, snap, dev: snap - t, devFull: full - t, kind: kindOf(q.n, q.k, c), label: posLabel(q, c), inLoop: t < c.L - 1e-9 };
  }).sort((a, b) => a.t - b.t || a.i - b.i);
  const cnt = new Map<string, number>();
  list.forEach((e) => { if (e.inLoop) { const k = e.full.toFixed(4); cnt.set(k, (cnt.get(k) || 0) + 1); } });
  list.forEach((e) => { e.dup = cnt.get(e.full.toFixed(4)) || 1; });
  return (evCache = list);
}
function loadExample(id: string) {
  const ex = EXAMPLES[id];
  if (!ex) return;
  const c = clip();
  S.ev = ex.make(c).map((e) => (e.t != null ? e.t : mod(c.o + e.x! * c.spb + e.dev! / 1000, c.L))).filter((t) => t < c.L - 1e-6).map(r3).sort((a, b) => a - b);
  S.example = id;
}

return { clip, grid, swingOn, snapX, kindOf, posLabel, bump, evs, loadExample };
}
export type Grid = ReturnType<typeof createGrid>;
