export const width = 1920, height = 1080, duration = 122.005, fps = 60;
const C = {
  white: [255, 255, 255], red: [232, 8, 39], ink: [24, 24, 24],
  olive: [129, 122, 69], muted: [136, 136, 136], grid: [230, 230, 230],
  gridRed: [235, 43, 69], baseline: [143, 143, 143], baselineRed: [240, 94, 115]
};
export const ROWS = [
  ['Fl.', 242], ['Ob.', 274], ['Cl.', 306], ['Bsn.', 338],
  ['Hn.', 382], ['Trp.', 414], ['Trb.', 446],
  ['Cym.', 490], ['Mar.', 522], ['Pf.', 554], ['Hp.', 586],
  ['Vln. I', 630], ['Vln. II', 662], ['Va.', 694], ['Vc.', 726], ['Cb.', 758]
];
const NAMES = ['Ob.', 'Va.', 'Hn.', 'Cl.', 'Hn.', 'Fl.', 'Ob.', 'Cl.', 'Cl.'];
const ICONS = ['instrument-01-ob', 'instrument-02-va', 'instrument-03-hn', 'instrument-04-cl', 'instrument-05-hn', 'instrument-06-fl', 'instrument-07-ob', 'instrument-08-cl', 'instrument-09-cl'];
const ICON_BOXES = [[1187,926,1209,965],[1230,926,1253,965],[1266,926,1304,965],[1314,926,1340,965],[1352,926,1390,965],[1395,930,1432,956],[1443,926,1470,965],[1486,926,1513,965],[1529,926,1556,965]];
const ICON_X = [1198,1241,1284,1327,1370,1413,1456,1499,1542];
const SCENES = [
  { t: 0, ja: '', en: '', keyJa: '', keyEn: '' },
  { t: 4.783333, ja: '第一場', en: 'Scene I — Section A · bars 3–10', keyJa: 'ヘ長調', keyEn: 'F major' },
  { t: 20.15, ja: '第二場', en: 'Scene II — Section B · bars 11–14', keyJa: 'ニ長調', keyEn: 'D major' },
  { t: 27.766667, ja: '間奏', en: 'Interlude — bars 15–22', keyJa: '変ロ長調', keyEn: 'B♭ major' },
  { t: 43.466667, ja: '第三場', en: 'Scene III — Sections C–D · bars 23–42', keyJa: 'イ長調', keyEn: 'A major' },
  { t: 81.016667, ja: '第四場', en: 'Scene IV — Sections E–F · bars 43–57', keyJa: 'ホ長調', keyEn: 'E major' }
];
const getJSON = async path => (await MotionKit.load.fetch(new URL(path, import.meta.url).href)).json();
const [score, timeline, bars, shots, annotations, rowStates, titleGlyphs] = await Promise.all(['notes', 'timeline', 'bars', 'shots', 'annotations', 'rowStates', 'titleGlyphs'].map(name => getJSON(`./data/${name}.json`)));
await Promise.all([
  document.fonts.load('700 62px Shippori', '蝶の舞う庭第一場第二場第三場第四場間奏'),
  document.fonts.load('italic 500 26px Cormorant', 'Scene I Section A Fl. Ob. Cl. 0123456789'),
  document.fonts.load('italic 600 111px Cormorant', '0123456789'),
  document.fonts.load('500 25px NotoSerif', '马林巴与钢琴'),
  document.fonts.load('700 38px NotoSerif', '曲式赏析')
]);
await document.fonts.ready;
const images = {};
const imageNames = ['official-white', 'official-intro-red', 'giraffe-medallion-black', 'giraffe-medallion-white', ...ICONS.flatMap(name => ['black', 'red', 'white'].map(color => `${name}-${color}`))];
await Promise.all(imageNames.map(async name => { images[name] = await MotionKit.load.image(new URL(`../assets/${name}.png`, import.meta.url).href); }));

