import type { LabPatch } from "./types";
import { readState, createPersistence } from "./state";
import { createGrid } from "./grid";
import { createClock, PROC } from "./clock";
import { createScore } from "./score";
import { createWav } from "./wav";
import { createExports } from "./exports";
import { createTapTempo } from "./taps";
import { createRecorder } from "./recorder";
import { createCurveClock, normalizeCurve } from "./curve";
import { audio, setSound, previewKit, playCues } from "./audio";
import { METERS, KITS, EVOICES } from "./constants";
import { clamp, r3 } from "./math";

export function createLab() {
  const S = readState(), model = createGrid(S), persistence = createPersistence(S);
  let version = 0, message = '', tapInfo = '';
  const listeners = new Set<() => void>(), frames = new Set<() => void>();
  const notify = () => { version++; listeners.forEach(fn => fn()); };
  const toast = (text: string) => { message = text; notify(); };
  const clock = createClock(S, model, (a, b) => gen(a, b), notify), { T } = clock;
  const gen = createScore(S, model, T), wav = createWav(S, model, gen), exportText = createExports(S, model);
  const curveClock = createCurveClock(S, clock, model);
  const recorder = createRecorder(S, clock, model, update, notify, toast);
  const tempo = createTapTempo(S, bpm => update({ bpm }));
  let frame = { beat: null as number | null, time: performance.now() }, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function update(patch: LabPatch) {
    const tempo = patch.bpm != null && clamp(Math.round(patch.bpm), 40, 240) !== S.bpm;
    const meter = patch.meter && patch.meter !== S.meter && METERS[patch.meter] ? patch.meter : null;
    const next = { ...patch };
    delete next.bpm; delete next.meter;
    if (next.lv) { S.lv = { ...S.lv, ...next.lv }; delete next.lv; }
    const curCycle = () => Math.floor(clock.clipAbs(clock.beatAt(clock.heard())) / model.clip().L);
    if (next.mode === 'ab' && S.mode !== 'ab' && T.run) T.abPhase = curCycle();
    const exId = next.example; delete next.example;
    Object.assign(S, next);
    if (exId !== undefined) S.example = exId;
    if (exId) { model.loadExample(exId); if (S.mode === 'off') { S.mode = 'ab'; if (T.run) T.abPhase = curCycle(); } }
    if (tempo || meter) clock.rebase(p => {
      if (tempo) S.bpm = clamp(Math.round(patch.bpm!), 40, 240);
      if (meter) {
        const ob = METERS[S.meter].n, nb = METERS[meter].n;
        S.meter = meter;
        if (p !== null) { const s0 = T.bar + Math.floor((p - T.bar) / ob) * ob; T.bar = p - s0 < nb - 1e-9 ? s0 : Math.ceil(p - 1e-9); }
      }
    });
    else clock.resched();
    persistence.save(); notify();
  }
  function start(p0 = 0) {
    if (S.sound) { localStorage.setItem('ma-sound', 'true'); audio.enable(); }
    clock.start(p0);
  }
  const toggle = () => T.run ? clock.stop() : start();
  const tapTempo = (stamp: number) => { tapInfo = tempo(stamp); notify(); };
  function applySnap() {
    const n = model.evs().filter(e => Math.abs(e.dev) > 5e-4).length;
    update({ ev: model.evs().map(e => r3(e.snap)).sort((a, b) => a - b), example: '' });
    toast(n ? `已把 ${n} 个事件改为吸附后的时刻` : '事件已经都在网格上');
  }
  function connect() {
    let raf = 0;
    const draw = () => {
      clock.tick();
      const beat = T.run ? clock.beatAt(clock.heard()) : null;
      if (beat !== null) recorder.recStep(clock.clipAbs(beat));
      T.vis = { heard: T.run ? clock.heard() : null, beat };
      frame = { beat, time: performance.now() };
      frames.forEach(fn => fn());
      raf = requestAnimationFrame(draw);
    };
    const key = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target as HTMLElement, tag = el.tagName;
      const typing = tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable || (tag === 'INPUT' && !['range', 'checkbox', 'radio'].includes((el as HTMLInputElement).type)) || el.closest('[role="combobox"], [role="option"]');
      if (typing) return;
      const k = e.key.toLowerCase();
      if (e.key === ' ' || e.code === 'Space') {
        if (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY' || (tag === 'INPUT' && (el as HTMLInputElement).type !== 'range')) return;
        e.preventDefault(); if (!e.repeat) toggle();
      } else if (k === 't' && !e.repeat) tapTempo(e.timeStamp);
      else if (k === 'j' && !e.repeat) { e.preventDefault(); recorder.padTap(e.timeStamp); }
      else if (k === 'r' && !e.repeat) recorder.recToggle();
      else if (k === 'a' && !e.repeat) update({ mode: 'a' });
      else if (k === 'b' && !e.repeat) update({ mode: 'b' });
      else if (k === 'x' && !e.repeat) update({ mode: 'ab' });
    };
    const visible = () => { if (!document.hidden) clock.tick(); };
    const mq = matchMedia('(prefers-reduced-motion: reduce)'), reduce = () => { reduced = mq.matches; notify(); };
    const off = audio.on('change', () => { clock.syncSrc(); notify(); });
    const timer = window.setInterval(clock.tick, 25);
    document.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', visible);
    mq.addEventListener('change', reduce);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf); clearInterval(timer); off();
      document.removeEventListener('keydown', key); document.removeEventListener('visibilitychange', visible); mq.removeEventListener('change', reduce);
      clock.stop(); audio.disable(); persistence.dispose();
    };
  }
  return {
    S, T, ...model, ...wav, exportText, update, clock, recorder, curveClock, start, stop: clock.stop, toggle, tapTempo, applySnap, toast, connect,
    get message() { return message; }, get tapInfo() { return tapInfo; }, get reduced() { return reduced; },
    dismissToast() { message = ''; notify(); },
    sound(on: boolean) { setSound(S, on); persistence.save(); notify(); },
    kit(id: string) { update({ kit: id }); previewKit(S, T.run); },
    setCurve(cv: number[], preset = '') { update({ curve: normalizeCurve(cv), preset }); },
    replay() { curveClock.restartFree(); playCues(S, T.run); },
    subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; },
    subscribeFrame(fn: () => void) { frames.add(fn); return () => { frames.delete(fn); }; },
    snapshot: () => version, frame: () => frame,
    debug: { S, PROC, ...model, ...wav, ...clock, exportText, update, start, stop: clock.stop, padTap: recorder.padTap, tapTempo, recToggle: recorder.recToggle, KITS, EVOICES,
      clock: () => ({ src: T.src, run: T.run, now: T.run ? clock.now() : null, heard: T.run ? clock.heard() : null, beat: T.run ? clock.beatAt(clock.heard()) : null, bar: T.bar, t0: T.t0, p0: T.p0, abPhase: T.abPhase }),
      async render(cycles: number) { const r = await wav.renderWav(cycles); return { peakDb: r.peakDb, rmsDb: r.rmsDb, clipped: r.clipped, events: r.events, duration: r.duration, b64: await r.base64() }; },
    },
  };
}
export type Lab = ReturnType<typeof createLab>;
