import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { atlasContent } from "./site/vite/atlas-plugin.ts";

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(here, "site"),
  base: "./",
  publicDir: path.join(here, "site/public"),
  plugins: [react(), atlasContent(here)],
  resolve: { alias: { "@": path.join(here, "site") } },
  server: { port: 5311, strictPort: true, fs: { allow: [here] } },
  build: { outDir: path.join(here, "dist"), emptyOutDir: true, chunkSizeWarningLimit: 4000 },
});
