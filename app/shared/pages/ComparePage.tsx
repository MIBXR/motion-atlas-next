import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Search, Trash2 } from "lucide-react";
import { SearchField } from "@/components/search-field/search-field";
import { Button } from "@/components/button/button";
import { useAtlas } from "../lib/atlas-context";
import { useCompare } from "../lib/compare";
import { useRouter } from "../lib/router";
import type { AtlasEntry } from "../types";
import { formatDuration, formatTimecode, entryHref } from "../lib/format";
import { labelFor } from "../lib/filters";
import { searchEntries } from "../lib/filters";
import { CopyPageLink, EmptyState, PageHeader } from "../components/PageBits";
import { CoverImage } from "../components/EntryCard";
import { Link } from "../lib/router";

interface CompareRow {
  label: string;
  render: (entry: AtlasEntry) => ReactNode;
}

function listValues(values?: string[]) {
  if (!values?.length) return <span className="compareEmpty">—</span>;
  return (
    <ul className="compareList">
      {values.map((value, index) => <li key={`${value.slice(0, 24)}-${index}`}>{value}</li>)}
    </ul>
  );
}

function paletteValues(entry: AtlasEntry) {
  const palette = entry.tokens?.palette;
  if (!Array.isArray(palette) || !palette.length) return <span className="compareEmpty">—</span>;
  return (
    <div className="comparePalette">
      {palette.map((color) => (
        <span key={String(color)}>
          <i style={{ background: String(color) }} aria-hidden="true" />
          <code>{String(color)}</code>
        </span>
      ))}
    </div>
  );
}

function getWebRows(entries: AtlasEntry[], labels: Record<string, unknown>): CompareRow[] {
  const compositionKeys = [...new Set(entries.flatMap((entry) => Object.keys(entry.composition ?? {})))];
  return [
    { label: "摘要", render: (entry) => <p>{entry.summary}</p> },
    { label: "分类与地区", render: (entry) => <p>{entry.category}<br />{entry.country}</p> },
    { label: "设计重点", render: (entry) => <p>{entry.productFocus ?? "—"}</p> },
    { label: "设计机制", render: (entry) => listValues(entry.principles) },
    { label: "交互", render: (entry) => listValues(entry.interaction) },
    ...compositionKeys.map((key) => ({
      label: `构成 · ${labelFor(labels, "cases", "composition", key)}`,
      render: (entry: AtlasEntry) => <p>{entry.composition?.[key] ?? "—"}</p>
    })),
    { label: "主题行为", render: (entry) => <p>{entry.themeBehavior?.mode ? labelFor(labels, "cases", "themeBehavior.mode", entry.themeBehavior.mode) : "—"}<br />{entry.themeBehavior?.control ?? ""}</p> },
    { label: "声音行为", render: (entry) => <p>{entry.soundBehavior?.kind ? labelFor(labels, "cases", "soundBehavior.kind", entry.soundBehavior.kind) : "—"}<br />{entry.soundBehavior?.control ?? ""}</p> },
    { label: "色板", render: paletteValues },
    { label: "字体与排版", render: (entry) => <p>{typeof entry.tokens?.type === "string" ? entry.tokens.type : "—"}</p> },
    { label: "布局", render: (entry) => <p>{typeof entry.tokens?.layout === "string" ? entry.tokens.layout : "—"}</p> },
    { label: "动效", render: (entry) => <p>{typeof entry.tokens?.motion === "string" ? entry.tokens.motion : "—"}</p> },
    { label: "适用场景", render: (entry) => listValues(entry.useCases) },
    { label: "避用", render: (entry) => listValues(entry.avoid) },
    { label: "限制", render: (entry) => listValues(entry.constraints) },
    {
      label: "来源",
      render: (entry) =>
        entry.sources?.length ? (
          <ul className="compareList">
            {entry.sources.map((source, index) => (
              <li key={`${source.title}-${index}`}>
                {source.url ? <a href={source.url} target="_blank" rel="noreferrer noopener">{source.title ?? source.type ?? "来源"} ↗</a> : source.title}
              </li>
            ))}
          </ul>
        ) : <span className="compareEmpty">—</span>
    }
  ];
}

