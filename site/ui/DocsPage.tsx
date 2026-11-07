import { memo, useEffect, useId, useMemo, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";
import { Button } from "@/registry/components/button/button";
import { Drawer, DrawerContent } from "@/registry/components/drawer/drawer";
import { Accordion } from "@/registry/components/accordion/accordion";
import { SearchField } from "@/registry/components/search-field/search-field";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area";
import { Skeleton } from "@/registry/components/skeleton/skeleton";
import { EmptyState } from "@/registry/components/empty-state/empty-state";
import { ChevronDown, ExternalLink, FileText, FolderTree, ListTree } from "./icons";
import { href, navigate, useRoute, withParams } from "../core/router";
import { renderMarkdown, type TocItem } from "../core/markdown";
import { allowScroll } from "../core/scroll-guard";
import { openText, TEXT_FILE } from "../core/open-text";
import { terms } from "../core/search";
import type { DocInfo } from "../core/types";
import { useAtlas } from "./context";
import { DocumentDirectory } from "./DocumentDirectory";
import { LinkButton } from "./LinkButton";
import { useFitTop } from "./use-fit-top";

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

const Directory = memo(function Directory({ current, query, viewportRef }: { current?: string; query: string; viewportRef: RefObject<HTMLDivElement | null> }) {
  const groups = useGroups();
  const { data } = useAtlas();
  const hits = useMemo(() => {
    const ts = terms(query);
    return ts.length ? data.docs.filter(d => ts.every(t => (d.title + "\n" + d.path).toLowerCase().includes(t))) : null;
  }, [data.docs, query]);
  const nodes = useMemo(() => hits
    ? hits.slice(0, 300).map(d => ({ id: d.path, label: `${d.title} · ${d.path}` }))
    : groups.map(g => ({ id: g.name, label: `${g.name}（${g.docs.length}）`, children: g.docs.map(d => ({ id: d.path, label: d.title })) })), [groups, hits]);
  return (
    <div className="doc-dir">
      {hits ? <p className="muted doc-dir-count">找到 {hits.length} 份文档</p> : null}
      <DocumentDirectory nodes={nodes} defaultExpandedIds={groups.filter(g => !g.hidden).map(g => g.name)} selectedId={current} viewportRef={viewportRef} onSelect={node => { if (!node.children) navigate(href("/docs", { path: node.id, dq: query })); }} />
    </div>
  );
});

function Toc({ toc, path, active, onPick, viewportRef }: { toc: TocItem[]; path: string; active?: string; onPick: (id: string) => void; viewportRef?: RefObject<HTMLDivElement | null> }) {
  const nav = useRef<HTMLElement>(null);
  const markerId = `toc-marker-${useId()}`;
  const reduced = useReducedMotion() ?? false;
  useEffect(() => {
    const viewport = viewportRef?.current, link = nav.current?.querySelector<HTMLElement>("[aria-current]");
    if (!viewport || !link) return;
    const bounds = viewport.getBoundingClientRect(), rect = link.getBoundingClientRect();
    if (rect.top < bounds.top + 24) viewport.scrollTop -= bounds.top + 24 - rect.top;
    else if (rect.bottom > bounds.bottom - 24) viewport.scrollTop += rect.bottom - (bounds.bottom - 24);
  }, [active]);
  if (toc.length < 2) return null;
  return (
    <nav ref={nav} className="toc" aria-label="章节目录">
      <p className="toc-title"><ListTree aria-hidden="true" /> 章节</p>
      <ul>{toc.map(t => <li key={t.id} data-level={t.level}>{t.id === active ? <motion.span aria-hidden="true" layoutId={markerId} className="toc-marker" transition={reduced ? { duration: 0 } : motionTokens.spring.morph} /> : null}<a href={href("/docs", { path, h: t.id })} aria-current={t.id === active ? "location" : undefined}
        onClick={ev => { if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey || ev.button !== 0) return; ev.preventDefault(); onPick(t.id); }}>{t.text}</a></li>)}</ul>
    </nav>
  );
}

