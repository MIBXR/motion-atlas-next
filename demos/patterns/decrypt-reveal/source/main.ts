import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { CardAppearance } from './appearance';
import { configureInternalOptics } from './internal-optics';
import { createArchiveLighting } from './archive-lighting';
import { SharedDepthAO, SharedDepthBokeh } from './shared-depth';
import { qualityPresets } from './render-quality';
import { resizeQuality, applyTextureQuality } from './quality-renderer';
import { decryptionFrame } from './decryption';
import { DocumentDecryption } from './document-decryption';
import { InspectionOverlay } from './inspection-overlay';
import { labelMarkSvg } from './brand';
import { damp, settlingWave, idleWave } from './motion';
import { archiveFraming } from './viewport-layout';

const MK = window.MotionKit, C = window.CONFIG;
const stage = MK.stage();
const host = document.querySelector<HTMLElement>('#three-scene')!;
const article = document.querySelector<HTMLElement>('#detail-content')!;
const r = C.file;
article.innerHTML = `<div class="detail-kicker"><span>FILE ${r.id}</span><span>${r.clearance}</span></div>
  <h2>${r.en}</h2><div class="detail-title-cn">${r.title}<span>${r.category}</span></div>
  <div class="detail-rule"></div>
  <dl class="metadata"><div><dt>DEPARTMENT / 科室</dt><dd>${r.department}</dd></div><div><dt>COLLECTION / 编目范围</dt><dd>${r.date}</dd></div><div><dt>RELATED / 相关人物</dt><dd>${r.lead}</dd></div><div><dt>STATUS / 状态</dt><dd><i></i>已归档 · 可读取</dd></div></dl>
  <div class="detail-tabs"><span>01 概述</span></div>
  <div class="tab-panel"><div class="panel-label">ABSTRACT / 摘要</div><p>${r.abstract}</p></div>`;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
host.append(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(C.background);
scene.fog = new THREE.Fog(C.background, 71, 84);
const camera = new THREE.PerspectiveCamera(34, stage.width / stage.height, 5, 300);
const key = createArchiveLighting(renderer, scene);
key.castShadow = true;
Object.assign(key.shadow.camera, {left: -16, right: 16, top: 15, bottom: -15, near: .1, far: 45});
key.shadow.mapSize.set(2048, 2048);
key.shadow.normalBias = .035;
key.shadow.bias = -.0003;
key.shadow.radius = 4;
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({color: '#d8c9b9', roughness: .95}));
floor.rotation.x = -Math.PI / 2;
floor.position.y = -4.63;
floor.receiveShadow = true;
scene.add(floor);
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const ao = new SharedDepthAO(scene, camera, 1, 1);
ao.kernelRadius = .38;
ao.minDistance = .001;
ao.maxDistance = .09;
composer.addPass(ao);
const bokeh = new SharedDepthBokeh(scene, camera, {focus: 72, aperture: .0008, maxblur: .011}, () => ao);
composer.addPass(bokeh);
composer.addPass(new OutputPass());
const quality = qualityPresets[new URLSearchParams(location.search).get('quality') ?? C.quality];
ao.enabled = quality.aoSamples > 0;
bokeh.enabled = quality.depthOfField > 0;
renderer.shadowMap.enabled = quality.shadows > 0;
key.shadow.mapSize.set(quality.shadows, quality.shadows);
const model = new THREE.Group(), appearance = new CardAppearance();
const overlay = new InspectionOverlay(), documentReveal = new DocumentDecryption();
const smooth = (t: number) => { t = THREE.MathUtils.clamp(t, 0, 1); return t*t*t*(10+t*(-15+6*t)); };
scene.add(model);
let currentTime = 0;

