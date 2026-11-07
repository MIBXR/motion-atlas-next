import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { atlasAliases, atlasContentPlugin } from "../shared/vite/atlas-content.mjs";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  base: "./",
  plugins: [
    react(),
    atlasContentPlugin({
      library: "motion",
      contentRoot: resolve(root, "../../content/motion")
    })
  ],
  resolve: {
    alias: atlasAliases(root)
  },
  server: {
    port: 5222,
    strictPort: true
  },
  preview: {
    port: 5222,
    strictPort: true
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 1000
  }
});