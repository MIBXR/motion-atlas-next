import { useLayoutEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "@/registry/foundation.css";
import "./styles.css";
import { setLegacyHashMap, useRoute } from "../core/router";
import { initFavorites } from "../core/store";
import { installScrollGuard, restoreOrTop } from "../core/scroll-guard";
import { KINDS, type AtlasConfig, type Kind } from "../core/types";
import { AtlasContext } from "./context";
import { Shell } from "./Shell";
import { HomePage } from "./HomePage";
import { ListPage } from "./ListPage";
import { DetailPage } from "./DetailPage";
import { DocsPage } from "./DocsPage";
import { ComparePage } from "./ComparePage";
import { FavoritesPage } from "./FavoritesPage";
import { LabPage } from "../lab/LabPage";
import { AgentPage } from "../agent/AgentPage";

function Router() {
  const route = useRoute();
  const [first, second] = route.segs;
  // 每次进入新页面回到顶部；同一页内只改参数（筛选、搜索）时保持位置。
  const pageKey = route.segs.join("/");
  useLayoutEffect(() => { restoreOrTop(); }, [pageKey]);

  if (first && (KINDS as string[]).includes(first)) {
    return second ? <DetailPage key={second} kind={first as Kind} id={second} /> : <ListPage key={first} kind={first as Kind} />;
  }
  if (first === "docs") return <DocsPage />;
  if (first === "compare") return <ComparePage />;
  if (first === "favorites") return <FavoritesPage />;
  if (first === "tools" && second === "rhythm-lab") return <LabPage />;
  if (first === "tools" && second === "workflow") return <AgentPage />;
  return <HomePage />;
}

export function mountAtlas(config: AtlasConfig) {
  document.documentElement.dataset.lib = "motion";
  document.documentElement.lang = "zh-CN";
  initFavorites(config.favorites, Object.fromEntries(KINDS.map(k => [k, config.data[k].map(e => e.id)])) as Record<Kind, string[]>);
  if (config.legacyHash) setLegacyHashMap(config.legacyHash);
  installScrollGuard();
  function Root() {
    const value = useMemo(() => config, []);
    return <AtlasContext.Provider value={value}><Shell><Router /></Shell></AtlasContext.Provider>;
  }
  createRoot(document.getElementById("root")!).render(<Root />);
}
