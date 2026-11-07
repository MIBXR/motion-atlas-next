import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AtlasMeta, EntryKind, Library } from "../types";

interface FavoritesState {
  cases: string[];
  patterns: string[];
  materials: string[];
}

interface FavoritesValue {
  favorites: FavoritesState;
  isFavorite: (kind: EntryKind, id: string) => boolean;
  toggle: (kind: EntryKind, id: string) => boolean;
  total: number;
  exportData: () => { filename: string; text: string };
  importText: (text: string) => number;
}

const FavoritesContext = createContext<FavoritesValue | null>(null);
const EMPTY: FavoritesState = { cases: [], patterns: [], materials: [] };
const KINDS: EntryKind[] = ["cases", "patterns", "materials"];

function storageKey(library: Library) {
  return library === "web" ? "web-atlas-favorites" : "ma-favorites";
}

function knownIds(meta: AtlasMeta) {
  return {
    cases: new Set(meta.entries.cases.map((entry) => entry.id)),
    patterns: new Set(meta.entries.patterns.map((entry) => entry.id)),
    materials: new Set(meta.entries.materials.map((entry) => entry.id))
  };
}

function sanitize(state: Partial<FavoritesState>, know: ReturnType<typeof knownIds>): FavoritesState {
  return {
    cases: [...new Set((state.cases ?? []).filter((id) => typeof id === "string" && know.cases.has(id)))],
    patterns: [...new Set((state.patterns ?? []).filter((id) => typeof id === "string" && know.patterns.has(id)))],
    materials: [...new Set((state.materials ?? []).filter((id) => typeof id === "string" && know.materials.has(id)))]
  };
}

function readWeb(raw: string | null): FavoritesState {
  if (!raw) return EMPTY;
  const parsed = JSON.parse(raw) as { cases?: string[]; patterns?: string[]; materials?: string[] };
  return {
    cases: Array.isArray(parsed.cases) ? parsed.cases : [],
    patterns: Array.isArray(parsed.patterns) ? parsed.patterns : [],
    materials: Array.isArray(parsed.materials) ? parsed.materials : []
  };
}

function readMotion(raw: string | null): FavoritesState {
  if (!raw) return EMPTY;
  const parsed = JSON.parse(raw) as { cases?: string[]; patterns?: string[]; materials?: string[] };
  return {
    cases: Array.isArray(parsed.cases) ? parsed.cases : [],
    patterns: Array.isArray(parsed.patterns) ? parsed.patterns : [],
    materials: Array.isArray(parsed.materials) ? parsed.materials : []
  };
}

function readStorage(library: Library) {
  try {
    const raw = localStorage.getItem(storageKey(library));
    return library === "web" ? readWeb(raw) : readMotion(raw);
  } catch {
    return EMPTY;
  }
}

export function FavoritesProvider({ library, meta, children }: { library: Library; meta: AtlasMeta; children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritesState>(() => readStorage(library));
  const known = useMemo(() => knownIds(meta), [meta]);

  useEffect(() => {
    setFavorites(sanitize(readStorage(library), known));
  }, [library, known]);

  useEffect(() => {
    try {
      const value =
        library === "web"
          ? { format: "web-atlas-favorites", ...favorites }
          : favorites;
      localStorage.setItem(storageKey(library), JSON.stringify(value));
    } catch {
      // The workbench remains usable when storage is unavailable.
    }
  }, [favorites, library]);

  useEffect(() => {
    const key = storageKey(library);
    const sync = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) return;
      setFavorites(sanitize(readStorage(library), known));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [known, library]);

  const toggle = useCallback(
    (kind: EntryKind, id: string) => {
      let selected = false;
      setFavorites((current) => {
        const exists = current[kind].includes(id);
        selected = !exists;
        return {
          ...current,
          [kind]: exists ? current[kind].filter((value) => value !== id) : [...current[kind], id]
        };
      });
      return selected;
    },
    []
  );

  const isFavorite = useCallback((kind: EntryKind, id: string) => favorites[kind].includes(id), [favorites]);
  const total = favorites.cases.length + favorites.patterns.length + favorites.materials.length;

  const exportData = useCallback(() => {
    if (library === "web") {
      return {
        filename: "web-atlas-favorites.json",
        text: JSON.stringify({ format: "web-atlas-favorites", ...favorites }, null, 2)
      };
    }
    return {
      filename: "motion-atlas-favorites.json",
      text: JSON.stringify(
        {
          app: "motion-atlas",
          version: 1,
          exportedAt: new Date().toISOString(),
          favorites
        },
        null,
        2
      )
    };
  }, [favorites, library]);

  const importText = useCallback(
    (text: string) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        throw new Error("文件不是有效的 JSON。");
      }
      if (!parsed || typeof parsed !== "object") throw new Error("收藏文件结构不正确。");
      let incoming: FavoritesState;
      if (library === "web") {
        const data = parsed as { format?: unknown; cases?: unknown; patterns?: unknown; materials?: unknown };
        if (data.format !== "web-atlas-favorites") throw new Error("这不是 Web Atlas 的收藏文件。");
        if (!Array.isArray(data.cases) || !Array.isArray(data.patterns) || !Array.isArray(data.materials)) {
          throw new Error("收藏文件必须同时包含 cases、patterns、materials 三个数组。");
        }
        incoming = sanitize(
          { cases: data.cases as string[], patterns: data.patterns as string[], materials: data.materials as string[] },
          known
        );
      } else {
        const wrapper = parsed as { favorites?: unknown; cases?: unknown; patterns?: unknown; materials?: unknown };
        const raw = (wrapper.favorites && typeof wrapper.favorites === "object" ? wrapper.favorites : wrapper) as Partial<FavoritesState>;
        incoming = sanitize(
          {
            cases: Array.isArray(raw.cases) ? (raw.cases as string[]) : [],
            patterns: Array.isArray(raw.patterns) ? (raw.patterns as string[]) : [],
            materials: Array.isArray(raw.materials) ? (raw.materials as string[]) : []
          },
          known
        );
      }
      const added = KINDS.reduce(
        (sum, kind) => sum + incoming[kind].filter((id) => !favorites[kind].includes(id)).length,
        0
      );
      setFavorites((current) => {
        const next = { ...current };
        for (const kind of KINDS) {
          const merged = [...current[kind]];
          for (const id of incoming[kind]) {
            if (!merged.includes(id)) merged.push(id);
          }
          next[kind] = merged;
        }
        return next;
      });
      return added;
    },
    [known, library, favorites]
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggle, total, exportData, importText }),
    [favorites, isFavorite, toggle, total, exportData, importText]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error("FavoritesProvider is missing");
  return value;
}