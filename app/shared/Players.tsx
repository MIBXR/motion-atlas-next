import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Expand, ExternalLink, LocateFixed, Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../arc/registry/components/button/button';
import SegmentedControl from '../arc/registry/components/segmented-control/segmented-control';
import { assetUrl, href, navigate } from './data';
import type { Entry } from './data';
import { locateFocus } from './focus';

export function WebPlayer({ entry, source, demo, material = false }: { entry: Entry; source?: any; demo?: string; material?: boolean }) {
  const target = source?.focus;
  const [viewport, setViewport] = useState(target?.viewport || (entry.id === 'chatgpt-platform' ? 'wide' : 'fit'));
  const [compare, setCompare] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [width, setWidth] = useState(800);
  const [loading, setLoading] = useState('');
  const [focusError, setFocusError] = useState('');
  const [highlight, setHighlight] = useState<{ top: number; left: number; width: number; height: number; label: string } | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);
  const tracking = useRef(0);
  const located = useRef(false);
  const src = assetUrl(target?.entrypoint || demo || entry.demo);
  const displayHeight = material ? 480 : Math.max(300, Math.min(520, width * 0.62));
  const frameWidth = viewport === 'wide' ? 1440 : viewport === 'mobile' ? 390 : width;
  const scale = Math.min(1, width / frameWidth);
  useLayoutEffect(() => {
    const node = stage.current!;
    const measure = () => setWidth(node.clientWidth);
    measure(); const observer = new ResizeObserver(measure); observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { setViewport(target?.viewport || (entry.id === 'chatgpt-platform' ? 'wide' : 'fit')); }, [source?.caseId, demo]);
  const show = useCallback((node: HTMLElement, label: string) => {
    cancelAnimationFrame(tracking.current);
    const started = performance.now();
    const update = () => {
      if (!frame.current || !stage.current || performance.now() - started > 4000) { setHighlight(null); return; }
      const rect = node.getBoundingClientRect();
      const ratio = frame.current.getBoundingClientRect().width / frame.current.clientWidth;
      const frameRect = frame.current.getBoundingClientRect(), host = stage.current.getBoundingClientRect();
      setHighlight({ top: frameRect.top - host.top + rect.top * ratio - 6, left: frameRect.left - host.left + rect.left * ratio - 6, width: rect.width * ratio + 12, height: rect.height * ratio + 12, label });
      tracking.current = requestAnimationFrame(update);
    };
    update();
  }, []);
  const locate = useCallback(() => {
    if (!target || !frame.current?.contentDocument?.body) return;
    abort.current?.abort(); const controller = new AbortController(); abort.current = controller; setFocusError('');
    void locateFocus(frame.current, target, controller.signal, show, located.current).then(() => { if (!controller.signal.aborted) located.current = true; }).catch(error => { if (!controller.signal.aborted) setFocusError(error.message); });
  }, [source, show]);
  useEffect(() => { located.current = false; }, [src, epoch]);
  useEffect(() => {
    if (frame.current?.contentDocument?.readyState !== 'complete' || frame.current?.contentWindow?.location.href === 'about:blank') return;
    const nextFrame = requestAnimationFrame(locate);
    return () => cancelAnimationFrame(nextFrame);
  }, [viewport, width, locate]);
  useEffect(() => {
    let poll = 0;
    if (target?.phase === 'loading') {
      const scan = () => { if (frame.current?.contentDocument?.querySelector(target.target)) locate(); else if (frame.current?.contentDocument?.readyState !== 'complete' || frame.current?.contentWindow?.location.href === 'about:blank') poll = requestAnimationFrame(scan); };
      poll = requestAnimationFrame(scan);
    }
    return () => { cancelAnimationFrame(poll); abort.current?.abort(); cancelAnimationFrame(tracking.current); setHighlight(null); };
  }, [src, epoch, viewport, locate]);
  useEffect(() => {
    const interval = setInterval(() => {
      const status = (frame.current?.contentWindow as any)?.CaseLoading;
      setLoading(status?.state === 'pending' ? `资源加载 ${status.completed} / ${status.total}` : status?.state === 'failed' ? '部分资源加载失败，可在 Demo 内重试' : '');
    }, 250);
    return () => clearInterval(interval);
  }, []);
  function loaded() { if (target?.phase !== 'loading') locate(); }
  return <section className="demo-panel web-demo" aria-label="交互 Demo">
    <div className="demo-toolbar"><span className="demo-label">{source ? '来源案例 Demo' : '交互 Demo'}</span><div className="demo-toolbar-controls">
      <SegmentedControl label="显示比例" value={viewport} onValueChange={setViewport} options={[{ value: 'fit', label: '适应' }, { value: 'wide', label: '桌面 1440' }, { value: 'mobile', label: '手机 390' }]} />
      {entry.referencePreview && <Button variant="ghost" size="sm" aria-pressed={compare} onClick={() => setCompare(!compare)}>原站对照</Button>}
      {target && <button className="icon-button" title="定位巧思" aria-label="定位巧思" onClick={locate}><LocateFixed size={17} /></button>}
      <button className="icon-button" title="重播" aria-label="重播 Demo" onClick={() => setEpoch(epoch + 1)}><RotateCcw size={17} /></button><a className="icon-button" title="独立打开" aria-label="新标签页打开 Demo" href={src} target="_blank" rel="noreferrer"><ExternalLink size={17} /></a>
    </div></div>
    <div className={`web-stage-layout ${compare ? 'with-reference' : ''}`}>
      {compare && <div className="reference-pane"><span>原站截图</span><a href={assetUrl(entry.referencePreview)} target="_blank" rel="noreferrer"><img src={assetUrl(entry.referencePreview)} alt="原站截图" /></a></div>}
      <div className="web-stage" ref={stage} style={{ height: displayHeight }}>
        <iframe key={`${src}-${epoch}`} ref={frame} src={src} title={`${entry.title} Demo`} allow="autoplay; fullscreen" onLoad={loaded} onError={() => setFocusError('Demo 加载失败，点击重播重试。')} style={{ width: frameWidth, height: displayHeight / scale, transform: `scale(${scale})`, transformOrigin: 'top left', marginLeft: Math.max(0, (width - frameWidth * scale) / 2) }} />
        {highlight && <div className="focus-highlight" style={{ top: highlight.top, left: highlight.left, width: highlight.width, height: highlight.height }}><span>{highlight.label}</span></div>}
        {loading && <div className="web-load-state" role="status">{loading}</div>}
      </div>
    </div>
    {target?.instruction && <div className="demo-instruction"><LocateFixed size={15} /><p>{target.instruction}</p><button className="quiet-link" onClick={locate}>再次定位</button></div>}
    {focusError && <div className="inline-error" role="alert">{focusError}<button onClick={locate}>重试定位</button></div>}
    {compare && entry.referencePreviewNote && <p className="demo-note">{entry.referencePreviewNote}</p>}
  </section>;
}

