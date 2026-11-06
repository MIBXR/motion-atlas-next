import type { LabState, Clip, VoiceParams } from "./types";
import type { Grid } from "./grid";
import { KITS, EVOICES, KIND, METERS, layer, range, divName } from "./constants";
import { r2, r3, ms, signed } from "./math";
import { totalMs } from "./curve";
import { levelVol } from "./score";
export function createExports(S: LabState, model: Grid) {
const { clip, evs, swingOn } = model;
const duration = () => totalMs(S);
const volume = (lv: string) => levelVol(S, lv);
function patternTracks(c: Clip) {
  const kit = KITS[S.kit], steps = c.bpb * S.div, tracks: Record<string, string[]> = {}, voices: Record<string, VoiceParams> = {}, keyOf = new Map<string, string>();
  for (let s = 0; s < steps; s++) {
    const b = Math.floor(s / S.div), k = s % S.div, lv = k ? 'sub' : b === 0 ? 'bar' : c.acc.has(b) ? 'acc' : 'beat', lvl = volume(lv) / 100;
    if (lvl <= 0) continue;
    for (const [v, lp] of kit[lv]) {
      const [p, lg] = layer(lp), params = Object.assign({}, p); delete params.vel;
      const sig = v + JSON.stringify(params);
      if (!keyOf.has(sig)) {
        let name = v, j = 2;
        while (tracks[name]) name = v + j++;
        keyOf.set(sig, name);
        tracks[name] = Array(steps).fill('.');
        voices[name] = Object.assign({}, params, { gain: r2((S.vol / 100) * lg) });
      }
      const vel = Number(p.vel ?? 1) * lvl;
      tracks[keyOf.get(sig)!][s] = vel >= 0.85 ? 'X' : vel >= 0.55 ? 'x' : 'o';
    }
  }
  const fmt = (arr: string[]) => (S.div > 1 ? range(c.bpb).map((b) => arr.slice(b * S.div, (b + 1) * S.div).join('')).join(' ') : arr.join(''));
  return { tracks: Object.entries(tracks).map(([k, v]) => `${k}: '${fmt(v)}'`).join(', '), voices: Object.entries(voices).map(([k, v]) => `${k}: ${JSON.stringify(v).replace(/"(\w+)":/g, '$1: ').replace(/,/g, ', ').replace(/"/g, "'")}`).join(', ') };
}
function exportText(k: string) {
  const c = clip(), list = evs().filter((e) => e.inLoop), cv = S.curve.join(', '), m = METERS[S.meter];
  const gridMs = ms(c.spb / S.div), swingMs = swingOn() ? ms(((S.swing / 100) * c.spb) / S.div / 3) : 0;
  const ratio = swingOn() ? r2((1 + S.swing / 300) / (1 - S.swing / 300)) : 1;
  const durBeats = r2(S.dur / 1000 / c.spb), totBeats = r2(duration() / 1000 / c.spb);
  const head = `${S.meter} · ${S.bpm} BPM · 网格 ${divName(S, S.div)}${swingMs ? ` · 摇摆 ${S.swing}%` : ''} · 量化强度 ${S.strength}%`;
  if (k === 'css') {
    return `:root {\n  /* 节奏实验室 · ${head} */\n  --ease-main: cubic-bezier(${cv}); /* ${S.preset || '自定义'} */\n  --dur-main: ${S.dur}ms; /* ≈ ${durBeats} 拍 */\n  --stagger: ${S.stag}ms;\n  --beat: ${ms(c.spb)}ms; /* ${S.bpm} BPM，${m.unit === 8 ? '八分' : '四分'}音符 */\n  --bar: ${ms(c.spb * c.bpb)}ms; /* ${S.meter} */\n  --grid: ${gridMs}ms; /* ${divName(S, S.div)} */\n  --swing-delay: ${swingMs}ms; /* 反拍推迟 */\n  --beat-offset: ${S.offset}ms; /* 首拍偏移 */\n${list.map((e, j) => `  --hit-${j + 1}: ${ms(e.snap)}ms; /* ${e.label} ${KIND[e.kind]} */`).join('\n')}\n}\n.item {\n  transition: transform var(--dur-main) var(--ease-main);\n  transition-delay: calc(var(--i) * var(--stagger));\n}\n/* 事件动画在吸附后的时刻触发，例如 */\n.hit-1 { animation-delay: var(--hit-1); }`;
  }
  if (k === 'js') {
    const pt = patternTracks(c);
    return `// MotionKit · 节奏实验室导出 · ${head}\nconst ease = MotionKit.bezier(${cv});\nconst DUR = ${S.dur / 1000}, STAGGER = ${S.stag / 1000}; // 秒\nconst BPM = ${S.bpm}, OFFSET = ${r3(c.o)}, METER = [${m.n}, ${m.unit}]; // 首拍在 OFFSET 秒\nconst GRID = ${S.div}, SWING = ${swingOn() ? r2(S.swing / 100) : 0}; // 每拍格数；摇摆 0–1（1 = 三连音 shuffle）\nconst beat = MotionKit.beats(BPM, OFFSET);\n// 第 i 个元素在时刻 t 的进度\nconst progress = (t, i) => ease(MotionKit.clamp((t - i * STAGGER) / DUR, 0, 1));\n// 事件：原始 → 吸附后（${divName(S, S.div)}网格，强度 ${S.strength}%），单位秒\nconst RAW = [${list.map((e) => r3(e.t)).join(', ')}];\nconst EVENTS = [${list.map((e) => r3(e.snap)).join(', ')}];\n// 声音乐谱：节拍器（${KITS[S.kit].name}）+ 事件（${EVOICES[S.evVoice].name}）\nconst SCORE = [\n  MotionKit.audio.pattern({\n    bpm: BPM, offset: OFFSET, div: GRID, swing: SWING,\n    tracks: { ${pt.tracks} },\n    voices: { ${pt.voices} },\n  }),\n  ...EVENTS.map((t) => ({ t, voice: '${EVOICES[S.evVoice].v}', ${Object.entries(EVOICES[S.evVoice].p).map(([a, b]) => `${a}: ${typeof b === 'string' ? `'${b}'` : b}`).join(', ')}, gain: ${r2((S.vol / 100) * 0.85)} })),\n];\n// MotionKit.audio.attach(timeline, SCORE);`;
  }
  const evText = list.length ? list.map((e) => `${e.snap.toFixed(2)}s（${e.label} ${KIND[e.kind]}${Math.abs(ms(e.dev)) >= 1 ? `，由 ${e.t.toFixed(2)}s 移动 ${signed(ms(e.dev))}` : ''}）`).join('。') : '（暂无）';
  return `动效节奏：${S.meter}拍，${S.bpm} BPM。1拍${ms(c.spb)}ms，1小节${(c.spb * c.bpb).toFixed(2)}s${m.unit === 8 ? '，按八分音符计拍' : ''}。首拍偏移${S.offset}ms，重拍在${c.o.toFixed(3)}s。网格${divName(S, S.div)}，每格${gridMs}ms。${swingMs ? `摇摆${S.swing}%，反拍推迟${swingMs}ms。长短比${ratio}:1。` : ''}量化强度${S.strength}%。关键事件：${evText}。小节重拍放主动作，次强拍放次要强调。反拍放回弹与细节，主动作避免偏离网格几十毫秒。缓动cubic-bezier(${cv})。曲线：${S.preset || '自定义'}。单个元素${S.dur}ms，约${durBeats}拍。错峰${S.stag}ms，${S.count}个元素共${duration()}ms。总时长约${totBeats}拍。${S.align === 'land' ? '最后一个元素在小节重拍落定' : '在小节重拍起步'}。节拍底用${KITS[S.kit].name}音色，分重拍、拍、细分三级音量。事件用${EVOICES[S.evVoice].name}音。起步配呼啸，落定配短促提示音。`;

}
return exportText;
}
