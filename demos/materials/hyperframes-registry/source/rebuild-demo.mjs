import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {patchMediaPlaceholders} from './initMedia.ts';

const upstream = path.resolve(process.argv[2]);
const root = path.resolve(import.meta.dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'source/registry/registry.json')));
const cdn = JSON.parse(fs.readFileSync(path.join(root, 'source/cdn-map.json')));
const previews = JSON.parse(fs.readFileSync(path.join(root, 'source/catalog-previews.json')));
const modules = `canopy-part-title glass-shard-title product-turntable exploded-stack carousel-orbit-1 carousel-vision-1 carousel-text-circle-1 caption-kinetic-slam caption-pill-karaoke kinetic-type-swap split-flap-board scramble-reveal lt-mask-reveal news-ticker code-diff code-morph terminal-simulator code-snippet-dark-modern domain-warp-dissolve light-leak whip-pan transitions-grid beat-freeze-cut data-chart bar-chart-race world-map app-showcase gallery-tunnel claude-exchange browser-device-stage typed-prompt vector-editor-rig x-post instagram-follow grid-card-assemble logo-sting whiteboard-ink agent-cursor cursor-drag-drop number-wheel streaming-text slot-machine-roll paper-collage-reveal torn-paper-rip parallax-device-dive pull-back-reveal camera-shake grain-overlay ink-bleed-reveal liquid-glass-widgets vfx-shatter flowchart hw-pipeline liquid-metal logo-outro`.split(' ');
const placeholders = new Set(['play-mode', 'swiss-grid', 'vignelli', 'warm-grain']);
const downloaded = new Map();
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(x => x.isDirectory() ? walk(path.join(dir, x.name)) : [path.join(dir, x.name)]);

function rewrite(html, base) {
  return html.replace(/<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\burl\([^)]*\)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/\/[^\r\n]*/g, token => {
    if (token.startsWith('<!--') || token.startsWith('/*') || token.startsWith('//')) return token;
    for (const [url, local] of Object.entries(cdn)) {
      const relative = path.relative(base, path.join(root, local)).replaceAll('\\', '/');
      token = token.replaceAll(url, relative).replaceAll(url.replaceAll('&', '&amp;'), relative);
    }
    return token;
  });
}

function localize(dir, entry) {
  const visited = new Set();
  function visit(relative) {
    const file = path.resolve(dir, relative);
    if (visited.has(file)) return;
    visited.add(file);
    const html = fs.readFileSync(file, 'utf8');
    const live = html.replace(/<!--[\s\S]*?-->/g, '');
    const children = [...live.matchAll(/data-composition-src=["']([^"']+)["']/g)].map(m => path.posix.normalize(path.posix.join(path.posix.dirname(relative), m[1])));
    fs.writeFileSync(file, rewrite(html, path.dirname(file)));
    children.forEach(visit);
  }
  visit(entry);
}

for (const name of modules) {
  const item = registry.items.find(x => x.name === name);
  const dir = path.join(root, 'demo/modules', name);
  fs.cpSync(path.join(upstream, 'registry', item.type.split(':')[1]+'s', name), dir, {recursive:true});
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'registry-item.json')));
  for (const file of meta.files.filter(x => x.url)) {
    const target = path.join(dir, file.path);
    fs.mkdirSync(path.dirname(target), {recursive:true});
    if (downloaded.has(file.url)) fs.copyFileSync(downloaded.get(file.url), target);
    else {
      execFileSync('curl.exe', ['--fail', '--location', '--silent', '--show-error', '--retry', '3', '--retry-all-errors', '--connect-timeout', '20', '--max-time', '180', '--output', target, file.url], {stdio:'inherit', windowsHide:true});
      downloaded.set(file.url, target);
    }
  }
  if (name === 'code-snippet-dark-modern') {
    fs.mkdirSync(path.join(dir, 'assets'), {recursive:true});
    fs.copyFileSync(path.join(dir, 'background.jpeg'), path.join(dir, 'assets/background.jpeg'));
  }
  const entry = fs.existsSync(path.join(dir, 'demo.html')) ? 'demo.html' : meta.files.find(x => x.type === 'hyperframes:composition').path;
  localize(dir, entry);
  if (previews[name]) {
    const gsap = 'https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js';
    const vendor = path.relative(dir, path.join(root, cdn[gsap])).replaceAll('\\', '/');
    const html = previews[name].replace(/data:text\/html;base64,[A-Za-z0-9+/=]+/g, name+'.html').replaceAll(gsap, vendor);
    fs.writeFileSync(path.join(dir, 'catalog-preview.html'), html);
    localize(dir, name+'.html');
  }
  if (name === 'camera-shake') localize(dir, 'camera-shake.html');
  if (name === 'caption-pill-karaoke') fs.writeFileSync(path.join(dir, 'caption-overrides.json'), '[]\n');
  console.log(name);
}
for (const {name} of registry.items.filter(x => x.type === 'hyperframes:example')) {
  const dir = path.join(root, 'demo/examples', name);
  fs.cpSync(path.join(upstream, 'registry/examples', name), dir, {recursive:true});
  if (placeholders.has(name)) {
    const preview = path.join(root, 'demo/examples-preview', name);
    fs.cpSync(path.join(upstream, 'registry/examples', name), preview, {recursive:true});
    for (const file of walk(preview).filter(x => x.endsWith('.html'))) {
      fs.writeFileSync(file, patchMediaPlaceholders(fs.readFileSync(file, 'utf8'), {durationSeconds:10}));
    }
    localize(preview, 'index.html');
    if (name === 'vignelli') fs.writeFileSync(path.join(preview, 'caption-overrides.json'), '[]\n');
  } else localize(dir, 'index.html');
  console.log(name);
}
