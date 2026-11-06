import config from './config.js';
const MK = MotionKit;
const stage = MK.stage({ root: '#stage' });
const mark = document.createElement('div');
mark.className = 'mark';
mark.textContent = config.word;
stage.root.appendChild(mark);
let selected = false;
function render(t) {
  const p = MK.seg(t, 0, 2, MK.ease.outCubic);
  mark.style.transform = `translateY(${(1 - p) * 160}px)`;
  mark.style.opacity = p;
  mark.style.color = selected ? '#fff' : config.accent;
}
const tl = MK.timeline({ duration: config.duration, render, markers: [{ t: 2, label: '落点' }] });
stage.root.addEventListener('pointerdown', () => { selected = !selected; render(tl.time); });
tl.on('seek', () => { selected = false; });
MK.expose(tl, { title: config.title });
MK.controls(tl, { accent: config.accent });
MK.start(tl, { t: 0, reduced: 2 });
