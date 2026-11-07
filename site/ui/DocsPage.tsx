import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Accordion } from "@/registry/components/accordion/accordion";
import { SearchField } from "@/registry/components/search-field/search-field";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area";
import { Skeleton } from "@/registry/components/skeleton/skeleton";
import { EmptyState } from "@/registry/components/empty-state/empty-state";
import { ExternalLink, FileText, ListTree } from "./icons";
import { href, navigate, useRoute, withParams } from "../core/router";
import { renderMarkdown, type TocItem } from "../core/markdown";
import { allowScroll } from "../core/scroll-guard";
import { terms } from "../core/search";
import type { DocInfo } from "../core/types";
import { useAtlas } from "./context";
import { DocTree, type TreeNode } from "./DocTree";
import { LinkButton } from "./LinkButton";

function useGroups() {
  const { data } = useAtlas();
  return useMemo(() => {
    const rules: Record<string, string> = data.labels.DOC_GROUPS.path;
    const order = [...new Set(Object.values(rules))];
    const map = new Map<string, DocInfo[]>();
    for (const d of data.docs) map.set(d.group, [...(map.get(d.group) ?? []), d]);
    const names = [...map.keys()].sort((a, b) => {
      const ia = order.indexOf(a), ib = order.indexOf(b);
      const ha = map.get(a)!.every(d => d.hidden), hb = map.get(b)!.every(d => d.hidden);
      return Number(ha) - Number(hb) || (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    return names.map(name => ({ name, docs: map.get(name)!, hidden: map.get(name)!.every(d => d.hidden) }));
  }, [data]);
}

function Directory({ current, query, scrollRef }: { current?: string; query: string; scrollRef: RefObject<HTMLDivElement | null> }) {
  const groups = useGroups();
  const { data } = useAtlas();
  const ts = terms(query);
  const hits = useMemo(() => data.docs.filter(d => ts.every(t => (d.title + "\n" + d.path).toLowerCase().includes(t))), [data.docs, query]);
  const nodes = useMemo<TreeNode[]>(() => ts.length
    ? hits.slice(0, 300).map(d => ({ id: d.path, label: `${d.title} · ${d.path}` }))
    : groups.map(g => ({ id: `group:${g.name}`, label: `${g.name} ${g.docs.length}`, children: g.docs.map(d => ({ id: d.path, label: d.title })) })), [groups, hits, query]);
  return (
    <div className="doc-dir">
      {ts.length ? <p className="muted doc-dir-count">找到 {hits.length} 份文档</p> : null}
      <DocTree nodes={nodes} selectedId={current} scrollRef={scrollRef} defaultExpandedIds={groups.filter(g => !g.hidden).map(g => `group:${g.name}`)} onSelect={node => { if (!node.children) navigate(href("/docs", { path: node.id })); }} />
    </div>
  );
}

function Toc({ toc, path }: { toc: TocItem[]; path: string }) {
  if (toc.length < 2) return null;
  return (
    <nav className="toc" aria-label="章节目录">
      <p className="toc-title"><ListTree aria-hidden="true" /> 章节</p>
      <ul>{toc.map(t => <li key={t.id} data-level={t.level}><a href={href("/docs", { path, h: t.id })}>{t.text}</a></li>)}</ul>
    </nav>
  );
}

function Article({ path, anchor }: { path: string; anchor: string | null }) {
  const { data } = useAtlas();
  const info = data.docs.find(d => d.path === path);
  const [state, setState] = useState<{ path: string; html: string; toc: TocItem[] } | { path: string; error: string } | null>(null);
  useEffect(() => {
    let live = true;
    fetch(path).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then(text => { if (live) setState({ path, ...renderMarkdown(text, path) }); })
      .catch(err => { if (live) setState({ path, error: String(err.message ?? err) }); });
    return () => { live = false; };
  }, [path]);
  useEffect(() => {
    if (!state || state.path !== path || "error" in state) return;
    allowScroll();
    const target = anchor ? document.getElementById(anchor) : null;
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0 });
  }, [state, anchor, path]);

  if (!state || state.path !== path) return <div className="doc-article"><Skeleton lines={8} label="正在读取文档" /></div>;
  if ("error" in state) return <div className="doc-article"><EmptyState title="文档读取失败" description={`${path}：${state.error}`} /></div>;
  return (
    <div className="doc-reader">
      <article className="doc-article">
        <div className="doc-article-head">
          <LinkButton variant="ghost" size="sm" className="only-narrow" href="#/docs">返回目录</LinkButton>
          <span className="doc-path"><FileText aria-hidden="true" /> {path}{info ? ` · ${info.group}` : ""}</span>
          <LinkButton variant="ghost" size="sm" href={path} target="_blank" rel="noopener">原文 <ExternalLink aria-hidden="true" /></LinkButton>
        </div>
        {state.toc.length > 1 ? (
          <div className="toc-inline"><Accordion defaultOpen={-1} items={[{ title: `章节目录（${state.toc.length}）`, content: <Toc toc={state.toc} path={path} /> }]} /></div>
        ) : null}
        <div className="markdown" dangerouslySetInnerHTML={{ __html: state.html }} />
      </article>
      <aside className="doc-toc-column"><ScrollArea orientation="vertical" maxHeight="calc(100dvh - var(--sticky-top) - 48px)" label="章节目录" fade={24}><Toc toc={state.toc} path={path} /></ScrollArea></aside>
    </div>
  );
}

export function DocsPage() {
  const directoryScroll = useRef<HTMLDivElement>(null);
  const route = useRoute();
  const path = route.params.get("path");
  const query = route.params.get("dq") ?? "";
  const { data } = useAtlas();
  return (
    <div className="page docs-page" data-reading={path ? "" : undefined}>
      <header className="page-head"><div><h1>文档 <span className="muted">{data.docs.length}</span></h1></div></header>
      <div className="docs-layout">
      <aside className="doc-sidebar">
        <div className="search-wrap"><SearchField label="搜索文档标题与路径" placeholder="搜索文档" value={query} onValueChange={v => navigate(withParams(route, { dq: v }), { replace: true })} /></div>
        <ScrollArea orientation="vertical" className="doc-dir-scroll" viewportRef={directoryScroll} label="文档目录" fade={24}><Directory current={path ?? undefined} query={query} scrollRef={directoryScroll} /></ScrollArea>
      </aside>
      <div className="doc-main">
        {path ? <Article path={path} anchor={route.params.get("h")} /> : (
          <div className="doc-welcome">
            <EmptyState title="选择一份文档" description="左侧按分组列出研究、Prompt、复刻说明与素材原文；Demo 目录里的文档默认折叠。" />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
