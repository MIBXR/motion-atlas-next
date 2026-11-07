import { useState } from "react";
import { Textarea } from "@/registry/components/textarea/textarea";
import { Accordion } from "@/registry/components/accordion/accordion";
import { Button } from "@/registry/components/button/button";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area";
import { useLab } from "./context";
import { parseEv } from "./engine/state";
import { KIND } from "./engine/constants";
import { ms, signed } from "./engine/math";

function Editor() {
  const lab = useLab(), { S } = lab, [draft, setDraft] = useState<string | null>(null);
  const c = lab.clip(), list = lab.evs(), inl = list.filter(e => e.inLoop), out = list.length - inl.length;
  const abs = inl.map(e => Math.abs(ms(e.dev))), max = abs.length ? Math.max(...abs) : 0, dups = new Set(inl.filter(e => e.dup > 1).map(e => e.full.toFixed(4))).size;
  const stats = inl.length ? `${inl.length} 个事件 · 平均移动 ${Math.round(abs.reduce((s, v) => s + v, 0) / abs.length)}ms · 最大 ${max}ms${dups ? ` · ${dups} 处重叠（多个事件吸到同一点）` : ''}${out ? ` · ${out} 个超出 ${c.L.toFixed(2)}s 循环` : ''}` : (out ? `${out} 个事件超出 ${c.L.toFixed(2)}s 循环` : '没有事件');
  return <div className="lab-stack">
    <Textarea label="事件时刻（秒，逗号或换行分隔；相对循环起点）" rows={2} spellCheck={false} value={draft ?? S.ev.map(t => t.toFixed(3)).join(', ')} onChange={e => { setDraft(e.currentTarget.value); lab.update({ ev: parseEv(e.currentTarget.value).sort((a, b) => a - b), example: '' }); }} onBlur={() => setDraft(null)} />
    <div className="lab-row"><Button className="arc-button" size="sm" variant="ghost" onClick={lab.applySnap}>把事件改成吸附后的时刻</Button><Button className="arc-button" size="sm" variant="ghost" onClick={() => lab.update({ ev: [], example: '' })}>清空事件</Button></div>
    <p className="muted mono small">{stats}</p>
    <ScrollArea orientation="horizontal" label="吸附明细" fade={12}>
      <table className="table lab-table mono"><thead><tr>{['#', '原始', '吸附到', '吸附后', '移动', '落点'].map(t => <th key={t}>{t}</th>)}</tr></thead><tbody>{inl.map((e, j) => <tr key={e.i}><td>{j + 1}</td><td>{e.t.toFixed(3)}s</td><td>{e.label}</td><td>{e.snap.toFixed(3)}s</td><td data-feedback={e.dev > 0 ? 'early' : e.dev < 0 ? 'late' : 'on'}>{ms(e.dev) ? signed(ms(e.dev)) : '0'}</td><td>{KIND[e.kind]}{e.dup > 1 ? ' · 重叠' : ''}</td></tr>)}</tbody></table>
    </ScrollArea>
  </div>;
}
export function EventEditor() { return <Accordion defaultOpen={-1} items={[{ title: '编辑事件时刻（秒）· 吸附明细', content: <Editor /> }]} />; }
