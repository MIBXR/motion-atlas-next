import { marked } from "marked";

export interface TocItem {
  id: string;
  label: string;
  level: number;
}

const KNOWN_TOP_LEVEL: Record<string, string> = {
  "index.html": "/",
  "cases.html": "/browse?type=cases",
  "patterns.html": "/browse?type=patterns",
  "materials.html": "/browse?type=materials",
  "docs.html": "/docs",
  "lab.html": "/lab",
  "agent.html": "/workflow"
};

function encodeDocPath(path: string) {
  return path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export function docRoute(path: string, anchor?: string) {
  const query = new URLSearchParams({ path });
  if (anchor) query.set("anchor", anchor);
  return `/docs?${query.toString()}`;
}

function sluggerFactory() {
  const seen = new Map<string, number>();
  return (value: string) => {
    const base =
      value
        .normalize("NFKC")
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-+|-+$/g, "") || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };
}

export function prepareMarkdown(markdown: string, docPath: string): { html: string; toc: TocItem[] } {
  const raw = marked.parse(markdown, { gfm: true, breaks: false, async: false }) as string;
  const parsed = new DOMParser().parseFromString(raw, "text/html");
  const body = parsed.body;
  const firstHeading = body.querySelector("h1");
  if (firstHeading) firstHeading.remove();

  const toc: TocItem[] = [];
  const slug = sluggerFactory();
  for (const heading of body.querySelectorAll("h1, h2, h3, h4")) {
    const label = heading.textContent?.replace(/\s+/g, " ").trim() ?? "";
    if (!label) continue;
    const id = slug(label);
    heading.id = id;
    const level = Number(heading.tagName.slice(1));
    if (level <= 3) toc.push({ id, label, level });
    const anchor = parsed.createElement("a");
    anchor.className = "md-heading-anchor";
    anchor.href = `#${id}`;
    anchor.dataset.docAnchor = id;
    anchor.setAttribute("aria-label", `定位到 ${label}`);
    anchor.textContent = "§";
    heading.append(anchor);
  }

  for (const table of body.querySelectorAll("table")) {
    const wrap = parsed.createElement("div");
    wrap.className = "md-table-wrap";
    table.replaceWith(wrap);
    wrap.append(table);
  }

  for (const image of body.querySelectorAll("img")) {
    const src = image.getAttribute("src");
    if (!src) continue;
    if (/^(?:https?:|data:|blob:)/i.test(src)) {
      image.setAttribute("loading", "lazy");
      image.setAttribute("decoding", "async");
      continue;
    }
    const resolved = resolveAsset(src, docPath);
    if (resolved) image.setAttribute("src", resolved);
    image.setAttribute("loading", "lazy");
    image.setAttribute("decoding", "async");
  }

  for (const link of body.querySelectorAll("a")) {
    const href = link.getAttribute("href");
    if (!href) continue;
    if (href.startsWith("#")) {
      const anchor = href.slice(1);
      link.dataset.docAnchor = decodeURIComponent(anchor);
      link.classList.add("md-anchor-link");
      continue;
    }
    if (/^(?:mailto:|tel:)/i.test(href)) {
      link.setAttribute("rel", "noreferrer");
      continue;
    }
    if (/^(?:https?:)?\/\//i.test(href)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer noopener");
      link.classList.add("md-external");
      continue;
    }
    const target = resolveLink(href, docPath);
    if (!target) continue;
    if (target.kind === "doc") {
      link.setAttribute("href", `#${target.href}`);
      link.setAttribute("data-internal", "true");
    } else {
      link.setAttribute("href", target.href);
      link.setAttribute("data-internal", target.internal ? "true" : "false");
      if (!target.href.startsWith("#")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noreferrer noopener");
      }
    }
  }

  return { html: body.innerHTML, toc };
}

function resolveAsset(raw: string, docPath: string): string | null {
  try {
    const url = new URL(raw, `https://atlas.invalid/${encodeURI(docPath)}`);
    if (url.origin !== "https://atlas.invalid") return raw;
    if (raw.startsWith("/")) return raw;
    const pathname = decodeURIComponent(url.pathname.replace(/^\/+/, ""));
    return new URL(`.${import.meta.env.BASE_URL}atlas/${pathname.split("/").map(encodeURIComponent).join("/")}`, document.baseURI).href;
  } catch {
    return null;
  }
}

type ResolvedLink =
  | { kind: "doc"; href: string; internal: true }
  | { kind: "asset"; href: string; internal: boolean };

function resolveLink(raw: string, docPath: string): ResolvedLink | null {
  if (raw.startsWith("/")) return null;
  let url: URL;
  try {
    url = new URL(raw, `https://atlas.invalid/${encodeURI(docPath)}`);
  } catch {
    return null;
  }
  if (url.origin !== "https://atlas.invalid") return { kind: "asset", href: raw, internal: false };
  let pathname = decodeURI(url.pathname.replace(/^\/+/, ""));
  const hash = decodeURIComponent(url.hash.replace(/^#/, ""));
  if (!pathname) return { kind: "doc", href: docRoute(docPath, hash), internal: true };
  if (/\.md$/i.test(pathname)) {
    return { kind: "doc", href: docRoute(pathname, hash), internal: true };
  }
  const topLevel = pathname.split("/").pop() ?? "";
  const knownRoute = KNOWN_TOP_LEVEL[topLevel];
  if (knownRoute && (pathname === topLevel || pathname.endsWith(`/${topLevel}`))) {
    let href = knownRoute;
    if (url.search) href += `${href.includes("?") ? "&" : "?"}${url.search.slice(1)}`;
    if (hash) href += `${href.includes("?") ? "&" : "?"}anchor=${encodeURIComponent(hash)}`;
    return { kind: "asset", href: `#${href}`, internal: true };
  }
  if (pathname.startsWith("demos/") && !/\.[a-z0-9]+$/i.test(pathname)) {
    pathname = `${pathname.replace(/\/$/, "")}/index.html`;
  }
  const suffix = `${url.search}${url.hash}`;
  const encoded = pathname
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  const asset = new URL(`.${import.meta.env.BASE_URL}atlas/${encoded}${suffix}`, document.baseURI).href;
  return { kind: "asset", href: asset, internal: true };
}

export function scrollToHeading(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}