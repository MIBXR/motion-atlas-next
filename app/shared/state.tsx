import { createContext, useContext, useEffect, useState } from 'react';
import type { Kind } from './data';
import { catalog, isMotion, kinds, library } from './data';

export function readRoute() {
  const [path = '/', search = ''] = (location.hash.slice(1) || '/').split('?');
  return { path, parts: path.split('/').filter(Boolean), params: new URLSearchParams(search) };
}
export function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const scrolls = new Map<string, number>();
    let current = location.hash;
    function change() {
      scrolls.set(current, window.scrollY);
      current = location.hash;
      setRoute(readRoute());
      requestAnimationFrame(() => window.scrollTo(0, scrolls.get(current) || 0));
    }
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  return route;
}

type Favorites = Record<Kind, string[]>;
const emptyFavorites = (): Favorites => ({ cases: [], patterns: [], materials: [] });
const storageKey = isMotion ? 'ma-favorites' : 'web-atlas-favorites';
function fromStored(): Favorites { return JSON.parse(localStorage.getItem(storageKey) || 'null') || emptyFavorites(); }
export function useLibraryState() {
  const [favorites, setFavorites] = useState<Favorites>(fromStored);
  const [comparison, setComparison] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem(`${library}-workbench-theme`) || (isMotion ? 'dark' : 'light'));
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)');
    const update = () => { document.documentElement.dataset.theme = theme === 'system' ? query.matches ? 'dark' : 'light' : theme; };
    update(); localStorage.setItem(`${library}-workbench-theme`, theme);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [theme]);
  useEffect(() => {
    const sync = (event: StorageEvent) => { if (event.key === storageKey || event.key === null) setFavorites(fromStored()); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => { if (!notice) return; const timeout = setTimeout(() => setNotice(''), 3500); return () => clearTimeout(timeout); }, [notice]);
  function save(next: Favorites) {
    localStorage.setItem(storageKey, JSON.stringify(isMotion ? next : { format: 'web-atlas-favorites', ...next }));
    setFavorites(next);
    if (isMotion) document.dispatchEvent(new Event('ma:favorites'));
  }
  function toggleFavorite(kind: Kind, id: string) {
    save({ ...favorites, [kind]: favorites[kind].includes(id) ? favorites[kind].filter(item => item !== id) : [...favorites[kind], id] });
  }
  function toggleCompare(id: string) {
    if (comparison.includes(id)) setComparison(comparison.filter(item => item !== id));
    else if (comparison.length < 3) setComparison([...comparison, id]);
    else setNotice('最多比较 3 个案例，请先移除一个。');
  }
  async function importFavorites(file: File) {
    try {
      let parsed = JSON.parse(await file.text());
      if (typeof parsed === 'string') parsed = JSON.parse(parsed);
      if (isMotion) parsed = parsed.favorites || parsed;
      else if (parsed.format !== 'web-atlas-favorites' || kinds.some(kind => !Array.isArray(parsed[kind]) || parsed[kind].some((id: unknown) => typeof id !== 'string'))) throw new Error('请选择 Web Atlas 收藏 JSON 文件。');
      const next = emptyFavorites();
      for (const kind of kinds) {
        if (parsed[kind] != null && !Array.isArray(parsed[kind])) throw new Error('收藏分类必须是条目编号数组。');
        next[kind] = [...new Set([...favorites[kind], ...(parsed[kind] || []).filter((id: string) => catalog[kind].some(entry => entry.id === id))])];
      }
      save(next); setNotice('收藏已导入。');
    } catch (error) { setNotice(error instanceof Error ? error.message : '收藏文件读取失败。'); }
  }
  return { favorites, toggleFavorite, importFavorites, comparison, setComparison, toggleCompare, notice, setNotice, theme, setTheme };
}
type WorkbenchState = ReturnType<typeof useLibraryState>;
export const Workbench = createContext<WorkbenchState>(null!);
export const useWorkbench = () => useContext(Workbench);