function Article({ path, anchor, query, onShown }: { path: string; anchor: string | null; query: string; onShown: (path: string) => void }) {
  const { data } = useAtlas();
  const route = useRoute();
  const info = data.docs.find(d => d.path === path);
  const [state, setState] = useState<{ path: string; html: string; toc: TocItem[] } | { path: string; error: string } | null>(null);
  const [active, setActive] = useState<string>();
  const tocViewport = useRef<HTMLDivElement>(null);
  const positioned = useRef<string | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const panelDirectory = useRef<HTMLDivElement>(null);
  const panelToc = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  useEffect(() => setDocsOpen(false), [path]);
  function scrollToAnchor(id: string | null, smooth: boolean) {
    allowScroll(2000);
    const behavior = smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant";
    const el = id ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior, block: "start" });
    else if (id === null) window.scrollTo({ top: 0, behavior });
  }
  function onPick(id: string) {
    if (id === anchor) scrollToAnchor(id, true);
    else navigate(href("/docs", { path, h: id }));
  }
  function pickFromPanel(id: string) { pending.current = id; setTocOpen(false); }
  useEffect(() => {
    let live = true;
    fetch(path).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then(text => { if (live) setState({ path, ...renderMarkdown(text, path) }); })
      .catch(err => { if (live) setState({ path, error: String(err.message ?? err) }); });
    return () => { live = false; };
  }, [path]);
  useEffect(() => {
    if (!state || state.path !== path || "error" in state) return;
    const same = positioned.current === path;
    positioned.current = path;
    if (same) { scrollToAnchor(anchor, true); return; }
    allowScroll();
    const target = anchor ? document.getElementById(anchor) : null;
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0 });
    onShown(path);
  }, [state, anchor, path]);
  useEffect(() => {
    if (!state || state.path !== path || "error" in state) return;
    const nodes = state.toc.map(t => document.getElementById(t.id)).filter(n => n !== null);
    let raf = 0;
    const update = () => {
      raf = 0;
      const style = getComputedStyle(document.documentElement);
      const line = (parseFloat(style.getPropertyValue("--sticky-top")) || 0) + (parseFloat(style.getPropertyValue("--doc-bar-h")) || 0) + 24;
      let cur = nodes[0];
      for (const n of nodes) if (n.getBoundingClientRect().top <= line) cur = n;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) cur = nodes[nodes.length - 1];
      setActive(cur?.id);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [state, path]);

  if (!state || state.path !== path) return <div className="doc-article"><Skeleton lines={8} label="正在读取文档" /></div>;
  if ("error" in state) return <div className="doc-article"><EmptyState title="文档读取失败" description={`${path}：${state.error}`} /></div>;
  const currentText = state.toc.find(t => t.id === active)?.text ?? state.toc[0]?.text;
  return (
    <div className="doc-reader">
      <article className="doc-article">
        <div className="doc-bar">
          <Button variant="secondary" size="sm" aria-label="文档目录" title="文档目录" onClick={() => setDocsOpen(true)}><FolderTree /></Button>
          <span className="doc-bar-title" title={path}>{info?.title ?? path}</span>
          {state.toc.length > 1 ? <Button variant="secondary" size="sm" className="doc-bar-toc" aria-label={`本节目录：${currentText}`} onClick={() => setTocOpen(true)}><ListTree /><span>{currentText}</span><ChevronDown /></Button> : null}
          <LinkButton variant="ghost" size="sm" href={path} target="_blank" rel="noopener" aria-label="原文" title="原文" onClick={openText}><ExternalLink /></LinkButton>
        </div>
        <Drawer open={docsOpen} onOpenChange={setDocsOpen}><DrawerContent title="文档目录" side="bottom" className="filter-drawer">
          <div className="search-wrap"><SearchField label="搜索文档标题与路径" placeholder="搜索文档" value={query} onValueChange={v => navigate(withParams(route, { dq: v }), { replace: true })} /></div>
          <ScrollArea orientation="vertical" className="doc-dir-panel" maxHeight="60dvh" label="文档目录" fade={24} viewportRef={panelDirectory}><Directory current={path} query={query} viewportRef={panelDirectory} /></ScrollArea>
        </DrawerContent></Drawer>
        <Drawer open={tocOpen} onOpenChange={setTocOpen}><DrawerContent title={`本节目录（${state.toc.length}）`} side="bottom" className="filter-drawer" onCloseAutoFocus={event => {
          if (!pending.current) return;
          event.preventDefault();
          const id = pending.current;
          pending.current = null;
          onPick(id);
        }}>
          <ScrollArea orientation="vertical" maxHeight="60dvh" label="本节目录" fade={24} viewportRef={panelToc}><Toc toc={state.toc} path={path} active={active} onPick={pickFromPanel} viewportRef={panelToc} /></ScrollArea>
        </DrawerContent></Drawer>
        <div className="doc-article-head">
          <span className="doc-path"><FileText aria-hidden="true" /> {path}{info ? ` · ${info.group}` : ""}</span>
          <LinkButton variant="ghost" size="sm" href={path} target="_blank" rel="noopener" onClick={openText}>原文 <ExternalLink aria-hidden="true" /></LinkButton>
        </div>
        {state.toc.length > 1 ? (
          <div className="toc-inline"><Accordion key={path} defaultOpen={-1} items={[{ title: `章节目录（${state.toc.length}）`, content: <Toc toc={state.toc} path={path} active={active} onPick={onPick} /> }]} /></div>
        ) : null}
        <div className="markdown" onClick={event => {
          const anchor = (event.target as Element).closest<HTMLAnchorElement>("a");
          if (!anchor || anchor.hasAttribute("download") || anchor.getAttribute("href")?.startsWith("#/")) return;
          const url = new URL(anchor.href);
          if (url.origin === location.origin && TEXT_FILE.test(url.pathname)) openText(event, anchor);
        }} dangerouslySetInnerHTML={{ __html: state.html }} />
      </article>
      <aside className="doc-toc-column"><ScrollArea orientation="vertical" maxHeight="calc(100dvh - var(--sticky-top) - 48px)" label="章节目录" fade={24} viewportRef={tocViewport}><Toc toc={state.toc} path={path} active={active} onPick={onPick} viewportRef={tocViewport} /></ScrollArea></aside>
    </div>
  );
}

