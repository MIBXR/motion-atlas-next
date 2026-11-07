import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { cp, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sirv from 'sirv';

const appRoot = fileURLToPath(new URL('..', import.meta.url));
const repository = path.resolve(appRoot, '..');

async function walk(directory: string, prefix = ''): Promise<string[]> {
  const children = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(children.map(async child => {
    if (['.git', 'node_modules'].includes(child.name)) return [];
    const name = prefix + child.name;
    const full = path.join(directory, child.name);
    const directoryEntry = child.isDirectory() || (child.isSymbolicLink() && (await stat(full)).isDirectory());
    return directoryEntry ? walk(full, name + '/') : [name];
  }));
  return groups.flat();
}

function titleOf(text: string, file: string) {
  const clean = text.replace(/^\uFEFF/, '').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replace(/<!--[\s\S]*?-->/g, '').replace(/```[\s\S]*?```/g, '');
  return (clean.match(/^#\s+(.+)$/m)?.[1] || text.match(/^(?:title|name):\s*["']?(.+?)["']?\r?$/m)?.[1] || path.basename(file, '.md')).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]+>|[*`]/g, '').trim();
}

export function atlasConfig(library: 'web' | 'motion') {
  const contentRoot = path.join(repository, 'content', library);
  let destination = '';
  let building = false;
  const content: Plugin = {
    name: 'atlas-content',
    configResolved(config) { destination = path.resolve(config.root, config.build.outDir, 'content'); building = config.command === 'build'; },
    resolveId(id) { if (id === 'virtual:atlas') return '\0virtual:atlas'; },
    async load(id) {
      if (id !== '\0virtual:atlas') return;
      const files = await walk(contentRoot);
      const fileSet = new Set(files);
      const labels = JSON.parse(await readFile(path.join(contentRoot, 'labels.json'), 'utf8'));
      const entries = [];
      for (const kind of ['cases', 'patterns', 'materials']) {
        for (const file of files.filter(file => file.startsWith(`entries/${kind}/`) && file.endsWith('.json'))) {
          const entry = JSON.parse(await readFile(path.join(contentRoot, file), 'utf8'));
          if (!entry.preview) entry.preview = entry.gallery?.[0]?.path || ['jpg', 'png', 'webp'].map(extension => `previews/${kind}/${entry.id}.${extension}`).find(name => fileSet.has(name)) || null;
          entry.kind = kind;
          entry.documents = files.filter(name => name.endsWith('.md') && (name.startsWith(`demos/${kind}/${entry.id}/`) || name === `docs/${kind}/${entry.id}.md` || name === `prompts/${kind}/${entry.id}.md`));
          entries.push(entry);
        }
      }
      entries.sort((a, b) => a.order - b.order);
      const rules = labels.groups?.path || labels.DOC_GROUPS?.path;
      const documents = await Promise.all(files.filter(file => /\.md$/i.test(file)).map(async file => {
        const text = await readFile(path.join(contentRoot, file), 'utf8');
        let group = file.startsWith('demos/materials/') ? '素材原文' : '条目文档';
        for (const [prefix, name] of Object.entries(rules || {})) if (file === prefix || (prefix.endsWith('/') && file.startsWith(prefix))) group = String(name);
        return { path: file, title: titleOf(text, file), group, text };
      }));
      const payload = { library, entries, labels, documents, files };
      return `export default ${JSON.stringify(payload)};`;
    },
    configureServer(server) {
      server.middlewares.use('/content', sirv(contentRoot, { dev: true, etag: false }));
    },
    async writeBundle() {
      if (building) await cp(contentRoot, destination, { recursive: true, dereference: true, filter: source => !['.git', 'node_modules'].includes(path.basename(source)) });
    }
  };
  return defineConfig({
    root: path.join(appRoot, library),
    base: './',
    plugins: [react(), content],
    resolve: { alias: { '@': path.join(appRoot, 'arc') }, dedupe: ['react', 'react-dom'] },
    server: { fs: { allow: [repository] } },
    build: { outDir: 'dist', emptyOutDir: true, chunkSizeWarningLimit: 8000 }
  });
}
