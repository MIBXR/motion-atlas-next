import { useEffect } from "react";
import type { Library } from "./types";
import { SITES } from "./site";
import meta from "virtual:atlas-meta";
import { AtlasProvider } from "./lib/atlas-context";
import { ThemeProvider } from "./lib/theme";
import { FavoritesProvider } from "./lib/favorites";
import { CompareProvider } from "./lib/compare";
import { RouterProvider, useRouter } from "./lib/router";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { BrowsePage } from "./pages/BrowsePage";
import { CasePage } from "./pages/CasePage";
import { PatternPage } from "./pages/PatternPage";
import { MaterialPage } from "./pages/MaterialPage";
import { DocsPage } from "./pages/DocsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ComparePage } from "./pages/ComparePage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import type { EntryKind } from "./types";

function useDocumentTitle(library: Library) {
  const { pathname } = useRouter();
  const site = SITES[library];
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      document.title = `${site.brand} · ${site.brandCn}`;
      return;
    }
    const [head, id] = segments;
    const kind: EntryKind | null = head === "cases" ? "cases" : head === "patterns" ? "patterns" : head === "materials" ? "materials" : null;
    if (kind && id) {
      const entry = meta.entries[kind].find((item) => item.id === decodeURIComponent(id));
      if (entry) {
        document.title = `${entry.title} · ${site.brand}`;
        return;
      }
    }
    const labels: Record<string, string> = {
      browse: "全部条目",
      docs: site.docsTitle,
      favorites: "我的收藏",
      compare: "案例比较",
      lab: site.labTitle,
      workflow: site.workflowTitle
    };
    document.title = `${labels[head ?? ""] ?? "工作台"} · ${site.brand}`;
  }, [library, pathname, site]);
}

function DocumentTitleSync({ library }: { library: Library }) {
  useDocumentTitle(library);
  return null;
}

function RouteView({ library }: { library: Library }) {
  const { pathname } = useRouter();
  const segments = pathname.split("/").filter(Boolean);
  const [head, rawId] = segments;
  let id = "";
  if (rawId) {
    try {
      id = decodeURIComponent(rawId);
    } catch {
      id = rawId;
    }
  }

  if (segments.length === 0) return <HomePage />;
  if (head === "browse") return <BrowsePage />;
  if (head === "cases" && id) return <CasePage id={id} />;
  if (head === "patterns" && id) return <PatternPage id={id} />;
  if (head === "materials" && id) return <MaterialPage id={id} />;
  if (head === "docs") return <DocsPage />;
  if (head === "favorites") return <FavoritesPage />;
  if (head === "compare") return <ComparePage />;
  if (head === "lab") return <PlaceholderPage kind="lab" />;
  if (head === "workflow") return <PlaceholderPage kind="workflow" />;
  return <NotFoundPage />;
}

export function Workbench({ library }: { library: Library }) {
  const site = SITES[library];
  return (
    <AtlasProvider site={site} meta={meta}>
      <RouterProvider>
        <DocumentTitleSync library={library} />
        <ThemeProvider storageKey={`${library}-atlas-theme`} defaultMode={site.defaultTheme}>
          <FavoritesProvider library={library} meta={meta}>
            <CompareProvider meta={meta}>
              <AppShell>
                <RouteView library={library} />
              </AppShell>
            </CompareProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </RouterProvider>
    </AtlasProvider>
  );
}