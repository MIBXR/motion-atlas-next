import { Button } from "@/registry/components/button/button";
import { NumberField } from "@/registry/components/number-field/number-field";
import { Slider } from "@/registry/components/slider/slider";
import { Switch } from "@/registry/components/switch/switch";
import { Play, Square, Hand } from "lucide-react";
import { audio } from "./engine/audio";
import { mod } from "./engine/math";
import { useLab, useLabFrame } from "./context";

function Position() {
  const lab = useLab(), { S, T } = lab, { beat } = useLabFrame(), c = lab.clip(), g = lab.grid();
  const rel = beat === null ? null : beat - T.bar;
  const barN = rel === null ? 0 : Math.floor(rel / c.bpb), inBar = rel === null ? 0 : mod(rel, c.bpb), idx = Math.floor(inBar + 1e-9), f = inBar - idx;
  let k = 0; for (let j = 0; j < g.length; j++) if (g[j] <= f + 1e-9) k = j;
  const pos = rel === null ? '—' : rel < 0 ? `预备 ${Math.ceil(-rel)}` : `${barN + 1}.${idx + 1}${S.div > 1 ? '.' + (k + 1) : ''}`;
  return <><div className="lab-lights" aria-hidden="true">{Array.from({ length: c.bpb }, (_, i) => <i key={i} data-level={i === 0 ? 'bar' : c.acc.has(i) ? 'acc' : 'beat'} data-on={rel !== null && idx === i || undefined} className={c.acc.has(i) ? 'group-start' : undefined} />)}</div><output className="lab-position mono" aria-label="当前位置（小节.拍.细分）">{pos}</output></>;
}
export function Transport() {
  const lab = useLab(), { S, T } = lab;
  const label = audio.state === 'on' ? '声音 开' : audio.state === 'blocked' ? '声音 待启用' : '声音 关';
  return <>
    <div className="lab-transport" role="group" aria-label="走带：播放、速度与声音">
      <Button className="lab-play" aria-label={T.run ? '停止（空格）' : '播放（空格）'} aria-pressed={T.run} onClick={lab.toggle}>{T.run ? <Square size={16} /> : <Play size={16} />}{T.run ? '停止' : '播放'}</Button>
      <div className="lab-bpm" onKeyDown={e => { if (e.key === 'Enter' && e.target instanceof HTMLInputElement) e.target.blur(); }}><NumberField label="速度（BPM）" value={S.bpm} min={40} max={240} step={1} size="sm" limitHint={false} onValueChange={bpm => lab.update({ bpm })} /></div>
      <Button className="lab-tempo" variant="secondary" aria-label="打拍测速（T）" onPointerDown={e => { if (e.button === 0) { e.preventDefault(); lab.tapTempo(e.timeStamp); } }} onClick={e => { if (e.detail === 0) lab.tapTempo(e.timeStamp); }}><Hand size={16} /><span><span className="lab-tempo-long">打拍</span>测速</span><kbd className="lab-key">T</kbd></Button>
      <span className="lab-tap-info mono small muted" aria-live="polite">{lab.tapInfo}</span>
      <Position />
      <div className="lab-sound" data-state={audio.state}><Switch label={label} checked={audio.enabled} onCheckedChange={lab.sound} /><div className="lab-volume"><Slider label="音量" value={S.vol} showValue={false} format={v => `${v}%`} onValueChange={vol => lab.update({ vol })} /></div></div>
    </div>
    <p className="lab-keys small muted">快捷键：<span><kbd>空格</kbd> 播放 / 停止</span><span><kbd>T</kbd> 打拍测速</span><span><kbd>J</kbd> 打拍板</span><span><kbd>R</kbd> 录入一遍</span><span><kbd>A</kbd> / <kbd>B</kbd> 原始 / 吸附</span><span><kbd>X</kbd> A/B 交替</span></p>
  </>;
}
