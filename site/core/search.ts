import type { Entry } from "./types";

// 路径、URL 与内部定位不参与搜索，其余文字字段（标题、摘要、标签与全部拆解内容）都参与。
const SKIP = new Set(["$", "id", "order", "demo", "preview", "previewMobile", "referencePreview", "research", "fidelity", "assetManifest", "url", "sourceFiles", "locator", "entrypoint", "path", "score", "snapshotPath", "snapshotEntry", "replicaPage", "focus", "accent", "background"]);

const cache = new WeakMap<Entry, string>();

function collect(value: unknown, out: string[]) {
  if (typeof value === "string") out.push(value);
  else if (typeof value === "number") return;
  else if (Array.isArray(value)) value.forEach(v => collect(v, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) if (!SKIP.has(k)) collect(v, out);
  }
}

export function haystack(e: Entry): string {
  let text = cache.get(e);
  if (text === undefined) {
    const out: string[] = [e.id];
    collect(e, out);
    text = out.join("\n").toLowerCase();
    cache.set(e, text);
  }
  return text;
}

export function terms(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

/** 多个词时每个词都要命中。 */
export function matches(e: Entry, ts: string[]): boolean {
  if (!ts.length) return true;
  const h = haystack(e);
  return ts.every(t => h.includes(t));
}
