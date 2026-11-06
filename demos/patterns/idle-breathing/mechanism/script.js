const MK = MotionKit, $ = (s) => document.querySelector(s);
$('#cards').innerHTML = Array.from({ length: CONFIG.count }, (_, i) => `<div class="card${i === 4 ? ' sel' : ''}"></div>`).join('');
const cards = [...document.querySelectorAll('.card')];
let extra = [];
const g = $('#wave').getContext('2d');
const breath = (t, i) => {
  const row = i % 3 - 1, lane = Math.floor(i / 3) - 1;
  return CONFIG.amplitudes.reduce((sum, a, j) => sum + a * Math.sin(2 * Math.PI * t / CONFIG.periods[j] + row * CONFIG.phase[j][0] + lane * CONFIG.phase[j][1]), 0);
};
function idleGain(t, inputs) {
  const edges = [...new Set([0, ...inputs, ...inputs.map(x => x + CONFIG.idleAfter), t])].filter(x => x >= 0 && x <= t).sort((a,b) => a-b);
  let gain = 0;
  for (let i = 1; i < edges.length; i++) {
    const a = edges[i - 1], b = edges[i], last = Math.max(0, ...inputs.filter(x => x <= a));
    const target = (a + b) / 2 - last > CONFIG.idleAfter ? 1 : 0;
    const rate = target ? CONFIG.enterRate : CONFIG.exitRate;
    gain += (target - gain) * (1 - Math.exp(-(b - a) * rate));
  }
  return gain;
}
function render(t) {
  const inputs = [...CONFIG.inputs, ...extra].filter((x) => x <= t);
  const last = Math.max(0, ...inputs);
  const idle = t - last;
  const on = MK.prefersReducedMotion() ? 0 : idleGain(t, inputs);
  cards.forEach((c, i) => { c.style.transform = `translateY(${(-on * CONFIG.pixelsPerUnit * breath(t, i)).toFixed(3)}px)`; });
  $('#label').textContent = on > 0 ? `IDLE ${idle.toFixed(1)} s · 呼吸强度 ${(on * 100).toFixed(0)}%` : `ACTIVE · 距上次操作 ${Math.max(0, idle).toFixed(1)} s`;
  $('#idleBar').style.width = `${on * 100}%`;
  $('#thresh').style.left = `${(1 - Math.exp(-1)) * 100}%`;
  // 曲线：两周期叠加的形状（灰）与当前时刻（橙点）
  g.clearRect(0, 0, 620, 90);
  g.strokeStyle = '#bdb8ad'; g.lineWidth = 1.5; g.beginPath();
  for (let x = 0; x <= 620; x += 4) { const tt = t - 6 + (x / 620) * 12; g.lineTo(x, 45 - breath(tt, 4) / 0.102 * 34); }
  g.stroke();
  g.fillStyle = '#c8742f'; g.beginPath(); g.arc(310, 45 - breath(t, 4) / 0.102 * 34, 5, 0, Math.PI * 2); g.fill();
}
const tl = MK.timeline({ duration: CONFIG.duration, render, loop: true, markers: [{ t: CONFIG.inputs[0], label: '操作' }, { t: CONFIG.inputs[0] + CONFIG.idleAfter, label: '进入空闲' }, { t: CONFIG.inputs[1], label: '操作打断' }] });
const seek = tl.seek, play = tl.play;
tl.seek = t => { extra = []; return seek(t); };
tl.play = () => { extra = []; return play(); };
tl.on('loop', () => { extra = []; });
$('#poke').addEventListener('click', () => {
  if (document.documentElement.dataset.motionReady !== '1') return;
  extra.push(tl.time); if (!tl.playing) play();
});
MK.expose(tl);
MK.controls(tl, { accent: '#c8742f' });
MK.start(tl, { t: 0, reduced: 0.3 });