async function load() {
  await document.fonts.ready;
  const gltf = await MK.load.loader(() => new GLTFLoader().loadAsync(C.modelAsset));
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    const geom = object.geometry.clone().applyMatrix4(object.matrixWorld).scale(1, 1, 1);
    const source = object.material as THREE.MeshStandardMaterial;
    const name = source.name.replace(/\.\d+$/, '');
    const mat = source.clone() as THREE.MeshPhysicalMaterial;
    mat.envMapIntensity = .6;
    if (name === 'Frosted_Polymer') {
      mat.color.set('#fffdfa'); mat.transmission = .9; mat.thickness = .12; mat.roughness = .21;
      mat.ior = 1.46; mat.attenuationColor = new THREE.Color('#eee6df'); mat.attenuationDistance = 2;
    }
    if (name === 'Internal_Ceramic') { mat.color.set('#c7beb6'); mat.roughness = .6; }
    if (name === 'Printed_Label') mat.color.set('#eae5dc');
    if (name === 'Ivory_Edges') { mat.color.set('#f0e7df'); mat.roughness = .31; mat.transmission = .65; mat.thickness = .04; }
    if (name === 'Optical_Diffuser') { mat.color.set('#e2dad4'); mat.transmission = 0; mat.roughness = .7; }
    if (name === 'Subsurface_Optics') { mat.color.set('#b9aba1'); mat.roughness = .48; mat.metalness = .05; }
    if (name === 'Optical_Edges') { mat.transmission = 0; mat.color.set('#d4c7be'); mat.roughness = .26; mat.metalness = .08; }
    configureInternalOptics(name, mat);
    if (name === 'Carbon_Ink') return;
    const mesh = new THREE.Mesh(geom, mat);
    mesh.userData.surface = name;
    mesh.castShadow = name === 'Optical_Diffuser'; mesh.receiveShadow = true;
    model.add(mesh); appearance.register(name, mat);
  });
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 1024; labelCanvas.height = 440;
  const mark = new Image(); mark.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(labelMarkSvg)}`;
  await mark.decode();
  const c = labelCanvas.getContext('2d')!;
  c.fillStyle = '#e6e2d9'; c.fillRect(0, 0, 1024, 440);
  c.fillStyle = '#171713'; c.fillRect(12, 12, 1000, 6); c.fillRect(12, 419, 1000, 3);
  c.font = 'bold 81px MiSans'; c.fillText('RHINE LAB, LLC.', 22, 116);
  c.font = '32px MiSans'; c.fillStyle = '#878476'; c.fillText('INTERNAL DATABASE', 25, 174);
  c.fillStyle = '#171713'; c.font = 'bold 130px MiSans'; c.fillText('NO.001', 22, 360);
  c.fillRect(782, 32, 221, 39); c.fillStyle = '#eee9de'; c.font = '24px MiSans'; c.fillText('R L / I S', 809, 61);
  c.fillStyle = '#171713'; c.font = 'bold 64px MiSans'; c.fillText('INFO', 830, 143); c.drawImage(mark, 790, 242, 210, 98);
  const texture = new THREE.CanvasTexture(labelCanvas); texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const label = new THREE.Mesh(new THREE.PlaneGeometry(.99, .46), new THREE.MeshBasicMaterial({map: texture, toneMapped: false, transparent: true, depthWrite: false}));
  label.position.set(-1.36, 3.04, .255); model.add(label);
  appearance.prepare(model); appearance.apply(model, 1);
  applyTextureQuality(scene, renderer, quality);
  layout();
}

function layout() {
  const dimensions = resizeQuality(renderer, composer, host, quality);
  ao.setSize(Math.max(1, Math.floor(dimensions.width * quality.aoResolution)), Math.max(1, Math.floor(dimensions.height * quality.aoResolution)));
  ao.setSharing(ao.enabled && bokeh.enabled && quality.aoResolution === 1);
  camera.aspect = stage.width / stage.height;
  pose(currentTime);
}

function pose(t: number) {
  const lift = {value: .4, velocity: 0};
  let detail = 0, ready = false, elapsed = 0, count = 0, clock = 0;
  let fov = THREE.MathUtils.radToDeg(2*Math.atan(7.33/280));
  let idleGain = 1-Math.exp(-.8*Math.max(0,C.arrayIdleSeconds-2.5));
  const cameraAim = new THREE.Vector3(-1.091,-.045,.481);
  const modelPosition = new THREE.Vector3();
  const yaw = THREE.MathUtils.degToRad(59), elevation = THREE.MathUtils.degToRad(19);
  const baseDirection = new THREE.Vector3(-Math.sin(yaw)*Math.cos(elevation), Math.sin(elevation), Math.cos(yaw)*Math.cos(elevation));
  const position = cameraAim.clone().addScaledVector(baseDirection,140);
  const step = (dt: number) => {
    clock += dt;
    idleGain *= Math.exp(-dt*4);
    damp(lift, 4.05, 4.2, dt);
    const target = smooth((lift.value-.8)/2.4);
    detail = THREE.MathUtils.lerp(detail, target, 1-Math.exp(-dt*2.8));
    modelPosition.set(0, -4.6+settlingWave(0,26.56)+idleWave(12,2,C.arrayIdleSeconds+clock)*idleGain+lift.value, -2.17);
    const direction = baseDirection.clone().lerp(new THREE.Vector3(-.277,.238,.931),detail).normalize();
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0),direction).normalize();
    const up = new THREE.Vector3().crossVectors(direction,right).normalize();
    const framing = archiveFraming(stage.width,stage.height,7.33,detail,false);
    const scale = stage.height/framing.span;
    const detailAim = modelPosition.clone().add(new THREE.Vector3(0,1.85,0));
    detailAim.addScaledVector(right,(.5-framing.detailX)*stage.width/scale);
    detailAim.addScaledVector(up,(framing.detailY-.5)*stage.height/scale);
    const aim = new THREE.Vector3(-1.091,-.045,.481).lerp(detailAim,detail);
    const distance = THREE.MathUtils.lerp(140,72,detail), blend=1-Math.exp(-dt*5);
    position.lerp(aim.clone().addScaledVector(direction,distance),blend);
    cameraAim.lerp(aim,blend);
    fov=THREE.MathUtils.lerp(fov,THREE.MathUtils.radToDeg(2*Math.atan(framing.span/(2*distance))),blend);
    if (!ready && detail>.78 && lift.value>3.3) ready=true;
  };
  while (!ready) {step(1/60);count++;}
  const readyFrame = count;
  while (elapsed+1/60<=t+1e-9) {step(1/60);elapsed+=1/60;count++;}
  if(t-elapsed>1e-9)step(t-elapsed);
  model.position.copy(modelPosition);
  camera.position.copy(position);camera.lookAt(cameraAim);camera.fov=fov;
  camera.updateProjectionMatrix(); camera.updateMatrixWorld();
  const distance=position.distanceTo(cameraAim);
  scene.fog.near = distance+THREE.MathUtils.lerp(5,-1,detail);
  scene.fog.far = distance+THREE.MathUtils.lerp(25,12,detail);
  const visibility=smooth((detail-.25)/.55);
  stage.root.style.setProperty('--detail-shade',String(visibility));
  article.style.opacity=String(visibility);
  article.style.translate=`0 ${(1-visibility)*18}px`;
  const focalPoint = model.position.clone().add(new THREE.Vector3(0, 2, 0)).applyMatrix4(camera.matrixWorldInverse);
  bokeh.uniforms.focus.value = -focalPoint.z;
  bokeh.uniforms.aperture.value = THREE.MathUtils.lerp(.0003, .0008, detail) * quality.depthOfField / 100;
  return {readyFrame,frame:count,detail,lift:lift.value,modelPosition:model.position.toArray(),cameraPosition:camera.position.toArray(),fieldOfView:fov};
}
const resources = load();
MK.preload([{label: '档案模型与字体', run: () => resources}]);
const revealAt = (38.84 - C.decryptionStart) / C.interactiveRate;
const firstClearFrame = Math.floor(revealAt * 60 + 1) / 60;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const tl = MK.timeline({duration: C.duration, markers: [
  {t: 0, label: '准备解密'}, {t: (36.04-C.decryptionStart)/C.interactiveRate, label: '对角线接通'},
  {t: (37.72-C.decryptionStart)/C.interactiveRate, label: '线条收束'}, {t: revealAt, label: '玻璃转清'},
  {t: firstClearFrame+C.documentDuration, label: '正文可读'}
], async render(t: number) {
  await resources;
  const time = reduced.matches ? C.decryptionEnd : C.decryptionStart + t * C.interactiveRate;
  currentTime = reduced.matches ? C.duration : t;
  const geometry=pose(currentTime);
  const frame = decryptionFrame(time);
  appearance.setClarity(model, frame.clarity);
  model.updateMatrixWorld(true);
  overlay.render(frame, (x: number, y: number) => {
    const p = model.localToWorld(new THREE.Vector3(x, y, .255)).project(camera);
    return [(p.x+1)*stage.width/2, (1-p.y)*stage.height/2];
  }, false);
  documentReveal.reset(article, reduced.matches);
  if (!reduced.matches && t >= firstClearFrame) {
    documentReveal.update(firstClearFrame, frame, false);
    documentReveal.update(firstClearFrame + (t-firstClearFrame)*.95/C.documentDuration, frame, false);
  }
  scene.updateMatrixWorld(true);
  composer.render();
  window.__decrypt = {time: t, referenceTime: time, frame, geometry, project: (x: number, y: number) => model.localToWorld(new THREE.Vector3(x,y,.255)).project(camera).toArray()};
}});
stage.on('orient', layout);
stage.on('resize', layout);
MK.expose(tl, {title: '对角解密与磨砂转清'});
MK.controls(tl);
MK.start(tl, {reduced: C.duration});