const canvas = document.createElement('canvas');
canvas.setAttribute('aria-label', '蝶の舞う庭，前57小节滚动总谱');
document.querySelector('#stage').appendChild(canvas);
const ctx = canvas.getContext('2d');
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, p) => a + (b - a) * p;
const smooth = p => { p = clamp(p); return p * p * (3 - 2 * p); };
const segment = (t, a, b) => smooth((t - a) / (b - a));
const windowAt = (t, a, b, c, d) => segment(t, a, b) * (1 - segment(t, c, d));
const mix = (a, b, p) => a.map((v, i) => lerp(v, b[i], p));
const rgb = color => `rgb(${color.map(x => Math.round(x)).join(',')})`;
const ink = q => rgb(mix(C.ink, C.white, q));
const accent = q => rgb(mix(C.red, C.white, q));
const olive = q => rgb(mix(C.olive, C.white, q));
function sample(keys, t) {
  if (t <= keys[0][0]) return keys[0].slice(1);
  if (t >= keys.at(-1)[0]) return keys.at(-1).slice(1);
  let lo = 0, hi = keys.length - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (keys[m][0] <= t) lo = m; else hi = m; }
  const p = (t - keys[lo][0]) / (keys[hi][0] - keys[lo][0]);
  return keys[lo].slice(1).map((v, i) => lerp(v, keys[hi][i + 1], p));
}
function font(size, family = 'Cormorant', weight = 500) { ctx.font = `${family === 'Cormorant' ? 'italic ' : ''}${weight} ${size}px "${family}", "NotoSerif", serif`; }
function text(value, x, y, size, family = 'Cormorant', weight = 500, spacing = 0, align = 'left') {
  font(size, family, weight); ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
  if (!spacing) { ctx.fillText(value, x, y); return ctx.measureText(value).width; }
  const chars = [...value], advances = chars.map(c => ctx.measureText(c).width), total = advances.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let at = align === 'right' ? x - total : align === 'center' ? x - total / 2 : x;
  ctx.textAlign = 'left';
  chars.forEach((c, i) => { ctx.fillText(c, at, y); at += advances[i] + spacing; });
  return total;
}
function glyph(value, x, y, size, family = 'Shippori', weight = 700) {
  font(size, family, weight); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  const m = ctx.measureText(value); ctx.fillText(value, x + m.actualBoundingBoxLeft, y + m.actualBoundingBoxAscent);
}
function line(x0, y0, x1, y1, thickness = 1.5) { ctx.lineWidth = thickness; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); }
function bar(x0, x1, y, h) { if (x1 <= x0) return; ctx.beginPath(); ctx.roundRect(x0, y - h / 2, x1 - x0, h, Math.min(h / 2, (x1 - x0) / 2)); ctx.fill(); }
function image(name, x, y, w, h, alpha = 1) { if (alpha <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(alpha); ctx.drawImage(images[name], x, y, w, h); ctx.restore(); }
function imageBlend(normal, inverse, box, q, alpha = 1) { image(normal, ...box, alpha); if (q > 0) image(inverse, ...box, alpha * q); }
function background(t) {
  let q = 0;
  for (const e of shots.backgrounds) { if (t >= e.t1) q = e.to; else if (t >= e.t0) { q = sample(e.curve, t)[0]; break; } }
  return clamp(q);
}
function focusAt(t) {
  const f = shots.focus.find(f => t >= f.t0 && t <= f.t1);
  if (!f) return { p: 0, sx: 1, sy: 1, head: 880, rows: new Map() };
  const [p, head, ...positions] = sample(f.curve, t);
  return { p, sx: lerp(1, f.maxX, p), sy: lerp(1, f.maxY, p), head, rows: new Map(f.rows.map((row, i) => [row, positions[i]])), id: f.id };
}
function positionY(row, offset, focus) { return focus.states.get(row)[0] + offset * (focus.rows.has(row) ? focus.sy : focus.globalSy ?? focus.sx); }
function positionX(x, t, focus) { return focus.head + (x - 190 * t) * focus.sx; }
function rowOpacity(row, focus) { return focus.states.get(row)[1]; }
function rowShift(row, focus) { return focus.states.get(row)[0] - (ROWS.find(r => r[0] === row)?.[1] ?? 798); }
function stateAt(note, t, q) {
  const get = mode => {
    const s = score.rowColors[`${note.row}:${mode}`], attack = smooth((t - note.x0 / 190) / Math.max(s.attack, .000001)), release = smooth((t - (note.x1 + 6) / 190 - s.delay) / s.release);
    const current = attack * (1 - release), past = attack * release;
    const levels = note.stateAlpha ? note.stateAlpha[mode] : s.paint.alpha;
    return { color: s.paint.color, opacity: levels[0] * (1 - attack) + levels[1] * current + levels[2] * past, current, attack };
  };
  const a = get(0), b = get(1);
  const opacity = lerp(a.opacity, b.opacity, q);
  return { color: a.color.map((v, i) => opacity ? (v * a.opacity * (1 - q) + b.color[i] * b.opacity * q) / opacity : v), opacity, current: lerp(a.current, b.current, q), attack: lerp(a.attack, b.attack, q) };
}

function giants(t, q) {
  for (const e of shots.giants) {
    if (t < e.t0 || t >= e.t1) continue;
    for (const group of e.groups) {
      const m = sample(group.homography, t);
      for (const g of group.glyphs) {
        const alpha = sample(g.opacity, t)[0];
        if (alpha <= 0) continue;
        ctx.save(); ctx.globalAlpha = clamp(alpha); ctx.fillStyle = e.color === 'white' ? '#fff' : rgb(C.red);
        ctx.beginPath();
        for (const contour of titleGlyphs.glyphs[g.char].contours) {
          contour.forEach(([dx, dy], i) => {
            const u = g.x + dx, v = g.baseline + dy, w = m[6] * u + m[7] * v + m[8];
            const x = (m[0] * u + m[1] * v + m[2]) / w, y = (m[3] * u + m[4] * v + m[5]) / w;
            if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
          });
          ctx.closePath();
        }
        ctx.fill(titleGlyphs.fillRule); ctx.restore();
      }
    }
  }
}
function scoreRows(t, q, focus, alpha) {
  const sheetFade = 1 - segment(t, 116.9, 118.5);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 185, 1620, 661); ctx.clip();
  for (const [row, y] of ROWS) {
    const selected = focus.rows.has(row), cy = positionY(row, 0, focus), sx = focus.sx, op = rowOpacity(row, focus, t);
    if (op < .001) continue;
    ctx.save(); ctx.globalAlpha *= op; ctx.strokeStyle = ink(q); ctx.globalAlpha *= lerp((255 - 230) / (255 - 24), (43 - 8) / (255 - 8), q);
    line(positionX(190 * t - 700, t, focus), cy + .5, positionX(190 * t + 700, t, focus), cy + .5, 1);
    ctx.globalAlpha /= lerp((255 - 230) / (255 - 24), (43 - 8) / (255 - 8), q);
    const active = sample(rowStates.nameStates[row], t)[0], marker = sample(rowStates.markers[row], t)[0];
    ctx.fillStyle = rgb(mix(mix(C.muted, [35, 0, 5], q), mix(C.ink, C.white, q), active));
    text(row, positionX(190 * t - 720, t, focus), cy + 8 * sx, 24 * sx, 'Cormorant', 500, 0, 'right');
    if (marker > .001) { ctx.save(); ctx.globalAlpha *= marker; ctx.fillStyle = accent(q); ctx.fillRect(positionX(190 * t - 712, t, focus), cy - 9 * sx, 3 * sx, 18 * sx); ctx.restore(); }
    ctx.restore();
  }
  ctx.save(); ctx.beginPath(); ctx.rect(Math.max(0, focus.head - 700 * focus.sx), 185, Math.min(1620, focus.head + 700 * focus.sx) - Math.max(0, focus.head - 700 * focus.sx), 665); ctx.clip();
  for (const n of score.notes) {
    const selected = focus.rows.has(n.row), sx = focus.sx;
    const shotValues = n.shotCurves?.[focus.id] ? sample(n.shotCurves[focus.id], t) : null;
    const x0 = shotValues ? shotValues[0] : positionX(n.x0, t, focus), x1 = shotValues ? shotValues[1] : positionX(n.x1, t, focus);
    if (x1 < (focus.id === 'focus-cym-pf' ? 0 : 120) || x0 > 1620) continue;
    const op = rowOpacity(n.row, focus, t); if (op < .001) continue;
    const s = stateAt(n, t, q), h = shotValues ? shotValues[3] : (n.futureThickness * (1 - s.attack) + n.currentThickness * s.current + n.thickness * (s.attack - s.current)) * sx;
    ctx.save(); ctx.globalAlpha *= op * s.opacity; ctx.fillStyle = rgb(s.color);
    const y = shotValues ? shotValues[2] : positionY(n.row, n.yOffset, focus);
    if (n.kind === 'dot') { ctx.beginPath(); ctx.ellipse((x0 + x1) / 2, y, (x1 - x0) * (.5 + .12 * s.current), h / 2, 0, 0, Math.PI * 2); ctx.fill(); }
    else if (n.taper) {
      const ends = [0, 1].map(i => (n.taper[0][i] * (1 - s.attack) + n.taper[1][i] * s.current + n.taper[2][i] * (s.attack - s.current)) * sx);
      ctx.beginPath(); ctx.moveTo(x0, y - ends[0] / 2); ctx.lineTo(x1, y - ends[1] / 2); ctx.lineTo(x1, y + ends[1] / 2); ctx.lineTo(x0, y + ends[0] / 2); ctx.closePath(); ctx.fill();
    } else bar(x0, x1, y, h);
    ctx.restore();
  }
  ctx.restore();
  ctx.fillStyle = olive(q);
  for (const [label, top] of [['木管', 295], ['金管', 419], ['打鍵', 543], ['弦', 699]]) {
    const [y, op] = sample(rowStates.groups[label], t), reference = { 木管: 286, 金管: 412, 打鍵: 536, 弦: 695 }[label];
    ctx.save(); ctx.globalAlpha *= op;
    [...label].forEach((ch, i) => text(ch, positionX(190 * t - 841, t, focus), top + y - reference + (i - (label.length - 1) / 2) * 24 * focus.sx, 20 * focus.sx, 'NotoSerif', 700));
    ctx.restore();
  }
  ctx.save(); ctx.globalAlpha *= rowOpacity('dyn.', focus);
  ctx.fillStyle = rgb(mix(C.muted, [30, 0, 5], q)); text('dyn.', positionX(190 * t - 720, t, focus), 806 + rowShift('dyn.', focus), 24 * focus.sx, 'Cormorant', 500, 0, 'right');
  ctx.strokeStyle = rgb(mix(C.baseline, C.baselineRed, q)); line(positionX(190 * t - 700, t, focus), 823 + rowShift('dyn.', focus), positionX(190 * t + 700, t, focus), 823 + rowShift('dyn.', focus), 1.8 * focus.sx);
  ctx.restore();
  annotationsAt(t, q, focus);
  ctx.globalAlpha *= alpha * sheetFade;
  ctx.strokeStyle = ink(q); line(focus.head, Math.max(186, 490 + (196 - 490) * (focus.globalSy ?? focus.sx)), focus.head, 823 + rowShift('dyn.', focus), 2);
  ctx.save();
  const angle = sample(shots.cross, t)[0]; ctx.translate(focus.head, 822 + rowShift('dyn.', focus)); ctx.scale(focus.sx, focus.sx); ctx.rotate(angle * Math.PI / 180); ctx.fillStyle = accent(q);
  ctx.fillRect(-42, -3, 84, 6); ctx.fillRect(-3, -11, 6, 22); ctx.restore();
  ctx.restore();
}

