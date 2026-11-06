// 本地状态：主题、收藏、比较篮。都放在 localStorage，并在同源页面之间同步。
import { useSyncExternalStore } from "react";
import type { FavSets, FavoritesFormat, Kind } from "./types";

function makeStore<T>(read: () => T, keys: () => string[]) {
  const listeners = new Set<() => void>();
  let value = read();
  const emit = () => { value = read(); listeners.forEach(fn => fn()); };
  window.addEventListener("storage", e => { if (e.key === null || keys().includes(e.key)) emit(); });
  return {
    get: () => value,
    emit,
    use: () => useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb); }, () => value),
  };
}

/* 主题 */
export type ThemePref = "light" | "dark" | "system";
const THEME_KEY = "atlas-workbench-theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");
const themeStore = makeStore<ThemePref>(() => (localStorage.getItem(THEME_KEY) as ThemePref) || "system", () => [THEME_KEY]);
function applyTheme() {
  const pref = themeStore.get();
  const dark = pref === "dark" || (pref === "system" && media.matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}
applyTheme();
media.addEventListener("change", applyTheme);
export const useTheme = themeStore.use;
export function setTheme(pref: ThemePref) { localStorage.setItem(THEME_KEY, pref); themeStore.emit(); applyTheme(); }
export const effectiveTheme = (): "light" | "dark" => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

/** 主题切换走 Arc theme-switch 的 split 变体：新外观从页面正中的细缝向两侧展开（View Transition）。 */
export function switchTheme(pref: ThemePref) {
  const before = effectiveTheme();
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduced) return setTheme(pref);
  localStorage.setItem(THEME_KEY, pref);
  const dark = pref === "dark" || (pref === "system" && media.matches);
  if ((dark ? "dark" : "light") === before) return setTheme(pref);
  document.documentElement.dataset.themeTransition = "split";
  const t = doc.startViewTransition(() => setTheme(pref));
  t.finished.finally(() => { delete document.documentElement.dataset.themeTransition; });
}

/* 侧栏收起状态 */
const SIDEBAR_KEY = "atlas-workbench-sidebar";
const sidebarStore = makeStore<boolean>(() => localStorage.getItem(SIDEBAR_KEY) === "collapsed", () => [SIDEBAR_KEY]);
export const useSidebarCollapsed = sidebarStore.use;
export function setSidebarCollapsed(v: boolean) { localStorage.setItem(SIDEBAR_KEY, v ? "collapsed" : "expanded"); sidebarStore.emit(); }

/* 收藏：存储格式按各库原站约定（CONTENT.md 第 7 节） */
let favFormat: FavoritesFormat;
let known: Record<Kind, Set<string>>;
const emptyFav = (): FavSets => ({ cases: [], patterns: [], materials: [] });
const favStore = makeStore<FavSets>(() => {
  if (!favFormat) return emptyFav();
  try {
    const raw = JSON.parse(localStorage.getItem(favFormat.storageKey) || "null");
    if (!raw) return emptyFav();
    const parsed = favFormat.parse(raw);
    return { cases: parsed.cases ?? [], patterns: parsed.patterns ?? [], materials: parsed.materials ?? [] };
  } catch { return emptyFav(); }
}, () => [favFormat?.storageKey]);

export function initFavorites(format: FavoritesFormat, ids: Record<Kind, string[]>) {
  favFormat = format;
  known = { cases: new Set(ids.cases), patterns: new Set(ids.patterns), materials: new Set(ids.materials) };
  favStore.emit();
}
function writeFav(next: FavSets) {
  localStorage.setItem(favFormat.storageKey, JSON.stringify(favFormat.serialize(next)));
  favStore.emit();
}
export const useFavorites = favStore.use;
export function toggleFavorite(kind: Kind, id: string) {
  const cur = favStore.get();
  const list = cur[kind].includes(id) ? cur[kind].filter(x => x !== id) : [...cur[kind], id];
  writeFav({ ...cur, [kind]: list });
}
export function exportFavorites() {
  const blob = new Blob([JSON.stringify(favFormat.exportJson(favStore.get()), null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = favFormat.fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
/** 只合并本库已知的 id，保留已有收藏。返回新增数量。 */
export function importFavorites(text: string): number {
  let json: unknown = JSON.parse(text);
  if (typeof json === "string") json = JSON.parse(json);
  const incoming = favFormat.parse(json);
  const cur = favStore.get();
  const next = { ...cur };
  let added = 0;
  for (const kind of ["cases", "patterns", "materials"] as Kind[]) {
    for (const id of incoming[kind] ?? []) {
      if (typeof id === "string" && known[kind].has(id) && !next[kind].includes(id)) { next[kind] = [...next[kind], id]; added++; }
    }
  }
  writeFav(next);
  return added;
}

/* 比较篮：最多 3 个案例 */
const COMPARE_KEY = "atlas-workbench-compare";
const compareStore = makeStore<string[]>(() => {
  try { return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]"); } catch { return []; }
}, () => [COMPARE_KEY]);
export const useCompare = compareStore.use;
export const COMPARE_MAX = 3;
export function setCompare(ids: string[]) { localStorage.setItem(COMPARE_KEY, JSON.stringify(ids.slice(0, COMPARE_MAX))); compareStore.emit(); }
export function toggleCompare(id: string) {
  const cur = compareStore.get();
  setCompare(cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id].slice(-COMPARE_MAX));
}
