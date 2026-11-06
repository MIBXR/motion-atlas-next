import sirv from "sirv";
import type { Plugin } from "vite";

const CONTENT_PATHS = [
  "agent/", "data/", "demos/", "docs/", "entries/", "kit/", "previews/", "prompts/",
  "scripts/templates/", "site/runtime/", "site/icons/", "asset-cache-worker.js",
  "README.md", "CONTRIBUTING.md", "AGENTS.md",
];

export function atlasContent(root: string): Plugin {
  return {
    name: "atlas-content",
    configureServer(server) {
      const serve = sirv(root, { dev: true, etag: true });
      server.middlewares.use((req, res, next) => {
        decodeReserved(req);
        const url = decodeURIComponent((req.url ?? "/").split("?")[0]!);
        if (!CONTENT_PATHS.some(p => p.endsWith("/") ? url.startsWith("/" + p) || url === "/" + p.slice(0, -1) : url === "/" + p)) return next();
        serve(req, res, () => { res.statusCode = 404; res.end("Not found"); });
      });
    },
  };
}

/** Demo 里有 `vendor/three%400.185.1/...` 这样把 @ 编码成 %40 的地址（如 import map）。sirv 只用 decodeURI 解码，
 *  不会还原 @、+、, 等保留字符，于是找不到 `three@0.185.1` 目录。这里先把这些保留字符还原，/ ? # 保持编码。 */
function decodeReserved(req: { url?: string }) {
  if (!req.url) return;
  const i = req.url.indexOf("?");
  const path = i < 0 ? req.url : req.url.slice(0, i);
  const fixed = path.replace(/%(40|3A|2B|2C|24|3B|3D|26)/gi, m => decodeURIComponent(m));
  if (fixed !== path) req.url = fixed + (i < 0 ? "" : req.url.slice(i));
}

