import { useState } from "react";
import { Heart, Play, Plus, Check, ImageOff } from "lucide-react";
import type { AtlasEntry, EntryKind } from "../types";
import { useAtlas } from "../lib/atlas-context";
import { useFavorites } from "../lib/favorites";
import { useCompare } from "../lib/compare";
import { atlasUrl, entryHref, formatDuration, formatNumber, padNumber } from "../lib/format";
import { labelFor } from "../lib/filters";
import { Link } from "../lib/router";

function coverDescriptor(entry: AtlasEntry, kind: EntryKind, labels: Record<string, unknown>) {
  if (kind === "cases") {
    return labelFor(labels, "cases", entry.style ? "style" : "category", (entry.style ?? entry.category ?? "") || "");
  }
  if (kind === "patterns") {
    if (entry.category) return entry.category;
    const types = entry.types ?? entry.experienceTypes ?? [];
    if (types[0]) return labelFor(labels, "patterns", entry.types ? "types" : "experienceTypes", types[0]);
    return "巧思";
  }
  return entry.type ? labelFor(labels, "materials", "type", entry.type) : "素材";
}

function secondaryDescriptor(entry: AtlasEntry, kind: EntryKind, labels: Record<string, unknown>) {
  if (kind === "cases") {
    if (entry.country) return entry.country;
    if (entry.style) return labelFor(labels, "cases", "style", entry.style);
    return "";
  }
  if (kind === "patterns") {
    const sourceCount = new Set((entry.sources ?? []).map((source) => source.caseId).filter(Boolean)).size;
    return sourceCount ? `${sourceCount} 个来源案例` : "";
  }
  if (entry.category) return entry.category;
  const licenseName = entry.license && typeof entry.license === "object" ? (entry.license as Record<string, string>).name : "";
  return licenseName ?? "";
}

export function CoverImage({
  src,
  alt,
  className,
  fallbackLabel
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`coverFallback ${className ?? ""}`} aria-label={alt} role="img">
        <ImageOff size={22} strokeWidth={1.5} aria-hidden="true" />
        <span>{fallbackLabel ?? alt}</span>
      </div>
    );
  }
  return <img className={className} src={atlasUrl(src)} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

export function FavoriteButton({ kind, id, label = true }: { kind: EntryKind; id: string; label?: boolean }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(kind, id);
  return (
    <button
      type="button"
      className={`favoriteButton ${active ? "is-active" : ""} ${label ? "has-label" : ""}`}
      aria-pressed={active}
      title={active ? "取消收藏" : "加入收藏"}
      onClick={() => toggle(kind, id)}
    >
      <Heart size={16} strokeWidth={1.8} fill={active ? "currentColor" : "none"} aria-hidden="true" />
      {label && <span>{active ? "已收藏" : "收藏"}</span>}
    </button>
  );
}

export function CompareButton({ id, compact = false }: { id: string; compact?: boolean }) {
  const { toggle, includes, ids } = useCompare();
  const active = includes(id);
  const blocked = !active && ids.length >= 3;
  function onClick() {
    if (blocked) return;
    toggle(id);
  }
  return (
    <button
      type="button"
      className={`compareButton ${active ? "is-active" : ""} ${compact ? "is-compact" : ""}`}
      aria-pressed={active}
      aria-disabled={blocked || undefined}
      title={blocked ? "最多选择 3 个案例" : active ? "从比较中移除" : "加入比较"}
      onClick={onClick}
    >
      {active ? <Check size={14} strokeWidth={2} aria-hidden="true" /> : <Plus size={14} strokeWidth={2} aria-hidden="true" />}
      <span>{active ? "已选对比" : "对比"}</span>
    </button>
  );
}

export function EntryCard({ entry, kind, variant = "grid" }: { entry: AtlasEntry; kind: EntryKind; variant?: "grid" | "compact" }) {
  const { meta, site } = useAtlas();
  const { labels } = meta;
  const descriptor = coverDescriptor(entry, kind, labels);
  const secondary = secondaryDescriptor(entry, kind, labels);
  const cover = entry.cover ?? (kind === "cases" ? entry.preview : undefined);
  const tagLine = (entry.tags ?? []).slice(0, 2).join(" · ");
  const duration = kind === "cases" && entry.rhythm?.duration ? formatDuration(entry.rhythm.duration) : "";
  const isMotionCover = site.library === "motion";

  return (
    <article className={`entryCard ${variant === "compact" ? "is-compact" : ""} entryKind-${kind}`}>
      <div className={`entryCover ${isMotionCover ? "is-motion" : ""}`}>
        <Link to={entryHref(kind, entry.id)} className="entryCoverLink" aria-label={entry.title}>
          <CoverImage src={cover} alt={`${entry.title} 封面`} fallbackLabel={entry.title} />
          <span className="entryCoverShade" aria-hidden="true" />
        </Link>
        <span className="entryOrder" aria-hidden="true">
          {padNumber(entry.order)}
        </span>
        <div className="entryCoverActions">
          <FavoriteButton kind={kind} id={entry.id} label={false} />
        </div>
        {isMotionCover && (
          <span className="motionPlayMark" aria-hidden="true">
            <Play size={15} strokeWidth={1.5} fill="currentColor" />
          </span>
        )}
        {duration && <span className="durationBadge">{duration}</span>}
      </div>
      <div className="entryBody">
        <div className="entryTopline">
          <span>{descriptor}</span>
          <span>{secondary}</span>
        </div>
        <h3 className="entryTitle">
          <Link to={entryHref(kind, entry.id)}>{entry.title}</Link>
        </h3>
        <p className="entrySummary">{entry.summary}</p>
        <div className="entryFoot">
          <span className="entryTags">{tagLine}</span>
          {kind === "cases" && (
            <CompareButton compact id={entry.id} />
          )}
        </div>
      </div>
    </article>
  );
}

export function EntryRow({ entry, kind }: { entry: AtlasEntry; kind: EntryKind }) {
  const { meta } = useAtlas();
  const descriptor = coverDescriptor(entry, kind, meta.labels);
  return (
    <Link to={entryHref(kind, entry.id)} className="entryRow">
      <span className="entryRowIndex">{padNumber(entry.order)}</span>
      <span className="entryRowMain">
        <strong>{entry.title}</strong>
        <small>{entry.summary}</small>
      </span>
      <span className="entryRowMeta">{descriptor}</span>
      <span className="entryRowArrow" aria-hidden="true">↗</span>
    </Link>
  );
}

export function CountWord({ value, unit }: { value: number; unit: string }) {
  return (
    <span className="countWord">
      <strong>{formatNumber(value)}</strong>
      <span>{unit}</span>
    </span>
  );
}