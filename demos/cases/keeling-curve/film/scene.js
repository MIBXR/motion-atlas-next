import { DUR, FPS, TIMES, EVENTS, ENTRY } from './timeline.js';
import { setupCanvas, loadFonts, lerp, seg, glide, ease } from './motion.js';
import { loadData } from './data.js';

const W = 1920, H = 1080;
const ctx = setupCanvas(document.getElementById('c'), W, H);
const U = Math.min(W / 1920, H / 1080);
const C = { paper: '#F3F1E9', ink: '#202820', orange: '#D85835', muted: '#697268', context: '#A5AAA0', rule: '#D7DACF', credit: '#92998F' };
const data = await loadData();
const { monthly, first, last } = data;
const season = monthly.filter(d => d.year === 2025 && d.value !== null);
const peak = season.reduce((a, d) => d.value > a.value ? d : a);
const trough = season.reduce((a, d) => d.value < a.value ? d : a);
const plot = { l: 155, r: 1760, t: 445, b: 865 };
const full = { x0: 1958, x1: 2026, y0: 308, y1: 440 };
const close = { x0: 2023, x1: 2026, y0: 414, y1: 434 };
const font = (size, weight = 400, mono = false) => `${weight} ${size}px ${mono ? 'Plex' : 'Noto'}`;

function text(str, x, y, size = 28, color = C.ink, weight = 400, align = 'left', mono = false) {
  ctx.font = font(size, weight, mono); ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = color; ctx.fillText(str, x, y);
}
function line(x0, y0, x1, y1, color = C.rule, width = 1) {
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
}
function dot(x, y, radius = 5, color = C.orange) {
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
}
function scale(view) {
  return { x: d => lerp(plot.l, plot.r, (d - view.x0) / (view.x1 - view.x0)), y: d => lerp(plot.b, plot.t, (d - view.y0) / (view.y1 - view.y0)) };
}
function drawPath(points, s, color, width = 4) {
  ctx.beginPath(); let connected = false;
  for (const d of points) {
    if (d.value === null) { connected = false; continue; }
    const x = s.x(d.date), y = s.y(d.value);
    if (!connected) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    connected = true;
  }
  ctx.lineWidth = width; ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
}
function axes(view, focus) {
  const s = scale(view);
  line(plot.l, plot.b, plot.r, plot.b, C.context, 1.5);
  text('CO₂ / ppm', plot.r, plot.t - 35, 22, C.muted, 400, 'right');
  text('纵轴未从零开始', plot.l, plot.b + 85, 20, C.muted);
  const years = focus ? [2023, 2024, 2025] : [1958, 2025];
  years.forEach(year => {
    const x = s.x(year);
    if (x < plot.l || x > plot.r) return;
    line(x, plot.b, x, plot.b + 12, C.context, 1.5);
    text(String(year), x, plot.b + 45, 24, C.muted, 500, 'center', true);
  });
  if (!focus) {
    for (const d of [first, last]) {
      const y = s.y(d.value);
      if (y < plot.t || y > plot.b) continue;
      line(plot.l, y, plot.r, y, C.rule);
      text(d.value.toFixed(2), plot.l - 18, y + 7, 20, C.muted, 500, 'right', true);
    }
  }
  return s;
}
function metric(d, x, y, size = 132) {
  text(d.value.toFixed(2), x, y, size, C.ink, 500, 'left', true);
  const w = ctx.measureText(d.value.toFixed(2)).width;
  text('ppm', x + w + 22, y - 4, 30, C.muted, 500, 'left', true);
  text(`${d.year} · 年均 CO₂`, x + 3, y + 45, 24, C.muted);
}
function frame(t) {
  ctx.fillStyle = C.paper; ctx.fillRect(0, 0, 1920, 1080);
  text('基林曲线', 96, 78, 26, C.ink, 700);
  text('夏威夷 · 莫纳罗亚', 1824, 78, 24, C.muted, 400, 'right');
  line(96, 112, 1824, 112);
  line(96, 978, 1824, 978);
  if (t >= EVENTS.source) {
    const entry = glide(seg(t, EVENTS.source - 1 / FPS, EVENTS.source + ENTRY.source));
    ctx.save(); ctx.globalAlpha = entry;
    ctx.translate(0, (1 - entry) * 12);
    text('数据：NOAA GML · 莫纳罗亚观测站 CO₂ 月均值', 96, 1030, 24, C.muted);
    text('音乐：“Dreams Become Real” Kevin MacLeod（incompetech.com）· CC BY 4.0', 96, 1064, 24, C.credit);
    ctx.restore();
  }
}
function seasonLabels(s, amount) {
  ctx.save(); ctx.globalAlpha = amount;
  for (const d of [peak, trough]) {
    const x = s.x(d.date), y = s.y(d.value), isPeak = d === peak;
    const labelY = isPeak ? y - 48 : y + 75;
    line(x, y + (isPeak ? -8 : 8), x, labelY + (isPeak ? 14 : -29), C.orange, 1.5);
    dot(x, y, 6);
    text(d.value.toFixed(2), x, labelY, 33, C.orange, 500, 'center', true);
    text(`${d.month}月`, x + 88, labelY - 2, 21, C.muted);
  }
  ctx.restore();
}

