import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Crosshair, ExternalLink, LocateFixed, RefreshCw } from "lucide-react";
import SegmentedControl from "@/components/segmented-control/segmented-control";
import { Button } from "@/components/button/button";
import { Link, useRouter } from "../lib/router";
import { atlasUrl } from "../lib/format";
import { labelFor } from "../lib/filters";
import { useStageSize } from "../lib/useStageSize";
import type { AtlasEntry, FocusRecord, SourceRecord } from "../types";
import { useAtlas } from "../lib/atlas-context";
import { CoverImage } from "./EntryCard";

type FrameMode = "fit" | "desktop" | "mobile";

interface UniqueSource {
  caseId: string;
  record: SourceRecord;
  caseEntry: AtlasEntry;
  label: string;
  count: number;
}

interface Marker {
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
}

const ABORT_MESSAGE = "定位已取消";

function nextFrames(doc: Document, count = 2) {
  const win = doc.defaultView;
  return new Promise<void>((resolve) => {
    if (!win) return resolve();
    let remaining = count;
    const tick = () => {
      remaining -= 1;
      if (remaining <= 0) resolve();
      else win.requestAnimationFrame(tick);
    };
    win.requestAnimationFrame(tick);
  });
}

function delay(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort() {
      window.clearTimeout(timer);
      reject(new Error(ABORT_MESSAGE));
    }
    if (signal.aborted) return onAbort();
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

function findVisible(doc: Document, selector: string): HTMLElement | null {
  let elements: HTMLElement[];
  try {
    elements = Array.from(doc.querySelectorAll<HTMLElement>(selector));
  } catch {
    throw new Error(`定位选择器无效：${selector}`);
  }
  return elements.find((element) => element.getClientRects().length > 0) ?? null;
}

function findAny(doc: Document, selector: string): HTMLElement | null {
  try {
    return doc.querySelector<HTMLElement>(selector);
  } catch {
    throw new Error(`定位选择器无效：${selector}`);
  }
}

function waitForElement(doc: Document, selector: string, timeout: number, signal: AbortSignal, visible = true) {
  return new Promise<HTMLElement>((resolve, reject) => {
    const read = () => (visible ? findVisible(doc, selector) : findAny(doc, selector));
    const found = read();
    if (found) return resolve(found);
    const win = doc.defaultView;
    if (!win) return reject(new Error("来源 Demo 不可访问。"));
    let finished = false;
    let observer: MutationObserver | null = null;
    let timer = 0;
    const cleanup = () => {
      finished = true;
      observer?.disconnect();
      win.clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
    };
    const finish = (value: HTMLElement | null, error?: Error) => {
      if (finished) return;
      cleanup();
      if (value) resolve(value);
      else reject(error ?? new Error("等待目标超时"));
    };
    const check = () => {
      if (finished) return;
      try {
        const element = read();
        if (element) finish(element);
      } catch (error) {
        finish(null, error as Error);
      }
    };
    function onAbort() {
      finish(null, new Error(ABORT_MESSAGE));
    }
    if (signal.aborted) return onAbort();
    signal.addEventListener("abort", onAbort, { once: true });
    observer = new MutationObserver(check);
    observer.observe(doc.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
    timer = win.setTimeout(() => finish(null, new Error("定位目标没有在预期时间内出现。")), timeout);
    check();
  });
}

async function waitImages(doc: Document, selector: string, signal: AbortSignal) {
  const container = findAny(doc, selector);
  if (!container) return;
  const images = Array.from(container.querySelectorAll<HTMLImageElement>("img")).filter((image) => image.clientWidth > 0);
  await Promise.all(
    images.map(async (image) => {
      if (!image.complete) {
        await new Promise<void>((resolve) => {
          const done = () => {
            image.removeEventListener("load", done);
            image.removeEventListener("error", done);
            resolve();
          };
          image.addEventListener("load", done, { once: true });
          image.addEventListener("error", done, { once: true });
          signal.addEventListener("abort", done, { once: true });
        });
      }
      try {
        await image.decode();
      } catch {
        // A failed image should not stop the locator; the target can still be marked.
      }
    })
  );
}

async function waitVideo(doc: Document, selector: string, timeout: number, signal: AbortSignal) {
  const video = (await waitForElement(doc, selector, timeout, signal, false)) as HTMLVideoElement;
  if (video.readyState >= 2 && !video.seeking) return;
  await new Promise<void>((resolve, reject) => {
    const win = doc.defaultView;
    if (!win) return resolve();
    let finished = false;
    const cleanup = () => {
      finished = true;
      video.removeEventListener("loadeddata", check);
      video.removeEventListener("seeked", check);
      win.clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
    };
    const check = () => {
      if (finished) return;
      if (video.readyState >= 2 && !video.seeking) {
        cleanup();
        resolve();
      }
    };
    function onAbort() {
      if (finished) return;
      cleanup();
      reject(new Error(ABORT_MESSAGE));
    }
    const timer = win.setTimeout(() => {
      cleanup();
      resolve();
    }, timeout);
    if (signal.aborted) return onAbort();
    signal.addEventListener("abort", onAbort, { once: true });
    video.addEventListener("loadeddata", check);
    video.addEventListener("seeked", check);
    check();
  });
}

async function runPreparation(doc: Document, focus: FocusRecord, signal: AbortSignal) {
  const win = doc.defaultView;
  if (!win) throw new Error("来源 Demo 不可访问。");
  for (const step of focus.prepare ?? []) {
    if (signal.aborted) throw new Error(ABORT_MESSAGE);
    if (step.maxWidth && win.innerWidth > step.maxWidth) continue;
    if (step.minWidth && win.innerWidth < step.minWidth) continue;
    if (step.key) {
      win.dispatchEvent(new win.KeyboardEvent("keydown", { key: step.key, bubbles: true }));
    }
    if (step.scroll) {
      const element = findAny(doc, step.scroll);
      element?.scrollIntoView({ block: "center", inline: "center" });
    }
    if (step.images) {
      await waitImages(doc, step.images, signal);
    }
    if (step.video) {
      await waitVideo(doc, step.video, 12000, signal);
    }
    if (step.click) {
      const element = findVisible(doc, step.click);
      element?.click();
    }
    if (step.input) {
      const element = findAny(doc, step.input) as HTMLInputElement | HTMLTextAreaElement | null;
      if (element) {
        element.value = step.value ?? "";
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    if (step.waitFor) {
      await waitForElement(doc, step.waitFor, 16000, signal);
    }
    await nextFrames(doc, 2);
  }
}

function initialMode(focus: FocusRecord | undefined, caseId: string): FrameMode {
  if (focus?.viewport === "mobile") return "mobile";
  if (focus?.viewport === "wide") return "desktop";
  if (caseId === "chatgpt-platform") return "desktop";
  return "fit";
}

function markerFromTarget(target: HTMLElement, iframe: HTMLIFrameElement, stage: HTMLElement, scale: number, label: string): Marker | null {
  if (!target.isConnected) return null;
  const rect = target.getBoundingClientRect();
  if (!rect.width && !rect.height) return null;
  const frameRect = iframe.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  return {
    left: frameRect.left - stageRect.left + rect.left * scale,
    top: frameRect.top - stageRect.top + rect.top * scale,
    width: rect.width * scale,
    height: rect.height * scale,
    label
  };
}

export function WebPatternLocator({ entry }: { entry: AtlasEntry }) {
  const { meta } = useAtlas();
  const { params, navigate, pathname } = useRouter();
  const [stageRef, size] = useStageSize<HTMLDivElement>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [mode, setMode] = useState<FrameMode>("fit");
  const [status, setStatus] = useState<"loading" | "locating" | "found" | "error" | "unavailable">("loading");
  const [message, setMessage] = useState("");
  const [marker, setMarker] = useState<Marker | null>(null);
  const [nonce, setNonce] = useState(0);

  const sources = useMemo(() => {
    const caseMap = new Map(meta.entries.cases.map((item) => [item.id, item]));
    const unique: UniqueSource[] = [];
    const seen = new Set<string>();
    for (const source of entry.sources ?? []) {
      if (!source.caseId) continue;
      if (seen.has(source.caseId)) {
        const existing = unique.find((item) => item.caseId === source.caseId);
        if (existing) existing.count += 1;
        continue;
      }
      const caseEntry = caseMap.get(source.caseId);
      if (!caseEntry) continue;
      seen.add(source.caseId);
      unique.push({
        caseId: source.caseId,
        record: source,
        caseEntry,
        label: caseEntry.title,
        count: 1
      });
    }
    return unique;
  }, [entry.sources, meta.entries.cases]);

  const requestedSource = params.get("source");
  const selectedSource = sources.find((source) => source.caseId === requestedSource) ?? sources[0];
  const focus = selectedSource?.record.focus;
  const demoPath = focus?.entrypoint ?? selectedSource?.caseEntry.demo;
  const demoUrl = demoPath ? atlasUrl(demoPath) : "";
  const sourceKey = `${selectedSource?.caseId ?? "none"}-${nonce}-${mode}`;
  const scale = useMemo(() => {
    const target = mode === "desktop" ? 1440 : mode === "mobile" ? 390 : null;
    return target && size.width ? Math.min(1, size.width / target) : 1;
  }, [mode, size.width]);
  const frameWidth = mode === "desktop" ? 1440 : mode === "mobile" ? 390 : Math.max(size.width, 1);
  const frameHeight = size.height ? size.height / scale : 1;
  const viewportWidth = mode === "fit" ? size.width : Math.min(size.width, frameWidth);

  useEffect(() => {
    if (!selectedSource) {
      setStatus("unavailable");
      setMessage("这条巧思没有可用的来源案例。");
      return;
    }
    setMode(initialMode(selectedSource.record.focus, selectedSource.caseId));
    setFrameLoaded(false);
    setMarker(null);
    setStatus("loading");
  }, [selectedSource?.caseId]);

  useEffect(() => {
    setFrameLoaded(false);
    setMarker(null);
    setStatus("loading");
  }, [mode, nonce]);

  useEffect(() => {
    if (!frameLoaded || !iframeRef.current || !selectedSource || !focus) return;
    const iframe = iframeRef.current;
    const stage = stageRef.current;
    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    if (!win || !doc || !stage) {
      setStatus("error");
      setMessage("无法访问来源 Demo。");
      return;
    }
    const activeFocus = focus;
    const activeDoc = doc;
    const activeStage = stage;
    const controller = new AbortController();
    const signal = controller.signal;
    let frame = 0;
    let tracking = false;

    const track = (target: HTMLElement) => {
      tracking = true;
      const loop = () => {
        if (signal.aborted || !tracking) return;
        const next = markerFromTarget(target, iframe, activeStage, scale, activeFocus.label);
        setMarker(next);
        if (!next) {
          tracking = false;
          return;
        }
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    };

    async function locate() {
      setStatus("locating");
      setMessage("正在等待来源画面就绪…");
      try {
        if (activeFocus.phase !== "loading") {
          await Promise.race([activeDoc.fonts.ready.catch(() => undefined), delay(4000, signal)]);
          const caseLoading = (win as Window & { CaseLoading?: { ready?: Promise<unknown> } }).CaseLoading;
          if (caseLoading?.ready) {
            await Promise.race([Promise.resolve(caseLoading.ready).catch(() => undefined), delay(12000, signal)]);
          }
        } else {
          await nextFrames(activeDoc, 1);
        }
        if (signal.aborted) throw new Error(ABORT_MESSAGE);
        setMessage("正在执行定位前的操作…");
        await runPreparation(activeDoc, activeFocus, signal);
        if (signal.aborted) throw new Error(ABORT_MESSAGE);
        setMessage("正在查找定位目标…");
        const target = await waitForElement(activeDoc, activeFocus.target, 20000, signal);
        await nextFrames(activeDoc, 2);
        if (signal.aborted) throw new Error(ABORT_MESSAGE);

        target.scrollIntoView({ block: "center", inline: "center", behavior: "auto" });
        await nextFrames(activeDoc, 2);

        if (activeFocus.replay) {
          const nodes = Array.from(activeDoc.querySelectorAll<HTMLElement>(activeFocus.replay));
          const previous = nodes.map((node) => node.style.animationName);
          nodes.forEach((node) => {
            node.style.animationName = "none";
          });
          await nextFrames(activeDoc, 2);
          nodes.forEach((node, index) => {
            node.style.animationName = previous[index] ?? "";
          });
        }

        const next = markerFromTarget(target, iframe, activeStage, scale, activeFocus.label);
        setMarker(next);
        if (!next) throw new Error("定位目标没有布局尺寸。");
        setStatus("found");
        setMessage("已定位到来源 Demo 中的对应位置。");
        track(target);
      } catch (error) {
        if (signal.aborted) return;
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "定位失败。");
      }
    }

    void locate();
    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      tracking = false;
    };
  }, [frameLoaded, focus, mode, nonce, scale, selectedSource, stageRef]);

  const reload = useCallback(() => {
    setNonce((value) => value + 1);
  }, []);

  function switchSource(caseId: string) {
    if (!selectedSource || caseId === selectedSource.caseId) return;
    navigate(`${pathname}?source=${encodeURIComponent(caseId)}`, { preserveScroll: true });
  }

  if (!sources.length) {
    return (
      <section className="demoPanel locatorPanel">
        <div className="locatorUnavailable">这条巧思没有记录可运行的来源案例。</div>
      </section>
    );
  }

  return (
    <section className="demoPanel locatorPanel" aria-label="来源案例定位 Demo">
      <header className="demoToolbar locatorToolbar">
        <div className="demoToolbarTitle">
          <Crosshair size={16} strokeWidth={1.7} aria-hidden="true" />
          <span className="monoLabel">SOURCE DEMO / 来源定位</span>
          <span className="demoTitleText">{selectedSource?.label}</span>
        </div>
        <div className="demoControls">
          <SegmentedControl
            label="定位视口"
            options={[
              { value: "fit", label: "适应" },
              { value: "desktop", label: "桌面" },
              { value: "mobile", label: "手机" }
            ]}
            value={mode}
            onValueChange={(value) => setMode(value as FrameMode)}
          />
          <Button variant="secondary" size="sm" onClick={reload}>
            <RefreshCw size={14} strokeWidth={1.8} aria-hidden="true" />
            重新定位
          </Button>
          <a className="demoOpenLink" href={demoUrl} target="_blank" rel="noreferrer noopener">
            <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
            打开来源 Demo
          </a>
        </div>
      </header>

      <div className="locatorSources" role="group" aria-label="切换来源案例">
        {sources.map((source, index) => (
          <button
            type="button"
            className={source.caseId === selectedSource?.caseId ? "is-active" : ""}
            key={source.caseId}
            aria-pressed={source.caseId === selectedSource?.caseId}
            onClick={() => switchSource(source.caseId)}
          >
            <span className="locatorSourceIndex">{String(index + 1).padStart(2, "0")}</span>
            <span>{source.label}</span>
            {source.count > 1 && <small>{source.count} 条记录</small>}
          </button>
        ))}
      </div>

      <div className="locatorStageMount">
        <div className="demoStage locatorStage" ref={stageRef}>
          <div
            className="demoFrameSlot"
            style={{ width: viewportWidth ? `${viewportWidth}px` : "100%", height: size.height ? `${size.height}px` : "100%" }}
          >
            <div className="demoFrame" style={{ width: `${frameWidth}px`, height: `${frameHeight}px`, transform: `scale(${scale})` }}>
              <iframe
                key={sourceKey}
                ref={iframeRef}
                src={demoUrl}
                title={`${selectedSource?.label ?? "来源案例"} Demo`}
                onLoad={() => setFrameLoaded(true)}
                allow="fullscreen"
              />
            </div>
          </div>
          {!frameLoaded && (
            <div className="demoLoading">
              {entry.cover && <CoverImage src={entry.cover} alt="" fallbackLabel="" className="demoPoster" />}
              <div className="demoLoadingCard">
                <span className="spinnerDot" aria-hidden="true" />
                <span>正在载入来源案例</span>
              </div>
            </div>
          )}
          {marker && (
            <div
              className="locatorMarker"
              style={{ left: marker.left - 6, top: marker.top - 6, width: marker.width + 12, height: marker.height + 12 }}
            >
              <span className="locatorMarkerLabel">{marker.label}</span>
              <span className="locatorMarkerCorner tl" aria-hidden="true" />
              <span className="locatorMarkerCorner tr" aria-hidden="true" />
              <span className="locatorMarkerCorner bl" aria-hidden="true" />
              <span className="locatorMarkerCorner br" aria-hidden="true" />
            </div>
          )}
          {status === "locating" && frameLoaded && (
            <div className="locatorLocatingBadge">
              <span className="spinnerDot" aria-hidden="true" />
              正在定位
            </div>
          )}
        </div>
      </div>

      <div className="locatorStatus">
        <div className={`locatorStatusIcon is-${status}`} aria-hidden="true">
          <LocateFixed size={18} strokeWidth={1.6} />
        </div>
        <div className="locatorStatusMain">
          <span className="monoLabel">
            {status === "found" ? "LOCATED" : status === "error" ? "LOCATE FAILED" : "LOCATING"}
            {focus?.label ? ` / ${focus.label}` : ""}
          </span>
          <p>{focus?.instruction ?? "在来源案例中查看这条机制的实现。"}</p>
          {message && <small className={`locatorMessage ${status === "error" ? "is-error" : ""}`}>{message}</small>}
        </div>
        <div className="locatorStatusMeta">
          {selectedSource && (
            <>
              <Link to={`/cases/${encodeURIComponent(selectedSource.caseId)}`}>查看来源案例 ↗</Link>
              <span>
                {selectedSource.record.evidence
                  ? labelFor(meta.labels, "patterns", "sources[].evidence", selectedSource.record.evidence)
                  : "来源记录"}
                {selectedSource.record.capturedAt ? ` · ${selectedSource.record.capturedAt}` : ""}
              </span>
            </>
          )}
          {focus?.phase === "loading" && <span>加载中定位</span>}
          {focus?.prepare?.length ? <span>{focus.prepare.length} 步准备操作</span> : null}
        </div>
      </div>
      <footer className="demoFoot">
        <span>{borderLabel(mode)}</span>
        <span>{focus?.target ? `目标 ${focus.target}` : ""}</span>
      </footer>
    </section>
  );
}

function borderLabel(mode: FrameMode) {
  if (mode === "desktop") return "按 1440px 排版并定位";
  if (mode === "mobile") return "按 390px 排版并定位";
  return "按可用宽度排版并定位";
}