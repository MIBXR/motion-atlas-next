import type { AtlasEntry, EntryKind, Library } from "../types";

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterSpec {
  key: string;
  label: string;
  getValues: (entry: AtlasEntry) => string[];
  options: FilterOption[];
}

type LabelMaps = Record<string, Record<string, string>>;

type Labels = {
  cases?: LabelMaps;
  patterns?: LabelMaps;
  materials?: LabelMaps;
  [key: string]: unknown;
};

function asLabels(labels: Record<string, unknown>): Labels {
  return labels as Labels;
}

export function labelFor(labels: Record<string, unknown>, kind: EntryKind, key: string, value: string) {
  const map = asLabels(labels)[kind]?.[key];
  return map?.[value] ?? value;
}

function directOptions(
  entries: AtlasEntry[],
  getValues: (entry: AtlasEntry) => string[],
  map: Record<string, string> | undefined
) {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const value of new Set(getValues(entry))) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  const mappedOrder = map ? Object.keys(map) : [];
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count, label: map?.[value] ?? value }))
    .sort((a, b) => {
      const aMapped = mappedOrder.indexOf(a.value);
      const bMapped = mappedOrder.indexOf(b.value);
      if (aMapped >= 0 || bMapped >= 0) {
        if (aMapped < 0) return 1;
        if (bMapped < 0) return -1;
        return aMapped - bMapped;
      }
      return a.label.localeCompare(b.label, "zh-CN");
    });
}

function sourceCaseOptions(patterns: AtlasEntry[], cases: AtlasEntry[]) {
  const counts = new Map<string, number>();
  for (const entry of patterns) {
    const ids = new Set((entry.sources ?? []).map((source) => source.caseId).filter(Boolean));
    for (const id of ids) counts.set(id!, (counts.get(id!) ?? 0) + 1);
  }
  return cases.map((entry) => ({
    value: entry.id,
    label: entry.title,
    count: counts.get(entry.id) ?? 0
  }));
}

export function buildFilterSpecs(
  library: Library,
  kind: EntryKind,
  entries: AtlasEntry[],
  allCases: AtlasEntry[],
  labelsValue: Record<string, unknown>
): FilterSpec[] {
  const labels = asLabels(labelsValue);
  if (library === "web") {
    if (kind === "cases") {
      return [
        {
          key: "category",
          label: "分类",
          getValues: (entry) => (entry.category ? [entry.category] : []),
          options: directOptions(entries, (entry) => (entry.category ? [entry.category] : []), labels.cases?.category)
        },
        {
          key: "country",
          label: "地区",
          getValues: (entry) => (entry.country ? [entry.country] : []),
          options: directOptions(entries, (entry) => (entry.country ? [entry.country] : []), undefined)
        }
      ];
    }
    if (kind === "patterns") {
      return [
        {
          key: "category",
          label: "分类",
          getValues: (entry) => (entry.category ? [entry.category] : []),
          options: directOptions(entries, (entry) => (entry.category ? [entry.category] : []), undefined)
        },
        {
          key: "experienceTypes",
          label: "体验类型",
          getValues: (entry) => entry.experienceTypes ?? [],
          options: directOptions(entries, (entry) => entry.experienceTypes ?? [], labels.patterns?.experienceTypes)
        },
        {
          key: "caseId",
          label: "来源案例",
          getValues: (entry) => [...new Set((entry.sources ?? []).map((source) => source.caseId).filter((id): id is string => Boolean(id)))],
          options: sourceCaseOptions(entries, allCases)
        }
      ];
    }
    return [
      {
        key: "type",
        label: "素材类型",
        getValues: (entry) => (entry.type ? [entry.type] : []),
        options: directOptions(entries, (entry) => (entry.type ? [entry.type] : []), labels.materials?.type)
      },
      {
        key: "category",
        label: "分类",
        getValues: (entry) => (entry.category ? [entry.category] : []),
        options: directOptions(entries, (entry) => (entry.category ? [entry.category] : []), undefined)
      }
    ];
  }

  if (kind === "cases") {
    return [
      {
        key: "style",
        label: "画面风格",
        getValues: (entry) => (entry.style ? [entry.style] : []),
        options: directOptions(entries, (entry) => (entry.style ? [entry.style] : []), labels.cases?.style)
      },
      {
        key: "carriers",
        label: "载体",
        getValues: (entry) => entry.carriers ?? [],
        options: directOptions(entries, (entry) => entry.carriers ?? [], labels.cases?.carriers)
      },
      {
        key: "purpose",
        label: "用途",
        getValues: (entry) => (entry.purpose ? [entry.purpose] : []),
        options: directOptions(entries, (entry) => (entry.purpose ? [entry.purpose] : []), labels.cases?.purpose)
      },
      {
        key: "tech",
        label: "技术",
        getValues: (entry) => entry.tech ?? [],
        options: directOptions(entries, (entry) => entry.tech ?? [], labels.cases?.tech)
      }
    ];
  }
  if (kind === "patterns") {
    return [
      {
        key: "types",
        label: "巧思类型",
        getValues: (entry) => entry.types ?? [],
        options: directOptions(entries, (entry) => entry.types ?? [], labels.patterns?.types)
      },
      {
        key: "carriers",
        label: "载体",
        getValues: (entry) => entry.carriers ?? [],
        options: directOptions(entries, (entry) => entry.carriers ?? [], labels.patterns?.carriers)
      },
      {
        key: "caseId",
        label: "来源案例",
        getValues: (entry) => [...new Set((entry.sources ?? []).map((source) => source.caseId).filter((id): id is string => Boolean(id)))],
        options: sourceCaseOptions(entries, allCases)
      }
    ];
  }
  return [
    {
      key: "type",
      label: "素材类型",
      getValues: (entry) => (entry.type ? [entry.type] : []),
      options: directOptions(entries, (entry) => (entry.type ? [entry.type] : []), labels.materials?.type)
    }
  ];
}