window.DUR = DUR;
window.render = t => {
  ctx.save(); ctx.translate((W - 1920 * U) / 2, (H - 1080 * U) / 2); ctx.scale(U, U);
  frame(t);
  const hook = t < TIMES.drawStart;
  const ending = t >= TIMES.wide;
  const zoom = t < TIMES.close ? ease.inOutCubic(seg(t, TIMES.zoomIn, TIMES.close)) : 1 - ease.inOutCubic(seg(t, TIMES.zoomOut, TIMES.wide));
  const focus = zoom > 0.85;
  const xSpan = Math.exp(lerp(Math.log(full.x1 - full.x0), Math.log(close.x1 - close.x0), zoom));
  const ySpan = Math.exp(lerp(Math.log(full.y1 - full.y0), Math.log(close.y1 - close.y0), zoom));
  const y1 = lerp(full.y1, close.y1, zoom);
  const view = { x0: full.x1 - xSpan, x1: full.x1, y0: y1 - ySpan, y1 };
  if (hook) {
    text('地球在「呼吸」。', 96, 234, 80, C.ink, 700);
    text('但 CO₂ 的底线，逐年抬高。', 100, 298, 30, C.muted);
    metric(first, 1115, 285, 100);
  } else if (ending) {
    text('长期趋势，持续上升。', 96, 218, 67, C.ink, 700);
    text('起伏，是季节。', 100, 285, 32, C.muted);
    metric(first, 100, 363, 80);
    metric(last, 1120, 315, 124);
  } else if (focus) {
    text('起伏，是季节。', 96, 234, 80, C.ink, 700);
    text('北半球植被生长与衰退', 100, 298, 30, C.muted);
    text('2025', 1800, 245, 72, C.orange, 500, 'right', true);
    text('月均 CO₂ · 局部放大', 1800, 298, 26, C.muted, 400, 'right');
  } else {
    text('同一条曲线，两种尺度。', 96, 234, 72, C.ink, 700);
    text('每个点，对应一次月均记录。', 100, 298, 30, C.muted);
    text('1958—2025', 1800, 245, 58, C.ink, 500, 'right', true);
    text('大气 CO₂ 浓度', 1800, 298, 26, C.muted, 400, 'right');
  }
  const s = axes(view, focus);
  const drawnDate = t < TIMES.drawStart
    ? lerp(monthly[0].date, 1964, seg(t, EVENTS.firstStroke, TIMES.drawStart))
    : lerp(1964, monthly.at(-1).date, seg(t, TIMES.drawStart, TIMES.drawEnd));
  const shown = t < EVENTS.firstStroke ? [] : monthly.filter(d => d.date <= drawnDate);
  ctx.save(); ctx.beginPath(); ctx.rect(plot.l, plot.t - 2, plot.r - plot.l, plot.b - plot.t + 2); ctx.clip();
  drawPath(shown, s, zoom > 0.05 ? C.context : C.orange, 4);
  if (zoom > 0.05 && t >= EVENTS.peak) { ctx.globalAlpha = zoom; drawPath(season, s, C.orange, 5); ctx.globalAlpha = 1; }
  const current = shown.at(-1);
  if (current && zoom < 0.85) dot(s.x(current.date), s.y(current.value), 6);
  ctx.restore();
  if (focus && t >= EVENTS.peak) seasonLabels(s, glide(seg(t, EVENTS.peak - 1 / FPS, EVENTS.peak + ENTRY.peak)) * Math.min(1, zoom * 3));
  if (hook) {
    if (t >= EVENTS.firstStroke) { const origin = monthly[0]; dot(s.x(origin.date), s.y(origin.value), 5); }
    text('观测始于 1958', 360, 813, 24, C.muted);
  }
  if (ending) text('1959 · 2025 为年均值', 1760, 950, 20, C.muted, 400, 'right');
  ctx.restore();
};
await loadFonts([font(30, 400), font(80, 700), font(24, 600), font(132, 500, true)]);
window.render(0);
window.READY = true;
