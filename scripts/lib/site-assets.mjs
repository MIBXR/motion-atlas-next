import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

export const ASSET_THRESHOLD = 128 * 1024;
const extensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg', '.mp4', '.webm', '.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.woff', '.woff2', '.otf', '.ttf', '.glb', '.gltf', '.bin', '.blend', '.hdr', '.ply']);

function git(root, args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.error?.message || result.stderr.trim());
  return result.stdout;
}

export function assetSources(root, folders, commit) {
  if (!/^[0-9a-f]{40}$/i.test(commit ?? '')) throw new Error('--commit must be a 40-character hexadecimal commit');
  const baseUrl = `https://raw.githubusercontent.com/MIBXR/motion-atlas-next/${commit}/`;
  const assets = {};
  for (const filename of git(root, ['ls-files', '-co', '--exclude-standard', '-z']).split('\0').filter(Boolean)) {
    if (!folders.some(folder => filename.startsWith(folder + '/')) || !extensions.has(path.posix.extname(filename).toLowerCase())) continue;
    const bytes = fs.statSync(path.join(root, filename)).size;
    if (!filename.startsWith('demos/') && bytes < ASSET_THRESHOLD) continue;
    assets[filename] = { url: baseUrl + filename.split('/').map(encodeURIComponent).join('/'), bytes };
  }
  return { commit, thresholdBytes: ASSET_THRESHOLD, assets };
}

const origin = 'https://motion-atlas.invalid';
export function rewriteURL(value, filename, sources) {
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return value;
  const url = new URL(value.replaceAll('&amp;', '&'), `${origin}/${filename}`);
  const asset = sources.assets[decodeURIComponent(url.pathname.slice(1))];
  return asset ? asset.url + url.search + url.hash : value;
}

export function rewriteCSS(text, filename, sources) {
  return text.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/gi, (all, quote, value) => {
    const url = rewriteURL(value.trim(), filename, sources);
    return url === value.trim() ? all : `url("${url}")`;
  });
}

export function rewriteHTML(text, filename, sources) {
  const rewritten = text.replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<(?:[^>"']|"[^"]*"|'[^']*')+>/gi, token => {
    if (token.startsWith('<!--') || /^<script\b/i.test(token)) return token;
    if (/^<style\b/i.test(token)) return rewriteCSS(token, filename, sources);
    return token.replace(/(\b(?:src|poster|href|style)\s*=\s*)(["'])(.*?)\2/gi, (all, prefix, quote, value) => {
      const url = /^style/i.test(prefix) ? rewriteCSS(value, filename, sources) : rewriteURL(value, filename, sources);
      return url === value ? all : prefix + quote + url.replaceAll('&', '&amp;') + quote;
    });
  });
  const relative = target => path.posix.relative(path.posix.dirname(filename), target);
  const scripts = `<script src="${relative('data/asset-sources.js')}"></script><script src="${relative('site/runtime/asset-runtime.js')}"></script>`;
  return rewritten.replace(/<head\b[^>]*>/i, head => head + scripts);
}