function getMotionRows(entries: AtlasEntry[], labels: Record<string, unknown>): CompareRow[] {
  return [
    { label: "摘要", render: (entry) => <p>{entry.summary}</p> },
    { label: "画面风格", render: (entry) => <p>{entry.style ? labelFor(labels, "cases", "style", entry.style) : "—"}</p> },
    { label: "用途与载体", render: (entry) => <p>{entry.purpose ? labelFor(labels, "cases", "purpose", entry.purpose) : "—"}<br />{(entry.carriers ?? []).map((value) => labelFor(labels, "cases", "carriers", value)).join(" · ")}</p> },
    { label: "技术", render: (entry) => <p>{(entry.tech ?? []).map((value) => labelFor(labels, "cases", "tech", value)).join(" · ") || "—"}</p> },
    { label: "视觉重点", render: (entry) => <p>{entry.focus ?? "—"}</p> },
    { label: "节奏", render: (entry) => <p>时长 {formatDuration(entry.rhythm?.duration ?? 0)}<br />BPM {entry.rhythm?.bpm ?? "—"}<br />{entry.rhythm?.beats.length ?? 0} 个节拍</p> },
    { label: "节拍表", render: (entry) => entry.rhythm?.beats?.length ? <ul className="compareList">{entry.rhythm.beats.map((beat, index) => <li key={`${beat.t}-${index}`}>{formatTimecode(beat.t)} · {beat.label}</li>)}</ul> : <span className="compareEmpty">—</span> },
    { label: "画面分层", render: (entry) => entry.layers?.length ? <ol className="compareList">{entry.layers.map((layer, index) => <li key={`${layer.name}-${index}`}><strong>{layer.name}</strong> — {layer.role}</li>)}</ol> : <span className="compareEmpty">—</span> },
    { label: "构成 · 节奏", render: (entry) => <p>{entry.composition?.rhythm ?? "—"}</p> },
    { label: "构成 · 色彩", render: (entry) => <p>{entry.composition?.color ?? "—"}</p> },
    { label: "构成 · 动效", render: (entry) => <p>{entry.composition?.motion ?? "—"}</p> },
    { label: "构成 · 版面", render: (entry) => <p>{entry.composition?.layout ?? "—"}</p> },
    { label: "构成 · 声音", render: (entry) => <p>{entry.composition?.sound ?? "—"}</p> },
    { label: "色板", render: paletteValues },
    { label: "字体", render: (entry) => <p>{typeof entry.tokens?.type === "string" ? entry.tokens.type : "—"}</p> },
    {
      label: "动效 Token",
      render: (entry) =>
        Array.isArray(entry.tokens?.motion) && entry.tokens.motion.length ? (
          <ul className="compareList">
            {(entry.tokens.motion as { name?: string; value?: string }[]).map((token, index) => (
              <li key={`${token.name}-${index}`}><code>{token.name}</code> {token.value}</li>
            ))}
          </ul>
        ) : <span className="compareEmpty">—</span>
    },
    { label: "适用场景", render: (entry) => listValues(entry.useCases) },
    { label: "避用", render: (entry) => listValues(entry.avoid) },
    { label: "限制", render: (entry) => listValues(entry.constraints) }
  ];
}