type Marker = { t: number; label: string; note?: string };
export function MotionPlayer({ entry, params }: { entry: Entry; params: URLSearchParams }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const panel = useRef<HTMLElement>(null);
  const api = useRef<any>(null);
  const [epoch, setEpoch] = useState(0);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(Number(params.get('t') || entry.previewAt || 0));
  const [duration, setDuration] = useState(entry.rhythm?.duration || 0);
  const [orient, setOrient] = useState(params.get('orient') || entry.orients?.[0] || 'landscape');
  const [orients, setOrients] = useState<string[]>(entry.orients || []);
  const [sound, setSound] = useState(false);
  const [soundState, setSoundState] = useState('off');
  const [hasSound, setHasSound] = useState<boolean | null>(null);
  const [rate, setRate] = useState('1');
  const [markers, setMarkers] = useState<Marker[]>([]);
  const initial = useRef({ orient, time });
  const src = new URL(assetUrl(entry.demo));
  src.searchParams.set('embed', '1'); src.searchParams.set('autoplay', '0'); src.searchParams.set('orient', initial.current.orient); src.searchParams.set('t', String(initial.current.time));
  const send = useCallback((type: string, fields: Record<string, unknown> = {}) => frame.current?.contentWindow?.postMessage({ type, ...fields }, location.origin), []);
  const seek = useCallback((t: number) => { const next = Math.max(0, Math.min(api.current?.duration || duration, t)); setTime(next); if (api.current) void api.current.seek(next); else send('motion:seek', { t: next }); }, [duration, send]);
  const toggle = useCallback(() => { if (api.current) api.current.toggle(); else send(playing ? 'motion:pause' : 'motion:play'); }, [playing, send]);
  const fullscreen = useCallback(() => { if (document.fullscreenElement) void document.exitFullscreen(); else void panel.current?.requestFullscreen(); }, []);
  const beats: Marker[] = (entry.rhythm?.beats?.length ? entry.rhythm.beats : markers).filter((marker: Marker) => Number.isFinite(marker.t) && marker.t >= 0 && marker.t <= duration + 0.001).sort((a: Marker, b: Marker) => a.t - b.t);
  const activeBeat = beats.findLastIndex(marker => marker.t <= time + 0.02);
  useEffect(() => {
    let cancelled = false, failed = false, connected: any = null, unsubscribe: (() => void) | undefined;
    setReady(false); setProgress(0); setError(''); api.current = null;
    function fail(message: string) {
      if (cancelled || failed) return;
      failed = true;
      clearInterval(interval); clearTimeout(timeout);
      api.current = null; setReady(false); setPlaying(false); setError(message);
    }
    function connect() {
      if (cancelled || failed) return;
      let instance;
      try {
        instance = (frame.current?.contentWindow as any)?.__motion;
      } catch (error) {
        if ((error as DOMException).name !== 'SecurityError') throw error;
        fail('Demo 加载失败，请重新加载。');
        return;
      }
      if (!instance || instance.duration <= 0 || instance === connected) return;
      connected = instance; api.current = instance; setDuration(instance.duration);
      if (instance.markers?.length) setMarkers(instance.markers);
      setOrients(instance.orients || []); if (instance.orient) setOrient(instance.orient);
      unsubscribe = instance.on((t: number, state: boolean) => { if (!cancelled && !failed) { setTime(t); setPlaying(state); } });
      Promise.resolve(instance.ready).then(() => { if (!cancelled && !failed) { setReady(true); setProgress(1); setError(''); send('motion:query'); } }, reason => fail(String(reason?.message || reason)));
    }
    const interval = setInterval(connect, 150);
    const timeout = setTimeout(() => { if (!connected) fail('Demo 未连接到播放器，请重试。'); }, 30000);
    const receive = (event: MessageEvent) => {
      if (failed || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === 'motion:ready') { setDuration(data.duration); setOrients(data.orients); if (data.orient) setOrient(data.orient); if (data.markers?.length) setMarkers(data.markers); setHasSound(Boolean(data.sound)); setReady(true); setProgress(1); connect(); }
      if (data?.type === 'motion:loading') { setProgress(data.progress); if (data.error) fail(data.error); }
      if (data?.type === 'motion:orient') { if (data.orient) setOrient(data.orient); if (data.supported) setOrients(data.supported); }
      if (data?.type === 'motion:sound') { setSound(data.on); setSoundState(data.state); }
    };
    window.addEventListener('message', receive);
    return () => { cancelled = true; unsubscribe?.(); connected?.pause(); clearInterval(interval); clearTimeout(timeout); window.removeEventListener('message', receive); };
  }, [entry.id, epoch, send]);
  useEffect(() => {
    if (!ready) return;
    const keydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target?.matches('input, textarea, select, [contenteditable="true"]') || event.ctrlKey || event.metaKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (![' ', 'arrowleft', 'arrowright', 'home', 'end', 'm', 'f', '[', ']'].includes(key)) return;
      event.preventDefault();
      if (key === ' ') toggle();
      if (key === 'arrowleft') seek(time - 1);
      if (key === 'arrowright') seek(time + 1);
      if (key === 'home') seek(0);
      if (key === 'end') seek(duration);
      if (key === 'm') send('motion:sound', { on: !sound });
      if (key === 'f') fullscreen();
      if (key === '[') seek(beats[Math.max(0, activeBeat - 1)]?.t || 0);
      if (key === ']') seek(beats[Math.min(beats.length - 1, activeBeat + 1)]?.t || duration);
    };
    window.addEventListener('keydown', keydown);
    const child = frame.current?.contentDocument;
    child?.addEventListener('keydown', keydown);
    return () => { window.removeEventListener('keydown', keydown); child?.removeEventListener('keydown', keydown); };
  }, [time, sound, duration, beats, activeBeat, toggle, seek, send, fullscreen, ready]);
  function switchOrient(next: string) { setOrient(next); if (api.current) void api.current.setOrient(next); else send('motion:orient', { orient: next }); }
  const points: number[][] = entry.energySegments?.length ? entry.energySegments.flatMap((segment: any) => [[segment.t0 / duration, segment.from], [segment.t1 / duration, segment.to]]) : (entry.energy || []).map((value: number, index: number, list: number[]) => [index / Math.max(1, list.length - 1), value]);
  const curve = points.map(([x, y], index) => `${index ? 'L' : 'M'}${x * 1000},${46 - y * 40}`).join(' ');
  const clock = (value: number) => `${String(Math.floor(value / 60)).padStart(2, '0')}:${(value % 60).toFixed(1).padStart(4, '0')}`;
  return <section className="demo-panel motion-demo" ref={panel} aria-label="动态 Demo 播放器">
    <div className="demo-toolbar"><span className="demo-label">动态 Demo<span>{entry.rhythm?.bpm ? `${entry.rhythm.bpm} BPM` : '可定位时间轴'}</span></span><div className="demo-toolbar-controls">{orients.length > 1 && <SegmentedControl value={orient} onValueChange={switchOrient} label="画幅" options={orients.map(value => ({ value, label: value === 'portrait' ? '竖屏 9:16' : '横屏 16:9' }))} />}<button className="icon-button" aria-label="重载 Demo" title="重载 Demo" onClick={() => setEpoch(epoch + 1)}><RotateCcw size={17} /></button><a className="icon-button" aria-label="独立打开 Demo" title="独立打开 Demo" href={assetUrl(entry.demo)} target="_blank" rel="noreferrer"><ExternalLink size={17} /></a></div></div>
    <div className={`motion-stage ${orient === 'portrait' ? 'portrait' : ''}`}><iframe key={epoch} ref={frame} src={src.href} title={`${entry.title} Demo`} allow="autoplay; fullscreen" onLoad={() => send('motion:query')} onError={() => setError('Demo 加载失败。')} />{(!ready || error) && <div className="motion-loading" role="status"><span>{error || `正在准备画面 ${Math.round(progress * 100)}%`}</span>{error ? <Button size="sm" variant="secondary" onClick={() => setEpoch(epoch + 1)}><RotateCcw size={15} />重新加载</Button> : <progress value={progress} max={1} />}</div>}</div>
    <div className="motion-controls"><Button size="sm" variant="secondary" disabled={!ready} aria-label={playing ? '暂停' : '播放'} onClick={toggle}>{playing ? <Pause size={17} /> : <Play size={17} />}{playing ? '暂停' : '播放'}</Button><button className="icon-button" aria-label="上个节拍" title="上个节拍 [" disabled={!ready} onClick={() => seek(beats[Math.max(0, activeBeat - 1)]?.t || 0)}><SkipBack size={17} /></button><button className="icon-button" aria-label="下个节拍" title="下个节拍 ]" disabled={!ready} onClick={() => seek(beats[Math.min(beats.length - 1, activeBeat + 1)]?.t || duration)}><SkipForward size={17} /></button><span className="timecode">{clock(time)}<span> / {clock(duration)}</span></span><div className="controls-spacer" /><label className="rate-label"><span className="sr-only">播放速度</span><select aria-label="播放速度" value={rate} onChange={event => { setRate(event.target.value); api.current?.setRate(Number(event.target.value)); }}>{['0.5', '1', '1.5', '2'].map(value => <option value={value} key={value}>{value} 倍速</option>)}</select></label><button className="icon-button" disabled={hasSound === false} aria-pressed={sound} aria-label={hasSound === false ? '此 Demo 无声音' : sound ? '关闭声音' : '开启声音'} title={hasSound === false ? '此 Demo 无声音' : '声音 M'} onClick={() => send('motion:sound', { on: !sound })}>{sound ? <Volume2 size={18} /> : <VolumeX size={18} />}</button><button className="icon-button" title="全屏 F" aria-label="全屏" onClick={fullscreen}><Expand size={18} /></button></div>
    <div className="timeline-panel"><div className="energy-track">{curve && <svg viewBox="0 0 1000 50" preserveAspectRatio="none" role="img" aria-label="能量曲线"><path d={`${curve} L1000,50 L0,50 Z`} className="energy-fill" /><path d={curve} className="energy-line" /></svg>}<div className="timeline-head" style={{ left: `${duration ? time / duration * 100 : 0}%` }} /><input type="range" min={0} max={duration || 1} step={0.01} value={time} disabled={!ready} aria-label="播放时间轴" aria-valuetext={`${time.toFixed(2)} 秒，共 ${duration} 秒`} onChange={event => seek(Number(event.target.value))} />{beats.map((marker, index) => <button key={`${marker.t}-${index}`} className={`timeline-marker ${index === activeBeat ? 'active' : ''}`} style={{ left: `${marker.t / duration * 100}%` }} title={`${marker.t} 秒 ${marker.label}`} aria-label={`跳转至 ${marker.label} ${marker.t} 秒`} onClick={() => seek(marker.t)} />)}</div><div className="timeline-caption"><span>{curve ? '能量曲线与节拍' : '节拍定位'}</span><span>{beats.length} 个节拍</span></div><div className="beat-list">{beats.map((marker, index) => <button key={`${marker.t}-${index}`} className={index === activeBeat ? 'active' : ''} title={marker.note} onClick={() => seek(marker.t)}><span>{marker.t.toFixed(1)}s</span>{marker.label}</button>)}</div></div>
    <div className="player-help"><span>空格 播放 / 暂停</span><span>方向键 定位</span><span>[ ] 跳转节拍</span><span>M 声音</span><span>F 全屏</span>{soundState === 'blocked' && <strong>点击 Demo 画面以启用声音</strong>}</div>
  </section>;
}
