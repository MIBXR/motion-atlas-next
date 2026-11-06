#!/usr/bin/env node
// Motion Atlas 命令行：给人和 Agent 用的检索、查看与导出。零依赖。
//   node scripts/atlas.mjs list [--kind cases|patterns|materials] [--json]
//   node scripts/atlas.mjs search <关键词…> [--kind cases|patterns|materials] [--carrier video|console] [--type <巧思类型>] [--limit 8] [--json]
//   node scripts/atlas.mjs show <id> [--source] [--json]
//   node scripts/atlas.mjs export <id> --out <目录> [--code-only] [--force]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, TAXONOMY, loadEntries, entryFiles } from './lib/catalog.mjs';

const argv = process.argv.slice(2);
const [cmd, ...rest] = argv;
const flags = new Set(rest.filter((a) => a.startsWith('--')));
const get = (k, d) => { const i = rest.indexOf(k); return i > -1 && rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[i + 1] : d; };
const VALUED = new Set(['--kind', '--carrier', '--type', '--limit', '--out']);
const positional = rest.filter((a, i) => !a.startsWith('--') && !(i > 0 && VALUED.has(rest[i - 1])));
const asJSON = flags.has('--json');

const { cases, patterns, materials } = loadEntries();
const all = [...cases.map((e) => ({ kind: 'cases', e })), ...patterns.map((e) => ({ kind: 'patterns', e })), ...materials.map((e) => ({ kind: 'materials', e }))];
const strip = ({ _file, ...e }) => e;
const label = (kind, e) => kind === 'cases' ? `案例 · ${e.carriers.map((k) => TAXONOMY.carriers[k]).join(' / ')}` : kind === 'materials' ? `素材 · ${TAXONOMY.materialTypes[e.type]}` : `巧思 · ${e.types.map((k) => TAXONOMY.types[k]).join(' / ')}`;
const find = (id) => all.find((x) => x.e.id === id);
const die = (msg) => { console.error(msg); process.exit(1); };

function usage() {
  console.log(`Motion Atlas CLI
  list    [--kind cases|patterns|materials] [--json]               列出全部条目
  search  <关键词…> [--kind …] [--carrier …] [--type …] [--limit 8] [--json]   检索
  show    <id> [--source] [--json]                                 查看条目、Prompt 与 Demo 文件
  export  <id> --out <目录> [--code-only] [--force]                导出可运行 Demo（含 Prompt 与迁移说明）
载体：${Object.keys(TAXONOMY.carriers).join(', ')}
巧思类型：${Object.keys(TAXONOMY.types).join(', ')}`);
}

// ---------- 检索：分词后在标题、摘要、标签、类型等字段中加权计分 ----------
function haystack(kind, e) {
  const tax = [...(e.carriers || []).map((k) => TAXONOMY.carriers[k]), ...(e.types || []).map((k) => TAXONOMY.types[k])];
  return [
    [3, [e.id, e.title, e.subtitle].join(' ')],
    [2, [...(e.tags || []), ...tax, ...(e.carriers || []), ...(e.types || []), e.type].join(' ')],
    [1.5, [e.summary, e.mechanism, e.trigger, e.effect, e.focus].join(' ')],
    [1, [...(e.useCases || []), ...(e.workflow || []), e.prompt].join(' ')],
  ].map(([w, s]) => [w, String(s || '').toLowerCase()]);
}
function terms(q) {
  const out = [];
  for (const tok of q.toLowerCase().split(/[\s,，、]+/).filter(Boolean)) {
    out.push(tok);
    // 中文词组再拆成二字片段，提高“转场地图”这类连写查询的召回
    const han = tok.match(/\p{Script=Han}+/gu) || [];
    for (const h of han) if (h.length > 2) for (let i = 0; i < h.length - 1; i++) out.push(h.slice(i, i + 2));
  }
  return [...new Set(out)];
}
function search(q) {
  const ts = terms(q);
  return all
    .filter(({ kind }) => !get('--kind') || kind === get('--kind'))
    .filter(({ e }) => !get('--carrier') || (e.carriers || []).includes(get('--carrier')))
    .filter(({ e }) => !get('--type') || (e.types || []).includes(get('--type')))
    .map((x) => {
      const hs = haystack(x.kind, x.e);
      let score = 0;
      for (const t of ts) for (const [w, s] of hs) if (s.includes(t)) score += w * (t.length > 1 ? 1 : 0.3);
      return { ...x, score };
    })
    .filter((x) => !ts.length || x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.id.localeCompare(b.e.id));
}
function printList(rows) {
  if (asJSON) { console.log(JSON.stringify(rows.map(({ kind, e, score }) => ({ kind, id: e.id, title: e.title, summary: e.summary, score, demo: e.demo, bundle: `agent/${kind}/${e.id}.json` })), null, 2)); return; }
  if (!rows.length) { console.log('没有匹配的条目。'); return; }
  for (const { kind, e } of rows) {
    console.log(`${e.id.padEnd(24)} ${e.title}\n${' '.repeat(25)}${label(kind, e)}\n${' '.repeat(25)}${(e.summary || '').slice(0, 90)}${(e.summary || '').length > 90 ? '…' : ''}\n`);
  }
}

