import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const vendor = fileURLToPath(new URL('.', import.meta.url));
const app = path.resolve(vendor, '../../film/app');
const syncIndex = process.argv.indexOf('--sync-assets');
const assets = syncIndex < 0 ? null : process.argv[syncIndex + 1];
if (syncIndex >= 0 && (!assets || assets.startsWith('--'))) throw new Error('--sync-assets 需要上游 public 目录路径');
const walk = (dir, rel = '') => fs.readdirSync(path.join(dir, rel), { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(dir, path.join(rel, e.name)) : [path.join(rel, e.name)]);
fs.mkdirSync(app, { recursive: true });
if (assets) fs.cpSync(path.resolve(assets), app, { recursive: true });
for (const rel of walk(app)) {
  if (rel === 'index.html' || /(?:^|[/\\])[^/\\]+-[\w-]{8,}\.(?:js|css)$/.test(rel)) fs.rmSync(path.join(app, rel));
}
await build({ root: vendor, configFile: path.join(vendor, 'vite.config.ts') });
// MOTION-ATLAS: §3.5 public font URLs resolve from the emitted assets stylesheet.
for (const rel of walk(app).filter(f => /\.css$/.test(f) && f.startsWith('assets'))) {
  const file = path.join(app, rel);
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replaceAll('/fonts/', '../fonts/'));
}
fs.mkdirSync(path.join(app, 'film'), { recursive: true });
for (const file of ['clock-shim.js', 'sequence.js']) fs.copyFileSync(path.join(vendor, 'film', file), path.join(app, 'film', file));
let bytes = 0;
for (const rel of walk(app).sort()) { const size = fs.statSync(path.join(app, rel)).size; bytes += size; console.log(`${rel.replaceAll('\\','/')}\t${size}`); }
console.log(`archive build: ${walk(app).length} files, ${bytes} bytes`);

const entry = path.join(app, 'index.html');
let html = fs.readFileSync(entry, 'utf8');
const scripts = [...html.matchAll(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g)].map(m => m[1]);
const styles = [...html.matchAll(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)].map(m => m[1]);
html = html.replace(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/g, '').replace(/<link rel="stylesheet"[^>]*href="[^"]+"[^>]*>/g, '');
const bootstrap = '<script type="module">' +
  'const load = parent.MotionKit.load;' +
  'window.__filmStylesheets = ' + JSON.stringify(styles) + '.map(url => new URL(url, document.baseURI).href);' +
  'await Promise.all(__filmStylesheets.map(url => load.stylesheet(url, {document, fonts:false})));' +
  'for (const url of ' + JSON.stringify(scripts) + ') await import(await load.moduleURL(new URL(url, document.baseURI).href));' +
  '</script>';
fs.writeFileSync(entry, html.replace('</body>', bootstrap + '</body>'));
