import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AtlasMeta } from "../types";

interface CompareValue {
  ids: string[];
  toggle: (id: string) => "added" | "removed" | "limit";
  replace: (ids: string[]) => void;
  clear: () => void;
  includes: (id: string) => boolean;
}

const CompareContext = createContext<CompareValue | null>(null);

function initialIds(meta: AtlasMeta) {
  const known = new Set(meta.entries.cases.map((entry) => entry.id));
  const hash = window.location.hash.slice(1);
  if (!hash.startsWith("/compare")) return [];
  const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
  const values = new URLSearchParams(query).get("ids")?.split(",") ?? [];
  return values.filter((id) => known.has(id)).slice(0, 3);
}

export function CompareProvider({ meta, children }: { meta: AtlasMeta; children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => initialIds(meta));
  const known = useMemo(() => new Set(meta.entries.cases.map((entry) => entry.id)), [meta]);

  const toggle = useCallback((id: string): "added" | "removed" | "limit" => {
    if (!known.has(id)) return "limit";
    if (ids.includes(id)) {
      setIds(ids.filter((value) => value !== id));
      return "removed";
    }
    if (ids.length >= 3) return "limit";
    setIds([...ids, id]);
    return "added";
  }, [known, ids]);

  const replace = useCallback((next: string[]) => setIds(next.filter((id) => known.has(id)).slice(0, 3)), [known]);
  const clear = useCallback(() => setIds([]), []);
  const includes = useCallback((id: string) => ids.includes(id), [ids]);
  const value = useMemo(() => ({ ids, toggle, replace, clear, includes }), [ids, toggle, replace, clear, includes]);
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const value = useContext(CompareContext);
  if (!value) throw new Error("CompareProvider is missing");
  return value;
}