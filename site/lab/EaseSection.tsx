import { Button } from "@/registry/components/button/button";
import { Switch } from "@/registry/components/switch/switch";
import { RotateCcw } from "lucide-react";
import { useLab } from "./context";
import { Range, Segments } from "./controls";
import { CurveEditor } from "./CurveEditor";
import { StaggerPreview } from "./StaggerPreview";
import { snapDuration, snapStagger, totalMs } from "./engine/curve";
import { r2 } from "./engine/math";

export function EaseSection() {
  const lab = useLab(), { S, T } = lab, c = lab.clip(), tot = totalMs(S), bar = c.spb * c.bpb * 1000;
  return <section className="section lab-section" id="s-ease" aria-labelledby="h-ease">
    <header className="section-head"><h2 id="h-ease">曲线 × 时长 × 拍子</h2></header>
    <p className="prose">曲线决定动作的速度变化，时长决定轻重感，错峰通过控制元素起步的间隔形成视觉层次。开启“跟随节拍”后，预览每小节重播。选择“落点踩重拍”，最后一个元素在重拍落定。起步时有呼啸音，每次落定时有提示音。</p>
    <div className="lab-ease-grid"><CurveEditor /><article className="lab-pane"><h3>时长与错峰</h3>
      <Range label="时长" value={S.dur} min={80} max={2000} step={10} format={v => `${v}ms`} onChange={dur => lab.update({ dur })} />
      <Range label="错峰" value={S.stag} max={300} step={5} format={v => `${v}ms`} onChange={stag => lab.update({ stag })} />
      <Range label="位移" value={S.dist} min={20} format={v => `${v}%`} onChange={dist => lab.update({ dist })} />
      <Range label="数量" value={S.count} min={1} max={12} onChange={count => lab.update({ count })} />
      <div className="lab-row" role="group" aria-label="按拍设置时长与错峰"><span className="small muted">对到拍</span>{[[.25, '¼'], [.5, '½'], [1, '1']].map(([f, l]) => <Button key={f} variant="secondary" size="sm" onClick={() => { lab.update({ dur: snapDuration(S, +f) }); lab.curveClock.restartFree(); }}>时长 {l} 拍</Button>)}<Button variant="secondary" size="sm" onClick={() => { lab.update({ stag: snapStagger(S) }); lab.curveClock.restartFree(); }}>错峰 = 网格步长</Button></div>
      <StaggerPreview />
      <div className="lab-row"><Switch label="跟随节拍" checked={S.sync} onCheckedChange={sync => lab.update({ sync })} /><fieldset className="lab-align" disabled={!S.sync}><Segments label="对齐方式" value={S.align} items={[['land', '落点踩重拍'], ['start', '起步踩重拍']]} onChange={align => lab.update({ align })} /></fieldset></div>
      <div className="lab-row">{([['cue', '提示音'], ['trail', '频闪轨迹'], ['ghost', '线性对照']] as const).map(([key, name]) => <Switch key={key} label={name} checked={S[key]} onCheckedChange={v => lab.update({ [key]: v })} />)}<Button variant="secondary" disabled={T.run && S.sync} title={T.run && S.sync ? '跟随节拍时每小节自动重播' : undefined} onClick={lab.replay}><RotateCcw size={16} />重播</Button></div>
      <p className="muted small mono">总时长 <b>{tot}ms</b> ≈ {r2(tot / 1000 / c.spb)} 拍 · 时长 {S.dur}ms ≈ {r2(S.dur / 1000 / c.spb)} 拍 · 1 小节 {Math.round(bar)}ms{tot > bar ? <span className="lab-warning"> · 总时长超过 1 小节，跟随节拍时动画会被下一小节打断</span> : null}</p>
    </article></div>
  </section>;
}
