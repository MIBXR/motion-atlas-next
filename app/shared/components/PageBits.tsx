import type { ReactNode } from "react";
import { ArrowUpRight, Download, ExternalLink as ExternalLinkGlyph, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/button/button";
import { CopyButton } from "@/components/copy-button/copy-button";
import { useAtlas } from "../lib/atlas-context";
import { Link } from "../lib/router";
import { atlasUrl, formatNumber } from "../lib/format";
import type { EntryKind } from "../types";

export function PageHeader({
  kicker,
  title,
  lead,
  aside,
  topRight
}: {
  kicker: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  topRight?: ReactNode;
}) {
  return (
    <header className="pageHeader">
      <div className="pageTopline">
        <span className="monoLabel">{kicker}</span>
        <span className="toplineRule" />
        <span className="pageTopRight">{topRight}</span>
      </div>
      <div className="pageHeaderGrid">
        <div>
          <h1>{title}</h1>
          {lead && <p className="pageLead">{lead}</p>}
        </div>
        {aside && <div className="pageHeaderAside">{aside}</div>}
      </div>
    </header>
  );
}

export function SectionTitle({
  index,
  title,
  aside,
  className = ""
}: {
  index?: string;
  title: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`sectionTitle ${className}`}>
      <div className="sectionTitleMain">
        {index && <span className="sectionIndex">{index}</span>}
        <h2>{title}</h2>
      </div>
      {aside && <div className="sectionTitleAside">{aside}</div>}
    </div>
  );
}

export function Breadcrumbs({ kind, current }: { kind?: EntryKind; current?: string }) {
  const { site } = useAtlas();
  return (
    <nav className="breadcrumbs" aria-label="面包屑">
      <Link to="/">总览</Link>
      <span aria-hidden="true">/</span>
      <Link to={`/browse?type=${kind ?? "cases"}`}>全部{kind === "patterns" ? "巧思" : kind === "materials" ? "素材" : "案例"}</Link>
      {current && (
        <>
          <span aria-hidden="true">/</span>
          <span className="currentCrumb">{current}</span>
        </>
      )}
      <span className="crumbVolume">{site.brand} · {site.volume}</span>
    </nav>
  );
}

