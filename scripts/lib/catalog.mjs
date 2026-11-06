// entries/、demos/、docs/ → 网站数据与 Agent 资料包。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const labels = JSON.parse(fs.readFileSync(new URL('./labels.json', import.meta.url), 'utf8'));

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SCHEMA_VERSION = 1;

export const TAXONOMY = {
  carriers: labels.cases.carriers,
  styles: labels.cases.style,
  purposes: labels.cases.purpose,
  techs: labels.cases.tech,
  types: labels.patterns.types,
  roles: labels.patterns['composition.role'],
  materialTypes: labels.materials.type,
};

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));

function listJSON(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs).filter((f) => f.endsWith('.json')).map((f) => {
    const file = `${dir}/${f}`;
    let data;
    try { data = JSON.parse(read(file)); } catch (e) { throw new Error(`${file} 不是有效 JSON：${e.message}`); }
    return { file, data };
  });
}

function walk(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    if (e.name === 'node_modules') continue;
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out.sort();
}

export function fileManifest(files) {
  return files.filter(exists).map((p) => {
    const name = path.posix.basename(p);
    const role = /^(?:licen[cs]es?|notice|copying|ofl)(?:[._-]|$)|[-_](?:licen[cs]e|notice|ofl)(?:[._-]|$)/i.test(name) ? 'license'
      : p.includes('/source/') ? 'process'
      : p.includes('/vendor/') ? 'vendor'
      : p.includes('/fonts/') ? 'font'
      : p.startsWith('previews/') ? 'preview'
      : p.startsWith('entries/') ? 'entry'
      : /\.(?:md|txt)$/.test(p) ? 'doc'
      : /\.(?:html|css|m?js|tsx?)$/.test(p) ? 'source' : 'asset';
    return { path: p, bytes: fs.statSync(path.join(ROOT, p)).size, role };
  });
}

export function loadEntries() {
  const cases = listJSON('entries/cases').map((x) => ({ ...x.data, _file: x.file })).sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.id.localeCompare(b.id));
  const patterns = listJSON('entries/patterns').map((x) => ({ ...x.data, _file: x.file })).sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.id.localeCompare(b.id));
  const materials = listJSON('entries/materials').map((x) => ({ ...x.data, _file: x.file })).sort((a, b) => a.order - b.order);
  for (const e of cases) {
    for (const [field, taxonomy] of [['style', 'styles'], ['purpose', 'purposes']]) {
      if (typeof e[field] !== 'string' || !Object.hasOwn(TAXONOMY[taxonomy], e[field])) throw new Error(`${e._file}: 未知或缺少 ${field} ${e[field]}`);
    }
    if (!Array.isArray(e.tech) || !e.tech.length) throw new Error(`${e._file}: tech 必须为非空数组`);
    for (const value of e.tech) {
      if (typeof value !== 'string' || !Object.hasOwn(TAXONOMY.techs, value)) throw new Error(`${e._file}: 未知 tech ${value}`);
    }
  }
  for (const e of materials) {
    if (!Object.hasOwn(TAXONOMY.materialTypes, e.type)) throw new Error(`${e._file}: 未知素材类型 ${e.type}`);
    if (e.snapshotPath) {
      if (e.snapshotPath !== `demos/materials/${e.id}/` || !e.snapshotEntry || !exists(e.snapshotPath + e.snapshotEntry)) throw new Error(`${e._file}: 快照目录或主文档不存在`);
    } else if (e.demo !== `demos/materials/${e.id}/index.html` || !exists(e.demo)) throw new Error(`${e._file}: 素材入口不存在`);
  }
  return { cases, patterns, materials };
}

const clean = (e) => { const { _file, ...rest } = e; return rest; };
const demoDir = (demo) => path.posix.dirname(demo);

function previewFor(kind, id) {
  for (const ext of ['jpg', 'png', 'webp']) {
    const p = `previews/${kind}/${id}.${ext}`;
    if (exists(p)) return p;
  }
  return null;
}

export function entryFiles(e) {
  const kind = (e.snapshotPath || e.demo).split('/')[1];
  const sourceIds = kind === 'patterns' ? (e.sources || []).map(s => s.caseId) : [];
  const dirs = [(e.snapshotPath || demoDir(e.demo)).replace(/\/$/, ''), ...sourceIds.map(id => `demos/cases/${id}`)];
  const previews = [previewFor(kind, e.id), previewFor(kind, `${e.id}-portrait`)].filter(Boolean);
  const documents = [`docs/${kind}/${e.id}.md`, ...sourceIds.map(id => `docs/cases/${id}.md`), e.research].filter(p => p && exists(p));
  return [...new Set([...new Set(dirs)].flatMap(walk).concat(`entries/${kind}/${e.id}.json`, sourceIds.map(id => `entries/cases/${id}.json`), previews, documents, (e.gallery || []).map(image => image.path), e.sourceFiles || []))].sort();
}

