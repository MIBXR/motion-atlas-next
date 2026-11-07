import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX
} from "lucide-react";
import SegmentedControl from "@/components/segmented-control/segmented-control";
import { Button } from "@/components/button/button";
import type { AtlasEntry } from "../types";
import { atlasUrl, formatTimecode, withDemoParams } from "../lib/format";
import { CoverImage } from "./EntryCard";

interface RuntimeMotion {
  duration: number;
  time: number;
  playing: boolean;
  progress?: number;
  fps?: number;
  markers?: { t: number; label: string }[];
  orients?: string[];
  orient?: string | null;
  ready?: Promise<unknown>;
  on?: {
    (callback: (time: number, playing: boolean) => void): () => void;
    (event: string, callback: (...args: unknown[]) => void): () => void;
  };
  seek?: (time: number) => Promise<number> | number;
  play?: () => void;
  pause?: () => void;
  setOrient?: (orient: string) => Promise<boolean> | boolean;
}

interface LoadingState {
  progress: number;
  phase: string;
  loadedBytes: number;
  totalBytes: number;
  filesDone: number;
  filesTotal: number;
  unknownTotal: boolean;
}

interface Beat {
  t: number;
  label: string;
  note?: string;
}

type Orient = "landscape" | "portrait";
type SoundState = "off" | "on" | "blocked" | "pending";

const PHASE_LABEL: Record<string, string> = {
  download: "下载资源",
  decode: "解码画面",
  frame: "准备首帧",
  ready: "就绪",
  error: "载入失败"
};

const SEEK_STEP = 2;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function makeEnergyPath(entry: AtlasEntry, duration: number) {
  if (duration <= 0) return null;
  const points: [number, number][] = [];
  if (entry.energySegments?.length) {
    for (const segment of entry.energySegments) {
      if (segment.t0 === undefined || segment.t1 === undefined) continue;
      if (segment.from !== undefined) points.push([segment.t0 / duration, segment.from]);
      if (segment.to !== undefined) points.push([segment.t1 / duration, segment.to]);
    }
  } else if (entry.energy?.length) {
    const last = Math.max(1, entry.energy.length - 1);
    entry.energy.forEach((value, index) => points.push([index / last, value]));
  }
  if (!points.length) return null;
  const coords = points
    .sort((a, b) => a[0] - b[0])
    .map(([x, y]) => [clamp(x, 0, 1) * 1000, (1 - clamp(y, 0, 1)) * 92 + 4] as const);
  const line = coords.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `M0 96 L${coords.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")} L1000 96 Z`;
  return { line, area };
}

