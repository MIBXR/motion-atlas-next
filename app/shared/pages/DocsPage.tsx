import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ExternalLink, List, LoaderCircle, X } from "lucide-react";
import { SearchField } from "@/components/search-field/search-field";
import { CopyPageLink, PageHeader } from "../components/PageBits";
import { useAtlas } from "../lib/atlas-context";
import { useRouter } from "../lib/router";
import type { DocContent, DocMeta } from "../types";
import { atlasUrl, formatBytes, formatNumber } from "../lib/format";
import { loadDocs } from "../lib/docs";
import { prepareMarkdown, scrollToHeading, docRoute } from "../lib/markdown";
import type { TocItem } from "../lib/markdown";
import { Button } from "@/components/button/button";

function normalize(value: string) {
  return value.normalize("NFKC").toLocaleLowerCase("zh-CN");
}

function groupCounts(docs: DocMeta[]) {
  const map = new Map<string, number>();
  for (const doc of docs) map.set(doc.group, (map.get(doc.group) ?? 0) + 1);
  return [...map.entries()];
}

function DocToc({ items, active, onNavigate }: { items: TocItem[]; active?: string; onNavigate: (id: string) => void }) {
  if (!items.length) return <p className="tocEmpty">这篇文档没有分级标题。</p>;
  return (
    <nav aria-label="章节目录">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`tocItem level-${item.level} ${active === item.id ? "is-active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export function DocsPage() {
  const { meta, site } = useAtlas();
  const { params, navigate, pathname } = useRouter();
  const [bundle, setBundle] = useState<DocContent[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [listLimit, setListLimit] = useState(60);
  const [activeHeading, setActiveHeading] = useState<string>();
  const deferredQuery = useDeferredValue(params.get("q") ?? "");
  const query = params.get("q") ?? "";
  const path = params.get("path");
  const anchor = params.get("anchor") ?? undefined;
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadDocs()
      .then((result) => {
        if (!cancelled) setBundle(result.docs);
      })
      .catch(() => {
        if (!cancelled) setLoadError("文档索引没有成功载入。");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const doc = bundle?.find((item) => item.path === path);
  const currentGroup = doc?.group ?? (bundle ? (query ? "搜索结果" : bundle[0]?.group) : "");
  const groups = useMemo(() => (bundle ? groupCounts(bundle) : []), [bundle]);
  const searchable = useMemo(() => {
    if (!bundle) return new Map<string, string>();
    return new Map(bundle.map((item) => [item.path, normalize(`${item.title}\n${item.excerpt}\n${item.content}`)]));
  }, [bundle]);

  const searching = deferredQuery.trim().length > 0;
  const searchTerms = normalize(deferredQuery).split(/\s+/).filter(Boolean);
  const filteredDocs = useMemo(() => {
    if (!bundle) return [];
    if (searching) {
      return bundle.filter((item) => {
        const text = searchable.get(item.path) ?? "";
        return searchTerms.every((term) => text.includes(term));
      });
    }
    return bundle.filter((item) => item.group === currentGroup);
  }, [bundle, currentGroup, searchable, searchTerms, searching]);
  const visibleDocs = filteredDocs.slice(0, listLimit);

  useEffect(() => {
    if (!bundle || path) return;
    const preferred = bundle.find((item) => item.path === "docs/guide.md") ?? bundle[0];
    if (preferred) {
      const next = new URLSearchParams({ path: preferred.path });
      if (query) next.set("q", query);
      navigate(`/docs?${next.toString()}`, { replace: true, preserveScroll: true });
    }
  }, [bundle, navigate, path, query]);

  useEffect(() => {
    setListLimit(60);
  }, [currentGroup, deferredQuery]);

  useEffect(() => {
    if (!doc) return;
    document.title = `${doc.title} · ${site.docsTitle} · ${site.brand}`;
  }, [doc, site.brand, site.docsTitle]);

  const prepared = useMemo(() => (doc ? prepareMarkdown(doc.content, doc.path) : null), [doc]);
  const groupDocs = useMemo(() => (bundle && doc ? bundle.filter((item) => item.group === doc.group) : []), [bundle, doc]);
  const currentIndex = doc ? groupDocs.findIndex((item) => item.path === doc.path) : -1;
  const previous = currentIndex > 0 ? groupDocs[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < groupDocs.length - 1 ? groupDocs[currentIndex + 1] : undefined;

  useEffect(() => {
    if (!prepared) return;
    if (anchor) {
      const timer = window.setTimeout(() => scrollToHeading(anchor), 120);
      return () => window.clearTimeout(timer);
    }
    setActiveHeading(prepared.toc[0]?.id);
  }, [anchor, prepared]);

  useEffect(() => {
    if (!prepared || !bodyRef.current) return;
   const headings = Array.from(bodyRef.current.querySelectorAll<HTMLElement>("h2, h3")) as HTMLElement[];
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHeading(visible.target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [prepared]);

  function updateQuery(value: string) {
    const nextParams = new URLSearchParams(params.toString());
    if (value) nextParams.set("q", value);
    else nextParams.delete("q");
    nextParams.delete("anchor");
    navigate(`${pathname}?${nextParams.toString()}`, { replace: true, preserveScroll: true });
  }

  function openDoc(nextDoc: DocMeta, keepQuery = searching) {
    const nextParams = new URLSearchParams();
    nextParams.set("path", nextDoc.path);
    if (keepQuery && query) nextParams.set("q", query);
    navigate(`/docs?${nextParams.toString()}`);
    setCatalogOpen(false);
  }

  function chooseGroup(group: string) {
    if (!bundle) return;
    const first = bundle.find((item) => item.group === group);
    if (!first) return;
    navigate(docRoute(first.path));
    setCatalogOpen(false);
  }

  function navigateHeading(id: string) {
    scrollToHeading(id);
    setActiveHeading(id);
    if (!doc) return;
    const next = new URLSearchParams(params.toString());
    next.set("path", doc.path);
    next.set("anchor", id);
    navigate(`${pathname}?${next.toString()}`, { replace: true, preserveScroll: true });
  }

  function onDocClick(event: ReactMouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const image = target.closest("img");
    if (image instanceof HTMLImageElement) {
      event.preventDefault();
      window.open(image.src, "_blank", "noopener");
      return;
    }
    const anchorElement = target.closest<HTMLElement>("[data-doc-anchor]");
    const id = anchorElement?.dataset.docAnchor;
    if (id) {
      event.preventDefault();
      navigateHeading(id);
    }
  }

  const rawHref = doc ? `${atlasUrl(doc.path)}` : "";
  const loading = !bundle && !loadError;

  return (
    <div className="docsPage">
      <PageHeader
        kicker={`READING ROOM / ${site.brand}`}
        title={site.docsTitle}
        lead={site.docsLead}
        topRight={site.snapshot}
        aside={
          <div className="docsHeaderStats">
            <span className="countDisplay">{String(meta.docs.length).padStart(4, "0")}</span>
            <span className="countCaption">份文档</span>
            <p>{meta.docGroups.length} 个分组 · 含研究、Prompt、复刻说明与许可</p>
          </div>
        }
      />

      <div className="docsMobileBar">
        <button type="button" className="docsCatalogButton" onClick={() => setCatalogOpen(true)}>
          <List size={15} strokeWidth={1.8} aria-hidden="true" />
          文档目录
          {doc && <span>{doc.group}</span>}
        </button>
        {doc && <span className="docsMobileCurrent">{doc.title}</span>}
      </div>

      <div className="docsWorkspace">
        <aside className={`docCatalog ${catalogOpen ? "is-mobile-open" : ""}`} aria-label="文档目录">
          <div className="docCatalogTop">
            <div>
              <span className="monoLabel">CATALOG</span>
              <h2>文档目录</h2>
            </div>
            <button type="button" className="docCatalogClose" onClick={() => setCatalogOpen(false)} aria-label="关闭文档目录">
              <X size={18} strokeWidth={1.8} />
            </button>
          </div>
          <SearchField
            label="搜索全部文档"
            value={query}
            onValueChange={updateQuery}
            placeholder="标题、正文内容"
            autoComplete="off"
            disabled={!bundle}
          />
          <p className="docSearchHint">多个词以空格分隔，全部命中才显示</p>
          <div className="docGroups" role="group" aria-label="文档分组">
            {groups.map(([group, count]) => (
              <button
                type="button"
                key={group}
                className={group === currentGroup && !searching ? "is-active" : ""}
                onClick={() => chooseGroup(group)}
              >
                <span>{group}</span>
                <span>{formatNumber(count)}</span>
              </button>
            ))}
          </div>
          <div className="docListHead">
            <span>{searching ? `搜索 “${deferredQuery}”` : currentGroup}</span>
            <span>{formatNumber(filteredDocs.length)}</span>
          </div>
          <div className="docList" aria-live="polite">
            {loading && (
              <div className="docListLoading">
                <LoaderCircle size={16} className="spinIcon" aria-hidden="true" />
                载入文档索引
              </div>
            )}
            {!loading && !visibleDocs.length && <p className="docListEmpty">没有匹配的文档。</p>}
            {visibleDocs.map((item) => (
              <button
                type="button"
                key={item.path}
                className={`docListItem ${item.path === path ? "is-active" : ""}`}
                onClick={() => openDoc(item)}
              >
                <span className="docListTitle">{item.title}</span>
                <span className="docListMeta">
                  <span>{searching ? item.group : item.path.split("/").slice(-2).join("/")}</span>
                  <span>{formatBytes(item.bytes)}</span>
                </span>
              </button>
            ))}
            {visibleDocs.length < filteredDocs.length && (
              <Button variant="secondary" size="sm" onClick={() => setListLimit((value) => value + 60)}>
                再显示 60 份 · {formatNumber(filteredDocs.length - visibleDocs.length)} 剩余
              </Button>
            )}
          </div>
        </aside>

        <article className="docReader">
          {loading ? (
            <div className="docReaderLoading">
              <span className="skeletonLine wide" />
              <span className="skeletonLine" />
              <span className="skeletonBlock" />
              <span className="skeletonBlock" />
              <p>正在打开阅读室</p>
            </div>
          ) : loadError ? (
            <div className="docReaderError">
              <BookOpen size={22} strokeWidth={1.5} aria-hidden="true" />
              <h2>文档没有载入</h2>
              <p>{loadError}</p>
            </div>
          ) : !doc ? (
            <div className="docReaderError">
              <BookOpen size={22} strokeWidth={1.5} aria-hidden="true" />
              <h2>没有找到这份文档</h2>
              <p>这个路径可能不在当前内容快照中。请从目录重新选择。</p>
              <Button variant="secondary" size="sm" onClick={() => chooseGroup(bundle?.[0]?.group ?? "指南")}>回到目录</Button>
            </div>
          ) : (
            <>
              <header className="docReaderHeader">
                <div className="docReaderTopline">
                  <span className="docGroupTag">{doc.group}</span>
                  <span className="docPathLabel">{doc.path}</span>
                  <div className="docReaderActions">
                    <CopyPageLink label="复制链接" />
                    <a href={rawHref} target="_blank" rel="noreferrer noopener" className="docOpenRaw">
                      <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
                      原文文件
                    </a>
                  </div>
                </div>
                <h1>{doc.title}</h1>
                <p className="docByline">
                  <span>{formatBytes(doc.bytes)}</span>
                  <span>{doc.excerpt}</span>
                </p>
              </header>

              <details className="docTocMobile">
                <summary>
                  <List size={15} strokeWidth={1.8} aria-hidden="true" />
                  章节目录
                  <span>{prepared?.toc.length ?? 0}</span>
                </summary>
                {prepared && <DocToc items={prepared.toc} active={activeHeading} onNavigate={navigateHeading} />}
              </details>

              <div className="docReaderLayout">
                <div
                  className="docBody"
                  ref={bodyRef}
                  onClick={onDocClick}
                  dangerouslySetInnerHTML={{ __html: prepared?.html ?? "" }}
                />
                <aside className="docToc" aria-label="章节目录">
                  <span className="monoLabel">ON THIS PAGE</span>
                  {prepared && <DocToc items={prepared.toc} active={activeHeading} onNavigate={navigateHeading} />}
                </aside>
              </div>

              <nav className="docPager" aria-label="上一篇与下一篇">
                {previous ? (
                  <button type="button" onClick={() => openDoc(previous)} className="docPagerItem is-prev">
                    <ChevronLeft size={15} strokeWidth={1.8} aria-hidden="true" />
                    <span><small>上一篇</small>{previous.title}</span>
                  </button>
                ) : <span />}
                {next ? (
                  <button type="button" onClick={() => openDoc(next)} className="docPagerItem is-next">
                    <span><small>下一篇</small>{next.title}</span>
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                ) : <span />}
              </nav>
              <div className="docReaderFoot">
                <span>{site.brand} · {doc.group}</span>
                {previous || next ? (
                  <button type="button" onClick={() => previous ? openDoc(previous) : next && openDoc(next)}>
                    <ArrowLeft size={13} aria-hidden="true" />
                    同组文档
                  </button>
                ) : null}
              </div>
            </>
          )}
        </article>
      </div>
    </div>
  );
}