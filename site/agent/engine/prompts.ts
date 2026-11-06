import type { AgentItem, AgentState } from "./types";
import { ROLE_NAME } from "./catalog";
export function createPrompts(S: AgentState, byId: Map<string, AgentItem>) {
function warnings(sel: AgentItem[]) {
  const w: string[] = [];
  const pats = sel.filter((x) => x.kind === 'patterns');
  const f = pats.filter((x) => x.role === 'foundation');
  if (f.length > 1) w.push(`选了 ${f.length} 个骨架（${f.map((x) => x.e.title).join('、')}），通常只保留一个。`);
  if (pats.filter((x) => x.role === 'accent').length > 2) w.push('点睛超过 2 个，容易分散注意力；让它们出现在不同时刻。');
  for (const x of pats) for (const c of (x.e.composition && x.e.composition.conflicts) || []) {
    if (S.sel.includes(c) && x.e.id < c) w.push(`${x.e.title} 与 ${byId.get(c)!.e.title} 标注为冲突，不要放在同一时刻。`);
  }
  return w;
}

function codeText(sel: AgentItem[]) {
  const L: string[] = [];
  const brief = S.brief.trim();
  const base = sel.find((x) => x.kind === 'cases') || sel.find((x) => x.role === 'foundation') || sel[0];
  L.push(`任务：${brief ? `做「${brief}」` : '做一个影像或操作台作品'}，参考下列 Motion Atlas 条目的结构、节奏与参数，内容与品牌换成我的。`, '');
  L.push('先读资料包（本地仓库内），再动手：');
  for (const x of sel) L.push(`- agent/${x.kind}/${x.e.id}.json — ${x.e.title}（${x.kind === 'cases' ? `案例 · ${x.sub}` : `巧思 · ${ROLE_NAME[x.role]}`}）`);
  L.push('', '做法：');
  L.push(`1. 以「${base.e.title}」为底：运行 node scripts/atlas.mjs export ${base.e.id} --out <你的目录>，保留时间结构。时间纯函数作品改 film/ 并用 MotionKit.mountFilm；自有时钟作品自己接 MotionKit；重放巧思在 index.html 配置 MotionKit.replay 的片段。`);
  const others = sel.filter((x) => x !== base);
  if (others.length) L.push(`2. 依次融入：${others.map((x) => `${x.e.title}（${ROLE_NAME[x.role]}）`).join('、')}——按各自资料包 documents.prompt 的“实现 Prompt”与“参数”实现，骨架决定版式，支撑占一个区域，点睛只在关键时刻出现。`);
  L.push(`${others.length ? 3 : 2}. 时间纯函数作品提供 renderAt(t) 与时长、尺寸并调用 MotionKit.mountFilm；自有时钟作品自己接 MotionKit 并提供 window.__motion（见 docs/pipeline.md）。`);
  L.push('', '要点摘录：');
  for (const x of sel) L.push(`【${x.e.title}】${x.e.prompt}`, '');
  const pairs = [...new Set(sel.flatMap((x) => (x.e.composition && x.e.composition.pairsWellWith) || []))].filter((id: string) => !S.sel.includes(id) && byId.has(id)).slice(0, 4);
  L.push('约束：', '- 普通网页文字 ≥ 12px；案例、巧思和画面内文字按设计需要决定字号；功能图标用 SVG。', '- 不使用任何第三方作品的画面、角色、名称、标志、音乐与字体文件。');
  const neg = sel.map((x) => x.e.negativePrompt).filter(Boolean);
  if (neg.length) L.push(`- 避免：${neg.join('；')}`);
  if (pairs.length) L.push(`- 可选搭配：${pairs.map((id) => byId.get(id)!.e.title).join('、')}。`);
  L.push('', '需要成片时：node scripts/render.mjs <入口 HTML> --fps 30。');
  return L.join('\n');
}

function videoText(sel: AgentItem[]) {
  const L: string[] = [];
  const brief = S.brief.trim();
  const base = sel.find((x) => x.e.videoPrompt);
  if (base) {
    L.push(base.e.videoPrompt);
    if (brief) L.push('', `Replace the subject matter with: ${brief}. Keep the duration, beat structure, camera language and transitions.`);
  } else {
    L.push(`${brief ? `${brief}. ` : ''}Motion graphics video, 1920×1080, 20–30 seconds, every cut locked to a steady beat.`);
  }
  const devices = sel.filter((x) => x !== base);
  if (devices.length) {
    L.push('', 'Motion devices to include (one at a time, at key moments):');
    for (const x of devices) L.push(`- ${x.e.title}: ${x.e.effect || x.e.summary}`);
  }
  const neg = sel.map((x) => x.e.negativePrompt).filter(Boolean);
  L.push('', `Negative: ${neg.length ? neg.join('; ') + '; ' : ''}no third-party logos, characters or copyrighted footage; no illegible tiny text.`);
  if (!base) L.push('', '（所选条目都没有视频生成 Prompt：以上为按巧思拼出的骨架，建议再选一个案例作为底稿。）');
  return L.join('\n');
}

return {
  generate(sel: AgentItem[]) {
    return sel.length ? { text: S.target === 'code' ? codeText(sel) : videoText(sel), warning: warnings(sel).join(' ') }
      : { text: '在左侧勾选一个或多个条目。建议：1 个案例或骨架巧思 + 若干支撑与点睛。', warning: '' };
  },
};
}
