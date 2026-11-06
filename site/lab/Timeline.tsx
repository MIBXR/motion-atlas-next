import { useLayoutEffect, useMemo, useRef } from "react";
import { useLab, useLabFrame } from "./context";
import { useWidth } from "./useWidth";
import { timelineMarkup, TL, tlT, tlX } from "./timeline-markup";
import { clamp, mod, r3 } from "./engine/math";

export function Timeline() {
  const lab = useLab(), { S, T } = lab, { beat } = useLabFrame(), c = lab.clip();
  const { ref, width } = useWidth(), svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ i: number; id: number } | null>(null), focus = useRef<number | null>(null);
  const markup = useMemo(() => timelineMarkup(S, lab, width), [lab, lab.snapshot(), width]);
  useLayoutEffect(() => {
    if (focus.current !== null) svg.current?.querySelector<SVGElement>(`.tl-a[data-i="${focus.current}"]`)?.focus({ preventScroll: true });
  }, [markup]);
  const C = beat === null ? null : lab.clock.clipAbs(beat), ct = C === null ? 0 : mod(C, c.L), cycle = C === null ? 0 : Math.floor(C / c.L);
  const ab = T.rec ? 'rec' : S.mode === 'ab' ? (mod(cycle - T.abPhase, 2) ? 'b' : 'a') : S.mode;
  useLayoutEffect(() => {
    const list = lab.evs();
    for (const which of ['a', 'b']) for (const el of svg.current!.querySelectorAll<SVGElement>(`.tl-${which}`)) {
      const ev = list.find(e => e.i === +(el.dataset.i!));
      const dt = ev ? mod(ct - (which === 'a' ? ev.t : ev.snap), c.L) : 1;
      el.style.setProperty('--hit', !lab.reduced && beat !== null && (ab === which || ab === 'both') && dt < .35 ? Math.exp(-dt / .12).toFixed(3) : '0');
    }
  });
  function change(i: number, value: number, sort = false) {
    const ev = [...S.ev]; ev[i] = r3(clamp(value, 0, c.L - .001));
    if (sort) { const v = ev[i]; ev.sort((a, b) => a - b); focus.current = ev.indexOf(v); }
    lab.update({ ev, example: '' });
  }
  function endDrag() {
    if (!drag.current) return;
    const i = drag.current.i; drag.current = null;
    change(i, S.ev[i], true);
  }
  const pointerTime = (x: number) => { const r = svg.current!.getBoundingClientRect(); return tlT(((x - r.left) / r.width) * width, c.L, width); };
  return <div className="lab-timeline" ref={ref}><svg ref={svg} className={`lab-timeline-svg ${T.rec ? 'rec' : ''}`} viewBox={`0 0 ${width} ${TL.H}`} width={width} height={TL.H} role="group" aria-label="吸附时间线"
    onPointerDown={e => {
      const target = e.target as Element, a = target.closest<SVGElement>('.tl-a');
      let i: number;
      if (a) i = +a.dataset.i!;
      else if (target.classList.contains('tl-hitA')) { i = S.ev.length; lab.update({ ev: [...S.ev, r3(clamp(pointerTime(e.clientX), 0, c.L - .001))], example: '' }); }
      else return;
      e.preventDefault(); drag.current = { i, id: e.pointerId }; focus.current = i; e.currentTarget.setPointerCapture(e.pointerId);
      svg.current?.querySelector<SVGElement>(`.tl-a[data-i="${i}"]`)?.focus({ preventScroll: true });
    }}
    onPointerMove={e => { if (drag.current?.id === e.pointerId) change(drag.current.i, pointerTime(e.clientX)); }}
    onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
    onFocus={e => { const a = (e.target as Element).closest<SVGElement>('.tl-a'); if (a) focus.current = +a.dataset.i!; }}
    onBlur={e => { if (!drag.current && !e.currentTarget.contains(e.relatedTarget as Node)) focus.current = null; }}
    onKeyDown={e => {
      const a = (e.target as Element).closest<SVGElement>('.tl-a'); if (!a) return;
      const i = +a.dataset.i!, d = e.shiftKey ? .001 : e.altKey ? .1 : .01;
      if (['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'].includes(e.key)) change(i, S.ev[i] + (['ArrowLeft', 'ArrowDown'].includes(e.key) ? -d : d), true);
      else if (e.key === 'Delete' || e.key === 'Backspace') { const ev = S.ev.filter((_, j) => i !== j); focus.current = ev.length ? Math.min(i, ev.length - 1) : null; lab.update({ ev, example: '' }); }
      else return;
      e.preventDefault(); e.stopPropagation();
    }}>
    <g dangerouslySetInnerHTML={{ __html: markup }} />
    <g>{T.rec?.taps.map((x, i) => <circle className="rec-tap" key={i} cx={tlX(mod(x, c.L), c.L, width)} cy={TL.yA} r={6} />)}</g>
    <g className="tl-head" style={{ opacity: beat === null ? 0 : 1, transform: `translateX(${tlX(ct, c.L, width).toFixed(1)}px)` }}><line y1={TL.gTop - 4} y2={TL.gBot} /><path d={`M-6 ${TL.gTop - 10}h12l-6 7z`} /></g>
  </svg></div>;
}
