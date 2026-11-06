#!/usr/bin/env node
// 逐帧渲染：打开遵守 render(t) 协议的 Demo，按帧率 seek 并截图，输出帧序列；PATH 上有 ffmpeg 时自动合成 MP4。
// 用法：node scripts/render.mjs <demo 路径或 URL> [--orient landscape|portrait --fps 30 --from 0 --to 秒 --out renders/<名>
//        --format png|jpeg --audio --audio-only --sample-rate 48000 --w 1920 --h 1080 --port 4321 --no-encode]
//   --orient   画幅：landscape（默认，视口 1920×1080）或 portrait（视口 1080×1920），DPR 1；同时给 URL 加 ?orient=
//   --audio    用 Demo 挂在时间轴上的乐谱（__motion.audio）离线渲染 WAV，写到 <out>.wav；有 ffmpeg 时一起合成到 MP4
//   --audio-only 只导出 WAV，不截帧
// 传入仓库内相对路径时，若端口上没有服务器，会临时启动 scripts/serve.mjs。
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { launch } from './lib/cdp.mjs';
import { ROOT } from './lib/catalog.mjs';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const has = (k) => args.includes(k);
const VALUED = new Set(['--fps', '--w', '--h', '--from', '--to', '--out', '--format', '--port', '--orient', '--sample-rate']);
const target = args.find((a, i) => !a.startsWith('--') && (i === 0 || !VALUED.has(args[i - 1])));
if (!target) {
  console.error('用法：node scripts/render.mjs demos/cases/map-pilgrimage/index.html [--orient landscape|portrait --fps 30 --from 0 --to 10 --out renders/x --format png|jpeg --audio --audio-only --no-encode]');
  process.exit(1);
}
const orient = get('--orient', 'landscape');
if (!['landscape', 'portrait'].includes(orient)) { console.error('--orient 只能是 landscape 或 portrait'); process.exit(1); }
const [dw, dh] = orient === 'portrait' ? [1080, 1920] : [1920, 1080];
const fps = Number(get('--fps', 30)), w = Number(get('--w', dw)), h = Number(get('--h', dh));
const format = get('--format', 'png') === 'jpeg' || get('--format') === 'jpg' ? 'jpeg' : 'png';
const port = Number(get('--port', 4321));
const audioOnly = has('--audio-only');
const wantAudio = has('--audio') || audioOnly;
const sampleRate = Number(get('--sample-rate', 48000));
const shown = (p) => { const r = path.relative(ROOT, p); return r && !r.startsWith('..') ? r : p; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ffmpeg：FFMPEG_PATH → PATH → Windows 上 winget 的安装位置（刚装好、当前进程还读不到新 PATH 时也能找到）
function findFfmpeg() {
  const candidates = [process.env.FFMPEG_PATH, 'ffmpeg'].filter(Boolean);
  const local = process.env.LOCALAPPDATA;
  if (process.platform === 'win32' && local) {
    candidates.push(path.join(local, 'Microsoft', 'WinGet', 'Links', 'ffmpeg.exe'));
    const pkgs = path.join(local, 'Microsoft', 'WinGet', 'Packages');
    try {
      for (const d of fs.readdirSync(pkgs).filter((n) => /ffmpeg/i.test(n))) {
        for (const sub of fs.readdirSync(path.join(pkgs, d))) candidates.push(path.join(pkgs, d, sub, 'bin', 'ffmpeg.exe'));
      }
    } catch { /* 没有 winget 安装目录 */ }
  }
  return candidates.find((c) => spawnSync(c, ['-version'], { stdio: 'ignore' }).status === 0) || null;
}

let url = target, server = null;
if (!/^https?:/.test(target)) {
  const rel = path.relative(ROOT, path.resolve(target)).split(path.sep).join('/');
  if (rel.startsWith('..') || !fs.existsSync(path.join(ROOT, rel))) { console.error('找不到 Demo：' + target); process.exit(1); }
  url = `http://localhost:${port}/${rel}`;
  const up = await fetch(`http://localhost:${port}/`).then(() => true, () => false);
  if (!up) {
    server = spawn(process.execPath, [path.join(ROOT, 'scripts/serve.mjs'), '--port', String(port)], { stdio: 'ignore' });
    for (let i = 0; i < 50 && !(await fetch(`http://localhost:${port}/`).then(() => true, () => false)); i++) await sleep(100);
  }
}
const u = new URL(url);
u.searchParams.set('render', '1');
u.searchParams.set('embed', '1');
u.searchParams.set('orient', orient);
const demoName = (u.pathname.split('/').filter(Boolean).slice(-2, -1)[0] || 'render').replace(/[^\w-]/g, '');
const out = path.resolve(get('--out', path.join(ROOT, 'renders', orient === 'portrait' ? `${demoName}-portrait` : demoName)));

const browser = await launch({ width: w, height: h });
const started = Date.now();
try {
  const page = await browser.newPage();
  await page.viewport(w, h, 1);
  await page.goto(u.href, 60000);
  await page.waitFor('window.__motion && typeof window.__motion.seek === "function"', 30000);
  // 等待预加载完成
  await page.eval('Promise.resolve(window.__motion.ready).then(() => true)', 120000);
  const info = await page.eval('({ duration: (window.__motion.pause(), window.__motion.duration), orient: window.__motion.orient || null, orients: window.__motion.orients || [], hasScore: !!window.__motion.audio })');
  const duration = info.duration;
  if (info.orients.length && info.orient !== orient) console.warn(`警告：Demo 不支持 ${orient}（支持 ${info.orients.join(' / ')}），实际画幅 ${info.orient}`);
  if (!info.orients.length && orient === 'portrait') console.warn('警告：该 Demo 尚未使用 MotionKit.stage()，竖屏只是自适应布局，不是专门的竖屏构图。');
  const from = Math.max(0, Number(get('--from', 0)));
  const to = Math.min(duration, Number(get('--to', duration)));
  const total = Math.max(1, Math.round((to - from) * fps));
  const ext = format === 'png' ? 'png' : 'jpg';

  if (!audioOnly) {
    fs.mkdirSync(out, { recursive: true });
    for (const f of fs.readdirSync(out)) if (/^frame-\d+\.(png|jpe?g)$/.test(f)) fs.rmSync(path.join(out, f));
    // 先 seek 一次预热字体与图片
    await page.eval(`window.__motion.seek(${from})`, 60000);
    await sleep(600);
    console.log(`渲染 ${u.pathname} · ${orient} ${w}×${h} · ${fps}fps · ${from}s–${to.toFixed(2)}s · ${total} 帧 → ${shown(out)}`);
    for (let i = 0; i < total; i++) {
      const t = from + i / fps;
      await page.eval(`window.__motion.seek(${t.toFixed(5)}).then(() => new Promise(r => requestAnimationFrame(() => r())))`, 60000);
      await page.screenshot(path.join(out, `frame-${String(i + 1).padStart(5, '0')}.${ext}`), { format, quality: 92 });
      if ((i + 1) % fps === 0 || i === total - 1) process.stdout.write(`\r${i + 1}/${total} 帧 · ${((Date.now() - started) / 1000).toFixed(0)}s`);
    }
    process.stdout.write('\n');
  }

  let wav = null;
  if (wantAudio) {
    if (!info.hasScore) {
      console.warn('该 Demo 没有挂乐谱（MotionKit.audio.attach），跳过音频导出。');
    } else {
      const r = await page.eval(`window.__motion.audio.renderWav({ from: ${from}, to: ${to}, sampleRate: ${sampleRate} })`, 300000);
      wav = `${out}.wav`;
      fs.mkdirSync(path.dirname(wav), { recursive: true });
      fs.writeFileSync(wav, Buffer.from(r.base64, 'base64'));
      console.log(`音频 ${shown(wav)} · ${r.duration.toFixed(2)}s · ${r.sampleRate}Hz · ${r.channels}ch · ${r.events} 个事件 · 峰值 ${r.peakDb.toFixed(1)} dBFS · RMS ${r.rmsDb.toFixed(1)} dBFS${r.clipped ? ` · 削波样本 ${r.clipped}` : ''}`);
    }
  }

  if (!audioOnly) {
    const ffmpeg = findFfmpeg();
    const frames = path.join(out, `frame-%05d.${ext}`);
    const mp4 = `${out}.mp4`;
    const ffArgs = ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', frames, ...(wav ? ['-i', wav] : []),
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', ...(wav ? ['-c:a', 'aac', '-b:a', '192k', '-shortest'] : []), mp4];
    if (has('--no-encode')) console.log('已跳过合成（--no-encode）。');
    else if (ffmpeg) {
      const r = spawnSync(ffmpeg, ffArgs, { stdio: 'inherit' });
      console.log(r.status === 0 ? `已合成 ${shown(mp4)}${wav ? '（含音频）' : ''}` : 'ffmpeg 合成失败，帧序列已保留。');
    } else {
      const q = (s) => (/[\s%]/.test(s) ? `"${s}"` : s);
      console.log(`未找到 ffmpeg：帧序列${wav ? '与 WAV ' : ''}已保留。可手动合成：\nffmpeg ${ffArgs.filter((a) => a !== '-loglevel' && a !== 'error').map(q).join(' ')}`);
    }
  }
} catch (err) {
  console.error('\n渲染失败：', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
  if (server) server.kill();
}
