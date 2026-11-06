import { Button } from "@/registry/components/button/button";
import { Progress } from "@/registry/components/progress/progress";
import { Circle } from "lucide-react";
import { useLab, useLabFrame } from "./context";
import { Range } from "./controls";
import { clamp, signed } from "./engine/math";

export function RecordPanel() {
  const lab = useLab(), { S, T, recorder: rec } = lab, { beat } = useLabFrame();
  const progress = rec.progress(beat === null ? 0 : lab.clock.clipAbs(beat));
  const mean = rec.taps.length ? rec.taps.reduce((s, t) => s + t.dev, 0) / rec.taps.length : 0;
  return <div className="lab-pane lab-record">
    <h3>打拍录入</h3>
    <p className="small muted">跟着节拍器点击打拍板（或按 <kbd>J</kbd>），实时查看敲击早 / 晚多少毫秒。点击“录入一遍”会从下一圈开头录入一整圈，录完后自动 A/B 交替播放：先听原始敲击，再听吸附后的事件。</p>
    <div className="lab-row"><Button variant="secondary" aria-pressed={!!T.rec} onClick={rec.recToggle}><Circle size={16} />{progress.label}<kbd className="lab-key">R</kbd></Button><Button variant="secondary" className="lab-pad" aria-describedby="pad-feedback" onPointerDown={e => { if (e.button === 0) { e.preventDefault(); rec.padTap(e.timeStamp); } }} onClick={e => { if (e.detail === 0) rec.padTap(e.timeStamp); }}>打拍板 <kbd>J</kbd></Button></div>
    {T.rec ? <Progress value={progress.value * 100} aria-label="录入进度" /> : null}
    <p id="pad-feedback" className="small mono" data-feedback={rec.feedbackClass} aria-live="polite">{rec.feedback}</p>
    <div className="lab-tap-hist" aria-hidden="true">{rec.taps.slice(-16).map((t, i) => <i key={i} className={t.cls} style={{ '--d': clamp(t.dev / 80, -1, 1).toFixed(3) } as React.CSSProperties} />)}{rec.taps.length ? <span>{rec.taps.length} 下 · 平均 {signed(Math.round(mean))}</span> : null}</div>
    <Range label="延迟补偿" value={S.lat} min={-150} max={150} format={signed} onChange={lat => lab.update({ lat })} />
    <div><Button variant="ghost" disabled={rec.taps.length < 4} onClick={rec.calibrate}>按平均偏差校准</Button></div>
  </div>;
}
