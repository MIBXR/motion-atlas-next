import * as THREE from 'three';
import { Accumulator } from './render.js';
import { buildWorld } from './world.js';
import { buildTitle } from './title.js';
import { buildTags } from './ui.js';
import * as A from './anim.js';

const q = new URLSearchParams(location.search);
const SPP = +(q.get('spp') || 16);
window.DEMO = { width: 1920, height: 1080, fps: 30, duration: 10, motionBlur: { samples: 1, shutter: 0.5 } };
const SHUTTER = 0.5, FPS = 30;

const cues = await (await MotionKit.load.fetch('./film/cues.json')).json();

// fonts (canvas decal + DOM tags need them resolved first)
await Promise.all([
  document.fonts.load("700 100px 'HarmonyOS Sans SC'", '让城市自己生长清洁能源平均通勤数据吞吐'),
  document.fonts.load("500 100px 'HarmonyOS Sans SC'", '让城市自己生长清洁能源平均通勤数据吞吐'),
  document.fonts.load("500 100px 'JetBrains Mono'", 'CITY OS 0123456789%'),
  document.fonts.load("800 100px 'Unbounded'", 'ISOPOLIS 0123456789.'),
]);
await document.fonts.ready;

// ------------------------------------------------------------------ camera choreography
// Hermite (auto-bezier) keys per channel: [t, value, 'e' = ease (zero slope)]
function hermite(keys, t) {
  if (t <= keys[0][0]) return keys[0][1];
  const n = keys.length;
  if (t >= keys[n - 1][0]) return keys[n - 1][1];
  let i = 0; while (t > keys[i + 1][0]) i++;
  const slope = (k) => {
    if (keys[k][2] === 'e' || k === 0 || k === n - 1) return 0;
    return (keys[k + 1][1] - keys[k - 1][1]) / (keys[k + 1][0] - keys[k - 1][0]);
  };
  const [t0, v0] = keys[i], [t1, v1] = keys[i + 1];
  const h = t1 - t0, u = (t - t0) / h;
  const m0 = slope(i) * h, m1 = slope(i + 1) * h;
  const u2 = u * u, u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * v0 + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * v1 + (u3 - u2) * m1;
}
const CAM = {
  x: [[0, 0.0], [1.5, 0.1], [2.3, -3.2], [4.4, 3.0], [5.2, 0.45], [5.9, 0.3], [7.7, 2.2, 'e'], [8.8, -5.75, 'e'], [10, -5.6]],
  y: [[0, 0.12], [1.5, 0.25], [2.3, 0.75], [4.4, 1.05], [5.2, 1.75], [5.9, 2.1], [7.7, 1.85, 'e'], [8.8, -0.6, 'e'], [10, -0.56]],
  z: [[0, 3.1], [1.5, 2.1], [2.3, 1.86], [4.4, 1.9], [5.2, 1.76], [5.9, 1.72], [7.7, 1.8, 'e'], [8.8, 1.0, 'e'], [10, 1.016]],
};
function camKeys(t) {
  if (q.get('cam')) { const [x, y, z] = q.get('cam').split(',').map(Number); return { x, y, zoom: z }; }
  let zoom = hermite(CAM.z, t);
  // hero punch at the drop
  const u = t - cues.drop;
  if (u > -0.2) {
    // anticipation: ease 2 % out 5.90-5.967, hold, then punch 1.00 -> 1.06 in 2 frames and settle over 12 (easeOutExpo)
    const ig = cues.drop - 0.015;
    const pre = t < ig ? -0.02 * A.smooth(A.inv(cues.drop - 0.1, cues.drop - 0.033, t)) : 0;
    const v = t - ig;
    const kick = v >= 0 ? (v < 0.067 ? 0.06 * (1 - (1 - v / 0.067) ** 2) : 0.06 * (1 - A.easeOutExpo((v - 0.067) / 0.4))) : 0;
    zoom *= 1 + pre + kick;
  }
  return { x: hermite(CAM.x, t), y: hermite(CAM.y, t), zoom };
}

