import type { LabState } from "./types";
import { audio, live } from "./audio";
export function createTapTempo(S: LabState, update: (bpm: number) => void) {
  const taps: number[] = [];
  return (stamp: number) => {
    if (S.sound && !audio.enabled) audio.enable();
    if (taps.length && stamp - taps[taps.length - 1] > 2000) taps.length = 0;
    taps.push(stamp);
    if (taps.length > 8) taps.shift();
    if (live()) audio.play('click', { f: 2600, vel: 0.8, gain: S.vol / 100 });
    if (taps.length < 2) return '继续敲…';
    const iv = taps.slice(1).map((t, i) => t - taps[i]), sorted = iv.slice().sort((x, y) => x - y), med = sorted[sorted.length >> 1];
    const good = iv.filter(x => Math.abs(x - med) <= med * 0.25), avg = good.reduce((s, x) => s + x, 0) / good.length;
    update(60000 / avg);
    return `${taps.length} 下 · ${S.bpm} BPM`;
  };
}
