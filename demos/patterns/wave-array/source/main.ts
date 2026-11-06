import { ArchiveScene } from '../../../cases/archive-os/source/rhinelabui/src/scene';
import { archiveColumns, columnFiles, fileLocation } from '../../../cases/archive-os/source/rhinelabui/src/data';
import { wrap } from '../../../cases/archive-os/source/rhinelabui/src/archive-loop';
import { fullMotion, reducedMotion } from '../../../cases/archive-os/source/rhinelabui/src/motion-preferences';
import { qualityPresets } from '../../../cases/archive-os/source/rhinelabui/src/render-quality';
import { smooth } from '../../../cases/archive-os/source/rhinelabui/src/motion';
import { synthesizeSound } from '../../../cases/archive-os/source/rhinelabui/src/audio';
import { openingLayout, viewportLayout } from '../../../cases/archive-os/source/rhinelabui/src/viewport-layout';

const config = window.parent.WAVE_CONFIG;
const container = document.getElementById('array')!;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const quality = new URLSearchParams(location.search).get('quality') || 'original';
const fps = 60, startFrame = Math.round(config.sourceStart * fps);
let scene: ArchiveScene, frame = -1, selected = 0;
let memory = archiveColumns.map((_, lane) => columnFiles(lane)[0]);
let inputs: { frame: number; event: any }[] = [], manualAt = Infinity, revision = 0, renderedRevision = -1;
let interacted = false;
const ease = (t: number) => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };

function fit(boot: boolean) {
  const { width, height, scale, kind } = boot ? openingLayout(innerWidth, innerHeight)
    : viewportLayout(innerWidth, innerHeight, matchMedia('(pointer: coarse)').matches);
  container.style.width = `${width}px`; container.style.height = `${height}px`;
  container.style.transform = `translate(-50%, -50%) scale(${scale})`;
  container.dataset.layout = kind;
  scene?.resize();
}

function selectionWave(distance: number, age: number) {
  const wave = config.wave;
  if (age < 0 || age > wave.lifetime) return 0;
  const phase = distance - age * wave.speed;
  return wave.amplitude * smooth(age / wave.attack) * Math.exp(-age * wave.decay)
    * Math.cos(phase * wave.frequency) * Math.exp(-0.5 * (phase / wave.width) ** 2);
}

async function reset() {
  scene?.dispose();
  scene = undefined;
  fit(true);
  scene = new ArchiveScene(container, selectionWave, false);
  scene.setQuality(qualityPresets[quality]);
  scene.setMotion(reduced ? reducedMotion() : fullMotion());
  await Reflect.get(window.parent, 'MotionKit').load.loader(async () => {
    await scene.load(config.model);
    const smaa = Reflect.get(scene, 'smaa');
    await Promise.all([smaa._areaTexture.image, smaa._searchTexture.image].map(image => image.complete ? Promise.resolve() : new Promise((resolve, reject) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', () => reject(new Error('SMAA texture failed')), { once: true });
    })));
    scene.resize();
  }, window);
  selected = 0; memory = archiveColumns.map((_, lane) => columnFiles(lane)[0]);
  scene.select(0); scene.setMode('hidden');
  frame = -1; renderedRevision = revision;
  scene.onSelect = (index, cell) => window.parent.WAVE_MANUAL({ index, cell });
  scene.onNavigate = (axis, direction) => window.parent.WAVE_MANUAL({ axis, direction });
}

function choose(event: any) {
  let navigation;
  if ('index' in event) { selected = event.index; navigation = { cell: event.cell }; }
  else {
    const lane = fileLocation(selected).lane;
    if (event.axis === 'row') {
      const files = columnFiles(lane);
      selected = files[wrap(files.indexOf(selected) + event.direction, files.length)];
    } else selected = memory[wrap(lane + event.direction, archiveColumns.length)];
    navigation = { axis: event.axis, direction: event.direction };
  }
  memory[fileLocation(selected).lane] = selected;
  scene.select(selected, navigation);
}

function update(k: number, drawing: boolean) {
  const time = k / fps;
  if (k === 35 * fps) { fit(false); scene.setMode('detail'); }
  if (k === 49 * fps) scene.finishDecryption();
  if (k === Math.round(60.6 * fps)) scene.setMode('archive');
  if (k >= startFrame) {
    for (const event of config.events) {
      const eventFrame = startFrame + Math.round(event.t * fps);
      if (eventFrame === k && eventFrame < manualAt) choose(event);
    }
    for (const input of inputs) if (input.frame === k) choose(input.event);
  }
  if (time < 21.9 || time >= 49 && time < 60.4) return;
  window.__filmSkipRender = !drawing;
  const cinematic = time < 35 ? {
    reveal: ease((time - 22) / 0.4), lift: ease((time - 26) / 1.8),
    zoom: 0.55 * ease((time - 27.3) / 1.65) + 0.45 * ease((time - 29) / 5), time
  } : undefined;
  scene.update(time, cinematic);
  container.style.setProperty('--detail-shade', String(scene.detailVisibility));
}

const ready = Promise.all([
  document.fonts.load('400 32px MiSans', 'RHINE LAB, LLC. INTERNAL DATABASE NO.001 R L / I S INFO'),
  document.fonts.load('700 130px MiSans', 'RHINE LAB, LLC. NO.001 INFO')
]).then(reset);

window.waveDemo = {
  ready,
  async seek(t: number) {
    await ready;
    const target = startFrame + Math.round(t * fps);
    if (target < frame || renderedRevision !== revision) await reset();
    if (target === frame) return;
    while (frame < target) update(++frame, frame === target);
    window.__filmSkipRender = false;
  },
  resetInput() {
    if (inputs.length || interacted) { inputs = []; manualAt = Infinity; interacted = false; revision++; }
  },
  addInput(t: number, event: any) {
    const at = startFrame + Math.round(t * fps) + 1;
    manualAt = Math.min(manualAt, at); inputs.push({ frame: at, event });
  },
  sound(ctx: BaseAudioContext, out: AudioNode, when: number, event: any) {
    return synthesizeSound(ctx, out, event.axis === 'lane' ? 'column' : 'tick', when, event.axis === 'lane' ? event.direction * 0.45 : 0).end;
  },
  resize() { revision++; },
  stats() { return scene.getStats(); }
};
addEventListener('resize', () => { revision++; window.parent.__motion?.seek(window.parent.__motion.time); });
for (const type of ['pointerdown', 'pointermove', 'touchstart']) container.addEventListener(type, event => {
  if (event.isTrusted) interacted = true;
}, { capture: true });
const arrows = { ArrowLeft: ['lane', -1], ArrowRight: ['lane', 1], ArrowUp: ['row', -1], ArrowDown: ['row', 1] };
addEventListener('keydown', event => {
  const move = arrows[event.key]; if (!move) return;
  event.preventDefault(); window.parent.WAVE_MANUAL({ axis: move[0], direction: move[1] });
});
