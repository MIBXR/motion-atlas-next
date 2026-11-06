import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'source/registry/registry.json')));
const docs = JSON.parse(fs.readFileSync(path.join(root, 'source/docs/docs.json')));
const previews = JSON.parse(fs.readFileSync(path.join(root, 'source/catalog-previews.json')));
const indexed = new Map();
function visit(value, category) {
  if (typeof value === 'string') {
    const match = value.match(/^catalog\/(blocks|components)\/([^/]+)$/);
    if (match && !indexed.has(match[2])) indexed.set(match[2], {name:match[2], kind:match[1] === 'blocks' ? 'block' : 'component', category, url:'https://hyperframes.heygen.com/'+value, local:fs.existsSync(path.join(root, 'demo/modules', match[2]))});
  } else if (Array.isArray(value)) value.forEach(x => visit(x, category));
  else if (value && typeof value === 'object') Object.values(value).forEach(x => visit(x, value.group || category));
}
visit(docs.navigation);
const catalog = [...indexed.values()];
const commit = 'f0b2dd0cdbd926e32cb11435c53819933fcc1ef3';
for (const {name} of registry.items.filter(x => x.type === 'hyperframes:example')) {
  catalog.push({name, kind:'template', category:'模板', url:`https://github.com/heygen-com/hyperframes/tree/${commit}/registry/examples/${name}`, local:fs.existsSync(path.join(root, 'demo/examples', name))});
}
const local = {};
const placeholders = new Set(['play-mode', 'swiss-grid', 'vignelli', 'warm-grain']);
for (const item of catalog.filter(x => x.local && x.name !== 'vfx-shatter')) {
  const directory = item.kind === 'template' ? placeholders.has(item.name) ? 'examples-preview' : 'examples' : 'modules';
  const dir = path.join(root, 'demo', directory, item.name);
  const metaPath = path.join(dir, 'registry-item.json');
  const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath)) : {};
  const entry = item.kind === 'template' ? 'index.html' : previews[item.name] ? 'catalog-preview.html' : item.name === 'camera-shake' ? 'camera-shake.html' : fs.existsSync(path.join(dir, 'demo.html')) ? 'demo.html' : meta.files.find(x => x.type === 'hyperframes:composition').path;
  const html = fs.readFileSync(path.join(dir, entry), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const tag = html.match(/<[^!][^>]*\sdata-composition-id=["'][^"']+["'][^>]*>/)[0];
  const number = name => Number(tag.match(new RegExp(`\\bdata-${name}=["']([^"']+)["']`))?.[1]);
  local[item.name] = {src:`demo/${directory}/${item.name}/${entry}`, width:number('width'), height:number('height'), duration:number('duration') || meta.duration};
}
fs.writeFileSync(path.join(root, 'demo/catalog-index.json'), JSON.stringify(catalog, null, 2)+'\n');
fs.writeFileSync(path.join(root, 'demo/local-items.json'), JSON.stringify(local, null, 2)+'\n');
console.log(`catalog ${catalog.length}; local ${Object.keys(local).length}`);
