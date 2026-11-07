import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/button/button";
import { useAtlas } from "../lib/atlas-context";
import { useFavorites } from "../lib/favorites";
import { EntryCard } from "../components/EntryCard";
import { EmptyState, PageHeader, downloadFile } from "../components/PageBits";
import { Link } from "../lib/router";
import type { EntryKind } from "../types";

const KIND_ORDER: { kind: EntryKind; label: string }[] = [
  { kind: "cases", label: "案例" },
  { kind: "patterns", label: "巧思" },
  { kind: "materials", label: "素材" }
];

export function FavoritesPage() {
  const { meta, site } = useAtlas();
  const { favorites, total, exportData, importText } = useFavorites();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  function handleExport() {
    const data = exportData();
    downloadFile(data.filename, data.text);
    setStatus({ tone: "ok", text: `已导出 ${data.filename}` });
  }

  async function handleImport(file: File) {
    try {
      const text = await file.text();
      const added = importText(text);
      setStatus({ tone: "ok", text: `已合并导入，新增 ${added} 条收藏。` });
    } catch (error) {
      setStatus({ tone: "error", text: error instanceof Error ? error.message : "导入失败。" });
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="favoritesPage">
      <PageHeader
        kicker={`COLLECTION / ${site.brand}`}
        title="我的收藏"
        lead="案例、巧思与素材可以放在同一份收藏里。导出的 JSON 能在同一套库的另一个地址导入。"
        topRight={site.snapshot}
        aside={
          <div className="favoritesCount">
            <span className="countDisplay">{String(total).padStart(3, "0")}</span>
            <span className="countCaption">条收藏</span>
            <p>{favorites.cases.length} 案例 · {favorites.patterns.length} 巧思 · {favorites.materials.length} 素材</p>
          </div>
        }
      />

      <div className="favoritesToolbar">
        <div className="favoritesTransfer">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download size={15} strokeWidth={1.8} aria-hidden="true" />
            导出 JSON
          </Button>
          <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
            <Upload size={15} strokeWidth={1.8} aria-hidden="true" />
            导入 JSON
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept=".json,application/json"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleImport(file);
            }}
          />
        </div>
        <p className="favoritesFormat">
          {site.library === "web" ? "格式 web-atlas-favorites.json" : "格式 motion-atlas-favorites.json"} · 本地保存在当前浏览器
        </p>
      </div>
      {status && <p className={`transferStatus is-${status.tone}`} role="status">{status.text}</p>}

      {total === 0 ? (
        <EmptyState
          title="收藏还是空的"
          description="在索引或详情里点爱心，把条目留在这里。"
          action={<Link className="inlineButtonLink" to="/browse?type=cases">去浏览案例</Link>}
        />
      ) : (
        <div className="favoritesGroups">
          {KIND_ORDER.map(({ kind, label }) => {
            const ids = favorites[kind];
            if (!ids.length) return null;
            const entries = meta.entries[kind].filter((entry) => ids.includes(entry.id));
            return (
              <section className="favoriteGroup" key={kind}>
                <div className="favoriteGroupHead">
                  <div>
                    <span className="monoLabel">SAVED / {kind.toUpperCase()}</span>
                    <h2>{label} <span>{entries.length}</span></h2>
                  </div>
                  <Link className="textArrowLink" to={`/browse?type=${kind}&fav=1`}>在索引中继续查看 ↗</Link>
                </div>
                <div className="entryGrid favoriteGrid">
                  {entries.map((entry) => <EntryCard entry={entry} kind={kind} key={entry.id} />)}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}