export function MotionPlayer({ entry, kind }: { entry: AtlasEntry; kind: "cases" | "patterns" }) {
  const rootRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const runtimeRef = useRef<RuntimeMotion | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const lastUpdateRef = useRef(0);
  const [nonce, setNonce] = useState(0);
  const initialOrient = useMemo<Orient>(() => {
    if (entry.orients?.includes("landscape")) return "landscape";
    if (entry.orients?.includes("portrait")) return "portrait";
    return "landscape";
  }, [entry.orients]);
  const previewAt = Math.max(0, entry.previewAt ?? 0);
  const src = useMemo(
    () =>
      entry.demo
        ? withDemoParams(entry.demo, {
            embed: "1",
            autoplay: "0",
            orient: initialOrient,
            t: previewAt,
            sound: "0"
          })
        : "",
    [entry.demo, initialOrient, previewAt]
  );
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    progress: 0,
    phase: "download",
    loadedBytes: 0,
    totalBytes: 0,
    filesDone: 0,
    filesTotal: 0,
    unknownTotal: false
  });
  const [duration, setDuration] = useState(entry.rhythm?.duration ?? 0);
  const [time, setTime] = useState(previewAt);
  const [playing, setPlaying] = useState(false);
  const [orients, setOrients] = useState<string[]>(entry.orients ?? []);
  const [orientation, setOrientation] = useState<Orient>(initialOrient);
  const [runtimeBeats, setRuntimeBeats] = useState<Beat[]>([]);
  const [soundAvailable, setSoundAvailable] = useState<boolean | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [soundState, setSoundState] = useState<SoundState>("off");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const entryBeats = useMemo<Beat[]>(() => {
    if (kind === "cases" && entry.rhythm?.beats?.length) return entry.rhythm.beats;
    return runtimeBeats;
  }, [entry.rhythm, kind, runtimeBeats]);

  const beats = useMemo(() => {
    const limit = duration > 0 ? duration + 0.001 : Number.POSITIVE_INFINITY;
    return entryBeats
      .filter((beat) => Number.isFinite(beat.t) && beat.t >= 0 && beat.t <= limit)
      .sort((a, b) => a.t - b.t);
  }, [duration, entryBeats]);

  const timelineDuration = duration > 0 ? duration : 1;
  const progressPercent = clamp((time / timelineDuration) * 100, 0, 100);
  const currentBeat = [...beats].reverse().find((beat) => beat.t <= time + 0.02);
  const energy = useMemo(() => makeEnergyPath(entry, duration || entry.rhythm?.duration || 0), [duration, entry]);
  const supportedOrients = orients.filter((value): value is Orient => value === "landscape" || value === "portrait");
  const canSwitchOrient = supportedOrients.length > 1;

  const connect = useCallback(
    (motion: RuntimeMotion) => {
      if (runtimeRef.current === motion) return;
      runtimeRef.current = motion;
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;

      const applyReady = () => {
        const realDuration = Number.isFinite(motion.duration) && motion.duration > 0 ? motion.duration : entry.rhythm?.duration ?? 0;
        setDuration(realDuration);
        setTime(Number.isFinite(motion.time) ? motion.time : 0);
        setPlaying(Boolean(motion.playing));
        setOrients(motion.orients?.length ? motion.orients : entry.orients ?? []);
        setOrientation(motion.orient === "portrait" ? "portrait" : motion.orient === "landscape" ? "landscape" : initialOrient);
        if (motion.markers?.length) {
          setRuntimeBeats(motion.markers.filter((marker) => Number.isFinite(marker.t)).map((marker) => ({ t: marker.t, label: marker.label })));
        }
        setLoading((current) => ({ ...current, progress: 1, phase: "ready" }));
        setReady(true);
        setError(null);
        if (typeof motion.on === "function") {
          unsubscribeRef.current = motion.on((nextTime, nextPlaying) => {
            const now = performance.now();
            if (now - lastUpdateRef.current < 30) return;
            lastUpdateRef.current = now;
            setTime(Number.isFinite(nextTime) ? nextTime : 0);
            setPlaying(Boolean(nextPlaying));
          });
        }
      };

      if (motion.ready && typeof motion.ready.then === "function") {
        void Promise.resolve(motion.ready)
          .then(applyReady)
          .catch((reason: unknown) => {
            setLoading((current) => ({ ...current, phase: "error" }));
            setError(reason instanceof Error ? reason.message : "Demo 资源没有成功载入。");
          });
      } else if (motion.duration > 0) {
        applyReady();
      }
    },
    [entry.orients, entry.rhythm?.duration, initialOrient]
  );

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    let polls = 0;
    setReady(false);
    setError(null);
    setFrameLoaded(false);
    setLoading({ progress: 0, phase: "download", loadedBytes: 0, totalBytes: 0, filesDone: 0, filesTotal: 0, unknownTotal: false });
    runtimeRef.current = null;
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;

    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframe.contentWindow) return;
      const data = event.data as Record<string, unknown> | null;
      if (!data || typeof data !== "object" || typeof data.type !== "string") return;
      if (data.type === "motion:loading") {
        setLoading({
          progress: typeof data.progress === "number" ? data.progress : 0,
          phase: typeof data.phase === "string" ? data.phase : "download",
          loadedBytes: typeof data.loadedBytes === "number" ? data.loadedBytes : 0,
          totalBytes: typeof data.totalBytes === "number" ? data.totalBytes : 0,
          filesDone: typeof data.filesDone === "number" ? data.filesDone : 0,
          filesTotal: typeof data.filesTotal === "number" ? data.filesTotal : 0,
          unknownTotal: Boolean(data.unknownTotal)
        });
        if (data.error) {
          setError(String(data.error));
          setLoading((current) => ({ ...current, phase: "error" }));
        }
      }
      if (data.type === "motion:ready") {
        setSoundAvailable(Boolean(data.sound));
        if (typeof data.progress === "number") setLoading((current) => ({ ...current, progress: data.progress as number }));
        const win = iframe.contentWindow as (Window & { __motion?: RuntimeMotion }) | null;
        if (win?.__motion) connect(win.__motion);
      }
      if (data.type === "motion:sound") {
        const state = data.state === "on" ? "on" : data.state === "blocked" ? "blocked" : "off";
        setSoundState(state);
        setSoundOn(Boolean(data.on));
      }
      if (data.type === "motion:orient" && (data.orient === "landscape" || data.orient === "portrait")) {
        setOrientation(data.orient);
      }
    };

    const poll = () => {
      if (cancelled) return;
      polls += 1;
      const win = iframe.contentWindow as (Window & { __motion?: RuntimeMotion }) | null;
      const motion = win?.__motion;
      if (motion) {
        if (typeof motion.progress === "number" && motion.progress > 0 && motion.progress < 1) {
          setLoading((current) => (current.progress < motion.progress! ? { ...current, progress: motion.progress! } : current));
        }
        if (motion.duration > 0) connect(motion);
      }
      if (polls % 5 === 0) iframe.contentWindow?.postMessage({ type: "motion:query" }, window.location.origin);
    };

    const pollTimer = window.setInterval(poll, 180);
    const queryAfterLoad = window.setTimeout(() => iframe.contentWindow?.postMessage({ type: "motion:query" }, window.location.origin), 600);
    const timeout = window.setTimeout(() => {
      if (!cancelled && !runtimeRef.current) {
        setError("Demo 在预期时间内没有就绪。可以重试或在新标签页中打开。");
        setLoading((current) => ({ ...current, phase: "error" }));
      }
    }, 30000);

    window.addEventListener("message", onMessage);
    return () => {
      cancelled = true;
      window.clearInterval(pollTimer);
      window.clearTimeout(queryAfterLoad);
      window.clearTimeout(timeout);
      window.removeEventListener("message", onMessage);
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [connect, nonce, src]);

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  const togglePlay = useCallback(() => {
    if (!ready) return;
    const motion = runtimeRef.current;
    if (!motion) return;
    if (playing) {
      motion.pause?.();
      setPlaying(false);
    } else {
      const restartFromStart = time >= duration - 0.05;
      const start = () => {
        motion.play?.();
        setPlaying(true);
      };
      if (restartFromStart && motion.seek) {
        void Promise.resolve(motion.seek(0)).then(start).catch(() => undefined);
      } else {
        start();
      }
    }
  }, [duration, playing, ready, time]);

  const seekTo = useCallback(
    (nextTime: number) => {
      const target = clamp(nextTime, 0, Math.max(duration, 0));
      setTime(target);
      const motion = runtimeRef.current;
      if (motion?.seek) {
        void Promise.resolve(motion.seek(target)).catch(() => undefined);
      }
    },
    [duration]
  );

  const jumpBeat = useCallback(
    (direction: -1 | 1) => {
      if (!beats.length) {
        seekTo(direction < 0 ? 0 : duration);
        return;
      }
      if (direction < 0) {
        const previous = [...beats].reverse().find((beat) => beat.t < time - 0.08);
        seekTo(previous?.t ?? 0);
      } else {
        const next = beats.find((beat) => beat.t > time + 0.08);
        seekTo(next?.t ?? duration);
      }
    },
    [beats, duration, seekTo, time]
  );

  const toggleSound = useCallback(() => {
    if (!ready || soundAvailable === false) return;
    const next = !soundOn;
    setSoundOn(next);
    setSoundState("pending");
    iframeRef.current?.contentWindow?.postMessage({ type: "motion:sound", on: next }, window.location.origin);
  }, [ready, soundAvailable, soundOn]);

  const toggleFullscreen = useCallback(() => {
    const node = rootRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    } else {
      void node.requestFullscreen().catch(() => undefined);
    }
  }, []);

  const changeOrientation = useCallback(
    async (next: Orient) => {
      const motion = runtimeRef.current;
      if (!motion?.setOrient) {
        setOrientation(next);
        return;
      }
      setOrientation(next);
      try {
        const accepted = await Promise.resolve(motion.setOrient(next));
        if (!accepted) setOrientation((current) => (current === next ? (motion.orient as Orient) ?? initialOrient : current));
      } catch {
        setOrientation((current) => (current === next ? initialOrient : current));
      }
    },
    [initialOrient]
  );

  function retry() {
    setFrameLoaded(false);
    setReady(false);
    setError(null);
    setNonce((value) => value + 1);
  }

  const keyboardRef = useRef({ togglePlay, seekTo, jumpBeat, toggleSound, toggleFullscreen, time, duration, ready, soundAvailable });
  keyboardRef.current = { togglePlay, seekTo, jumpBeat, toggleSound, toggleFullscreen, time, duration, ready, soundAvailable };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const state = keyboardRef.current;
      if (!state.ready) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable='true']")) return;
      if (event.code === "Space") {
        event.preventDefault();
        state.togglePlay();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        state.seekTo(state.time - (event.shiftKey ? 10 : SEEK_STEP));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        state.seekTo(state.time + (event.shiftKey ? 10 : SEEK_STEP));
      } else if (event.key === "[") {
        event.preventDefault();
        state.jumpBeat(-1);
      } else if (event.key === "]") {
        event.preventDefault();
        state.jumpBeat(1);
      } else if (event.key.toLowerCase() === "m") {
        state.toggleSound();
      } else if (event.key.toLowerCase() === "f") {
        state.toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const stageStyle = { "--seek-progress": `${progressPercent}%` } as CSSProperties;
  const phase = loading.phase;
  const loadFailed = Boolean(error) || phase === "error";
  const percent = Math.round(clamp(loading.progress, 0, 1) * 100);
  const soundLabel =
    soundState === "blocked" ? "待启用" : soundState === "on" ? "声音开启" : soundState === "pending" ? "切换中" : "声音关闭";

  if (!entry.demo) {
    return <div className="playerUnavailable">这个条目没有可运行的 Demo。</div>;
  }

  return (
    <section
      className={`motionPlayer ${isFullscreen ? "is-fullscreen" : ""}`}
      ref={rootRef}
      aria-label="Motion Demo 播放器"
      tabIndex={0}
    >
      <header className="playerHeader">
        <div className="playerTitle">
          <span className="liveDot" aria-hidden="true" />
          <span className="monoLabel">MOTION DEMO</span>
          <span className="playerTitleText">{entry.title}</span>
        </div>
        <div className="playerHeaderTools">
          {canSwitchOrient && (
            <SegmentedControl
              label="画幅"
              options={[
                { value: "landscape", label: "横屏" },
                { value: "portrait", label: "竖屏" }
              ]}
              value={orientation}
              onValueChange={(value) => void changeOrientation(value as Orient)}
            />
          )}
          <a className="playerOpenLink" href={src} target="_blank" rel="noreferrer noopener">
            <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
            新标签页
          </a>
        </div>
      </header>

      <div className="playerStageShell">
        <div className={`motionStage ${orientation}`}>
          <iframe
            key={`${entry.id}-${nonce}`}
            ref={iframeRef}
            src={src}
            title={`${entry.title} Motion Demo`}
            allow="autoplay; fullscreen"
            onLoad={() => {
              setFrameLoaded(true);
              iframeRef.current?.contentWindow?.postMessage({ type: "motion:query" }, window.location.origin);
            }}
          />
          {!ready && (
            <div className={`playerLoading ${loadFailed ? "is-error" : ""}`}>
              {entry.cover && <CoverImage src={entry.cover} alt="" fallbackLabel="" className="playerPoster" />}
              <div className="playerLoadingVeil" />
              <div className="playerLoadingPanel">
                {loadFailed ? (
                  <>
                    <span className="monoLabel">LOAD FAILED</span>
                    <h3>Demo 没有载入</h3>
                    <p>{error ?? "资源加载失败。"}</p>
                    <div className="playerLoadingActions">
                      <Button variant="secondary" size="sm" onClick={retry}>
                        <RotateCcw size={14} strokeWidth={1.8} aria-hidden="true" />
                        重试
                      </Button>
                      <a className="playerOpenLink" href={src} target="_blank" rel="noreferrer noopener">
                        新标签页打开
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="monoLabel">LOADING / {PHASE_LABEL[phase] ?? phase}</span>
                    <div className="loadProgressRow">
                      <div className="loadProgressBar" aria-hidden="true">
                        <span style={{ width: `${Math.max(percent, 4)}%` }} />
                      </div>
                      <strong>{percent}%</strong>
                    </div>
                    <p className="loadDetail">
                      {loading.filesTotal > 0 ? `${loading.filesDone} / ${loading.filesTotal} 个资源` : "正在准备资源与首帧"}
                      {!frameLoaded ? " · 等待文档" : ""}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="playerTimeline" style={stageStyle}>
        <div className="timelineHead">
          <div className="timelineLegend">
            <span className="monoLabel">TIMELINE</span>
            {energy && <span className="energyLegend">能量</span>}
            {currentBeat ? <span className="currentBeat">当前节拍 · {currentBeat.label}</span> : <span className="currentBeat is-empty">当前节拍 · —</span>}
          </div>
          <div className="timelineReadout">
            <strong>{formatTimecode(time)}</strong>
            <span>/ {ready ? formatTimecode(duration) : formatTimecode(entry.rhythm?.duration ?? 0)}</span>
          </div>
        </div>

        <div className="timelineGraph">
          {energy ? (
            <svg className="energyCurve" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="energyArea" d={energy.area} />
              <path className="energyLine" d={energy.line} />
              <line className="timelineBaseline" x1="0" y1="96" x2="1000" y2="96" />
            </svg>
          ) : (
            <span className="timelineNoEnergy">此 Demo 未提供能量曲线</span>
          )}
          <div className="beatMarks" aria-label="节拍">
            {beats.map((beat, index) => (
              <button
                type="button"
                key={`${beat.t}-${beat.label}-${index}`}
                className={`beatMark ${currentBeat === beat ? "is-current" : ""}`}
                style={{ left: `${(beat.t / timelineDuration) * 100}%` }}
                onClick={() => seekTo(beat.t)}
                title={`${beat.label} · ${formatTimecode(beat.t)}`}
                aria-label={`跳到节拍 ${beat.label}，${formatTimecode(beat.t)}`}
              >
                <span className="beatTooltip">{beat.label}</span>
                <span className="beatStem" aria-hidden="true" />
                <span className="beatDot" aria-hidden="true" />
              </button>
            ))}
          </div>
          <input
            className="seekRange"
            type="range"
            min={0}
            max={Math.max(duration, 0.01)}
            step={0.01}
            value={clamp(time, 0, Math.max(duration, 0.01))}
            onChange={(event) => seekTo(Number(event.target.value))}
            disabled={!ready}
            aria-label="定位时间轴"
          />
        </div>

        <div className="transport">
          <div className="transportMain">
            <button type="button" className="transportIcon" onClick={() => jumpBeat(-1)} disabled={!ready} aria-label="上一节拍" title="上一节拍（[）">
              <ChevronLeft size={18} strokeWidth={1.8} />
            </button>
            <button type="button" className="transportPlay" onClick={togglePlay} disabled={!ready} aria-label={playing ? "暂停" : "播放"} title="播放 / 暂停（空格）">
              {playing ? <Pause size={18} strokeWidth={1.7} fill="currentColor" /> : <Play size={19} strokeWidth={1.7} fill="currentColor" />}
            </button>
            <button type="button" className="transportIcon" onClick={() => jumpBeat(1)} disabled={!ready} aria-label="下一节拍" title="下一节拍（]）">
              <ChevronRight size={18} strokeWidth={1.8} />
            </button>
            <div className="transportMeta">
              <span className="transportStatus">{ready ? (playing ? "播放中" : "已暂停") : "载入中"}</span>
              <span className="transportSub">{beats.length} 个节拍 · {formatTimecode(duration, false)}</span>
            </div>
          </div>
          <div className="transportTools">
            <button
              type="button"
              className={`playerToolButton ${soundOn ? "is-active" : ""} ${soundState === "blocked" ? "is-blocked" : ""}`}
              onClick={toggleSound}
              disabled={!ready || soundAvailable === false}
              title={soundAvailable === false ? "此 Demo 没有声音" : "声音开关（M）"}
              aria-label={soundLabel}
              aria-pressed={soundOn}
            >
              {soundOn ? <Volume2 size={17} strokeWidth={1.8} /> : <VolumeX size={17} strokeWidth={1.8} />}
              <span>{soundState === "blocked" ? "待启用" : soundOn ? "声音" : "静音"}</span>
            </button>
            <button type="button" className="playerToolButton" onClick={toggleFullscreen} aria-label={isFullscreen ? "退出全屏" : "进入全屏"} title="全屏（F）">
              {isFullscreen ? <Minimize2 size={17} strokeWidth={1.8} /> : <Maximize2 size={17} strokeWidth={1.8} />}
              <span>{isFullscreen ? "退出全屏" : "全屏"}</span>
            </button>
          </div>
        </div>
        <div className="keyboardHints">
          <span><kbd>空格</kbd> 播放／暂停</span>
          <span><kbd>←</kbd><kbd>→</kbd> 前后 2 秒</span>
          <span><kbd>[</kbd><kbd>]</kbd> 上一／下一节拍</span>
          <span><kbd>M</kbd> 声音</span>
          <span><kbd>F</kbd> 全屏</span>
          {entry.energyNote && <span className="energyNote">{entry.energyNote}</span>}
        </div>
      </div>
    </section>
  );
}