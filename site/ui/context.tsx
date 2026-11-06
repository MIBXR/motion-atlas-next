import { createContext, useContext } from "react";
import type { AtlasConfig, Entry, Kind } from "../core/types";

export const AtlasContext = createContext<AtlasConfig | null>(null);

export function useAtlas(): AtlasConfig {
  const c = useContext(AtlasContext);
  if (!c) throw new Error("AtlasContext 未提供");
  return c;
}

const indexes = new WeakMap<Entry[], Map<string, Entry>>();
export function byId(list: Entry[], id: string): Entry | undefined {
  let m = indexes.get(list);
  if (!m) { m = new Map(list.map(e => [e.id, e])); indexes.set(list, m); }
  return m.get(id);
}

export function useEntry(kind: Kind, id: string | undefined) {
  const { data } = useAtlas();
  return id ? byId(data[kind], id) : undefined;
}