// ---------- 查看 ----------
function show(id) {
  const hit = find(id) || die(`没有 id 为 ${id} 的条目。用 list 或 search 查找。`);
  const { kind, e } = hit;
  const files = entryFiles(e);
  if (asJSON) {
    const out = { kind, entry: strip(e), files };
    if (flags.has('--source')) out.source = Object.fromEntries(files.filter((f) => /\.(html|css|js)$/.test(f) && !f.endsWith('motion-kit.js')).map((f) => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]));
    console.log(JSON.stringify(out, null, 2));
    return;
  }
  const L = [];
  L.push(`# ${e.title}  (${e.id})`, label(kind, e), '');
  L.push(e.summary, '');
  if (kind === 'cases') {
    L.push(`可逐帧：${e.timeline ? '是' : '否'}`);
    if (e.rhythm?.beats?.length) L.push('', '## 节拍', ...e.rhythm.beats.map((b) => `- ${b.t.toFixed(2).padStart(6)}s  ${b.label}`));
    if (e.patternIds?.length) L.push('', `巧思：${e.patternIds.join(', ')}`);
  } else if (kind === 'patterns') {
    L.push(`触发：${e.trigger}`, `结果：${e.effect}`, `职责：${TAXONOMY.roles[e.composition?.role] || '-'}`);
    if (e.composition?.pairsWellWith?.length) L.push(`搭配：${e.composition.pairsWellWith.join(', ')}`);
    if (e.composition?.conflicts?.length) L.push(`冲突：${e.composition.conflicts.join(', ')}`);
  } else {
    L.push('', '## 工作流', ...(e.workflow || []).map((step) => `- ${step}`), '', '## 安装方式', e.install);
  }
  if (e.prompt) L.push('', '## 实现 Prompt', e.prompt);
  if (e.videoPrompt) L.push('', '## 视频生成 Prompt', e.videoPrompt);
  if (e.negativePrompt) L.push('', '## 负向约束', e.negativePrompt);
  if (e.migration?.length) L.push('', '## 迁移', ...e.migration.map((m) => `- ${m.field}：${m.how}`));
  L.push('', '## 文件', ...files.map((f) => `- ${f}`), '', `资料包：agent/${kind}/${e.id}.json`);
  if (flags.has('--source')) {
    for (const f of files.filter((x) => /\.(html|css|js)$/.test(x) && !x.endsWith('motion-kit.js'))) {
      L.push('', `----- ${f} -----`, fs.readFileSync(path.join(ROOT, f), 'utf8'));
    }
  }
  console.log(L.join('\n'));
}

// ---------- 导出 ----------
function exportDemo(id) {
  const { kind, e } = find(id) || die(`没有 id 为 ${id} 的条目。`);
  const outArg = get('--out') || die('请用 --out 指定导出目录。');
  const out = path.resolve(outArg);
  if (fs.existsSync(out) && fs.readdirSync(out).length && !flags.has('--force')) die(`${out} 不是空目录；确认覆盖请加 --force。`);
  fs.mkdirSync(out, { recursive: true });
  const copied = [];
  for (const f of entryFiles(e)) {
    const to = path.join(out, f);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(path.join(ROOT, f), to);
    copied.push(f);
  }
  if (!flags.has('--code-only')) {
    const promptDoc = path.join(ROOT, 'prompts', kind, `${e.id}.md`);
    if (fs.existsSync(promptDoc)) fs.writeFileSync(path.join(out, 'PROMPT.md'), fs.readFileSync(promptDoc, 'utf8').replace(/\[([^\]]+)\]\(\.\.\/\.\.\/([^)]+)\)/g, '$1（Motion Atlas 仓库内 `$2`）'));
    const readme = [
      `# ${e.title}`, '', `从 Motion Atlas 导出（${kind === 'cases' ? '案例' : kind === 'materials' ? '素材' : '巧思'} \`${e.id}\`）。`, '', e.summary, '',
      kind === 'materials' ? '## 使用' : '## 运行', '', kind === 'materials' ? `入口为 \`${e.snapshotPath ? e.snapshotPath + e.snapshotEntry : e.demo}\`，按素材原文和使用说明操作。` : `从导出目录启动静态服务器，入口为 \`${e.demo}\`。目录保留仓库相对树，巧思的来源案例在 demos/cases/。`, '',
      kind === 'materials' ? '## 工作流' : '## 迁移', '',
      ...(kind === 'materials' ? (e.workflow || []).map((step) => `- ${step}`) : e.migration?.length ? e.migration.map((m) => `- \`${m.field}\`：${m.how}`) : ['- 案例在 `film/` 修改作品；拆分型巧思在 `mechanism/` 修改机制，在 `source/` 读取可编辑源码与制作资料；重放型巧思在 `index.html` 配置来源片段。']),
      '', e.timeline ? '本 Demo 遵守 render(t) 协议：`window.__motion.seek(t)` 可定位任意时刻；`?render=1` 关闭自动播放，供逐帧渲染。' : '',
      '', '## 文件', '', ...copied.map((f) => `- ${f}`), '',
    ].join('\n');
    fs.writeFileSync(path.join(out, 'README.md'), readme);
    fs.writeFileSync(path.join(out, 'entry.json'), JSON.stringify(strip(e), null, 2) + '\n');
  }
  console.log(`已导出 ${e.id} → ${out}\n${copied.length} 个文件${flags.has('--code-only') ? '' : kind === 'materials' ? ' + README.md、entry.json' : ' + PROMPT.md、README.md、entry.json'}`);
}

switch (cmd) {
  case 'list': printList(all.filter(({ kind }) => !get('--kind') || kind === get('--kind'))); break;
  case 'search': printList(search(positional.join(' ')).slice(0, Number(get('--limit', 8)))); break;
  case 'show': show(positional[0] || die('用法：show <id>')); break;
  case 'export': exportDemo(positional[0] || die('用法：export <id> --out <目录>')); break;
  default: usage(); if (cmd && cmd !== 'help' && cmd !== '--help') process.exitCode = 1;
}
