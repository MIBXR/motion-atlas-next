const FPS = 24, N = 240;
window.DEMO = { width: 1920, height: 1080, fps: FPS, duration: 10, motionBlur: { samples: 1, shutter: 0.5 } };

let CUES = null;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const expoOut = (u) => (u >= 1 ? 1 : 1 - Math.pow(2, -10 * u));
const quartOut = (u) => 1 - Math.pow(1 - u, 4);
function prog(t, t0, dur) { return clamp((t - t0) / dur); }
// seeded per-frame hash for grain offsets
function hash(i) { let x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

const plate = document.getElementById('plate');
const words = [...document.querySelectorAll('.en .w')];
const rule = document.getElementById('rule');
const zh = document.getElementById('zh');
const grain = document.getElementById('grain');
const scrim = document.getElementById('scrim');
const dofs = [...document.querySelectorAll('.dofl')];
const vig = document.getElementById('vig');
const plate2 = document.getElementById('plate2');
const smooth = (u) => { u = clamp(u); return u * u * (3 - 2 * u); };

let loadingFrame = -1, requestedFrame = -1, loading;
function loadFrame(i) {
  if (loadingFrame !== i) {
    loadingFrame = i;
    loading = MotionKit.load.image(`./assets/frames/${String(i).padStart(4, '0')}.webp`).then(image => image.src);
  }
  return loading;
}

window.renderAt = async (t) => {
  const i = Math.min(N - 1, Math.max(0, Math.round(t * FPS)));
  requestedFrame = i;
  const src = await loadFrame(i);
  if (requestedFrame !== i) return;
  plate.src = plate2.src = src;
  const T0 = CUES.tagline;
  // English line: words rise + unblur + track in, staggered, expo-out (long tail, like the camera)
  words.forEach((w, k) => {
    const u = prog(t, T0 + 0.07 * k, 0.9);
    const e = expoOut(u);
    w.style.opacity = String(clamp(u * 2.2));
    w.style.transform = `translateY(${(1 - e) * 14}px)`;
    w.style.filter = `blur(${(1 - e) * 7}px)`;
    w.style.letterSpacing = `${0.26 + (1 - e) * 0.2}em`;
  });
  const ur = expoOut(prog(t, T0 + 0.22, 0.8));
  rule.style.transform = `scaleX(${ur})`;
  rule.style.opacity = String(0.55 * clamp(ur * 1.5));
  const uz = prog(t, T0 + 0.30, 0.9), ez = expoOut(uz);
  zh.style.opacity = String(clamp(uz * 2.0));
  zh.style.transform = `translateY(${(1 - ez) * 10}px)`;
  zh.style.filter = `blur(${(1 - ez) * 6}px)`;
  scrim.style.opacity = String(quartOut(prog(t, T0 - 0.1, 1.0)));
  const od = String(quartOut(prog(t, T0 - 0.2, 1.2)));   // reads as a rack: the foreground softens as the type arrives
  dofs.forEach((d) => { d.style.opacity = od; });
  const fh = Math.round(CUES.hero * FPS), df = i - fh;
  const pun = df >= 0 ? 0.035 * (1 - expoOut(df / 6)) : 0;
  const shk = [2, -1.5, 1, -0.5][df] || 0;
  const tc = t - 8.4, crp = tc <= 0 ? 0 : 0.0092 * (tc < 0.6 ? tc * tc / 1.2 : tc - 0.3);
  const org = t >= 8.0 ? '960px 560px' : '1280px 640px';   // switch while scale is exactly 1 (punch long over, creep not started)
  plate.style.transformOrigin = org; plate2.style.transformOrigin = org;
  plate.style.transform = `translateY(${shk}px) scale(${1 + pun + crp})`;
  const op = 1 - smooth((t - 0.6) / 0.3);
  plate2.style.transform = plate.style.transform;
  plate2.style.opacity = String(op);   // lerp to the darker opening grade
  vig.style.background = `radial-gradient(ellipse 72% 70% at 50% 47%, rgba(0,0,0,0) ${55 - 8 * op}%, rgba(58,30,66,${(0.20 + 0.12 * op).toFixed(3)}) 100%)`;

  // grain boil: new seeded offset every frame
  grain.style.transform = `translate(${Math.round(hash(i) * 64 - 32)}px, ${Math.round(hash(i + 999) * 64 - 32)}px)`;
};

  CUES = await (await MotionKit.load.fetch('./film/cues.json')).json();
  await document.fonts.load("600 21px 'DM Sans'", 'SOFTNESS CARRIES WEIGHT');
  await document.fonts.load("500 20px 'Noto Sans SC'", '柔软自有分量');
  await document.fonts.ready;
  await MotionKit.load.image('./assets/textures/grain/grain_fine_2048.png');
  await window.renderAt(0);
