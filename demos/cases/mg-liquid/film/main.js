import { createEngine } from './js/engine.js';
import { buildLetterSDF } from './js/textsdf.js';
import { createFilm } from './js/scene.js';
import { createType } from './js/type.js';

const W = 1920, H = 1080, FPS = 30;
window.DEMO = { width: W, height: H, fps: FPS, duration: 10, motionBlur: { samples: 1, shutter: 0.5 } };

async function init() {
  await document.fonts.load('900 100px "Fraunces Liquid"');
  await document.fonts.load('500 40px "Noto Serif SC"', '万物始于一滴');
  await document.fonts.load('600 20px "Inter"');
  await document.fonts.ready;
  const cues = await (await MotionKit.load.fetch('./film/cues.json')).json();
  const eng = createEngine(document.getElementById('c'), W, H);
  // wordmark SDF
  const sdf = buildLetterSDF({ word: 'drop', family: '"Fraunces Liquid"', weight: 900, size: 400, tracking: 10, pad: 170, sigma: 10 });
  eng.setSDF(sdf);
  // place wordmark: centre of ink bbox at (960, 468)
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const l of sdf.letters) { x0 = Math.min(x0, l.bbox[0]); y0 = Math.min(y0, l.bbox[1]); x1 = Math.max(x1, l.bbox[2]); y1 = Math.max(y1, l.bbox[3]); }
  // optical centre: x-height band dominates → centre between ascender top and baseline, shifted
  const offX = 960 - (x0 + x1) / 2, offY = 452 - (y0 + sdf.baseY) / 2;
  const word = {
    offX, offY, baseY: sdf.baseY + offY, bbox: [x0 + offX, y0 + offY, x1 + offX, y1 + offY],
    letters: sdf.letters.map((l) => ({ ch: l.ch, px: l.pivot[0], py: l.pivot[1], sx0: l.pivot[0] + offX, sy0: l.pivot[1] + offY,
      bbox: [l.bbox[0] + offX, l.bbox[1] + offY, l.bbox[2] + offX, l.bbox[3] + offY] })),
  };
  // query helpers on the letter SDFs (screen coords, rest pose)
  word.sd = (i, x, y) => {
    const tx = Math.round(x - offX), ty = Math.round(y - offY);
    if (tx < 0 || ty < 0 || tx >= sdf.W || ty >= sdf.H) return 200;
    return sdf.data[(ty * sdf.W + tx) * 4 + i];
  };
  word.bottomAt = (i, x) => { // lowest ink y in column x
    for (let y = Math.round(word.letters[i].bbox[3]) + 4; y > word.letters[i].bbox[1]; y--) if (word.sd(i, x, y) < 0) return y;
    return null;
  };
  const film = createFilm(cues, word);
  const type = createType(W, H, cues, word);
  // adaptive in-page motion blur: sub-shutter samples per frame (shutter 0.5 = 180 deg), more on the fast ranges
  const SHUT = 0.5, FAST = [[0.12, 0.3, 20], [0.33, 1.05, 24], [1.2, 1.3, 16], [1.55, 2.95, 20], [3.1, 3.55, 20], [3.85, 4.75, 24],
    [4.9, 5.7, 20], [6.18, 6.8, 24], [8.5, 9.0, 20]];
  const samplesAt = (t) => { for (const [a, b, n] of FAST) if (t >= a && t <= b) return n; return 10; };
  window.renderAt = async (t) => {
    const N = Math.max(1, samplesAt(t));
    const Ss = [];
    for (let s = 0; s < N; s++) {

      const sh = t > 0.345 && t < 0.445 ? 0.2 : (t > 6.385 && t < 6.585 ? 0.25 : SHUT);
      const off = t > 0.39 && t < 0.41 ? 0.0 : -0.5;   // contact frame: shutter opens AT contact -> the squash, no ghost egg
      const ts = N > 1 ? Math.max(0, t + sh / FPS * ((s + 0.5) / N + off)) : t;
      const S = film(ts);
      S.frame = Math.round(t * FPS); S.mbw = N > 1 ? sh / N : 0;   // shutter fraction between samples (edge blur)
      Ss.push(S);
    }
    const Sc = N > 1 ? film(t) : Ss[0];
    type.draw(t, Sc);
    Ss[Math.floor(N / 2)] = Object.assign(Ss[Math.floor(N / 2)], { frame: Math.round(t * FPS), bloom: Sc.bloom, flash: Sc.flash });
    eng.render(Ss, type.canvas);
  };
}
await init();
