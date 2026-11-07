import type { DocsBundle } from "../types";

let bundlePromise: Promise<DocsBundle> | null = null;

export function loadDocs() {
  if (!bundlePromise) {
    bundlePromise = import("virtual:atlas-docs").then((module) => module.default);
  }
  return bundlePromise;
}

export function findDoc(bundle: DocsBundle | null, path: string | null) {
  if (!bundle || !path) return undefined;
  return bundle.docs.find((doc) => doc.path === path);
}