import { useMemo, useState } from "react";
import { SearchField } from "@/registry/components/search-field/search-field";
import SegmentedControl from "@/registry/components/segmented-control/segmented-control";
import { Checkbox } from "@/registry/components/checkbox/checkbox";
import { Input } from "@/registry/components/input/input";
import { CodeBlock } from "@/registry/components/code-block/code-block";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area";
import { Badge } from "@/registry/components/badge/badge";
import { useAtlas } from "@/ui/context";
import { createItems, filterItems, ordered, ROLE_NAME } from "./engine/catalog";
import { readState, saveState } from "./engine/state";
import { createPrompts } from "./engine/prompts";
import type { AgentState } from "./engine/types";

export function Generator() {
  const { data } = useAtlas();
  const items = useMemo(() => createItems(data), [data]), byId = useMemo(() => new Map(items.map(x => [x.e.id, x])), [items]);
  const [S, setState] = useState(() => readState(new Set(byId.keys()))), [query, setQuery] = useState('');
  const list = filterItems(items, S.kind, query), result = createPrompts(S, byId).generate(ordered(S, byId));
  function update(patch: Partial<AgentState>) { const next = { ...S, ...patch }; saveState(next); setState(next); }
  return <section className="section agent-section" id="agent-generator">
    <header className="section-head"><h2>指令生成器</h2></header>
    <p className="prose">勾选条目，生成一段可以直接交给编码 Agent 或视频模型的任务说明。</p>
    <div className="agent-generator">
      <div className="agent-pane agent-pick">
        <SearchField label="筛选条目" placeholder="筛选：地图、转场、HUD、抽卡…" value={query} onValueChange={setQuery} />
        <SegmentedControl label="条目类型" value={S.kind} options={[{ value: 'all', label: '全部' }, { value: 'cases', label: '案例' }, { value: 'patterns', label: '巧思' }]} onValueChange={kind => update({ kind: kind as AgentState['kind'] })} />
        <ScrollArea orientation="vertical" maxHeight={560} label="条目列表" fade={16}>
          <div className="agent-items">{list.map(x => <div className="agent-item" data-selected={S.sel.includes(x.e.id) || undefined} key={x.e.id}>
            <Checkbox checked={S.sel.includes(x.e.id)} label={x.e.title} description={`${x.e.id} · ${x.sub}`} onCheckedChange={checked => update({ sel: checked ? [...new Set([...S.sel, x.e.id])] : S.sel.filter(id => id !== x.e.id) })} />
            <Badge tone={x.role === 'foundation' ? 'warning' : 'neutral'}>{ROLE_NAME[x.role]}</Badge>
          </div>)}</div>
          {!list.length ? <p className="muted">没有匹配的条目</p> : null}
        </ScrollArea>
      </div>
      <div className="agent-pane agent-output">
        <SegmentedControl label="生成目标" value={S.target} options={[{ value: 'code', label: '代码实现' }, { value: 'video', label: '视频生成' }]} onValueChange={target => update({ target: target as AgentState['target'] })} />
        <Input label="你的主题（可选）" placeholder="例如：上海一日城市漫游、新品发布倒计时" value={S.brief} onChange={e => update({ brief: e.currentTarget.value })} />
        <div data-agent-output><ScrollArea orientation="vertical" maxHeight={520} label="生成的指令" fade={16}><CodeBlock code={result.text} language="text" /></ScrollArea></div>
        <p className="agent-warning muted" role="status">{result.warning}</p>
      </div>
    </div>
  </section>;
}
