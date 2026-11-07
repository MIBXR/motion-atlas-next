import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { AtlasMeta } from "../types";
import type { SiteConfig } from "../site";

interface AtlasContextValue {
  site: SiteConfig;
  meta: AtlasMeta;
}

const AtlasContext = createContext<AtlasContextValue | null>(null);

export function AtlasProvider({ site, meta, children }: AtlasContextValue & { children: ReactNode }) {
  return <AtlasContext.Provider value={{ site, meta }}>{children}</AtlasContext.Provider>;
}

export function useAtlas() {
  const value = useContext(AtlasContext);
  if (!value) throw new Error("AtlasProvider is missing");
  return value;
}