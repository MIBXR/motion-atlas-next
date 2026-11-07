import type { AtlasEntry, EntryKind, Library } from "../types";

export const KINDS: EntryKind[] = ["cases", "patterns", "materials"];

export const KIND_LABEL: Record<EntryKind, string> = {
  cases: "案例",
  patterns: "巧思",
  materials: "素材"
};

export const KIND_SINGULAR: Record<EntryKind, string> = {
  cases: "案例",
  patterns: "巧思",
  materials: "素材"
};

export function entryHref(kind: EntryKind, id: string) {
  return `/${kind}/${encodeURIComponent(id)}`;
}

export function kindFromRoute(value: string): EntryKind | null {
  return value === "cases" || value === "patterns" || value === "materials" ? value : null;
}

export function atlasUrl(value: string) {
  if (/^(?:https?:|data:|blob:|mailto:|tel:)/i.test(value)) return value;
  const protectedValue = value.replace(/^\/+/, "");
  const splitAt = protectedValue.search(/[?#]/);
  const pathPart = splitAt >= 0 ? protectedValue.slice(0, splitAt) : protectedValue;
  const suffix = splitAt >= 0 ? protectedValue.slice(splitAt) : "";
  const encoded = pathPart
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return new URL(`${import.meta.env.BASE_URL}atlas/${encoded}${suffix}`, document.baseURI).href;
}

export function withDemoParams(entrypoint: string, params: Record<string, string | number | boolean | null | undefined>) {
  const url = new URL(atlasUrl(entrypoint));
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    url.searchParams.set(key, String(value));
  }
  return url.href;
}

export function normalizeAssetPath(value: string) {
  return value.replaceAll("\\", "/").replace(/^\/+/, "");
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

export function padNumber(value: number, size = 3) {
  return String(value).padStart(size, "0");
}

export function formatTimecode(value: number, withTenths = true) {
  if (!Number.isFinite(value)) return withTenths ? "00:00.0" : "00:00";
  const safe = Math.max(0, value);
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  const tenths = Math.floor((safe % 1) * 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}${withTenths ? `.${tenths}` : ""}`;
}

export function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "—";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  if (minutes <= 0) return `${rest} 秒`;
  return `${minutes} 分 ${String(rest).padStart(2, "0")} 秒`;
}

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes)) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function sourceCaseMap(allEntries: Record<EntryKind, AtlasEntry[]>) {
  return new Map(allEntries.cases.map((entry) => [entry.id, entry]));
}

export function relatedPatternsForCase(patterns: AtlasEntry[], caseId: string) {
  return patterns.filter((pattern) => pattern.sources?.some((source) => source.caseId === caseId));
}

export function allPatternsForCase(patterns: AtlasEntry[], entry: AtlasEntry) {
  const map = new Map(relatedPatternsForCase(patterns, entry.id).map((pattern) => [pattern.id, pattern]));
  for (const id of entry.patternIds ?? []) {
    if (map.has(id)) continue;
    const pattern = patterns.find((item) => item.id === id);
    if (pattern) map.set(id, pattern);
  }
  return [...map.values()];
}

export function docsForPath(items: { path: string; title: string }[], path?: string) {
  if (!path) return undefined;
  return items.find((item) => item.path === path);
}

export function parseObservation(observation?: string) {
  if (!observation) return { text: "", title: "", note: "" };
  if (observation.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(observation) as { title?: string; note?: string };
      return { text: [parsed.title, parsed.note].filter(Boolean).join(" — "), title: parsed.title ?? "", note: parsed.note ?? "" };
    } catch {
      return { text: observation, title: "", note: "" };
    }
  }
  return { text: observation, title: "", note: "" };
}

export function isExternalUrl(value?: string) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

export function libraryLabel(library: Library) {
  return library === "web" ? "WEB" : "MOTION";
}

export function defaultSortDirection(kind: EntryKind) {
  return kind === "cases" ? "asc" : "desc";
}