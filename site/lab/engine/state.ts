import type { LabState } from "./types";
import { PRESETS, EXAMPLES } from "./constants";
import { r3 } from "./math";
import { createGrid } from "./grid";

export const DEFAULTS: LabState = {
  v: 2, bpm: 120, meter: '4/4', div: 2, swing: 0, offset: 0, kit: 'drum', vol: 80, lv: { bar: 100, beat: 75, sub: 45 }, sound: true,
  bars: 2, strength: 100, mode: 'off', evVoice: 'clap', startCue: true, ev: [], example: 'sync', lat: 0,
  curve: PRESETS.snap, preset: 'snap', dur: 420, stag: 40, dist: 70, count: 6, sync: true, align: 'land', cue: true, trail: false, ghost: false,
  tab: 'css', wavCycles: 2,
};
export const parseEv = (s: string) => String(s || '').split(/[\s,，、;；]+/).map(Number).filter(v => Number.isFinite(v) && v >= 0).map(r3);

export function readState(): LabState {
  const saved = JSON.parse(localStorage.getItem('ma-lab') || '{}') as Partial<LabState>;
  const S = { ...DEFAULTS, ...saved, lv: { ...DEFAULTS.lv, ...saved.lv }, curve: [...(saved.curve ?? DEFAULTS.curve)], ev: [...(saved.ev ?? [])] };
  const sound = localStorage.getItem('ma-sound');
  if (sound !== null) S.sound = JSON.parse(sound);
  if (!saved.ev) createGrid(S).loadExample(EXAMPLES[S.example] ? S.example : 'sync');
  return S;
}
export function createPersistence(S: LabState) {
  let timer = 0;
  const write = () => localStorage.setItem('ma-lab', JSON.stringify(S));
  return {
    save() { clearTimeout(timer); timer = window.setTimeout(write, 200); },
    dispose() { if (timer) { clearTimeout(timer); write(); } },
  };
}
