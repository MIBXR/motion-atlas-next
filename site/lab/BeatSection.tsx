import { useLab, useLabFrame } from "./context";
import { GridControls, Range, Segments } from "./controls";
import { KITS, METERS, divName, range } from "./engine/constants";
import { mod, ms } from "./engine/math";

function Metronome() {
  const lab = useLab(), { S, T } = lab, { beat } = useLabFrame(), c = lab.clip(), g = lab.grid();
  const going = beat !== null && beat >= -0.02 - c.bpb * 4, rel = (beat ?? 0) - T.bar, countIn = going && rel < 0;
  const inBar = mod(rel, c.bpb), idx = Math.floor(inBar + 1e-9), f = inBar - idx;
  let k = 0; for (let j = 0; j < g.length; j++) if (g[j] <= f + 1e-9) k = j;
  const glow = going ? lab.reduced ? 1 : Math.exp(-f * c.spb / .16) : 0;
  return <div className="lab-pane lab-metro">
    <div className="lab-metro-top"><strong className="lab-count mono" data-level={!going || countIn ? 'idle' : idx === 0 ? 'bar' : c.acc.has(idx) ? 'acc' : 'beat'}>{going ? idx + 1 : '·'}</strong><p className="small muted mono">{!going ? '已停止' : countIn ? '预备小节' : `小节 ${Math.floor(rel / c.bpb) + 1}`} · {S.bpm} BPM · 1 拍 {ms(c.spb)}ms · 1 小节 {(c.spb * c.bpb).toFixed(2)}s</p></div>
    <div className="lab-metro-bar" aria-hidden="true"><div className="lab-metro-cells">{range(c.bpb).map(b => <div className={`lab-cell ${c.acc.has(b) ? 'group-start' : ''}`} key={b} data-level={b === 0 ? 'bar' : c.acc.has(b) ? 'acc' : 'beat'} data-on={going && idx === b || undefined} style={{ '--glow': going && idx === b ? glow : 0 } as React.CSSProperties}><b>{b + 1}</b>{g.slice(1).map((o, j) => <i key={j} style={{ left: `${(o * 100).toFixed(2)}%`, '--glow': going && idx === b && k === j + 1 ? lab.reduced ? 1 : Math.exp(-(f - g[k]) * c.spb / .1) : 0 } as React.CSSProperties} />)}</div>)}</div>
      {going && !lab.reduced ? <i className="lab-metro-ball" style={{ left: `${inBar / c.bpb * 100}%`, transform: `translateY(${-Math.sin(Math.PI * f) * 34}px)` }} /> : null}
    </div>
    <p className="lab-legend small muted">{[['bar', '小节重拍'], ['acc', '次强拍'], ['beat', '拍'], ['sub', '细分']].map(([lv, name]) => <span key={lv}><i data-level={lv} />{name}</span>)}</p>
    <p className="muted small">{METERS[S.meter].hint} 细分：{divName(S, S.div)}{S.div > 1 ? `（每拍 ${S.div} 格）` : ''}。</p>
  </div>;
}
export function BeatSection() {
  const lab = useLab(), { S } = lab;
  return <section className="section lab-section" id="s-beat" aria-labelledby="h-beat">
    <header className="section-head"><h2 id="h-beat">节拍器</h2></header>
    <p className="prose">节拍器把时间切成等长的格子：小节重拍最重，拍次之，细分最轻。调整速度、拍号、细分或摇摆，都会在下一个格子生效，相位保持连续，节拍器不会重启。先在这里选定速度。</p>
    <div className="lab-beat-grid"><Metronome /><div className="lab-pane">
      <Range label="速度" value={S.bpm} min={40} max={240} onChange={bpm => lab.update({ bpm })} />
      <Segments label="拍号" value={S.meter} items={Object.keys(METERS).map(k => [k, k])} onChange={meter => lab.update({ meter })} />
      <GridControls hint />
      <Segments label="音色" value={S.kit} items={Object.entries(KITS).map(([k, v]) => [k, v.name])} onChange={lab.kit} />
      <div className="lab-stack" role="group" aria-label="三级音量">{([['bar', '重拍'], ['beat', '拍'], ['sub', '细分']] as const).map(([k, name]) => <Range key={k} label={name} value={S.lv[k]} format={v => `${v}%`} onChange={v => lab.update({ lv: { [k]: v } })} />)}</div>
    </div></div>
  </section>;
}
