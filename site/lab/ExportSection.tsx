import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/components/tabs/tabs";
import { CodeBlock } from "@/registry/components/code-block/code-block";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area";
import { Button } from "@/registry/components/button/button";
import { AudioWaveform } from "lucide-react";
import { useLab } from "./context";
import { Segments } from "./controls";
import { MODES } from "./engine/constants";
import { wavFilename } from "./engine/wav";

export function ExportSection() {
  const lab = useLab(), { S } = lab, c = lab.clip(), [rendering, setRendering] = useState(false), [result, setResult] = useState('');
  const code = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new MutationObserver(records => { if (records.some(r => (r.target as HTMLElement).dataset.copyState === 'copied')) lab.toast('导出内容已复制'); });
    observer.observe(code.current!, { attributes: true, attributeFilter: ['data-copy-state'], subtree: true });
    return () => observer.disconnect();
  }, [lab]);
  const tabs = [['css', 'CSS 变量', 'css'], ['js', 'MotionKit', 'javascript'], ['prompt', 'Prompt 片段', 'text']];
  async function download() {
    setRendering(true); setResult('正在离线渲染…');
    try {
      const r = await lab.renderWav(S.wavCycles), a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([r.wav()], { type: 'audio/wav' }));
      a.download = wavFilename(S); a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      setResult(`已导出 ${a.download} · ${r.duration.toFixed(2)}s · ${r.events} 个声音事件 · 峰值 ${r.peakDb.toFixed(1)} dBFS · RMS ${r.rmsDb.toFixed(1)} dBFS${r.clipped ? ` · 削波 ${r.clipped}` : ' · 无削波'}`);
    } catch (err) { setResult('导出失败：' + (err as Error).message); }
    finally { setRendering(false); }
  }
  return <section className="section lab-section" id="s-export" aria-labelledby="h-export">
    <header className="section-head"><h2 id="h-export">导出 <small className="muted">CSS · JS · PROMPT · WAV</small></h2></header>
    <p className="prose">导出内容包含当前节拍、事件、曲线、时长与错峰参数。WAV 使用同一套音色，可拖入剪辑软件对拍。</p>
    <div className="lab-export-grid"><article className="lab-export" ref={code}><Tabs value={S.tab} onValueChange={tab => lab.update({ tab })}><TabsList aria-label="导出格式">{tabs.map(([key, label]) => <TabsTrigger key={key} value={key}>{label}</TabsTrigger>)}</TabsList>{tabs.map(([key, , language]) => <TabsContent key={key} value={key}><ScrollArea orientation="vertical" maxHeight={440} label="导出内容" fade={12}><CodeBlock code={lab.exportText(key)} language={language} /></ScrollArea></TabsContent>)}</Tabs></article>
      <article className="lab-pane"><h3>导出 WAV <small className="muted">OFFLINE RENDER</small></h3><p className="small muted">WAV 包含当前节拍器和事件的声音，以及循环起点提示音与曲线提示音。节拍器保留三级音量，A/B 交替按圈切换。曲线跟随节拍时加入提示音。从第 0 秒开始导出整数圈，方便循环使用。</p>
        <Segments label="长度" value={S.wavCycles} items={[[1, '1 圈'], [2, '2 圈'], [4, '4 圈']]} onChange={v => lab.update({ wavCycles: +v })} />
        <p className="small mono muted">{S.meter} · {S.bpm} BPM · {S.bars} 小节一圈（{c.L.toFixed(2)}s）× {S.wavCycles} = {(c.L * S.wavCycles).toFixed(2)}s · 事件 {MODES.find(([k]) => k === S.mode)![1]}</p>
        <div><Button disabled={rendering} onClick={() => void download()}><AudioWaveform size={16} />导出 WAV</Button></div><p className="small mono muted" aria-live="polite">{result}</p>
      </article>
    </div>
    <p className="muted small">设置会保存在当前浏览器中，下次打开可继续调整；换设备不会同步。声音默认关闭，第一次点击“播放”时开启。</p>
  </section>;
}
