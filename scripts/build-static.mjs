import fs from 'node:fs';
import path from 'node:path';
import { build } from 'vite';
import { ROOT } from './lib/catalog.mjs';
import { assetSources, rewriteCSS, rewriteHTML } from './lib/site-assets.mjs';
import './build.mjs';

const args = process.argv.slice(2);
let site = false, commit;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--site') site = true;
  else if (args[i] === '--commit') commit = args[++i];
  else throw new Error('Usage: node scripts/build-static.mjs [--site --commit <40-character commit>]');
}
const directories = ['agent', 'data', 'demos', 'docs', 'entries', 'kit', 'previews', 'prompts', 'scripts/templates', 'site/runtime', 'site/icons'];
const sources = site ? assetSources(ROOT, directories, commit) : { assets: {} };
const output = path.join(ROOT, 'dist');
await build({ configFile: path.join(ROOT, 'vite.config.ts') });

for (const directory of directories) {
  fs.cpSync(path.join(ROOT, directory), path.join(output, directory), { recursive: true, filter: file => !sources.assets[path.relative(ROOT, file).split(path.sep).join('/')] });
}
fs.copyFileSync(path.join(ROOT, 'asset-cache-worker.js'), path.join(output, 'asset-cache-worker.js'));

const files = [], names = new Set();
function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.includes('@')) names.add(entry.name);
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(file);
    else files.push(file);
  }
}
collect(output);
let rewrittenFiles = 0, replacements = 0;
for (const file of files) {
  if (!/\.(?:html?|m?js|css|json|svg|md)$/i.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  let count = 0;
  const rewritten = text.replace(/[^/\\\s"'<>()[\]{}?#=]*%40[^/\\\s"'<>()[\]{}?#=]*/g, value => {
    if (!names.has(decodeURIComponent(value))) return value;
    count += (value.match(/%40/g) || []).length;
    return value.replaceAll('%40', '@');
  });
  if (!count) continue;
  fs.writeFileSync(file, rewritten);
  rewrittenFiles++;
  replacements += count;
}
console.log(`%40 paths · ${rewrittenFiles} files · ${replacements} replacements`);

if (site) fs.writeFileSync(path.join(output, 'data/asset-sources.js'), `globalThis.MotionAtlasAssetSources = ${JSON.stringify(sources)};\n`);
let bytes = 0, count = 0;
for (const file of files) {
  const filename = path.relative(output, file).split(path.sep).join('/');
  if (site && /\.(?:html|css)$/.test(filename)) {
    const text = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, filename.endsWith('.html') ? rewriteHTML(text, filename, sources) : rewriteCSS(text, filename, sources));
  }
  count++;
  bytes += fs.statSync(file).size;
}
const omittedBytes = Object.values(sources.assets).reduce((sum, asset) => sum + asset.bytes, 0);
console.log(`static site ready · dist/ · ${site ? 'site' : 'local'} · ${count} files · ${bytes} bytes (${(bytes / 1024 / 1024).toFixed(2)} MiB)`);
if (site) console.log(`GitHub media · ${Object.keys(sources.assets).length} files · ${omittedBytes} bytes · commit ${sources.commit}`);
