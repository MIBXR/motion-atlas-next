import type { LabState, ClockState, SoundEvent, SoundLog } from "./types";
import type { Grid } from "./grid";
import { audio, live } from "./audio";
export const PROC = 0.006;
export function createClock(S: LabState, model: Grid, gen: (a: number, b: number) => SoundEvent[], notify: () => void) {
const { clip, bump } = model;
const LOOK = 0.15, SAFE = 0.015;
const T: ClockState = { run: false, src: 'perf', t0: 0, p0: 0, bar: 0, cursor: 0, pend: [], rec: null, abPhase: 0 };
const LOG: SoundLog[] = [];
const spb = () => 60 / S.bpm;

const clockOf = (src: string) => (src === 'audio' ? audio.ctx!.currentTime : performance.now() / 1000);
const now = () => clockOf(T.src);
const beatAt = (t: number) => T.p0 + (t - T.t0) / spb();
const timeAt = (p: number) => T.t0 + (p - T.p0) * spb();
const clipAbs = (p: number, c = clip()) => c.o + (p - T.bar) * c.spb;

function heard() {
  if (T.src !== 'audio') return performance.now() / 1000;
  const ctx = audio.ctx!, cur = ctx.currentTime;
  if (ctx.getOutputTimestamp) {
    const ts = ctx.getOutputTimestamp() as Required<AudioTimestamp>;
    if (ts && ts.contextTime > 0 && ts.performanceTime > 0) {
      const h = ts.contextTime + (performance.now() - ts.performanceTime) / 1000;
      if (h <= cur + 0.005 && h > cur - 0.5) return Math.min(h, cur) - PROC;
    }
  }
  return cur - (ctx.outputLatency || ctx.baseLatency || 0) - PROC;
}

function tapClock(stamp: number) {
  if (T.src !== 'audio') return stamp / 1000;
  const ctx = audio.ctx!, ts = ctx.getOutputTimestamp && ctx.getOutputTimestamp() as Required<AudioTimestamp>;
  if (ts && ts.contextTime > 0 && ts.performanceTime > 0) return ts.contextTime + (stamp - ts.performanceTime) / 1000 - PROC;
  return heard() - (performance.now() - stamp) / 1000;
}
function cancelAfter(ref: number) {
  T.pend = T.pend.filter((x) => {
    if (x.when > ref) { x.h.stop(); x.log.x = 1; return false; }
    return true;
  });
}
function start(p0 = 0) {
  if (T.run) return;
  T.src = live() ? 'audio' : 'perf';
  T.t0 = now() + 0.08; T.p0 = p0; T.bar = 0; T.abPhase = 0;
  T.cursor = beatAt(now());
  T.run = true;
  bump();
  tick();
  notify();
}
function stop() {
  if (!T.run) return;
  cancelAfter(now()); // 只取消还没响的；正在响的自然衰减
  T.run = false;
  T.rec = null;
  notify();
}

function rebase(mut?: (p: number | null) => void) {
  if (!T.run) { if (mut) mut(null); bump(); return; }
  const ref = now() + SAFE, p = beatAt(ref);
  if (mut) mut(p);
  bump();
  T.t0 = ref; T.p0 = p;
  cancelAfter(ref);
  T.cursor = p + 1e-9;
  tick();
}

function resched() {
  bump();
  if (!T.run) return;
  const ref = now() + SAFE, p = beatAt(ref);
  cancelAfter(ref);
  T.cursor = p + 1e-9;
  tick();
}
function syncSrc() {
  const want = live() ? 'audio' : 'perf';
  if (want === T.src) return;
  if (!T.run) { T.src = want; return; }
  const p = beatAt(now());
  if (T.src === 'audio' && audio.ctx) cancelAfter(audio.ctx!.currentTime);
  T.src = want;
  T.t0 = now(); T.p0 = p;
  T.cursor = p + 1e-9;
}
function tick() {
  if (!T.run) return;
  syncSrc();
  const t = now();
  if (T.src !== 'audio') { T.cursor = Math.max(T.cursor, beatAt(t)); return; }
  const a = Math.max(T.cursor, beatAt(t - 0.002)), b = beatAt(t + LOOK);
  if (b > a) {
    for (const ev of gen(a, b)) emit(ev, t);
    T.cursor = b;
  }
  if (T.pend.length > 24) T.pend = T.pend.filter((x) => x.when > t - 0.05);
}
function emit(ev: SoundEvent, t: number) {
  const when = timeAt(ev.pos);
  if (when < t - 0.001) return; // 绝不排到过去（卡顿后不会补发一串）
  const meta = audio.meta[ev.v] || {};
  const h = audio.play('lab:at', Object.assign({}, ev.p, {
    v: ev.v, at: when, delay: when - audio.ctx!.currentTime - 0.005, gain: ev.gain * (meta.level ?? 1),
    bus: meta.bus || 'sfx', send: meta.send ?? 0, duck: 0, pan: ev.pan || 0, seed: ev.seed,
  }));
  const log: SoundLog = { k: ev.kind, lv: ev.lv, v: ev.v, pos: ev.pos, when, at: t, cyc: ev.cyc };
  LOG.push(log);
  if (LOG.length > 8000) LOG.splice(0, 2000);
  if (h) T.pend.push({ when, h, log });
}

return { T, LOG, now, heard, tapClock, beatAt, timeAt, clipAbs, start, stop, rebase, resched, syncSrc, tick };
}
export type Clock = ReturnType<typeof createClock>;
