import { Button } from "@/registry/components/button/button";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area";
import { Checkbox } from "@/registry/components/checkbox/checkbox";
import { FilterToolbar } from "@/registry/components/filter-toolbar/filter-toolbar";
import { SearchField } from "@/registry/components/search-field/search-field";
import SegmentedControl from "@/registry/components/segmented-control/segmented-control";
import { EmptyState } from "@/registry/components/empty-state/empty-state";
import { Drawer, DrawerContent, DrawerTrigger } from "@/registry/components/drawer/drawer";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Filter, LayoutGrid, List, Star } from "./icons";
import { navigate, paramList, useRoute, withParams } from "../core/router";
import { matches, terms } from "../core/search";
import { useFavorites } from "../core/store";
import { KIND_NAME, type Entry, type Facet, type Kind } from "../core/types";
import { EntryCard } from "./blocks";
import { useAtlas } from "./context";
import { useFitTop } from "./use-fit-top";

const collator = new Intl.Collator("zh-CN");

/** 列表状态全部在 URL：q 搜索、各筛选字段、sort/dir 排序、fav 只看收藏、view 布局。 */
export function useListState(kind: Kind) {
  const { data, facets } = useAtlas();
  const route = useRoute();
  const fav = useFavorites();
  const p = route.params;
  const q = p.get("q") ?? "";
  const sort = p.get("sort") === "title" ? "title" : "order";
  const dir = p.get("dir") === "desc" ? "desc" : "asc";
  const favOnly = p.get("fav") === "1";
  const selected = Object.fromEntries(facets[kind].map(f => [f.key, paramList(p, f.key)])) as Record<string, string[]>;

  const result = useMemo(() => {
    const ts = terms(q);
    const base = data[kind].filter(e => matches(e, ts) && (!favOnly || fav[kind].includes(e.id)));
    const pass = (e: Entry, skip?: string) => facets[kind].every(f => f.key === skip || !selected[f.key]!.length || f.values(e).some(v => selected[f.key]!.includes(v)));
    const items = base.filter(e => pass(e));
    items.sort((a, b) => (sort === "title" ? collator.compare(a.title, b.title) : a.order - b.order) * (dir === "desc" ? -1 : 1));
    // 每个筛选字段的计数按“其余条件都满足”统计，选中后仍能看到同组其他取值的数量。
    const counts: Record<string, Map<string, number>> = {};
    for (const f of facets[kind]) {
      const m = new Map<string, number>();
      for (const e of base) if (pass(e, f.key)) for (const v of new Set(f.values(e))) m.set(v, (m.get(v) ?? 0) + 1);
      for (const e of data[kind]) for (const v of f.values(e)) if (!m.has(v)) m.set(v, 0);
      counts[f.key] = m;
    }
    return { items, counts };
  }, [data, kind, q, sort, dir, favOnly, fav, route.params.toString()]);

  return { route, q, sort, dir, favOnly, selected, ...result };
}

function FacetGroup({ facet, counts, selected, onToggle }: { facet: Facet; counts: Map<string, number>; selected: string[]; onToggle: (v: string) => void }) {
  // 取值顺序固定：有字典或数据顺序时按它，其余按中文名称排序；不随计数变化重排。
  const values = useMemo(() => {
    const keys = [...counts.keys()];
    const rank = (v: string) => { const i = facet.order?.indexOf(v) ?? -1; return i < 0 ? Infinity : i; };
    return keys.sort((a, b) => rank(a) - rank(b) || collator.compare(facet.display(a), facet.display(b)));
  }, [counts, facet]);
  const [more, setMore] = useState(false);
  const limit = 12;
  const shown = more ? values : values.slice(0, limit);
  return (
    <fieldset className="facet">
      <legend>{facet.label}</legend>
      {shown.map(v => {
        const n = counts.get(v)!;
        const on = selected.includes(v);
        return (
          <div key={v} className="facet-option" data-empty={!n && !on || undefined} onClick={ev => { if (!(ev.target as Element).closest("button, label")) onToggle(v); }}>
            <Checkbox checked={on} label={facet.display(v)} onCheckedChange={() => onToggle(v)} />
            <span className="facet-count">{n}</span>
          </div>
        );
      })}
      {values.length > limit ? <Button variant="ghost" size="sm" onClick={() => setMore(!more)}>{more ? "收起" : `展开全部 ${values.length} 项`}</Button> : null}
    </fieldset>
  );
}

