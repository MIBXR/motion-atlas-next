import type { Meter, LabState, Kit, VoiceParams, EventVoice, Example } from "./types";
export const METERS: Record<string, Meter> = {
  '2/4': { n: 2, unit: 4, groups: [2], hint: '2/4：强—弱，进行曲式的两拍。' },
  '3/4': { n: 3, unit: 4, groups: [3], hint: '3/4：强—弱—弱，圆舞曲式的三拍。' },
  '4/4': { n: 4, unit: 4, groups: [2, 2], hint: '4/4：强—弱—次强—弱，流行音乐与剪辑最常用。' },
  '5/4': { n: 5, unit: 4, groups: [3, 2], hint: '5/4：按 3+2 分组，第 4 拍是次强拍。' },
  '6/8': { n: 6, unit: 8, groups: [3, 3], hint: '6/8：按八分音符计拍（BPM 指八分音符），3+3 分组，听起来是两个大拍、各分三份。' },
  '7/8': { n: 7, unit: 8, groups: [2, 2, 3], hint: '7/8：按八分音符计拍，2+2+3 分组，最后一组长一拍，有“踉跄”感。' },
};
export const accOf = (m: Meter) => { const s = new Set<number>(); let a = 0; for (const g of m.groups) { if (a) s.add(a); a += g; } return s; };
export const DIVS = [1, 2, 3, 4];
export const divName = (S: LabState, d: number) => ({ 1: '拍', 2: '半拍', 3: '三连音', 4: METERS[S.meter].unit === 8 ? '¼ 拍' : '十六分' } as Record<number, string>)[d];

export const KITS: Record<string, Kit> = {
  drum: { name: '鼓组', bar: [['kick', { vel: 1 }], ['rim', { tone: 1.2, vel: 1 }]], acc: [['kick', { vel: 0.45 }], ['rim', { tone: 1.1, vel: 0.95 }]], beat: [['rim', { vel: 0.85 }]], sub: [['hat', { vel: 0.8 }]] },
  wood: { name: '木块', bar: [['tom', { f: 1046, decay: 0.09, vel: 1 }]], acc: [['tom', { f: 932, decay: 0.08, vel: 0.95 }]], beat: [['tom', { f: 784, decay: 0.07, vel: 0.85 }]], sub: [['tick', { f: 2600, vel: 1, g: 2.4 }]] },
  blip: { name: '电子', bar: [['blip', { note: 'A6', vel: 1, g: 2.2 }]], acc: [['blip', { note: 'F#6', vel: 0.95, g: 2.2 }]], beat: [['blip', { note: 'E6', vel: 0.85, g: 2.2 }]], sub: [['tick', { f: 4200, vel: 1, g: 2.6 }]] },
  key: { name: '机械', bar: [['key', { heavy: 1, vel: 1, g: 2.1 }], ['click', { f: 3200, vel: 0.7, g: 2.1 }]], acc: [['key', { heavy: 0.8, vel: 0.95, g: 2.1 }]], beat: [['key', { heavy: 0.6, vel: 0.9, g: 2.2 }]], sub: [['click', { f: 1800, vel: 0.6, g: 1.6 }]] },
};

