import { makeComp } from './comp.js';
import { renderScene } from './scene.js';
import * as STORY from './story.js';
import { drawBanderole } from './subs.js';

const Q = new URLSearchParams(location.search);
const cv = document.getElementById('gl');
const comp = makeComp(cv);
const mk = (w = 1920, h = 1080) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const L = { G: mk(), S: mk(), R: mk(), O: mk(), P: mk(1024, 768) };
const Lc = {}; for (const k in L) Lc[k] = L[k].getContext('2d');

await document.fonts.load('40px Cinzel'); await document.fonts.load('40px "IM Fell English"'); await document.fonts.load('700 40px Cinzel');

window.DUR = STORY.DUR; window.EV = STORY.EV; window.SUBS = STORY.SUBS;
window.render = t => {
  const st = STORY.state(t);
  if (!Q.get('nosub')) st.overlay = (O) => drawBanderole(O, STORY.SUBS, t);
  renderScene(Lc, L, comp, st);
};
window.READY = true;
