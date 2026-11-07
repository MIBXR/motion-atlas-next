import type { ReactNode } from "react";
import { ArrowUpRight, FileText, Link2 } from "lucide-react";
import type { AtlasEntry, EntryKind, SourceRecord } from "../types";
import { useAtlas } from "../lib/atlas-context";
import { Link } from "../lib/router";
import { atlasUrl, formatDate, formatTimecode, isExternalUrl, parseObservation } from "../lib/format";
import { labelFor } from "../lib/filters";
import { BulletList, Palette } from "./PageBits";

export function PathLink({ path, label, className = "" }: { path?: string; label?: string; className?: string }) {
  const { meta } = useAtlas();
  if (!path) return null;
  if (isExternalUrl(path)) {
    return (
      <a className={`pathLink ${className}`} href={path} target="_blank" rel="noreferrer noopener">
        <span>{label ?? path}</span>
        <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" />
      </a>
    );
  }
  const doc = meta.docs.find((item) => item.path === path);
  if (doc) {
    return (
      <Link className={`pathLink ${className}`} to={`/docs?path=${encodeURIComponent(path)}`}>
        <FileText size={13} strokeWidth={1.7} aria-hidden="true" />
        <span>{label ?? doc.title}</span>
        <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a className={`pathLink ${className}`} href={atlasUrl(path)} target="_blank" rel="noreferrer noopener">
      <Link2 size={13} strokeWidth={1.7} aria-hidden="true" />
      <span>{label ?? path}</span>
      <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" />
    </a>
  );
}

export function SourceList({ entry, kind, showObservation = false }: { entry: AtlasEntry; kind: EntryKind; showObservation?: boolean }) {
  const { meta } = useAtlas();
  const sources = entry.sources ?? [];
  if (!sources.length) return null;
  return (
    <div className="sourceList">
      {sources.map((source, index) => {
        const observation = parseObservation(source.observation);
        const sourceCase = source.caseId ? meta.entries.cases.find((item) => item.id === source.caseId) : undefined;
        const title = source.title || source.label || sourceCase?.title || source.caseId || "来源记录";
        const evidenceLabel =
          source.evidence === "observed"
            ? "实访观察"
            : source.evidence === "adapted"
              ? "练习适配"
              : source.evidence === "inferred"
                ? "设计推断"
                : source.evidence === "source"
                  ? "原始来源"
                  : source.evidence
                    ? labelFor(meta.labels, kind, "sources[].evidence", source.evidence)
                    : "";
        return (
          <article className="sourceItem" key={`${title}-${index}`}>
            <div className="sourceIndex">{String(index + 1).padStart(2, "0")}</div>
            <div className="sourceBody">
              <div className="sourceHead">
                <h3>
                  {source.caseId ? (
                    <Link to={`/cases/${encodeURIComponent(source.caseId)}`}>{title}</Link>
                  ) : source.url ? (
                    <a href={source.url} target="_blank" rel="noreferrer noopener">{title}</a>
                  ) : (
                    title
                  )}
                </h3>
                <div className="sourceTags">
                  {source.type && <span>{source.type}</span>}
                  {evidenceLabel && <span>{evidenceLabel}</span>}
                  {source.capturedAt && <span>{formatDate(source.capturedAt)}</span>}
                </div>
              </div>
              {showObservation && observation.text && <p>{observation.text}</p>}
              {source.note && <p>{source.note}</p>}
              {source.locator && <code className="sourceLocator">{source.locator}</code>}
              {source.focus?.instruction && <p className="sourceInstruction">{source.focus.instruction}</p>}
              <div className="sourceLinks">
                {source.referenceUrl && (
                  <a href={source.referenceUrl} target="_blank" rel="noreferrer noopener">原始参考 ↗</a>
                )}
                {source.url && source.caseId && (
                  <a href={source.url} target="_blank" rel="noreferrer noopener">来源地址 ↗</a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function AttributionList({ entry }: { entry: AtlasEntry }) {
  const attribution = entry.attribution ?? [];
  const upstream = entry.upstream;
  const license = entry.license;
  if (!attribution.length && !upstream && !license) return null;
  return (
    <div className="attributionList">
      {upstream && (
        <div className="attributionBlock">
          <span className="monoLabel">UPSTREAM</span>
          <dl>
            {Object.entries(upstream).map(([key, value]) => (
              <div key={key}>
                <dt>{upstreamLabel(key)}</dt>
                <dd>{isExternalUrl(value) ? <a href={value} target="_blank" rel="noreferrer noopener">{value} ↗</a> : value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {license && (
        <div className="attributionBlock">
          <span className="monoLabel">LICENSE</span>
          <dl>
            {Object.entries(license).map(([key, value]) => (
              <div key={key}>
                <dt>{licenseLabel(key)}</dt>
                <dd>
                  {key === "url" && !isExternalUrl(value) ? (
                    <PathLink path={value} label={value} />
                  ) : isExternalUrl(value) ? (
                    <a href={value} target="_blank" rel="noreferrer noopener">{value} ↗</a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {attribution.map((item, index) => (
        <div className="attributionBlock" key={`${item.scope ?? "attribution"}-${index}`}>
          <span className="monoLabel">{item.scope ?? "ATTRIBUTION"}</span>
          <p>{renderTextLinks(item.notes ?? "")}</p>
          {(item.name || item.author) && (
            <p className="attributionByline">
              {[item.name, item.author, item.version, item.license].filter(Boolean).join(" · ")}
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer noopener"> 来源 ↗</a>
              )}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function renderTextLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={index}>{part}</span>;
    const [, label, href] = match;
    if (!label || !href) return <span key={index}>{part}</span>;
    return (
      <a key={index} href={href} target="_blank" rel="noreferrer noopener">{label}</a>
    );
  });
}

function upstreamLabel(key: string) {
  const labels: Record<string, string> = {
    url: "上游地址",
    repository: "仓库",
    commit: "固定提交",
    version: "版本",
    verifiedAt: "核验日期",
    author: "作者",
    title: "作品",
    type: "载体",
    path: "来源路径",
    notes: "说明"
  };
  return labels[key] ?? key;
}

function licenseLabel(key: string) {
  const labels: Record<string, string> = {
    name: "许可名称",
    scope: "适用范围",
    url: "许可原文",
    notes: "补充说明"
  };
  return labels[key] ?? key;
}

export function BeatTable({ entry }: { entry: AtlasEntry }) {
  const beats = entry.rhythm?.beats;
  if (!beats?.length) return null;
  return (
    <div className="beatTable" role="table" aria-label="节拍表">
      <div className="beatTableHead" role="row">
        <span role="columnheader">时刻</span>
        <span role="columnheader">节拍</span>
        <span role="columnheader">内容</span>
      </div>
      {beats.map((beat, index) => (
        <div className="beatTableRow" role="row" key={`${beat.t}-${index}`}>
          <span role="cell" className="beatTime">{formatTimecode(beat.t)}</span>
          <span role="cell" className="beatName">{beat.label}</span>
          <span role="cell" className="beatNote">{beat.note ?? ""}</span>
        </div>
      ))}
    </div>
  );
}

export function ObservationList({ entry }: { entry: AtlasEntry }) {
  const observations = entry.observations ?? [];
  if (!observations.length) return null;
  return (
    <ol className="observationList">
      {observations.map((observation, index) => {
        if (typeof observation === "string") {
          return <li key={`${observation}-${index}`}><span className="observationAt">观察</span><p>{observation}</p></li>;
        }
        return (
          <li key={`${String(observation.at)}-${index}`}>
            <span className="observationAt">
              {typeof observation.at === "number" ? formatTimecode(observation.at) : observation.at ?? "观察"}
            </span>
            <p>{observation.what}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function MigrationList({ entry }: { entry: AtlasEntry }) {
  const migration = entry.migration;
  if (!migration) return null;
  if (Array.isArray(migration)) {
    if (!migration.length) return null;
    return (
      <div className="migrationList">
        {migration.map((item, index) => (
          <div className="migrationItem" key={`${item.field}-${index}`}>
            <span className="migrationIndex">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <code>{item.field}</code>
              <p>{item.how}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="migrationList">
      {migration.entrypoint && (
        <div className="migrationItem">
          <span className="migrationIndex">01</span>
          <div><span className="monoLabel">ENTRYPOINT</span><code>{migration.entrypoint}</code></div>
        </div>
      )}
      {migration.files?.length && (
        <div className="migrationItem">
          <span className="migrationIndex">02</span>
          <div>
            <span className="monoLabel">FILES</span>
            {migration.files.map((file) => <code key={file}>{file}</code>)}
          </div>
        </div>
      )}
      {migration.editGuide && (
        <div className="migrationItem">
          <span className="migrationIndex">03</span>
          <div><span className="monoLabel">GUIDE</span><p>{migration.editGuide}</p></div>
        </div>
      )}
    </div>
  );
}

export function InlineTextLinks({ text }: { text?: string }) {
  if (!text) return null;
  return <p>{renderTextLinks(text)}</p>;
}

export function LinkChips({ items, empty }: { items?: { to: string; label: string; sub?: string }[]; empty?: ReactNode }) {
  if (!items?.length) return <>{empty ?? null}</>;
  return (
    <div className="linkChips">
      {items.map((item) => (
        <Link to={item.to} className="linkChip" key={item.to}>
          <span>{item.label}</span>
          {item.sub && <small>{item.sub}</small>}
        </Link>
      ))}
    </div>
  );
}

export function TokenSection({ entry }: { entry: AtlasEntry }) {
  const { site } = useAtlas();
  const tokens = entry.tokens ?? {};
  const palette = Array.isArray(tokens.palette) ? (tokens.palette as string[]) : [];
  const motionTokens = Array.isArray(tokens.motion) ? (tokens.motion as { name?: string; value?: string }[]) : [];
  const cssTokens = tokens.css && typeof tokens.css === "object" ? (tokens.css as Record<string, string>) : null;
  return (
    <div className="tokenSection">
      {(entry.accent || entry.background) && (
        <div className="colorRoles">
          {entry.accent && (
            <div className="colorRole">
              <span style={{ background: entry.accent }} />
              <div><small>强调色</small><code>{entry.accent}</code></div>
            </div>
          )}
          {entry.background && (
            <div className="colorRole">
              <span style={{ background: entry.background }} />
              <div><small>背景色</small><code>{entry.background}</code></div>
            </div>
          )}
        </div>
      )}
      {palette.length > 0 && <Palette colors={palette} />}
      <div className="tokenReadable">
        {typeof tokens.type === "string" && (
          <div className="tokenLine"><span>字体与排版</span><p>{tokens.type}</p></div>
        )}
        {typeof tokens.layout === "string" && site.library === "web" && (
          <div className="tokenLine"><span>布局参数</span><p>{tokens.layout}</p></div>
        )}
        {typeof tokens.motion === "string" && (
          <div className="tokenLine"><span>动效参数</span><p>{tokens.motion}</p></div>
        )}
        {motionTokens.length > 0 && (
          <div className="tokenMotionList">
            <span className="monoLabel">MOTION TOKENS</span>
            {motionTokens.map((token, index) => (
              <div key={`${token.name}-${index}`}>
                <code>{token.name}</code>
                <p>{token.value}</p>
              </div>
            ))}
          </div>
        )}
        {cssTokens && Object.keys(cssTokens).length > 0 && (
          <div className="tokenCss">
            <span className="monoLabel">CSS TOKENS</span>
            {Object.entries(cssTokens).map(([key, value]) => (
              <div key={key}><code>{key}</code><span>{value}</span></div>
            ))}
          </div>
        )}
        {tokens.accentRoles !== undefined && tokens.accentRoles !== null && (
          <details className="rawTokenDetails">
            <summary>强调色角色</summary>
            <pre>{JSON.stringify(tokens.accentRoles, null, 2)}</pre>
          </details>
        )}
      </div>
    </div>
  );
}

export function ConstraintColumns({ entry }: { entry: AtlasEntry }) {
  const groups = [
    { label: "USE / 适用", items: entry.useCases },
    { label: "AVOID / 避用", items: entry.avoid },
    { label: "CONSTRAINTS / 限制", items: entry.constraints }
  ].filter((group) => Boolean(group.items?.length));
  if (!groups.length) return null;
  return (
    <div className={`constraintGrid cols-${groups.length}`}>
      {groups.map((group) => (
        <div key={group.label}>
          <span className="monoLabel">{group.label}</span>
          <BulletList items={group.items} />
        </div>
      ))}
    </div>
  );
}

export function EnergySegments({ entry }: { entry: AtlasEntry }) {
  if (!entry.energySegments?.length) return null;
  return (
    <div className="energySegmentList">
      <span className="monoLabel">ENERGY SEGMENTS / 分段能量</span>
      <div className="energySegments">
        {entry.energySegments.map((segment, index) => (
          <span key={index} className="energySegment">
            {segment.label ?? "能量段"}
            <small>{formatTimecode(segment.t0 ?? 0)}–{formatTimecode(segment.t1 ?? 0)}</small>
            <em>{formatNumberValue(segment.from)} → {formatNumberValue(segment.to)}</em>
          </span>
        ))}
      </div>
      {entry.energyNote && <p className="energyNoteText">{entry.energyNote}</p>}
    </div>
  );
}

function formatNumberValue(value?: number) {
  return typeof value === "number" && Number.isFinite(value) ? value.toFixed(2) : "—";
}