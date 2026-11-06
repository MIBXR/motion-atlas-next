import { Switch } from "@/registry/components/switch/switch";
import { Button } from "@/registry/components/button/button";
import { Select } from "@/registry/components/select/select";
import { useLab, useLabFrame } from "./context";
import { GridControls, Range, Segments } from "./controls";
import { EXAMPLES, EVOICES, MODES } from "./engine/constants";
import { mod } from "./engine/math";
import { Timeline } from "./Timeline";
import { Bounce } from "./Bounce";
import { RecordPanel } from "./RecordPanel";
import { EventEditor } from "./EventEditor";

function PlaybackLabel() {
  const lab = useLab(), { S, T } = lab, { beat } = useLabFrame();
  if (beat === null) return null;
  const m = Math.floor(lab.clock.clipAbs(beat) / lab.clip().L);
  const ab = T.rec ? 'rec' : S.mode === 'ab' ? (mod(m - T.abPhase, 2) ? 'b' : 'a') : S.mode;
  const text = ab === 'rec' ? '录入中：事件静音，只放节拍器' : ab === 'a' ? '正在播放：A 原始' : ab === 'b' ? '正在播放：B 吸附后' : ab === 'both' ? '正在播放：A（左）+ B（右）' : '';
  return <p className="lab-ab small mono" aria-live="polite">{text}</p>;
}
export function QuantSection() {
  const lab = useLab(), { S } = lab, ex = EXAMPLES[S.example], c = lab.clip();
  return <section className="section lab-section" id="s-quant" aria-labelledby="h-quant">
    <header className="section-head"><h2 id="h-quant">理解吸附</h2></header>
    <p className="prose">剪辑点、动作落点这些事件很少正好落在拍上。吸附会把它们移到最近的网格点：网格越细，保留的节奏越多；网格太粗会把切分抹平。选择 A/B 交替播放，听事件吸附前后的差别。</p>
    <div className="lab-quant-controls"><div className="lab-stack"><GridControls /></div><div className="lab-stack"><Range label="首拍偏移" value={S.offset} max={1000} step={5} format={v => `${v}ms`} onChange={offset => lab.update({ offset })} /><Range label="量化强度" value={S.strength} format={v => `${v}%`} onChange={strength => lab.update({ strength })} /></div><div className="lab-row"><Segments label="循环" value={S.bars} items={[[1, '1 小节'], [2, '2 小节'], [4, '4 小节']]} onChange={v => lab.update({ bars: +v })} /><span className="small mono muted">= {c.L.toFixed(2)} 秒</span></div></div>
    <Segments label="示例" value={S.example} items={Object.entries(EXAMPLES).map(([k, v]) => [k, v.name])} onChange={example => lab.update({ example })} />
    <div className="lab-pane" aria-live="polite">{ex ? <><p><b>{ex.name}</b>：{ex.desc}{ex.tip}</p><div className="lab-row">{ex.tries.map(([name, patch]) => <Button key={name} variant="secondary" size="sm" onClick={() => lab.update(patch)}>{name}</Button>)}</div></> : <p>{S.ev.length ? '自定义事件（通过拖动、键盘操作或打拍录入创建）。' : '还没有事件。选择上方示例、点击 A 道空白处，或使用打拍录入来添加事件。'}</p>}</div>
    <div className="lab-legend small muted"><span><i data-level="beat" />A 原始</span><span><i data-level="bar" />B 吸附后</span><span><i data-level="early" />偏早 → 往后挪</span><span><i data-level="bar" />偏晚 → 往前挪</span><span>拖动 A 点调整时刻 · 点击 A 道空白处添加事件 · 选中后按 Delete 删除</span></div>
    <Timeline />
    <Segments label="播放" value={S.mode} items={MODES} onChange={mode => lab.update({ mode })} mobileSelect />
    <div className="lab-row"><div className="lab-voice"><Select label="事件音色" options={Object.entries(EVOICES).map(([value, v]) => ({ value, label: v.name }))} value={S.evVoice} onValueChange={evVoice => lab.update({ evVoice })} /></div><Switch label="循环起点提示音" checked={S.startCue} onCheckedChange={startCue => lab.update({ startCue })} /><PlaybackLabel /></div>
    <div className="lab-demo-grid"><Bounce /><RecordPanel /></div>
    <EventEditor />
  </section>;
}
