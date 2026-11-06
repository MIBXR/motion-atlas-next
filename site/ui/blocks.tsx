// 详情页与列表共用的展示块。字段缺失时组件返回 null，调用方无需判断。
import { Children, isValidElement, useEffect, useRef, type ReactNode } from "react";
import { allowScroll } from "../core/scroll-guard";
import { CopyButton } from "@/registry/components/copy-button/copy-button";
import Badge from "@/registry/components/badge/badge";
import { ExternalLink, GitCompareArrows, Star } from "./icons";
import { href } from "../core/router";
import { toggleCompare, toggleFavorite, useCompare, useFavorites } from "../core/store";
import { KIND_NAME, KIND_SINGULAR, type Entry, type Kind } from "../core/types";
import { byId, useAtlas } from "./context";

export const has = (v: unknown): boolean =>
  v != null && v !== "" && !(Array.isArray(v) && v.length === 0) && !(typeof v === "object" && !Array.isArray(v) && Object.keys(v as object).length === 0);

export function Section({ id, title, children, aside }: { id: string; title: string; children: ReactNode; aside?: ReactNode }) {
  if (!Children.toArray(children).some(Boolean)) return null;
  return (
    <section className="section" id={`sec-${id}`} data-section={title}>
      <header className="section-head"><h2>{title}</h2>{aside}</header>
      {children}
    </section>
  );
}

export function Prose({ text }: { text?: string | null }) {
  if (!has(text)) return null;
  return <p className="prose">{text}</p>;
}

export function Bullets({ items, title }: { items?: unknown[]; title?: string }) {
  if (!has(items)) return null;
  return (
    <div className="bullets">
      {title ? <h3>{title}</h3> : null}
      <ul>{items!.map((t, i) => <li key={i}>{typeof t === "string" ? t : <ObjectLine value={t} />}</li>)}</ul>
    </div>
  );
}

function ObjectLine({ value }: { value: unknown }) {
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if ("what" in o) return <>{o.at != null ? <strong className="mono">{typeof o.at === "number" ? `${o.at}s` : String(o.at)} </strong> : null}{String(o.what)}</>;
    return <>{Object.entries(o).map(([k, v]) => `${k}：${String(v)}`).join("；")}</>;
  }
  return <>{String(value)}</>;
}

/** 键值表：labels 为字段显示名字典，缺省显示原键。 */
export function KV({ data, labels, order }: { data?: Record<string, unknown> | null; labels?: Record<string, string>; order?: string[] }) {
  if (!has(data)) return null;
  const keys = order ? [...order.filter(k => k in data!), ...Object.keys(data!).filter(k => !order.includes(k))] : Object.keys(data!);
  const rows = keys.filter(k => has(data![k]));
  if (!rows.length) return null;
  return (
    <dl className="kv">
      {rows.map(k => (
        <div key={k} className="kv-row">
          <dt>{labels?.[k] ?? k}</dt>
          <dd>{renderValue(data![k])}</dd>
        </div>
      ))}
    </dl>
  );
}

