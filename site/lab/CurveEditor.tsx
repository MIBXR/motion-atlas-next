import { useLayoutEffect, useRef, useState } from "react";
import { NumberField } from "@/registry/components/number-field/number-field";
import { useLab, useLabFrame } from "./context";
import { Segments } from "./controls";
import { PRESETS } from "./engine/constants";
import { MK } from "./engine/audio";
import { clamp } from "./engine/math";

function CurveCanvas() {
  const lab = useLab(), { S } = lab; useLabFrame();
  const svg = useRef<SVGSVGElement>(null), drag = useRef<number | null>(null);
  const [view, setView] = useState('-20 -24 340 348');
  const [x1, y1, x2, y2] = S.curve, X = (v: number) => v * 300, Y = (v: number) => 300 - v * 300;
  const fit = () => { const lo = Math.min(0, y1, y2), hi = Math.max(1, y1, y2); setView(`-20 ${Y(hi) - 24} 340 ${(hi - lo) * 300 + 48}`); };
  useLayoutEffect(() => { if (drag.current === null) fit(); }, [x1, y1, x2, y2]);
  const t = lab.curveClock.easeClock(), p = lab.reduced ? 1 : clamp(t / S.dur, 0, 1), ease = MK.bezier(x1, y1, x2, y2);
  function end() { if (drag.current === null) return; drag.current = null; fit(); }
  return <svg ref={svg} className="lab-curve-svg" viewBox={view} aria-label="缓动曲线编辑器（可拖动两个控制点，方向键微调，Shift 加大步长）"
    onPointerMove={e => { if (drag.current === null) return; const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.current!.getScreenCTM()!.inverse()); const cv = [...S.curve]; cv[drag.current] = p.x / 300; cv[drag.current + 1] = (300 - p.y) / 300; lab.setCurve(cv); }} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}>
    <rect x={0} y={0} width={300} height={300} className="cv-box" /><path className="cv-grid" d={[1, 2, 3].map(i => `M${i * 75} 0V300M0 ${i * 75}H300`).join('')} /><line x1={0} y1={300} x2={300} y2={0} className="cv-lin" />
    <line x1={0} y1={300} x2={X(x1)} y2={Y(y1)} className="cv-handle-line" /><line x1={300} y1={0} x2={X(x2)} y2={Y(y2)} className="cv-handle-line" />
    <path className="cv-path" d={`M0 300C${X(x1)} ${Y(y1)} ${X(x2)} ${Y(y2)} 300 0`} /><line className="cv-t" y1={-600} y2={900} x1={X(p)} x2={X(p)} />
    {[0, 2].map((o, i) => <circle key={o} cx={X(S.curve[o])} cy={Y(S.curve[o + 1])} r={11} className="cv-pt" tabIndex={0} role="slider" aria-label={`控制点 ${i + 1}（x${i + 1}, y${i + 1}）`} aria-valuetext={`x${i + 1} ${S.curve[o]}，y${i + 1} ${S.curve[o + 1]}`}
      onPointerDown={e => { e.preventDefault(); drag.current = o; svg.current!.setPointerCapture(e.pointerId); e.currentTarget.focus({ preventScroll: true }); }}
      onKeyDown={e => { const d = e.shiftKey ? .1 : .01, cv = [...S.curve]; if (e.key === 'ArrowLeft') cv[o] -= d; else if (e.key === 'ArrowRight') cv[o] += d; else if (e.key === 'ArrowUp') cv[o + 1] += d; else if (e.key === 'ArrowDown') cv[o + 1] -= d; else return; e.preventDefault(); e.stopPropagation(); lab.setCurve(cv); }} />)}
    <circle className="cv-dot" cx={X(p)} cy={Y(ease(p))} r={6} />
  </svg>;
}
export function CurveEditor() {
  const lab = useLab(), { S } = lab;
  return <article className="lab-pane"><h3>缓动曲线 <small className="muted">CUBIC-BEZIER</small></h3>
    <Segments label="缓动预设" value={S.preset} items={Object.keys(PRESETS).map(k => [k, k])} onChange={k => { lab.setCurve(PRESETS[k], k); lab.curveClock.restartFree(); }} mobileSelect />
    <div className="lab-curve-wrap"><CurveCanvas /><div className="lab-curve-values" onKeyDown={e => { if (e.key === 'Enter' && e.target instanceof HTMLInputElement) e.target.blur(); }}>{['x1', 'y1', 'x2', 'y2'].map((key, i) => <NumberField key={key} label={key} value={S.curve[i]} min={i % 2 ? -1 : 0} max={i % 2 ? 2 : 1} step={.01} size="sm" limitHint={false} onValueChange={v => { const cv = [...S.curve]; cv[i] = v; lab.setCurve(cv); }} />)}<p className="small muted mono lab-curve-css">cubic-bezier({S.curve.join(', ')}) · {S.preset || '自定义'}</p></div></div>
  </article>;
}