export function ComparePage() {
  const { meta, site } = useAtlas();
  const { ids, toggle, clear } = useCompare();
  const { navigate, pathname, query } = useRouter();
  const [pickerOpen, setPickerOpen] = useState(ids.length < 2);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const nextQuery = ids.length ? `?ids=${encodeURIComponent(ids.join(","))}` : "";
    if (query !== nextQuery.slice(1)) {
      navigate(`${pathname}${nextQuery}`, { replace: true, preserveScroll: true });
    }
  }, [ids, navigate, pathname, query]);

  useEffect(() => {
    if (ids.length >= 2) setPickerOpen(false);
    if (ids.length < 2) setPickerOpen(true);
  }, [ids.length]);

  const selected = ids
    .map((id) => meta.entries.cases.find((entry) => entry.id === id))
    .filter((entry): entry is AtlasEntry => Boolean(entry));
  const candidates = searchEntries(meta.entries.cases, search).slice(0, 60);
  const rows = selected.length >= 2
    ? site.library === "web"
      ? getWebRows(selected, meta.labels)
      : getMotionRows(selected, meta.labels)
    : [];

  function add(id: string) {
    const result = toggle(id);
    if (result === "limit") {
      // The picker disables extra selections; this is a quiet fallback for keyboard users.
    }
  }

  return (
    <div className="comparePage">
      <PageHeader
        kicker={`COMPARE / ${site.brand}`}
        title="案例比较"
        lead="选择 2–3 个案例，在同一组拆解维度上并排阅读。比较链接会保留当前选择。"
        topRight={site.snapshot}
        aside={
          <div className="compareHeaderAside">
            <span className="countDisplay">{selected.length} / 3</span>
            <span className="countCaption">已选案例</span>
            <p>同一维度逐行对照</p>
          </div>
        }
      />

      <div className="compareToolbar">
        <div className="compareSelected">
          {selected.length === 0 && <span className="compareToolbarHint">还没有选择案例</span>}
          {selected.map((entry) => (
            <span className="compareSelectedChip" key={entry.id}>
              <span>{entry.title}</span>
              <button type="button" onClick={() => toggle(entry.id)} aria-label={`移除 ${entry.title}`}>×</button>
            </span>
          ))}
        </div>
        <div className="compareToolbarActions">
          <CopyPageLink label="复制比较链接" />
          {selected.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => { clear(); setPickerOpen(true); }}>
              <Trash2 size={14} strokeWidth={1.8} aria-hidden="true" />
              清空
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={() => setPickerOpen((open) => !open)}>
            <Search size={14} strokeWidth={1.8} aria-hidden="true" />
            {pickerOpen ? "收起选择" : "选择案例"}
          </Button>
        </div>
      </div>

      {pickerOpen && (
        <section className="comparePicker" aria-label="选择要比较的案例">
          <div className="comparePickerHead">
            <SearchField label="搜索案例" value={search} onValueChange={setSearch} placeholder="名称、标签或摘要" />
            <span>{ids.length >= 3 ? "最多同时比较 3 个案例" : "选择 2–3 个案例"}</span>
          </div>
          <div className="compareCandidates">
            {candidates.map((entry) => {
              const active = ids.includes(entry.id);
              const blocked = !active && ids.length >= 3;
              return (
                <button
                  type="button"
                  className={`compareCandidate ${active ? "is-active" : ""}`}
                  key={entry.id}
                  onClick={() => add(entry.id)}
                  disabled={blocked}
                  aria-pressed={active}
                >
                  <span className="compareCandidateCover">
                    <CoverImage src={entry.cover} alt="" fallbackLabel={entry.title} />
                  </span>
                  <span>
                    <strong>{entry.title}</strong>
                    <small>{entry.category ?? entry.style} · {entry.country ?? entry.subtitle}</small>
                  </span>
                  <span className="compareCandidateCheck" aria-hidden="true">{active ? "✓" : "+"}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {selected.length < 2 ? (
        <EmptyState
          title={selected.length === 0 ? "先选择一个案例" : "再选一个案例"}
          description="从上面的候选列表加入两到三个案例，表格会自动按同一组维度展开。"
          action={<Link className="inlineButtonLink" to="/browse?type=cases">去案例索引挑选</Link>}
        />
      ) : (
        <div className={`compareTableWrap ${selected.length === 2 ? "twoCols" : ""}`}>
          <table className="compareTable">
            <thead>
              <tr>
                <th scope="col" className="compareDimension">对照维度</th>
                {selected.map((entry) => (
                  <th scope="col" key={entry.id}>
                    <div className="compareCaseHead">
                      <Link to={entryHref("cases", entry.id)} className="compareCaseCover">
                        <CoverImage src={entry.cover} alt="" fallbackLabel={entry.title} />
                      </Link>
                      <div>
                        <span className="monoLabel">{entry.category ?? entry.style}</span>
                        <Link to={entryHref("cases", entry.id)}>{entry.title}</Link>
                        <button type="button" onClick={() => toggle(entry.id)}>移除</button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {selected.map((entry) => <td key={entry.id}>{row.render(entry)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}