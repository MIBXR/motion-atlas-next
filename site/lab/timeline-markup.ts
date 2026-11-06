import type { LabState } from "./engine/types";
import type { Grid } from "./engine/grid";
import { KIND } from "./engine/constants";
import { mod, clamp, ms, r2, r3, signed } from "./engine/math";
export const TL = { H: 236, padL: 34, padR: 14, yR: 18, yA: 70, yB: 150, gTop: 26, gBot: 182 };
export const tlX = (t: number, length: number, width: number) => TL.padL + (t / length) * (width - TL.padL - TL.padR);
export const tlT = (x: number, length: number, width: number) => ((x - TL.padL) / (width - TL.padL - TL.padR)) * length;
export function timelineMarkup(S: LabState, model: Grid, W: number) {
const { clip, grid, evs } = model;
const c = clip(), g = grid(), X = (t: number) => tlX(t, c.L, W), list = evs();
const beatPx = (W - TL.padL - TL.padR) / c.loopBeats;
let s = `<defs><marker id="ahE" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="ah-e"/></marker><marker id="ahL" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="ah-l"/></marker></defs>`;
s += `<rect class="tl-lane" x="${TL.padL - 6}" y="${TL.yA - 19}" width="${W - TL.padL - TL.padR + 12}" height="38" rx="9"/><rect class="tl-lane" x="${TL.padL - 6}" y="${TL.yB - 19}" width="${W - TL.padL - TL.padR + 12}" height="38" rx="9"/>`;
s += `<text class="tl-tag" x="6" y="${TL.yA + 5}">A</text><text class="tl-tag b" x="6" y="${TL.yB + 5}">B</text>`;
if (c.o > 0.0005) s += `<rect class="tl-off" x="${X(0)}" y="${TL.gTop}" width="${(X(c.o) - X(0)).toFixed(1)}" height="${TL.gBot - TL.gTop}"/>${X(c.o) - X(0) > 58 ? `<text class="tl-offt" x="${X(0) + 5}" y="${TL.gBot - 6}">偏移 ${ms(c.o)}ms</text>` : ''}`;
const n0 = Math.floor(-c.o / c.spb) - 1, n1 = Math.ceil((c.L - c.o) / c.spb) + 1;
for (let n = n0; n <= n1; n++) {
  for (let k = 0; k < g.length; k++) {
    const C = c.o + (n + g[k]) * c.spb;
    if (C < -1e-9 || C >= c.L - 1e-9) continue;
    const x = Math.round(X(C)) + 0.5, b = mod(n, c.bpb);
    const cls = k ? 'sub' : b === 0 ? 'bar' : c.acc.has(b) ? 'acc' : 'beat';
    s += `<line class="g-${cls}" x1="${x}" x2="${x}" y1="${cls === 'sub' ? TL.gTop + 6 : TL.gTop}" y2="${TL.gBot}"/>`;

    const barNo = mod(Math.floor(n / c.bpb), S.bars) + 1;
    if (!k && (b === 0 || beatPx >= 26)) s += `<text class="tl-num${b === 0 ? ' bar' : ''}" x="${x + 3}" y="${TL.yR}">${beatPx >= 34 ? `${barNo}.${b + 1}` : b === 0 ? barNo : b + 1}</text>`;
  }
}
s += `<line class="tl-end" x1="${Math.round(X(c.L)) + 0.5}" x2="${Math.round(X(c.L)) + 0.5}" y1="${TL.gTop}" y2="${TL.gBot}"/>`;

const pxs = (W - TL.padL - TL.padR) / c.L, stepS = [0.1, 0.25, 0.5, 1, 2].find((v) => v * pxs >= 56) || 2;
for (let t = 0; t <= c.L + 1e-9; t += stepS) { const x = Math.round(X(t)) + 0.5; s += `<line class="tl-sec" x1="${x}" x2="${x}" y1="${TL.gBot + 4}" y2="${TL.gBot + 9}"/><text class="tl-sect" x="${x}" y="${TL.gBot + 24}">${r2(t)}s</text>`; }
s += `<rect class="tl-hitA" x="${TL.padL - 6}" y="${TL.yA - 19}" width="${W - TL.padL - TL.padR + 12}" height="38"/>`;

for (const e of list) {
  if (!e.inLoop) continue;
  const xa = X(e.t), xb = X(clamp(e.snap, 0, c.L)), d = ms(e.dev);
  if (S.strength < 100 && Math.abs(e.devFull) > 5e-4) s += `<line class="tl-target" x1="${X(e.full)}" x2="${X(e.full)}" y1="${TL.yB - 15}" y2="${TL.yB + 15}"/>`;
  if (Math.abs(d) >= 2) s += `<path class="tl-arrow ${d > 0 ? 'early' : 'late'}" d="M${xa.toFixed(1)} ${TL.yA + 11}L${xb.toFixed(1)} ${TL.yB - 12}" marker-end="url(#${d > 0 ? 'ahE' : 'ahL'})"/>`;
}
for (const e of list) {
  if (!e.inLoop) continue;
  s += `<g class="tl-b${e.dup > 1 ? ' dup' : ''}" data-i="${e.i}" transform="translate(${X(clamp(e.snap, 0, c.L)).toFixed(1)} ${TL.yB})"><circle r="7.5"/>${e.dup > 1 ? `<circle class="dup-ring" r="12"/>` : ''}</g>`;
}

const inl = list.filter((e) => e.inLoop);
inl.forEach((e, j) => {
  const xa = X(e.t), d = ms(e.devFull);
  const roomL = j ? xa - X(inl[j - 1].t) : 99, roomR = j < inl.length - 1 ? X(inl[j + 1].t) - xa : 99;
  const lab = Math.min(roomL, roomR) >= 40 ? `<text class="tl-dev ${d > 0 ? 'early' : d < 0 ? 'late' : 'on'}" y="-14">${d ? signed(d, '') : '准'}</text>` : '';
  s += `<g class="tl-a" data-i="${e.i}" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="${r3(c.L)}" aria-valuenow="${e.t}" aria-valuetext="事件 ${j + 1}：${e.t.toFixed(3)} 秒，吸附到 ${e.snap.toFixed(3)} 秒（${signed(ms(e.dev))}，${e.label} ${KIND[e.kind]}）" aria-label="事件 ${j + 1}" transform="translate(${xa.toFixed(1)} ${TL.yA})"><circle class="hit-area" r="14"/><circle class="dot" r="7.5"/>${lab}</g>`;
});

return s;
}
