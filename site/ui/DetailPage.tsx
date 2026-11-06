import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { EmptyState } from "@/registry/components/empty-state/empty-state";
import { ChevronLeft, ChevronRight, Download } from "./icons";
import { href } from "../core/router";
import { KIND_NAME, type Entry, type Kind } from "../core/types";
import { CompareButton, FavButton, SectionNav } from "./blocks";
import { byId, useAtlas } from "./context";

export function DetailPage({ kind, id }: { kind: Kind; id: string }) {
  const { data, detail } = useAtlas();
  const e = byId(data[kind], id);
  if (!e) return <div className="page"><EmptyState title="找不到这个条目" description={`${KIND_NAME[kind]}中没有 ${id}。`} action={<a className="pill-button" href={`#/${kind}`}>返回{KIND_NAME[kind]}列表</a>} /></div>;
  return <>{detail[kind](e)}</>;
}

function Neighbors({ kind, e }: { kind: Kind; e: Entry }) {
  const { data } = useAtlas();
  const list = data[kind];
  const i = list.indexOf(e);
  const prev = list[i - 1], next = list[i + 1];
  return (
    <div className="neighbors">
      {prev ? <a className="icon-button" href={href(`/${kind}/${prev.id}`)} aria-label={`上一条：${prev.title}`} title={prev.title}><ChevronLeft /></a> : <span className="icon-button" aria-hidden="true" data-disabled />}
      {next ? <a className="icon-button" href={href(`/${kind}/${next.id}`)} aria-label={`下一条：${next.title}`} title={next.title}><ChevronRight /></a> : <span className="icon-button" aria-hidden="true" data-disabled />}
    </div>
  );
}

/** 没有可运行样例、只有画廊的素材：画廊放在左栏，其余说明在右栏。左栏随页面滚动，不吸顶。 */
export function GalleryStage({ e, children }: { e: Entry; children: ReactNode }) {
  return (
    <section className="gallery-stage" aria-label="画廊">
      <header className="section-head"><h2>画廊 <span className="muted">{e.gallery.length}</span></h2></header>
      {children}
    </section>
  );
}

export interface DetailLayoutProps {
  kind: Kind;
  e: Entry;
  subtitle?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  /** 左侧（宽屏）或顶部（窄屏）的 Demo 舞台。 */
  stage?: ReactNode;
  children: ReactNode;
}

export function DetailLayout({ kind, e, subtitle, meta, actions, stage, children }: DetailLayoutProps) {
  const content = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  useLayoutEffect(() => {
    const nodes = content.current?.querySelectorAll<HTMLElement>(":scope > .section");
    setSections([...(nodes ?? [])].filter(n => n.childElementCount > 1).map(n => ({ id: n.id.replace(/^sec-/, ""), title: n.dataset.section ?? "" })));
  }, [e]);
  // 当前章节：最后一个顶部已越过吸顶章节条下沿的小节。
  const [active, setActive] = useState<string>();
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const nodes = [...(content.current?.querySelectorAll<HTMLElement>(":scope > .section") ?? [])].filter(n => n.childElementCount > 1);
      const line = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sticky-top")) || 0) + 120;
      let cur = nodes[0];
      for (const n of nodes) if (n.getBoundingClientRect().top <= line) cur = n;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) cur = nodes[nodes.length - 1];
      setActive(cur?.id.replace(/^sec-/, ""));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [e, sections]);
  return (
    <div className="page detail-page" data-has-stage={stage ? "" : undefined}>
      <header className="detail-head">
        <div className="detail-head-main">
          <nav className="crumbs" aria-label="位置">
            <a href={`#/${kind}`}>{KIND_NAME[kind]}</a>
            <ChevronRight aria-hidden="true" />
            <span className="mono">{String(e.order).padStart(3, "0")}</span>
          </nav>
          <h1>{e.title}</h1>
          {subtitle ? <p className="detail-sub">{subtitle}</p> : null}
          {meta ? <div className="detail-meta">{meta}</div> : null}
        </div>
        <div className="detail-head-side">
          <Neighbors kind={kind} e={e} />
          <div className="detail-actions">
            <FavButton kind={kind} id={e.id} />
            {kind === "cases" ? <CompareButton id={e.id} /> : null}
            {e.$.agent ? <a className="pill-button" href={e.$.agent} download={`${e.id}.json`}><Download /><span>Agent 资料包</span></a> : null}
            {actions}
          </div>
        </div>
      </header>
      <div className="detail-body">
        {stage ? <div className="detail-stage">{stage}</div> : null}
        <div className="detail-content">
          <SectionNav sections={sections} active={active} />
          <div ref={content} className="detail-sections">{children}</div>
        </div>
      </div>
    </div>
  );
}
