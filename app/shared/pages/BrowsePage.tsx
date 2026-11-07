import { useState } from "react";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Filter, Heart, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import SegmentedControl from "@/components/segmented-control/segmented-control";
import { SearchField } from "@/components/search-field/search-field";
import { Button } from "@/components/button/button";
import { useAtlas } from "../lib/atlas-context";
import { useRouter } from "../lib/router";
import { useFavorites } from "../lib/favorites";
import type { AtlasEntry, EntryKind } from "../types";
import { KIND_LABEL, formatNumber } from "../lib/format";
import {
  activeFiltersFromParams,
  buildFilterSpecs,
  countActiveFilters,
  filterEntries,
  searchEntries,
  sortEntries
} from "../lib/filters";
import { EntryCard } from "../components/EntryCard";
import { CopyPageLink, EmptyState, PageHeader } from "../components/PageBits";

const TYPE_ORDER: EntryKind[] = ["cases", "patterns", "materials"];

export function BrowsePage() {
  const { site, meta } = useAtlas();
  const { params, navigate } = useRouter();
  const { favorites, total: favoriteTotal } = useFavorites();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const kindParam = params.get("type") ?? "cases";
  const kind: EntryKind = TYPE_ORDER.includes(kindParam as EntryKind) ? (kindParam as EntryKind) : "cases";
  const entries = meta.entries[kind];
  const specs = buildFilterSpecs(site.library, kind, entries, meta.entries.cases, meta.labels);
  const filters = activeFiltersFromParams(specs, params);
  const query = params.get("q") ?? "";
  const favoriteOnly = params.get("fav") === "1";
  const sort = params.get("sort") === "title" ? "title" : "order";
  const direction = params.get("dir") === "desc" ? "desc" : "asc";
  const activeFilterCount = countActiveFilters(filters);

  function updateParams(mutator: (next: URLSearchParams) => void, replace = false) {
    const next = new URLSearchParams(params.toString());
    mutator(next);
    navigate(`/browse?${next.toString()}`, { replace, preserveScroll: true });
  }

  function switchKind(nextKind: EntryKind) {
    const next = new URLSearchParams({ type: nextKind });
    if (query) next.set("q", query);
    navigate(`/browse?${next.toString()}`);
  }

  function toggleFilter(key: string, value: string) {
    updateParams((next) => {
      const current = next.getAll(key);
      next.delete(key);
      const values = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      for (const item of values) next.append(key, item);
    });
  }

  function clearFilters() {
    updateParams((next) => {
      for (const spec of specs) next.delete(spec.key);
      next.delete("fav");
    });
  }

  function setSort(nextSort: "order" | "title") {
    updateParams((next) => {
      if (nextSort === "order") next.delete("sort");
      else next.set("sort", nextSort);
    });
  }

  function setDirection(nextDirection: "asc" | "desc") {
    updateParams((next) => {
      if (nextDirection === "asc") next.delete("dir");
      else next.set("dir", nextDirection);
    });
  }

  let filtered: AtlasEntry[] = filterEntries(entries, specs, filters);
  if (favoriteOnly) filtered = filtered.filter((entry) => favorites[kind].includes(entry.id));
  filtered = searchEntries(filtered, query);
  filtered = sortEntries(filtered, sort, direction);

  const resultLabel = KIND_LABEL[kind];
  const title = kind === "cases" ? "案例索引" : kind === "patterns" ? "巧思索引" : "素材索引";
  const lead = site.browseLead;

  return (
    <div className="browsePage">
      <PageHeader
        kicker={`INDEX / ${site.brand} / ${resultLabel.toUpperCase()}`}
        title={title}
        lead={lead}
        topRight={site.snapshot}
        aside={
          <div className="browseCountAside">
            <span className="countDisplay">{String(meta.counts[kind]).padStart(4, "0")}</span>
            <span className="countCaption">条{resultLabel}</span>
            <p>当前显示 <strong>{formatNumber(filtered.length)}</strong> 条</p>
          </div>
        }
      />

      <div className="browseTabsRow">
        <SegmentedControl
          label="内容类型"
          value={kind}
          onValueChange={(value) => switchKind(value as EntryKind)}
          options={TYPE_ORDER.map((value) => ({
            value,
            label: KIND_LABEL[value],
            accessory: <span className="segmentCount">{formatNumber(meta.counts[value])}</span>
          }))}
        />
        <div className="browseTabTools">
          <Button
            variant={favoriteOnly ? "primary" : "secondary"}
            size="sm"
            onClick={() =>
              updateParams((next) => {
                if (favoriteOnly) next.delete("fav");
                else next.set("fav", "1");
              })
            }
          >
            <Heart size={15} strokeWidth={1.8} fill={favoriteOnly ? "currentColor" : "none"} aria-hidden="true" />
            只看收藏{favoriteTotal ? ` · ${favoriteTotal}` : ""}
          </Button>
          <button
            type="button"
            className={`mobileFilterButton ${filtersOpen ? "is-active" : ""}`}
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="browse-filters"
          >
            <SlidersHorizontal size={15} strokeWidth={1.8} aria-hidden="true" />
            筛选{activeFilterCount ? ` · ${activeFilterCount}` : ""}
          </button>
        </div>
      </div>

      <div className="browseToolbar">
        <div className="browseSearch">
          <SearchField
            label="在当前类型中搜索"
            value={query}
            onValueChange={(value) =>
              updateParams((next) => {
                if (value) next.set("q", value);
                else next.delete("q");
              }, true)
            }
            placeholder="标题、摘要、标签或拆解内容"
            autoComplete="off"
          />
        </div>
        <div className="sortControls">
          <span className="sortLabel">排序</span>
          <SegmentedControl
            label="排序字段"
            options={[
              { value: "order", label: "编号" },
              { value: "title", label: "名称" }
            ]}
            value={sort}
            onValueChange={(value) => setSort(value as "order" | "title")}
          />
          <button
            type="button"
            className="sortDirection"
            onClick={() => setDirection(direction === "asc" ? "desc" : "asc")}
            title={direction === "asc" ? "当前正序，点击改为倒序" : "当前倒序，点击改为正序"}
          >
            {direction === "asc" ? <ArrowUpNarrowWide size={16} strokeWidth={1.8} /> : <ArrowDownNarrowWide size={16} strokeWidth={1.8} />}
            <span>{direction === "asc" ? "正序" : "倒序"}</span>
          </button>
        </div>
      </div>

      <div className="browseLayout">
        <aside className={`filterRail ${filtersOpen ? "is-mobile-open" : ""}`} id="browse-filters" aria-label="筛选条件">
          <div className="filterRailHead">
            <div>
              <span className="monoLabel">FILTERS</span>
              <h2>筛选</h2>
            </div>
            <button
              type="button"
              className="filterReset"
              onClick={clearFilters}
              disabled={!activeFilterCount && !favoriteOnly}
            >
              <RotateCcw size={13} strokeWidth={1.7} aria-hidden="true" />
              清除
            </button>
          </div>

          {favoriteOnly && (
            <div className="activeFilterSummary">
              <span className="activeSummaryLabel">收藏</span>
              <button
                type="button"
                className="activeFilterChip"
                onClick={() => updateParams((next) => next.delete("fav"))}
              >
                只看收藏 <X size={12} aria-hidden="true" />
              </button>
            </div>
          )}

          {specs.map((spec) => {
            const selected = filters[spec.key] ?? [];
            return (
              <section className="filterGroup" key={spec.key}>
                <div className="filterGroupHead">
                  <h3>{spec.label}</h3>
                  {selected.length > 0 && <span>{selected.length}</span>}
                </div>
                <div className={`filterOptions ${spec.options.length > 12 ? "is-scrollable" : ""}`}>
                  {spec.options.map((option) => {
                    const active = selected.includes(option.value);
                    return (
                      <button
                        type="button"
                        className={`filterOption ${active ? "is-active" : ""}`}
                        key={option.value}
                        aria-pressed={active}
                        disabled={option.count === 0 && !active}
                        onClick={() => toggleFilter(spec.key, option.value)}
                      >
                        <span className="filterCheck" aria-hidden="true">{active ? "✓" : ""}</span>
                        <span className="filterOptionLabel">{option.label}</span>
                        <span className="filterOptionCount">{option.count}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {activeFilterCount > 0 && (
            <button type="button" className="filterClearAll" onClick={clearFilters}>
              <Filter size={14} strokeWidth={1.7} aria-hidden="true" />
              清除全部筛选
            </button>
          )}
          <button
            type="button"
            className="filterCloseMobile"
            onClick={() => setFiltersOpen(false)}
          >
            收起筛选
          </button>
        </aside>

        <section className="resultsColumn" aria-live="polite">
          <div className="resultsHeader">
            <div className="resultsSummary">
              <span className="resultCount">{formatNumber(filtered.length)}</span>
              <span>条{resultLabel}</span>
              {query && <span className="resultQuery">/ “{query}”</span>}
              {(activeFilterCount > 0 || favoriteOnly) && (
                <span className="resultFilterTag">{activeFilterCount + (favoriteOnly ? 1 : 0)} 项筛选</span>
              )}
            </div>
            <div className="resultsTools">
              <CopyPageLink label="复制筛选链接" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="没有匹配的条目"
              description="尝试减少筛选条件、改用更短的关键词，或清除筛选。"
              action={<Button variant="secondary" size="sm" onClick={clearFilters}>清除筛选</Button>}
            />
          ) : (
            <div className="entryGrid">
              {filtered.map((entry) => (
                <EntryCard entry={entry} kind={kind} key={entry.id} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}