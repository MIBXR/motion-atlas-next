import type { LabState } from "./types";
import type { Grid } from "./grid";
import type { createScore } from "./score";
import { audio } from "./audio";
import { PROC } from "./clock";
export function createWav(S: LabState, model: Grid, gen: ReturnType<typeof createScore>) {
const { clip } = model;
function offlineScore(cycles = S.wavCycles) {
  const c = clip(), p0 = -c.o / c.spb, p1 = p0 + cycles * c.loopBeats;
  const list = gen(p0, p1, { c, bar: 0, abPhase: 0, offline: true });
  return {
    dur: cycles * c.L,
    score: list.map((ev) => Object.assign({}, ev.p, { t: Math.max(0, (ev.pos - p0) * c.spb), voice: ev.v, gain: ev.gain, pan: ev.pan || 0, seed: ev.seed, kind: ev.kind })),
  };
}
async function renderWav(cycles = S.wavCycles) {
  const { score, dur } = offlineScore(cycles);

  return audio.renderOffline(score, dur, { sampleRate: 48000, from: PROC, preroll: PROC });
}

return { offlineScore, renderWav };
}
export const wavFilename = (S: LabState) => `motion-atlas-rhythm-${S.bpm}bpm-${S.meter.replace('/', '-')}-${S.wavCycles}x.wav`;