export function DocsPage() {
  const route = useRoute();
  const path = route.params.get("path");
  const query = route.params.get("dq") ?? "";
  const { data } = useAtlas();
  const directoryViewport = useRef<HTMLDivElement>(null);
  const directoryColumn = useRef<HTMLElement>(null);
  useFitTop(directoryColumn);
  const [shownPath, setShownPath] = useState<string | null>(null);
  const lastPath = useRef(path);
  useEffect(() => { if (path) lastPath.current = path; }, [path]);
  return (
    <div className="page docs-page" data-reading={path ? "" : undefined}>
      <header className="page-head"><div><h1>文档 <span className="muted">{data.docs.length}</span></h1></div></header>
      <div className="docs-layout">
      <aside ref={directoryColumn} className="doc-sidebar">
        <div className="search-wrap"><SearchField label="搜索文档标题与路径" placeholder="搜索文档" value={query} onValueChange={v => navigate(withParams(route, { dq: v }), { replace: true })} /></div>
        <ScrollArea orientation="vertical" className="doc-dir-scroll" label="文档目录" fade={0} viewportRef={directoryViewport}><Directory key={path ? "reading" : "directory"} current={shownPath ?? lastPath.current ?? undefined} query={query} viewportRef={directoryViewport} /></ScrollArea>
      </aside>
      <div className="doc-main">
        {path ? <Article path={path} anchor={route.params.get("h")} query={query} onShown={setShownPath} /> : (
          <div className="doc-welcome">
            <EmptyState title="选择一份文档" description="左侧按分组列出研究、Prompt、复刻说明与素材原文；Demo 目录里的文档默认折叠。" />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
