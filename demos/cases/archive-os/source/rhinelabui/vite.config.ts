import { defineConfig } from "vite";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

// MOTION-ATLAS: §3.5 retain one copy of each public resource at its original name.
const app = fileURLToPath(new URL("../../film/app/", import.meta.url));
const hasNovecento = ["Normal", "DemiBold", "Bold"].every(weight =>
  existsSync(`${app}/fonts/novecento/webFonts/NovecentoSansWide${weight}/font.woff2`),
);
export default defineConfig({
  base: "./",
  publicDir: false,
  define: {
    __RHINE_MODELS__: JSON.stringify({}),
    __RHINE_NOVECENTO__: JSON.stringify(hasNovecento),
  },
  build: { outDir: app, emptyOutDir: false },
});