function annotationsAt(t, q, focus) {
  ctx.save(); ctx.beginPath(); ctx.rect(180 - 60 * focus.p, 185, 1440 + 60 * focus.p, 665); ctx.clip();
  ctx.save(); ctx.strokeStyle = ink(q); ctx.fillStyle = ink(q);
  for (const a of annotations.arcs) {
    const op = segment(t, a.appear, a.appear + .6); if (!op) continue;
    ctx.save(); const dy0 = rowShift(a.fromRow, focus), dy1 = rowShift(a.toRow, focus);
    ctx.globalAlpha *= .45 * op * Math.max(rowOpacity(a.fromRow, focus), rowOpacity(a.toRow, focus)); ctx.setLineDash([6, 6]); ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(positionX(a.x0, t, focus), a.y0 + dy0); ctx.bezierCurveTo(positionX(a.c1[0], t, focus), a.c1[1] + lerp(dy0, dy1, 1 / 3), positionX(a.c2[0], t, focus), a.c2[1] + lerp(dy0, dy1, 2 / 3), positionX(a.x1, t, focus), a.y1 + dy1); ctx.stroke(); ctx.restore();
  }
  for (const a of annotations.leggiero) {
    const cut = 190 * t + 6; if (cut < a.points[0][0]) continue;
    const points = a.points.filter(p => p[0] <= cut), next = a.points.find(p => p[0] > cut);
    if (next && points.length) { const last = points.at(-1), p = (cut - last[0]) / (next[0] - last[0]); points.push([cut, lerp(last[1], next[1], p)]); }
    ctx.save(); ctx.globalAlpha *= rowOpacity(a.row, focus) * lerp(1, .55, segment(t, a.t1, a.t1 + .8)); ctx.lineWidth = 1.6; ctx.beginPath();
    points.forEach(([x, y], i) => i ? ctx.lineTo(positionX(x, t, focus), y + rowShift(a.row, focus)) : ctx.moveTo(positionX(x, t, focus), y + rowShift(a.row, focus))); ctx.stroke();
    if (cut >= a.points.at(-1)[0]) { const [x, y] = a.points.at(-1); ctx.beginPath(); ctx.arc(positionX(x, t, focus), y + rowShift(a.row, focus), 3, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
  }
  for (const a of annotations.hp) {
    const n = { row: 'Pf.', group: 2, x0: a.points[0][0], x1: a.points.at(-1)[0] }, state = stateAt(n, t, q);
    ctx.save(); ctx.globalAlpha *= rowOpacity('Hp.', focus) * state.opacity; ctx.strokeStyle = rgb(state.color); ctx.fillStyle = rgb(state.color); ctx.lineWidth = 1.6 * focus.sx;
    ctx.beginPath(); a.points.forEach(([x, y], i) => { const xx = positionX(x, t, focus), yy = positionY('Hp.', y - 586, focus); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
    ctx.restore();
    if (a.dotCurve.length && t >= a.dotCurve[0][0] && t <= a.dotCurve.at(-1)[0]) {
      const [radius, opacity, r, g, b] = sample(a.dotCurve, t), [x, y] = a.points.at(-1);
      ctx.save(); ctx.globalAlpha *= opacity; ctx.fillStyle = rgb([r, g, b]); ctx.beginPath(); ctx.arc(positionX(x, t, focus), positionY('Hp.', y - 586, focus), radius * focus.sx, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
  }
  for (const e of annotations.outlines) {
    if (t < e.t0 || t >= e.t1) continue;
    const opacity = sample(e.curve, t)[0]; if (opacity < .005) continue;
    const x0 = positionX(e.x0, t, focus), x1 = positionX(e.x1, t, focus), y = positionY(e.row, e.pitch, focus);
    ctx.save(); ctx.globalAlpha *= opacity; ctx.strokeStyle = ink(q); ctx.lineWidth = e.stroke; ctx.beginPath(); ctx.roundRect(x0 - e.padding, y - e.h / 2, x1 - x0 + 2 * e.padding, e.h, e.h / 2); ctx.stroke(); ctx.restore();
  }
  for (const m of annotations.modulations) {
    if (t < m.t0 || t >= m.t1) continue;
    const [opacity, r, g, b] = sample(m.curve, t), x = positionX(m.globalX + .5, t, focus);
    ctx.save(); ctx.globalAlpha *= opacity; ctx.strokeStyle = rgb([r, g, b]); ctx.setLineDash(m.dash); line(x, m.dashY, x, m.y1, m.width); ctx.restore();
  }
  for (const r of annotations.rulers) {
    if (!r.curve.length || t < r.curve[0][0] || t > r.curve.at(-1)[0]) continue;
    const [end, offset, opacity, post] = sample(r.curve, t), cy = positionY(r.row, 0, focus), sx = focus.sx;
    const word = annotations.words.find(w => w.id === r.id), color = sample(word.curve, t).slice(1, 4);
    ctx.save(); ctx.globalAlpha *= opacity; ctx.strokeStyle = rgb(color);
    const x = positionX(r.worldX, t, focus), y = cy + offset, ex = positionX(end, t, focus);
    line(x, y, ex, y, 1.8 * sx); line(x, y, x, y + post * sx, 1.8 * sx); line(ex, y, ex, y + post * sx, 1.8 * sx); ctx.restore();
  }
  for (const w of annotations.wedges) {
    if (!w.curve.length || t < w.t0 || t >= w.t1) continue;
    const [opacity, r, g, b, gx0, gx1, yu0, yu1, yl0, yl1, thickness] = sample(w.curve, t);
    ctx.save(); ctx.globalAlpha *= opacity; ctx.strokeStyle = rgb([r, g, b]);
    const x0 = positionX(gx0, t, focus), x1 = positionX(gx1, t, focus);
    line(x0, yu0, x1, yu1, thickness); line(x0, yl0, x1, yl1, thickness); ctx.restore();
  }
  const circle = annotations.fixed.find(a => a.kind === 'circle'), circleWord = annotations.words.find(w => w.id === 'B-natural');
  if (t >= circleWord.t0 && t < circleWord.t1) {
    const [a, r, g, b] = sample(circleWord.curve, t); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgb([r, g, b]); ctx.lineWidth = 1.7;
    ctx.beginPath(); ctx.arc(positionX(circle.x, t, focus), positionY('Vc.', circle.y - 726, focus), circle.r * focus.sx, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  const unison = annotations.words.find(w => w.id === 'unison');
  if (t >= unison.t0 && t < unison.t1) {
    const [a, r, g, b] = sample(unison.curve, t), x = positionX(2355.5, t, focus);
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgb([r, g, b]); ctx.fillStyle = ctx.strokeStyle; ctx.setLineDash([2.5, 3]);
    line(x, positionY('Fl.', 0, focus), x, positionY('Vln. II', 0, focus), 1.4 * focus.sx); ctx.setLineDash([]);
    for (const row of ['Fl.', 'Cl.', 'Vln. II']) { ctx.beginPath(); ctx.arc(x, positionY(row, 0, focus), 3.2 * focus.sx, 0, Math.PI * 2); ctx.fill(); } ctx.restore();
  }
  for (const w of annotations.words) {
    if (t < w.t0 || t >= w.t1) continue;
    const [a, r, g, b, dx, dy, scale] = sample(w.curve, t); if (a < .005) continue;
    const sx = w.row || w.worldX !== undefined ? focus.sx : 1;
    let x = w.screenX ?? positionX(w.worldX, t, focus), y;
    if (w.kind === 'motifLabel') {
      const off = 20 + (w.motif === 9 ? 96 * focus.p : focus.rows.has(w.row) ? 40 * focus.p : 0);
      y = positionY(w.row, 0, focus) - off - 7 * sx + (w.labelDy ?? 0) * sx;
    } else y = w.row ? positionY(w.row, w.pitch ?? 0, focus) + (w.offset ?? 0) * sx : w.screenY;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgb([r, g, b]); text(w.text, x + dx * sx, y + dy * sx, w.fontSize * sx * scale, w.fontFamily, w.fontWeight); ctx.restore();
  }
  ctx.restore(); ctx.restore();
}

function header(t, q, alpha) {
  ctx.save(); ctx.globalAlpha = alpha;
  function scene(s, opacity, dy, colors) {
    if (!s.ja || opacity <= 0) return;
    const interlude = s.ja === '間奏', split = interlude ? 202 : 270, x = split + 32;
    ctx.save(); ctx.globalAlpha *= opacity; ctx.translate(0, dy); ctx.fillStyle = rgb(colors.slice(0, 3));
    text(s.ja, 40, 142, 62, 'Shippori', 700, 7.5); ctx.strokeStyle = rgb(colors.slice(3, 6)); line(split, 79, split, 146, 1.8);
    ctx.fillStyle = rgb(colors.slice(3, 6)); text(s.en, x, 98, 26, 'Cormorant', 500, 1.16);
    ctx.fillStyle = rgb(colors.slice(0, 3)); const keyW = text(s.keyJa, x, 139.5, 36, 'Shippori', 700);
    text(s.keyEn, x + keyW + 16, 140.5, 30); ctx.restore();
  }
  for (const e of shots.headers) {
    if (t < e.t0 || t >= e.t1) continue;
    const [opacity, dy, ...colors] = sample(e.curve, t); ctx.save(); ctx.globalAlpha = 1; scene(SCENES[e.scene], opacity, dy, colors); ctx.restore();
  }
  const frame = Math.min(7319, Math.floor(t * 60 + 1e-6)), counter = bars.counters.findLast(b => frame >= b.frame) ?? bars.counters[0], meter = bars.meters.findLast(m => frame >= m.frame) ?? bars.meters[0];
  ctx.fillStyle = ink(q); text(meter.meter, 1406, 111, 32, 'NotoSerif', 700, 0, 'center');
  ctx.fillStyle = rgb(mix([103, 103, 103], C.white, q)); text('bar', 1406, 149, 29, 'Cormorant', 500, 0, 'center');
  ctx.fillStyle = accent(q); text(String(counter.bar).padStart(2, '0'), 1553, 143.5, 111, 'Cormorant', 600, 0, 'right');
  ctx.strokeStyle = rgb(mix(C.grid, C.gridRed, q)); line(40, 177, 1560, 177, 1.8);
  ctx.strokeStyle = ink(q); line(40, 177, clamp(13.2179653473 * t + 14.5540748673, 40, 1560), 177, 1.8);
  for (const x of [79, 282, 383, 590, 809, 1088, 1307]) line(x, 170, x, 184, 1.8);
  ctx.restore();
}

function caption(t, q, alpha) {
  ctx.save(); ctx.globalAlpha = alpha;
  imageBlend('giraffe-medallion-black', 'giraffe-medallion-white', [39, 892, 90, 91], q);
  function draw(c, a, dy) {
    if (!c || a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, dy);
    ctx.fillStyle = olive(q); text(c.eyebrow, 156, 905, 26);
    ctx.fillStyle = ink(q); text(c.title, 156, 954.92, 37.895, 'NotoSerif', 700, 1.684);
    ctx.fillStyle = rgb(mix([103, 103, 103], C.white, q)); c.body.split('\n').forEach((s, i) => text(s, 156, 997 + 36 * i, 25, 'NotoSerif', 500)); ctx.restore();
  }
  const transition = shots.captions.find(e => t >= e.t0 && t < e.t1);
  if (transition) {
    const [a, dyA, b, dyB] = sample(transition.curve, t);
    draw(transition.old, a, dyA); draw(transition.new, b, dyB);
  } else {
    const latest = shots.captions.findLast(e => t >= e.t); draw(latest?.new, 1, 0);
  }
  const selected = t < 116.9 ? annotations.motifs.findLastIndex(m => t >= m.t) : ICONS.length;
  for (let i = 0; i < ICONS.length; i++) {
    const box = ICON_BOXES[i], rect = [box[0], box[1], box[2] - box[0], box[3] - box[1]], isCurrent = i === selected, isPast = selected >= 0 && i < selected;
    image(`${ICONS[i]}-${isCurrent ? 'red' : 'black'}`, ...rect, isCurrent || isPast ? 1 : .54);
    if (q > 0) image(`${ICONS[i]}-${isPast || isCurrent ? 'white' : 'black'}`, ...rect, q * (isPast || isCurrent ? 1 : .61));
    ctx.fillStyle = isCurrent ? accent(q) : isPast ? ink(q) : rgb(mix(C.muted, [30, 0, 5], q));
    text(NAMES[i], ICON_X[i], 984, 22, 'Cormorant', 500, 0, 'center');
    if (isCurrent) { ctx.fillStyle = accent(q); ctx.fillRect(ICON_X[i] - 12, 990, 24, 3); }
  }
  ctx.restore();
}

function arrow(x, y0, y1) { ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.moveTo(x - 5, y1 - 6); ctx.lineTo(x, y1); ctx.lineTo(x + 5, y1 - 6); ctx.stroke(); }
function ladders(t, q) {
  for (const l of annotations.ladders) {
    if (t < l.t0 || t >= l.t1) continue;
    let prior = null;
    for (let i = 0; i < l.groups.length; i++) {
      const g = l.groups[i], [a, length] = sample(g.curve, t); if (a < .005) continue;
      const isRed = g.label === 'E' || l.id === 'cadence-key-ladder' && g.label === 'B♭';
      ctx.save(); ctx.globalAlpha = clamp(a); ctx.fillStyle = isRed ? accent(q) : ink(q); ctx.strokeStyle = ctx.fillStyle;
      const [x0, y0, x1, y1] = g.line; bar(x0, lerp(x0, x1, length), (y0 + y1) / 2, y1 - y0);
      if (prior && l.id === 'ending-key-ladder') {
        const x = prior.line[2] - 2, y = (prior.line[1] + prior.line[3]) / 2;
        const ay = (y + y0) / 2;
        for (const kind of ['dash', 'arrow']) {
          const e = annotations.connections.find(e => e.kind === kind && e.index === i);
          if (t < e.curve[0][0] || t > e.curve.at(-1)[0]) continue;
          const [opacity, r, g, b, dx, dy] = sample(e.curve, t); ctx.save(); ctx.globalAlpha = opacity; ctx.strokeStyle = rgb([r, g, b]);
          if (kind === 'dash') { ctx.setLineDash([3.5, 6]); line(x + dx, y + 10 + dy, x + dx, y0 - 6 + dy, 1.8); }
          else { ctx.setLineDash([]); arrow(x + 16 + dx, ay - 10 + dy, ay + 12 + dy); } ctx.restore();
        }
      }
      ctx.restore(); prior = g;
    }
    if (l.id === 'cadence-key-ladder') {
      const paint = id => {
        const w = annotations.words.find(w => w.id === id);
        if (t < w.t0 || t >= w.t1) return 0;
        const [a, r, g, b] = sample(w.curve, t); ctx.globalAlpha = a; ctx.strokeStyle = rgb([r, g, b]); return a;
      };
      ctx.save();
      if (paint('structure-title')) { line(865, 346, 614, 346, 2); line(614, 346, 626, 339, 2); line(614, 346, 626, 353, 2); }
      if (paint('tonality-title')) { line(894, 346, 1144, 346, 2); line(1144, 346, 1132, 339, 2); line(1144, 346, 1132, 353, 2); }
      if (paint('subdominant')) { line(1282, 424, 1296, 424, 1.5); line(1296, 424, 1296, 564, 1.5); line(1296, 564, 1282, 564, 1.5); } ctx.restore();
    }
  }
}

function brand(t, q) {
  const x = t < 3.8 ? sample(shots.intro.measured.panel, t)[0] : 1620;
  ctx.fillStyle = rgb(mix(C.red, C.white, q)); ctx.fillRect(x, 0, 1920 - x, 1080);
  if (t >= 3.25) {
    ctx.fillStyle = rgb(mix(C.white, C.red, q));
    [...'蝶の舞う庭'].forEach((c, i) => { font(104, 'Shippori', 700); const w = ctx.measureText(c); glyph(c, 1801 - (w.actualBoundingBoxLeft + w.actualBoundingBoxRight) / 2, [73, 202, 301, 417, 531][i], 104); });
  } else {
    for (let i = 0; i < 5; i++) {
      const g = shots.intro.glyphs[i], a = sample(g.samples.map(s => [s.frame / 60, s.alpha]), t)[0];
      ctx.save(); ctx.globalAlpha = a; const track = shots.intro.exitGlyphTracking[i];
      if (t >= track.samples[0].t) { const v = sample(track.samples.map(k => [k.t, ...k.matrix[0].slice(0, 2), ...k.matrix[1].slice(0, 2), k.matrix[0][2], k.matrix[1][2]]), t); ctx.transform(v[0], v[2], v[1], v[3], v[4], v[5]); }
      ctx.fillStyle = rgb(C.ink); glyph(g.text, g.box[0], g.box[1], 128); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.rect(x, 0, 1920 - x, 1080); ctx.clip(); ctx.globalAlpha = a;
      if (t >= track.samples[0].t) { const v = sample(track.samples.map(k => [k.t, ...k.matrix[0].slice(0, 2), ...k.matrix[1].slice(0, 2), k.matrix[0][2], k.matrix[1][2]]), t); ctx.transform(v[0], v[2], v[1], v[3], v[4], v[5]); }
      ctx.fillStyle = '#fff'; glyph(g.text, g.box[0], g.box[1], 128); ctx.restore();
    }
  }
  if (t < 3.25) for (const a of shots.intro.auxiliary) {
    const [opacity, r, g, b, dx, dy] = sample(a.curve, t);
    ctx.save(); ctx.globalAlpha = opacity; ctx.fillStyle = rgb([r, g, b]);
    if (a.text === 'ー') { ctx.translate(a.x + dx, a.y + dy); ctx.rotate(Math.PI / 2); text(a.text, 0, 0, a.fontSize, a.fontFamily, a.fontWeight); }
    else text(a.text, a.x + dx, a.y + dy, a.fontSize, a.fontFamily, a.fontWeight); ctx.restore();
  }
  if (t < 3.8) {
    const m = shots.intro.measured, [tx, ty, sx, sy] = sample(m.wordMotion, t);
    for (const w of m.words) {
      const opacity = sample(w.role === 'prefix' ? m.prefixAlpha : m.suffixAlpha, t)[0];
      for (const inverse of [false, true]) {
        ctx.save(); ctx.globalAlpha = opacity; ctx.beginPath(); ctx.rect(inverse ? x : 0, 0, inverse ? 1920 - x : x, 1080); ctx.clip();
        ctx.fillStyle = inverse ? '#fff' : rgb(C.ink); ctx.translate(tx + w.offsetX * sx, ty + w.offsetY * sy); ctx.scale(sx * w.fx, sy * w.fy); ctx.rotate(Math.PI / 2); text(w.text, 0, 0, 30); ctx.restore();
      }
    }
    const [lx, ly, lw, lh, opacity] = sample(m.logo, t), map = m.whiteMap;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, x, 1080); ctx.clip(); image('official-intro-red', lx, ly, lw, lh, opacity); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(x, 0, 1920 - x, 1080); ctx.clip(); image('official-white', lx + map[0] * lw, ly + map[1] * lh, lw * map[2], lh * map[3], opacity); ctx.restore();
  } else {
    ctx.save(); ctx.fillStyle = rgb(mix(C.white, C.red, q)); ctx.translate(1688.73077, 75.94915); ctx.rotate(Math.PI / 2); ctx.scale(363 / 354, 25 / 26);
    text('The Garden Where Butterflies Dance', 0, 0, 26, 'Cormorant', 500, .4); ctx.restore();
    image('official-white', 1652, 850, 237, 111); image('official-intro-red', 1658.055794, 852.185185, 223.776824, 100.722222, q);
  }
  const [bylineAlpha, bylineY] = t < 3.8 ? sample(shots.intro.byline, t) : [1, 0]; ctx.save(); ctx.globalAlpha = bylineAlpha; ctx.fillStyle = rgb(mix(C.white, C.red, q)); text('music by Yoshiaki Fujisawa', 1662, 1004 + bylineY, 22); ctx.restore();
  if (t < 2.95) {
    ctx.save(); ctx.globalAlpha = 1 - segment(t, 2.15, 2.95); ctx.fillStyle = rgb(C.red); ctx.fillRect(0, 1074, 1920, 6); ctx.restore();
  }
}

export function renderAt(time) {
  const t = clamp(time, 0, duration), dpr = Math.max(2, window.devicePixelRatio || 1);
  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.setLineDash([]); ctx.lineCap = 'butt';
  const q = background(t), alpha = segment(t, 2.316667, 3.016667), focus = focusAt(t);
  focus.states = new Map(Object.entries(rowStates.rows).map(([row, keys]) => [row, sample(keys, t)]));
  if (focus.id === 'focus-cym-pf') { const f = shots.focus.find(f => f.id === focus.id); [focus.sx, focus.sy] = sample(f.scaleCurve, t); [focus.globalSy] = sample(f.verticalCurve, t); }
  ctx.fillStyle = rgb(mix(C.white, C.red, q)); ctx.fillRect(0, 0, width, height);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1620, height); ctx.clip();
  giants(t, q); scoreRows(t, q, focus, alpha); header(t, q, alpha); ladders(t, q); caption(t, q, alpha);
  ctx.restore(); brand(t, q);
}
