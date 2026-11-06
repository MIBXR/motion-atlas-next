import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area";
import { Accordion } from "@/registry/components/accordion/accordion";
import Toast from "@/registry/components/toast/toast";
import { ListTree } from "lucide-react";
import { allowScroll } from "@/core/scroll-guard";
import { LabContext, useLab } from "./context";
import { createLab } from "./engine/lab";
import { Transport } from "./Transport";
import { BeatSection } from "./BeatSection";
import { QuantSection } from "./QuantSection";
import { EaseSection } from "./EaseSection";
import { ExportSection } from "./ExportSection";
import "./lab.css";
import "./visuals.css";

const sections = [['s-beat', '感受节拍'], ['s-quant', '理解吸附'], ['s-ease', '曲线 × 时长 × 拍子'], ['s-export', '导出']];
function Contents() {
  const [active, setActive] = useState('s-beat');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id); }, { rootMargin: '-30% 0px -60% 0px' });
    for (const [id] of sections) observer.observe(document.getElementById(id)!);
    return () => observer.disconnect();
  }, []);
  return <nav className="toc" aria-label="实验室目录"><p className="toc-title"><ListTree size={16} aria-hidden="true" />实验室目录</p><ul>{sections.map(([id, title]) => <li key={id}><a href={`#/tools/rhythm-lab?h=${id}`} aria-current={active === id ? 'location' : undefined} onClick={e => { e.preventDefault(); setActive(id); allowScroll(2000); document.getElementById(id)!.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{title}</a></li>)}</ul></nav>;
}
function Feedback() {
  const lab = useLab();
  return <div className="lab-toast"><Toast title={lab.message} open={!!lab.message} onOpenChange={open => { if (!open) lab.dismissToast(); }} /></div>;
}
export function LabPage() {
  const [lab] = useState(createLab), page = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Object.assign(window, { __lab: lab.debug });
    const disconnect = lab.connect();
    const ro = new ResizeObserver(() => page.current?.style.setProperty('--lab-transport-height', `${page.current.querySelector('.lab-transport')!.getBoundingClientRect().height}px`));
    ro.observe(page.current!.querySelector('.lab-transport')!);
    const anchor = new URLSearchParams(location.hash.split('?')[1]).get('h');
    if (anchor && sections.some(([id]) => id === anchor)) { allowScroll(); document.getElementById(anchor)!.scrollIntoView({ block: 'start' }); }
    return () => { disconnect(); ro.disconnect(); Reflect.deleteProperty(window, '__lab'); };
  }, [lab]);
  return <LabContext.Provider value={lab}><div className="page lab-page" ref={page} onMouseDown={e => { if ((e.target as HTMLElement).closest('button')) e.preventDefault(); }}>
    <header className="page-head"><div><p className="crumbs">节奏实验室</p><h1>把“手感”调成数字。</h1><p className="detail-sub">先用节拍器感受速度、拍号与细分，再比较事件吸附前后的差别。把曲线、时长和错峰对齐拍子，导出代码、Prompt 或 WAV。</p></div></header>
    <div className="lab-layout"><div className="lab-main"><Transport /><div className="lab-toc-inline"><Accordion defaultOpen={-1} items={[{ title: '实验室目录', content: <Contents /> }]} /></div><div className="lab-sections"><BeatSection /><QuantSection /><EaseSection /><ExportSection /></div></div>
      <aside className="doc-toc-column lab-toc"><ScrollArea orientation="vertical" maxHeight="calc(100dvh - var(--sticky-top) - 48px)" label="实验室目录" fade={24}><Contents /></ScrollArea></aside>
    </div><Feedback />
  </div></LabContext.Provider>;
}
