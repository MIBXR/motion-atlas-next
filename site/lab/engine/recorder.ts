import type { LabState, LabPatch } from "./types";
import type { Clock } from "./clock";
import type { Grid } from "./grid";
import { audio, live } from "./audio";
import { EVOICES, KIND } from "./constants";
import { clamp, mod, r3, signed } from "./math";

export function createRecorder(S: LabState, clock: Clock, model: Grid, update: (patch: LabPatch) => void, notify: () => void, toast: (text: string) => void) {
  const { T, clipAbs, beatAt, heard, tapClock, resched } = clock;
  const { clip, snapX, posLabel, kindOf } = model;
  const taps: { dev: number; cls: string }[] = [];
  let feedback = '敲击后显示与最近网格点的偏差。', feedbackClass = '';
  function judge(d: number) {
    const a = Math.abs(d);
    return a <= 12 ? ['正中', 'on'] : a <= 35 ? [d < 0 ? '略早' : '略晚', d < 0 ? 'early' : 'late'] : [d < 0 ? '偏早' : '偏晚', d < 0 ? 'early' : 'late'];
  }
  function padTap(stamp: number) {
    if (S.sound && !audio.enabled) audio.enable();
    const ev = EVOICES[S.evVoice];
    if (live()) audio.play(ev.v, Object.assign({}, ev.p, { gain: (S.vol / 100) * 0.85 }));
    if (!T.run) { feedback = '先点击“播放”，再跟着节拍器敲击。'; notify(); return; }
    const c = clip(), tc = tapClock(stamp) - S.lat / 1000, p = beatAt(tc), x = p - T.bar, q = snapX(x), dev = Math.round((x - q.p) * c.spb * 1000);
    const C = clipAbs(p, c), [word, cls] = judge(dev);
    taps.push({ dev, cls });
    if (taps.length > 24) taps.shift();
    const r = T.rec;
    if (r && (r.state === 'on' || C >= r.start - 0.12)) { r.state = 'on'; r.taps.push(C - r.start); }
    feedbackClass = cls;
    feedback = `${signed(dev)} · ${word}（${posLabel(q, c)} ${KIND[kindOf(q.n, q.k, c)]}）`;
    notify();
    return { dev, pos: p, clip: mod(C, c.L) };
  }
  function recToggle() {
    if (T.rec) { T.rec = null; resched(); notify(); return; }
    if (S.sound && !audio.enabled) audio.enable();
    const c = clip(), fresh = !T.run;
    if (fresh) clock.start(-c.bpb - c.o / c.spb);
    const Ch = clipAbs(beatAt(heard()), c);
    T.rec = { state: 'armed', taps: [], start: fresh ? 0 : (Math.floor(Ch / c.L + 1e-9) + 1) * c.L };
    taps.length = 0;
    resched(); notify();
  }
  function recStep(C: number) {
    const r = T.rec, c = clip();
    if (!r) return;
    if (r.state === 'armed' && C >= r.start - 0.1) r.state = 'on';
    if (r.state !== 'on' || C < r.start + c.L - 0.1) return;
    T.rec = null;
    if (r.taps.length) {
      const ev = r.taps.map(x => r3(mod(x, c.L))).filter(t => t < c.L - 1e-6).sort((a, b) => a - b);
      update({ ev, example: '', mode: 'ab' });
      T.abPhase = Math.round(r.start / c.L) + 1;
      toast(`已录入 ${S.ev.length} 个事件：接下来先播放一圈 A（原始敲击），再播放一圈 B（吸附后）`);
    } else toast('这一圈没有敲击，事件保持不变');
    resched(); notify();
  }
  function calibrate() {
    const mean = taps.reduce((s, t) => s + t.dev, 0) / taps.length;
    update({ lat: clamp(Math.round(S.lat + mean), -150, 150) });
    taps.length = 0;
    toast(`延迟补偿设为 ${signed(S.lat)}`);
    notify();
  }
  function progress(C: number) {
    const r = T.rec, c = clip();
    const value = r?.state === 'on' ? clamp((C - r.start) / c.L, 0, 1) : 0;
    return { value, label: !r ? '录入一遍' : r.state === 'armed' ? `预备 ${Math.max(1, Math.ceil((r.start - C) / c.spb))}…` : `录入中 ${Math.round(value * 100)}%` };
  }
  return { taps, padTap, recToggle, recStep, calibrate, progress, get feedback() { return feedback; }, get feedbackClass() { return feedbackClass; } };
}
