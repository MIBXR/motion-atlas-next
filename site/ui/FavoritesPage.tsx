import { Button } from "@/registry/components/button/button";
import { LinkButton } from "@/ui/LinkButton";
import { useRef } from "react";
import { EmptyState } from "@/registry/components/empty-state/empty-state";
import { Download, Upload } from "./icons";
import { exportFavorites, importFavorites, useFavorites } from "../core/store";
import { KINDS, KIND_NAME } from "../core/types";
import { EntryCard } from "./blocks";
import { byId, useAtlas } from "./context";
import { notify } from "./notifications";

export function FavoritesPage() {
  const { data } = useAtlas();
  const fav = useFavorites();
  const file = useRef<HTMLInputElement>(null);
  const total = KINDS.reduce((n, k) => n + fav[k].length, 0);

  async function onFile(f: File) {
    try {
      importFavorites(await f.text());
    } catch (err) {
      notify(`导入失败：${(err as Error).message}`, "error");
    }
  }

  return (
    <div className="page favorites-page">
      <header className="page-head">
        <div><h1>收藏 <span className="muted">{total}</span></h1></div>
        <div className="head-actions">
          <Button variant="secondary" size="sm"  onClick={exportFavorites} disabled={!total}><Download /><span>导出收藏配置</span></Button>
          <Button variant="secondary" size="sm"  onClick={() => file.current?.click()}><Upload /><span>导入收藏配置</span></Button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={ev => { const f = ev.target.files?.[0]; if (f) onFile(f); ev.target.value = ""; }} />
        </div>
      </header>
      {!total ? <EmptyState title="还没有收藏" description="在卡片或详情页点星标收藏案例、巧思和素材；收藏保存在本浏览器，可导出备份。" /> : null}
      {KINDS.filter(k => fav[k].length).map(k => (
        <section key={k} className="home-block">
          <header className="block-head"><h2>{KIND_NAME[k]} <span className="muted">{fav[k].length}</span></h2><LinkButton variant="ghost" size="sm"  href={`#/${k}?fav=1`}>在列表中筛选</LinkButton></header>
          <div className="card-grid">{fav[k].map(id => byId(data[k], id)).filter(Boolean).map(e => <EntryCard key={e!.id} kind={k} e={e!} layout="grid" />)}</div>
        </section>
      ))}
    </div>
  );
}
