import type { LabState } from "./types";
import type { Clock } from "./clock";
import type { Grid } from "./grid";
import { clamp, r2 } from "./math";

export const totalMs = (S: LabState) => S.dur + S.stag * (S.count - 1);
export const normalizeCurve = (cv: number[]) => [clamp(cv[0], 0, 1), clamp(cv[1], -1, 2), clamp(cv[2], 0, 1), clamp(cv[3], -1, 2)].map(r2);
export function snapDuration(S: LabState, fraction: number) { return clamp(Math.round((fraction * (60 / S.bpm) * 1000) / 10) * 10, 80, 2000); }
export function snapStagger(S: LabState) { return clamp(Math.round(((60 / S.bpm) / S.div) * 1000 / 5) * 5, 0, 300); }
export function createCurveClock(S: LabState, clock: Clock, model: Grid) {
  let freeStart = performance.now();
  const restartFree = () => { freeStart = performance.now(); };
  function easeClock() {
    const { T, beatAt, heard } = clock;
    if (T.run && S.sync) {
      const c = model.clip(), pH = beatAt(heard()), tb = totalMs(S) / 1000 / c.spb;
      if (S.align === 'land') { const k = Math.floor((pH + tb - T.bar) / c.bpb); return (pH - (T.bar + k * c.bpb - tb)) * c.spb * 1000; }
      const k = Math.floor((pH - T.bar) / c.bpb);
      return (pH - (T.bar + k * c.bpb)) * c.spb * 1000;
    }
    const t = performance.now() - freeStart;
    if (t > totalMs(S) + 700) { restartFree(); return 0; }
    return t;
  }
  return { easeClock, restartFree };
}
