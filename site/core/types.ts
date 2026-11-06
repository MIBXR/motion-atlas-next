import type { ReactNode } from "react";

export type Kind = "cases" | "patterns" | "materials";
export const KINDS: Kind[] = ["cases", "patterns", "materials"];
export const KIND_NAME: Record<Kind, string> = { cases: "案例", patterns: "巧思", materials: "素材" };
export const KIND_SINGULAR: Record<string, Kind> = { case: "cases", pattern: "patterns", material: "materials" };

export interface Derived {
  preview?: string | null;
  previewPortrait?: string | null;
  research?: string;
  fidelity?: string;
  licenses?: string;
  prompt?: string;
  agent?: string;
  snapshot?: string;
}

/** 条目保持原 JSON 结构，派生字段放在 $。详情组件按 CONTENT.md 读取。 */
export type Entry = { id: string; order: number; title: string; $: Derived } & Record<string, any>;

export interface DocInfo { path: string; title: string; group: string; hidden?: boolean }

export interface AtlasData {
  labels: Record<string, any>;
  cases: Entry[];
  patterns: Entry[];
  materials: Entry[];
  docs: DocInfo[];
}

export interface Facet {
  key: string;
  label: string;
  values: (e: Entry) => string[];
  display: (v: string) => string;
  /** 取值的固定顺序（labels.json 字典或数据顺序）；未列出的按中文名称排在后面。 */
  order?: string[];
}

export interface CompareRow { label: string; render: (e: Entry) => ReactNode }

export interface FavoritesFormat {
  storageKey: string;
  fileName: string;
  /** localStorage 中保存的值。 */
  serialize: (fav: FavSets) => unknown;
  /** 导出文件内容。 */
  exportJson: (fav: FavSets) => unknown;
  /** 返回要合并的 id；格式不符时抛错。 */
  parse: (json: unknown) => Partial<Record<Kind, string[]>>;
}
export type FavSets = Record<Kind, string[]>;

export interface CardMeta { chips: string[]; subtitle?: string }

export interface AtlasConfig {
  name: string;
  tagline: string;
  data: AtlasData;
  facets: Record<Kind, Facet[]>;
  cardMeta: (kind: Kind, e: Entry) => CardMeta;
  compareRows: CompareRow[];
  favorites: FavoritesFormat;
  detail: Record<Kind, (e: Entry) => ReactNode>;
  tools: { id: string; title: string; description: string; icon: ReactNode }[];
  legacyHash?: (hash: string) => string | null;
}
