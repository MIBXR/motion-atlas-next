import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GLOBAL_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".m4v": "video/mp4",
  ".mov": "video/quicktime",
  ".m4a": "audio/mp4",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".oga": "audio/ogg",
  ".wav": "audio/wav",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".wasm": "application/wasm",
  ".pdf": "application/pdf",
  ".map": "application/json; charset=utf-8"
};

const WEB_GROUP_ORDER = ["项目指南", "研究方法与索引", "案例研究", "素材使用", "复用 Prompt", "条目文档"];
const WEB_GROUP_RULES = [
  [/^docs\/guide\.md$/, "项目指南"],
  [/^docs\/agent\.md$/, "项目指南"],
  [/^docs\/cases\//, "案例研究"],
  [/^docs\/patterns\//, "研究方法与索引"],
  [/^docs\/materials\//, "素材使用"],
  [/^prompts\//, "复用 Prompt"],
  [/^demos\/materials\//, "条目文档"],
  [/^demos\//, "条目文档"],
  [/^docs\//, "研究方法与索引"]
];

const MOTION_GROUP_ORDER = ["指南", "案例研究", "巧思研究", "素材说明", "案例 Prompt", "巧思 Prompt", "素材原文", "条目文档"];
const MOTION_GROUP_RULES = [
  [/^docs\/cases\//, "案例研究"],
  [/^docs\/patterns\//, "巧思研究"],
  [/^docs\/materials\//, "素材说明"],
  [/^prompts\/cases\//, "案例 Prompt"],
  [/^prompts\/patterns\//, "巧思 Prompt"],
  [/^demos\/materials\//, "素材原文"],
  [/^demos\//, "条目文档"],
  [/^docs\//, "指南"],
  [/^prompts\//, "条目文档"]
];

function cleanTitle(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "").replace(/^\u200B/, "");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { body: text, frontmatter: "" };
  return { body: text.slice(match[0].length), frontmatter: match[1] ?? "" };
}

function frontmatterValue(frontmatter, key) {
  const line = frontmatter.split(/\r?\n/).find((item) => new RegExp(`^${key}:`).test(item));
  if (!line) return "";
  return line
    .replace(new RegExp(`^${key}:\\s*`), "")
    .replace(/^["']|["']$/g, "")
    .trim();
}

function documentTitle(body, frontmatter, file, library) {
  let probe = body;
  if (library === "motion") {
    probe = probe.replace(/<!--[\s\S]*?-->/g, "").replace(/```[\s\S]*?```/g, "").replace(/\r\n/g, "\n");
  }
  const heading = probe.match(/^#\s+(.+)$/m)?.[1];
  const title = cleanTitle(heading || frontmatterValue(frontmatter, "title") || frontmatterValue(frontmatter, "name") || path.basename(file, ".md"));
  return library === "motion" ? title.replaceAll("/", "／") : title;
}

function docGroup(relativePath, library) {
  const rules = library === "web" ? WEB_GROUP_RULES : MOTION_GROUP_RULES;
  for (const [pattern, group] of rules) {
    if (pattern.test(relativePath)) return group;
  }
  return library === "web" ? "条目文档" : "条目文档";
}

function plainExcerpt(body) {
  return cleanTitle(
    body
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/[>*_~|-]/g, " ")
  ).slice(0, 180);
}

function walkMarkdown(dir, root, visited, result) {
  let real = dir;
  try {
    real = fs.realpathSync(dir);
  } catch {
    return;
  }
  if (visited.has(real)) return;
  visited.add(real);
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    let stat;
    try {
      stat = fs.statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) walkMarkdown(full, root, visited, result);
    else if (stat.isFile() && item.name.endsWith(".md")) {
      result.push(path.relative(root, full).replaceAll("\\", "/"));
    }
  }
}

function buildDocs(contentRoot, library) {
  const paths = [];
  const visited = new Set();
  for (const dir of ["docs", "prompts", "demos"]) {
    const full = path.join(contentRoot, dir);
    if (fs.existsSync(full)) walkMarkdown(full, contentRoot, visited, paths);
  }
  const docs = paths.map((relativePath) => {
    const raw = fs.readFileSync(path.join(contentRoot, relativePath), "utf8");
    const { body, frontmatter } = parseFrontmatter(raw);
    const title = documentTitle(body, frontmatter, relativePath, library);
    const group = docGroup(relativePath, library);
    return {
      path: relativePath,
      title,
      group,
      excerpt: plainExcerpt(body),
      content: body,
      bytes: Buffer.byteLength(raw),
      hidden: relativePath.startsWith("demos/")
    };
  });
  const groupOrder = library === "web" ? WEB_GROUP_ORDER : MOTION_GROUP_ORDER;
  docs.sort((a, b) => {
    const groupDelta = groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
    if (groupDelta) return groupDelta;
    const titleDelta = a.title.localeCompare(b.title, "zh-CN");
    if (titleDelta) return titleDelta;
    return a.path.localeCompare(b.path);
  });
  return docs;
}

function findCover(contentRoot, kind, id) {
  for (const extension of GLOBAL_EXTENSIONS) {
    const candidate = `previews/${kind}/${id}${extension}`;
    if (fs.existsSync(path.join(contentRoot, candidate))) return candidate;
  }
  return null;
}

function enrichEntries(contentRoot, library) {
  const entries = {};
  for (const kind of ["cases", "patterns", "materials"]) {
    const dir = path.join(contentRoot, "entries", kind);
    entries[kind] = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")))
      .sort((a, b) => a.order - b.order)
      .map((entry) => {
        const result = { ...entry };
        if (library === "web") {
          result.cover = entry.preview ?? null;
          if (kind === "cases" && entry.previewMobile) result.coverMobile = entry.previewMobile;
        } else if (kind === "materials") {
          result.cover = entry.preview ?? entry.gallery?.[0]?.path ?? findCover(contentRoot, kind, entry.id);
          result.coverPortrait = findCover(contentRoot, kind, `${entry.id}-portrait`);
        } else {
          result.cover = findCover(contentRoot, kind, entry.id);
          result.coverPortrait = findCover(contentRoot, kind, `${entry.id}-portrait`);
        }
        return result;
      });
  }
  if (library === "web") {
    const casesById = new Map(entries.cases.map((entry) => [entry.id, entry]));
    for (const pattern of entries.patterns) {
      if (pattern.cover) continue;
      const sourceCase = pattern.sources?.find((source) => source.caseId)?.caseId;
      pattern.cover = casesById.get(sourceCase)?.cover ?? null;
    }
  }
  return entries;
}

function buildMeta(contentRoot, library) {
  const labels = JSON.parse(fs.readFileSync(path.join(contentRoot, "labels.json"), "utf8"));
  const entries = enrichEntries(contentRoot, library);
  const docs = buildDocs(contentRoot, library);
  return {
    library,
    counts: {
      cases: entries.cases.length,
      patterns: entries.patterns.length,
      materials: entries.materials.length
    },
    entries,
    labels,
    docs: docs.map(({ content, ...meta }) => meta),
    docGroups: (library === "web" ? WEB_GROUP_ORDER : MOTION_GROUP_ORDER).filter((group) =>
      docs.some((doc) => doc.group === group)
    )
  };
}

function withDocsContent(meta, docs) {
  return { docs };
}

function mimeFor(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function createContentMiddleware(contentRoot) {
  const resolvedRoot = path.resolve(contentRoot);
  return function serveAtlas(req, res, next) {
    if (!req.url || !["GET", "HEAD"].includes(req.method ?? "GET")) return next();
    let url;
    try {
      url = new URL(req.url, "http://atlas.local");
    } catch {
      return next();
    }
    if (!url.pathname.startsWith("/atlas/")) return next();
    const decoded = decodeURIComponent(url.pathname.slice("/atlas/".length));
    const target = path.resolve(resolvedRoot, decoded);
    if (target !== resolvedRoot && !target.startsWith(`${resolvedRoot}${path.sep}`)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }
    let stat;
    let filePath = target;
    try {
      stat = fs.statSync(target);
      if (stat.isDirectory()) {
        filePath = path.join(target, "index.html");
        stat = fs.statSync(filePath);
      }
    } catch {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    if (!stat.isFile()) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    const total = stat.size;
    const headers = {
      "Content-Type": mimeFor(filePath),
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-cache",
      "Cross-Origin-Resource-Policy": "same-origin"
    };
    if (path.basename(filePath) === "asset-cache-worker.js") {
      headers["Service-Worker-Allowed"] = "/atlas/";
    }
    let start = 0;
    let end = total - 1;
    let status = 200;
    const range = req.headers.range;
    if (range) {
      const match = range.match(/^bytes=(\d*)-(\d*)$/);
      if (match) {
        if (match[1]) {
          start = Number(match[1]);
          end = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1;
        } else if (match[2]) {
          start = Math.max(0, total - Number(match[2]));
          end = total - 1;
        }
        if (start >= total || start > end) {
          res.writeHead(416, { "Content-Range": `bytes */${total}` });
          res.end();
          return;
        }
        status = 206;
        headers["Content-Range"] = `bytes ${start}-${end}/${total}`;
      }
    }
    headers["Content-Length"] = String(end - start + 1);
    res.writeHead(status, headers);
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    const stream = fs.createReadStream(filePath, { start, end });
    stream.on("error", () => {
      if (!res.headersSent) res.statusCode = 500;
      res.end();
    });
    stream.pipe(res);
  };
}

async function linkOrCopy(source, target) {
  try {
    await fsp.link(source, target);
    return "linked";
  } catch {
    await fsp.copyFile(source, target);
    return "copied";
  }
}

async function copyTree(source, target, stats) {
  await fsp.mkdir(target, { recursive: true });
  const items = await fsp.readdir(source, { withFileTypes: true });
  const directories = [];
  const files = [];
  for (const item of items) {
    const from = path.join(source, item.name);
    let stat;
    try {
      stat = await fsp.stat(from);
    } catch {
      continue;
    }
    if (stat.isDirectory()) directories.push({ from, to: path.join(target, item.name) });
    else if (stat.isFile()) files.push({ from, to: path.join(target, item.name), size: stat.size });
  }
  for (const directory of directories) {
    await copyTree(directory.from, directory.to, stats);
  }
  let cursor = 0;
  const workers = Array.from({ length: Math.min(24, files.length) }, async () => {
    while (cursor < files.length) {
      const file = files[cursor++];
      const mode = await linkOrCopy(file.from, file.to);
      stats.files += 1;
      stats.bytes += file.size;
      stats[mode] += 1;
    }
  });
  await Promise.all(workers);
}

export function atlasContentPlugin({ library, contentRoot }) {
  const contentRootResolved = path.resolve(contentRoot);
  let metaCache;
  let docsCache;
  const getMeta = () => (metaCache ??= buildMeta(contentRootResolved, library));
  const getDocs = () =>
    (docsCache ??= buildDocs(contentRootResolved, library).map(({ path: docPath, title, group, hidden, bytes, content }) => ({
      path: docPath,
      title,
      group,
      hidden,
      bytes,
      content
    })));

  const metaId = "virtual:atlas-meta";
  const docsId = "virtual:atlas-docs";
  const resolvedMetaId = `\0${metaId}`;
  const resolvedDocsId = `\0${docsId}`;
  let outputDirectory = path.resolve("dist");
  let contentCopied = false;
  let isBuild = false;

  return {
    name: `atlas-content-${library}`,
    enforce: "pre",
    configResolved(config) {
      isBuild = config.command === "build";
      outputDirectory = path.resolve(config.root, config.build.outDir);
    },
    resolveId(id) {
      if (id === metaId) return resolvedMetaId;
      if (id === docsId) return resolvedDocsId;
      return null;
    },
    load(id) {
      if (id === resolvedMetaId) {
        return `export default ${JSON.stringify(getMeta())};`;
      }
      if (id === resolvedDocsId) {
        return `export default ${JSON.stringify(withDocsContent(getMeta(), getDocs()))};`;
      }
      return null;
    },
    configureServer(server) {
      server.middlewares.use(createContentMiddleware(contentRootResolved));
    },
    async closeBundle() {
      if (!isBuild || contentCopied) return;
      contentCopied = true;
      const target = path.join(outputDirectory, "atlas");
      const stats = { files: 0, bytes: 0, linked: 0, copied: 0 };
      const started = Date.now();
      await copyTree(contentRootResolved, target, stats);
      const elapsed = ((Date.now() - started) / 1000).toFixed(1);
      console.log(
        `\n[atlas] ${library}: ${stats.files.toLocaleString("zh-CN")} files / ${(stats.bytes / 1024 / 1024).toFixed(1)} MB → dist/atlas (${stats.linked} 硬链接, ${stats.copied} 复制, ${elapsed}s)`
      );
    }
  };
}

export function atlasAliases(appRoot) {
  const shared = path.resolve(appRoot, "../shared");
  const arc = path.join(shared, "ui/arc");
  return [
    { find: /^@shared\//, replacement: `${shared}/` },
    { find: /^@\//, replacement: `${arc}/` }
  ];
}

export function atlasProjectRoot(metaUrl) {
  return path.dirname(fileURLToPath(metaUrl));
}