export function activeFiltersFromParams(specs: FilterSpec[], params: URLSearchParams) {
  const active: Record<string, string[]> = {};
  for (const spec of specs) {
    const values = params.getAll(spec.key).filter(Boolean);
    if (values.length) active[spec.key] = [...new Set(values)];
  }
  return active;
}

export function hasActiveFilters(filters: Record<string, string[]>) {
  return Object.values(filters).some((values) => values.length > 0);
}

export function countActiveFilters(filters: Record<string, string[]>) {
  return Object.values(filters).reduce((sum, values) => sum + values.length, 0);
}

export function filterEntries(entries: AtlasEntry[], specs: FilterSpec[], filters: Record<string, string[]>) {
  return entries.filter((entry) => {
    for (const spec of specs) {
      const selected = filters[spec.key];
      if (!selected?.length) continue;
      const values = new Set(spec.getValues(entry));
      if (!selected.some((value) => values.has(value))) return false;
    }
    return true;
  });
}

function normalizeText(value: string) {
  return value.normalize("NFKC").toLocaleLowerCase("zh-CN");
}

const SKIP_SEARCH_KEYS = new Set([
  "id",
  "url",
  "referenceUrl",
  "demo",
  "preview",
  "previewMobile",
  "referencePreview",
  "cover",
  "coverMobile",
  "coverPortrait",
  "research",
  "fidelity",
  "assetManifest",
  "sourceFiles",
  "snapshotPath",
  "snapshotEntry",
  "replicaPage",
  "entrypoint",
  "channel",
  "score"
]);

const searchCache = new WeakMap<AtlasEntry, string>();

function collectSearchStrings(value: unknown, key: string, output: string[]) {
  if (value == null) return;
  if (typeof value === "string") {
    if (!SKIP_SEARCH_KEYS.has(key) && !/^(https?:)?\/\//i.test(value)) output.push(value);
    return;
  }
  if (typeof value === "number" || typeof value === "boolean") return;
  if (Array.isArray(value)) {
    for (const item of value) collectSearchStrings(item, key, output);
    return;
  }
  if (typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      if (SKIP_SEARCH_KEYS.has(childKey)) continue;
      collectSearchStrings(childValue, childKey, output);
    }
  }
}

export function entrySearchText(entry: AtlasEntry) {
  const cached = searchCache.get(entry);
  if (cached) return cached;
  const output: string[] = [entry.title, entry.subtitle ?? "", entry.summary, ...(entry.tags ?? [])];
  for (const [key, value] of Object.entries(entry)) {
    if (SKIP_SEARCH_KEYS.has(key)) continue;
    collectSearchStrings(value, key, output);
  }
  const text = normalizeText(output.join(" \n "));
  searchCache.set(entry, text);
  return text;
}

export function searchEntries(entries: AtlasEntry[], query: string) {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return entries;
  return entries.filter((entry) => {
    const text = entrySearchText(entry);
    return terms.every((term) => text.includes(term));
  });
}

export function sortEntries(entries: AtlasEntry[], sort: "order" | "title", direction: "asc" | "desc") {
  const factor = direction === "asc" ? 1 : -1;
  return [...entries].sort((a, b) => {
    if (sort === "title") {
      const result = a.title.localeCompare(b.title, "zh-CN");
      if (result) return result * factor;
    }
    if (a.order !== b.order) return (a.order - b.order) * factor;
    return a.id.localeCompare(b.id);
  });
}

export function filterCounts(entries: AtlasEntry[], specs: FilterSpec[], filters: Record<string, string[]>) {
  return specs.reduce<Record<string, number>>((result, spec) => {
    result[spec.key] = filterEntries(entries, [spec], filters).length;
    return result;
  }, {});
}