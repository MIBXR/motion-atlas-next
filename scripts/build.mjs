#!/usr/bin/env node
// 构建：同步 motion-kit 副本 → 生成站点数据、Prompt 文档、Agent 资料包与 README 计数。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, buildAll, walk } from './lib/catalog.mjs';

let changed = 0;
function writeFile(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  if (fs.existsSync(abs) && fs.readFileSync(abs, 'utf8') === content) return;
  fs.writeFileSync(abs, content);
  changed++;
}

const registryRoot = 'demos/materials/hyperframes-registry/demo/';
const registryData = name => JSON.parse(fs.readFileSync(path.join(ROOT, registryRoot, name), 'utf8'));
const registryCatalog = registryData('catalog-index.json');
const registryPlayable = registryData('local-items.json');
const registryLabels = registryData('labels.json');
const registryInitial = Object.fromEntries(Object.entries(registryPlayable).map(([name, spec]) => {
  const item = registryCatalog.find(item => item.name === name);
  return [name, {
    title: registryLabels.items[name] || name,
    meta: [registryLabels.categories[item.category] || item.category, item.kind === 'template' ? '项目模板' : item.kind === 'block' ? '独立场景' : '场景组件', name, spec.duration + ' 秒', spec.width + ' × ' + spec.height].join(' · '),
    command: item.kind === 'template' ? 'npx hyperframes init <项目> --example ' + name : 'npx hyperframes add ' + name,
    url: item.url,
    link: item.kind === 'template' ? '查看模板源码' : '查看官网示例',
    ratio: spec.width / spec.height,
  }];
}));
const registryMarkup = '<div class="hf-layout"><aside class="hf-aside"><button class="hf-toggle" type="button"></button></aside><div class="hf-main"><div class="hf-stage"></div><section class="hf-info"><p class="hf-meta"></p><div class="hf-actions"><button class="hf-command" type="button"><code></code><span>复制命令</span></button><a></a></div></section></div></div>';
const registryInitialSource = `/* 由 scripts/build.mjs 从 Registry 数据生成，请勿手改 */
(() => {
  const items = ${JSON.stringify(registryInitial)};
  const base = new URL('../', document.currentScript.src).pathname;
  window.prepareHyperFramesRegistry = root => {
    const requested = location.pathname.startsWith(base) && new URLSearchParams(location.search).get('demo');
    const item = items[requested] || items['product-turntable'];
    root.classList.add('hf-pending');
    root.inert = true;
    root.style.setProperty('--hf-ratio', String(item.ratio));
    root.innerHTML = ${JSON.stringify(registryMarkup)};
    root.querySelector('.hf-toggle').textContent = '作品目录 · ' + item.title;
    root.querySelector('.hf-meta').textContent = item.meta;
    root.querySelector('code').textContent = item.command;
    const link = root.querySelector('.hf-actions a');
    link.href = item.url;
    link.textContent = item.link;
  };
})();
`;
writeFile(registryRoot + 'initial.js', registryInitialSource);

// 先同步 kit 副本，再生成资料包的文件清单。
const first = buildAll();
const kitSrc = fs.readFileSync(path.join(ROOT, 'kit/motion-kit.js'));
for (const dir of first.kitTargets) {
  const dest = path.join(ROOT, dir, 'motion-kit.js');
  if (!fs.existsSync(dest) || !fs.readFileSync(dest).equals(kitSrc)) {
    fs.writeFileSync(dest, kitSrc);
    console.log('sync kit →', dir);
  }
}

const { files, cases, patterns, materials } = buildAll();
for (const [rel, content] of Object.entries(files)) writeFile(rel, rel.startsWith('agent/') ? content.replace(/MIBXR\/motion-atlas(?!-next)/g, 'MIBXR/motion-atlas-next') : content);
// 清理已删除条目的旧生成物
for (const dir of ['agent', 'prompts', 'data']) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const rel of walk(dir)) {
    if (!(rel in files)) { fs.rmSync(path.join(ROOT, rel)); console.log('remove', rel); }
  }
}
console.log(`build ok · ${cases.length} cases · ${patterns.length} patterns · ${materials.length} materials · ${changed} files updated`);
