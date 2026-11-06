import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { launch } from '../../../../../../scripts/lib/cdp.mjs';
import { timeline } from './sequence.js';

const root = fileURLToPath(new URL('../../../../../../', import.meta.url));
const args = process.argv.slice(2);
const get = (key, fallback) => { const i = args.indexOf(key); return i < 0 ? fallback : args[i + 1]; };
const config = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'demos/cases/archive-os/film/config.js'), 'utf8'), { window: config, globalThis: config });
const anchor = Number(get('--anchor', config.ARCHIVE_FILM?.A));
if (!Number.isFinite(anchor) || anchor <= 0) throw new Error('config.js must provide ARCHIVE_FILM.A, or pass --anchor with the measured first-detail time.');
const duration = timeline(anchor).duration;
const base = get('--base', 'http://localhost:4323');
const out = path.resolve(root, get('--out', 'demos/cases/archive-os/audio/film-audio.ogg'));
const wav = path.resolve(root, get('--wav', 'renders/archive-os/film-audio.wav'));

function findFfmpeg() {
  const candidates = [process.env.FFMPEG_PATH, 'ffmpeg'].filter(Boolean);
  const local = process.env.LOCALAPPDATA;
  if (process.platform === 'win32' && local) {
    candidates.push(path.join(local, 'Microsoft', 'WinGet', 'Links', 'ffmpeg.exe'));
    const packages = path.join(local, 'Microsoft', 'WinGet', 'Packages');
    try {
      for (const folder of fs.readdirSync(packages).filter(name => /ffmpeg/i.test(name))) {
        for (const sub of fs.readdirSync(path.join(packages, folder))) candidates.push(path.join(packages, folder, sub, 'bin', 'ffmpeg.exe'));
      }
    } catch { /* WinGet package directory is optional. */ }
  }
  return candidates.find(candidate => spawnSync(candidate, ['-version'], { stdio: 'ignore' }).status === 0) || null;
}
const ffmpeg = findFfmpeg();
if (!ffmpeg) throw new Error('ffmpeg was not found; set FFMPEG_PATH or install it on PATH.');
const url = new URL('demos/cases/archive-os/film/app/index.html', base.endsWith('/') ? base : `${base}/`);
url.searchParams.set('film', '1');
url.searchParams.set('audio', 'offline');
url.searchParams.set('duration', String(duration));
const browser = await launch({ width: 1920, height: 1080 });
const started = performance.now();
try {
  const page = await browser.newPage();
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: fs.readFileSync(path.join(root, 'kit/motion-kit.js'), 'utf8') });
  const errors = [];
  page.on('Runtime.exceptionThrown', event => errors.push(event.exceptionDetails.exception?.description || event.exceptionDetails.text));
  page.on('Runtime.consoleAPICalled', event => { if (event.type === 'error') errors.push(event.args.map(arg => arg.description || arg.value || arg.type).join(' ')); });
  await page.goto(url.href, 120000);
  await page.waitFor('window.__filmApp && window.__filmAudio && window.__clock', 120000);
  await page.eval('window.__filmApp.ready.then(() => true)', 120000);
  const result = await page.eval(`(async () => {
    const { createSequence } = await import('./film/sequence.js');
    const sequence = createSequence(window, ${anchor});
    window.__filmSkipRender = true;
    for (let frame = 0; frame < ${Math.round(duration * 60)}; frame++) await sequence.step();
    const audio = window.__filmAudio.stats();
    const buffer = await window.__filmAudio.renderOffline();
    const samples = buffer.length, channels = buffer.numberOfChannels;
    const bytes = new ArrayBuffer(44 + samples * channels * 2), view = new DataView(bytes);
    const text = (at, value) => { for (let i = 0; i < value.length; i++) view.setUint8(at + i, value.charCodeAt(i)); };
    text(0, 'RIFF'); view.setUint32(4, bytes.byteLength - 8, true); text(8, 'WAVEfmt ');
    view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, channels, true);
    view.setUint32(24, buffer.sampleRate, true); view.setUint32(28, buffer.sampleRate * channels * 2, true);
    view.setUint16(32, channels * 2, true); view.setUint16(34, 16, true); text(36, 'data'); view.setUint32(40, samples * channels * 2, true);
    const data = Array.from({ length: channels }, (_, i) => buffer.getChannelData(i));
    let at = 44, peak = 0, sum = 0;
    for (let i = 0; i < samples; i++) for (let ch = 0; ch < channels; ch++) {
      const value = data[ch][i];
      peak = Math.max(peak, Math.abs(value)); sum += value * value;
      const clamped = Math.max(-1, Math.min(1, value));
      view.setInt16(at, Math.round(clamped < 0 ? clamped * 32768 : clamped * 32767), true); at += 2;
    }
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]); reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(new Blob([bytes], { type: 'audio/wav' }));
    });
    return { base64, sampleRate: buffer.sampleRate, channels, duration: buffer.duration, peak, rms: Math.sqrt(sum / (samples * channels)), audio, actions: sequence.log };
  })()`, 300000);
  if (errors.length) throw new Error(`Offline film browser errors:\n${errors.join('\n')}`);
  fs.mkdirSync(path.dirname(wav), { recursive: true });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(wav, Buffer.from(result.base64, 'base64'));
  const encoded = spawnSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', wav, '-ar', '48000', '-ac', '2', '-c:a', 'libvorbis', '-q:a', '6', out], { stdio: 'inherit' });
  if (encoded.status !== 0) throw new Error(`ffmpeg encoding failed with status ${encoded.status}.`);
  delete result.base64;
  result.browserErrors = errors;
  result.A = anchor;
  result.elapsedSeconds = (performance.now() - started) / 1000;
  result.oggBytes = fs.statSync(out).size;
  fs.writeFileSync(path.join(path.dirname(wav), 'film-audio.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ file: path.relative(root, out), duration: result.duration, sampleRate: result.sampleRate, channels: result.channels, bytes: result.oggBytes, scheduledSounds: result.audio.scheduled.length, peak: result.peak, rms: result.rms, elapsedSeconds: result.elapsedSeconds }, null, 2));
} finally {
  await browser.close();
}