// ------------------------------------------------------------------ renderer
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true, alpha: false, powerPreference: 'high-performance' });
const dpr = window.devicePixelRatio || 1;
renderer.setPixelRatio(dpr);
renderer.setSize(1920, 1080, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;
const glx = renderer.getContext();
if (!glx.getExtension('EXT_float_blend')) console.warn('EXT_float_blend missing');
const W = Math.round(1920 * dpr), H = Math.round(1080 * dpr);

// screen-plane helpers (world units along the iso camera's right / up vectors)
const R_ = new THREE.Vector3(1, 0, -1).normalize(), U_ = new THREE.Vector3(-1, 2, -1).normalize(), D_ = new THREE.Vector3(1, 1, 1).normalize();
const FLOOR = -7.5;
function floorAt(sx, sy) { // world point on the floor plane that projects to screen-plane coords (sx, sy)
  const lam = (FLOOR - sy * U_.y) / D_.y;
  return new THREE.Vector3().addScaledVector(R_, sx).addScaledVector(U_, sy).addScaledVector(D_, lam);
}
// clouds authored by their position in the END frame (px), drifting in screen-x; fg parallax = 1.25 x city
const camEnd = camKeys(9.5);
const pxToUnits = (px, py, z) => [(px - 960) / (60 * z), -(py - 540) / (60 * z)];
const cloudEnd = [
  { px: 250, py: 175, s: 1.25, v: 0.16 }, { px: 1690, py: 95, s: 0.8, v: 0.13 }, { px: 2500, py: 620, s: 1.3, v: 0.14 },
];
const clouds = cloudEnd.map((c) => {
  const [ux, uy] = pxToUnits(c.px, c.py, camEnd.zoom);
  // screen pos rel. centre = s - 1.25 * target  ->  s = pos + 1.25 * target - drift
  return { sx: ux + 1.25 * camEnd.x - 9.5 * c.v, sy: uy + 1.25 * camEnd.y, s: c.s, v: c.v };
});
// bg floating cubes authored by END-frame px + world height (bg parallax 0.6 -> screen = s - 0.75 * target)
const cubeEnd = [
  [620, 312, -1.0, 0.62, '#B7ECD6'], [483, 468, 1.5, 0.38, '#A8D2FF'], [1045, 262, 1.0, 0.72, '#D9D1FA'], [1775, 712, 0.5, 0.72, '#FFC4AC'],
  [1862, 492, -2.0, 0.4, '#B7ECD6'], [880, 118, 2.0, 0.45, '#FFFFFF'], [1560, 1000, -2.5, 0.5, '#D9D1FA'], [95, 400, -1.5, 0.5, '#FFFFFF'],
  [-300, 300, 0, 0.6, '#FFC4AC'], [2300, 200, 0, 0.6, '#A8D2FF'],
];
const bgCubes = [].map(([px, py, y, sz, col]) => {
  const [ux, uy] = pxToUnits(px, py, camEnd.zoom);
  const sx = ux + 0.75 * camEnd.x, sy = uy + 0.75 * camEnd.y;
  const lam = (y - sy * U_.y) / D_.y;
  const p = new THREE.Vector3().addScaledVector(R_, sx).addScaledVector(U_, sy).addScaledVector(D_, lam);
  return [p.x, p.y, p.z, sz, col];
});
const world = buildWorld(renderer, cues, { camKeys, clouds, bgCubes });
{
  // title: centre of the wordmark block at end-frame px (bg layer parallax 0.6 -> screen = anchor - 0.75 * target)
  const tpx = q.get('ta') ? q.get('ta').split(',').map(Number) : [402, 705];
  const [tux, tuy] = pxToUnits(tpx[0], tpx[1], camEnd.zoom);
  const tAnchor = floorAt(tux + 0.75 * camEnd.x, tuy + 0.75 * camEnd.y);
  const tA = [tAnchor.x, tAnchor.z];
  const title = await buildTitle(world, cues, {
    floorY: FLOOR, size: 2.2, depth: 0.36, bevel: 0.035, text: 'ISOPOLIS', tracking: 0.035,
    anchor: new THREE.Vector3(tA[0], FLOOR, tA[1]), catcher: [17, 8],
    tagline: '让城市自己生长', tagPx: 250, mono: 'CITY OS · 144 TILES · ONLINE', monoPx: +(q.get('mono') || 165), monoGap: 1.75,
    decalCW: 4096, decalCH: 720, decalW: 12.8, decalX: 0.1, decalGap: 0.55,
  });

  world.bgU.uRipC.value.set(Math.round(tA[0]), Math.round(tA[1])); world.bgU.uRipT.value = cues.final - 0.08;
  { // round 2: the ping reaches the island's floor shadow (centre (0.9, -0.9) in floor coords, half-size ~5.6) at 9.6 s
    const D = Math.max(Math.abs(Math.round(tA[0]) - 0.9), Math.abs(Math.round(tA[1]) + 0.9)) - 5.6;
    world.bgU.uRipD.value = D; world.bgU.uRipV.value = D / (9.6 - (cues.final - 0.08));
  }
}
const island = world.byId;
// Round 1 (P5): leaders are world polylines [stub, run] on true iso axes so every card flies into the lavender void:
// COMMUTE -> right-face card above the back-left edge, ENERGY + DATA -> left-face cards stacked above the back-right edge.
// Nothing covers the CORE or a downtown block (lengths solved for the 7.2 s camera, margins checked 6.5-7.7).
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const tags = buildTags(world, cues, [
  { t: cues.callouts[0], tOut: 7.62, label: '清洁能源', en: 'ENERGY', value: 98.6, unit: '%', fmt: (v) => v.toFixed(1), color: '#4CC795',
    anchor: V3(2.5, 2.3, -5.4), path: [V3(0, 0.5, 0), V3(0, 0, -1.8)], face: 'left',
    spark: [0.12, 0.22, 0.18, 0.36, 0.33, 0.52, 0.5, 0.7, 0.78, 0.96] },
  { t: cues.callouts[1], tOut: 7.66, label: '平均通勤', en: 'COMMUTE', value: 12, unit: 'min', fmt: (v) => Math.round(v).toString(), color: '#FF8E74',
    anchor: V3(-3.5, 0.1, 3.5), path: [V3(0, 1.9, 0), V3(-1.64, 0, 0)], face: 'right', // round 2: +0.84 Y (clears the back-left tiles; the jury's -1.5 X pushed it off-frame)
    spark: [0.92, 0.84, 0.88, 0.66, 0.7, 0.5, 0.46, 0.3, 0.26, 0.14] },
  { t: cues.callouts[2], tOut: 7.7, label: '数据吞吐', en: 'DATA', value: 1.28, unit: 'PB/s', fmt: (v) => v.toFixed(2), color: '#2FC9D6',
    anchor: V3(2.0, 3.75, -2.0), path: [V3(0, 0.46, 0), V3(6.51, 0, 0)], face: 'left', gap: V3(2.5, 0, -5.5), // round 2: hidden-line break behind the T80 mast
    spark: [0.1, 0.3, 0.2, 0.44, 0.38, 0.62, 0.55, 0.8, 0.72, 0.98] },
]);

const acc = new Accumulator(renderer, W, H);

world.hopPatch(acc.normalMat);
window.renderAt = async (t) => {
  // grade: -0.15 EV dip in the anticipation, +0.3 EV lift on the hit frame (decays in ~2 frames)
  const ig = cues.drop - 0.015;
  let ev = t < ig ? -0.15 * A.smooth(A.inv(cues.drop - 0.1, cues.drop - 0.033, t)) : 0.3 * Math.exp(-Math.max(0, t - cues.drop) * 30);
  acc.finalMat.uniforms.uExposure.value = Math.pow(2, ev);
  // round 2: AO +40 % in the clay phase, back to the hero value as the wave passes
  acc.aoMat.uniforms.uStrength.value = 1.05 * (1 + 0.4 * (1 - A.smooth(A.inv(ig, ig + 0.4, t))));
  acc.frame(world.scene, world.camera, SPP, (i, n, sub) => {
    const ts = Math.max(0, t + (sub.frac - 0.5) * SHUTTER / FPS);
    const tc = Math.max(0, t + (sub.frac - 0.5) * 0.2 / FPS); // camera: ~72 deg shutter -> crisp slides, objects keep 180 deg
    const tg = Math.max(0, t + (sub.frac - 0.5) * 0.25 / FPS); // growth (scale) channels: 90 deg shutter
    world.update(ts, sub, tc, tg);
  }, t);
  // DOM layer at the exact frame time
  world.update(t);
  tags(t, world.camera, world.camera.zoom);
  glx.finish();
};

// warm-up: compile everything once
world.update(9.5);
renderer.compile(world.scene, world.camera);
await window.renderAt(6.8);
await window.renderAt(9.5);
window.__ready = true;