export const layer = (p: VoiceParams): [VoiceParams, number] => { const q = Object.assign({}, p), g = Number(q.g ?? 1); delete q.g; return [q, g]; };
export const EVOICES: Record<string, EventVoice> = {
  clap: { name: '拍手', v: 'clap', p: { vel: 0.95 } },
  snare: { name: '军鼓', v: 'snare', p: { vel: 0.9 } },
  tom: { name: '通鼓', v: 'tom', p: { f: 165, vel: 0.95 } },
  pluck: { name: '拨弦', v: 'pluck', p: { note: 'E5', vel: 0.9 } },
};
export const MODES: [string, string][] = [['off', '只听节拍器'], ['a', 'A 原始'], ['b', 'B 吸附'], ['ab', 'A/B 交替'], ['both', 'A+B 叠放']];
export const KIND: Record<string, string> = { down: '小节重拍', acc: '次强拍', on: '正拍', off: '反拍 · 切分', trip: '三连音', weak: '十六分弱位' };
const DRAG = [28, 46, 38, 62, 44, 70, 52, 80];
const HUM = [12, -18, 9, 15, -14, 20, -10, 6, -16, 11];
export const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export const EXAMPLES: Record<string, Example> = {
  drag: {
    name: '拖拍', desc: '每拍都有，但一拍比一拍晚（+28～+80ms），像没踩准的剪辑。',
    tip: '把量化强度从 0% 拉到 100%，听拖沓感被一点点拉回拍上。', tries: [['强度 0%', { strength: 0 }], ['强度 50%', { strength: 50 }], ['强度 100%', { strength: 100 }], ['A/B 交替', { mode: 'ab' }]],
    make: (c) => range(c.loopBeats).map((i) => ({ x: i, dev: DRAG[i % DRAG.length] })),
  },
  sync: {
    name: '切分', desc: '3+3+2 的切分节奏：第 2 下落在第 2 拍的后半拍（反拍）上。',
    tip: '切到「拍」网格，反拍上的那一下会被拉到第 3 拍——切分被抹平；切回「半拍」才保留下来。', tries: [['拍网格', { div: 1 }], ['半拍网格', { div: 2 }], ['A/B 交替', { mode: 'ab' }]],
    make: (c) => { const out: { x: number; dev: number }[] = []; for (let b = 0; b < c.bars; b++) for (let x = 0; x < c.bpb - 1e-9; x += 1.5) out.push({ x: b * c.bpb + x, dev: HUM[out.length % HUM.length] }); return out; },
  },
  trip: {
    name: '三连音', desc: '一拍里均分三下（每隔一拍一组）。',
    tip: '「十六分」会把三下吸成不均匀的 1/4、3/4；「半拍」会把两下挤到同一点；只有「三连音」网格吸附正确。', tries: [['半拍网格', { div: 2 }], ['十六分网格', { div: 4 }], ['三连音网格', { div: 3 }]],
    make: (c) => { const out: { x: number; dev: number }[] = []; for (let i = 0; i < c.loopBeats; i++) (i % 2 ? [0] : [0, 1 / 3, 2 / 3]).forEach((f) => out.push({ x: i + f, dev: Math.round(HUM[out.length % HUM.length] * 0.6) })); return out; },
  },
  swing: {
    name: '摇摆', desc: '八分音符成对出现，后一个被推迟到 2/3 处（长短比 2:1）。',
    tip: '直的「半拍」网格会把它拉直、失去摇摆；把摇摆调到 100% 时网格和它吻合，吸附几乎不动。', tries: [['摇摆 0%', { div: 2, swing: 0 }], ['摇摆 60%', { div: 2, swing: 60 }], ['摇摆 100%', { div: 2, swing: 100 }]],
    make: (c) => { const out: { x: number; dev: number }[] = []; for (let i = 0; i < c.loopBeats; i++) [0, 2 / 3].forEach((f) => out.push({ x: i + f, dev: Math.round(HUM[out.length % HUM.length] * 0.5) })); return out; },
  },
  cuts: {
    name: '剪辑点', desc: '一组按秒记录的真实剪辑点（0.31、0.74、1.62、2.05、2.9 秒），不属于任何网格。',
    tip: '剪辑点按秒固定：改 BPM、首拍偏移或细分，看它们分别被吸到哪里。', tries: [['BPM 100', { bpm: 100 }], ['BPM 120', { bpm: 120 }], ['偏移 150ms', { offset: 150 }], ['偏移 0', { offset: 0 }]],
    make: () => [0.31, 0.74, 1.62, 2.05, 2.9].map((t) => ({ t })),
  },
};

export const PRESETS: Record<string, number[]> = {
  snap: [0.2, 0.9, 0.1, 1], glide: [0.25, 0.1, 0.25, 1], emphasized: [0.2, 0, 0, 1],
  exit: [0.4, 0, 1, 1], anticipate: [0.36, 0, 0.66, -0.56], overshoot: [0.34, 1.56, 0.64, 1], linear: [0, 0, 1, 1],
};
