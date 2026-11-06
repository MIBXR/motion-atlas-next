#!/usr/bin/env node
// 单帧截图：node scripts/shot.mjs <url> --out a.png [--orient landscape|portrait] [--w 1600 --h 900] [--t 12.5 ...] [--wait 1200]
// --t 可重复：同一页面依次 seek 到多个时刻，输出 a-12.5.png 这样的文件名。
// --orient：给 URL 加 ?orient= 并把视口默认设为 1920×1080 / 1080×1920（仍可用 --w/--h 覆盖，用来检查等比缩放与黑边）。
import { launch } from './lib/cdp.mjs';

const args = process.argv.slice(2);
const target = args.find((a) => /^https?:/.test(a));
const get = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const all = (k) => args.flatMap((a, i) => (a === k ? [args[i + 1]] : []));
if (!target) { console.error('用法：node scripts/shot.mjs <url> --out file.png [--orient landscape|portrait --w 1600 --h 900 --t 秒 --wait 毫秒]'); process.exit(1); }

const orient = get('--orient', null);
if (orient && !['landscape', 'portrait'].includes(orient)) { console.error('--orient 只能是 landscape 或 portrait'); process.exit(1); }
const [dw, dh] = orient === 'portrait' ? [1080, 1920] : orient === 'landscape' ? [1920, 1080] : [1600, 900];
const w = Number(get('--w', dw)), h = Number(get('--h', dh));
const out = get('--out', 'shot.png');
const wait = Number(get('--wait', 800));
const times = all('--t').map(Number);
const u = new URL(target);
if (orient) u.searchParams.set('orient', orient);

const browser = await launch({ width: w, height: h });
try {
  const page = await browser.newPage();
  await page.goto(u.href, 120000);
  if (times.length) {
    await page.waitFor('window.__motion', 20000);
    await page.eval('Promise.resolve(window.__motion.ready).then(() => true)', 60000);
    await page.eval(`new Promise(r => setTimeout(r, ${Number(get('--settle', 1500))}))`);
    for (const t of times) {
      await page.eval(`window.__motion.pause && window.__motion.pause(), window.__motion.seek(${t})`);
      await page.eval(`new Promise(r => setTimeout(r, ${wait}))`);
      await page.eval(`window.__motion.seek(${t})`);
      const file = times.length > 1 ? out.replace(/(\.\w+)$/, `-${t}$1`) : out;
      await page.screenshot(file, { format: file.endsWith('.jpg') ? 'jpeg' : 'png' });
      console.log('saved', file);
    }
  } else {
    await page.eval(`new Promise(r => setTimeout(r, ${wait}))`);
    await page.screenshot(out, { format: out.endsWith('.jpg') ? 'jpeg' : 'png' });
    console.log('saved', out);
  }
} finally {
  await browser.close();
}
