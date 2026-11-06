/*!
 * Motion Kit v2 · Motion Atlas
 * 无依赖的确定性动效运行时：时间轴 seek、缓动、节拍、文字揭示；固定画幅舞台；合成声音引擎与乐谱调度；预加载；控制条。
 * 复制本文件到页面旁边即可使用：<script src="motion-kit.js"></script>
 * 约定：时间驱动的作品把画面写成 render(t) 纯函数，并通过 MotionKit.expose() 暴露 window.__motion，
 *       站点刻度条与 scripts/render.mjs 逐帧渲染都依赖这个协议。完整说明见 docs/pipeline.md。
 */
(function (global) {
  'use strict';

  const VERSION = '2.0.0';
  const hasDOM = typeof document !== 'undefined';
  const atlasRoot = hasDOM && document.currentScript?.src.match(/^(.*\/)demos\/(?:cases|patterns|materials)\/[^/]+\/motion-kit\.js(?:\?.*)?$/)?.[1];
  const assetCacheReady = Promise.race([global.AtlasAssetCache?.ready || (atlasRoot ? new Promise(resolve => {
    const script = document.createElement('script');
    script.src = new URL('site/runtime/asset-cache.js', atlasRoot);
    script.onload = () => resolve(global.AtlasAssetCache.ready);
    script.onerror = () => resolve(false);
    document.head.append(script);
  }) : Promise.resolve(false)), new Promise(resolve => setTimeout(() => resolve(false), 1000))]);

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const invLerp = (a, b, v) => (a === b ? (v >= b ? 1 : 0) : clamp((v - a) / (b - a)));

  // CSS cubic-bezier 的 JS 实现（牛顿迭代 + 二分兜底）
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sx = (t) => ((ax * t + bx) * t + cx) * t;
    const sy = (t) => ((ay * t + by) * t + cy) * t;
    const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
    return (x) => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      let t = x;
      for (let i = 0; i < 8; i++) {
        const err = sx(t) - x;
        if (Math.abs(err) < 1e-5) return sy(t);
        const d = dx(t);
        if (Math.abs(d) < 1e-6) break;
        t -= err / d;
      }
      let lo = 0, hi = 1;
      t = x;
      for (let i = 0; i < 24; i++) {
        const v = sx(t);
        if (Math.abs(v - x) < 1e-5) break;
        if (v < x) lo = t; else hi = t;
        t = (lo + hi) / 2;
      }
      return sy(t);
    };
  }

  const ease = {
    linear: (t) => t,
    inQuad: (t) => t * t,
    outQuad: (t) => 1 - (1 - t) * (1 - t),
    inOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    inCubic: (t) => t * t * t,
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    outQuart: (t) => 1 - Math.pow(1 - t, 4),
    inOutQuart: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2),
    outQuint: (t) => 1 - Math.pow(1 - t, 5),
    inExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    inOutExpo: (t) => (t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2),
    outBack: (t, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
    outElastic: (t) => (t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1),
    // 命名动效 Token：与 docs/rhythm.md 对应
    snap: bezier(0.2, 0.9, 0.1, 1), // 机械吸附：快进、硬停
    glide: bezier(0.25, 0.1, 0.25, 1), // 平滑滑行
    emphasized: bezier(0.2, 0, 0, 1), // 强调进入
    exit: bezier(0.4, 0, 1, 1), // 快速离场
    anticipate: bezier(0.36, 0, 0.66, -0.56), // 先回拉再出发
  };

  /** 片段进度：t 落在 [start, start+dur] 内时 0→1，并套用缓动 */
  function seg(t, start, dur, e = ease.outCubic) {
    return e(clamp((t - start) / Math.max(dur, 1e-6)));
  }

  /** 入—停—出包络：a 开始进入，b 开始离开 */
  function env(t, a, b, inDur = 0.4, outDur = 0.3, ei = ease.outCubic, eo = ease.inCubic) {
    if (t < a) return 0;
    if (t < a + inDur) return ei((t - a) / inDur);
    if (t < b) return 1;
    if (t < b + outDur) return 1 - eo((t - b) / outDur);
    return 0;
  }

  /** 关键帧插值：frames = [{t, ...numbers}]，返回对应时刻的数值对象 */
  function keyframes(frames, t, e = ease.inOutCubic) {
    if (t <= frames[0].t) return { ...frames[0] };
    const last = frames[frames.length - 1];
    if (t >= last.t) return { ...last };
    let i = 0;
    while (i < frames.length - 2 && t > frames[i + 1].t) i++;
    const a = frames[i], b = frames[i + 1];
    const p = (b.ease || e)(invLerp(a.t, b.t, t));
    const out = { t };
    for (const k in b) {
      if (k === 't' || k === 'ease') continue;
      const va = a[k], vb = b[k];
      if (Array.isArray(vb)) out[k] = vb.map((v, j) => lerp(va[j], v, p));
      else if (typeof vb === 'number') out[k] = lerp(va, vb, p);
      else out[k] = p < 1 ? va : vb;
    }
    return out;
  }

  /** 可复现随机数（mulberry32） */
  function rng(seed = 1) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const chars = (s) => Array.from(String(s));

  /** 打字：按进度返回已出现的字符串（按 Unicode 字符计） */
  function typeText(text, p) {
    const c = chars(text);
    return c.slice(0, Math.round(clamp(p) * c.length)).join('');
  }

  /**
   * 字符解码：未解出的字符用字符集随机替换；tick 决定随机帧，保证同一时刻结果一致。
   * 返回 [{ch, done}]，便于给已解出字符和噪声字符不同样式。
   */
  function scramble(text, p, tick = 0, seed = 7, set = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#/%+=<>') {
    const c = chars(text);
    const r = rng(seed);
    const thresholds = c.map((_, i) => (i / c.length) * 0.7 + r() * 0.3);
    return c.map((ch, i) => {
      if (ch === ' ' || p >= thresholds[i]) return { ch, done: true };
      const rr = rng(seed * 131 + i * 17 + tick * 7919);
      return { ch: set[Math.floor(rr() * set.length)], done: false };
    });
  }

  /** 计数：from→to 按进度插值并格式化 */
  function count(from, to, p, decimals = 0) {
    const v = lerp(from, to, clamp(p));
    return v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  const pad = (n, len = 2) => String(Math.floor(n)).padStart(len, '0');

  /** 节拍：bpm 与起点 offset（秒） */
  function beats(bpm, offset = 0) {
    const spb = 60 / bpm;
    return {
      bpm,
      spb,
      at: (beat) => offset + beat * spb,
      beatOf: (t) => (t - offset) / spb,
      /** 每拍起点为 1、随后指数衰减的脉冲，用于闪光、缩放冲击 */
      pulse(t, decay = 6, every = 1) {
        const b = (t - offset) / (spb * every);
        if (b < 0) return 0;
        return Math.exp(-(b - Math.floor(b)) * decay);
      },
      /** 把时刻吸附到最近的拍点 */
      quantize: (t, div = 1) => offset + Math.round((t - offset) / (spb / div)) * (spb / div),
    };
  }

  /** 最小事件分发器：on(type, fn) 返回取消函数 */
  function emitter() {
    const map = new Map();
    return {
      on(type, fn) {
        if (!map.has(type)) map.set(type, new Set());
        map.get(type).add(fn);
        return () => map.get(type).delete(fn);
      },
      emit(type, ...args) {
        const set = map.get(type);
        if (!set) return;
        for (const fn of [...set]) {
          try { fn(...args); } catch (err) { console.error(err); }
        }
      },
    };
  }

  /**
   * 时间轴：render(t) 必须只依赖 t。返回控制器：play/pause/seek/on。
   * seek 返回 Promise，render 可返回 Promise（如等待地图瓦片）以便逐帧渲染。
   * duration 可在运行时修改（如改变 BPM 后重算长度）；loop 可读写；setRate 改变播放速率。
   * on(fn)：每次渲染回调 fn(t, playing)；on('play'|'pause'|'seek'|'rate'|'loop'|'end', fn)：状态事件
   *   （seek 回调参数为 (to, from)，声音调度器据此决定是否打断已排程的声音）。
   */
  function timeline({ duration, render, loop = false, markers = [], fps = 60 }) {
    let t = 0, playing = false, last = 0, raf = 0, rate = 1;
    const listeners = new Set();
    const bus = emitter();
    const draw = () => {
      const r = render(t);
      listeners.forEach((fn) => fn(t, playing));
      return r;
    };
    const frame = (now) => {
      if (!playing) return;
      const dt = Math.max(0, Math.min(0.1, (now - last) / 1000));
      last = now;
      t += dt * rate;
      let looped = false, ended = false;
      if (t >= api.duration) {
        if (loop) { t %= api.duration; looped = true; }
        else { t = api.duration; playing = false; ended = true; }
      }
      try { draw(); } catch (err) { console.error(err); }
      if (looped) bus.emit('loop', t);
      if (ended) bus.emit('end', t);
      if (playing) raf = requestAnimationFrame(frame);
    };
    const api = {
      duration, fps, markers,
      get time() { return t; },
      get playing() { return playing; },
      get rate() { return rate; },
      get loop() { return loop; },
      set loop(v) { loop = !!v; },
      setRate(r) {
        if (r === rate) return;
        rate = r;
        bus.emit('rate', r);
      },
      play() {
        if (playing) return;
        if (t >= api.duration) t = 0;
        playing = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
        bus.emit('play', t);
        listeners.forEach((fn) => fn(t, playing));
      },
      pause() {
        const was = playing;
        playing = false;
        cancelAnimationFrame(raf);
        if (was) bus.emit('pause', t);
        draw();
      },
      toggle() { playing ? api.pause() : api.play(); },
      seek(time) {
        const from = t;
        const v = Number(time);
        t = clamp(Number.isFinite(v) ? v : 0, 0, api.duration);
        bus.emit('seek', t, from);
        return Promise.resolve(draw()).then(() => t);
      },
      on(a, b) {
        if (typeof a === 'function') { listeners.add(a); return () => listeners.delete(a); }
        return bus.on(a, b);
      },
    };
    return api;
  }

  /**
   * 读取 URL 参数：?embed（站内嵌入）、?render（逐帧渲染）、?t=秒、?autoplay=0、
   * ?orient=landscape|portrait（固定画幅）、?sound=1（载入后尝试开启声音，仍受浏览器自动播放策略约束）。
   */
  function params() {
    const q = new URLSearchParams(hasDOM ? location.search : '');
    const o = (q.get('orient') || '').toLowerCase();
    return {
      embed: q.has('embed'),
      render: q.has('render'),
      t: q.has('t') ? Number(q.get('t')) : null,
      autoplay: q.get('autoplay') !== '0' && !q.has('render'),
      theme: q.get('theme'),
      orient: o === 'landscape' || o === 'l' ? 'landscape' : o === 'portrait' || o === 'p' ? 'portrait' : null,
      sound: q.get('sound') === '1',
    };
  }

  const prefersReducedMotion = () => global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =====================================================================
   * 共享状态与宿主通信
   * 站点详情页用同源 iframe 嵌入 Demo：父页面 → Demo：motion:orient / motion:sound / motion:query（及可选的 play/pause/seek）；
   * Demo → 父页面：motion:ready / motion:orient / motion:loading / motion:sound。协议见 docs/pipeline.md。
   * ===================================================================== */
  const KIT = {
    stage: null, // 当前舞台（stage() 创建）
    timeline: null, // 当前暴露的时间轴（expose() 设置）
    hostOrient: null, // 舞台创建前收到的宿主画幅请求
    preloads: [], // 已登记的预加载 Promise
    resources: new Map(),
    sources: new Map(),
    decoding: 0,
    progress: 0,
    error: null,
    readyState: false,
    usesSound: false, // 用到了声音（sound() / audio.play / attach / controls 的声音开关），站点据此显示开关
    events: emitter(),
  };
  const inFrame = (() => { try { return hasDOM && global.parent && global.parent !== global; } catch (e) { return false; } })();
  function post(msg) {
    if (!inFrame) return;
    global.parent.postMessage(msg, '*');
  }

  /* =====================================================================
   * 舞台：固定画幅 + 整体等比缩放（letterbox）
   * ===================================================================== */
  const STAGE_SIZES = { landscape: [1920, 1080], portrait: [1080, 1920] };
  let stageCSS = false;
  function injectStageCSS() {
    if (stageCSS || !hasDOM) return;
    stageCSS = true;
    const s = document.createElement('style');
    s.dataset.motionKit = 'stage';
    s.textContent = `
      html.mk-stage-page,html.mk-stage-page body{margin:0;width:100%;height:100%;overflow:hidden;background:var(--mk-letterbox,#000)}
      .mk-stage-host{position:relative;overflow:hidden;background:var(--mk-letterbox,#000)}
      .mk-stage{position:absolute!important;left:0;top:0;margin:0!important;box-sizing:border-box;overflow:hidden;transform-origin:0 0}`;
    (document.head || document.documentElement).appendChild(s);
  }

  /**
   * 创建舞台。舞台根节点固定为像素尺寸（横屏 1920×1080 / 竖屏 1080×1920），整体用 transform 缩放到容器并居中，四周黑边。
   * 画幅优先级：URL ?orient → 宿主消息 motion:orient → 按容器宽高比自动（只在自动模式下随窗口改变）。
   * opts：
   *   root        舞台根节点或选择器（默认 [data-stage] / #stage / .stage）
   *   orients     支持的画幅（默认 ['landscape','portrait']；只给一个即固定画幅）
   *   sizes       覆盖尺寸 { landscape:[w,h], portrait:[w,h] }
   *   container   缩放容器（默认整个窗口）
   *   background  黑边颜色（默认 #000）
   *   onOrient    画幅切换回调 (orient, {width,height})；在重新 render 当前时刻之前调用（创建时不调用）
   * 返回 stage：orient / width / height / scale / setOrient(o) / toggleOrient() / toStage(x,y) / fromStage(x,y) / on('orient'|'resize', fn)
   */
  function stage(opts = {}) {
    if (!hasDOM) throw new Error('MotionKit.stage() 需要浏览器环境');
    const p = params();
    const pick = (x) => (typeof x === 'string' ? document.querySelector(x) : x);
    const root = pick(opts.root) || document.querySelector('[data-stage]') || document.getElementById('stage') || document.querySelector('.stage');
    if (!root) throw new Error('MotionKit.stage()：找不到舞台根节点（[data-stage] / #stage / .stage）');
    const sizes = Object.assign({}, STAGE_SIZES, opts.sizes || {});
    const orients = (opts.orients || ['landscape', 'portrait']).filter((o) => sizes[o]);
    if (!orients.length) throw new Error('MotionKit.stage()：orients 为空');
    const container = pick(opts.container) || null;
    const html = document.documentElement;
    const bus = emitter();
    let scale = 1, ox = 0, oy = 0, orient, mode;

    const box = () => (container
      ? { w: container.clientWidth, h: container.clientHeight }
      : { w: html.clientWidth || global.innerWidth, h: html.clientHeight || global.innerHeight });
    const autoPick = (current) => {
      const { w, h } = box();
      if (!w || !h) return current || orients[0];
      const a = w / h;
      if (orients.includes('portrait') && a < (current === 'portrait' ? 1.05 : 0.95)) return 'portrait';
      if (orients.includes('landscape')) return 'landscape';
      return orients[0];
    };
    if (p.orient && orients.includes(p.orient)) { orient = p.orient; mode = 'url'; }
    else if (KIT.hostOrient && orients.includes(KIT.hostOrient)) { orient = KIT.hostOrient; mode = 'host'; }
    else { orient = autoPick(null); mode = 'auto'; }
    if (orients.length === 1) mode = 'fixed';

    injectStageCSS();
    if (container) {
      container.classList.add('mk-stage-host');
      if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
    } else html.classList.add('mk-stage-page');
    if (opts.background) (container || html).style.setProperty('--mk-letterbox', opts.background);
    root.classList.add('mk-stage');

    function apply() {
      const [w, h] = sizes[orient];
      root.style.width = w + 'px';
      root.style.height = h + 'px';
      root.dataset.orient = orient;
      html.dataset.orient = orient;
      html.style.setProperty('--stage-w', w + 'px');
      html.style.setProperty('--stage-h', h + 'px');
    }
    function fit() {
      const [w, h] = sizes[orient];
      const b = box();
      const s = b.w && b.h ? Math.min(b.w / w, b.h / h) : 1;
      scale = s;
      ox = Math.round((b.w - w * s) / 2);
      oy = Math.round((b.h - h * s) / 2);
      root.style.transform = `translate(${ox}px, ${oy}px) scale(${s})`;
      html.style.setProperty('--stage-scale', String(s));
      bus.emit('resize', s);
    }
    function setOrient(o, source = 'api') {
      if (!orients.includes(o)) {
        post({ type: 'motion:orient', orient, supported: orients.slice(), rejected: o });
        return Promise.resolve(false);
      }
      if (source !== 'auto' && mode !== 'fixed') mode = source;
      if (o === orient) return Promise.resolve(true);
      orient = o;
      apply();
      fit();
      const size = { width: sizes[o][0], height: sizes[o][1] };
      try { opts.onOrient && opts.onOrient(o, size); } catch (err) { console.error(err); }
      bus.emit('orient', o, size);
      audio._resyncAll(true); // 画幅切换：停止已排程与正在发声的声音，从当前位置继续
      post({ type: 'motion:orient', orient: o });
      global.dispatchEvent(new CustomEvent('motion:orient', { detail: { orient: o } }));
      const tl = KIT.timeline;
      return tl ? tl.seek(tl.time).then(() => true) : Promise.resolve(true);
    }

    apply();
    fit();
    const onResize = () => {
      fit();
      if (mode === 'auto') {
        const a = autoPick(orient);
        if (a !== orient) setOrient(a, 'auto');
      }
    };
    if (container && global.ResizeObserver) new ResizeObserver(onResize).observe(container);
    else global.addEventListener('resize', onResize);

    const api = {
      root, sizes, orients: orients.slice(), container,
      get orient() { return orient; },
      get width() { return sizes[orient][0]; },
      get height() { return sizes[orient][1]; },
      get scale() { return scale; },
      get mode() { return mode; },
      get portrait() { return orient === 'portrait'; },
      setOrient,
      toggleOrient() { return setOrient(orient === 'portrait' ? 'landscape' : 'portrait', 'user'); },
      /** 视口坐标（clientX/clientY）→ 舞台像素坐标 */
      toStage(cx, cy) {
        const r = root.getBoundingClientRect();
        return { x: (cx - r.left) / scale, y: (cy - r.top) / scale };
      },
      /** 舞台像素坐标 → 视口坐标 */
      fromStage(x, y) {
        const r = root.getBoundingClientRect();
        return { x: r.left + x * scale, y: r.top + y * scale };
      },
      fit,
      on: bus.on,
    };
    KIT.stage = api;
    KIT.events.emit('stage', api);
    return api;
  }

  /* =====================================================================
   * 预加载
   * ===================================================================== */
  function loadingState() {
    const resources = new Map(KIT.resources);
    for (const state of KIT.sources.values()) for (const item of state.resources || []) {
      const previous = resources.get(item.url);
      if (!previous || item.loaded > previous.loaded) resources.set(item.url, item);
    }
    const list = [...resources.values()];
    const loadedBytes = list.reduce((n, r) => n + r.loaded, 0);
    const totalBytes = list.reduce((n, r) => n + Math.max(r.total, r.loaded), 0);
    const unknownTotal = list.some(r => !r.known);
    const now = performance.now();
    samples.push([now, loadedBytes]);
    while (samples.length > 1 && samples[1][0] < now - 3000) samples.shift();
    const speed = samples.length > 1 ? Math.max(0, (loadedBytes - samples[0][1]) / Math.max(.001, (now - samples[0][0]) / 1000)) : 0;
    const downloading = !list.length || list.some(r => !r.downloaded);
    const children = [...KIT.sources.values()];
    const phase = KIT.error ? 'error' : KIT.readyState ? 'ready' : downloading || children.some(s => s.phase === 'download') ? 'download' : KIT.decoding || children.some(s => s.phase === 'decode') ? 'decode' : 'frame';
    const unknownPending = list.some(r => !r.known && !r.downloaded) || children.some(s => !s.filesTotal && s.phase !== 'ready');
    KIT.progress = KIT.readyState ? 1 : Math.max(KIT.progress, Math.min(.99, !unknownPending && totalBytes ? loadedBytes / totalBytes : 0));
    return { progress: KIT.progress, loadedBytes, totalBytes, unknownTotal, bytesPerSecond: speed,
      filesDone: list.filter(r => r.downloaded).length, filesTotal: list.length, phase,
      error: KIT.error?.message || null, resources: list.map(({ url, loaded, total, known, downloaded }) => ({ url, loaded, total, known, downloaded })) };
  }
  const samples = [];
  function loadProgress() { return loadingState().progress; }
  const phaseText = { download: '下载中', decode: '解码中', frame: '准备首帧', error: '加载失败', ready: '就绪' };
  function loadingText(s) {
    const mb = n => (n / 1e6).toFixed(1);
    return `已下载 ${mb(s.loadedBytes)}${s.unknownTotal ? ' MB' : ''} / ${s.unknownTotal ? '未知总量' : mb(s.totalBytes) + ' MB'} · ${mb(s.bytesPerSecond)} MB/s · 文件 ${s.filesDone} / ${s.filesTotal} · ${phaseText[s.phase]}`;
  }
  let overlay = null, loadingStarted = false;
  function reportLoading() {
    const detail = loadingState(), progress = detail.progress;
    if (hasDOM) {
      document.documentElement.dataset.motionLoading = progress >= 1 ? 'done' : progress.toFixed(3);
      global.dispatchEvent(new CustomEvent('motion:loading', { detail }));
    }
    post({ type: 'motion:loading', ...detail });
    // 独立打开时显示一条细进度条；嵌入与渲染模式交给宿主或不显示
    const p = params();
    if (!loadingStarted || !hasDOM || p.embed || p.render) return;
    if (progress < 1 && !overlay && document.body) {
      overlay = document.createElement('div');
      overlay.className = 'mk-loading';
      overlay.setAttribute('role', 'progressbar');
      overlay.setAttribute('aria-label', '正在加载资源');
      overlay.innerHTML = '<i></i><span></span><p></p><button type="button" hidden>重试</button>';
      overlay.querySelector('button').onclick = () => location.reload();
      const st = document.createElement('style');
      st.textContent = `.mk-loading{position:fixed;left:0;right:0;top:0;z-index:10000;background:rgba(12,13,15,.94);color:#f1efe9;font:12px/1.5 system-ui;text-align:center;padding-bottom:12px}
        .mk-loading i{min-height:3px}
        .mk-loading i{display:block;height:100%;width:0;background:#f1efe9;transition:width .2s}
        .mk-loading span{display:block;margin:10px 12px 0}.mk-loading p{margin:6px 12px;overflow-wrap:anywhere}.mk-loading p:empty{display:none}
        .mk-loading button{font:inherit;padding:5px 14px;cursor:pointer}.mk-loading button[hidden]{display:none}
        @media(prefers-reduced-motion:reduce){.mk-loading i{transition:none}}`;
      document.head.appendChild(st);
      document.body.appendChild(overlay);
    }
    if (overlay) {
      overlay.querySelector('i').style.width = (progress * 100).toFixed(1) + '%';
      overlay.querySelector('span').textContent = loadingText(detail);
      overlay.querySelector('p').textContent = detail.error || '';
      overlay.querySelector('button').hidden = !detail.error;
      overlay.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      if (progress >= 1) { const o = overlay; overlay = null; setTimeout(() => o.remove(), 250); }
    }
  }

  function failLoading(error) {
    if (!KIT.error) KIT.error = error instanceof Error ? error : new Error(String(error));
    rejectLoading(KIT.error);
    KIT.timeline?.pause();
    reportLoading();
    KIT.events.emit('loading');
  }
  let rejectLoading;
  const loadingFailed = new Promise((_, reject) => { rejectLoading = reject; });
  loadingFailed.catch(() => {});
  let resolveExposed;
  const exposed = new Promise(resolve => { resolveExposed = resolve; });

  const sharedStore = (() => {
    if (inFrame) { try { if (global.parent.MotionKit) return global.parent.MotionKit.load._store; } catch {} }
    return new Map();
  })();
  const absolute = (url, base = document.baseURI) => new URL(url, base).href;
  const fetchResource = global.fetch.bind(global);
  const assetKey = url => global.MotionAtlasAssets?.resolve(url) || url;
  function register(urls, base = document.baseURI) {
    loadingStarted = true;
    return urls.map(item => {
      const src = absolute(typeof item === 'string' ? item : item.url, base), url = assetKey(src);
      let r = sharedStore.get(url);
      if (!r) {
        const bytes = (typeof item === 'object' && item.bytes) || global.MotionAtlasAssets?.info(src)?.bytes || 0;
        r = { url, src, loaded: 0, total: bytes, known: !!bytes, downloaded: false };
        sharedStore.set(url, r);
      }
      KIT.resources.set(url, r);
      return r;
    });
  }
  async function countedFetch(url, options = {}) {
    const [r] = register([url]);
    if (!r.promise) r.promise = (async () => {
      const controller = new AbortController();
      let timer;
      const reset = () => { clearTimeout(timer); timer = setTimeout(() => controller.abort(new Error('下载超时 ' + r.src)), 60000); };
      try {
        await assetCacheReady;
        const response = await fetchResource(r.src, { ...options, signal: options.signal ? AbortSignal.any([options.signal, controller.signal]) : controller.signal });
        if (!response.ok) throw new Error(`${response.status} ${r.src}`);
        reset();
        if (!r.known && !response.headers.get('Content-Encoding')) {
          r.total = Number(response.headers.get('Content-Length')) || 0;
          r.known = r.total > 0;
        }
        const chunks = [], reader = response.body.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value); r.loaded += value.byteLength;
          if (r.loaded > r.total) r.total = r.loaded;
          reset();
        }
        r.total = r.loaded; r.known = true;
        r.body = new Blob(chunks, { type: response.headers.get('Content-Type') || '' });
        r.headers = response.headers;
        r.downloaded = true;
        reportLoading();
      } finally { clearTimeout(timer); }
    })().catch(error => { failLoading(error); throw error; });
    await r.promise;
    const response = new Response(r.body, { headers: r.headers });
    Object.defineProperty(response, 'url', { value: r.src });
    return response;
  }
  async function decode(run) {
    KIT.decoding++; reportLoading();
    try { return await run(); } finally { KIT.decoding--; reportLoading(); }
  }
  async function loadImage(url) {
    const [r] = register([url]);
    if (!r.image) r.image = (async () => {
      await countedFetch(r.src);
      return decode(async () => {
        const image = new Image();
        r.blobURL ||= URL.createObjectURL(r.body);
        image.src = r.blobURL;
        await image.decode();
        return image;
      });
    })();
    return r.image;
  }
  const styles = new WeakMap(), modules = new Map();
  async function loadStyle(url, options = {}) {
    const doc = options.document || document;
    if (!styles.has(doc)) styles.set(doc, new Map());
    const cache = styles.get(doc), key = absolute(url) + (options.fonts === false ? ':layout' : ':fonts');
    url = absolute(url);
    if (cache.has(key)) return cache.get(key);
    const style = doc.createElement('style');
    doc.head.insertBefore(style, options.before || null);
    const promise = (async () => {
      let text = await (await countedFetch(url)).text();
      const imports = [...text.matchAll(/@import\s+(?:url\(\s*)?['"]([^'"]+)['"]\s*\)?[^;]*;/g)];
      await Promise.all(imports.map(m => loadStyle(absolute(m[1], url), options)));
      for (const m of imports) text = text.replace(m[0], '');
      const parsed = new CSSStyleSheet(); parsed.replaceSync(text);
      for (let i = parsed.cssRules.length - 1; i >= 0; i--) {
        const rule = parsed.cssRules[i];
        if (rule.type !== CSSRule.FONT_FACE_RULE) continue;
        const ranges = (rule.style.getPropertyValue('unicode-range') || 'U+0-10FFFF').split(',').map(range => {
          const value = range.trim().slice(2), [a, b = a] = value.split('-');
          return [parseInt(a.replaceAll('?', '0'), 16), parseInt(b.replaceAll('?', 'F'), 16)];
        });
        if (options.fonts === false || options.fontText && ![...options.fontText].some(char => ranges.some(([a, b]) => char.codePointAt(0) >= a && char.codePointAt(0) <= b))) parsed.deleteRule(i);
      }
      text = text.replace(/@font-face\s*\{[^}]*\}/gi, '') + '\n' + [...parsed.cssRules].filter(rule => rule.type === CSSRule.FONT_FACE_RULE).map(rule => rule.cssText).join('\n');
      const urls = [...text.matchAll(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g)].filter(m => !/^(data:|blob:|#)/.test(m[2]));
      register(urls.map(m => absolute(m[2], url)));
      await Promise.all(urls.map(async m => {
        const src = absolute(m[2], url), [r] = register([src]);
        await countedFetch(src);
        r.blobURL ||= URL.createObjectURL(r.body);
        text = text.replaceAll(m[0], `url("${r.blobURL}")`);
        if (!/\.(woff2?|[ot]tf)(?:[?#]|$)/i.test(src)) await loadImage(src);
      }));
      const sheet = new CSSStyleSheet(); sheet.replaceSync(text);
      const faces = await Promise.all([...sheet.cssRules].filter(rule => rule.type === CSSRule.FONT_FACE_RULE).map(rule => decode(async () => {
        const s = rule.style, descriptors = {};
        for (const [css, js] of [['font-weight','weight'],['font-style','style'],['font-stretch','stretch'],['unicode-range','unicodeRange'],['font-display','display']]) if (s.getPropertyValue(css)) descriptors[js] = s.getPropertyValue(css);
        const face = new FontFace(s.getPropertyValue('font-family').replace(/^['"]|['"]$/g, ''), s.getPropertyValue('src'), descriptors);
        await face.load(); return face;
      })));
      faces.forEach(face => doc.fonts.add(face));
      style.textContent = text.replace(/@font-face\s*\{[^}]*\}/gi, '');
    })();
    cache.set(key, promise);
    return promise;
  }
  function moduleSpecifier(spec, base) {
    const imports = JSON.parse(document.querySelector('script[type="importmap"]')?.textContent || '{}').imports || {};
    if (imports[spec]) return absolute(imports[spec]);
    const prefix = Object.keys(imports).find(key => key.endsWith('/') && spec.startsWith(key));
    return prefix ? absolute(imports[prefix] + spec.slice(prefix.length)) : absolute(spec, base);
  }
  async function moduleURL(url) {
    url = absolute(url);
    if (modules.has(url)) return modules.get(url);
    const promise = (async () => {
      let code = await (await countedFetch(url)).text();
      const matches = [...code.matchAll(/(?:^[ \t]*(?:import|export)[ \t]+(?:[^;'"]*?\bfrom\s*)?|\bimport\s*\(\s*)(['"])([^'"\n]+)\1/gm)];
      const deps = await Promise.all(matches.map(m => moduleURL(moduleSpecifier(m[2], url))));
      for (let i = matches.length - 1; i >= 0; i--) {
        const m = matches[i], offset = m.index + m[0].lastIndexOf(m[1] + m[2] + m[1]);
        code = code.slice(0, offset) + JSON.stringify(deps[i]) + code.slice(offset + m[2].length + 2);
      }
      code = code.replaceAll('import.meta.url', JSON.stringify(url));
      return URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
    })();
    modules.set(url, promise);
    return promise;
  }
  const load = {
    _store: sharedStore, register, fetch: countedFetch, image: loadImage, stylesheet: loadStyle,
    font: (family, url, descriptors = {}) => decode(async () => {
      const data = await (await countedFetch(url)).arrayBuffer();
      const face = new FontFace(family, data, descriptors); await face.load(); document.fonts.add(face); return face;
    }),
    audio: url => decode(async () => new OfflineAudioContext(2, 1, 48000).decodeAudioData(await (await countedFetch(url)).arrayBuffer())),
    async loader(run, target = global) {
      const original = target.fetch;
      target.fetch = async (input, options) => {
        const url = typeof input === 'string' ? input : input.url;
        if (/^(blob:|data:)/.test(url)) return original.call(target, input, options);
        const response = await countedFetch(absolute(url, target.document.baseURI), options);
        return new target.Response(response.body, { headers: response.headers });
      };
      try { return await decode(run); } finally { target.fetch = original; }
    },
    module: async url => import(await moduleURL(url)), moduleURL,
    script: async (url, options = {}) => { const doc = options.document || document; const text = await (await countedFetch(url)).text(); const script = doc.createElement('script'); script.textContent = text; doc.head.appendChild(script); },
    url: url => { const r = KIT.resources.get(assetKey(absolute(url))); if (!r?.blobURL) throw new Error('资源未准备 ' + url); return r.blobURL; },
    decode,
    fail: failLoading,
    source: (id, state) => { KIT.sources.set(id, state); if (state.error) failLoading(new Error(state.error)); reportLoading(); },
    get state() { return loadingState(); },
    async prepare({ styles = [], modules = [], images = [], data = [], audio = [], fontText }) {
      loadingStarted = true;
      register([...styles, ...modules, ...images, ...data, ...audio]); reportLoading();
      const ready = Promise.all([...styles.map(url => loadStyle(url, { fontText })), ...modules.map(moduleURL), ...images.map(loadImage), ...data.map(url => countedFetch(url)), ...audio.map(url => countedFetch(url))]);
      preload([ready]);
      await ready;
    },
  };
  if (hasDOM) {
    const heartbeat = setInterval(() => { if (KIT.readyState || KIT.error) clearInterval(heartbeat); reportLoading(); }, 200);
    global.addEventListener('unhandledrejection', e => { if (!KIT.readyState) failLoading(e.reason); });
    document.addEventListener('DOMContentLoaded', () => { if (!KIT.readyState) reportLoading(); }, { once: true });
  }

  /**
   * 预加载：tasks 为返回 Promise 的函数（或 Promise、或 { run, weight, label }）。
   * 必需任务失败或超时会拒绝 ready。
   */
  function preload(tasks, { onProgress, timeout = 3600000 } = {}) {
    loadingStarted = true;
    const list = (Array.isArray(tasks) ? tasks : [tasks]).filter(Boolean).map((x, i) => {
      if (typeof x === 'function') return { run: x, weight: 1, label: x.label || `task ${i + 1}` };
      if (x && typeof x.then === 'function') return { run: () => x, weight: 1, label: `promise ${i + 1}` };
      return { run: x.run, weight: x.weight ?? 1, label: x.label || `task ${i + 1}` };
    });
    const total = list.reduce((s, x) => s + x.weight, 0);
    let done = 0;
    reportLoading();
    const promise = Promise.all(list.map((item) => {
      let timer = 0;
      const guard = new Promise((_, rej) => { timer = setTimeout(() => rej(new Error(item.label + ' 超时')), timeout); });
      return Promise.race([Promise.resolve().then(item.run), guard])
        .then((v) => {
          clearTimeout(timer);
          done += item.weight;
          try { onProgress && onProgress(total ? done / total : 1, done, total); } catch (err) { console.error(err); }
          reportLoading();
          return v;
        }).catch(err => { failLoading(err); throw err; }).finally(() => clearTimeout(timer));
    }));
    KIT.preloads.push(promise);
    promise.catch(() => {});
    return promise;
  }
  /** 预加载任务工厂：图片（解码完成）、字体、任意 URL、等待 */
  preload.image = (src) => {
    const fn = () => loadImage(src).then(img => { preload.cache.set(src, img); return img; });
    fn.label = src;
    return fn;
  };
  preload.font = (spec, text) => {
    const fn = () => (document.fonts ? document.fonts.load(spec, text).then((r) => r) : Promise.resolve());
    fn.label = spec;
    return fn;
  };
  preload.fonts = () => {
    const fn = () => (document.fonts ? document.fonts.ready : Promise.resolve());
    fn.label = 'document.fonts.ready';
    return fn;
  };
  preload.fetch = (url, as = 'blob') => {
    const fn = () => countedFetch(url).then(r => r[as]()).then((v) => { preload.cache.set(url, v); return v; });
    fn.label = url;
    return fn;
  };
  preload.wait = (ms) => () => new Promise((r) => setTimeout(r, ms));
  /** 已加载资源缓存：preload.cache.get(url) → HTMLImageElement / Blob … */
  preload.cache = new Map();

  /** 等待全部预加载（包括 expose 之后同一轮登记的） */
  async function allLoaded() {
    await new Promise((r) => setTimeout(r, 0));
    let n;
    do {
      n = KIT.preloads.length + KIT.resources.size;
      await Promise.race([Promise.all([...KIT.preloads, ...[...KIT.resources.values()].map(r => r.promise)]), loadingFailed]);
    } while (KIT.preloads.length + KIT.resources.size !== n);
  }

  /* =====================================================================
   * 声音引擎（WebAudio 合成，零外部素材）
   * 链路：音色 → 事件增益（gain）→ 声像（pan）→ 分组总线（music / sfx / ui，bed 属于 music 且受侧链闪避）
   *       → 主增益 → 压缩 → 微调 → 软削波天花板（-1 dBFS）→ 输出；另有卷积混响发送（send）。
   * 音色函数签名：(ctx, out, when, params) → 结束时刻（秒，可省略）。
   * ===================================================================== */
  const NOTE_IDX = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  /** 音高：MIDI 数字（0–127）或音名 'A4' / 'C#5' / 'Eb3' → Hz */
  function noteHz(n) {
    if (n == null) return null;
    if (typeof n === 'number') return n > 127 ? n : 440 * Math.pow(2, (n - 69) / 12);
    const m = /^([a-gA-G])([#b]?)(-?\d+)$/.exec(String(n).trim());
    if (!m) return null;
    const midi = 12 * (Number(m[3]) + 1) + NOTE_IDX[m[1].toLowerCase()] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }
  const hzOf = (p, def) => (p.f != null ? p.f : p.note != null ? noteHz(p.note) || def : def);
  const semis = (f, s) => f * Math.pow(2, s / 12);
  const hashStr = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };

  // 当前正在构建的声部记录：音源经 track() 登记，flush 时可以逐个停止
  let TRACK = null;
  function track(src, when, stop, offset) {
    if (offset != null) src.start(when, offset); else src.start(when);
    src.stop(stop);
    if (TRACK) { TRACK.sources.push(src); if (stop > TRACK.end) TRACK.end = stop; }
    return src;
  }
  function gain(ctx, v = 1) { const g = ctx.createGain(); g.gain.value = v; return g; }
  function osc(ctx, type, f, when, stop, detune = 0) {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f, when);
    if (detune) o.detune.setValueAtTime(detune, when);
    return track(o, when, stop);
  }
  function bq(ctx, type, f, Q = 0.707, g = 0) {
    const b = ctx.createBiquadFilter();
    b.type = type;
    b.frequency.value = f;
    b.Q.value = Q;
    if (g) b.gain.value = g;
    return b;
  }
  function panner(ctx, v) { const sp = ctx.createStereoPanner(); sp.pan.value = clamp(v, -1, 1); return sp; }
  // 噪声缓冲：每个 AudioContext 生成一次，种子固定，离线渲染结果可复现
  const NOISE = new WeakMap();
  function noiseBuf(ctx, color = 'white') {
    let c = NOISE.get(ctx);
    if (!c) NOISE.set(ctx, (c = {}));
    if (c[color]) return c[color];
    const len = Math.floor(ctx.sampleRate * 2.5);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    const r = rng(hashStr(color) || 1);
    if (color === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < len; i++) {
        const w = r() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
        b6 = w * 0.115926;
      }
    } else if (color === 'brown') {
      let last = 0;
      for (let i = 0; i < len; i++) { last = (last + 0.02 * (r() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    } else {
      for (let i = 0; i < len; i++) d[i] = r() * 2 - 1;
    }
    // 首尾交叉淡化，循环播放无接缝
    const x = Math.floor(ctx.sampleRate * 0.01);
    for (let i = 0; i < x; i++) { const k = i / x; d[i] = d[i] * k + d[len - x + i] * (1 - k); }
    c[color] = buf;
    return buf;
  }
  function noiseSrc(ctx, when, stop, p = {}, color = 'white') {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf(ctx, color);
    s.loop = true;
    const off = (((p.seed || 1) * 0.6180339887) % 1) * 2;
    return track(s, when, stop, off);
  }
  /** 打击包络：attack 秒线性升到 peak，再用 decay 秒指数衰减到 -80 dB；返回结束时刻 */
  function perc(param, when, peak, attack, decay) {
    param.setValueAtTime(0.0001, when);
    param.linearRampToValueAtTime(Math.max(0.0001, peak), when + attack);
    param.exponentialRampToValueAtTime(0.0001, when + attack + decay);
    return when + attack + decay;
  }
  /**
   * 中途进入（offset）：持续型音色从事件开始后 off 秒处接上。
   * sweepAt(param, a, b, w, total, off)：指数扫频 a→b（总长 total），从进度 off/total 处开始，在剩余时间内走完
   * swellAt(param, peak, w, total, off)：指数渐强 0.0001→peak，同上；中途进入时先用 30ms 淡入到当前值，避免爆音
   */
  const expAt = (a, b, x) => a * Math.pow(b / a, clamp(x));
  function sweepAt(param, a, b, w, total, off) {
    param.setValueAtTime(expAt(a, b, off / total), w);
    param.exponentialRampToValueAtTime(b, w + Math.max(0.01, total - off));
  }
  function swellAt(param, peak, w, total, off) {
    const v0 = Math.max(0.0001, expAt(0.0001, peak, off / total));
    param.setValueAtTime(0.0001, w);
    if (off > 0) { param.linearRampToValueAtTime(v0, w + 0.03); param.exponentialRampToValueAtTime(Math.max(0.0001, peak), w + Math.max(0.04, total - off)); }
    else param.exponentialRampToValueAtTime(Math.max(0.0001, peak), w + total);
  }
  const offOf = (p, total) => clamp(p.offset || 0, 0, Math.max(0, total - 0.02));

  const CURVES = new Map();
  function driveCurve(k) {
    const key = 'd' + Math.round(k * 100);
    if (CURVES.has(key)) return CURVES.get(key);
    const n = 2048, c = new Float32Array(n), norm = Math.tanh(k);
    for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; c[i] = Math.tanh(k * x) / norm; }
    CURVES.set(key, c);
    return c;
  }
  /** 饱和失真：k≈1 轻微，k≈3 明显 */
  function drive(ctx, k) { const w = ctx.createWaveShaper(); w.curve = driveCurve(Math.max(0.05, k)); w.oversample = '2x'; return w; }
  function stepCurve(bits) {
    const key = 's' + bits;
    if (CURVES.has(key)) return CURVES.get(key);
    const n = 4096, c = new Float32Array(n), lv = Math.pow(2, bits);
    for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; c[i] = Math.round(x * lv) / lv; }
    CURVES.set(key, c);
    return c;
  }
  // 主输出天花板：|x| ≤ 0.6（约 -4.4 dBFS）线性，之上 tanh 软膝趋近 -1 dBFS；超出 ±1 的输入被钳到曲线端点，因此输出峰值严格 < -1 dBFS
  const CEILING = Math.pow(10, -1 / 20);
  function ceilingCurve() {
    if (CURVES.has('ceil')) return CURVES.get('ceil');
    const n = 8193, c = new Float32Array(n), K = 0.6, R = CEILING - K;
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1, a = Math.abs(x);
      c[i] = a <= K ? x : Math.sign(x) * (K + R * Math.tanh((a - K) / R));
    }
    CURVES.set('ceil', c);
    return c;
  }
  // 程序生成的混响脉冲响应：早期反射 + 指数衰减、随时间变暗的双声道噪声尾
  function impulse(ctx, seconds = 2.6, rt60 = 2.2) {
    const sr = ctx.sampleRate, len = Math.floor(sr * seconds);
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch), r = rng(9001 + ch * 131);
      let lp = 0;
      for (let i = 0; i < len; i++) {
        const x = i / len, t = i / sr;
        const k = 0.9 - 0.75 * x;
        lp += k * ((r() * 2 - 1) - lp);
        d[i] = lp * Math.exp((-6.9 * t) / rt60);
      }
      [0.009, 0.017, 0.026, 0.039, 0.052, 0.071].forEach((s, j) => {
        const i = Math.floor(s * sr * (1 + ch * 0.06));
        if (i < len) d[i] += (j % 2 ? -1 : 1) * (0.55 - j * 0.07);
      });
      const fi = Math.floor(sr * 0.003);
      for (let i = 0; i < fi; i++) d[i] *= i / fi;
    }
    return buf;
  }

  /* ---------- 音色库 ---------- */
  const VOICES = {}, META = {};
  /** META：bus 默认总线；send 默认混响发送；duck 侧链闪避深度（0–1，压低 bed 总线）；level 校准增益 */
  function voice(name, meta, fn) { VOICES[name] = fn; META[name] = meta; }
  const vOf = (p) => (p.vel != null ? p.vel : 1);

  // 底鼓：正弦 + 音高包络（punch 倍起跳）+ 噪声点击 + 饱和
  voice('kick', { bus: 'music', send: 0, duck: 0.45, level: 0.78 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 48), punch = p.punch ?? 3.6, dec = p.decay ?? 0.45, click = p.click ?? 0.5, end = w + dec + 0.03;
    const o = osc(ctx, 'sine', f * punch, w, end);
    o.frequency.exponentialRampToValueAtTime(f * 1.3, w + 0.035);
    o.frequency.exponentialRampToValueAtTime(f, w + 0.15);
    const g = gain(ctx, 0);
    g.gain.setValueAtTime(0.0001, w);
    g.gain.linearRampToValueAtTime(vel, w + 0.002);
    g.gain.setValueAtTime(vel, w + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, w + dec);
    o.connect(g).connect(drive(ctx, 1 + (p.drive ?? 0.35) * 3)).connect(out);
    if (click > 0) {
      const n = noiseSrc(ctx, w, w + 0.03, p), hp = bq(ctx, 'highpass', 1800, 0.8), cg = gain(ctx, 0);
      perc(cg.gain, w, 0.5 * click * vel, 0.0006, 0.012);
      n.connect(hp).connect(cg).connect(out);
    }
    return end;
  });

  // 军鼓：两支三角波鼓皮（快速下滑）+ 高通白噪声响弦
  voice('snare', { bus: 'music', send: 0.12, level: 0.68 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 185), dec = p.decay ?? 0.2, snap = p.snappy ?? 0.75, end = w + Math.max(dec, 0.15) + 0.03;
    [[1, 0.55], [1.62, 0.28]].forEach(([m, a]) => {
      const o = osc(ctx, 'triangle', f * m * 1.4, w, w + 0.17);
      o.frequency.exponentialRampToValueAtTime(f * m, w + 0.025);
      const g = gain(ctx, 0);
      perc(g.gain, w, a * vel, 0.001, 0.12);
      o.connect(g).connect(out);
    });
    const n = noiseSrc(ctx, w, end, p), hp = bq(ctx, 'highpass', 1100, 0.7), pk = bq(ctx, 'peaking', 4200 * (p.bright ?? 1), 0.9, 5), g = gain(ctx, 0);
    perc(g.gain, w, 0.75 * snap * vel, 0.001, dec);
    n.connect(hp).connect(pk).connect(g).connect(out);
    return end;
  });

  // 拍手：带通噪声，三次快速重触发 + 尾音
  voice('clap', { bus: 'music', send: 0.25, level: 1.46 }, (ctx, out, w, p) => {
    const vel = vOf(p), dec = p.decay ?? 0.22, sp = p.spread ?? 0.011, end = w + sp * 3 + dec + 0.03;
    const n = noiseSrc(ctx, w, end, p), hp = bq(ctx, 'highpass', 600, 0.7), bp = bq(ctx, 'bandpass', p.tone ?? 1150, 1.1), g = gain(ctx, 0);
    g.gain.setValueAtTime(0.0001, w);
    let t = w;
    for (let i = 0; i < 3; i++) {
      g.gain.setValueAtTime(vel, t);
      g.gain.exponentialRampToValueAtTime(0.06 * vel, t + sp * 0.9);
      t += sp;
    }
    g.gain.setValueAtTime(0.9 * vel, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dec);
    n.connect(hp).connect(bp).connect(g).connect(out);
    return end;
  });

  // 镲片：六支方波金属音（808 比例）+ 高通噪声；open=true 为开镲
  const HAT_RATIOS = [2, 3, 4.16, 5.43, 6.79, 8.21];
  voice('hat', { bus: 'music', send: 0.05, level: 0.91 }, (ctx, out, w, p) => {
    const vel = vOf(p), open = !!p.open, dec = p.decay ?? (open ? 0.38 : 0.055), base = (p.tone ?? 1) * 41, end = w + dec + 0.03;
    const mix = gain(ctx, 1 / 6);
    for (const r of HAT_RATIOS) osc(ctx, 'square', base * r, w, end).connect(mix);
    const bp = bq(ctx, 'bandpass', 10000, 0.9), hp = bq(ctx, 'highpass', 7000, 0.8), g = gain(ctx, 0);
    perc(g.gain, w, 0.9 * vel, 0.0008, dec);
    mix.connect(bp).connect(hp).connect(g).connect(out);
    const n = noiseSrc(ctx, w, end, p), nh = bq(ctx, 'highpass', 8000, 0.7), ng = gain(ctx, 0);
    perc(ng.gain, w, 0.35 * vel, 0.0008, dec * 0.8);
    n.connect(nh).connect(ng).connect(out);
    return end;
  });

  // 通鼓：正弦下滑 + 带通噪声起音
  voice('tom', { bus: 'music', send: 0.15, level: 0.67 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 110), dec = p.decay ?? 0.4, end = w + dec + 0.03;
    const o = osc(ctx, 'sine', f * 1.6, w, end);
    o.frequency.exponentialRampToValueAtTime(f, w + 0.09);
    const g = gain(ctx, 0);
    perc(g.gain, w, 0.85 * vel, 0.002, dec);
    o.connect(g).connect(drive(ctx, 1.6)).connect(out);
    const n = noiseSrc(ctx, w, w + 0.07, p), bp = bq(ctx, 'bandpass', f * 6, 1.2), ng = gain(ctx, 0);
    perc(ng.gain, w, 0.35 * vel, 0.001, 0.045);
    n.connect(bp).connect(ng).connect(out);
    return end;
  });

  // 边击：三角 + 方波带通，极短
  voice('rim', { bus: 'music', send: 0.1, level: 0.75 }, (ctx, out, w, p) => {
    const vel = vOf(p), end = w + 0.08;
    const a = osc(ctx, 'triangle', 1720 * (p.tone ?? 1), w, end), b = osc(ctx, 'square', 490 * (p.tone ?? 1), w, end);
    const bp = bq(ctx, 'bandpass', 1600 * (p.tone ?? 1), 2.2), g = gain(ctx, 0);
    perc(g.gain, w, 0.9 * vel, 0.0005, 0.035);
    b.connect(gain(ctx, 0.4)).connect(bp);
    a.connect(bp);
    bp.connect(g).connect(out);
    const n = noiseSrc(ctx, w, w + 0.02, p), hp = bq(ctx, 'highpass', 4000), ng = gain(ctx, 0);
    perc(ng.gain, w, 0.4 * vel, 0.0003, 0.008);
    n.connect(hp).connect(ng).connect(out);
    return end;
  });

  // 次低频（808 式）：正弦从 glide 倍滑到目标音高，可持续 dur 秒
  voice('sub', { bus: 'music', send: 0, duck: 0.3, level: 0.65 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 45), dur = p.dur ?? 0.8, rel = p.release ?? 0.35, end = w + dur + rel + 0.03;
    const o = osc(ctx, 'sine', f * (p.glide ?? 1.6), w, end);
    o.frequency.exponentialRampToValueAtTime(f, w + 0.12);
    const g = gain(ctx, 0);
    g.gain.setValueAtTime(0.0001, w);
    g.gain.linearRampToValueAtTime(vel, w + 0.006);
    g.gain.setTargetAtTime(vel * 0.7, w + 0.02, 0.2);
    g.gain.setTargetAtTime(0.0001, w + dur, rel / 5);
    o.connect(g).connect(drive(ctx, 1.4)).connect(out);
    return end;
  });

  // 冲击：下坠次低频 + 棕噪声体（低通下扫）+ 高频爆裂，整体饱和
  voice('impact', { bus: 'sfx', send: 0.35, duck: 0.7, level: 0.7 }, (ctx, out, w, p) => {
    const vel = vOf(p), dur = p.dur ?? 1.6, f = hzOf(p, 62), end = w + dur + 0.05;
    const body = gain(ctx, 1);
    body.connect(drive(ctx, 2.2 + (p.drive ?? 0.5) * 2)).connect(out);
    const o = osc(ctx, 'sine', f * 1.8, w, end);
    o.frequency.exponentialRampToValueAtTime(f, w + 0.08);
    o.frequency.exponentialRampToValueAtTime(f * 0.55, w + dur);
    const g = gain(ctx, 0);
    g.gain.setValueAtTime(0.0001, w);
    g.gain.linearRampToValueAtTime(0.85 * vel, w + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, w + dur);
    o.connect(g).connect(body);
    const n = noiseSrc(ctx, w, w + dur * 0.7, p, 'brown'), lp = bq(ctx, 'lowpass', 2400, 0.9), ng = gain(ctx, 0);
    lp.frequency.setValueAtTime(2400, w);
    lp.frequency.exponentialRampToValueAtTime(140, w + dur * 0.6);
    perc(ng.gain, w, 0.9 * vel, 0.003, dur * 0.6);
    n.connect(lp).connect(ng).connect(body);
    const c = noiseSrc(ctx, w, w + 0.14, p), hp = bq(ctx, 'highpass', 2200, 0.7), cg = gain(ctx, 0);
    perc(cg.gain, w, 0.5 * vel * (p.crack ?? 1), 0.0008, 0.1);
    c.connect(hp).connect(cg).connect(out);
    return end;
  });

  // 呼啸：粉噪声经两支带通扫频（dir up/down），起伏包络 + 左右声像扫过
  voice('whoosh', { bus: 'sfx', send: 0.2, level: 1.85 }, (ctx, out, w, p) => {
    const vel = vOf(p), dur = p.dur ?? 0.6, down = p.dir === 'down';
    const a = p.from ?? (down ? 4200 : 380), b = p.to ?? (down ? 380 : 4200), q = p.q ?? 2.2;
    const peak = clamp(p.peak ?? (down ? 0.3 : 0.7), 0.05, 0.95), end = w + dur + 0.03;
    const n = noiseSrc(ctx, w, end, p, 'pink');
    const g = gain(ctx, 0);
    [[1, q, 1], [2.3, q * 1.4, 0.5]].forEach(([m, qq, lvl]) => {
      const f = bq(ctx, 'bandpass', a * m, qq);
      f.frequency.setValueAtTime(a * m, w);
      f.frequency.exponentialRampToValueAtTime(b * m, w + dur);
      n.connect(f).connect(gain(ctx, lvl)).connect(g);
    });
    g.gain.setValueAtTime(0.0001, w);
    g.gain.exponentialRampToValueAtTime(vel, w + dur * peak);
    g.gain.exponentialRampToValueAtTime(0.0001, w + dur);
    const sw = p.sweep ?? 0.7, pn = ctx.createStereoPanner();
    pn.pan.setValueAtTime(-sw, w);
    pn.pan.linearRampToValueAtTime(sw, w + dur);
    g.connect(pn).connect(out);
    return end;
  });

  // 上升音：带通噪声扫频 + 失谐锯齿上行（tonal 混合），指数渐强，颤音速率逐渐加快
  voice('riser', { bus: 'sfx', send: 0.25, level: 0.6, resume: 2 }, (ctx, out, w, p) => {
    const vel = vOf(p), total = p.dur ?? 2, off = offOf(p, total), rem = total - off, a = p.from ?? 250, b = p.to ?? 7000, tonal = p.tonal ?? 0.35, end = w + rem + 0.04;
    const amp = gain(ctx, 0);
    swellAt(amp.gain, vel, w, total, off);
    amp.gain.linearRampToValueAtTime(0.0001, w + rem + 0.03);
    const trem = gain(ctx, 1 - (p.trem ?? 0.3));
    const lfo = osc(ctx, 'sine', p.rateFrom ?? 5, w, end);
    sweepAt(lfo.frequency, p.rateFrom ?? 5, p.rateTo ?? 22, w, total, off);
    lfo.connect(gain(ctx, p.trem ?? 0.3)).connect(trem.gain);
    amp.connect(trem).connect(out);
    const n = noiseSrc(ctx, w, end, p), bp = bq(ctx, 'bandpass', a, 1.3);
    sweepAt(bp.frequency, a, b, w, total, off);
    n.connect(bp).connect(gain(ctx, 1 - tonal * 0.5)).connect(amp);
    if (tonal > 0) {
      const f = hzOf(p, 110), lp = bq(ctx, 'lowpass', 500, 2);
      sweepAt(lp.frequency, 500, b * 0.8, w, total, off);
      for (const d of [-9, 0, 9]) {
        const o = osc(ctx, 'sawtooth', f, w, end, d);
        sweepAt(o.frequency, f, semis(f, p.semis ?? 12), w, total, off);
        o.connect(lp);
      }
      lp.connect(gain(ctx, tonal * 0.3)).connect(amp);
    }
    return end;
  });

  // 反向渐强：高通噪声 + 可选和弦（给 note 或 tonal:true），指数渐强后在 dur 处收住，像倒放的镲片
  voice('reverse', { bus: 'sfx', send: 0.3, level: 0.5, resume: 1.2 }, (ctx, out, w, p) => {
    const vel = vOf(p), total = p.dur ?? 1.2, off = offOf(p, total), rem = total - off, end = w + rem + 0.03;
    const amp = gain(ctx, 0);
    swellAt(amp.gain, vel, w, total, off);
    amp.gain.linearRampToValueAtTime(0.0001, w + rem + 0.02);
    amp.connect(out);
    const n = noiseSrc(ctx, w, end, p), hp = bq(ctx, 'highpass', 2500, 0.7), bp = bq(ctx, 'bandpass', 2500, 0.8);
    sweepAt(bp.frequency, 2500, p.to ?? 9000, w, total, off);
    n.connect(hp).connect(bp).connect(gain(ctx, 0.9)).connect(amp);
    if (p.note != null || p.f != null || p.tonal) {
      const f = hzOf(p, 220), lp = bq(ctx, 'lowpass', 300, 1);
      sweepAt(lp.frequency, 300, 5000, w, total, off);
      for (const m of [1, 1.5, 2]) osc(ctx, 'sawtooth', f * m, w, end, (m - 1.25) * 8).connect(lp);
      lp.connect(gain(ctx, 0.3)).connect(amp);
    }
    return end;
  });

  // 界面提示音：正弦上挑 + 轻微 FM
  voice('blip', { bus: 'ui', send: 0.1, level: 0.64 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 1320), dec = p.decay ?? 0.09, end = w + dec + 0.02;
    const o = osc(ctx, 'sine', f, w, end);
    o.frequency.exponentialRampToValueAtTime(f * (p.bend ?? 1.26), w + 0.03);
    const m = osc(ctx, 'sine', f * 2, w, end), mg = gain(ctx, 0);
    mg.gain.setValueAtTime(f * 0.8, w);
    mg.gain.exponentialRampToValueAtTime(1, w + dec);
    m.connect(mg).connect(o.frequency);
    const g = gain(ctx, 0);
    perc(g.gain, w, 0.6 * vel, 0.002, dec);
    o.connect(g).connect(out);
    return end;
  });

  // 点击：高通噪声 + 短正弦
  voice('click', { bus: 'ui', send: 0.05, level: 0.38 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 2400), end = w + 0.05;
    const n = noiseSrc(ctx, w, end, p), hp = bq(ctx, 'highpass', 2500, 0.7), ng = gain(ctx, 0);
    perc(ng.gain, w, 0.7 * vel, 0.0003, 0.01);
    n.connect(hp).connect(ng).connect(out);
    const o = osc(ctx, 'sine', f, w, end), g = gain(ctx, 0);
    perc(g.gain, w, 0.35 * vel, 0.0005, 0.025);
    o.connect(g).connect(out);
    return end;
  });

  // 打字：带通噪声颗粒，按种子轻微变调，连续触发不机械
  voice('tick', { bus: 'ui', send: 0.04, level: 0.76 }, (ctx, out, w, p) => {
    const vel = vOf(p), r = rng(p.seed), f = hzOf(p, 3600) * (0.88 + r() * 0.24), end = w + 0.04;
    const n = noiseSrc(ctx, w, end, p), bp = bq(ctx, 'bandpass', f, 2.5), g = gain(ctx, 0);
    perc(g.gain, w, vel, 0.0004, 0.016 + r() * 0.008);
    n.connect(bp).connect(g).connect(out);
    const o = osc(ctx, 'triangle', f * 0.5, w, end), og = gain(ctx, 0);
    perc(og.gain, w, 0.18 * vel, 0.0005, 0.012);
    o.connect(og).connect(out);
    return end;
  });

  // 机械键：触发点击 + 键身“咚” + 触底回弹（heavy 调节键身分量）
  voice('key', { bus: 'ui', send: 0.05, level: 0.84 }, (ctx, out, w, p) => {
    const vel = vOf(p), r = rng(p.seed), heavy = p.heavy ?? 0.6, k = 0.9 + r() * 0.2, end = w + 0.12;
    const n = noiseSrc(ctx, w, end, p), bp = bq(ctx, 'bandpass', 4200 * k, 1.4), g = gain(ctx, 0);
    perc(g.gain, w, 0.8 * vel, 0.0004, 0.012);
    n.connect(bp).connect(g).connect(out);
    const o = osc(ctx, 'sine', 260 * k, w, end);
    o.frequency.exponentialRampToValueAtTime(150 * k, w + 0.04);
    const og = gain(ctx, 0);
    perc(og.gain, w + 0.002, heavy * 0.7 * vel, 0.002, 0.05);
    o.connect(og).connect(bq(ctx, 'lowpass', 1400, 0.8)).connect(out);
    const t2 = w + 0.024 + r() * 0.01, bg = gain(ctx, 0), bp2 = bq(ctx, 'bandpass', 2600 * k, 1.8);
    perc(bg.gain, t2, 0.45 * vel, 0.0004, 0.018);
    n.connect(bp2).connect(bg).connect(out);
    return end;
  });

  // FM 单音：载波 + 调制（ratio 倍，index 调制深度随时间衰减）
  function fmNote(ctx, out, w, f, { ratio = 2, index = 1.5, dec = 0.4, amp = 0.5, att = 0.003, type = 'sine' } = {}) {
    const end = w + att + dec + 0.02;
    const c = osc(ctx, type, f, w, end), m = osc(ctx, 'sine', f * ratio, w, end), mg = gain(ctx, 0);
    mg.gain.setValueAtTime(Math.max(1, f * index), w);
    mg.gain.exponentialRampToValueAtTime(Math.max(1, f * index * 0.05), w + att + dec);
    m.connect(mg).connect(c.frequency);
    const g = gain(ctx, 0);
    perc(g.gain, w, amp, att, dec);
    c.connect(g).connect(out);
    return end;
  }

  // 确认：两到三个上行 FM 音（steps 为半音列表，默认 [0, 7]）
  voice('confirm', { bus: 'ui', send: 0.2, level: 0.64 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 1046.5), gap = p.gap ?? 0.075, steps = p.steps || [0, 7];
    let end = w;
    steps.forEach((s, i) => {
      const last = i === steps.length - 1;
      end = Math.max(end, fmNote(ctx, out, w + i * gap, semis(f, s), { ratio: 2, index: 1.2, dec: last ? 0.42 : 0.18, amp: (last ? 0.5 : 0.42) * vel }));
    });
    return end;
  });

  // 错误：两个下行的低通方波蜂鸣，略带失真
  voice('error', { bus: 'ui', send: 0.1, level: 0.4 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 311), gap = p.gap ?? 0.13;
    let end = w;
    (p.steps || [0, -5]).forEach((s, i) => {
      const t0 = w + i * gap, ff = semis(f, s), stop = t0 + 0.16;
      const lp = bq(ctx, 'lowpass', 1900, 1.2), g = gain(ctx, 0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.4 * vel, t0 + 0.005);
      g.gain.setValueAtTime(0.4 * vel, t0 + 0.09);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.13);
      for (const d of [-12, 12]) osc(ctx, 'square', ff, t0, stop, d).connect(lp);
      lp.connect(g).connect(drive(ctx, 1.5)).connect(out);
      end = stop;
    });
    return end;
  });

  // HUD 蜂鸣：平稳的短音（wave: sine/square/triangle）
  voice('beep', { bus: 'ui', send: 0.1, level: 0.52 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 1000), dur = Math.max(0.01, p.dur ?? 0.12), end = w + dur + 0.03;
    const o = osc(ctx, p.wave || 'sine', f, w, end), g = gain(ctx, 0), lp = bq(ctx, 'lowpass', Math.min(16000, f * 4), 0.7);
    g.gain.setValueAtTime(0.0001, w);
    g.gain.linearRampToValueAtTime(0.45 * vel, w + 0.004);
    g.gain.setValueAtTime(0.45 * vel, w + dur);
    g.gain.linearRampToValueAtTime(0.0001, w + dur + 0.02);
    o.connect(lp).connect(g).connect(out);
    return end;
  });

  // 钟与铃：左右两支轻微失谐的 FM 音 + 金属泛音
  function bellVoice(def) {
    return (ctx, out, w, p) => {
      const vel = vOf(p), f = hzOf(p, def.f), dec = p.decay ?? def.decay, ratio = p.ratio ?? def.ratio, idx = p.index ?? def.index, br = p.bright ?? 1;
      let end = w;
      [-1, 1].forEach((side) => {
        const pn = panner(ctx, side * (p.width ?? 0.35));
        pn.connect(out);
        const fd = f * Math.pow(2, (side * 3) / 1200);
        end = Math.max(end, fmNote(ctx, pn, w, fd, { ratio, index: idx * br, dec, amp: 0.32 * vel, att: 0.002 }));
        end = Math.max(end, fmNote(ctx, pn, w, fd * def.partial, { ratio: 1, index: 0.3, dec: dec * 0.35, amp: 0.1 * vel * br, att: 0.001 }));
      });
      return end;
    };
  }
  voice('chime', { bus: 'sfx', send: 0.4, level: 0.83 }, bellVoice({ f: 1567.98, decay: 1.4, ratio: 3.5, index: 1.6, partial: 2.76 }));
  voice('bell', { bus: 'sfx', send: 0.45, level: 0.8 }, bellVoice({ f: 523.25, decay: 3, ratio: 1.4, index: 3.2, partial: 2.4 }));

  // 拨弦：锯齿 + 方波经共振低通，截止频率快速下落
  voice('pluck', { bus: 'music', send: 0.2, level: 0.61 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 440), dec = p.decay ?? 0.5, br = p.bright ?? 1, end = w + dec + 0.03;
    const lp = bq(ctx, 'lowpass', f * 10, p.q ?? 3);
    lp.frequency.setValueAtTime(Math.min(18000, f * 12 * br), w);
    lp.frequency.exponentialRampToValueAtTime(Math.max(80, f * 1.1), w + dec * 0.6);
    osc(ctx, 'sawtooth', f, w, end, -6).connect(lp);
    osc(ctx, 'square', f, w, end, 6).connect(gain(ctx, 0.5)).connect(lp);
    const g = gain(ctx, 0);
    perc(g.gain, w, 0.45 * vel, 0.002, dec);
    lp.connect(g).connect(out);
    return end;
  });

  // 贝斯：双锯齿 + 正弦，共振低通包络；from 指定滑音起点
  voice('bass', { bus: 'music', send: 0, level: 0.61 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 55), dur = p.dur ?? 0.4, rel = p.release ?? 0.08, end = w + dur + rel + 0.04;
    const cut = p.cutoff ?? 520, envAmt = p.env ?? 1.6;
    const lp = bq(ctx, 'lowpass', cut, p.q ?? 5);
    lp.frequency.setValueAtTime(cut * (1 + envAmt * 2.5), w);
    lp.frequency.setTargetAtTime(cut, w + 0.005, 0.06);
    const from = p.from != null ? noteHz(p.from) : null;
    const oscs = [osc(ctx, 'sawtooth', from || f, w, end, -5), osc(ctx, 'sawtooth', from || f, w, end, 5), osc(ctx, 'sine', from || f, w, end)];
    if (from) for (const o of oscs) o.frequency.exponentialRampToValueAtTime(f, w + (p.glide ?? 0.06));
    oscs[0].connect(lp);
    oscs[1].connect(lp);
    const g = gain(ctx, 0);
    g.gain.setValueAtTime(0.0001, w);
    g.gain.linearRampToValueAtTime(0.4 * vel, w + 0.005);
    g.gain.setTargetAtTime(0.3 * vel, w + 0.01, 0.1);
    g.gain.setTargetAtTime(0.0001, w + dur, rel / 4);
    oscs[2].connect(gain(ctx, 0.6)).connect(g);
    lp.connect(g).connect(drive(ctx, 1.3)).connect(out);
    return end;
  });

  // 铺底和弦：每个音两支失谐锯齿左右展开，低通 + 慢速 LFO，长起音长释放
  voice('pad', { bus: 'bed', send: 0.45, level: 0.9, resume: 4 }, (ctx, out, w, p) => {
    // 中途进入（offset）时只演奏剩余时长，用 80ms 快速淡入代替原起音
    const off = offOf(p, p.dur ?? 4), vel = vOf(p), dur = Math.max(0.05, (p.dur ?? 4) - off), atk = off > 0 ? 0.08 : p.attack ?? 0.8, rel = p.release ?? 1.6, end = w + dur + rel + 0.05;
    const notes = (p.notes || p.chord || [57, 60, 64, 67]).map((n) => noteHz(n)).filter(Boolean);
    const cut = p.cutoff ?? 1500, lp = bq(ctx, 'lowpass', cut, 0.8);
    const lfo = osc(ctx, 'sine', p.lfo ?? 0.18, w, end);
    lfo.connect(gain(ctx, cut * 0.3)).connect(lp.frequency);
    const amp = gain(ctx, 0);
    amp.gain.setValueAtTime(0.0001, w);
    amp.gain.linearRampToValueAtTime(vel, w + atk);
    amp.gain.setValueAtTime(vel, w + Math.max(atk, dur));
    amp.gain.linearRampToValueAtTime(0.0001, w + Math.max(atk, dur) + rel);
    const per = 0.22 / Math.sqrt(Math.max(1, notes.length));
    notes.forEach((f) => {
      [-1, 1].forEach((side) => {
        const o = osc(ctx, 'sawtooth', f, w, end, side * (p.detune ?? 8));
        o.connect(gain(ctx, per)).connect(panner(ctx, side * (p.width ?? 0.6))).connect(lp);
      });
    });
    lp.connect(amp).connect(out);
    return end;
  });

  // 故障：随机（种子）短颗粒——方波/锯齿/带通噪声，经位深压缩
  voice('glitch', { bus: 'sfx', send: 0.1, level: 0.43 }, (ctx, out, w, p) => {
    const vel = vOf(p), dur = p.dur ?? 0.28, r = rng(p.seed), n = Math.max(3, Math.round((p.density ?? 40) * dur));
    const crush = ctx.createWaveShaper();
    crush.curve = stepCurve(p.bits ?? 4);
    crush.connect(out);
    let end = w;
    for (let i = 0; i < n; i++) {
      const t0 = w + r() * dur, len = 0.008 + r() * 0.035, stop = t0 + len + 0.006, a = (0.25 + r() * 0.3) * vel;
      const g = gain(ctx, 0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(a, t0 + 0.001);
      g.gain.setValueAtTime(a, t0 + len);
      g.gain.linearRampToValueAtTime(0.0001, t0 + len + 0.004);
      if (r() < 0.55) osc(ctx, r() < 0.5 ? 'square' : 'sawtooth', 120 * Math.pow(2, r() * 5.5), t0, stop).connect(g);
      else noiseSrc(ctx, t0, stop, { seed: (p.seed || 1) + i * 31 }).connect(bq(ctx, 'bandpass', 400 * Math.pow(2, r() * 4.5), 4)).connect(g);
      g.connect(crush);
      end = Math.max(end, stop);
    }
    return end + 0.01;
  });

  // 快门：开、合两次机械咔嗒（gap 秒间隔）+ 弹簧余振
  voice('shutter', { bus: 'sfx', send: 0.1, level: 0.48 }, (ctx, out, w, p) => {
    const vel = vOf(p), gap = p.gap ?? 0.075, end = w + gap + 0.14;
    const clickAt = (t0, hpF, lvl, thunk) => {
      const n = noiseSrc(ctx, t0, t0 + 0.05, p), hp = bq(ctx, 'highpass', hpF, 0.8), g = gain(ctx, 0);
      perc(g.gain, t0, lvl * vel, 0.0004, 0.014);
      n.connect(hp).connect(g).connect(out);
      const o = osc(ctx, 'sine', thunk, t0, t0 + 0.09);
      o.frequency.exponentialRampToValueAtTime(thunk * 0.6, t0 + 0.05);
      const og = gain(ctx, 0);
      perc(og.gain, t0, 0.45 * lvl * vel, 0.001, 0.05);
      o.connect(og).connect(out);
    };
    clickAt(w, 2200, 0.8, 150);
    clickAt(w + gap, 3400, 0.6, 210);
    const n = noiseSrc(ctx, w, end, p), bp = bq(ctx, 'bandpass', 6200, 6), g = gain(ctx, 0);
    perc(g.gain, w + 0.005, 0.3 * vel, 0.002, 0.07);
    n.connect(bp).connect(g).connect(out);
    return end;
  });

  // 盖章：低频重击 + 低通棕噪声 + 纸面拍击（slap），饱和
  voice('stamp', { bus: 'sfx', send: 0.2, duck: 0.5, level: 0.73 }, (ctx, out, w, p) => {
    const vel = vOf(p), wt = p.weight ?? 1, tone = p.tone ?? 1, end = w + 0.45;
    const body = gain(ctx, 1);
    body.connect(drive(ctx, 1.8)).connect(out);
    const o = osc(ctx, 'sine', 120 * tone, w, end);
    o.frequency.exponentialRampToValueAtTime(48 * tone, w + 0.09);
    const og = gain(ctx, 0);
    perc(og.gain, w, 0.85 * vel * wt, 0.002, 0.28);
    o.connect(og).connect(body);
    const n = noiseSrc(ctx, w, w + 0.2, p, 'brown'), lp = bq(ctx, 'lowpass', 900, 0.9), ng = gain(ctx, 0);
    perc(ng.gain, w, 0.8 * vel, 0.001, 0.13);
    n.connect(lp).connect(ng).connect(body);
    const s = noiseSrc(ctx, w, w + 0.06, p), hp = bq(ctx, 'highpass', 1600, 0.7), sg = gain(ctx, 0);
    perc(sg.gain, w, 0.5 * vel * (p.slap ?? 1), 0.0005, 0.03);
    s.connect(hp).connect(sg).connect(out);
    return end;
  });

  // 闷响：更低、更软的落地声（没有纸面拍击）
  voice('thud', { bus: 'sfx', send: 0.15, duck: 0.4, level: 0.7 }, (ctx, out, w, p) => {
    const vel = vOf(p), tone = p.tone ?? 1, dec = p.decay ?? 0.35, end = w + dec + 0.05;
    const o = osc(ctx, 'sine', 90 * tone, w, end);
    o.frequency.exponentialRampToValueAtTime(40 * tone, w + 0.12);
    const og = gain(ctx, 0);
    perc(og.gain, w, 0.9 * vel, 0.003, dec);
    o.connect(og).connect(drive(ctx, 1.3)).connect(out);
    const n = noiseSrc(ctx, w, w + 0.2, p, 'brown'), lp = bq(ctx, 'lowpass', 420, 0.8), ng = gain(ctx, 0);
    perc(ng.gain, w, 0.7 * vel, 0.002, 0.16);
    n.connect(lp).connect(ng).connect(out);
    return end;
  });

  // 纸张摩擦：带通噪声 + 颗粒化随机包络（钟形整体轮廓）
  voice('paper', { bus: 'sfx', send: 0.1, level: 0.62 }, (ctx, out, w, p) => {
    const vel = vOf(p), dur = p.dur ?? 0.45, r = rng(p.seed), end = w + dur + 0.05;
    const n = noiseSrc(ctx, w, end, p), hp = bq(ctx, 'highpass', 900, 0.7), bp = bq(ctx, 'bandpass', p.tone ?? 3200, 0.7), g = gain(ctx, 0);
    bp.frequency.setValueAtTime((p.tone ?? 3200) * 0.8, w);
    bp.frequency.linearRampToValueAtTime((p.tone ?? 3200) * 1.2, w + dur);
    g.gain.setValueAtTime(0.0001, w);
    let t = w;
    while (t < w + dur) {
      const shape = Math.sin((Math.PI * (t - w)) / dur);
      const a = Math.max(0.0001, (0.2 + r() * 0.8) * vel * shape);
      g.gain.linearRampToValueAtTime(a, t + 0.004);
      t += 0.012 + r() * 0.03;
      g.gain.linearRampToValueAtTime(a * 0.25, Math.min(t, w + dur));
    }
    g.gain.linearRampToValueAtTime(0.0001, w + dur + 0.02);
    n.connect(hp).connect(bp).connect(g).connect(out);
    return end;
  });

  // 环境底：左右两路不相关噪声，带通中心频率随慢速 LFO 漂移；淡入淡出
  function bedNoise(ctx, out, w, p, color, o) {
    const total = p.dur ?? 8, off = offOf(p, total), vel = vOf(p), dur = Math.max(0.05, total - off);
    const fade = Math.min(p.fade ?? 1.5, total / 2), fadeIn = off > 0 ? Math.min(0.12, dur / 2) : fade, fadeOut = Math.min(fade, dur - fadeIn), end = w + dur + 0.05;
    const amp = gain(ctx, 0);
    amp.gain.setValueAtTime(0.0001, w);
    amp.gain.linearRampToValueAtTime(vel, w + fadeIn);
    amp.gain.setValueAtTime(vel, w + Math.max(fadeIn, dur - fadeOut));
    amp.gain.linearRampToValueAtTime(0.0001, w + dur);
    const merger = ctx.createChannelMerger(2);
    [0, 1].forEach((ch) => {
      const s = noiseSrc(ctx, w, end, { seed: (p.seed || 1) + ch * 7919 }, color);
      const bp = bq(ctx, 'bandpass', o.tone, o.q);
      const l = osc(ctx, 'sine', o.lfoRate * (ch ? 1.37 : 1), w, end);
      l.connect(gain(ctx, o.tone * o.lfoDepth)).connect(bp.frequency);
      s.connect(bp).connect(merger, 0, ch);
    });
    let node = merger;
    if (o.gust) {
      const gg = gain(ctx, 1 - o.gust * 0.5);
      osc(ctx, 'sine', 0.23, w, end).connect(gain(ctx, o.gust * 0.5)).connect(gg.gain);
      merger.connect(gg);
      node = gg;
    }
    node.connect(amp).connect(out);
    return end;
  }
  voice('air', { bus: 'bed', send: 0.2, level: 1.29, resume: 8 }, (ctx, out, w, p) => bedNoise(ctx, out, w, p, 'pink', { tone: p.tone ?? 1800, q: 0.5, lfoRate: 0.07, lfoDepth: 0.35, gust: 0 }));
  voice('wind', { bus: 'bed', send: 0.2, level: 3.2, resume: 8 }, (ctx, out, w, p) => bedNoise(ctx, out, w, p, 'brown', { tone: p.tone ?? 600, q: 1.2, lfoRate: 0.11, lfoDepth: 0.6, gust: p.gust ?? 0.6 }));

  // 声呐：正弦脉冲 + 泛音，经反馈延迟（echo 秒、feedback）与低通形成回声
  voice('sonar', { bus: 'sfx', send: 0.35, level: 0.65 }, (ctx, out, w, p) => {
    const vel = vOf(p), f = hzOf(p, 1250), dec = p.decay ?? 1.1, end = w + dec + 2.4;
    const dry = gain(ctx, 1);
    const o = osc(ctx, 'sine', f, w, w + dec + 0.05);
    o.frequency.exponentialRampToValueAtTime(f * 0.97, w + dec);
    const g = gain(ctx, 0);
    perc(g.gain, w, 0.55 * vel, 0.003, dec);
    o.connect(g).connect(dry);
    const o2 = osc(ctx, 'sine', f * 2.01, w, w + dec * 0.5), g2 = gain(ctx, 0);
    perc(g2.gain, w, 0.12 * vel, 0.002, dec * 0.4);
    o2.connect(g2).connect(dry);
    dry.connect(out);
    const d = ctx.createDelay(1.5);
    d.delayTime.value = p.echo ?? 0.34;
    const fb = gain(ctx, clamp(p.feedback ?? 0.38, 0, 0.85)), lp = bq(ctx, 'lowpass', 2200, 0.7);
    dry.connect(d);
    d.connect(lp).connect(fb).connect(d);
    lp.connect(gain(ctx, 0.6)).connect(out);
    return end;
  });

  // 警报：双音交替（f / f2，rate 次/秒）的方波 + 锯齿，低通 + 失真
  voice('alarm', { bus: 'sfx', send: 0.15, level: 0.77, resume: 1.2 }, (ctx, out, w, p) => {
    const off = offOf(p, p.dur ?? 1.2), vel = vOf(p), dur = Math.max(0.05, (p.dur ?? 1.2) - off), f1 = hzOf(p, 960), f2 = p.f2 ?? f1 * 0.8, rate = p.rate ?? 4, end = w + dur + 0.06;
    const o = osc(ctx, 'square', f1, w, end), o2 = osc(ctx, 'sawtooth', f1, w, end, 7);
    // 中途进入时保持双音交替的相位：第一段只演奏剩余部分
    const i0 = Math.floor(off * rate), first = (i0 + 1) / rate - off;
    for (let t = w, i = i0; t < w + dur; t += i === i0 ? first : 1 / rate, i++) {
      const ff = i % 2 ? f2 : f1;
      o.frequency.setValueAtTime(ff, t);
      o2.frequency.setValueAtTime(ff, t);
    }
    const lp = bq(ctx, 'lowpass', 2600, 1), g = gain(ctx, 0);
    g.gain.setValueAtTime(0.0001, w);
    g.gain.linearRampToValueAtTime(0.28 * vel, w + 0.01);
    g.gain.setValueAtTime(0.28 * vel, w + dur);
    g.gain.linearRampToValueAtTime(0.0001, w + dur + 0.05);
    o2.connect(gain(ctx, 0.5)).connect(lp);
    o.connect(lp);
    lp.connect(drive(ctx, 1.6)).connect(g).connect(out);
    return end;
  });

  // 闪光与微光：五声音阶高音 FM 颗粒随机散布、随机声像；附带高频空气感
  const PENTA = [0, 2, 4, 7, 9];
  function sparkleVoice(def) {
    return (ctx, out, w, p) => {
      const vel = vOf(p), dur = p.dur ?? def.dur, r = rng(p.seed), n = p.count ?? def.count, base = hzOf(p, def.f);
      let end = w;
      for (let i = 0; i < n; i++) {
        const t0 = w + Math.pow(i / n, 1.25) * dur + r() * 0.02;
        const f = semis(base, PENTA[Math.floor(r() * 5)] + 12 * Math.floor(r() * def.oct));
        const pn = panner(ctx, (r() * 2 - 1) * 0.8);
        pn.connect(out);
        end = Math.max(end, fmNote(ctx, pn, t0, f, { ratio: 3.01, index: 0.7, dec: def.dec * (0.6 + r() * 0.8), amp: (0.16 + r() * 0.12) * vel, att: 0.002 }));
      }
      const s = noiseSrc(ctx, w, w + dur + 0.3, p), hp = bq(ctx, 'highpass', 7000, 0.7), g = gain(ctx, 0);
      g.gain.setValueAtTime(0.0001, w);
      g.gain.linearRampToValueAtTime(def.air * vel, w + dur * 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, w + dur + 0.3);
      s.connect(hp).connect(g).connect(out);
      return Math.max(end, w + dur + 0.3);
    };
  }
  voice('sparkle', { bus: 'sfx', send: 0.45, level: 0.72 }, sparkleVoice({ dur: 0.5, count: 9, f: 2093, oct: 2, dec: 0.35, air: 0.12 }));
  voice('shimmer', { bus: 'sfx', send: 0.55, level: 0.68 }, sparkleVoice({ dur: 1.8, count: 18, f: 1046.5, oct: 3, dec: 0.9, air: 0.2 }));

  // 持续低音：两支失谐锯齿左右展开 + 次八度正弦，低通随慢速 LFO 呼吸
  voice('drone', { bus: 'bed', send: 0.3, level: 0.54, resume: 6 }, (ctx, out, w, p) => {
    const off = offOf(p, p.dur ?? 6), vel = vOf(p), f = hzOf(p, 55), dur = Math.max(0.05, (p.dur ?? 6) - off);
    const fade = off > 0 ? Math.min(0.12, dur / 2) : Math.min(p.fade ?? 1.2, dur / 2), rel = p.release ?? 1.5, end = w + dur + rel + 0.05;
    const cut = p.cutoff ?? 380, lp = bq(ctx, 'lowpass', cut, 2);
    osc(ctx, 'sine', p.lfo ?? 0.08, w, end).connect(gain(ctx, cut * 0.4)).connect(lp.frequency);
    [-1, 1].forEach((side) => {
      osc(ctx, 'sawtooth', f, w, end, side * 6).connect(gain(ctx, 0.3)).connect(panner(ctx, side * 0.5)).connect(lp);
    });
    const amp = gain(ctx, 0);
    amp.gain.setValueAtTime(0.0001, w);
    amp.gain.linearRampToValueAtTime(vel, w + fade);
    amp.gain.setValueAtTime(vel, w + dur);
    amp.gain.linearRampToValueAtTime(0.0001, w + dur + rel);
    lp.connect(amp);
    osc(ctx, 'sine', f / 2, w, end).connect(gain(ctx, 0.45)).connect(amp);
    amp.connect(out);
    return end;
  });

  // 旧 API 的两个基础音色：tone({f,d,type,g,slide,attack}) 与 noise({d,g,lp,hp})
  voice('tone', { bus: 'sfx', send: 0, level: 0.85 }, (ctx, out, w, p) => {
    const f = p.f ?? 880, d = Math.max(0.005, p.d ?? 0.08), g = Math.max(0.0002, p.g ?? 0.2), attack = Math.min(p.attack ?? 0.004, d * 0.9);
    const o = osc(ctx, p.type || 'sine', f, w, w + d + 0.02);
    if (p.slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, f + p.slide), w + d);
    const v = gain(ctx, 0);
    v.gain.setValueAtTime(0.0001, w);
    v.gain.exponentialRampToValueAtTime(g, w + attack);
    v.gain.exponentialRampToValueAtTime(0.0001, w + d);
    o.connect(v).connect(out);
    return w + d + 0.02;
  });
  voice('noise', { bus: 'sfx', send: 0, level: 0.85 }, (ctx, out, w, p) => {
    const d = Math.max(0.005, p.d ?? 0.12), g = p.g ?? 0.15, end = w + d;
    const s = noiseSrc(ctx, w, end, p), h = bq(ctx, 'highpass', p.hp ?? 200), l = bq(ctx, 'lowpass', p.lp ?? 8000), v = gain(ctx, 0);
    v.gain.setValueAtTime(g, w);
    v.gain.linearRampToValueAtTime(0.0001, end);
    s.connect(h).connect(l).connect(v).connect(out);
    return end;
  });

  const ALIASES = { openhat: ['hat', { open: true }], 'ui-blip': ['blip'], ping: ['sonar'], 'reverse-swell': ['reverse'], swell: ['reverse'] };

  /* ---------- 混音图 ---------- */
  const MIX = { master: 0.65, music: 0.8, sfx: 0.9, ui: 0.7, bed: 0.7, reverb: 0.3, trim: 1, sidechain: true };
  /** DynamicsCompressorNode 的固定预读延迟（Chromium 实现为 6ms）：声音比排程时刻晚这么多；离线导出时据此对齐画面 */
  const PROCESS_LATENCY = 0.006;

  function buildGraph(ctx) {
    const G = { ctx, buses: {} };
    G.master = gain(ctx, MIX.master);
    for (const k of ['music', 'sfx', 'ui']) { G.buses[k] = gain(ctx, MIX[k]); G.buses[k].connect(G.master); }
    G.duck = gain(ctx, 1);
    G.buses.bed = gain(ctx, MIX.bed);
    G.buses.bed.connect(G.duck).connect(G.buses.music);
    G.verbIn = gain(ctx, 1);
    G.ir = impulse(ctx);
    G.verbHot = 0; // 混响尾音可能仍在发声的截止时刻（ctx 时间）
    G.verb = verbChain(ctx, G);
    G.comp = ctx.createDynamicsCompressor();
    G.comp.threshold.value = -14;
    G.comp.knee.value = 10;
    G.comp.ratio.value = 3;
    G.comp.attack.value = 0.004;
    G.comp.release.value = 0.2;
    G.trim = gain(ctx, MIX.trim);
    G.clip = ctx.createWaveShaper();
    G.clip.curve = ceilingCurve();
    G.clip.oversample = 'none';
    G.master.connect(G.comp).connect(G.trim).connect(G.clip).connect(ctx.destination);
    // 输出电平表（实时引擎用；离线渲染不需要）
    if (typeof ctx.createAnalyser === 'function' && !(global.OfflineAudioContext && ctx instanceof global.OfflineAudioContext)) {
      G.meter = ctx.createAnalyser();
      G.meter.fftSize = 2048;
      G.clip.connect(G.meter);
    }
    return G;
  }
  // 混响链：高通 → 卷积 → 返回增益 → 主增益。停止声音时整条换新，避免旧尾音在暂停 / 跳转后继续回响
  function verbChain(ctx, G) {
    const hp = bq(ctx, 'highpass', 220, 0.7), conv = ctx.createConvolver(), out = gain(ctx, MIX.reverb);
    conv.normalize = true;
    conv.buffer = G.ir;
    G.verbIn.connect(hp);
    hp.connect(conv).connect(out).connect(G.master);
    return { hp, conv, out };
  }
  function resetVerb(G, fade) {
    const ctx = G.ctx, now = ctx.currentTime, old = G.verb;
    old.out.gain.cancelScheduledValues(now);
    old.out.gain.setValueAtTime(old.out.gain.value, now);
    old.out.gain.linearRampToValueAtTime(0, now + Math.max(0.005, fade));
    try { G.verbIn.disconnect(old.hp); } catch (e) { /* 已断开 */ }
    setTimeout(() => { try { old.out.disconnect(); old.conv.disconnect(); old.hp.disconnect(); } catch (e) { /* 已断开 */ } }, (fade + 0.1) * 1000);
    G.verb = verbChain(ctx, G);
    G.verbHot = 0;
  }
  function duckAt(G, when, depth) {
    const g = G.duck.gain;
    g.setTargetAtTime(1 - clamp(depth, 0, 0.95), when, 0.005);
    g.setTargetAtTime(1, when + 0.04, 0.12);
  }

  let seedCounter = 1;
  const warned = new Set();
  /** 在 ctx/G 上于 when 时刻播放事件 ev；返回声部记录 { vg, sources, when, end, owner } */
  function playVoice(ctx, G, ev, when, owner) {
    let name = ev.voice, fn = null, extra = null;
    if (typeof name === 'function') fn = name;
    else {
      const al = ALIASES[name];
      if (al) { name = al[0]; extra = al[1] || null; }
      fn = VOICES[name];
    }
    if (!fn) {
      if (!warned.has(name)) { warned.add(name); console.warn('[MotionKit.audio] 未知音色：' + name); }
      return null;
    }
    const meta = (typeof name === 'string' && META[name]) || {};
    const level = (ev.gain ?? 1) * (meta.level ?? 1);
    const vg = gain(ctx, level);
    let node = vg;
    if (ev.pan) { node = panner(ctx, ev.pan); vg.connect(node); }
    node.connect(G.buses[ev.bus || meta.bus || 'sfx'] || G.buses.sfx);
    const send = ev.send ?? meta.send ?? 0;
    if (send > 0) node.connect(gain(ctx, send)).connect(G.verbIn);
    const hot = send > 0;
    const duck = ev.duck ?? meta.duck ?? 0;
    if (duck > 0 && MIX.sidechain) duckAt(G, when, duck * (ev.vel ?? 1));
    const p = Object.assign({}, extra, ev);
    if (p.seed == null) p.seed = ((hashStr(String(name)) ^ Math.round((ev.t != null ? ev.t : seedCounter++) * 1000)) >>> 0) || 1;
    const rec = { vg, node, level, when, end: when + 0.1, sources: [], owner, stopped: false, send: hot };
    TRACK = rec;
    let ret;
    try { ret = fn(ctx, vg, when, p); } catch (err) { console.error('[MotionKit.audio] 音色出错：', name, err); }
    finally { TRACK = null; }
    if (typeof ret === 'number' && Number.isFinite(ret)) rec.end = Math.max(rec.end, ret);
    else if (!rec.sources.length) rec.end = when + (p.dur || 1) + 2.5;
    if (hot) G.verbHot = Math.max(G.verbHot || 0, rec.end + G.ir.duration);
    return rec;
  }

  /** 乐谱编译：数组（事件 {t, voice, ...} 与生成函数 (t0, t1) => events 混排）或单个生成函数 */
  function compileScore(score) {
    if (score && score.__compiled) return score;
    const statics = [], gens = [];
    const add = (x) => {
      if (!x) return;
      if (Array.isArray(x)) x.forEach(add);
      else if (typeof x === 'function') gens.push(x);
      else if (typeof x === 'object' && typeof x.t === 'number' && x.voice) statics.push(x);
    };
    add(score);
    statics.sort((a, b) => a.t - b.t);
    return {
      __compiled: true, statics, gens,
      /** 取 t ∈ [a, b) 的全部事件（按时间排序） */
      query(a, b) {
        let lo = 0, hi = statics.length;
        while (lo < hi) { const m = (lo + hi) >> 1; if (statics[m].t < a) lo = m + 1; else hi = m; }
        const out = [];
        for (let i = lo; i < statics.length && statics[i].t < b; i++) out.push(statics[i]);
        for (const g of gens) {
          let r = null;
          try { r = g(a, b); } catch (err) { console.error(err); }
          if (r) for (const e of [].concat(r).flat()) if (e && e.voice && e.t >= a && e.t < b) out.push(e);
        }
        if (gens.length) out.sort((x, y) => x.t - y.t);
        return out;
      },
    };
  }

  const VEL = { X: 1, x: 0.75, o: 0.45 };
  /**
   * 节拍型乐谱生成器：pattern({ bpm, offset, from, to, div, swing, tracks, voices })
   *   tracks：{ kick: 'X...x...X...x...', hat: '..x...x...x...x.' }，每个字符一步（div 步/拍，默认 4 = 十六分）；
   *           X 重音、x 普通、o 弱音、. 休止；空格与 | 只是分隔。轨道名去掉末尾数字即音色名（hat2 → hat），或在 voices 里指定。
   *   voices：{ hat: { gain: 0.6, open: false }, ... } 每轨默认参数；swing 0–1（1 = 三连音 shuffle）。
   * 返回 (t0, t1) => events，可直接放进乐谱数组。
   */
  function pattern({ bpm = 120, offset = 0, from = 0, to = Infinity, div = 4, swing = 0, tracks = {}, voices = {} } = {}) {
    const step = 60 / bpm / div;
    const list = Object.entries(tracks).map(([k, s]) => ({ s: String(s).replace(/[\s|]/g, ''), def: Object.assign({ voice: k.replace(/\d+$/, '') }, voices[k] || {}) }))
      .filter((x) => x.s.length);
    return (a, b) => {
      const out = [];
      const i0 = Math.floor((Math.max(a, from) - offset) / step) - 1, i1 = Math.ceil((Math.min(b, to) - offset) / step);
      for (let i = Math.max(0, i0); i <= i1; i++) {
        const t = offset + i * step + (i % 2 === 1 ? (swing * step) / 3 : 0);
        if (t < a || t >= b || t < from || t >= to) continue;
        for (const tr of list) {
          const v = VEL[tr.s[i % tr.s.length]];
          if (v) out.push(Object.assign({}, tr.def, { t, vel: (tr.def.vel ?? 1) * v, step: i }));
        }
      }
      return out;
    };
  }

  /**
   * 在时刻 T 仍应发声的持续型事件（META.resume 给出默认时长）：返回带 offset 的副本，从中途接上。
   * 只看固定事件（生成器产生的是短促节拍，不需要接续）。
   */
  function sustainedAt(list, T) {
    const out = [];
    for (const e of list.statics) {
      if (e.t >= T) break;
      const name = typeof e.voice === 'string' && (ALIASES[e.voice] ? ALIASES[e.voice][0] : e.voice), meta = META[name];
      const resume = typeof e.voice === 'function' ? e.resume === true && e.dur : meta && meta.resume;
      if (!resume) continue;
      const total = e.dur ?? resume;
      if (e.t + total > T + 0.05) out.push(Object.assign({}, e, { offset: T - e.t }));
    }
    return out;
  }

  /** 16-bit PCM WAV 编码（交错声道） */
  function encodeWav(channels, sampleRate) {
    const nCh = channels.length, len = channels[0].length, bytes = len * nCh * 2;
    const buf = new ArrayBuffer(44 + bytes), v = new DataView(buf);
    const str = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    str(0, 'RIFF'); v.setUint32(4, 36 + bytes, true); str(8, 'WAVE'); str(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, nCh, true); v.setUint32(24, sampleRate, true);
    v.setUint32(28, sampleRate * nCh * 2, true); v.setUint16(32, nCh * 2, true); v.setUint16(34, 16, true);
    str(36, 'data'); v.setUint32(40, bytes, true);
    let o = 44;
    for (let i = 0; i < len; i++) {
      for (let c = 0; c < nCh; c++) {
        const x = Math.max(-1, Math.min(1, channels[c][i]));
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), true);
        o += 2;
      }
    }
    return buf;
  }
  function toBase64(buf) {
    if (typeof FileReader !== 'undefined' && typeof Blob !== 'undefined') {
      return new Promise((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(String(fr.result).split(',')[1] || '');
        fr.onerror = () => rej(fr.error);
        fr.readAsDataURL(new Blob([buf], { type: 'audio/wav' }));
      });
    }
    let s = '';
    const u = new Uint8Array(buf);
    for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
    return Promise.resolve(btoa(s));
  }
  const toDb = (x) => (x > 0 ? 20 * Math.log10(x) : -Infinity);

  /**
   * 离线渲染：用 OfflineAudioContext 与同一套音色、同一条混音链生成 PCM。
   * 返回 { data:[Float32Array…], sampleRate, channels, duration, peak, peakDb, rms, rmsDb, clipped, wav(), base64() }。
   * from > 0 时自动向前多渲染 preroll 秒（默认 2）再裁掉，保证 from 之前触发的尾音也在。
   */
  async function renderOffline(score, duration, { sampleRate = 48000, channels = 2, from = 0, preroll = 2 } = {}) {
    const OAC = global.OfflineAudioContext || global.webkitOfflineAudioContext;
    if (!OAC) throw new Error('当前环境不支持 OfflineAudioContext');
    const pre = Math.max(0, Math.min(preroll, from));
    const total = Math.max(1, Math.ceil((duration + pre) * sampleRate));
    const octx = new OAC({ numberOfChannels: channels, length: total, sampleRate });
    const G = buildGraph(octx);
    const list = compileScore(score);
    const t0 = from - pre;
    const events = list.query(t0, from + duration);
    for (const e of sustainedAt(list, t0)) playVoice(octx, G, e, 0, 'offline');
    for (const e of events) playVoice(octx, G, e, Math.max(0, e.t - t0), 'offline');
    const buf = await octx.startRendering();
    const skip = Math.round(pre * sampleRate), len = Math.max(1, Math.round(duration * sampleRate));
    const data = [];
    let peak = 0, sum = 0, clipped = 0;
    for (let c = 0; c < channels; c++) {
      const d = buf.getChannelData(c).slice(skip, skip + len);
      for (let i = 0; i < d.length; i++) {
        const a = Math.abs(d[i]);
        if (a > peak) peak = a;
        if (a >= 0.999) clipped++;
        sum += d[i] * d[i];
      }
      data.push(d);
    }
    const rms = Math.sqrt(sum / (len * channels));
    return {
      data, sampleRate, channels, duration, events: events.length,
      peak, peakDb: toDb(peak), rms, rmsDb: toDb(rms), clipped,
      wav() { return encodeWav(data, sampleRate); },
      base64() { return toBase64(encodeWav(data, sampleRate)); },
    };
  }

  /* ---------- 实时引擎（单例） ---------- */
  const audio = (() => {
    let ctx = null, G = null, enabled = false, resuming = false, timer = 0, unlockBound = false;
    const bus = emitter();
    const records = new Set();
    const schedulers = new Set();

    function ensure() {
      if (ctx) return ctx;
      const AC = global.AudioContext || global.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC({ latencyHint: 'interactive' });
      G = buildGraph(ctx);
      ctx.onstatechange = () => { if (ctx.state === 'running') resuming = false; changed(); };
      return ctx;
    }
    const stateOf = () => (!enabled ? 'off' : ctx && ctx.state === 'running' ? 'on' : 'blocked');
    let lastState = 'off';
    function changed() {
      const s = stateOf();
      if (s === lastState) return;
      lastState = s;
      bus.emit('change', enabled, s);
      post({ type: 'motion:sound', on: enabled, state: s });
      if (s === 'on') for (const sc of schedulers) sc.resync(true);
    }
    // 被自动播放策略挡住时：在页面内的第一次指针或键盘手势里恢复
    function unlockOnGesture() {
      if (unlockBound || !hasDOM) return;
      unlockBound = true;
      const go = () => {
        if (enabled && ctx && ctx.state !== 'running') ctx.resume().then(changed, () => {});
        if (!enabled || (ctx && ctx.state === 'running')) {
          ['pointerdown', 'keydown', 'touchend'].forEach((t) => global.removeEventListener(t, go, true));
          unlockBound = false;
        }
      };
      ['pointerdown', 'keydown', 'touchend'].forEach((t) => global.addEventListener(t, go, true));
    }
    function cleanup() {
      if (!ctx) return;
      const now = ctx.currentTime;
      for (const r of records) {
        if (r.end < now - 0.05) {
          try { r.node.disconnect(); if (r.node !== r.vg) r.vg.disconnect(); } catch (e) { /* 已断开 */ }
          records.delete(r);
        }
      }
    }
    function stopRec(r, fade = 0.012) {
      if (r.stopped || !ctx) return;
      r.stopped = true;
      const now = ctx.currentTime, g = r.vg.gain;
      try {
        if (r.when > now + 0.003) {
          // 尚未开始：直接静音并取消
          g.cancelScheduledValues(0);
          g.setValueAtTime(0, now);
          for (const s of r.sources) { try { s.stop(now); } catch (e) { /* 已停止 */ } }
          r.end = now + 0.01;
        } else {
          // 正在发声：快速淡出，避免爆音
          g.cancelScheduledValues(now);
          g.setValueAtTime(r.level, now);
          g.linearRampToValueAtTime(0, now + Math.max(0.002, fade));
          for (const s of r.sources) { try { s.stop(now + fade + 0.006); } catch (e) { /* 已停止 */ } }
          r.end = Math.min(r.end, now + fade + 0.01);
        }
      } catch (e) { /* 节点已释放 */ }
    }
    function stopWhere(pred, fade, pendingOnly = false) {
      if (!ctx) return;
      const now = ctx.currentTime;
      let fedVerb = false;
      for (const r of records) {
        if (r.stopped || !pred(r) || (pendingOnly && r.when <= now + 0.003)) continue;
        if (r.send && r.when <= now + 0.003) fedVerb = true;
        stopRec(r, fade);
      }
      // 被停止的声部送过混响且尾音仍在：连混响一起换新（只在需要时做，拖动刻度条时不会反复重建）
      if (!pendingOnly && G && fedVerb && now < G.verbHot) resetVerb(G, Math.max(0.012, fade));
      if (!pendingOnly && G) {
        // 侧链闪避复位
        const g = G.duck.gain;
        g.cancelScheduledValues(now);
        g.setTargetAtTime(1, now, 0.02);
      }
    }
    function startTimer() {
      if (timer) return;
      timer = setInterval(() => {
        cleanup();
        for (const s of schedulers) s.tick();
      }, 40);
    }
    function stopTimer() { clearInterval(timer); timer = 0; }

    if (hasDOM) {
      document.addEventListener('visibilitychange', () => {
        if (!ctx) return;
        if (document.hidden) {
          // 后台：停止调度并淡出，降级为静默；回到前台后从当前时刻重新对齐
          for (const s of schedulers) s.resync(true);
          stopWhere((r) => r.owner === 'oneshot', 0.02);
          if (enabled) setTimeout(() => { if (document.hidden && ctx.state === 'running') ctx.suspend(); }, 120);
        } else if (enabled && ctx.state !== 'running') {
          ctx.resume().then(changed, () => {});
        }
      });
    }

    function live() { return enabled && ctx && (ctx.state === 'running' || resuming); }

    /** 时间轴调度器：把 timeline 时间映射到 AudioContext 时间，前瞻窗口内排程 */
    function makeScheduler(tl, score, opts) {
      const look = opts.lookahead ?? 0.12, tol = opts.tolerance ?? 0.08, lead = opts.offset ?? 0;
      let list = compileScore(score), anchor = null, cursor = 0, needResume = true;
      const s = {
        tl,
        get list() { return list; },
        set(next) { list = compileScore(next); s.resync(false); },
        resync(hard) {
          stopWhere((r) => r.owner === s, 0.012, !hard);
          anchor = null;
          if (hard) needResume = true;
        },
        tick() {
          if (!enabled || !ctx || !tl.playing || ctx.state !== 'running' || (hasDOM && document.hidden)) {
            if (!tl.playing) anchor = null;
            return;
          }
          const rate = tl.rate;
          if (!(rate > 0)) return;
          const D = tl.duration, now = ctx.currentTime, T = tl.time;
          if (anchor) {
            let drift = T - (anchor.tl + (now - anchor.ctx) * anchor.rate);
            if (tl.loop && D > 0) drift = ((((drift + D / 2) % D) + D) % D) - D / 2;
            if (Math.abs(drift) > tol || anchor.rate !== rate) { stopWhere((r) => r.owner === s, 0, true); anchor = null; }
          }
          if (!anchor) {
            anchor = { tl: T, ctx: now + 0.01, rate };
            cursor = T;
            if (needResume) {
              needResume = false;
              for (const e of sustainedAt(list, T)) { const r = playVoice(ctx, G, e, anchor.ctx, s); if (r) records.add(r); }
            }
          }
          const endU = anchor.tl + (now + look - anchor.ctx) * rate;
          for (let guard = 0; cursor < endU - 1e-9 && guard < 8; guard++) {
            const lap = tl.loop && D > 0 ? Math.floor(cursor / D) : 0, base = lap * D, a = cursor - base;
            if (!tl.loop && a >= D) { cursor = endU; break; }
            const b = tl.loop ? Math.min(endU - base, D) : Math.min(endU, D + 1e-6);
            for (const e of list.query(a, b)) {
              const when = anchor.ctx + (e.t + base - anchor.tl) / rate - lead;
              if (when < now - 0.03) continue;
              const r = playVoice(ctx, G, e, Math.max(when, now), s);
              if (r) records.add(r);
            }
            cursor = base + b;
            if (!tl.loop && b >= D) { cursor = endU; break; }
          }
        },
        detach() { offs.forEach((f) => f()); schedulers.delete(s); s.resync(true); if (tl.__score === s) tl.__score = null; },
      };
      const offs = [
        tl.on('play', () => { anchor = null; needResume = true; s.tick(); }),
        tl.on('pause', () => s.resync(true)),
        tl.on('seek', (to, from) => { if (!tl.playing || Math.abs(to - from) > 0.034) s.resync(true); }),
        tl.on('rate', () => s.resync(false)),
        tl.on('end', () => { anchor = null; }),
        tl.on(() => s.tick()),
      ];
      return s;
    }

    const api = {
      /** 是否已开启（用户意图）；实际是否出声见 state */
      get enabled() { return enabled; },
      /** 'off' 关闭；'on' 正在出声；'blocked' 已开启但被浏览器自动播放策略挡住（等待页面内手势） */
      get state() { return stateOf(); },
      get ctx() { return ctx; },
      /** 主链路固有处理延迟（秒）：声音比排程时刻晚这么多；需要“听到的时刻”或离线对齐时减去它 */
      latency: PROCESS_LATENCY,
      /** 当前输出电平 { peak, rms, peakDb, rmsDb }（最近约 43ms；未开启时为 0）——可用于电平表或验证静音 */
      meter() {
        if (!G || !G.meter) return { peak: 0, rms: 0, peakDb: -Infinity, rmsDb: -Infinity };
        const buf = new Float32Array(G.meter.fftSize);
        G.meter.getFloatTimeDomainData(buf);
        let peak = 0, sum = 0;
        for (let i = 0; i < buf.length; i++) { const a = Math.abs(buf[i]); if (a > peak) peak = a; sum += buf[i] * buf[i]; }
        const rms = Math.sqrt(sum / buf.length);
        return { peak, rms, peakDb: toDb(peak), rmsDb: toDb(rms) };
      },
      /** 正在发声或已排程未结束的声部数（验证“暂停后无残留”用） */
      get active() {
        if (!ctx) return 0;
        const now = ctx.currentTime;
        let n = 0;
        for (const r of records) if (r.end > now) n++;
        return n;
      },
      voices: VOICES,
      meta: META,
      mix: MIX,
      noteHz,
      on: bus.on,
      /** 注册自定义音色：define(name, (ctx, out, when, p) => endTime, { bus, send, duck, level }) */
      define(name, fn, meta = {}) { VOICES[name] = fn; META[name] = Object.assign({ bus: 'sfx', send: 0, level: 1 }, meta); },
      /** 调整混音：mix({ master, music, sfx, ui, bed, reverb }) —— 同时作用于实时与离线 */
      setMix(o = {}) {
        Object.assign(MIX, o);
        if (G) {
          G.master.gain.value = MIX.master;
          for (const k of ['music', 'sfx', 'ui', 'bed']) G.buses[k].gain.value = MIX[k];
          G.verb.out.gain.value = MIX.reverb;
          G.trim.gain.value = MIX.trim;
        }
      },
      enable({ replay = false } = {}) {
        if (params().render && !replay) return false;
        if (!ensure()) return false;
        enabled = true;
        if (ctx.state !== 'running') {
          resuming = true;
          ctx.resume().then(() => { resuming = false; changed(); }, () => { resuming = false; });
          setTimeout(() => { resuming = false; changed(); if (enabled && ctx.state !== 'running') unlockOnGesture(); }, 400);
        }
        startTimer();
        changed();
        for (const s of schedulers) s.resync(true);
        return true;
      },
      disable() {
        if (!enabled) return false;
        enabled = false;
        stopWhere(() => true, 0.03);
        stopTimer();
        changed();
        setTimeout(() => { if (!enabled && ctx && ctx.state === 'running') ctx.suspend(); }, 150);
        return true;
      },
      toggle() { return enabled ? api.disable() : api.enable(); },
      /** 即时触发（交互输入）：play('blip', { note: 'E6', vel: 0.8, pan: -0.3, delay: 0 }) → { stop(fade) } 或 null */
      play(voiceName, p = {}) {
        KIT.usesSound = true;
        if (!live()) return null;
        if (records.size > 64) cleanup();
        const when = ctx.currentTime + 0.005 + (p.delay || 0);
        const r = playVoice(ctx, G, Object.assign({}, p, { voice: voiceName }), when, p.owner || 'play');
        if (!r) return null;
        records.add(r);
        return { stop: (fade) => stopRec(r, fade) };
      },
      /** 停止全部声音（快速淡出） */
      stopAll(fade = 0.012) { stopWhere(() => true, fade); },
      /**
       * 把乐谱挂到时间轴：播放时按前瞻窗口（lookahead，默认 0.12 秒）调度；pause / seek / 画幅切换立即停止已排程与正在发声的声部，
       * 从新位置继续；支持 rate 与 loop。返回调度器 { set(score), resync(hard), detach() }。一个时间轴只挂一份乐谱（再次 attach 会替换）。
       */
      attach(tl, score, opts = {}) {
        KIT.usesSound = true;
        if (tl.__score) tl.__score.detach();
        const s = makeScheduler(tl, score, opts);
        schedulers.add(s);
        Object.defineProperty(tl, '__score', { configurable: true, writable: true, enumerable: false, value: s });
        bus.emit('attach', tl, s);
        if (enabled) startTimer();
        return s;
      },
      pattern,
      compile: compileScore,
      renderOffline,
      encodeWav,
      _oneshot(voiceName, o = {}) {
        if (!live()) return;
        if (records.size > 64) cleanup();
        const r = playVoice(ctx, G, Object.assign({}, o, { voice: voiceName }), ctx.currentTime + (o.delay || 0), 'oneshot');
        if (r) records.add(r);
      },
      _stopOwner(owner, fade = 0.012) { stopWhere((r) => r.owner === owner, fade); },
      _resyncAll(hard) { for (const s of schedulers) s.resync(hard); stopWhere((r) => r.owner === 'oneshot', 0.012); },
      /** 内部工具（自定义音色可用）：osc / noise / gain / filter / perc / drive / panner / fm */
      dsp: { osc, noise: noiseSrc, gain, filter: bq, perc, drive, panner, fm: fmNote, noteHz, semis, rng,
        sample(ctx, out, when, buffer, { offset = 0, gain: level = 1 } = {}) {
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(gain(ctx, level)).connect(out);
          return track(source, when, when + Math.max(0, buffer.duration - offset), offset);
        },
      },
    };
    return api;
  })();

  // 即时 tone/noise 与 MotionKit.audio 共用声音引擎和开关。
  function sound() {
    KIT.usesSound = true;
    return {
      get enabled() { return audio.enabled; },
      get ctx() { return audio.ctx; },
      enable() { audio.enable(); },
      disable() { audio.disable(); },
      toggle() { audio.toggle(); },
      tone(o = {}) { audio._oneshot('tone', o); },
      noise(o = {}) { audio._oneshot('noise', o); },
    };
  }

  /* =====================================================================
   * 暴露协议
   * ===================================================================== */
  function readyMsg(tl) {
    return {
      type: 'motion:ready',
      duration: tl.duration,
      orients: KIT.stage ? KIT.stage.orients.slice() : [],
      orient: KIT.stage ? KIT.stage.orient : null,
      markers: (tl.markers || []).map((m) => ({ t: m.t, label: m.label })),
      sound: !!(tl.__score || tl.sound || KIT.usesSound),
      title: tl.title || (hasDOM ? document.title : ''),
      kit: VERSION,
    };
  }

  /**
   * 暴露给站点刻度条与渲染脚本：window.__motion = tl，并补充
   *   ready（Promise，预加载完成后 resolve）、progress、orient / orients / setOrient(o)、stage、audio（离线渲染接口）、kit。
   * 预加载完成后设置 <html data-motion-ready="1"> 并向父页面发送 motion:ready。
   */
  function expose(tl, meta = {}) {
    global.__motion = tl;
    for (const k of Object.keys(meta)) { try { tl[k] = meta[k]; } catch (e) { /* 只读字段 */ } }
    KIT.timeline = tl;
    const seek = tl.seek.bind(tl), play = tl.play.bind(tl), pause = tl.pause.bind(tl);
    const readTime = Object.getOwnPropertyDescriptor(tl, 'time').get;
    Object.defineProperty(tl, 'time', { configurable: true, get: () => KIT.readyState ? readTime.call(tl) : 0 });
    tl.play = () => { if (KIT.readyState) return play(); };
    tl.pause = () => { if (KIT.readyState) return pause(); };
    tl.toggle = () => { if (KIT.readyState) return tl.playing ? tl.pause() : tl.play(); };
    tl.seek = time => KIT.readyState ? seek(time) : params().render ? tl.ready.then(() => seek(time)) : Promise.resolve(tl.time);
    const def = (k, desc) => Object.defineProperty(tl, k, Object.assign({ configurable: true, enumerable: false }, desc));
    def('kit', { value: VERSION, writable: true });
    def('stage', { get: () => KIT.stage });
    def('orient', { get: () => (KIT.stage ? KIT.stage.orient : null) });
    def('orients', { get: () => (KIT.stage ? KIT.stage.orients.slice() : []) });
    def('setOrient', { value: (o) => (KIT.stage ? KIT.stage.setOrient(o, 'api') : Promise.resolve(false)), writable: true });
    def('progress', { get: loadProgress });
    def('audio', {
      get() {
        const s = tl.__score;
        if (!s) return null;
        return {
          /** 乐谱在 [from, to) 内的事件（只含 t / voice，便于检查） */
          events: (from = 0, to = tl.duration) => s.list.query(from, to).map((e) => ({ t: e.t, voice: typeof e.voice === 'string' ? e.voice : 'custom' })),
          /** 离线渲染 WAV：返回 { base64, sampleRate, channels, duration, peakDb, rmsDb, clipped, events } */
          async renderWav({ from = 0, to = tl.duration, sampleRate = 48000 } = {}) {
            // 主链路压缩器有固定预读延迟（PROCESS_LATENCY），从 from + 延迟处截取，让 WAV 第 0 个样本对齐画面的 from 时刻
            const r = await audio.renderOffline(s.list, Math.max(0.01, to - from), { from: from + PROCESS_LATENCY, sampleRate });
            return { base64: await r.base64(), sampleRate: r.sampleRate, channels: r.channels, duration: r.duration, peakDb: r.peakDb, rmsDb: r.rmsDb, clipped: r.clipped, events: r.events };
          },
        };
      },
    });
    // 即时 tone/noise 在暂停或跳转时淡出，乐谱由 attach 调度器处理。
    tl.on('pause', () => audio._stopOwner('oneshot'));
    tl.on('seek', (to, from) => { if (Math.abs(to - from) > 0.034) audio._stopOwner('oneshot'); });
    const ready = allLoaded().then(async () => {
      if (KIT.error) throw KIT.error;
      reportLoading();
      await seek(tl.__startAt ?? params().t ?? 0);
      KIT.readyState = true;
      if (hasDOM) document.documentElement.dataset.motionReady = '1';
      reportLoading();
      post(readyMsg(tl));
      KIT.events.emit('loading');
      global.dispatchEvent(new CustomEvent('motion:ready', { detail: readyMsg(tl) }));
      return tl;
    }).catch(error => { failLoading(error); throw error; });
    def('ready', { value: ready, writable: true });
    ready.catch(() => {});
    resolveExposed(tl);
    if (params().sound) (tl.__sound || audio).enable();
    return tl;
  }

  /**
   * 启动：按 ?t= / 减少动态 / 默认时刻定位，预加载完成后自动播放（?autoplay=0 与 ?render 不播放）。
   * start(tl, { t: 0, reduced: 2.5 }) → Promise
   */
  function start(tl, { t = 0, reduced = null, autoplay = true } = {}) {
    const p = params(), reduce = prefersReducedMotion();
    const at = p.t != null && Number.isFinite(p.t) ? p.t : reduce && reduced != null ? reduced : t;
    tl.__startAt = at;
    return tl.ready.then(() => {
      if (autoplay && p.autoplay && !reduce) tl.play();
      return tl;
    }).catch(failLoading);
  }


  function loadMediaTrack({ src, mime = 'audio/mp4' }) {
    const media = new Audio();
    media.preload = 'auto';
    media.muted = true;
    const ready = (async () => {
      const bytes = await (await countedFetch(src)).arrayBuffer();
      await decode(() => new OfflineAudioContext(2, 1, 48000).decodeAudioData(bytes.slice(0)));
      const metadata = new Promise((resolve, reject) => {
        media.addEventListener('canplaythrough', resolve, { once: true });
        media.addEventListener('error', () => reject(media.error), { once: true });
      });
      media.src = URL.createObjectURL(new Blob([bytes], { type: mime }));
      await metadata;
    })();
    return { media, ready };
  }

  function playerSound(tl, synchronize) {
    let enabled = false, state = 'off', revision = 0;
    const bus = emitter();
    const report = (next = state) => {
      state = next;
      bus.emit('change', enabled, state);
      post({ type: 'motion:sound', on: enabled, state });
    };
    const sync = async () => {
      const current = ++revision;
      const valid = () => current === revision;
      await synchronize(enabled, valid, next => { if (valid()) report(next); });
    };
    const set = on => {
      enabled = !!on && !params().render;
      report(enabled ? 'on' : 'off');
      return sync();
    };
    const api = {
      get enabled() { return enabled; },
      get state() { return state; },
      enable: () => set(true),
      disable: () => set(false),
      toggle: () => set(!enabled),
      on: bus.on,
      sync,
    };
    Object.defineProperties(tl, {
      __sound: { value: api },
      soundEnabled: { get: () => enabled },
      soundState: { get: () => state },
    });
    for (const event of ['play', 'pause', 'seek', 'rate', 'end']) tl.on(event, () => { void sync(); });
    for (const event of ['pointerdown', 'keydown']) {
      global.addEventListener(event, () => { if (state === 'blocked') void set(true); }, true);
    }
    report();
    return api;
  }

  function mountFilm(config) {
    loadingStarted = true;
    const film = config.film;
    stage({
      root: config.root,
      orients: config.orients || ['landscape'],
      sizes: config.sizes || { landscape: [film.width, film.height] },
      background: config.background,
    });
    const tl = timeline({
      duration: film.duration, fps: film.fps,
      markers: [...(config.markers || [])].sort((a, b) => a.t - b.t),
      render: t => film.renderAt(t),
    });
    const track = config.audio ? loadMediaTrack(config.audio) : null;
    if (track) preload([track.ready]);
    const snd = track ? playerSound(tl, async (enabled, valid, report) => {
      const { media, ready } = track;
      if (!enabled || !tl.playing) media.pause();
      media.muted = !enabled;
      if (!enabled) return;
      await ready;
      if (!valid()) return;
      media.currentTime = tl.time;
      media.playbackRate = tl.rate;
      if (!tl.playing) return;
      try {
        await media.play();
        if (valid()) report('on');
      } catch (error) {
        if (!valid() || error.name === 'AbortError') return;
        if (error.name !== 'NotAllowedError') throw error;
        report('blocked');
      }
    }) : null;
    if (track) tl.on(t => {
      const media = track.media;
      if (snd.enabled && snd.state === 'on' && tl.playing && media.readyState >= 2 && !media.seeking && Math.abs(media.currentTime - t) > 0.08) media.currentTime = t;
    });
    expose(tl, {
      title: config.title || document.title, sound: !!track,
      ...(config.bpm == null ? {} : { bpm: config.bpm }),
    });
    controls(tl, {
      sound: snd, accent: config.accent,
      rates: config.rates || [0.5, 0.75, 1, 1.25, 1.5, 2],
      step: config.step,
    });
    global.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => { if (event.matches) tl.pause(); });
    start(tl, config.start);
    return tl;
  }

  function replay(config) {
    loadingStarted = true;
    document.title = config.title;
    const st = stage({ root: config.root, orients: config.orients || ['landscape'], sizes: config.sizes, background: config.background || '#000' });
    const cue = typeof config.overlay === 'string' ? document.querySelector(config.overlay) : config.overlay;
    let offset = 0;
    const segments = config.segments.map(segment => {
      const start = offset;
      offset += segment.to - segment.from;
      return { ...segment, source: segment.source || `../../cases/${segment.caseId}/index.html`, start, end: offset };
    });
    const records = new Map();
    for (const segment of segments) {
      if (records.has(segment.source)) continue;
      const frame = document.createElement('iframe');
      frame.title = segment.label;
      frame.allow = 'autoplay';
      frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
      st.root.insertBefore(frame, cue || null);
      const loaded = new Promise(resolve => frame.addEventListener('load', resolve, { once: true }));
      const url = new URL(segment.source, location.href);
      url.searchParams.set('embed', '1');
      url.searchParams.set('render', '1');
      KIT.sources.set(url.href, { phase: 'download', resources: [] });
      frame.src = url.href;
      const track = segment.nativeAudio ? null : loadMediaTrack({ src: segment.audio || `../../cases/${segment.caseId}/audio/film.m4a` });
      records.set(segment.source, { frame, loaded, segment, track, progress: 0 });
    }
    global.addEventListener('message', event => {
      const record = [...records.values()].find(item => item.frame.contentWindow === event.source);
      if (!record || event.data?.type !== 'motion:loading') return;
      record.progress = event.data.progress;
      load.source(record.frame.src, event.data);
    });
    const prepared = Promise.all([...records.values()].map(async record => {
      await record.loaded;
      record.window = record.frame.contentWindow;
      while (!record.window.__motion) await new Promise(requestAnimationFrame);
      await record.window.__motion.ready;
      record.window.__motion.pause();
      record.window.MotionKit.audio.disable();
      await record.window.__motion.setOrient(st.orient);
      if (record.track) await record.track.ready;
      record.progress = 1;
      await new Promise(requestAnimationFrame);
    }));
    preload([{ label: '原作画面与同段音轨', run: () => prepared }]);
    let orientReady = Promise.resolve();
    st.on('orient', orient => {
      orientReady = prepared.then(() => Promise.all([...records.values()].map(record => record.window.__motion.setOrient(orient))));
    });
    const mapped = time => {
      const segment = segments.find(item => time < item.end - 0.000001) || segments[segments.length - 1];
      return { segment, sourceTime: segment.from + Math.min(segment.to - segment.from, Math.max(0, time - segment.start)) };
    };
    let activeSource = null;
    const tl = timeline({
      duration: offset, fps: config.fps || 30, markers: config.markers || [],
      async render(time) {
        await prepared;
        await orientReady;
        const { segment, sourceTime } = mapped(time);
        const record = records.get(segment.source);
        for (const [source, item] of records) item.frame.style.visibility = source === segment.source ? 'visible' : 'hidden';
        if (activeSource !== segment.source) {
          activeSource = segment.source;
          void snd.sync();
        }
        if (cue) {
          const current = segment.cues.filter(item => item.t <= sourceTime + 0.000001).at(-1);
          cue.hidden = false;
          cue.textContent = segment.label + ' · ' + (current ? current.label : '片段开始');
        }
        const media = record.track?.media;
        if (media && snd.enabled && tl.playing && !media.paused && !media.seeking && Math.abs(media.currentTime - sourceTime) > 0.08) media.currentTime = sourceTime;
        return record.window.__motion.seek(sourceTime);
      },
    });
    const snd = playerSound(tl, async (enabled, valid, report) => {
      if (!enabled || !tl.playing) for (const record of records.values()) record.track?.media.pause();
      await prepared;
      if (!valid()) return;
      const { segment, sourceTime } = mapped(tl.time);
      const selected = records.get(segment.source);
      for (const record of records.values()) {
        if (record.segment.nativeAudio) {
          if (record !== selected || !enabled || !tl.playing) {
            record.window.__motion.pause();
            record.window.MotionKit.audio.disable();
          }
        } else if (record !== selected || !enabled || !tl.playing) {
          record.track.media.pause();
          record.track.media.muted = true;
        }
      }
      if (segment.nativeAudio) {
        const original = selected.window.__motion;
        original.setRate(tl.rate);
        await original.seek(sourceTime);
        if (!valid()) return;
        if (enabled && tl.playing) {
          await selected.window.MotionKit.audio.enable({ replay: true });
          original.play();
          report(selected.window.MotionKit.audio.state);
        }
      } else {
        const media = selected.track.media;
        media.currentTime = sourceTime;
        media.playbackRate = tl.rate;
        media.muted = !enabled;
        if (enabled && tl.playing) {
          try {
            await media.play();
            if (valid()) report('on');
          } catch (error) {
            if (!valid() || error.name === 'AbortError') return;
            if (error.name !== 'NotAllowedError') throw error;
            report('blocked');
          }
        }
      }
    });
    expose(tl, { title: config.title, sound: true });
    controls(tl, { sound: snd, accent: config.accent, rates: config.rates });
    global.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => { if (event.matches) tl.pause(); });
    start(tl, { t: 0, reduced: config.reduced });
    return tl;
  }

  /* =====================================================================
   * 控制条
   * ===================================================================== */
  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    restart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12a7 7 0 1 0 2.05-4.95M5 4.5V9h4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    soundOn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    soundOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    landscape: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6.5" width="19" height="11" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 10.5v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    portrait: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="2.5" width="11" height="19" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 18h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  };

  const fmt = (s) => `${pad(s / 60)}:${pad(s % 60)}.${pad((s % 1) * 100)}`;

  /**
   * 控制条：播放/暂停、重播、刻度、时间、画幅切换（舞台支持两种画幅时）、声音开关（传入 sound 或挂了乐谱时）。
   * 嵌入（?embed）与渲染（?render）模式不创建；键盘：空格播放，←/→ 跳 1 秒，Shift+←/→ 跳到上/下一个标记，Home 回到开头。
   * 按钮节点只创建一次，状态变化时只切换属性，不在每帧重写按钮内容（每帧替换子节点会让 pointerdown 与 pointerup
   * 落在不同节点上，导致 click 丢失）。
   */
  function controls(tl, { sound: snd = null, accent = '#ff5b2e', orient = true, rates = null, step = 'seconds' } = {}) {
    const p = params();
    if (snd) KIT.usesSound = true;
    const keys = (e) => {
      if (!KIT.readyState) return;
      const tg = e.target;
      if (tg && tg.closest) {
        if (tg.closest('input, textarea, select, [contenteditable="true"], [contenteditable=""]')) return;
        if (tg.closest('button') && (e.code === 'Space' || e.key === 'Enter')) return; // 交给按钮自身激活，避免双重切换
      }
      if (e.code === 'Space') { e.preventDefault(); tl.toggle(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        if (step === 'frames') {
          e.preventDefault();
          tl.pause();
          tl.seek(tl.time + dir / tl.fps);
        } else if (e.shiftKey && tl.markers.length) {
          const ts = tl.markers.map((m) => m.t).sort((a, b) => a - b);
          const next = dir > 0 ? ts.find((v) => v > tl.time + 0.05) : [...ts].reverse().find((v) => v < tl.time - 0.05);
          if (next != null) tl.seek(next);
        } else tl.seek(tl.time + dir);
      } else if (e.key === 'Home') tl.seek(0);
    };
    global.addEventListener('keydown', keys);
    if (p.embed || p.render) return null;

    const bar = document.createElement('div');
    bar.className = 'mk-controls';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', '播放控制');
    bar.innerHTML = `
      <button type="button" data-act="toggle" aria-label="播放"><span class="mk-i mk-i-play">${ICON.play}</span><span class="mk-i mk-i-pause">${ICON.pause}</span></button>
      <button type="button" data-act="restart" aria-label="从头播放"><span class="mk-i">${ICON.restart}</span></button>
      ${step === 'frames' ? '<button type="button" data-act="back" aria-label="上一帧"><span class="mk-i"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></span></button><button type="button" data-act="next" aria-label="下一帧"><span class="mk-i"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></span></button>' : ''}
      <input type="range" min="0" max="${tl.duration}" step="0.01" value="0" aria-label="时间">
      <output>${fmt(0)}</output>
      <button type="button" data-act="orient" aria-label="切换为竖屏" hidden><span class="mk-i mk-i-land">${ICON.landscape}</span><span class="mk-i mk-i-port">${ICON.portrait}</span></button>
      <button type="button" data-act="sound" aria-label="开启声音" aria-pressed="false" hidden><span class="mk-i mk-i-on">${ICON.soundOn}</span><span class="mk-i mk-i-off">${ICON.soundOff}</span></button>`;
    const style = document.createElement('style');
    style.textContent = `
      .mk-controls{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:8px;
        padding:6px 10px;border-radius:999px;background:rgba(14,15,18,.78);color:#f1efe9;backdrop-filter:blur(10px);
        font:13px/1 "Cascadia Mono","JetBrains Mono",Consolas,monospace;box-shadow:0 8px 30px rgba(0,0,0,.25);opacity:.3;transition:opacity .2s;
        box-sizing:border-box;max-width:calc(100vw - 16px)}
      .mk-controls:hover,.mk-controls:focus-within{opacity:1}
      .mk-controls button{all:unset;cursor:pointer;width:32px;height:32px;display:grid;place-items:center;border-radius:50%;flex:none}
      .mk-controls button[hidden]{display:none}
      .mk-controls button:focus-visible{outline:2px solid ${accent};outline-offset:1px}
      .mk-controls button:hover{background:rgba(255,255,255,.12)}
      .mk-controls .mk-i{display:grid;place-items:center;pointer-events:none}
      .mk-controls svg{width:18px;height:18px;pointer-events:none}
      .mk-controls .mk-i-pause,.mk-controls[data-playing] .mk-i-play{display:none}
      .mk-controls[data-playing] .mk-i-pause{display:grid}
      .mk-controls .mk-i-on,.mk-controls[data-sound="on"] .mk-i-off,.mk-controls[data-sound="blocked"] .mk-i-off{display:none}
      .mk-controls[data-sound="on"] .mk-i-on,.mk-controls[data-sound="blocked"] .mk-i-on{display:grid}
      .mk-controls[data-sound="blocked"] [data-act="sound"]{opacity:.55}
      .mk-controls[data-orient="landscape"] .mk-i-land,.mk-controls[data-orient="portrait"] .mk-i-port{display:none}
      .mk-controls input{flex:1 1 360px;width:auto;min-width:48px;max-width:360px;accent-color:${accent}}
      .mk-controls output{min-width:76px;font-variant-numeric:tabular-nums}
      .mk-controls .mk-rate{display:flex;align-items:center;gap:6px;flex:none;white-space:nowrap}
      @media (max-width:520px){.mk-controls{gap:2px;padding:4px 6px;bottom:8px}.mk-controls output,.mk-controls .mk-rate span{display:none}.mk-controls button{width:30px;height:30px}}`;
    document.head.appendChild(style);
    document.body.appendChild(bar);
    const btn = bar.querySelector('[data-act="toggle"]');
    const sBtn = bar.querySelector('[data-act="sound"]');
    const oBtn = bar.querySelector('[data-act="orient"]');
    const range = bar.querySelector('input');
    const out = bar.querySelector('output');
    const gate = () => {
      for (const control of bar.querySelectorAll('input, [data-act="toggle"], [data-act="restart"], [data-act="back"], [data-act="next"]')) {
        control.disabled = !KIT.readyState;
        control.setAttribute('aria-disabled', String(!KIT.readyState));
      }
      if (KIT.readyState) { range.value = String(tl.time); out.textContent = fmt(tl.time); }
    };
    KIT.events.on('loading', gate);
    gate();
    let scrubbing = false, wasPlaying = false;

    const soundSource = snd && 'state' in snd ? snd : audio;
    const syncSound = () => {
      const s = soundSource.state;
      if (bar.dataset.sound === s) return;
      bar.dataset.sound = s;
      sBtn.setAttribute('aria-pressed', String(soundSource.enabled));
      sBtn.setAttribute('aria-label', s === 'off' ? '开启声音' : s === 'blocked' ? '声音已开启，等待页面内点击以启用' : '关闭声音');
    };
    const showSound = () => { if (sBtn.hidden) { sBtn.hidden = false; syncSound(); } };
    if (snd || tl.__score) showSound();
    audio.on('attach', (t) => { if (t === tl) showSound(); });
    soundSource.on('change', syncSound);
    syncSound();

    const syncOrient = () => {
      const st = KIT.stage;
      if (!st || !orient || st.orients.length < 2) { oBtn.hidden = true; return; }
      oBtn.hidden = false;
      if (bar.dataset.orient === st.orient) return;
      bar.dataset.orient = st.orient;
      oBtn.setAttribute('aria-label', st.orient === 'portrait' ? '切换为横屏 1920×1080' : '切换为竖屏 1080×1920');
    };
    syncOrient();
    KIT.events.on('stage', (st) => { syncOrient(); st.on('orient', syncOrient); });
    if (KIT.stage) KIT.stage.on('orient', syncOrient);

    bar.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const act = b.dataset.act;
      if (act === 'toggle') tl.toggle();
      else if (act === 'restart') { tl.seek(0); tl.play(); }
      else if (act === 'sound') { if (snd && snd !== audio && typeof snd.toggle === 'function') snd.toggle(); else audio.toggle(); syncSound(); }
      else if (act === 'orient' && KIT.stage) KIT.stage.toggleOrient();
      else if (act === 'back' || act === 'next') { tl.pause(); tl.seek(tl.time + (act === 'next' ? 1 : -1) / tl.fps); }
    });
    range.addEventListener('pointerdown', () => { scrubbing = true; wasPlaying = tl.playing; tl.pause(); });
    range.addEventListener('input', () => tl.seek(Number(range.value)));
    range.addEventListener('change', () => { scrubbing = false; if (wasPlaying) tl.play(); });
    let lastPlaying = null, lastText = '';
    tl.on((t, playing) => {
      if (!KIT.readyState) return;
      if (Number(range.max) !== tl.duration) range.max = String(tl.duration);
      if (!scrubbing) range.value = String(t);
      const s = fmt(t);
      if (s !== lastText) { lastText = s; out.textContent = s; }
      if (playing !== lastPlaying) {
        lastPlaying = playing;
        bar.toggleAttribute('data-playing', playing);
        btn.setAttribute('aria-label', playing ? '暂停' : '播放');
      }
    });
    if (rates && rates.length) {
      const label = document.createElement('label');
      label.className = 'mk-rate';
      const text = document.createElement('span');
      text.textContent = '速度';
      label.appendChild(text);
      const select = document.createElement('select');
      select.setAttribute('aria-label', '播放速度');
      select.style.cssText = 'font:inherit;font-size:13px;color:inherit;background:#26272b;border:0;border-radius:4px;padding:5px 2px';
      for (const rate of rates) select.add(new Option(`${rate} 倍`, String(rate), false, rate === tl.rate));
      select.onchange = () => tl.setRate(Number(select.value));
      tl.on('rate', rate => { select.value = String(rate); });
      label.appendChild(select);
      bar.appendChild(label);
    }
    return bar;
  }

  /* =====================================================================
   * 宿主消息（同源 iframe 的父页面 → Demo）
   * ===================================================================== */
  if (inFrame) {
    global.addEventListener('message', (e) => {
      if (e.source !== global.parent) return;
      const d = e.data;
      if (!d || typeof d.type !== 'string' || d.type.indexOf('motion:') !== 0) return;
      const tl = KIT.timeline;
      const snd = tl && tl.__sound || audio;
      switch (d.type) {
        case 'motion:orient':
          if (KIT.stage) KIT.stage.setOrient(d.orient, 'host');
          else KIT.hostOrient = d.orient;
          break;
        case 'motion:sound':
          if (d.on) snd.enable(); else snd.disable();
          break;
        case 'motion:query':
          if (tl && KIT.readyState) post(readyMsg(tl));
          reportLoading();
          post({ type: 'motion:sound', on: snd.enabled, state: snd.state });
          break;
        case 'motion:play': if (tl) tl.play(); break;
        case 'motion:pause': if (tl) tl.pause(); break;
        case 'motion:seek': if (tl && KIT.readyState && Number.isFinite(Number(d.t))) tl.seek(Number(d.t)); break;
        default: break;
      }
    });
  }

  /** 实时补间（交互型作品使用）；返回 cancel() */
  function tween({ from = 0, to = 1, duration = 0.4, delay = 0, ease: e = ease.outCubic, onUpdate, onDone } = {}) {
    let raf = 0, begin = 0, cancelled = false;
    const reduce = prefersReducedMotion();
    const step = (now) => {
      if (cancelled) return;
      if (!begin) begin = now + delay * 1000;
      const p = reduce ? 1 : clamp((now - begin) / (duration * 1000));
      if (now >= begin) onUpdate && onUpdate(lerp(from, to, e(p)), p);
      if (p < 1) raf = requestAnimationFrame(step);
      else onDone && onDone();
    };
    raf = requestAnimationFrame(step);
    return { cancel() { cancelled = true; cancelAnimationFrame(raf); } };
  }

  /**
   * 临界阻尼跟随：保留速度，可在途中改目标（适合可打断的抬起、轨道、镜头）。
   * f = follow(0, 8); 每帧 f.step(dt)；f.target = 1。
   */
  function follow(value = 0, rate = 8) {
    let v = 0;
    return {
      value, target: value, rate,
      step(dt) {
        const w = this.rate, x = this.value - this.target;
        const e = Math.exp(-w * dt);
        const nx = (x + (v + w * x) * dt) * e;
        v = (v - (v + w * x) * w * dt) * e;
        this.value = this.target + nx;
        return this.value;
      },
      snap(to) { this.value = this.target = to; v = 0; },
      get velocity() { return v; },
    };
  }

  global.MotionKit = {
    version: VERSION,
    clamp, lerp, invLerp, bezier, ease, seg, env, keyframes, rng, chars, typeText, scramble, count, pad, beats,
    timeline, params, prefersReducedMotion, expose, controls, start, stage, preload, load, mountFilm, replay, audio, sound, tween, follow, icons: ICON,
  };
  if (hasDOM) {
    const ready = Promise.race([exposed, loadingFailed]).then(tl => tl.ready);
    ready.catch(() => {});
    global.__motion = {
      ready, duration: 0, time: 0, playing: false,
      play() {}, pause() {}, toggle() {},
      seek: t => params().render ? ready.then(tl => tl.seek(t)) : Promise.resolve(0),
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
