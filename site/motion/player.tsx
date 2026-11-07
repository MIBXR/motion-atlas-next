import { LinkButton } from "@/ui/LinkButton";
import { Button } from "@/registry/components/button/button";
// Motion Demo 播放器：通过同源 iframe 的 window.__motion 与 motion:* 消息控制时间轴（CONTENT.md 6.2）。
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { Progress } from "@/registry/components/progress/progress";
import { ExternalLink, Keyboard, Maximize, Minimize, Pause, Play, RectangleHorizontal, RectangleVertical, RotateCcw, SkipBack, SkipForward, TriangleAlert, Volume2, VolumeX } from "@/ui/icons";
import { navigate, useRoute, withParams } from "@/core/router";

export interface Beat { t: number; label: string; note?: string }
type Orient = "landscape" | "portrait";
type Sound = "pending" | "none" | "off" | "on" | "blocked";

interface MotionApi {
  duration: number; time: number; playing: boolean; markers?: Beat[]; orients?: string[]; orient?: string | null;
  ready: Promise<unknown>; on: (cb: (t: number, p: boolean) => void) => () => void;
  seek: (t: number) => Promise<number>; play: () => void; pause: () => void; toggle: () => void;
}

export interface PlayerProps {
  demo: string;
  title: string;
  /** 条目记录的节拍（案例 rhythm.beats）；缺省时使用 Demo 回报的 markers。 */
  beats?: Beat[];
  fallbackBeats?: Beat[];
  /** 能量曲线点，x 为 0…1 归一化时刻，y 为 0…1 能量。 */
  energy?: [number, number][];
  orients?: string[];
}

const fmt = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;

/** 声音开关是用户偏好：跨条目、跨页面、刷新后保持。 */
const SOUND_KEY = "atlas-workbench-sound";
const soundPref = () => localStorage.getItem(SOUND_KEY) === "on";

export function seekPlayer(t: number) { window.dispatchEvent(new CustomEvent("atlas:seek", { detail: t })); }

function normBeats(list: Beat[] | undefined, duration: number): Beat[] {
  return (list ?? []).filter(b => Number.isFinite(b.t) && b.t >= 0 && (!duration || b.t <= duration + 0.001)).sort((a, b) => a.t - b.t);
}

