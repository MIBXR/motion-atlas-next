import { build } from 'esbuild';

await build({
  entryPoints: ['../film/entry.tsx'],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  jsx: 'automatic',
  minify: false,
  legalComments: 'inline',
  define: { 'process.env.NODE_ENV': '"production"' },
  loader: { '.json': 'json' },
  nodePaths: ['./node_modules'],
  outfile: '../film/film.js',
});