const COLOR = /^(#[0-9a-f]{3,8}|(rgba?|hsla?|oklch|oklab|color-mix)\(.+\))$/i;

/** 色值：色块 + 等宽色值并排，用在概览、Token 表等窄行里。 */
export function ColorValue({ value }: { value: string }) {
  return <span className="color-value"><span className="color-dot" style={{ background: value }} /><code>{value}</code></span>;
}

export function renderValue(v: unknown): ReactNode {
  if (isValidElement(v)) return v;
  if (typeof v === "string" && COLOR.test(v.trim())) return <ColorValue value={v.trim()} />;
  if (typeof v === "string" && /^https?:\/\/\S+$/.test(v)) return <a href={v} target="_blank" rel="noopener" className="break">{v}</a>;
  if (typeof v === "string" && /^(demos|docs|prompts|previews|agent)\/\S+\.\w+$/.test(v)) return <a href={v.endsWith(".md") ? href("/docs", { path: v }) : v} target={v.endsWith(".md") ? undefined : "_blank"} className="break">{v}</a>;
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "是" : "否";
  if (Array.isArray(v)) return v.every(x => typeof x === "string") ? v.join("、") : <ul>{v.map((x, i) => <li key={i}><ObjectLine value={x} /></li>)}</ul>;
  if (v && typeof v === "object") return <KV data={v as Record<string, unknown>} />;
  return null;
}

export function Palette({ colors }: { colors?: string[] }) {
  if (!has(colors)) return null;
  return (
    <ul className="palette">
      {colors!.map((c, i) => (
        <li key={i}>
          <span className="swatch" style={{ background: c }} />
          <code>{c}</code>
        </li>
      ))}
    </ul>
  );
}

export function ParamTable({ rows, cols }: { rows?: Record<string, unknown>[]; cols: [string, string][] }) {
  if (!has(rows)) return null;
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr>{cols.map(([k, l]) => <th key={k}>{l}</th>)}</tr></thead>
        <tbody>{rows!.map((r, i) => <tr key={i}>{cols.map(([k]) => <td key={k}>{has(r[k]) ? renderValue(r[k]) : "—"}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function PromptBlock({ title, text, note }: { title: string; text?: string | null; note?: string }) {
  if (!has(text)) return null;
  return (
    <div className="prompt">
      <div className="prompt-head">
        <h3>{title}</h3>
        {note ? <span className="muted">{note}</span> : null}
        <CopyButton value={text!} label="复制" />
      </div>
      <pre className="prompt-body">{text}</pre>
    </div>
  );
}

export function CodeLine({ text, label = "复制" }: { text?: string; label?: string }) {
  if (!has(text)) return null;
  return (
    <div className="codeline">
      <pre>{text}</pre>
      <CopyButton value={text!} label={label} />
    </div>
  );
}

export function EntryLink({ kind, id, note }: { kind: Kind; id: string; note?: string }) {
  const { data } = useAtlas();
  const e = byId(data[kind], id);
  return (
    <a className="entry-link" href={href(`/${kind}/${id}`)}>
      {e?.$.preview ? <img src={e.$.preview} alt="" loading="lazy" /> : <span className="entry-link-ph" />}
      <span>
        <span className="entry-link-kind">{KIND_NAME[kind]}</span>
        <strong>{e?.title ?? id}</strong>
        {note ? <span className="muted">{note}</span> : null}
      </span>
    </a>
  );
}

export function EntryLinks({ kind, ids }: { kind: Kind; ids?: string[] }) {
  if (!has(ids)) return null;
  return <div className="entry-links">{[...new Set(ids)].map(id => <EntryLink key={id} kind={kind} id={id} />)}</div>;
}

export function RelatedEntries({ items }: { items?: { kind: string; id: string; note?: string }[] }) {
  if (!has(items)) return null;
  return <div className="entry-links">{items!.map((r, i) => <EntryLink key={i} kind={KIND_SINGULAR[r.kind] ?? "cases"} id={r.id} note={r.note} />)}</div>;
}

export function DocLinks({ docs }: { docs: { label: string; path?: string }[] }) {
  const list = docs.filter((d, i) => d.path && docs.findIndex(x => x.path === d.path) === i);
  if (!list.length) return null;
  return (
    <div className="doc-links">
      {list.map(d => <a key={d.path} className="chip-link" href={href("/docs", { path: d.path })}>{d.label}</a>)}
    </div>
  );
}

export interface SourceItem { tag?: string; title: ReactNode; url?: string; internal?: boolean; meta?: ReactNode; note?: ReactNode; actions?: ReactNode }

/** 来源列表：左列固定宽度的中文证据标签，右列标题、说明与行内操作；所有详情类型统一使用。 */
export function SourceList({ items }: { items: SourceItem[] }) {
  if (!items.length) return null;
  const tagged = items.some(s => s.tag);
  return (
    <ul className="sources" data-tagged={tagged || undefined}>
      {items.map((s, i) => (
        <li key={i}>
          {tagged ? <span className="source-tag">{s.tag ?? "—"}</span> : null}
          <div className="source-body">
            <div className="source-line">
              {s.url ? <a className="source-title" href={s.url} target={s.internal ? undefined : "_blank"} rel={s.internal ? undefined : "noopener"}>{s.title}{s.internal ? null : <ExternalLink aria-hidden="true" />}</a> : <strong className="source-title">{s.title}</strong>}
              {s.meta ? <span className="muted source-meta">{s.meta}</span> : null}
              {s.actions}
            </div>
            {s.note ? <div className="source-note">{s.note}</div> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** 证据代码的中文名：优先 labels.json，缺映射时用这里的译名。 */
const EVIDENCE_FALLBACK: Record<string, string> = { source: "原始出处", observed: "实访观察", adapted: "练习适配", inferred: "设计推断" };
export function useEvidenceLabel() {
  const { data } = useAtlas();
  const dict: Record<string, string> = data.labels.patterns?.["sources[].evidence"] ?? {};
  return (v?: string) => (v ? dict[v] ?? EVIDENCE_FALLBACK[v] ?? v : undefined);
}

export function Sources({ items }: { items?: Record<string, any>[] }) {
  const evidence = useEvidenceLabel();
  if (!has(items)) return null;
  return <SourceList items={items!.map(s => ({ tag: s.type ?? evidence(s.evidence), title: s.title ?? s.label ?? s.url, url: s.url, note: s.note }))} />;
}

export function FavButton({ kind, id, compact }: { kind: Kind; id: string; compact?: boolean }) {
  const fav = useFavorites();
  const on = fav[kind].includes(id);
  return (
    <button
      className={compact ? "icon-button fav" : "pill-button fav"}
      aria-pressed={on}
      aria-label={on ? "取消收藏" : "收藏"}
      title={on ? "取消收藏" : "收藏"}
      onClick={ev => { ev.preventDefault(); ev.stopPropagation(); toggleFavorite(kind, id); }}
    >
      <Star fill={on ? "currentColor" : "none"} />
      {compact ? null : <span>{on ? "已收藏" : "收藏"}</span>}
    </button>
  );
}

export function CompareButton({ id, compact }: { id: string; compact?: boolean }) {
  const list = useCompare();
  const on = list.includes(id);
  return (
    <button
      className={compact ? "icon-button" : "pill-button"}
      aria-pressed={on}
      aria-label={on ? "移出比较" : "加入比较"}
      title={on ? "移出比较" : "加入比较（最多 3 个）"}
      onClick={ev => { ev.preventDefault(); ev.stopPropagation(); toggleCompare(id); }}
    >
      <GitCompareArrows />
      {compact ? null : <span>{on ? "已加入比较" : "加入比较"}</span>}
    </button>
  );
}

export function EntryCard({ kind, e, layout }: { kind: Kind; e: Entry; layout: "grid" | "list" }) {
  const { cardMeta } = useAtlas();
  const meta = cardMeta(kind, e);
  return (
    <a className={`card card-${layout}`} href={href(`/${kind}/${e.id}`)}>
      <div className="card-cover">
        {e.$.preview ? <img src={e.$.preview} alt="" loading="lazy" decoding="async" /> : <span className="card-cover-ph">{KIND_NAME[kind]}</span>}
        <span className="card-order mono">{String(e.order).padStart(3, "0")}</span>
      </div>
      <div className="card-body">
        <h3>{e.title}</h3>
        {meta.subtitle ? <p className="card-sub">{meta.subtitle}</p> : null}
        <p className="card-summary">{e.summary}</p>
        <div className="card-chips">{meta.chips.slice(0, 4).map(c => <span key={c} className="tag">{c}</span>)}</div>
      </div>
      <div className="card-actions">
        <FavButton kind={kind} id={e.id} compact />
        {kind === "cases" ? <CompareButton id={e.id} compact /> : null}
      </div>
    </a>
  );
}

/** 详情页正文中的章节目录：横向滚动；页面上下滚动时当前章节高亮，并在条内滚到可见位置（只滚动这一条，不动页面）。 */
export function SectionNav({ sections, active }: { sections: { id: string; title: string }[]; active?: string }) {
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = nav.current, link = el?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!el || !link) return;
    const left = link.offsetLeft - (el.clientWidth - link.offsetWidth) / 2;
    el.scrollLeft = Math.max(0, left);
  }, [active]);
  if (sections.length < 2) return null;
  return (
    <nav ref={nav} className="section-nav" aria-label="章节">
      {sections.map(s => (
        <a key={s.id} data-id={s.id} href={`#sec-${s.id}`} aria-current={s.id === active ? "location" : undefined}
          onClick={ev => { ev.preventDefault(); allowScroll(2000); document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{s.title}</a>
      ))}
    </nav>
  );
}
