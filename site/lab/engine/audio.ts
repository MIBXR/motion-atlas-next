import type { LabState } from "./types";
import { KITS, layer } from "./constants";
import { clamp, hash } from "./math";

export const MK = window.MotionKit;
export const audio = MK.audio;
export const live = () => audio.state === 'on' && !!audio.ctx && audio.ctx.state === 'running';
audio.define('lab:at', (ctx, out, w, p) => {
  const fn = audio.voices[p.v];
  return fn ? fn(ctx, out, Math.max(Number(p.at), ctx.currentTime), p) : w;
}, { bus: 'sfx', send: 0, level: 1 });

export function setSound(S: LabState, on: boolean) {
  S.sound = on;
  localStorage.setItem('ma-sound', JSON.stringify(on));
  if (on) audio.enable(); else audio.disable();
}
export function shot(v: string, p: Record<string, unknown>, at: number, gain: number, pan = 0, seed = 1) {
  const meta = audio.meta[v] || {};
  audio.play('lab:at', Object.assign({}, p, { v, at, delay: at - audio.ctx!.currentTime - 0.005, gain: gain * (meta.level ?? 1), bus: meta.bus, send: meta.send ?? 0, duck: 0, pan, seed }));
}
export function previewKit(S: LabState, run: boolean) {
  if (run || !live()) return;
  const kit = KITS[S.kit], t0 = audio.ctx!.currentTime + 0.03, step = 0.16;
  const levels: ["bar" | "beat" | "sub", number][] = [['bar', 0], ['sub', 1], ['beat', 2], ['sub', 3]];
  levels.forEach(([lv, i]) => {
    for (const [v, lp] of kit[lv]) {
      const meta = audio.meta[v] || {}, [p, lg] = layer(lp);
      audio.play('lab:at', Object.assign({}, p, { v, at: t0 + i * step, delay: i * step + 0.025, gain: (S.vol / 100) * (S.lv[lv] / 100) * lg * (meta.level ?? 1), bus: meta.bus, send: meta.send ?? 0, duck: 0, seed: hash(v + i) }));
    }
  });
}
export function playCues(S: LabState, run: boolean) {
  if (!S.cue || !live() || (run && S.sync)) return;
  const t0 = audio.ctx!.currentTime + 0.02, tot = (S.dur + S.stag * (S.count - 1)) / 1000;
  shot('whoosh', { dur: clamp(tot, 0.15, 2), dir: 'up', peak: 0.9, vel: 0.6 }, t0, (S.vol / 100) * 1.1, 0, 11);
  for (let i = 0; i < S.count; i++) shot('tick', { f: 2900 + i * 110, vel: 0.85 }, t0 + (i * S.stag + S.dur) / 1000, (S.vol / 100) * 1.3, S.count > 1 ? -0.5 + i / (S.count - 1) : 0, 20 + i);
}
