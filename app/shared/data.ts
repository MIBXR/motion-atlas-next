import atlas from 'virtual:atlas';

export type Kind = 'cases' | 'patterns' | 'materials';
export type Entry = { id: string; kind: Kind; order: number; title: string; summary: string; preview: string | null; documents: string[]; [key: string]: any };
export type Document = { path: string; title: string; group: string; text: string };
export const library: 'web' | 'motion' = atlas.library;
export const isMotion = library === 'motion';
export const libraryName = isMotion ? 'Motion Atlas' : 'Web Atlas';
export const labels = atlas.labels;
export const entries: Entry[] = atlas.entries;
export const documents: Document[] = atlas.documents;
export const files = new Set<string>(atlas.files);
export const kinds: Kind[] = ['cases', 'patterns', 'materials'];
export const kindNames: Record<Kind, string> = { cases: '案例', patterns: '巧思', materials: '素材' };
export const catalog = Object.fromEntries(kinds.map(kind => [kind, entries.filter(entry => entry.kind === kind)])) as Record<Kind, Entry[]>;
export const findEntry = (kind: string, id: string) => entries.find(entry => entry.kind === kind && entry.id === id);
export function displayName(kind: Kind, field: string, value: string) {
  return field === 'sources[].caseId' ? findEntry('cases', value)?.title || value : labels[kind]?.[field]?.[value] || value;
}
export function valuesFor(entry: Entry, field: string): string[] {
  if (field === 'sources[].caseId') return (entry.sources || []).map((source: any) => source.caseId);
  const value = entry[field];
  return value == null ? [] : Array.isArray(value) ? value : [String(value)];
}
export const filterFields: Record<Kind, { key: string; label: string }[]> = isMotion ? {
  cases: [{ key: 'style', label: '画面风格' }, { key: 'carriers', label: '载体' }, { key: 'purpose', label: '用途' }, { key: 'tech', label: '技术' }],
  patterns: [{ key: 'types', label: '巧思类型' }, { key: 'carriers', label: '载体' }, { key: 'sources[].caseId', label: '来源案例' }],
  materials: [{ key: 'type', label: '素材类型' }]
} : {
  cases: [{ key: 'category', label: '分类' }, { key: 'country', label: '地区' }],
  patterns: [{ key: 'category', label: '分类' }, { key: 'experienceTypes', label: '体验类型' }, { key: 'sources[].caseId', label: '来源案例' }],
  materials: [{ key: 'type', label: '素材类型' }, { key: 'category', label: '分类' }]
};

const base = new URL(import.meta.env.BASE_URL, document.baseURI);
export const contentBase = new URL('content/', base).href;
export function assetUrl(path: string) {
  const normalized = path.replace(/\\/g, '/');
  const url = /^(https?:|data:|blob:)/.test(normalized) ? normalized : new URL(normalized, contentBase).href;
  const assets = (window as any).AtlasAssets || (window as any).MotionAtlasAssets;
  return assets ? assets.resolve(url) : url;
}
export function href(path: string, patch: Record<string, string | null> = {}, preserve = false) {
  const current = location.hash.split('?')[1] || '';
  const params = new URLSearchParams(preserve ? current : '');
  for (const [key, value] of Object.entries(patch)) value ? params.set(key, value) : params.delete(key);
  return `#${path}${params.size ? '?' + params.toString() : ''}`;
}
export function navigate(path: string, patch: Record<string, string | null> = {}, preserve = false) { location.hash = href(path, patch, preserve).slice(1); }
export function entryHref(entry: Entry) { return href(`/${entry.kind}/${entry.id}`, { tab: null, file: null, dq: null, anchor: null }, true); }
export function docHref(path: string, anchor = '') { return href('/docs', { file: path, anchor }); }
export function downloadJSON(value: unknown, name: string) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url; link.download = name; link.click();
  URL.revokeObjectURL(url);
}
export const nonempty = (value: any): boolean => value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0) && (typeof value !== 'object' || Object.keys(value).length > 0);