function promptDoc(kind, e) {
  const L = [];
  L.push(`# ${e.title}`, '');
  L.push('## 实现 Prompt', '', e.prompt, '');
  if (e.videoPrompt) L.push('## 视频生成 Prompt', '', e.videoPrompt, '');
  if (e.negativePrompt) L.push('## 负向约束', '', e.negativePrompt, '');
  if (e.timing?.length) L.push('## 参数', '', ...e.timing.map((t) => `- **${t.name}**：${t.value}${t.note ? `（${t.note}）` : ''}`), '');
  if (e.tokens?.motion?.length) L.push('## 动效 Token', '', ...e.tokens.motion.map((t) => `- **${t.name}**：${t.value}`), '');
  if (e.constraints?.length) L.push('## 制作约束', '', ...e.constraints.map((c) => `- ${c}`), '');
  if (e.migration?.length) L.push('## 迁移', '', ...e.migration.map((m) => `- \`${m.field}\`：${m.how}`), '');
  const hash = { cases: 'case', patterns: 'pattern', materials: 'material' }[kind];
  L.push(`[${e.snapshotPath ? '打开原文' : '打开 Demo'}](../../${e.snapshotPath ? e.snapshotPath + e.snapshotEntry : e.demo}) · [在库中查看](../../${kind}.html#${hash}/${e.id})`, '');
  return L.join('\n');
}