export function MotionPlayer({ demo, title, beats: entryBeats, fallbackBeats, energy, orients: entryOrients }: PlayerProps) {
  const route = useRoute();
  const orientParam = route.params.get("orient") as Orient | null;
  const startT = Number(route.params.get("t")) || 0;
  const frame = useRef<HTMLIFrameElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const api = useRef<MotionApi | null>(null);
  const [reload, setReload] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [runtimeBeats, setRuntimeBeats] = useState<Beat[]>([]);
  const [orients, setOrients] = useState<string[]>(entryOrients ?? []);
  const [orient, setOrient] = useState<Orient>(orientParam ?? (entryOrients?.[0] as Orient) ?? "landscape");
  const [sound, setSound] = useState<Sound>("pending");
  const [full, setFull] = useState(false);
  const [help, setHelp] = useState(false);

  // iframe 地址只在首次与重试时确定；之后的画幅切换走消息，不重新加载。
  const src = useMemo(() => {
    const q = new URLSearchParams({ embed: "1" });
    if (orientParam) q.set("orient", orientParam);
    if (startT > 0) q.set("t", String(startT));
    if (soundPref()) q.set("sound", "1");
    return `${demo}?${q}`;
  }, [demo, reload]);

  const post = useCallback((msg: Record<string, unknown>) => {
    frame.current?.contentWindow?.postMessage(msg, location.origin === "null" ? "*" : location.origin);
  }, []);

  // 连接：轮询 __motion，duration>0 表示已 expose；订阅时间并等待 ready。
  useEffect(() => {
    setPhase("loading"); setProgress(0); setTime(0); setDuration(0); setSound("pending"); setError("");
    api.current = null;
    let unsub: (() => void) | null = null;
    let lastProgressAt = performance.now();
    let asked = 0;
    const fail = (msg: string) => { setPhase("error"); setError(msg); };
    const poll = window.setInterval(() => {
      const win = frame.current?.contentWindow as (Window & { __motion?: MotionApi }) | null;
      const m = win?.__motion;
      if (m && !api.current && m.duration > 0) {
        api.current = m;
        setDuration(m.duration);
        if (m.markers?.length) setRuntimeBeats(m.markers);
        unsub = m.on((t, p) => { setTime(t); setPlaying(p); });
        m.ready.then(() => {
          setPhase("ready"); setProgress(1);
          setDuration(m.duration);
          if (m.orients?.length) setOrients(m.orients);
          if (m.orient) setOrient(m.orient as Orient);
          if (startT > 0) void m.seek(startT);
        }, err => fail(String(err?.message ?? err ?? "加载失败")));
      }
      if (!api.current && performance.now() - lastProgressAt > 60000) fail("加载超时：60 秒内没有进度");
    }, 200);
    const onMsg = (ev: MessageEvent) => {
      if (ev.source !== frame.current?.contentWindow) return;
      const d = ev.data;
      if (!d || typeof d.type !== "string") return;
      if (d.type === "motion:loading") {
        lastProgressAt = performance.now();
        // 总字节未知时 Demo 的 progress 恒为 0，改按已完成文件数估算
        setProgress(d.unknownTotal && d.filesTotal ? d.filesDone / d.filesTotal : d.progress ?? 0);
        if (d.phase === "error") fail(d.error || "资源加载失败");
      } else if (d.type === "motion:ready") {
        if (d.markers?.length) setRuntimeBeats(d.markers);
        if (d.orients?.length) setOrients(d.orients);
        if (d.orient) setOrient(d.orient);
        if (!d.sound) setSound("none");
        else if (soundPref()) { post({ type: "motion:sound", on: true }); setSound(s => (s === "on" ? s : "blocked")); }
        else setSound(s => (s === "pending" || s === "none" ? "off" : s));
      } else if (d.type === "motion:orient") {
        if (d.orient) setOrient(d.orient);
        if (d.supported) setOrients(d.supported);
      } else if (d.type === "motion:sound") {
        // 偏好为开启时，Demo 回报的 off 只是尚未接管，再请求一次；blocked 保持“已开启、待激活”。
        if (d.state === "off" && soundPref() && asked++ < 3) post({ type: "motion:sound", on: true });
        else setSound(s => (s === "none" ? s : d.state));
      }
    };
    window.addEventListener("message", onMsg);
    return () => { window.clearInterval(poll); window.removeEventListener("message", onMsg); unsub?.(); };
  }, [src]);

  const beats = useMemo(() => {
    const own = normBeats(entryBeats, duration);
    if (own.length) return own;
    const rt = normBeats(runtimeBeats, duration);
    return rt.length ? rt : normBeats(fallbackBeats, duration);
  }, [entryBeats, runtimeBeats, fallbackBeats, duration]);
  const current = beats.findLastIndex(b => b.t <= time + 0.02);

  const seek = useCallback((t: number) => { const m = api.current; if (m && duration) void m.seek(Math.max(0, Math.min(duration, t))); }, [duration]);
  const toggle = useCallback(() => api.current?.toggle(), []);
  const jumpBeat = useCallback((dir: 1 | -1) => {
    if (!beats.length) return;
    const i = dir > 0 ? beats.findIndex(b => b.t > time + 0.05) : beats.findLastIndex(b => b.t < time - 0.3);
    const target = beats[i] ?? (dir > 0 ? undefined : beats[0]);
    if (target) seek(target.t);
  }, [beats, time, seek]);
  const setOrientTo = useCallback((o: Orient) => {
    post({ type: "motion:orient", orient: o });
    setOrient(o);
    navigate(withParams(route, { orient: o === (entryOrients?.[0] ?? "landscape") ? null : o }), { replace: true });
  }, [post, route, entryOrients]);
  const toggleSound = useCallback(() => {
    if (sound === "none" || sound === "pending") return;
    const on = sound === "off";
    localStorage.setItem(SOUND_KEY, on ? "on" : "off");
    post({ type: "motion:sound", on });
    setSound(on ? "on" : "off");
  }, [sound, post]);

  // 浏览器自动播放限制下处于“待激活”：用户在工作台里任意一次点按或按键后再请求出声；在 Demo 画面里点按由 Demo 自己恢复。
  useEffect(() => {
    if (sound !== "blocked" || !soundPref()) return;
    const retry = () => post({ type: "motion:sound", on: true });
    window.addEventListener("pointerdown", retry, true);
    window.addEventListener("keydown", retry, true);
    return () => { window.removeEventListener("pointerdown", retry, true); window.removeEventListener("keydown", retry, true); };
  }, [sound, post]);
  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void box.current?.requestFullscreen();
  }, []);

  useEffect(() => {
    const onFs = () => setFull(document.fullscreenElement === box.current);
    const onSeek = (ev: Event) => seek((ev as CustomEvent<number>).detail);
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("atlas:seek", onSeek);
    return () => { document.removeEventListener("fullscreenchange", onFs); window.removeEventListener("atlas:seek", onSeek); };
  }, [seek]);

  // 键盘快捷键：输入框内不响应。
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const t = ev.target as HTMLElement;
      if (ev.metaKey || ev.ctrlKey || ev.altKey || t.closest("input, textarea, select, [contenteditable]")) return;
      const step = ev.shiftKey ? 5 : 1;
      const map: Record<string, () => void> = {
        " ": toggle, k: toggle, K: toggle,
        ArrowLeft: () => seek(time - step), ArrowRight: () => seek(time + step),
        j: () => seek(time - 5), l: () => seek(time + 5),
        ",": () => jumpBeat(-1), ".": () => jumpBeat(1), "[": () => jumpBeat(-1), "]": () => jumpBeat(1),
        Home: () => seek(0), End: () => seek(duration),
        f: toggleFull, F: toggleFull, m: toggleSound, M: toggleSound,
        o: () => orients.length > 1 && setOrientTo(orient === "landscape" ? "portrait" : "landscape"),
        "?": () => setHelp(h => !h),
      };
      const fn = map[ev.key];
      if (!fn || (t.closest("button, a") && (ev.key === " " || ev.key === "Enter"))) return;
      ev.preventDefault();
      fn();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, seek, time, duration, jumpBeat, toggleFull, toggleSound, orients, orient, setOrientTo]);

  const multi = orients.length > 1;
  const portrait = orient === "portrait";

  return (
    <div className="player" ref={box} data-full={full || undefined}>
      <div className="player-screen" data-orient={orient}>
        <iframe key={src + reload} ref={frame} src={src} title={title} allow="autoplay; fullscreen" />
        {phase !== "ready" ? (
          <div className="player-overlay" role="status">
            {phase === "loading" ? (
              <div className="player-loading">
                <span>正在加载 {Math.round(progress * 100)}%</span>
                <Progress value={Math.round(progress * 100)} label="Demo 加载进度" />
              </div>
            ) : (
              <div className="player-error">
                <TriangleAlert aria-hidden="true" />
                <strong>Demo 加载失败</strong>
                <span>{error}</span>
                <Button variant="secondary" size="sm" className="arc-button" onClick={() => setReload(n => n + 1)}><RotateCcw /><span>重试</span></Button>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <Timeline duration={duration} time={time} beats={beats} current={current} energy={energy} onSeek={seek} />
      <div className="player-bar">
        <Button variant="secondary" size="sm" className="arc-button icon-only player-play" onClick={toggle} disabled={phase !== "ready"} aria-label={playing ? "暂停（空格）" : "播放（空格）"} title={playing ? "暂停" : "播放"}>{playing ? <Pause /> : <Play />}</Button>
        <Button variant="secondary" size="sm" className="arc-button icon-only" onClick={() => jumpBeat(-1)} disabled={!beats.length || phase !== "ready"} aria-label="上一个节拍（[）" title="上一个节拍"><SkipBack /></Button>
        <Button variant="secondary" size="sm" className="arc-button icon-only" onClick={() => jumpBeat(1)} disabled={!beats.length || phase !== "ready"} aria-label="下一个节拍（]）" title="下一个节拍"><SkipForward /></Button>
        <span className="player-time mono">{fmt(time)} / {fmt(duration)}</span>
        {current >= 0 && beats[current] ? <span className="player-beat">{beats[current]!.label}</span> : null}
        <span className="toolbar-spacer" />
        {multi ? (
          <div className="view-toggle" role="group" aria-label="画幅">
            <Button variant="secondary" size="sm" className="arc-button icon-only" aria-pressed={!portrait} aria-label="横屏" title="横屏（O）" onClick={() => setOrientTo("landscape")}><RectangleHorizontal /></Button>
            <Button variant="secondary" size="sm" className="arc-button icon-only" aria-pressed={portrait} aria-label="竖屏" title="竖屏（O）" onClick={() => setOrientTo("portrait")}><RectangleVertical /></Button>
          </div>
        ) : null}
        <Button variant="secondary" size="sm" className="arc-button icon-only" onClick={toggleSound} disabled={sound === "none" || sound === "pending"} aria-pressed={sound === "on" || sound === "blocked"} aria-label={sound === "none" ? "此 Demo 无声音" : sound === "off" ? "打开声音（M）" : "关闭声音（M）"} data-pending={sound === "blocked" || undefined} title={sound === "blocked" ? "声音已开启，等待浏览器允许播放：点按画面或任意控件后出声" : sound === "none" ? "无声音" : "声音"}>
          {sound === "on" || sound === "blocked" ? <Volume2 /> : <VolumeX />}
        </Button>
        <Button variant="secondary" size="sm" className="arc-button icon-only" onClick={toggleFull} aria-label={full ? "退出全屏（F）" : "全屏（F）"} title="全屏">{full ? <Minimize /> : <Maximize />}</Button>
        <Button variant="secondary" size="sm" className="arc-button icon-only" aria-pressed={help} onClick={() => setHelp(!help)} aria-label="键盘快捷键" title="键盘快捷键（?）"><Keyboard /></Button>
        <LinkButton variant="secondary" size="sm" className="icon-only" href={demo} target="_blank" rel="noopener" aria-label="新标签页打开" title="新标签页打开"><ExternalLink /></LinkButton>
      </div>
      {help ? (
        <dl className="shortcuts">
          <div><dt>空格 / K</dt><dd>播放、暂停</dd></div>
          <div><dt>← →</dt><dd>后退、前进 1 秒（Shift 5 秒）</dd></div>
          <div><dt>[ ] 或 , .</dt><dd>上一个、下一个节拍</dd></div>
          <div><dt>Home / End</dt><dd>开头、结尾</dd></div>
          <div><dt>O</dt><dd>切换横竖屏</dd></div>
          <div><dt>M</dt><dd>声音开关</dd></div>
          <div><dt>F</dt><dd>全屏</dd></div>
        </dl>
      ) : null}
    </div>
  );
}

function Timeline({ duration, time, beats, current, energy, onSeek }: { duration: number; time: number; beats: Beat[]; current: number; energy?: [number, number][]; onSeek: (t: number) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const frac = duration ? Math.min(1, time / duration) : 0;
  const at = (ev: RPointerEvent) => {
    const r = track.current!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) * duration;
  };
  const path = energy?.length ? energy.map(([x, y], i) => `${i ? "L" : "M"}${(x * 1000).toFixed(1)},${(40 - y * 36).toFixed(1)}`).join(" ") : null;
  return (
    <div
      ref={track}
      className="timeline"
      role="slider"
      tabIndex={0}
      aria-label="时间轴"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration * 10) / 10}
      aria-valuenow={Math.round(time * 10) / 10}
      aria-valuetext={`${fmt(time)}${beats[current] ? `，${beats[current]!.label}` : ""}`}
      onPointerDown={ev => { if (!duration) return; dragging.current = true; ev.currentTarget.setPointerCapture(ev.pointerId); onSeek(at(ev)); }}
      onPointerMove={ev => { if (dragging.current) onSeek(at(ev)); }}
      onPointerUp={() => { dragging.current = false; }}
    >
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
        {path ? <>
          <path d={`${path} L1000,40 L0,40 Z`} className="energy-fill" />
          <path d={path} className="energy-line" vectorEffect="non-scaling-stroke" />
        </> : null}
      </svg>
      <div className="timeline-played" style={{ width: `${frac * 100}%` }} />
      {duration ? beats.map((b, i) => (
        <button
          key={i}
          className="beat-tick"
          data-current={i === current || undefined}
          style={{ left: `${(b.t / duration) * 100}%` }}
          title={`${fmt(b.t)} ${b.label}${b.note ? `：${b.note}` : ""}`}
          aria-label={`跳到节拍 ${b.label}`}
          tabIndex={-1}
          onPointerDown={ev => { ev.stopPropagation(); onSeek(b.t); }}
        />
      )) : null}
      <div className="timeline-head" style={{ left: `${frac * 100}%` }} />
    </div>
  );
}

/** 素材 Demo（Registry、乐谱播放器）有自己的播放器，不暴露标准时间轴，只提供嵌入、重载与新标签页。 */
export function MaterialFrame({ src, title, tools }: { src: string; title: string; tools?: ReactNode }) {
  const [reload, setReload] = useState(0);
  return (
    <div className="stage">
      <div className="stage-toolbar">
        {tools}
        <Button variant="secondary" size="sm" className="arc-button" onClick={() => setReload(n => n + 1)} aria-label="重新加载" title="重新加载"><RotateCcw /><span className="stage-button-label">重新加载</span></Button>
        <LinkButton variant="secondary" size="sm" href={src} target="_blank" rel="noopener" aria-label="在新标签页打开" title="在新标签页打开"><ExternalLink /><span className="stage-button-label">新标签页</span></LinkButton>
      </div>
      <div className="material-frame"><iframe key={src + reload} src={src} title={title} allow="autoplay; fullscreen" /></div>
    </div>
  );
}
