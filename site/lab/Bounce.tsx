import { useLab, useLabFrame } from "./context";
import { useWidth } from "./useWidth";
import { KIND } from "./engine/constants";
import { clamp, mod, ms, signed } from "./engine/math";

export function Bounce() {
  const lab = useLab(), { S, T } = lab, { beat } = useLabFrame(), c = lab.clip(), list = lab.evs().filter(e => e.inLoop);
  const { ref, width: W } = useWidth(), half = W / 2, gy = 124;
  const C = beat === null ? null : lab.clock.clipAbs(beat), ct = C === null ? 0 : mod(C, c.L), m = C === null ? 0 : Math.floor(C / c.L);
  const ab = T.rec ? 'rec' : S.mode === 'ab' ? (mod(m - T.abPhase, 2) ? 'b' : 'a') : S.mode;
  const beatF = beat === null ? 1 : mod(beat - T.bar, 1), barBeat = beat === null ? 1 : mod(Math.floor(beat - T.bar), c.bpb);
  return <figure className="lab-bounce" ref={ref}><svg className="lab-bounce-svg" viewBox={`0 0 ${W} 180`} width={W} height={180} aria-hidden="true">
    {['a', 'b'].map((w, j) => {
      const ts = list.map(e => ({ t: w === 'a' ? e.t : e.snap, e })).sort((x, y) => x.t - y.t);
      const prev = ts.findLast(x => x.t <= ct + 1e-9), next = ts.find(x => x.t > ct + 1e-9);
      const pT = prev?.t ?? (ts.at(-1)?.t ?? 0) - c.L, nx = next ?? { t: (ts[0]?.t ?? 0) + c.L }, pv = prev ?? ts.at(-1);
      const span = Math.max(.05, nx.t - pT), u = clamp((ct - pT) / span, 0, 1), hgt = Math.min(1, span / .6) * 62, since = ct - pT;
      const moving = beat !== null && ts.length > 0, e = pv?.e, d = e ? ms(e.devFull) : 0, onBeat = e ? w === 'b' ? e.kind : Math.abs(d) <= 12 ? e.kind : null : null;
      const cx = (j ? 6 : 0) + 50 + (half - 70) / 2;
      return <g key={w} className={`bn-lane ${w === 'b' ? 'lab-bounce-b' : ''} ${beat !== null && (ab === w || ab === 'both') ? 'live' : ''}`} transform={`translate(${j * half} 0)`}>
        <rect className="bn-bg" x={j ? 6 : 0} y={0} width={half - 6} height={180} rx={12} />
        <text className="bn-title" x={(j ? 6 : 0) + 14} y={22}>{w === 'a' ? 'A 原始' : 'B 吸附后'}</text><text className="bn-live" x={(j ? 6 : 0) + half - 20} y={40} textAnchor="end">正在播放</text>
        <circle className={`bn-lamp ${barBeat === 0 ? 'bar' : ''}`} cx={(j ? 6 : 0) + 26} cy={gy - 40} r={9} style={{ '--glow': beat === null ? 0 : lab.reduced ? 1 : Math.exp(-beatF * c.spb / .12) } as React.CSSProperties} />
        <text className="bn-lampt" x={(j ? 6 : 0) + 26} y={gy - 20} textAnchor="middle">拍</text><line className="bn-ground" x1={(j ? 6 : 0) + 50} x2={(j ? 6 : 0) + half - 20} y1={gy} y2={gy} />
        <circle className="bn-ring" cx={cx} cy={gy} r={14} style={{ opacity: !moving || lab.reduced ? 0 : Math.exp(-since / .14), transform: `scale(${1 + (lab.reduced ? 0 : Math.min(1, since / .3) * .35)})` }} />
        <circle className="bn-ball" cx={cx} cy={gy - 12} r={12} style={{ transform: `translateY(${!moving || lab.reduced ? 0 : (-Math.sin(Math.PI * u) * hgt).toFixed(1)}px)` }} />
        <text className="bn-lab" x={cx} y={gy + 34} textAnchor="middle" data-k={w === 'a' && !onBeat ? 'miss' : e?.kind}>{moving && e ? w === 'a' ? onBeat ? `${KIND[onBeat]} · 准` : `离网格 ${signed(-d)}` : KIND[e.kind] : ''}</text>
        <text className="bn-pos" x={cx} y={gy + 50} textAnchor="middle">{moving && e ? `位置 ${e.label}` : ''}</text>
      </g>;
    })}
  </svg><figcaption className="muted small">小球每落地一次 = 一个事件；圆灯在拍上闪。和圆灯同时落地是<b>在拍上</b>，落在两灯之间是<b>反拍（切分）</b>，差一点点则像“没踩准”的卡顿。</figcaption></figure>;
}