export function ListPage({ kind }: { kind: Kind }) {
  const { facets, data } = useAtlas();
  const s = useListState(kind);
  const page = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const facetColumn = useRef<HTMLElement>(null);
  // 筛选栏吸附在工具栏下方，工具栏高度随已选条件变化，量出来交给 CSS。
  useLayoutEffect(() => {
    const el = bar.current!;
    const ro = new ResizeObserver(() => page.current?.style.setProperty("--toolbar-h", `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useFitTop(facetColumn);
  const view = s.route.params.get("view") === "list" ? "list" : "grid";
  const set = (patch: Record<string, string | string[] | null>, replace = false) => navigate(withParams(s.route, patch), { replace });
  const toggle = (key: string, v: string) => {
    const cur = s.selected[key]!;
    set({ [key]: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] });
  };
  const active = facets[kind].flatMap(f => s.selected[f.key]!.map(v => ({ id: JSON.stringify([f.key, v]), label: f.label, value: f.display(v), key: f.key, raw: v })));
  const filterCount = active.length + Number(Boolean(s.q.trim())) + Number(s.favOnly);
  const search = (
    <SearchField
      label={`搜索${KIND_NAME[kind]}`}
      placeholder="多个词用空格分隔，需全部命中"
      value={s.q}
      onValueChange={v => set({ q: v }, true)}
    />
  );
  const sortControls = <>
    <SegmentedControl label="排序" value={s.sort} onValueChange={v => set({ sort: v === "order" ? null : v })} options={[{ value: "order", label: "编号" }, { value: "title", label: "名称" }]} />
    <Button variant="secondary" size="md" aria-label={s.dir === "asc" ? "正序，点按切换为反序" : "反序，点按切换为正序"} title={s.dir === "asc" ? "正序" : "反序"} onClick={() => set({ dir: s.dir === "asc" ? "desc" : null })}>
      {s.dir === "asc" ? <ArrowUpNarrowWide /> : <ArrowDownWideNarrow />}
    </Button>
  </>;
  const favoritesButton = (
    <Button variant={s.favOnly ? "primary" : "secondary"} size="md" aria-pressed={s.favOnly} onClick={() => set({ fav: s.favOnly ? null : "1" })}>
      <Star fill={s.favOnly ? "currentColor" : "none"} /><span>只看收藏</span>
    </Button>
  );
  const viewSwitch = (
    <SegmentedControl className="view-switch" label="布局" value={view} onValueChange={v => set({ view: v === "grid" ? null : "list" })} options={[
      { value: "grid", label: "", accessory: <><LayoutGrid aria-hidden="true" /><span className="visually-hidden">网格</span></> },
      { value: "list", label: "", accessory: <><List aria-hidden="true" /><span className="visually-hidden">列表</span></> },
    ]} />
  );
  const selectedFilters = active.length ? (
    <FilterToolbar label="已选筛选条件" filters={active} onRemove={id => { const filter = active.find(item => item.id === id)!; toggle(filter.key, filter.raw); }} onClearAll={() => set(Object.fromEntries(facets[kind].map(f => [f.key, null])))} />
  ) : null;
  const filterPanel = (
    <div className="facets">
      {facets[kind].map(f => <FacetGroup key={f.key} facet={f} counts={s.counts[f.key]!} selected={s.selected[f.key]!} onToggle={v => toggle(f.key, v)} />)}
    </div>
  );

  return (
    <div ref={page} className="page list-page">
      <header className="page-head">
        <h1>{KIND_NAME[kind]} <span className="muted">{s.items.length} / {data[kind].length}</span></h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary" size="md" className="only-narrow list-filter-trigger" aria-label={filterCount ? `筛选，已启用 ${filterCount} 项` : "筛选"}>
              <Filter aria-hidden="true" /><span>筛选{filterCount ? ` ${filterCount}` : ""}</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent title={`筛选${KIND_NAME[kind]}`} side="right" className="list-filter-drawer" aria-describedby={undefined}>
            <div className="list-filter-body">
              {search}
              {selectedFilters}
              <div className="toolbar-row">{sortControls}</div>
              <div className="toolbar-row">{favoritesButton}<span className="toolbar-spacer" />{viewSwitch}</div>
              {filterPanel}
            </div>
          </DrawerContent>
        </Drawer>
      </header>
      <div ref={bar} className="toolbar">
        <div className="search-wrap">{search}</div>
        <div className="toolbar-row">
          {sortControls}
          {favoritesButton}
          <span className="toolbar-spacer" />
          {viewSwitch}
        </div>
        {selectedFilters}
      </div>
      <div className="list-layout">
        <aside ref={facetColumn} className="facet-column" aria-label="筛选"><ScrollArea orientation="vertical" className="facet-scroll" label="筛选条件" fade={24}>{filterPanel}</ScrollArea></aside>
        <div>
          {s.items.length ? (
            <div className={view === "list" ? "card-list" : "card-grid"}>
              {s.items.map(e => <EntryCard key={e.id} kind={kind} e={e} layout={view} />)}
            </div>
          ) : (
            <EmptyState title="没有匹配的条目" description="换一个关键词，或减少筛选条件。" />
          )}
        </div>
      </div>
    </div>
  );
}
