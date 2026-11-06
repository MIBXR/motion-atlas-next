// 基于 hash 的路由：#/<路径>?<参数>。静态部署无需服务端回退，前进后退由浏览器历史负责。
import { useSyncExternalStore } from "react";

export interface Route { path: string; segs: string[]; params: URLSearchParams }
export type Params = Record<string, string | number | boolean | string[] | null | undefined>;

const listeners = new Set<() => void>();
let legacyMap: ((hash: string) => string | null) | null = null;

/** 内容里的 Demo 会链接回原站的 index.html#case/<id> 之类旧地址。 */
export function setLegacyHashMap(fn: (hash: string) => string | null) { legacyMap = fn; }

function read(): string {
  let h = location.hash.replace(/^#/, "");
  if (h && !h.startsWith("/") && legacyMap) {
    const mapped = legacyMap(decodeURIComponent(h));
    if (mapped) { history.replaceState(null, "", "#" + mapped); h = mapped; }
  }
  return h || "/";
}

let cachedKey = "";
let cached: Route = parse("/");
function parse(raw: string): Route {
  const [p = "/", q = ""] = raw.split("?");
  const segs = p.split("/").filter(Boolean).map(decodeURIComponent);
  return { path: p, segs, params: new URLSearchParams(q) };
}
function snapshot(): Route {
  const raw = read();
  if (raw !== cachedKey) { cachedKey = raw; cached = parse(raw); }
  return cached;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("hashchange", cb);
  return () => { listeners.delete(cb); window.removeEventListener("hashchange", cb); };
}

export function useRoute(): Route { return useSyncExternalStore(subscribe, snapshot); }

export function href(path: string, params?: Params): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v == null || v === false || v === "" || (Array.isArray(v) && !v.length)) continue;
    q.set(k, Array.isArray(v) ? v.join(",") : v === true ? "1" : String(v));
  }
  const qs = q.toString();
  return "#" + path + (qs ? "?" + qs : "");
}

/** replace 用于输入框这类连续变化，避免把每个按键都写进历史。 */
export function navigate(to: string, opts: { replace?: boolean } = {}) {
  if (opts.replace) {
    history.replaceState(history.state, "", to);
    listeners.forEach(fn => fn());
  } else location.hash = to.replace(/^#/, "");
}

export function paramList(params: URLSearchParams, key: string): string[] {
  return params.get(key)?.split(",").filter(Boolean) ?? [];
}

export function withParams(route: Route, patch: Params): string {
  const next: Params = {};
  route.params.forEach((v, k) => { next[k] = v; });
  return href(route.path, { ...next, ...patch });
}
