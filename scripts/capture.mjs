#!/usr/bin/env node
// 生成卡片预览：用无头 Edge/Chrome 打开每个 Demo，定位到 entry.previewAt 秒并截图。
//   横屏：?orient=landscape，视口 1280×720（固定画幅舞台 1920×1080 等比缩到 2/3）→ previews/<kind>/<id>.jpg
//   竖屏：?orient=portrait，视口 720×1280 → previews/<kind>/<id>-portrait.jpg（只在 Demo 使用 MotionKit.stage() 且支持竖屏时生成）
//   竖屏时刻用 entry.previewAtPortrait（缺省同 previewAt）。
// 用法：node scripts/capture.mjs [--only id1,id2] [--kind cases|patterns|materials] [--orient both|landscape|portrait] [--base http://localhost:4321] [--w 1280 --h 720]
//        [--out <目录>（默认 previews）] [--url <页面> --t <秒>]（--url 截任意页面，例如模板；输出 <out>/<kind>/<目录名>.jpg（--url 需指定 --kind））
// 需要先启动 npm start（或任意静态服务器指向仓库根目录）。
import fs from 'node:fs';
import path from 'node:path';
import { launch } from './lib/cdp.mjs';
import { ROOT, loadEntries } from './lib/catalog.mjs';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const base = get('--base', 'http://localhost:4321').replace(/\/$/, '');
const only = get('--only', '') ? new Set(get('--only').split(',')) : null;
const kind = get('--kind', 'all');
const orientArg = get('--orient', 'both');
const w = Number(get('--w', 1280)), h = Number(get('--h', 720));
const outRoot = path.resolve(ROOT, get('--out', 'previews'));
const urlArg = get('--url', null);

const { cases, patterns, materials } = loadEntries();
if (!['all', 'cases', 'patterns', 'materials'].includes(kind)) throw new Error('未知条目类别：' + kind);
if (urlArg && kind === 'all') throw new Error('--url 需指定 --kind cases|patterns|materials');
const jobs = Object.entries({ cases, patterns, materials }).flatMap(([dir, list]) => list.filter(e => e.demo).map(e => ({ e, dir }))).filter(({ e, dir }) => !urlArg && (kind === 'all' || dir === kind) && (!only || only.has(e.id)));
if (urlArg) {
  const demo = urlArg.replace(/^https?:\/\/[^/]+\//, '').replace(/^\//, '').replace(/\?.*$/, '');
  jobs.push({ e: { id: path.posix.basename(path.posix.dirname(demo)), demo, previewAt: Number(get('--t', 0)) }, dir: kind });
}

let ok = 0, portraits = 0;

async function checkRenderer(page, renderers) {
  const renderer = await page.eval(`(() => {
    const docs = [document];
    for (const doc of docs) {
      for (const frame of doc.querySelectorAll('iframe')) if (frame.contentDocument) docs.push(frame.contentDocument);
      for (const canvas of doc.querySelectorAll('canvas')) {
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) continue;
        const info = gl.getExtension('WEBGL_debug_renderer_info');
        if (!info) throw new Error('无法读取 WebGL UNMASKED_RENDERER_WEBGL');
        return gl.getParameter(info.UNMASKED_RENDERER_WEBGL);
      }
    }
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const gl = canvas.getContext('webgl');
    try {
      if (!gl) throw new Error('无法创建 WebGL renderer 探针');
      const info = gl.getExtension('WEBGL_debug_renderer_info');
      if (!info) throw new Error('无法读取 WebGL UNMASKED_RENDERER_WEBGL');
      return gl.getParameter(info.UNMASKED_RENDERER_WEBGL);
    } finally {
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    }
  })()`);
  renderers.add(renderer);
  if (/swiftshader|llvmpipe|software|microsoft basic render/i.test(renderer)) {
    throw new Error(`需要 GPU，当前为软件渲染：${renderer}`);
  }
}

async function shoot(browser, e, dir, orient, renderers) {
  const portrait = orient === 'portrait';
  const page = await browser.newPage();
  const [vw, vh] = portrait ? [h, w] : [w, h];
  await page.viewport(vw, vh);
  const url = `${base}/${e.demo}?render=1&orient=${orient}`;
  const out = path.join(outRoot, dir, `${e.id}${portrait ? '-portrait' : ''}.jpg`);
  try {
    await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
    await page.goto(url, 45000);
    const hasMotion = await page.eval('new Promise(r => { let n = 0; const iv = setInterval(() => { if (window.__motion || ++n > 120) { clearInterval(iv); r(!!window.__motion); } }, 100); })', 120000);
    if (hasMotion) {
      await page.eval('Promise.resolve(window.__motion.ready).then(() => true)', 60000);
      if (e.renderer === 'gpu') await checkRenderer(page, renderers);
      const orients = await page.eval('window.__motion.orients || []');
      if (portrait && !orients.includes('portrait')) return 'skip';
      const t = (portrait ? e.previewAtPortrait : null) ?? e.previewAt ?? 0;
      await page.eval(`window.__motion.pause(), window.__motion.seek(${t})`, 120000);
      await page.eval('new Promise(r => setTimeout(r, 700))');
      await page.eval(`window.__motion.seek(${t})`, 120000);
    } else {
      if (portrait) return 'skip';
      if (e.previewScript) await page.eval(e.previewScript, 20000);
      await page.eval(`new Promise(r => setTimeout(r, ${e.previewWait ?? 1500}))`);
      if (e.renderer === 'gpu') await checkRenderer(page, renderers);
    }
    await page.eval(`(async () => {
      const docs = [document];
      for (const doc of docs) {
        for (const frame of doc.querySelectorAll('iframe')) if (frame.contentDocument) docs.push(frame.contentDocument);
        await doc.fonts.ready;
        await Promise.all([...doc.images].filter(image => {
          const rect = image.getBoundingClientRect();
          const style = doc.defaultView.getComputedStyle(image);
          return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < doc.defaultView.innerHeight && style.visibility !== 'hidden';
        }).map(image => image.decode()));
      }
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    })()`, 60000);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await page.screenshot(out, { format: 'jpeg', quality: 82 });
    return 'ok';
  } finally {
    try { await page.send('Page.close'); } catch { /* 已关闭 */ }
  }
}

for (const { e, dir } of jobs) {
  let browser;
  const renderers = new Set();
  try {
    browser = await launch({ width: w, height: h, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist'] });
    const done = [];
    if (orientArg !== 'portrait') { await shoot(browser, e, dir, 'landscape', renderers); done.push('横'); }
    if (orientArg !== 'landscape' && (await shoot(browser, e, dir, 'portrait', renderers)) === 'ok') { done.push('竖'); portraits++; }
    console.log('✓', dir, e.id, done.join(' / '), ...renderers);
    ok++;
  } catch (err) {
    console.error('✗', dir, e.id, err.message, ...renderers);
  } finally {
    await browser?.close();
  }
}
console.log(`captured ${ok}/${jobs.length}${portraits ? ` · 竖屏预览 ${portraits}` : ''}`);
if (ok < jobs.length) process.exit(1);
