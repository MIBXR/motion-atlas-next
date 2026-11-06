import { useLab, useLabFrame } from "./context";
import { useWidth } from "./useWidth";
import { MK } from "./engine/audio";
import { range } from "./engine/constants";
import { clamp } from "./engine/math";

export function StaggerPreview() {
  const lab = useLab(), { S } = lab; useLabFrame();
  const { ref, width } = useWidth(), w = Math.max(120, width - 28 - 34) * (S.dist / 100), h = 230;
  const ease = MK.bezier(S.curve[0], S.curve[1], S.curve[2], S.curve[3]), t = lab.curveClock.easeClock();
  return <div className="lab-preview" ref={ref} aria-hidden="true">{range(S.count).map(i => {
    const y = ((i + .5) / S.count) * h, pr = lab.reduced ? 1 : clamp((t - i * S.stag) / S.dur, 0, 1);
    return <div key={i}><span className="lane" style={{ top: y }} />{S.trail || lab.reduced ? range(11).map(j => <b key={j} className="trail" style={{ top: y - 2, left: 14 + 17 - 2 + ease(Math.min(1, j / 10)) * w }} />) : null}{S.ghost ? <i className="ghost" style={{ top: y - 7, transform: `translateX(${(pr * w).toFixed(1)}px)` }} /> : null}<i className="box" style={{ top: y - 7, transform: `translateX(${(ease(pr) * w).toFixed(1)}px)` }} /></div>;
  })}</div>;
}