export function DetailHero({
  kind,
  title,
  subtitle,
  summary,
  tags,
  facts,
  actions,
  metaNote
}: {
  kind: EntryKind;
  title: string;
  subtitle?: string;
  summary: string;
  tags?: string[];
  facts: { label: string; value: ReactNode }[];
  actions?: ReactNode;
  metaNote?: ReactNode;
}) {
  return (
    <header className="detailHero">
      <div className="detailHeroMain">
        <p className="detailKicker">
          <span className="kickerSlash">/</span>
          {kind === "cases" ? "完整案例" : kind === "patterns" ? "设计巧思" : "参考素材"}
        </p>
        <h1>{title}</h1>
        {subtitle && <p className="detailSubtitle">{subtitle}</p>}
        <p className="detailSummary">{summary}</p>
        {tags && tags.length > 0 && (
          <div className="tagRow" aria-label="标签">
            {tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}
        {actions && <div className="detailActions">{actions}</div>}
      </div>
      <aside className="detailFacts" aria-label="条目信息">
        <dl>
          {facts
            .filter((fact) => fact.value !== undefined && fact.value !== null && fact.value !== "")
            .map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
        </dl>
        {metaNote && <div className="detailMetaNote">{metaNote}</div>}
      </aside>
    </header>
  );
}

export function AnalysisSection({
  index,
  title,
  children,
  id,
  className = ""
}: {
  index: string;
  title: string;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section className={`analysisSection ${className}`} id={id}>
      <div className="analysisSectionHead">
        <span className="analysisIndex">{index}</span>
        <h2>{title}</h2>
      </div>
      <div className="analysisBody">{children}</div>
    </section>
  );
}

export function DefinitionGrid({ items }: { items: { label: string; value?: ReactNode }[] }) {
  return (
    <dl className="definitionGrid">
      {items
        .filter((item) => item.value !== undefined && item.value !== null && item.value !== "")
        .map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
    </dl>
  );
}

export function BulletList({ items, className = "" }: { items?: string[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <ul className={`bulletList ${className}`}>
      {items.map((item, index) => (
        <li key={`${item.slice(0, 32)}-${index}`}>
          <span className="bulletMark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Palette({ colors, label = "色板" }: { colors?: string[]; label?: string }) {
  if (!colors?.length) return null;
  return (
    <div className="paletteBlock" aria-label={label}>
      {colors.map((color) => (
        <div className="swatch" key={color}>
          <span className="swatchColor" style={{ background: color }} />
          <code>{color}</code>
        </div>
      ))}
    </div>
  );
}

export function CopyPageLink({ label = "复制页面链接", iconOnly = false }: { label?: string; iconOnly?: boolean }) {
  const url = typeof window === "undefined" ? "" : window.location.href;
  return <CopyButton value={url} label={label} iconOnly={iconOnly} />;
}

export function downloadFile(filename: string, contents: string, type = "application/json;charset=utf-8") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function AgentDownload({ kind, id, label = "下载 Agent 资料包", compact = false }: { kind: EntryKind; id: string; label?: string; compact?: boolean }) {
  const { site } = useAtlas();
  const href = atlasUrl(`agent/${kind}/${id}.json`);
  return (
    <a
      className={`agentDownload ${compact ? "is-compact" : ""}`}
      href={href}
      download={`${site.library}-${id}-agent.json`}
      title="下载原始 JSON 资料包"
    >
      <Download size={15} strokeWidth={1.8} aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}



export function PromptBlock({
  title,
  text,
  tone = "normal",
  eyebrow
}: {
  title: string;
  text?: string;
  tone?: "normal" | "negative";
  eyebrow?: string;
}) {
  if (!text) return null;
  return (
    <section className={`promptBlock ${tone === "negative" ? "is-negative" : ""}`}>
      <header className="promptHeader">
        <div className="promptHeading">
          <span className="promptGlyph" aria-hidden="true">
            {tone === "negative" ? <ShieldAlert size={17} strokeWidth={1.7} /> : <Sparkles size={16} strokeWidth={1.6} />}
          </span>
          <div>
            <span className="monoLabel">{eyebrow ?? (tone === "negative" ? "NEGATIVE" : "PROMPT")}</span>
            <h3>{title}</h3>
          </div>
        </div>
        <CopyButton value={text} label={tone === "negative" ? "复制约束" : "复制 Prompt"} />
      </header>
      <p className="promptText">{text}</p>
    </section>
  );
}

export function DocLink({ path, children }: { path?: string; children: ReactNode }) {
  const { meta } = useAtlas();
  if (!path) return null;
  const doc = meta.docs.find((item) => item.path === path);
  return (
    <Link className="docLink" to={`/docs?path=${encodeURIComponent(path)}`}>
      <span>{children}</span>
      <span className="docLinkTitle">{doc?.title ?? path}</span>
      <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
    </Link>
  );
}

export function ExternalLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <span>{children}</span>;
  return (
    <a className="externalLink" href={href} target="_blank" rel="noreferrer noopener">
      <span>{children}</span>
      <ExternalLinkGlyph size={12} strokeWidth={1.6} aria-hidden="true" />
    </a>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="emptyState">
      <span className="emptyGlyph" aria-hidden="true">∅</span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

export function Pagination({ shown, total, onMore }: { shown: number; total: number; onMore: () => void }) {
  if (shown >= total) return null;
  return (
    <div className="moreRow">
      <span>已显示 {formatNumber(shown)} / {formatNumber(total)}</span>
      <Button variant="secondary" size="sm" onClick={onMore}>再加载一批</Button>
    </div>
  );
}