export function buildAll() {
  const entries = loadEntries();
  const files = {};
  const kitTargets = [];
  const documentsFor = (kind, e) => Object.fromEntries([
    ['research', `docs/${kind}/${e.id}.md`],
    ['fidelity', `demos/${kind}/${e.id}/fidelity.md`],
    ['licenses', `demos/${kind}/${e.id}/LICENSES.md`],
  ].filter(([, p]) => exists(p)));
  const cases = entries.cases.map(c => ({ ...clean(c), ...documentsFor('cases', c), preview: previewFor('cases', c.id), previewPortrait: previewFor('cases', `${c.id}-portrait`) }));
  const patterns = entries.patterns.map(p => ({ ...clean(p), ...documentsFor('patterns', p), preview: previewFor('patterns', p.id), previewPortrait: previewFor('patterns', `${p.id}-portrait`) }));
  const materials = entries.materials.map(r => ({ ...clean(r), ...documentsFor('materials', r), preview: r.preview || r.gallery?.[0]?.path || previewFor('materials', r.id), ...(r.snapshotPath ? { snapshotFiles: walk(r.snapshotPath.replace(/\/$/, '')) } : {}) }));
  for (const e of [...entries.cases, ...entries.patterns, ...entries.materials].filter(e => e.demo)) {
    if (/\bsrc=["'](?:\.\/)?motion-kit\.js["']/.test(read(e.demo))) kitTargets.push(demoDir(e.demo));
  }

  for (const [kind, list] of Object.entries({ cases, patterns, materials })) {
    for (const e of list) if (e.prompt) files[`prompts/${kind}/${e.id}.md`] = promptDoc(kind, e);
  }

  files['docs/cases/README.md'] = ['# 案例研究', '', '| 案例 | 资料 |', '| --- | --- |', ...cases.map(c => `| [${c.title}](../../cases.html#case/${c.id}) | ${c.research ? `[研究](${c.id}.md)` : `[条目](../../entries/cases/${c.id}.json)`} |`), ''].join('\n');
  files['data/asset-sources.js'] = '/* 由 scripts/build.mjs 生成，请勿手改 */\nglobalThis.MotionAtlasAssetSources = {"assets":{}};\n';
  // README 计数块
  if (exists('README.md')) {
    const readme = read('README.md');
    const block = `<!-- counts:start -->\n**${cases.length} 个案例**　·　**${patterns.length} 个巧思**　·　**${materials.length} 个素材**　·　**${cases.filter((c) => c.timeline).length} 个可逐帧渲染的 Demo**\n<!-- counts:end -->`;
    files['README.md'] = readme.replace(/<!-- counts:start -->[\s\S]*?<!-- counts:end -->/, block);
  }

  // Agent 资料包
  const bundleSummaries = { cases: [], patterns: [], materials: [] };
  const kitFile = 'kit/motion-kit.js';
  const entryDocuments = e => Object.fromEntries(['research', 'fidelity', 'licenses'].filter(key => e[key]).map(key => [key, read(e[key])]));
  for (const c of cases) {
    const demoFiles = entryFiles(c);
    const bundle = {
      schemaVersion: SCHEMA_VERSION, kind: 'case', id: c.id, entry: c,
      documents: {
        ...entryDocuments(c),
        prompt: files[`prompts/cases/${c.id}.md`],
      },
      entrypoint: c.demo,
      files: fileManifest(demoFiles),
    };
    const json = JSON.stringify(bundle, null, 2) + '\n';
    files[`agent/cases/${c.id}.json`] = json;
    bundleSummaries.cases.push({
      id: c.id, title: c.title, summary: c.summary, carriers: c.carriers, style: c.style, purpose: c.purpose, tech: c.tech, tags: c.tags || [],
      useCases: c.useCases || [], avoid: c.avoid || [], patternIds: c.patternIds || [], seekable: !!c.timeline,
      bundle: `agent/cases/${c.id}.json`,
    });
  }
  for (const p of patterns) {
    const demoFiles = entryFiles(p);
    const bundle = {
      schemaVersion: SCHEMA_VERSION, kind: 'pattern', id: p.id, pattern: p,
      sourceCases: (p.sources || []).map((s) => ({ caseId: s.caseId, bundle: `agent/cases/${s.caseId}.json` })),
      documents: { ...entryDocuments(p), ...(p.prompt ? { prompt: files[`prompts/patterns/${p.id}.md`] } : {}) },
      entrypoint: p.demo,
      files: fileManifest(demoFiles),
    };
    const json = JSON.stringify(bundle, null, 2) + '\n';
    files[`agent/patterns/${p.id}.json`] = json;
    bundleSummaries.patterns.push({
      id: p.id, title: p.title, summary: p.summary, types: p.types, carriers: p.carriers, role: p.composition?.role || null,
      sourceCases: (p.sources || []).map((s) => s.caseId), pairsWellWith: p.composition?.pairsWellWith || [],
      bundle: `agent/patterns/${p.id}.json`,
    });
  }
  for (const r of materials) {
    const snapshotDocuments = (r.snapshotFiles || []).filter(p => p.endsWith('.md') && p !== r.snapshotPath + r.snapshotEntry).map(p => [p, read(p)]);
    const bundle = {
      schemaVersion: SCHEMA_VERSION, kind: 'materials', id: r.id, material: r,
      documents: {
        ...entryDocuments(r),
        ...(r.snapshotPath ? { snapshot: read(r.snapshotPath + r.snapshotEntry), references: Object.fromEntries(snapshotDocuments) } : {}),
        ...(r.prompt ? { prompt: files[`prompts/materials/${r.id}.md`] } : {}),
      },
      entrypoint: r.snapshotPath ? r.snapshotPath + r.snapshotEntry : r.demo,
      files: fileManifest(entryFiles(r)),
    };
    files[`agent/materials/${r.id}.json`] = JSON.stringify(bundle, null, 2) + '\n';
    bundleSummaries.materials.push({
      id: r.id, title: r.title, summary: r.summary, type: r.type,
      useCases: r.useCases, avoid: r.avoid,
      snapshotPath: r.snapshotPath, snapshotEntry: r.snapshotEntry, demo: r.demo, relatedEntries: r.relatedEntries,
      bundle: `agent/materials/${r.id}.json`,
    });
  }
  for (const kind of ['cases', 'patterns', 'materials']) {
    files[`agent/${kind}/index.json`] = JSON.stringify({ schemaVersion: SCHEMA_VERSION, kind, count: bundleSummaries[kind].length, [kind]: bundleSummaries[kind] }, null, 2) + '\n';
  }
  const catalog = {
    schemaVersion: SCHEMA_VERSION,
    name: 'Motion Atlas',
    description: '影像与操作台参考库，收录按时间线播放的影像视频、交互操作台与展示台案例，以及巧思、节拍表、Prompt 与可运行的 Demo。',
    taxonomy: TAXONOMY,
    protocol: {
      seek: 'entry.timeline 为 true 时，Demo 暴露 window.__motion = { duration, markers, seek(t)→Promise, play(), pause(), on(fn), ready, orient, orients, setOrient(o), audio }；orients 为空表示自适应布局。',
      urlParams: '?embed 隐藏控制条；?render 关闭自动播放供逐帧渲染；?t=秒 定位到指定时刻；?orient=landscape|portrait 固定画幅；?autoplay=0 不自动播放；?sound=1 尝试开启声音。',
      stage: '固定画幅舞台：横屏 1920×1080 / 竖屏 1080×1920，整体等比缩放；声音为乐谱（MotionKit.audio），可离线导出 WAV。见 docs/pipeline.md。',
      mountFilm: '时间纯函数作品提供 renderAt(t)、时长、尺寸与 fps，通过 MotionKit.mountFilm 创建舞台、播放控制与 window.__motion。',
      replay: 'MotionKit.replay 按 segments 引用来源案例片段，提供拼接时间轴、声音同步与宿主协议。',
      kit: kitFile,
    },
    counts: { cases: cases.length, patterns: patterns.length, materials: materials.length },
    caseCatalog: 'agent/cases/index.json',
    patternCatalog: 'agent/patterns/index.json',
    materialCatalog: 'agent/materials/index.json',
    cases: bundleSummaries.cases,
    patterns: bundleSummaries.patterns,
    materials: bundleSummaries.materials,
  };
  files['agent/catalog.json'] = JSON.stringify(catalog, null, 2) + '\n';

  files['data/atlas.json'] = JSON.stringify(buildAtlas(entries, files), null, 2) + '\n';
  return { files, kitTargets, cases, patterns, materials };
}

function buildAtlas(entries, files) {
  const data = {};
  for (const kind of ['cases', 'patterns', 'materials']) {
    data[kind] = entries[kind].map(raw => {
      const e = clean(raw);
      const demoDir = `demos/${kind}/${e.id}/`;
      const $ = {};
      if (kind === 'materials') $.preview = e.preview ?? e.gallery?.[0]?.path ?? previewFor(kind, e.id);
      else {
        $.preview = previewFor(kind, e.id);
        $.previewPortrait = previewFor(kind, `${e.id}-portrait`);
      }
      $.research = e.research ?? (exists(`docs/${kind}/${e.id}.md`) ? `docs/${kind}/${e.id}.md` : undefined);
      $.fidelity = e.fidelity ?? (exists(demoDir + 'fidelity.md') ? demoDir + 'fidelity.md' : undefined);
      $.licenses = exists(demoDir + 'LICENSES.md') ? demoDir + 'LICENSES.md' : undefined;
      $.prompt = exists(`prompts/${kind}/${e.id}.md`) ? `prompts/${kind}/${e.id}.md` : undefined;
      $.agent = `agent/${kind}/${e.id}.json`;
      if (e.snapshotPath && e.snapshotEntry) $.snapshot = e.snapshotPath + e.snapshotEntry;
      return { ...e, $ };
    });
  }
  return { entries: data, docs: buildDocs(files), labels };
}

function walkMd(rel, out) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return;
  for (const d of fs.readdirSync(abs, { withFileTypes: true })) {
    if (d.name === 'node_modules' || d.name === '.git') continue;
    const child = rel + '/' + d.name;
    if (d.isDirectory() || (d.isSymbolicLink() && fs.statSync(path.join(ROOT, child)).isDirectory())) walkMd(child, out);
    else if (d.name.toLowerCase().endsWith('.md')) out.push(child);
  }
}

function docTitle(text, file) {
  let body = text.replace(/^[\uFEFF\u200B-\u200D\u2060]+/, '').replace(/\r\n?/g, '\n');
  const front = {};
  const fm = /^---\n([\s\S]*?)\n---\n?/.exec(body);
  if (fm) {
    body = body.slice(fm[0].length);
    for (const line of fm[1].split('\n')) {
      const m = /^(title|name):\s*(.+)$/.exec(line);
      if (m) front[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
    }
  }
  body = body.replace(/<!--[\s\S]*?-->/g, '').replace(/^(```|~~~)[\s\S]*?^\1/gm, '');
  const h1 = /^#\s+(.+?)\s*#*\s*$/m.exec(body)?.[1];
  let title = h1 ?? front.title ?? front.name ?? path.basename(file).replace(/\.md$/i, '');
  title = title.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/<[^>]+>/g, '').replace(/[*`]/g, '').trim();
  title = title.replace(/\//g, '／');
  return title || path.basename(file);
}

function buildDocs(generated) {
  const files = [];
  for (const top of ['docs', 'demos']) walkMd(top, files);
  for (const p of Object.keys(generated)) if (/^(?:docs|prompts)\/.+\.md$/i.test(p) && !files.includes(p)) files.push(p);
  const rules = labels.DOC_GROUPS.path;
  const docs = files.map(p => {
    let group = '其他';
    for (const [key, name] of Object.entries(rules)) if (key.endsWith('/') ? p.startsWith(key) : p === key) group = name;
    return { path: p, title: docTitle(generated[p] ?? read(p), p), group, hidden: p.startsWith('demos/') || undefined };
  });
  const coll = new Intl.Collator('zh-CN');
  const pinned = ['docs/guide.md', 'docs/rhythm.md', 'docs/prompting.md', 'docs/methodology.md', 'docs/pipeline.md'];
  const rank = p => { const i = pinned.indexOf(p); return i < 0 ? pinned.length : i; };
  return docs.sort((a, b) => rank(a.path) - rank(b.path) || coll.compare(a.title, b.title) || a.path.localeCompare(b.path));
}

export { rel, walk, exists, read };
