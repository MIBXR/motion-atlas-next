#!/usr/bin/env node
// 参考视频取帧：用无头 Edge/Chrome 的 <video> 逐个 seek，拼成带时间码的接触表。不需要 ffmpeg。
// 用法：
//   node scripts/frames.mjs <video.mp4> --every 2                    全片每 2 秒一帧
//   node scripts/frames.mjs <video.mp4> --from 55 --to 58 --step 0.25  区间细扫
//   node scripts/frames.mjs <video.mp4> --at 5.2,5.5,5.8 --full         指定时刻，并按原分辨率另存单帧
// 选项：--cols 4  --w 480（接触表中每格宽度）  --per 16（每张表的帧数）  --out frames/<视频名>
// 输出目录默认在仓库 frames/ 下（已被 .gitignore 忽略）：参考素材只在本地分析，不提交。
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { launch } from './lib/cdp.mjs';
import { ROOT } from './lib/catalog.mjs';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const video = args.find((a, i) => !a.startsWith('--') && (i === 0 || !args[i - 1].startsWith('--')));
if (!video || !fs.existsSync(video)) {
  console.error('用法：node scripts/frames.mjs <video.mp4> [--every 2 | --from a --to b --step s | --at t1,t2] [--full] [--cols 4 --w 480 --per 16 --out dir]');
  process.exit(1);
}
const name = path.basename(video).replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N}_-]+/gu, '-').slice(0, 60) || 'video';
const out = path.resolve(get('--out', path.join(ROOT, 'frames', name)));
const cols = Number(get('--cols', 4)), cellW = Number(get('--w', 480)), per = Number(get('--per', 16));
const full = args.includes('--full');

const TYPES = { '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/mp4', '.mkv': 'video/webm' };
const PAGE = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#000">
<video id="v" src="/v" muted preload="auto" playsinline></video>
<script>
const v = document.getElementById('v');
const ready = () => v.readyState >= 1 ? Promise.resolve() : new Promise((r, j) => { v.addEventListener('loadedmetadata', r, { once: true }); v.addEventListener('error', () => j(new Error('视频无法解码：' + (v.error && v.error.message))), { once: true }); });
const seek = (t) => new Promise((r) => { const done = () => { v.removeEventListener('seeked', done); r(); }; v.addEventListener('seeked', done); v.currentTime = t; });
const tc = (t) => Math.floor(t / 60) + ':' + (t % 60).toFixed(2).padStart(5, '0');
window.info = async () => { await ready(); return { duration: v.duration, w: v.videoWidth, h: v.videoHeight }; };
window.sheet = async (times, cols, w) => {
  await ready();
  const h = Math.round(w * v.videoHeight / v.videoWidth), bar = 26, rows = Math.ceil(times.length / cols);
  const c = document.createElement('canvas'); c.width = cols * w; c.height = rows * (h + bar);
  const g = c.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < times.length; i++) {
    await seek(times[i]);
    const x = (i % cols) * w, y = Math.floor(i / cols) * (h + bar);
    g.drawImage(v, x, y + bar, w, h);
    g.fillStyle = '#ffd23f'; g.font = 'bold 18px Consolas, monospace'; g.fillText(tc(times[i]), x + 8, y + 19);
  }
  return c.toDataURL('image/jpeg', 0.85);
};
window.frame = async (t) => {
  await ready(); await seek(t);
  const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight;
  c.getContext('2d').drawImage(v, 0, 0); return c.toDataURL('image/jpeg', 0.92);
};
</script>`;

const server = http.createServer((req, res) => {
  if (req.url === '/') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(PAGE); return; }
  if (req.url !== '/v') { res.writeHead(404); res.end(); return; }
  const stat = fs.statSync(video), type = TYPES[path.extname(video).toLowerCase()] || 'video/mp4';
  const range = req.headers.range;
  if (range) {
    const [s, e] = range.replace('bytes=', '').split('-');
    const start = Number(s), end = e ? Number(e) : Math.min(start + 8_000_000, stat.size - 1);
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    fs.createReadStream(video, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': stat.size, 'Accept-Ranges': 'bytes' });
    fs.createReadStream(video).pipe(res);
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/`;

const shown = (p) => { const r = path.relative(ROOT, p); return r && !r.startsWith('..') ? r : p; };
const browser = await launch({ width: 800, height: 600 });
const tc = (t) => `${String(Math.floor(t / 60)).padStart(2, '0')}m${(t % 60).toFixed(2).padStart(5, '0')}s`;
try {
  const page = await browser.newPage();
  await page.goto(url);
  const info = await page.eval('window.info()', 30000);
  const r3 = (n) => Math.round(n * 1000) / 1000;
  let times;
  if (get('--at')) times = get('--at').split(',').map(Number).filter((t) => t >= 0 && t <= info.duration);
  else {
    const from = Number(get('--from', 0)), to = Math.min(info.duration - 0.05, Number(get('--to', info.duration)));
    const step = Number(get('--step', get('--every', 2)));
    times = [];
    for (let t = from; t <= to + 1e-6; t += step) times.push(r3(t));
  }
  if (!times.length) throw new Error('没有落在视频时长内的取帧时刻');
  console.log(`${path.basename(video)} · ${info.w}×${info.h} · ${info.duration.toFixed(2)}s · ${times.length} 帧`);
  fs.mkdirSync(out, { recursive: true });
  for (let i = 0; i < times.length; i += per) {
    const chunk = times.slice(i, i + per);
    const data = await page.eval(`window.sheet(${JSON.stringify(chunk)}, ${cols}, ${cellW})`, 300000);
    const file = path.join(out, `sheet-${tc(chunk[0])}-${tc(chunk[chunk.length - 1])}.jpg`);
    fs.writeFileSync(file, Buffer.from(data.split(',')[1], 'base64'));
    console.log('saved', shown(file));
  }
  if (full) {
    for (const t of times) {
      const data = await page.eval(`window.frame(${t})`, 60000);
      const file = path.join(out, `frame-${tc(t)}.jpg`);
      fs.writeFileSync(file, Buffer.from(data.split(',')[1], 'base64'));
    }
    console.log(`saved ${times.length} full-size frames → ${shown(out)}`);
  }
} catch (err) {
  console.error('取帧失败：', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
  server.close();
}
