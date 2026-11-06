import { useRef, useState } from "react";
import { EmptyState } from "@/registry/components/empty-state/empty-state";
import { Download, Upload } from "./icons";
import { exportFavorites, importFavorites, useFavorites } from "../core/store";
import { KINDS, KIND_NAME } from "../core/types";
import { EntryCard } from "./blocks";
import { byId, useAtlas } from "./context";

export function FavoritesPage() {
  const { data } = useAtlas();
  const fav = useFavorites();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const total = KINDS.reduce((n, k) => n + fav[k].length, 0);

  async function onFile(f: File) {
    try {
      const added = importFavorites(await f.text());
      setMsg({ ok: true, text: `已导入，新增 ${added} 项。` });
    } catch (err) {
      setMsg({ ok: false, text: `导入失败：${(err as Error).message}` });
    }
  }

  return (
    <div className="page favorites-page">
      <header className="page-head">
        <div><h1>收藏 <span className="muted">{total}</span></h1></div>
        <div className="head-actions">
          <button className="pill-button" onClick={exportFavorites} disabled={!total}><Download /><span>导出收藏配置</span></button>
          <button className="pill-button" onClick={() => file.current?.click()}><Upload /><span>导入收藏配置</span></button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={ev => { const f = ev.target.files?.[0]; if (f) onFile(f); ev.target.value = ""; }} />
        </div>
      </header>
      {msg ? <p className={msg.ok ? "notice" : "notice notice-error"} role="status">{msg.text}</p> : null}
      {!total ? <EmptyState title="还没有收藏" description="在卡片或详情页点星标收藏案例、巧思和素材；收藏保存在本浏览器，可导出备份。" /> : null}
      {KINDS.filter(k => fav[k].length).map(k => (
        <section key={k} className="home-block">
          <header className="block-head"><h2>{KIND_NAME[k]} <span className="muted">{fav[k].length}</span></h2><a className="text-button" href={`#/${k}?fav=1`}>在列表中筛选</a></header>
          <div className="card-grid">{fav[k].map(id => byId(data[k], id)).filter(Boolean).map(e => <EntryCard key={e!.id} kind={k} e={e!} layout="grid" />)}</div>
        </section>
      ))}
    </div>
  );
}
