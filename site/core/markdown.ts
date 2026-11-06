// Markdown 渲染：相对链接与图片以当前文档路径为基准（CONTENT.md 5 节）。
import { marked } from "marked";
import { href } from "./router";
import { KIND_NAME, type Kind } from "./types";

export interface TocItem { id: string; text: string; level: number }

const BASE = "https://content.local/";

export function slugify(text: string): string {
  return text.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, "").replace(/\s+/g, "-");
}

/** 把内容根相对路径转换成工作台里的目标：文档、条目或直接打开的文件。 */
export function resolveLocal(target: string, fromDoc: string): { kind: "doc" | "entry" | "file" | "external"; url: string } {
  if (/^(mailto:|tel:|javascript:)/i.test(target)) return { kind: "external", url: target };
  const u = new URL(target, BASE + fromDoc);
  if (u.origin + "/" !== BASE) return { kind: "external", url: u.href };
  let p = decodeURIComponent(u.pathname.slice(1));
  const hash = decodeURIComponent(u.hash.slice(1));
  if (p === "docs.html" && u.searchParams.get("file")) return { kind: "doc", url: href("/docs", { path: u.searchParams.get("file")!, h: hash }) };
  if (/\.md$/i.test(p)) return { kind: "doc", url: href("/docs", { path: p, h: hash }) };
  const entry = /^entries\/(cases|patterns|materials)\/([^/]+)\.json$/.exec(p);
  if (entry) return { kind: "entry", url: href(`/${entry[1]}/${entry[2]}`) };
  if (/^demos\/(cases|materials|patterns)\/[^/]+\/$/.test(p)) p += "index.html";
  return { kind: "file", url: p + u.search + u.hash };
}

export function renderMarkdown(md: string, docPath: string): { html: string; toc: TocItem[] } {
  const body = md.replace(/^[﻿​-‍⁠]+/, "").replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  const raw = marked.parse(body, { async: false, gfm: true }) as string;
  const doc = new DOMParser().parseFromString(`<div>${raw}</div>`, "text/html");
  const root = doc.body.firstElementChild!;
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  root.querySelectorAll("h1,h2,h3,h4").forEach(h => {
    const base = slugify(h.textContent || "") || "section";
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    const id = n ? `${base}-${n}` : base;
    h.id = id;
    const level = Number(h.tagName[1]);
    if (level >= 2 && level <= 3) toc.push({ id, text: h.textContent || "", level });
  });
  root.querySelectorAll("a[href]").forEach(a => {
    const raw = a.getAttribute("href")!;
    if (raw.startsWith("#")) { a.setAttribute("href", href("/docs", { path: docPath, h: decodeURIComponent(raw.slice(1)) })); return; }
    const t = resolveLocal(raw, docPath);
    a.setAttribute("href", t.url);
    if (t.kind === "external" || t.kind === "file") { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); }
  });
  root.querySelectorAll("img[src]").forEach(img => {
    const t = resolveLocal(img.getAttribute("src")!, docPath);
    img.setAttribute("src", t.kind === "external" ? t.url : t.url.replace(/#.*$/, ""));
    img.setAttribute("loading", "lazy");
  });
  root.querySelectorAll("table").forEach(t => {
    const wrap = doc.createElement("div");
    wrap.className = "md-table";
    t.replaceWith(wrap);
    wrap.appendChild(t);
  });
  return { html: root.innerHTML, toc };
}

export function kindLabel(kind: Kind) { return KIND_NAME[kind]; }
