import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { AtlasEntry, GalleryItem } from "../types";
import { labelFor } from "../lib/filters";
import { atlasUrl } from "../lib/format";
import { useAtlas } from "../lib/atlas-context";
import { CoverImage } from "./EntryCard";
import { Button } from "@/components/button/button";

function ratioValue(value?: string) {
  if (!value) return "4 / 3";
  const [width, height] = value.split("/").map((part) => Number(part.trim()));
  if (!width || !height) return "4 / 3";
  return `${width} / ${height}`;
}

export function Gallery({ entry }: { entry: AtlasEntry }) {
  const { meta } = useAtlas();
  const [kind, setKind] = useState("all");
  const [limit, setLimit] = useState(18);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = entry.gallery ?? [];
  const kinds = useMemo(() => [...new Set(items.map((item) => item.kind).filter(Boolean))] as string[], [items]);
  const filtered = useMemo(() => (kind === "all" ? items : items.filter((item) => item.kind === kind)), [items, kind]);
  const shown = filtered.slice(0, limit);
  const current = activeIndex === null ? null : filtered[activeIndex] ?? null;

  useEffect(() => {
    setLimit(18);
    setActiveIndex(null);
  }, [kind]);

  useEffect(() => {
    if (!current) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index === null ? null : (index - 1 + filtered.length) % filtered.length));
      if (event.key === "ArrowRight") setActiveIndex((index) => (index === null ? null : (index + 1) % filtered.length));
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [current, filtered.length]);

  if (!items.length) return null;

  const fit = entry.galleryFit === "contain" ? "contain" : "cover";
  const aspect = ratioValue(entry.galleryRatio);

  return (
    <section className="gallerySection" aria-labelledby="gallery-heading">
      <header className="galleryHeader">
        <div>
          <span className="monoLabel">GALLERY / {items.length}</span>
          <h2 id="gallery-heading">作品画廊</h2>
        </div>
        {kinds.length > 1 && (
          <div className="galleryFilters" role="group" aria-label="画廊分类">
            <button type="button" className={kind === "all" ? "is-active" : ""} onClick={() => setKind("all")}>
              全部 <span>{items.length}</span>
            </button>
            {kinds.map((itemKind) => {
              const count = items.filter((item) => item.kind === itemKind).length;
              return (
                <button type="button" className={kind === itemKind ? "is-active" : ""} key={itemKind} onClick={() => setKind(itemKind)}>
                  {labelFor(meta.labels, "materials", "gallery[].kind", itemKind)} <span>{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      <div className="galleryGrid">
        {shown.map((item, index) => (
          <figure className="galleryItem" key={`${item.path}-${index}`}>
            <button type="button" className="galleryButton" onClick={() => setActiveIndex(filtered.indexOf(item))} aria-label={`查看 ${item.caption ?? "作品"}`}>
              <span className="galleryMedia" style={{ aspectRatio: aspect }}>
                <CoverImage
                  src={item.path}
                  alt={item.caption ?? "作品图片"}
                  fallbackLabel={item.caption ?? "作品图片"}
                  className={fit}
                />
              </span>
              <span className="galleryCaption">
                <span>{item.caption ?? "未命名作品"}</span>
                {item.kind && <small>{labelFor(meta.labels, "materials", "gallery[].kind", item.kind)}</small>}
              </span>
            </button>
            {item.replicaPage && (
              <a className="gallerySource" href={atlasUrl(item.replicaPage)} target="_blank" rel="noreferrer noopener">
                复刻页 ↗
              </a>
            )}
            {item.sourceUrl && (
              <a className="gallerySource" href={item.sourceUrl} target="_blank" rel="noreferrer noopener">
                来源 <ExternalLink size={11} strokeWidth={1.8} aria-hidden="true" />
              </a>
            )}
          </figure>
        ))}
      </div>
      {limit < filtered.length && (
        <div className="galleryMore">
          <Button variant="secondary" size="sm" onClick={() => setLimit((value) => value + 18)}>继续加载画廊</Button>
          <span>{Math.min(limit, filtered.length)} / {filtered.length}</span>
        </div>
      )}

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="作品大图">
          <button type="button" className="lightboxBackdrop" onClick={() => setActiveIndex(null)} aria-label="关闭大图" />
          <div className="lightboxPanel">
            <div className="lightboxTop">
              <span className="monoLabel">
                {activeIndex !== null ? String(activeIndex + 1).padStart(2, "0") : "--"} / {filtered.length}
              </span>
              <button type="button" className="lightboxClose" onClick={() => setActiveIndex(null)} aria-label="关闭大图">
                <X size={20} strokeWidth={1.7} />
              </button>
            </div>
            <div className="lightboxMedia" style={{ aspectRatio: aspect }}>
              <CoverImage src={current.path} alt={current.caption ?? "作品图片"} fallbackLabel={current.caption ?? "作品图片"} className={fit} />
            </div>
            <div className="lightboxFoot">
              <div>
                <h3>{current.caption ?? "未命名作品"}</h3>
                <p>
                  {current.kind ? labelFor(meta.labels, "materials", "gallery[].kind", current.kind) : ""}
                  {current.width && current.height ? ` · ${current.width} × ${current.height}` : ""}
                </p>
                {current.license && <small>{current.license}</small>}
              </div>
              <div className="lightboxActions">
                {current.replicaPage && (
                  <a href={atlasUrl(current.replicaPage)} target="_blank" rel="noreferrer noopener" className="lightboxSource">
                    复刻页 ↗
                  </a>
                )}
                {current.sourceUrl && (
                  <a href={current.sourceUrl} target="_blank" rel="noreferrer noopener" className="lightboxSource">
                    原始来源 <ExternalLink size={12} aria-hidden="true" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveIndex((index) => (index === null ? null : (index - 1 + filtered.length) % filtered.length))}
                  aria-label="上一件"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((index) => (index === null ? null : (index + 1) % filtered.length))}
                  aria-label="下一件"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}