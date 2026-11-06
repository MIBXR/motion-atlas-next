/*
 * 地图巡礼 · 渲染器
 * render(t) 只依赖时间 t：读取 config.js 的轨道，计算镜头、昼夜、路线、HUD、卡片与转场；画面与乐谱读同一张时间表。
 *  1. 舞台：MotionKit.stage() 固定 1920×1080 / 1080×1920 两套构图；切换画幅时 layout() 重建几何。
 *  2. 地图：MapLibre + OpenFreeMap，逐图层昼夜配色，山体阴影；路线放在 GL 图层里（line-gradient 按进度描出）。
 *  3. 对齐：地图上的节点、车头、引线、标签锚点都由同一个 project() 计算；步进器、印章、顶部规尺由同一组
 *     stepX() / ruleX() 计算并落在像素网格上——圆圈、点和直线的端点严格重合。
 *  4. 预加载：实时模式在 ready 之前按全部镜头关键帧与途中采样点逐个 jumpTo，等瓦片进入缓存；渲染模式（?render）
 *     每帧等瓦片就绪再返回；实时播放仍未就绪时，地图层淡入遮罩降级，而不是露白。
 *  5. 声音：乐谱（铺底和弦、贝斯、拨弦、半拍鼓组 + 事件音）由 MotionKit.audio.attach() 调度，可离线导出 WAV。
 */
(() => {
  'use strict';
  const MK = window.MotionKit;
  const PC = window.CASE_CONFIG ? window.CONFIG : null;
  const C = window.CASE_CONFIG || window.CONFIG;
  const isLive = !!PC?.liveMap;
  const T = C.tracks;
  const PATHS = window.PATHS || {};
  const P = MK.params();
  const layerParam = new URLSearchParams(location.search).get('layers');
  const layerMode = !PC && ['map', 'map,routes,markers'].includes(layerParam) ? layerParam : null;
  const { clamp, lerp, seg, env, ease } = MK;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DUR = C.meta.duration;
  const SPB = 60 / C.meta.bpm;
  const S = C.stops;
  const NS = 'http://www.w3.org/2000/svg';

  /* =====================================================================
   * 1. 舞台
   * ===================================================================== */
  let currentPlateT = null;
  const stageEl = $('#stage');
  if (layerMode) stageEl.dataset.layers = layerMode;
  const stage = MK.stage({ root: '#stage', background: '#000' });
  let O = stage.orient, L = C.layout[O], W = stage.width, H = stage.height;
  const portrait = () => O === 'portrait';

  /* =====================================================================
   * 2. 工具：颜色、文字、缓存写入
   * ===================================================================== */
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const mix = (a, b, p) => a.map((v, i) => Math.round(lerp(v, b[i], p)));
  const css = (c, a = 1) => (a >= 1 ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${+a.toFixed(3)})`);
  const lum = (c) => 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
  /** 昼夜三段插值：白天 → 去饱和的灰 → 夜晚（原片的“先变灰再变暗”） */
  function dayNight(day, night, n) {
    const mid = mix(day, night, 0.5), g = lum(mid), grey = mid.map((v) => Math.round(lerp(v, g, 0.7)));
    return n < 0.5 ? mix(day, grey, n * 2) : mix(grey, night, n * 2 - 1);
  }
  const PAL = Object.fromEntries(Object.entries(C.palette).map(([k, v]) => [k, hex(v)]));
  const WHITE = [255, 255, 255];

  const memo = new WeakMap();
  const cache = (el) => { let m = memo.get(el); if (!m) memo.set(el, (m = {})); return m; };
  /** 只在值变化时写入（每帧几百次写入里绝大多数是相同值） */
  function txt(el, s) { const m = cache(el); if (m.t !== s) { m.t = s; el.textContent = s; } }
  function sty(el, k, v) { const m = cache(el); const key = 's:' + k; if (m[key] !== v) { m[key] = v; el.style.setProperty(k, v); } }
  function attr(el, k, v) { const m = cache(el); const key = 'a:' + k; if (m[key] !== v) { m[key] = v; el.setAttribute(k, v); } }
  const op = (el, v) => { v = clamp(v); sty(el, 'opacity', v < 0.001 ? '0' : String(+v.toFixed(3))); sty(el, 'visibility', v < 0.001 ? 'hidden' : 'inherit'); };
  const f1 = (v) => +v.toFixed(1);
  const f2 = (v) => +v.toFixed(2);
  const half = (v) => Math.round(v - 0.5) + 0.5; // 奇数宽描边落在半像素上，避免发虚
  const svg = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const splitChars = (el, text) => { el.innerHTML = ''; return MK.chars(text).map((ch) => { const s = document.createElement('span'); s.textContent = ch; if (ch === ' ') s.className = 'sp'; el.appendChild(s); return s; }); };

  /* ---------- 时间工具 ---------- */
  const EASE = { inOut: ease.inOutCubic, out: (x) => 1 - Math.pow(1 - x, 3.2), in: ease.inCubic, linear: ease.linear };
  const valueAt = (list, t, key = 'v', e = ease.inOutCubic) => {
    if (t <= list[0].t) return list[0][key];
    for (let i = 0; i < list.length - 1; i++) {
      const a = list[i], b = list[i + 1];
      if (t <= b.t) return lerp(a[key], b[key], e(MK.invLerp(a.t, b.t, t)));
    }
    return list[list.length - 1][key];
  };
  const stepAt = (list, t) => { let cur = null; for (const it of list) if (t >= it.t) cur = it; return cur; };
  const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  function clockAt(t) {
    const Lc = T.clock;
    let i = 0;
    while (i < Lc.length - 1 && t >= Lc[i + 1].t) i++;
    const a = Lc[i], b = Lc[i + 1];
    const m = b ? lerp(toMin(a.time), toMin(b.time), MK.invLerp(a.t, b.t, t)) : toMin(a.time);
    return `${MK.pad(m / 60)}:${MK.pad(m % 60)}`;
  }

  /* =====================================================================
   * 3. 几何：墨卡托、路线、航线弧
   * ===================================================================== */
  const rad = Math.PI / 180;
  const merc = ([lng, lat]) => [(lng + 180) / 360, (1 - Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2)) / Math.PI) / 2];
  const unmerc = ([x, y]) => [x * 360 - 180, Math.atan(Math.sinh(Math.PI * (1 - 2 * y))) / rad];
  /** 航线：大圆插值 + 侧向弯曲（bend），点数足够让地球投影下也平滑 */
  function arc(a, b, bend, n = 160) {
    const A = merc(a), B = merc(b), dx = B[0] - A[0], dy = B[1] - A[1];
    const cx = (A[0] + B[0]) / 2 + dy * bend, cy = (A[1] + B[1]) / 2 - dx * bend;
    return Array.from({ length: n + 1 }, (_, i) => {
      const k = i / n, u = 1 - k;
      return unmerc([u * u * A[0] + 2 * u * k * cx + k * k * B[0], u * u * A[1] + 2 * u * k * cy + k * k * B[1]]);
    });
  }
  // 路线：端点对齐到站点；累计长度按墨卡托距离计算——与 GL 的 line-progress 同一把尺子，车头与线的末端重合
  const routes = T.routes.map((r) => {
    let pts = r.path ? (typeof r.path === 'string' ? (PATHS[r.path] || []) : r.path).map((p) => p.slice()) : arc(S[r.from].lngLat, S[r.to].lngLat, r.bend || 0.15);
    if (!pts.length) pts = [S[r.from].lngLat, S[r.to].lngLat];
    if (r.from) pts[0] = S[r.from].lngLat.slice();
    if (r.to) pts[pts.length - 1] = S[r.to].lngLat.slice();
    const m = pts.map(merc), cum = [0];
    for (let i = 1; i < m.length; i++) cum.push(cum[i - 1] + Math.hypot(m[i][0] - m[i - 1][0], m[i][1] - m[i - 1][1]));
    return { ...r, pts, m, cum, len: cum[cum.length - 1] };
  });
  const R = Object.fromEntries(routes.map((r) => [r.id, r]));
  /** 路线进度 p 处的点（墨卡托弧长参数化） */
  function pointAt(r, p) {
    const target = r.len * clamp(p);
    let i = 1;
    while (i < r.cum.length - 1 && r.cum[i] < target) i++;
    const k = (target - r.cum[i - 1]) / (r.cum[i] - r.cum[i - 1] || 1);
    const mm = [lerp(r.m[i - 1][0], r.m[i][0], k), lerp(r.m[i - 1][1], r.m[i][1], k)];
    return { ll: unmerc(mm), i, ang: Math.atan2(r.m[i][1] - r.m[i - 1][1], r.m[i][0] - r.m[i - 1][0]) };
  }
  function partial(r, p) {
    if (p >= 1) return r.pts;
    const h = pointAt(r, p), out = r.pts.slice(0, h.i);
    out.push(h.ll);
    return out;
  }
  const inOutSine = (x) => 0.5 - Math.cos(Math.PI * x) / 2, inSine = (x) => 1 - Math.cos((Math.PI * x) / 2);
  const routeP = (r, t) => (t < r.t0 ? 0 : r.follow && MAP.ok && t < r.t1 ? followP(r, t) : seg(t, r.t0, r.t1 - r.t0, inOutSine));
  /*
   * 航线进度按“屏幕空间”跟随（route.follow）：镜头在 3.8 秒里从地球推近 9 级，飞机若按时间匀速前进，推到一半就被甩出画面
   * （实测 9.5–11s 画面里既没有飞机也没有航线）。改为：飞机在屏幕上始终位于终点“来向”一侧、距终点 (1 − e)·L 像素处
   * （e 为时间的缓入缓出，L 横屏 520 / 竖屏 400），进度取航线上投影离这个屏幕位置最近的点。镜头越推越近，同样的屏幕距离
   * 对应的地理距离越短，进度单调前进；地球视角时这个位置在起点之外，飞机从起点出发；t1 时正好落在终点。
   * 只依赖 t 与当前镜头，seek 到任意时刻结果一致。必须在 applyCamera(当前镜头) 之后调用。
   */
  function followP(r, t) {
    const n = r.pts.length, e = inOutSine(clamp((t - r.t0) / (r.t1 - r.t0)));
    const k = project(r.pts[n - 1]), back = project(r.pts[Math.max(0, n - 7)]);
    const dl = Math.hypot(back.x - k.x, back.y - k.y) || 1, L = (portrait() ? 400 : 520) * (1 - e);
    const sx = k.x + ((back.x - k.x) / dl) * L, sy = k.y + ((back.y - k.y) / dl) * L;
    let best = 0, bd = Infinity;
    for (let i = 0; i < n; i++) { const q = project(r.pts[i]), d = (q.x - sx) ** 2 + (q.y - sy) ** 2; if (d < bd) { bd = d; best = i; } }
    // 相邻两段里再细分，进度连续（按墨卡托弧长）
    let p = r.cum[best] / r.len, pd = bd;
    for (const j of [best - 1, best + 1]) {
      if (j < 0 || j >= r.pts.length) continue;
      for (let m = 1; m < 8; m++) {
        const c = lerp(r.cum[best], r.cum[j], m / 8) / r.len, q = project(pointAt(r, c).ll), d = (q.x - sx) ** 2 + (q.y - sy) ** 2;
        if (d < pd) { pd = d; p = c; }
      }
    }
    return Math.max(p, seg(t, r.t0, r.t1 - r.t0, inSine)); // 兜底：不慢于缓入的进度
  }

  /* =====================================================================
   * 4. 镜头
   * ===================================================================== */
  const CAM = T.camera;
  /** 时刻 t 的镜头（按画幅）：缩放与中心按“尺度加权”插值——大跨度推近时目标点平稳收拢到画面焦点，而不是最后一刻甩进来 */
  function cameraAt(t, orient = O) {
    const por = orient === 'portrait';
    const conv = (k) => ({
      c: k.c, z: k.z + (por ? (k.zp ?? -0.55) : 0), p: k.p, b: k.b,
      f: por ? (k.fp || [540, 760]) : (k.f || [960, 560]),
    });
    let a, b, u;
    if (t <= CAM[0].t) { a = b = conv(CAM[0]); u = 0; }
    else if (t >= CAM[CAM.length - 1].t) { a = b = conv(CAM[CAM.length - 1]); u = 0; }
    else {
      let i = 0;
      while (i < CAM.length - 2 && t > CAM[i + 1].t) i++;
      const ka = CAM[i], kb = CAM[i + 1];
      a = conv(ka); b = conv(kb);
      u = (EASE[kb.e] || EASE.inOut)(MK.invLerp(ka.t, kb.t, t));
    }
    const z = lerp(a.z, b.z, u);
    let cu = u;
    if (Math.abs(b.z - a.z) > 0.5) {
      const sa = Math.pow(2, -a.z), sb = Math.pow(2, -b.z), s = Math.pow(2, -z);
      cu = clamp((s - sa) / (sb - sa));
    }
    const ma = merc(a.c), mb = merc(b.c);
    const center = unmerc([lerp(ma[0], mb[0], cu), lerp(ma[1], mb[1], cu)]);
    let db = b.b - a.b;
    if (db > 180) db -= 360; else if (db < -180) db += 360;
    const fx = lerp(a.f[0], b.f[0], u), fy = lerp(a.f[1], b.f[1], u);
    const Wd = por ? 1080 : 1920, Hd = por ? 1920 : 1080;
    // 焦点 → padding：MapLibre 把中心放在去掉 padding 后区域的中心
    const padding = {
      left: Math.max(0, 2 * fx - Wd), right: Math.max(0, Wd - 2 * fx),
      top: Math.max(0, 2 * fy - Hd), bottom: Math.max(0, Hd - 2 * fy),
    };
    return { center, zoom: z, pitch: lerp(a.p, b.p, u), bearing: a.b + db * u, padding, focus: [fx, fy] };
  }

  /* =====================================================================
   * 5. 地图
   * ===================================================================== */
  const MAP = {
    map: null, ok: false, stats: { samples: 0, ms: 0, misses: 0, frames: 0, missFrames: [], missTiles: [], tiles: 0 },
    veil: 0, lastMissAt: -1, applied: '',
  };
  const loadScript = src => MK.load.script(src);
  const MP = Object.fromEntries(Object.entries(C.mapPalette).map(([k, v]) => [k, v.map(hex)]));
  const COLOR_PROP = { background: 'background-color', fill: 'fill-color', line: 'line-color', 'fill-extrusion': 'fill-extrusion-color' };
  const mapLayers = [];
  function classify(l) {
    const id = l.id;
    if (l.type === 'background') return 'bg';
    if (id === 'bld3d') return 'extrusion';
    if (id === 'rail-all') return 'rail';
    if (/^water$|waterway/.test(id)) return 'water';
    if (/park|wood/.test(id)) return 'green';
    if (/ice|glacier/.test(id)) return 'ice';
    if (/landuse/.test(id)) return 'landuse';
    if (id === 'building') return 'building';
    if (/aeroway/.test(id)) return 'aero';
    if (/casing/.test(id)) return 'casing';
    if (/railway/.test(id)) return 'rail';
    if (/boundary/.test(id)) return 'boundary';
    if (/motorway/.test(id)) return 'motorway';
    if (/highway|road|tunnel/.test(id)) return 'road';
    return null;
  }
  const paintCache = new Map();
  function setPaint(id, prop, value) {
    const k = id + '|' + prop, v = typeof value === 'string' ? value : JSON.stringify(value);
    if (paintCache.get(k) === v) return;
    paintCache.set(k, v);
    try { MAP.map.setPaintProperty(id, prop, value); } catch (e) { /* 图层不存在时忽略 */ }
  }
  const EMPTY = { type: 'FeatureCollection', features: [] };
  const lineFeature = (pts) => ({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: pts } });

  /** WebGL 是否由 CPU 软件实现（SwiftShader / llvmpipe / Microsoft Basic Render 等） */
  function softwareGL() {
    try {
      const gl = document.createElement('canvas').getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
      return /swiftshader|llvmpipe|softpipe|basic render|software/i.test(name);
    } catch (e) { return false; }
  }
  async function initMap() {
    if (new URLSearchParams(location.search).has('nomap')) throw new Error('nomap');
    await MK.load.stylesheet(C.map.css);
    // ?tilemirror=http://主机:端口：把 OpenFreeMap 与高程瓦片改走镜像（自建瓦片服务、离线演示、网络环境切换）；
    // ?demmirror= 单独指定高程瓦片的镜像（与线上一样分属两个主机，各用各的连接数）
    const qs = new URLSearchParams(location.search);
    const mirror = (qs.get('tilemirror') || '').replace(/\/$/, ''), demMirror = (qs.get('demmirror') || mirror).replace(/\/$/, '');
    const rewrite = (url) => url.replace('https://tiles.openfreemap.org/', mirror ? mirror + '/ofm/' : '$&').replace('https://s3.amazonaws.com/elevation-tiles-prod/', demMirror ? demMirror + '/dem/' : '$&');
    MAP.rewrite = rewrite;
    const styleP = MK.load.fetch(rewrite(C.map.style)).then((r) => r.json());
    await loadScript(C.map.lib, 30000);
    // MapLibre 5 默认只用 1 个 worker 解析瓦片；预取时要并行解析几百块瓦片，开到 2–4 个
    window.maplibregl.setWorkerCount(clamp(Math.floor((navigator.hardwareConcurrency || 4) / 2), 2, 4));
    window.maplibregl.addProtocol('motion', async request => {
      const url = request.url.slice('motion://'.length);
      const response = await MK.load.fetch(url);
      if (!response.ok) throw new Error(response.status + ' ' + url);
      return { data: request.type === 'json' ? await response.json() : request.type === 'string' ? await response.text() : await response.arrayBuffer() };
    });
    const cam = cameraAt(0);
    MAP.softGL = softwareGL();
    const softwarePreview = MAP.softGL && (!P.render || stage.scale < 1);
    const map = new window.maplibregl.Map({
      container: 'map', style: await styleP, center: cam.center,
      transformRequest: url => ({ url: url.startsWith('blob:') || url.startsWith('data:') ? url : 'motion://' + rewrite(url) }), zoom: cam.zoom, pitch: cam.pitch, bearing: cam.bearing,
      interactive: false, attributionControl: false, fadeDuration: 0, maxPitch: 75, renderWorldCopies: false,
      // 预取的瓦片要整段留在缓存里：默认缓存只有“视口瓦片数 × 5”（1920×1080 约 100 块），这里放大
      maxTileCacheSize: 900, maxTileCacheZoomLevels: 60,
      // 软件 GL 预览关闭 MSAA；原生尺寸逐帧导出保留抗锯齿。
      pixelRatio: pixelRatioFor(stage.scale), canvasContextAttributes: { antialias: !softwarePreview, preserveDrawingBuffer: false },
    });
    MAP.map = map;
    window.__map = map; // 调试与验证脚本用
    await new Promise((res, rej) => {
      // 样式解析完就继续（'load' 还要等第一帧的瓦片全部到齐；瓦片由缓冲逻辑负责）
      if (map.isStyleLoaded()) res(); else map.once('style.load', res);
      map.once('error', (e) => { if (!map.isStyleLoaded()) rej(e.error || new Error('map error')); });
      setTimeout(() => rej(new Error('map timeout')), 30000);
    });
    map.setProjection({ type: 'globe' });
    if (softwarePreview) {
      // MapLibre 5.6 的精度读回会同步等待 GPU；软件预览保留首测结果，避免重复阻塞整条流水线。
      const settlePrecision = () => {
        const measurement = map.style.projection._verticalPerspectiveProjection?._errorMeasurement;
        if (measurement && measurement._lastReadbackFrame >= 0) {
          measurement._measureWaitFrames = Infinity;
          map.off('render', settlePrecision);
        }
      };
      map.on('render', settlePrecision);
    }
    map.setSky({ 'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 0.9, 4, 0.6, 6, 0] });
    const style = map.getStyle();
    for (const l of style.layers) if (l.type === 'symbol') map.setLayoutProperty(l.id, 'visibility', 'none');
    // 平面建筑只到 z14（之后由 3D 建筑接替），省掉 z14 瓦片里重复的一份几何
    try { map.setLayerZoomRange('building', 12, 14); } catch (e) { /* 样式变了就跳过 */ }
    // 山体阴影（AWS Terrain Tiles，terrarium 编码）：放在陆地填充之上、水面之下
    if (C.map.dem) {
      // tileSize 512：每块 256px 的高程瓦片按 512px 铺开（请求少一级缩放，瓦片数约 1/4；山体阴影本来就是柔和的底纹）
      map.addSource('dem', { type: 'raster-dem', tiles: [rewrite(C.map.dem)], encoding: 'terrarium', tileSize: 512, maxzoom: C.map.demMaxZoom || 10 });
      // 山体阴影显示于 z5.5–13 的区域与城市全景，高程瓦片按此范围加载。
      map.addLayer({ id: 'hillshade', type: 'hillshade', source: 'dem', minzoom: 5.5, maxzoom: 13, paint: {
        'hillshade-exaggeration': ['interpolate', ['linear'], ['zoom'], 5.5, 0.5, 9, 0.5, 11.5, 0.34, 13, 0.12],
        'hillshade-shadow-color': '#5f5644', 'hillshade-highlight-color': '#ffffff', 'hillshade-accent-color': '#5f5644',
      } }, 'waterway');
      map.moveLayer('water', 'waterway');
    }
    // 全部铁路（底图只在 z13 以上画铁路；这里从 z8 起画一条细线，让路线有“轨道”可循）
    map.addLayer({ id: 'rail-all', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation', minzoom: 8,
      filter: ['all', ['==', ['get', 'class'], 'rail'], ['!=', ['get', 'brunnel'], 'tunnel']],
      paint: { 'line-color': '#9d978c', 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.6, 12, 1.2, 16, 2.2], 'line-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0.5, 13, 0.8] } }, 'building');
    // 3D 建筑只建在 z14 瓦片上（近景）：z13 的远景建筑在屏幕上只有几个像素，却占预取内存的大头
    map.addLayer({ id: 'bld3d', type: 'fill-extrusion', source: 'openmaptiles', 'source-layer': 'building', minzoom: 14,
      paint: {
        'fill-extrusion-color': '#efebe3',
        // 高度在 z14 → 14.15 之间长出来：平面建筑止于 z14，伏见稻荷这一镜停在 z14.05–14.3，之前 14 → 14.5 的渐变让这一整段建筑几乎看不见
        'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 14, 0, 14.15, ['coalesce', ['get', 'render_height'], 6]],
        'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
        'fill-extrusion-opacity': 0.92, 'fill-extrusion-vertical-gradient': true,
      } });
    for (const l of map.getStyle().layers) {
      const key = classify(l);
      if (key && COLOR_PROP[l.type]) mapLayers.push({ id: l.id, prop: COLOR_PROP[l.type], key });
    }
    addRouteLayers(map);
    MAP.ok = true;
  }
  // 地图画布按“显示出来的像素”渲染：舞台缩小显示时（站点详情页、小窗口）降低像素比，GPU 开销按面积下降；
  // 渲染模式（render.mjs 视口 = 舞台尺寸）缩放为 1，像素比正好是 1，输出 1920×1080 / 1080×1920 不受影响
  function pixelRatioFor(scale) {
    return clamp((P.render ? 1 : window.devicePixelRatio || 1) * scale, 0.5, 2);
  }
  stage.on('resize', (s) => { if (MAP.map) { MAP.map.setPixelRatio(pixelRatioFor(s)); } });

  /* ---------- 路线图层：实线用 line-gradient 按进度描出（同步，无延迟）；虚线 / 圆点用 setData ---------- */
  const STEP = (p, on, off = 'rgba(0,0,0,0)') => (p >= 1 ? on : p <= 0 ? off : ['step', ['line-progress'], on, Math.max(1e-6, p), off]);
  function addRouteLayers(map) {
    for (const r of routes) {
      const sid = 'rt-' + r.id;
      if (r.style === 'rail' || r.style === 'wrong') {
        map.addSource(sid, { type: 'geojson', data: lineFeature(r.pts), lineMetrics: true });
        const layout = { 'line-cap': 'round', 'line-join': 'round' };
        map.addLayer({ id: sid + '-glow', type: 'line', source: sid, layout, paint: { 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 10, 15, 20], 'line-blur': ['interpolate', ['linear'], ['zoom'], 8, 6, 15, 12], 'line-gradient': STEP(0, '#000'), 'line-opacity': 0.5 } });
        map.addLayer({ id: sid + '-casing', type: 'line', source: sid, layout, paint: { 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 5, 15, 9], 'line-gradient': STEP(0, '#fff') } });
        map.addLayer({ id: sid, type: 'line', source: sid, layout, paint: { 'line-width': ['interpolate', ['linear'], ['zoom'], 8, 2.6, 15, 4.6], 'line-gradient': STEP(0, '#d9562c') } });
      } else {
        map.addSource(sid, { type: 'geojson', data: EMPTY });
        const dash = r.style === 'flight' ? [2.4, 2.2] : [0.01, 2.2];
        map.addLayer({ id: sid + '-casing', type: 'line', source: sid, layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-width': r.style === 'flight' ? 6 : 8, 'line-color': '#fff', 'line-opacity': 0.55, 'line-dasharray': dash.map((d) => d * (r.style === 'flight' ? 0.5 : 0.45)) } });
        map.addLayer({ id: sid, type: 'line', source: sid, layout: { 'line-cap': r.style === 'flight' ? 'butt' : 'round', 'line-join': 'round' }, paint: { 'line-width': r.style === 'flight' ? 2.6 : 4.2, 'line-color': '#16171a', 'line-dasharray': dash } });
        r.partialKey = '';
      }
    }
  }

  /* ---------- 投影：与 GL 图层同一个变换 ---------- */
  let boundsPad = null;
  function project(ll) {
    if (PC && !isLive) {
      const stops = PC.anchors[O]?.[String(currentPlateT)]?.stops || {};
      const stop = Object.values(S).find(s => s.lngLat[0] === ll[0] && s.lngLat[1] === ll[1]);
      const id = Object.keys(S).find(id => S[id] === stop);
      return stops[id] || {x:-10000,y:-10000};
    }
    const map = MAP.map;
    if (MAP.ok) {
      const p = map.project(ll);
      return { x: p.x, y: p.y };
    }
    const cam = MAP.fallbackCam, ws = 512 * 2 ** cam.zoom, m = merc(ll), c = merc(cam.center);
    return { x: (m[0] - c[0]) * ws + cam.focus[0], y: (m[1] - c[1]) * ws + cam.focus[1] };
  }
  /** 点是否在可见地表上（地球投影的背面、俯仰过大时的地平线之外都算不可见） */
  function visible(ll, cam) {
    if (!MAP.ok) return true;
    const c = cam.center, d = Math.acos(clamp(Math.sin(ll[1] * rad) * Math.sin(c[1] * rad) + Math.cos(ll[1] * rad) * Math.cos(c[1] * rad) * Math.cos((ll[0] - c[0]) * rad), -1, 1)) / rad;
    if (cam.zoom < 6) return d < 75;
    return boundsPad ? boundsPad.contains(ll) : true;
  }

  /** 把镜头写进地图（返回是否与上一帧不同） */
  function applyCamera(cam) {
    if (!MAP.ok) { MAP.fallbackCam = cam; return false; }
    const key = `${cam.center[0].toFixed(7)},${cam.center[1].toFixed(7)},${cam.zoom.toFixed(4)},${cam.pitch.toFixed(3)},${cam.bearing.toFixed(3)},${cam.focus[0].toFixed(1)},${cam.focus[1].toFixed(1)}`;
    const changed = key !== MAP.applied;
    MAP.applied = key;
    syncProjection(MAP.map, cam.zoom, cam.center[1]);
    MAP.map.jumpTo({ center: cam.center, zoom: cam.zoom, pitch: cam.pitch, bearing: cam.bearing, padding: cam.padding });
    // 低缩放（地球）时用球面角距判断可见，不需要边界框
    if (cam.zoom >= 6) {
      const b = MAP.map.getBounds();
      const dx = (b.getEast() - b.getWest()) * 0.08, dy = (b.getNorth() - b.getSouth()) * 0.08;
      boundsPad = new window.maplibregl.LngLatBounds([clamp(b.getWest() - dx, -180, 180), clamp(b.getSouth() - dy, -85, 85)], [clamp(b.getEast() + dx, -180, 180), clamp(b.getNorth() + dy, -85, 85)]);
    } else boundsPad = null;
    return changed;
  }

  /* ---------- 等待瓦片 ---------- */
  const nextRender = (map) => new Promise((res) => { let done = false; const fin = () => { if (!done) { done = true; res(); } }; map.once('render', fin); map.triggerRepaint(); setTimeout(fin, 250); });
  function tilesSettled(map, timeout = 15000) {
    return new Promise((res) => {
      const t0 = performance.now();
      const check = () => {
        if (map.areTilesLoaded() && map.loaded()) { map.off('data', check); clearInterval(iv); res(true); }
        else if (performance.now() - t0 > timeout) { map.off('data', check); clearInterval(iv); res(false); }
      };
      const iv = setInterval(check, 30);
      map.on('data', check);
      check();
    });
  }
  function waitIdle(map, timeout = 15000) {
    return new Promise((res) => {
      let done = false;
      const fin = () => { if (!done) { done = true; res(); } };
      map.once('idle', fin);
      map.triggerRepaint();
      setTimeout(fin, timeout);
    });
  }

  /* =====================================================================
   * 缓冲（实时模式）：像视频一样渐进预取
   *  1. 扫描（只在开始播放前做一次；切换画幅时重做）：逐个采样点 jumpTo，让 MapLibre 自己算出这一帧要哪些瓦片
   *     （与渲染时完全一致），只记清单、不下载。
   *  2. 缓冲泵（后台持续运行），两级，和视频播放器“下载在前、解码在后”一样：
   *     a. 下载：按“最早用到的时刻”顺序，把播放头之后 fetchAhead 秒内的瓦片用普通 fetch 拉进浏览器 HTTP 缓存
   *        （只占磁盘缓存，不占 JS 堆）；
   *     b. 解析：播放头之后 ahead 秒内的瓦片直接交给 MapLibre 的 worker 解析（命中 HTTP 缓存，只剩解析），放进它的
   *        瓦片缓存，播放到那一帧时直接取用。解析过的瓦片在主线程堆上约为 pbf 原始字节的 8–10 倍（实测），所以不在
   *        画面上的已解析瓦片按原始字节设预算 budgetMB：超出时只解析 resume + 1 秒以内的瓦片。
   *     已经播过 behind 秒以上、后面不再用到的瓦片主动淘汰，内存只保留一个滑动窗口。
   *     优先级：“必需”瓦片在前；只在快速推拉帧里用到、且 3 级以内已有上级瓦片可顶替的是“可选”瓦片（低价值：
   *     地图正在一秒跨好几级缩放），排在所有必需瓦片之后，带宽有富余才取。
   *  3. bufferedUntil = 从播放头起、所有采样点瓦片都已就绪的最远时刻。前方不足 stall 秒时暂停在当前帧并显示
   *     “缓冲”提示，攒够 resume 秒自动继续；拖动到未缓冲的位置同理。ready 门槛只要求开头 gate 秒。
   * ===================================================================== */
  // concVector / concDem：后台并发数（下载与解析共用；OpenFreeMap 走 HTTP/2 多路复用，S3 高程瓦片走 HTTP/1.1）
  // budgetMB：低内存设备（navigator.deviceMemory ≤ 4GB，多为手机）减半
  const BUF_CFG = { gate: 6, ahead: 10, fetchAhead: 45, soon: 20, budgetMB: navigator.deviceMemory && navigator.deviceMemory <= 4 ? 10 : 20, behind: 2, stall: 0.5, resume: 4, concVector: 10, concDem: 6 };
  const BUF = { orient: null, samples: [], tiles: new Map(), bufferedUntil: 0, gen: 0, stalled: false, selfPause: false, stallCount: 0, stallMs: 0, stallAt: 0, stalls: [], loads: 0, fetches: 0, deferred: 0, needSoon: false, evicted: 0, maxHeap: 0, cachedMB: 0, maxCachedMB: 0, budgetHits: 0 };
  function cameraSamples(orient) {
    const out = [], keys = new Set(CAM.map((k) => k.t));
    let last = null;
    // 地球远景（zoom < 6）的快速推拉按 5ms 扫描，覆盖地平线边缘的短暂瓦片；其余快速段为 25ms，缓慢段不超过 0.2s。
    const far = (a, b) => {
      if (!b) return true;
      if (Math.abs(a.zoom - b.zoom) > 0.12 || Math.abs(a.pitch - b.pitch) > 2.5 || Math.abs(a.bearing - b.bearing) > 3) return true;
      const ws = 512 * 2 ** Math.min(a.zoom, b.zoom), ma = merc(a.center), mb = merc(b.center);
      if (Math.hypot(ma[0] - mb[0], ma[1] - mb[1]) * ws > (orient === 'portrait' ? 100 : 150)) return true;
      return Math.hypot(a.focus[0] - b.focus[0], a.focus[1] - b.focus[1]) > 130;
    };
    let lastT = -1;
    for (let i = 0; i <= Math.round(DUR * 200); i++) {
      const t = i / 200;
      const fast = Math.abs(cameraAt(Math.min(DUR, t + 0.1), orient).zoom - cameraAt(Math.max(0, t - 0.1), orient).zoom) / 0.2 > 1;
      const cam = cameraAt(t, orient);
      if (i % 5 && !(fast && cam.zoom < 6)) continue;
      const moving = !last || far(cam, last) || (t - lastT >= 0.2 && JSON.stringify(cam) !== JSON.stringify(last));
      if (keys.has(t) || fast || moving) {
        // 快速段里缩放跨过整数级的那一格再细分 6 份：地球视角跨级的一瞬间（实测十几毫秒）边缘会多出几块瓦片
        if (fast && last && Math.floor(cam.zoom) !== Math.floor(last.zoom)) for (let k = 1; k < 6; k++) { const tk = +(lastT + ((t - lastT) * k) / 6).toFixed(4); out.push({ t: tk, cam: cameraAt(tk, orient) }); }
        out.push({ t, cam }); last = cam; lastT = t;
      }
    }
    return out;
  }
  const BASE_SOURCES = ['openmaptiles', 'dem'];
  /** 缺瓦片时允许用几级以内的上级瓦片顶替：一般 3 级；世界尺度（z ≤ 5，海岸线与国界本来就很概括）放宽到 4 级。
   *  只影响快速推拉帧（computeBuffered 只在快速帧接受顶替）与“缺瓦片”判定；航线起飞时一口气从 z2 推到 z11，
   *  z5 那一层 24 块 5MB 只在 0.3 秒里出现，放宽后改由 z1 顶替，10Mbps 下航线前的缓冲约少 2.5 秒 */
  const upLevels = (z) => (z <= 5 ? 4 : 3);
  /** 扫描：返回每个采样点需要的瓦片（tileID）。会清空数据源里的瓦片，只能在播放前 / 暂停时调用 */
  function scanTiles(list) {
    const map = MAP.map;
    const caches = BASE_SOURCES.map((id) => [id, map.style.sourceCaches[id]]).filter(([, sc]) => sc);
    const saved = caches.map(([, sc]) => [sc._source.loadTile, sc._source.abortTile, sc._source.unloadTile]);
    caches.forEach(([, sc]) => { sc._source.loadTile = () => new Promise(() => {}); sc._source.abortTile = () => {}; sc._source.unloadTile = () => {}; });
    const out = [];
    try {
      for (const it of list) {
        applyCamera(it.cam);
        const need = [];
        for (const [id, sc] of caches) {
          sc.used = map.style._order.some((lid) => { const l = map.style._layers[lid]; return l.source === id && !l.isHidden(it.cam.zoom); });
          if (!sc.used) continue;
          sc.update(map.transform, map.terrain);
          for (const k in sc._tiles) need.push([id, sc._tiles[k].tileID]);
        }
        // 快速推拉的过渡帧：缩放变化 > 1 级/秒。这些帧允许先用已就绪的上级瓦片顶替（MapLibre 本来就会这样画），不因此暂停
        const za = cameraAt(Math.max(0, it.t - 0.1), BUF.planning).zoom, zb = cameraAt(Math.min(DUR, it.t + 0.1), BUF.planning).zoom;
        out.push({ t: it.t, need, fast: Math.abs(zb - za) / 0.2 > 1 });
      }
    } finally {
      caches.forEach(([, sc], i) => { [sc._source.loadTile, sc._source.abortTile, sc._source.unloadTile] = saved[i]; sc.clearTiles(); });
    }
    return out;
  }
  let EvalParams = null;
  function syncProjection(map, zoom, latitude = map.transform.center.lat) {
    const proj = map.style.projection;
    if (!proj || !proj.recalculate) return;
    if (!EvalParams) {
      for (const l of Object.values(map.style._layers)) {
        for (const v of Object.values((l.paint && l.paint._values) || {})) if (v && v.parameters && typeof v.parameters.crossFadingFactor === 'function') { EvalParams = v.parameters.constructor; break; }
        if (EvalParams) break;
      }
      if (!EvalParams) { map.redraw(); return; } // 找不到就退回同步重绘（慢一些，但结果一样）
    }
    proj.recalculate(new EvalParams(zoom, { now: performance.now() }));
    if (proj.setErrorQueryLatitudeDegrees) proj.setErrorQueryLatitudeDegrees(latitude);
    map.transform.setTransitionState(proj.transitionState, proj.latitudeErrorCorrectionRadians);
  }
  /** 建立缓冲计划：每块瓦片记下最早 / 最晚用到的时刻 */
  function planBuffer(orient) {
    const t0 = performance.now();
    const list = cameraSamples(orient);
    BUF.planning = orient;
    const scanned = scanTiles(list);
    BUF.gen++;
    BUF.orient = orient;
    BUF.tiles = new Map();
    BUF.samples = scanned.map((s, k) => {
      const tiles = [];
      // 按镜头有效区间维护瓦片队列，静止镜头保留当前所需瓦片；tLast 记录区间结束时刻。
      const tEnd = k + 1 < scanned.length ? scanned[k + 1].t : DUR;
      for (const [src, tid] of s.need) {
        const key = src + '/' + tid.key;
        let e = BUF.tiles.get(key);
        if (!e) BUF.tiles.set(key, (e = { key, src, tid, tFirst: s.t, tLast: tEnd, state: 'pending', fastOnly: true }));
        e.tLast = Math.max(e.tLast, tEnd);
        if (!s.fast) e.fastOnly = false; // 只在快速推拉帧里用到的瓦片：优先级最低（画面可以先用上级瓦片）
        tiles.push(e);
      }
      return { t: s.t, tiles, fast: s.fast };
    });
    // 分级（静态）：只在快速推拉帧里用到的瓦片，若 upLevels 级以内有“必需”的上级瓦片、且上级瓦片到那时还留在缓存里
    // （上级的使用时段 + 0.5 秒最短保留期与它重叠），就是“可选”瓦片——播放到那里时上级瓦片已经就绪，可以顶替
    // （MapLibre 本来就这样画）。按缩放从低到高推，上级的分级先定
    const byZ = [...BUF.tiles.values()].sort((a, b) => a.tid.overscaledZ - b.tid.overscaledZ);
    for (const e of byZ) {
      e.optional = false;
      if (!e.fastOnly) continue;
      for (let z = e.tid.overscaledZ - 1; z >= Math.max(0, e.tid.overscaledZ - upLevels(e.tid.overscaledZ)) && !e.optional; z--) {
        const a = BUF.tiles.get(e.src + '/' + e.tid.scaledTo(z).key);
        if (a && !a.optional && a.tFirst <= e.tLast && a.tLast + 0.5 >= e.tFirst) e.optional = true;
      }
    }
    BUF.bufferedUntil = 0;
    BUF.gateDone = false;
    BUF.planMs = Math.round(performance.now() - t0);
    console.info(`[地图巡礼] 缓冲计划 ${orient}：${list.length} 个采样点 · ${BUF.tiles.size} 块瓦片（可选 ${byZ.filter((e) => e.optional).length}）· 扫描 ${BUF.planMs}ms`);
  }
  let TileCtor = null;
  /** 瓦片是否已解析并留在 MapLibre 里（正在显示，或在瓦片缓存中） */
  function tileReady(e) {
    const sc = MAP.map.style.sourceCaches[e.src];
    const live = sc._tiles[e.tid.key];
    if (live && live.hasData()) return true;
    const c = sc._cache.has(e.tid) ? sc._cache.get(e.tid) : null;
    return !!(c && c.hasData());
  }
  // DEM：相邻瓦片互相补边（与 MapLibre 的 _backfillDEM 相同），避免山体阴影出现接缝
  function backfillDem(tile, sc) {
    const others = [...Object.values(sc._tiles), ...Object.values(sc._cache.data).flat().map((d) => d.value)];
    for (const o of others) {
      if (!o || !o.dem || !tile.dem || o === tile || o.tileID.canonical.z !== tile.tileID.canonical.z) continue;
      const dx = o.tileID.canonical.x - tile.tileID.canonical.x, dy = o.tileID.canonical.y - tile.tileID.canonical.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1 || (dx === 0 && dy === 0)) continue;
      tile.dem.backfillBorder(o.dem, dx, dy);
      o.dem.backfillBorder(tile.dem, -dx, -dy);
      tile.needsHillshadePrepare = o.needsHillshadePrepare = true;
    }
  }
  async function loadEntry(e, gen) {
    const map = MAP.map, sc = map.style.sourceCaches[e.src];
    if (!TileCtor) {
      const any = Object.values(sc._tiles)[0] || Object.values(map.style.sourceCaches.openmaptiles._tiles)[0];
      if (!any) return;
      TileCtor = any.constructor;
    }
    e.state = 'loading';
    const tile = new TileCtor(e.tid, sc._source.tileSize * e.tid.overscaleFactor());
    tile.__pump = true; // 缓冲泵自己的请求：不受下面“推迟可选瓦片”的限制
    let timer = 0;
    try {
      // 单块瓦片 60 秒还没回来（网络卡住）：放弃这次请求，重新排队（最多重试 2 次）
      await Promise.race([sc._source.loadTile(tile), new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('timeout')), 60000); })]);
      clearTimeout(timer);
      const unload = () => { try { sc._source.unloadTile && sc._source.unloadTile(tile); } catch (err) { /* 已卸载 */ } };
      if (gen !== BUF.gen) { unload(); return; }
      if (tileReady(e)) { unload(); e.state = 'ready'; return; }
      tile.timeAdded = performance.now();
      if (sc._source.type === 'raster-dem' && tile.dem) backfillDem(tile, sc);
      sc._cache.add(e.tid, tile, tile.getExpiryTimeout());
      e.state = 'ready';
      BUF.loads++;
    } catch (err) {
      clearTimeout(timer);
      if (err && err.message === 'timeout') {
        try { tile.aborted = true; sc._source.abortTile && sc._source.abortTile(tile); } catch (er) { /* 已结束 */ }
        e.retries = (e.retries || 0) + 1;
        e.state = e.retries > 2 ? 'error' : 'pending';
        BUF.timeouts = (BUF.timeouts || 0) + 1;
        return;
      }
      e.state = gen === BUF.gen ? 'error' : 'pending'; // 404 / 网络错误：不阻塞缓冲（MapLibre 渲染时也会跳过这块瓦片）
    }
  }
  /**
   * MapLibre 自己为当前画面发出的瓦片请求里，“可选”瓦片在带宽紧张时（soon 秒内还有必需瓦片没到）且正在播放时不下载：
   * 它们只在快速推拉的几帧里出现、马上离开画面，下载一半就被取消，白白占带宽（实测 10Mbps 下航线一段多出几 MB）。
   * 画面先用上级瓦片顶替；瓦片离开画面时 MapLibre 会丢掉它（这个 Promise 永不完成，随瓦片对象一起回收）。
   * 被推迟的瓦片标上 __deferred，缓冲泵仍可以自己加载它（进缓存）。
   */
  function installDefer() {
    for (const src of BASE_SOURCES) {
      const sc = MAP.map.style.sourceCaches[src], s = sc && sc._source;
      if (!s || s.__deferWrapped) continue;
      const load = s.loadTile.bind(s);
      s.loadTile = (tile) => {
        const e = tile.__pump ? null : BUF.tiles.get(src + '/' + tile.tileID.key);
        if (e && e.optional && !e.fetched && BUF.needSoon && tl.playing && !P.render) { tile.__deferred = true; BUF.deferred++; return new Promise(() => {}); }
        return load(tile);
      };
      s.__deferWrapped = true;
    }
  }
  /** 瓦片地址（与 MapLibre 请求的地址一致，才能命中同一条 HTTP 缓存） */
  function tileUrl(e) {
    const tpl = e.src === 'dem' ? MAP.rewrite(C.map.dem) : MAP.map.getSource(e.src).tiles[0];
    const c = e.tid.canonical;
    return tpl.replace('{z}', c.z).replace('{x}', c.x).replace('{y}', c.y);
  }
  /** 下载（不解析）：拉进浏览器 HTTP 缓存，之后 MapLibre 解析时直接命中。失败不重试，解析时再走一次网络 */
  async function fetchEntry(e) {
    e.fetching = true;
    try {
      const r = await fetch(tileUrl(e), { credentials: 'same-origin' });
      await r.arrayBuffer(); // 读完响应体，缓存条目才完整
      e.fetched = r.ok || r.status === 404;
      BUF.fetches++;
    } catch (err) { e.fetched = true; /* 交给解析阶段处理 */ } finally { e.fetching = false; }
  }
  /** 一块已解析瓦片的原始字节（矢量：pbf；高程：解码后的高程数组） */
  function tileBytes(tile) {
    if (!tile) return 0;
    if (tile.latestRawTileData) return tile.latestRawTileData.byteLength;
    return tile.dem && tile.dem.data ? tile.dem.data.byteLength : 0;
  }
  /** 不在画面上的已解析瓦片（数据源缓存里的）共多少原始字节 */
  function cachedBytes() {
    let n = 0;
    for (const src of BASE_SOURCES) {
      const sc = MAP.map.style.sourceCaches[src];
      if (sc) for (const k of sc._cache.order) n += tileBytes(sc._cache.getByKey(k));
    }
    return n;
  }
  /** 淘汰：播放头之前 behind 秒以前用过、之后不再用到的瓦片，以及不在当前窗口里的缓存项。
   *  超出内存预算时收紧窗口：只留播放头前后 0.5 秒到 resume + 1 秒之内要用的 */
  function evict(T) {
    const map = MAP.map, keep = new Set(), over = BUF.cachedMB > BUF_CFG.budgetMB;
    const lo = T - (over ? 0.5 : BUF_CFG.behind), hi = T + (over ? BUF_CFG.resume + 1 : BUF_CFG.ahead + 2);
    for (const e of BUF.tiles.values()) if (e.tLast >= lo && e.tFirst <= hi) keep.add(e.key);
    for (const src of BASE_SOURCES) {
      const sc = map.style.sourceCaches[src];
      if (!sc) continue;
      for (const k of [...sc._cache.order]) {
        const v = sc._cache.getByKey(k);
        if (!v || keep.has(src + '/' + v.tileID.key)) continue;
        const removed = sc._cache._getAndRemoveByKey(k);
        if (removed) {
          sc._cache.onRemove(removed); BUF.evicted++;
          const e = BUF.tiles.get(src + '/' + removed.tileID.key);
          if (e && e.state === 'ready' && !tileReady(e)) e.state = 'pending';
        }
      }
    }
  }
  /** 上级瓦片（upLevels 级以内）是否已在 MapLibre 里：过渡帧可以先用它顶替 */
  function parentReady(e) {
    const sc = MAP.map.style.sourceCaches[e.src];
    for (let z = e.tid.overscaledZ - 1; z >= Math.max(0, e.tid.overscaledZ - upLevels(e.tid.overscaledZ)); z--) {
      const p = e.tid.scaledTo(z);
      const live = sc._tiles[p.key];
      if (live && live.hasData()) return true;
      if (sc._cache.has(p)) { const c = sc._cache.get(p); if (c && c.hasData()) return true; }
    }
    return false;
  }
  // 调试：当前画面里不在缓冲计划内的瓦片；卡住时阻塞缓冲的瓦片
  window.__bufDebug = {
    unplanned() {
      const out = [];
      for (const src of BASE_SOURCES) { const sc = MAP.map.style.sourceCaches[src]; if (sc) for (const k in sc._tiles) if (!BUF.tiles.has(src + '/' + k)) out.push(src + ' z' + sc._tiles[k].tileID.overscaledZ); }
      return out;
    },
    near(t) {
      let best = BUF.samples[0];
      for (const x of BUF.samples) if (x.t <= t) best = x;
      return { t: best.t, fast: best.fast, n: best.tiles.length, keys: best.tiles.map((e) => e.key + ' z' + e.tid.overscaledZ + '/' + e.tid.canonical.x + '/' + e.tid.canonical.y) };
    },
    live() {
      const out = [];
      for (const src of BASE_SOURCES) { const sc = MAP.map.style.sourceCaches[src]; if (sc) for (const k in sc._tiles) out.push(src + '/' + k + ' z' + sc._tiles[k].tileID.overscaledZ + '/' + sc._tiles[k].tileID.canonical.x + '/' + sc._tiles[k].tileID.canonical.y); }
      return out;
    },
    scan1(t) { const r = scanTiles([{ t, cam: cameraAt(t) }])[0]; return { fast: r.fast, need: r.need.map(([id, tid]) => id + '/' + tid.key + ' ' + tid.overscaledZ + '/' + tid.canonical.x + '/' + tid.canonical.y) }; },
    urls() {
      const out = [];
      for (const e of BUF.tiles.values()) out.push(tileUrl(e));
      return out;
    },
    states() { const c = {}; for (const e of BUF.tiles.values()) c[e.state] = (c[e.state] || 0) + 1; return c; },
    /** 缓冲计划：[数据源, z, x, y, 最早, 最晚, 只在快速推拉帧用到, 可选] */
    plan() { return [...BUF.tiles.values()].map((e) => [e.src, e.tid.canonical.z, e.tid.canonical.x, e.tid.canonical.y, e.tFirst, e.tLast, e.fastOnly ? 1 : 0, e.optional ? 1 : 0]); },
    blocking() {
      const T = tl.time; let i = 0;
      while (i < BUF.samples.length - 1 && BUF.samples[i + 1].t <= T) i++;
      for (let j = i; j < BUF.samples.length; j++) {
        const bad = BUF.samples[j].tiles.filter((e) => e.state !== 'error' && !(e.state === 'ready' && tileReady(e)) && !(BUF.samples[j].fast && parentReady(e)));
        if (bad.length) return { t: BUF.samples[j].t, fast: BUF.samples[j].fast, bad: bad.slice(0, 8).map((e) => [e.key, e.state, e.tFirst, e.tLast, tileReady(e)]) };
      }
      return null;
    },
  };
  /** 从播放头起连续就绪的最远时刻 */
  function computeBuffered(T) {
    let i = 0;
    while (i < BUF.samples.length - 1 && BUF.samples[i + 1].t <= T) i++;
    for (let j = i; j < BUF.samples.length; j++) {
      const s = BUF.samples[j];
      for (const e of s.tiles) {
        if (e.state === 'error') continue;
        if (tileReady(e)) { if (e.state === 'pending') e.state = 'ready'; continue; } // MapLibre 自己加载好的也算
        if (e.state === 'ready') e.state = 'pending';
        if (s.fast && parentReady(e)) continue;
        return j === i ? T : Math.max(T, s.t - 0.001);
      }
    }
    return DUR;
  }
  /** 缓冲泵：后台持续运行，重新规划（切换画幅）时由 gen 结束旧的循环 */
  async function pump(gen) {
    const inflight = { openmaptiles: 0, dem: 0 };
    let lastEvict = 0, lastBytes = 0, inflightNear = 0, inflightSoon = 0;
    while (gen === BUF.gen) {
      const T = tl.time;
      BUF.bufferedUntil = computeBuffered(T);
      if (performance.now() - lastBytes > 250) { BUF.cachedMB = cachedBytes() / 1048576; BUF.maxCachedMB = Math.max(BUF.maxCachedMB, BUF.cachedMB); lastBytes = performance.now(); }
      // 解析窗口：开头还没缓冲好时只取开头 gate 秒（不和后面的大瓦片抢带宽），之后放开到 ahead 秒；
      // 不在画面上的已解析瓦片超出内存预算时，只解析 resume + 1 秒以内的（保证能继续播放），其余等播过、淘汰后再解析
      const over = BUF.cachedMB > BUF_CFG.budgetMB;
      if (over) BUF.budgetHits++;
      const horizon = Math.min(DUR, T + (over ? BUF_CFG.resume + 1 : BUF_CFG.ahead), BUF.gateDone ? Infinity : BUF_CFG.gate);
      // 下载窗口：开头就绪之后才放开（之前全部带宽给开头）
      const fetchHorizon = BUF.gateDone ? Math.min(DUR, T + BUF_CFG.fetchAhead) : -1;
      const parse = [], fetchQ = [];
      for (const e of BUF.tiles.values()) {
        if (e.tLast < T - 0.5) continue;
        if (e.state === 'ready' && !tileReady(e)) e.state = 'pending'; // 被 MapLibre 或淘汰挪走了：重新排队
        if (e.state !== 'pending') continue;
        // 画面正在用、MapLibre 自己正在加载的瓦片不重复加载（否则同一块瓦片会被下载、解析两次）
        const live = MAP.map.style.sourceCaches[e.src]._tiles[e.tid.key];
        if (e.tFirst <= horizon) { if (!(over && e.optional) && (!live || live.__deferred)) parse.push(e); }
        else if (e.tFirst <= fetchHorizon && !e.fetched && !e.fetching) fetchQ.push(e);
      }
      // 必需的在前；同类按最早用到的时刻（当前帧缺的瓦片最先），同一时刻先低缩放（大块的先铺底）
      const order = (a, b) => (a.optional - b.optional) || Math.max(a.tFirst, T) - Math.max(b.tFirst, T) || a.tid.canonical.z - b.tid.canonical.z;
      parse.sort(order);
      fetchQ.sort(order);
      // 带宽两个数据源共用，按三档分配：
      //  1. 解析窗口里的必需瓦片（近期播放要用）——有任何一块在排队或在途，就不开始下面两档；
      //  2. 窗口之外的必需瓦片：只下载进 HTTP 缓存；
      //  3. 可选瓦片：soon 秒内的必需瓦片全部到手之后才取。
      // 实测 10Mbps：之前远处的下载和 1MB 级的可选世界瓦片与眼前必需的高程瓦片平分带宽，航线前卡了 20 多秒
      const nearBusy = inflightNear > 0 || parse.some((e) => !e.optional);
      const soon = T + BUF_CFG.soon;
      const needSoon = nearBusy || inflightSoon > 0 || fetchQ.some((e) => !e.optional && e.tFirst <= soon);
      BUF.needSoon = needSoon;
      const start = (e, job, near) => {
        const lim = e.src === 'dem' ? BUF_CFG.concDem : BUF_CFG.concVector;
        if (inflight[e.src] >= lim) return;
        if (e.optional ? needSoon : !near && nearBusy) return;
        const isNear = near && !e.optional, isSoon = !near && !e.optional && e.tFirst <= soon;
        inflight[e.src]++;
        if (isNear) inflightNear++;
        if (isSoon) inflightSoon++;
        job(e).finally(() => { inflight[e.src]--; if (isNear) inflightNear--; if (isSoon) inflightSoon--; });
      };
      for (const e of parse) start(e, (x) => loadEntry(x, gen), true);
      for (const e of fetchQ) start(e, fetchEntry, false);
      if (performance.now() - lastEvict > 500) { evict(T); lastEvict = performance.now(); }
      updateStall(T);
      if (performance.memory) BUF.maxHeap = Math.max(BUF.maxHeap, performance.memory.usedJSHeapSize);
      await new Promise((r) => setTimeout(r, 50));
    }
  }
  /** 播放控制：前方缓冲不足就暂停在当前帧（显示缓冲提示），攒够再继续 */
  function updateStall(T) {
    if (P.render || !MAP.started) return;
    const ahead = BUF.bufferedUntil, end = ahead >= DUR - 0.01;
    if (tl.playing && !BUF.stalled && !end && ahead < Math.min(DUR, T + BUF_CFG.stall)) {
      BUF.stalled = true; BUF.stallCount++; BUF.stallAt = performance.now();
      BUF.selfPause = true; tl.pause(); BUF.selfPause = false;
    }
    if (BUF.stalled && (end || ahead >= Math.min(DUR, T + BUF_CFG.resume))) {
      BUF.stalled = false;
      const ms = performance.now() - BUF.stallAt;
      BUF.stallMs += ms; BUF.stalls.push([+T.toFixed(2), Math.round(ms)]);
      tl.play();
    }
    // 提示：播放中缓冲，或停在一个还没就绪的画面上
    const frameMissing = !tl.playing && ahead <= T + 0.001 && T < DUR - 0.01;
    showBuffering(BUF.stalled || frameMissing, clamp((ahead - T) / BUF_CFG.resume));
  }
  function onUserPause() {
    if (BUF.stalled && !BUF.selfPause) { BUF.stalled = false; const ms = performance.now() - BUF.stallAt; BUF.stallMs += ms; BUF.stalls.push([+tl.time.toFixed(2), Math.round(ms)]); }
  }
  /** 第一次就绪：开头 gate 秒的瓦片全部到位（进度回调 0–1） */
  function untilGate(onStep) {
    return new Promise((res, rej) => {
      const gate = Math.min(DUR, BUF_CFG.gate);
      const iv = setInterval(() => {
        const failed = [...BUF.tiles.values()].find(e => e.tFirst <= gate && !e.optional && e.state === 'error');
        if (failed) { clearInterval(iv); rej(new Error('开头瓦片加载失败 ' + tileUrl(failed))); return; }
        const until = computeBuffered(0);
        onStep && onStep(clamp(until / gate));
        if (until >= gate) { clearInterval(iv); BUF.gateDone = true; res(); }
      }, 50);
    });
  }

  /* =====================================================================
   * 6. DOM：一次性构建（与画幅无关的部分）
   * ===================================================================== */
  const geo = $('#geo');
  const hudgfx = $('#hudgfx');
  const labelsEl = $('#labels');
  const G = {}; // 按画幅重建的几何元素

  // 地图标记：节点（SVG）+ 标签（HTML）
  const markerEls = T.markers.map((m) => {
    const s = S[m.stop];
    const el = document.createElement('div');
    el.className = 'mk-label' + (s.alert ? ' is-alert' : '') + (s.node ? ' is-node' : '');
    el.innerHTML = '<span class="mk-en"></span><em lang="ja"></em>';
    el.querySelector('em').textContent = s.ja;
    labelsEl.appendChild(el);
    return { m, s, el, en: el.querySelector('.mk-en'), em: el.querySelector('em'), full: s.name, pref: s.side || 1 };
  });
  // 路线标签（全景时显示：线路名 · 用时）
  const tagEls = routes.filter((r) => r.tag).map((r) => {
    const el = document.createElement('div');
    el.className = 'rt-tag' + (r.style === 'flight' ? ' is-flight' : '');
    el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${r.style === 'flight' ? '<path d="M2 13.5l8-1.6L14.6 4h2.2l-2.6 8 5.2-1 2-2.6h1.6l-1 4 1 4h-1.6l-2-2.6-5.2-1 2.6 8h-2.2L10 15.1 2 13.5z" fill="currentColor"/>' : '<rect x="5" y="3" width="14" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 11h14M8.5 21l2-4M15.5 21l-2-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="14" r="1.2" fill="currentColor"/><circle cx="15" cy="14" r="1.2" fill="currentColor"/>'}</svg><span></span>`;
    el.querySelector('span').textContent = r.tag;
    labelsEl.appendChild(el);
    return { r, el };
  });

  // 卡片：画面是 scenes.js 生成的 canvas（按画幅重绘）
  const cardEls = T.cards.map((c) => {
    const el = document.createElement('div');
    el.className = 'card' + (c.portrait ? ' is-tall' : '');
    el.innerHTML = '<div class="cd-media"></div><i class="cd-ring"></i><div class="cd-cap"><b></b><span></span></div>';
    $('#cards').appendChild(el);
    $('b', el).textContent = c.caption;
    $('.cd-cap span', el).textContent = `${c.time} ${C.meta.tz}`;
    return { c, el, media: $('.cd-media', el), ring: $('.cd-ring', el), cap: $('.cd-cap', el), stop: S[c.stop] };
  });

  const fb = $('#flashback'), cmp = $('#compare'), intro = $('#intro'), loc = $('#loc'), dayc = $('#daycard');
  const introCJK = splitChars($('.it-cjk', intro), C.meta.titleCJK);
  const introEN = splitChars($('.it-en', intro), C.meta.titleEN);
  const introSub = $('.it-sub', intro);
  introSub.innerHTML = '<span class="it-sub-landscape"></span><span class="it-sub-portrait"><span>SHANGHAI → KANSAI</span><span>KYOTO · NARA · OSAKA</span><span>10.01 – 10.03</span></span>';
  $('.it-sub-landscape', introSub).textContent = C.meta.subline;
  $('.hd-total').textContent = MK.pad(C.meta.totalDays);
  $('.hc-tz').textContent = C.meta.tz;
  $('.bd-label').textContent = C.mascot.label;
  $('.np-title').textContent = C.music.title;
  $('.np-artist').textContent = C.music.artist;
  $('.ou-handle').textContent = C.meta.handle;

  // 指南针刻度（每 30°，正北加长）
  {
    const g = $('.cp-ticks');
    for (let i = 0; i < 12; i++) {
      const a = i * 30 * rad, r0 = i % 3 === 0 ? 19 : 22;
      svg('line', { x1: f2(Math.sin(a) * r0), y1: f2(-Math.cos(a) * r0), x2: f2(Math.sin(a) * 26), y2: f2(-Math.cos(a) * 26), class: i === 0 ? 'cp-tk n' : 'cp-tk' }, g);
    }
  }

  // 便签涂鸦：鸟居 + 河流 + 月亮（手绘感的折线）
  {
    const d = $('.nt-doodle');
    d.innerHTML = `
      <path d="M30 40c20-6 70-8 98-2M38 52h84M52 52v74M106 52v74M44 66h70" fill="none" stroke="#c9452e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M150 120c26-10 40-2 62-8s34-12 58-6 46 2 72-6M156 136c30-6 52 2 78-4s40-8 70-2" fill="none" stroke="#2a2a2a" stroke-width="3" stroke-linecap="round"/>
      <path d="M180 92l10-16 10 16M214 98l8-12 8 12" fill="none" stroke="#2a2a2a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="306" cy="40" r="17" fill="none" stroke="#2a2a2a" stroke-width="3"/><path d="M296 30a17 17 0 0 0 20 22" fill="none" stroke="#2a2a2a" stroke-width="3" stroke-linecap="round"/>`;
  }

  // 收尾统计
  const outro = $('#outro');
  const O_ = T.outro;
  $('.ou-stats', outro).innerHTML = O_.stats.map((s) => `<li><b></b><span>${s.label}</span></li>`).join('');
  const statEls = $$('.ou-stats li', outro);
  const finChars = splitChars($('.ou-fin-text', outro), O_.fin);
  $('.ou-credits', outro).innerHTML = O_.credits.map((c) => `<p>${c}</p>`).join('');

  // 颗粒：一张 256px 噪点贴图（固定种子，放大 2 倍平铺成 512px 周期），按时间换平移位置（可复现）。
  // 颗粒层比舞台大一个周期、是独立的合成层：每步只改 transform，合成器直接平移已栅格化的纹理，从不重绘。
  // 实测（无头软件渲染 1280×720）：之前每步改 background-image / background-position，整层 1920×1080 重新栅格化，
  // 单这一项就让播放掉到每秒 3–6 帧；也不用拉伸 canvas 和 mix-blend-mode（同样每帧几百毫秒）。
  // 亮颗粒是半透明白、暗颗粒是半透明黑，普通叠加即可得到胶片噪点。
  const grainEl = $('#grain');
  {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 256;
    const g = cv.getContext('2d'), img = g.createImageData(256, 256), r = MK.rng(100);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (r() + r() + r() - 1.5) / 1.5; // -1..1，近似正态
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v > 0 ? 255 : 0;
      img.data[i + 3] = Math.min(255, Math.abs(v) * 255);
    }
    g.putImageData(img, 0, 0);
    grainEl.style.backgroundImage = `url(${cv.toDataURL('image/png')})`;
  }
  let grainIdx = -1;

  // 星空（只在夜间地球时可见）
  const spaceCv = $('#space');
  const stars = (() => { const r = MK.rng(2026); return Array.from({ length: 520 }, () => ({ x: r(), y: r(), m: r() ** 3, tw: r() * 6.28, sp: 0.6 + r() * 1.6 })); })();
  let spaceKey = '';
  function drawSpace(t, vis) {
    op(spaceCv, vis);
    const key = vis < 0.01 ? 'off' : `${O}|${Math.floor(t * 12)}|${vis.toFixed(2)}`;
    if (key === spaceKey) return;
    spaceKey = key;
    if (vis < 0.01) return;
    const g = spaceCv.getContext('2d');
    if (spaceCv.width !== W || spaceCv.height !== H) { spaceCv.width = W; spaceCv.height = H; }
    const bg = g.createRadialGradient(W * 0.55, H * 0.5, 0, W * 0.55, H * 0.5, Math.max(W, H) * 0.75);
    bg.addColorStop(0, '#0d1424'); bg.addColorStop(1, '#03050a');
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    const tq = Math.floor(t * 12) / 12;
    for (const s of stars) {
      const a = (0.25 + 0.75 * s.m) * (0.65 + 0.35 * Math.sin(tq * s.sp + s.tw));
      g.fillStyle = `rgba(222,232,255,${a.toFixed(3)})`;
      const r0 = 0.6 + s.m * 1.6;
      g.beginPath(); g.arc(s.x * W, s.y * H, r0, 0, 6.2832); g.fill();
    }
  }

  /* =====================================================================
   * 7. 按画幅构建几何：HUD 图形（规尺、步进器、印章）、地图图形层、卡片画面
   * ===================================================================== */
  const stepX = (i) => L.stepper.xs[i];
  /** 步进器上的连续进度位置（与节点同一组坐标） */
  const stepAtX = (p) => { const i = clamp(Math.floor(p), 0, L.stepper.xs.length - 2); return lerp(stepX(i), stepX(i + 1), clamp(p - i)); };
  const ruleX = (p) => lerp(L.rule.x0, L.rule.x1, clamp(p / (C.stepper.length - 1)));
  const stampXY = (i) => (L.tray === 'stepper' ? { x: stepX(i), y: L.stamps.y } : { x: L.stamps.xs[i], y: L.stamps.ys ? L.stamps.ys[i] : L.stamps.y });

  const ICONS = {
    plane: 'M-11 1.5l8-1.4 4.6-8.1h2.2l-2.6 8 5.2-1 2-2.6h1.6l-1 4 1 4h-1.6l-2-2.6-5.2-1 2.6 8H1.6L-3 2.9z',
    torii: 'M-12-8h24M-10-4h20M-7-8v16M7-8v16',
    deer: 'M-7 6l1-7 4-3h6l3 3-1 7M-2-4l-3-6M2-4l3-6M-5-10l-3-2M5-10l3-2',
    bridge: 'M-12 4c6-9 18-9 24 0M-12 4h24M-6-1v5M0-3v7M6-1v5',
  };
  function layout(orient) {
    O = orient; L = C.layout[O]; W = stage.width; H = stage.height;
    for (const s of [geo, hudgfx]) { s.setAttribute('viewBox', `0 0 ${W} ${H}`); s.setAttribute('width', W); s.setAttribute('height', H); }

    // --- HUD 图形 ---
    hudgfx.innerHTML = '';
    G.ruleGroup = svg('g', { class: 'hud-rule' }, hudgfx);
    const ry = half(L.rule.y);
    G.ruleBase = svg('line', { class: 'rl-base', x1: L.rule.x0, y1: ry, x2: L.rule.x1, y2: ry }, G.ruleGroup);
    G.ruleFill = svg('rect', { class: 'rl-fill', x: L.rule.x0, y: L.rule.y - 2, width: 0, height: 4 }, G.ruleGroup);
    G.ruleTicks = C.stepper.map((_, i) => svg('line', { class: 'rl-tick', x1: ruleX(i), y1: L.rule.y + 6, x2: ruleX(i), y2: L.rule.y + 16 }, G.ruleGroup));
    G.ruleHead = svg('path', { class: 'rl-head', d: 'M0 -7 L7 0 L0 7 L-7 0 Z' }, G.ruleGroup);
    // 步进器：线、填充、节点、标签都由 stepX() 计算
    const sy = L.stepper.y;
    G.stepGroup = svg('g', { class: 'stepper-g' }, hudgfx);
    G.stepLine = svg('line', { class: 'st-line', x1: stepX(0), y1: sy, x2: stepX(C.stepper.length - 1), y2: sy }, G.stepGroup);
    G.stepFill = svg('line', { class: 'st-fill', x1: stepX(0), y1: sy, x2: stepX(0), y2: sy }, G.stepGroup);
    G.stepNodes = C.stepper.map((st, i) => {
      const g = svg('g', { class: 'st-node', transform: `translate(${stepX(i)} ${sy})` }, G.stepGroup);
      const pulse = svg('circle', { class: 'st-pulse', r: 10 }, g);
      const ring = svg('circle', { class: 'st-ring', r: portrait() ? 12 : 10 }, g);
      const core = svg('circle', { class: 'st-core', r: portrait() ? 5.5 : 4.5 }, g);
      const label = svg('text', { class: 'st-label', x: 0, y: portrait() ? 54 : 42, 'text-anchor': 'middle' }, g);
      label.textContent = st.label;
      return { g, ring, core, pulse, label };
    });
    // 印章：横屏与步进器同列（stampXY 与 stepX 同源）；竖屏排在右上
    G.stamps = C.stepper.map((st, i) => {
      const { x, y } = stampXY(i), r = L.stamps.r, stampScale = portrait() ? 0.917 : 0.75;
      const g = svg('g', { class: 'stamp', transform: `translate(${x} ${y + r * (1 - stampScale)}) scale(${stampScale})` }, hudgfx);
      const slot = svg('circle', { class: 'sp-slot', r }, g);
      const ghost = svg('text', { class: 'sp-ghost', y: 12, 'text-anchor': 'middle' }, g);
      ghost.textContent = st.stamp;
      const ink = svg('g', { class: 'sp-ink' }, g);
      svg('circle', { class: 'sp-o', r: r - 2 }, ink);
      svg('circle', { class: 'sp-i', r: r - 9 }, ink);
      svg('path', { class: 'sp-icon', d: ICONS[st.icon], transform: `translate(0 ${-r * 0.42}) scale(${r / 56})` }, ink);
      const k = svg('text', { class: 'sp-kanji', y: r * 0.36, 'text-anchor': 'middle' }, ink);
      k.textContent = st.stamp;
      svg('path', { class: 'sp-bar', d: `M${-r * 0.55} ${r * 0.52}H${r * 0.55}` }, ink);
      return { g, slot, ghost, ink, rot: [-9, 6, -4, 8][i] };
    });

    // --- 地图锚定图形（节点、脉冲、车头、引线、航线飞机、X） ---
    geo.innerHTML = '';
    G.leader = svg('path', { class: 'leader' }, geo);
    G.leaderCap = svg('rect', { class: 'leader-cap', width: 8, height: 8 }, geo);
    G.nodes = markerEls.map((me) => {
      const g = svg('g', { class: 'node' + (me.s.alert ? ' is-alert' : '') + (me.s.node ? ' is-minor' : '') }, geo);
      const p1 = svg('circle', { class: 'nd-pulse', r: 10 }, g), p2 = svg('circle', { class: 'nd-pulse', r: 10 }, g);
      const ring = svg('circle', { class: 'nd-ring', r: me.s.node ? 6 : portrait() ? 12 : 10 }, g);
      const core = svg('circle', { class: 'nd-core', r: me.s.node ? 2.5 : portrait() ? 5 : 4 }, g);
      const x = me.s.alert ? svg('path', { class: 'nd-x', d: 'M-5 -5L5 5M5 -5L-5 5' }, g) : null;
      return { g, p1, p2, ring, core, x };
    });
    G.heads = routes.map((r) => {
      if (r.style === 'walk') return null;
      const g = svg('g', { class: 'head is-' + r.style }, geo);
      if (r.style === 'flight') {
        svg('circle', { class: 'hd-halo', r: 22 }, g);
        svg('path', { class: 'hd-plane', d: 'M-14 1.5l10-2L2-12h3l-3.4 10.6 6.8-1.3 2.6-3.4h2.1l-1.3 5.3 1.3 5.3h-2.1L8.4 1.1l-6.8-1.3L5 10.4H2L-4 0.6l-10-2z', transform: 'scale(1.35)' }, g);
      } else {
        svg('circle', { class: 'hd-halo', r: 16 }, g);
        svg('circle', { class: 'hd-ring', r: 8 }, g);
        svg('circle', { class: 'hd-core', r: 3.5 }, g);
      }
      return g;
    });

    // 卡片画面（按画幅）与全屏媒体
    for (const ce of cardEls) mountScene(ce.media, ce.c.scene, 'photo', ce.c);
    MAP.sceneO = O;
    $('.attrib').textContent = O === 'portrait' ? C.map.attributionShort : C.map.attribution;
    stageEl.appendChild($('.attrib'));
    applyStaticLayout();
    measureMarkerLabels();
  }
  function measureMarkerLabels() {
    const scale = stage.scale || 1;
    for (const me of markerEls) {
      const keep = me.en.textContent;
      const visibility = me.el.style.visibility;
      me.el.style.visibility = 'hidden';
      me.el.style.width = ''; me.el.style.height = '';
      const cs = getComputedStyle(me.el);
      me.padW = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      me.gapW = parseFloat(cs.columnGap) || 0;
      me.emW = me.em.getBoundingClientRect().width / scale;
      me.prefixW = new Map();
      const chars = MK.chars(me.full);
      for (let i = 0; i <= chars.length; i++) {
        const prefix = chars.slice(0, i).join('');
        me.en.textContent = prefix;
        me.prefixW.set(prefix, me.en.getBoundingClientRect().width / scale);
      }
      me.fullW = Math.ceil(me.el.getBoundingClientRect().width / scale);
      me.el.style.height = (me.el.getBoundingClientRect().height / scale) + 'px';
      me.en.textContent = keep; cache(me.en).t = keep;
      me.el.style.visibility = visibility;
      delete cache(me.el)['s:width'];
    }
  }
  // 场景画面：按画幅生成一次后缓存（canvas 直接放进 DOM，不经过图片编码）
  const sceneCache = new Map();
  function sceneCanvas(kind, style, w, h) {
    const key = `${kind}|${style}|${w}x${h}`;
    if (!sceneCache.has(key)) sceneCache.set(key, window.paintScene(kind, style, w, h, 7 + kind.length * 31));
    return sceneCache.get(key);
  }
  function mountScene(box, kind, style) {
    if (!MAP.scenes) return; // 预加载里统一绘制（首次布局时只建几何）
    // 横屏：16:9 画面（展开到全屏时比例不变）；竖屏：9:16 画面（卡片里显示中间 16:9 的一段，展开后看到整幅）
    const [w, h] = portrait() ? [1080, 1920] : [1920, 1080];
    const cv = sceneCanvas(kind, style, w, h);
    if (box.firstChild === cv) return;
    box.innerHTML = '';
    box.appendChild(cv);
  }
  function applyStaticLayout() {
    const fbItem = T.flashback[0], cmpItem = T.compare[0];
    if (fbItem) mountScene($('.fb-media', fb), fbItem.scene, 'illustration');
    if (cmpItem) {
      mountScene($('.cmp-a .cmp-media', cmp), cmpItem.scene, 'postcard');
      mountScene($('.cmp-b .cmp-media', cmp), cmpItem.scene, 'photo');
    }
    // 便签涂鸦与半色调网点（章节 02 装饰）
    const ht = $('.halftone');
    const hw = portrait() ? 520 : 640, hh = portrait() ? 420 : 380;
    ht.width = hw; ht.height = hh;
    const g = ht.getContext('2d');
    g.clearRect(0, 0, hw, hh);
    for (let y = 10; y < hh; y += 22) for (let x = 10 + ((y / 22) % 2) * 11; x < hw; x += 22) {
      const k = clamp(1 - Math.hypot((hw - x) / hw, y / hh) * 0.95);
      if (k <= 0.02) continue;
      g.fillStyle = 'rgba(201,138,42,1)';
      g.beginPath(); g.arc(x, y, 1 + 5.2 * k, 0, 6.2832); g.fill();
    }
  }

  layout(O);
  stage.on('orient', (o) => {
    layout(o);
    MAP.applied = '';
    if (MAP.ok && !P.render && MAP.started && BUF.orient !== o) replan(o);
  });

  // 运行中切换画幅：新画幅的镜头取景不同，瓦片清单要重新扫描（扫描会清空数据源，所以先停在当前帧）
  async function replan(o) {
    const was = tl.playing || BUF.stalled;
    BUF.selfPause = true; tl.pause(); BUF.selfPause = false;
    BUF.stalled = false;
    showBuffering(true, 0);
    await nextRender(MAP.map);
    planBuffer(o);
    BUF.gateDone = true; // 中途切换：从当前时刻往后缓冲
    applyCamera(cameraAt(tl.time));
    pump(BUF.gen);
    if (was) { BUF.stalled = true; BUF.stallCount++; BUF.stallAt = performance.now(); }
  }
  const loadingEl = (() => {
    const el = document.createElement('div');
    el.className = 'loading';
    el.innerHTML = '<div class="ld-box"><p class="ld-k">MAP PRELOAD</p><p class="ld-t"></p><i class="ld-bar"><i></i></i><p class="ld-p">0%</p></div>';
    stageEl.appendChild(el);
    return el;
  })();
  function showLoading(p, label) {
    loadingEl.classList.add('on');
    txt($('.ld-t', loadingEl), label);
    sty($('.ld-bar i', loadingEl), 'transform', `scaleX(${clamp(p).toFixed(3)})`);
    txt($('.ld-p', loadingEl), `${Math.round(clamp(p) * 100)}%`);
  }
  function hideLoading() { loadingEl.classList.remove('on'); }
  const bufEl = (() => {
    const el = document.createElement('div');
    el.className = 'buffering';
    el.setAttribute('role', 'status');
    el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="3"/><path class="bf-arc" d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg><span class="bf-text">BUFFERING MAP</span><b class="bf-pct">0%</b>';
    stageEl.appendChild(el);
    return el;
  })();
  let bufShown = false;
  function showBuffering(on, p) {
    if (on !== bufShown) { bufShown = on; bufEl.classList.toggle('on', on); stageEl.dataset.buffering = on ? '1' : '0'; }
    if (on) txt(bufEl.querySelector('.bf-pct'), `${Math.round(clamp(p) * 100)}%`);
  }

  /* =====================================================================
   * 8. 通用动效
   * ===================================================================== */
  function blurIn(spans, t, start, step, dur = 0.5, from = 14, dy = -12) {
    spans.forEach((s, i) => {
      const p = seg(t, start + i * step, dur, ease.outCubic);
      sty(s, 'opacity', f2(p));
      sty(s, 'filter', p < 1 ? `blur(${f1((1 - p) * from)}px)` : 'none');
      sty(s, 'transform', `translateY(${f1((1 - p) * dy)}px)`);
    });
  }
  // 打字：前沿 2 个字符带模糊
  function typeIn(spans, t, start, dur) {
    const n = spans.length, head = clamp((t - start) / dur) * (n + 2);
    spans.forEach((s, i) => {
      const k = clamp(head - i);
      sty(s, 'opacity', f2(k));
      sty(s, 'filter', k > 0 && k < 1 ? `blur(${f1((1 - k) * 7)}px)` : 'none');
    });
  }
  const typeSteps = (text, start, dur) => { const n = MK.chars(text).length; return MK.chars(text).map((ch, k) => ({ ch, t: start + (dur * (k + 0.5)) / n })).filter((x) => x.ch.trim()); };

  /* =====================================================================
   * 9. 渲染
   * ===================================================================== */
  const TOP = $('.hud-top'), BOTTOM = $('.hud-bottom');
  const el = {
    veil: $('#veil'), wash: $('#wash'), scrim: $('#scrim'), decor: $('#decor'), frameSvg: $('.frame-svg'), frLine: $('.fr-line'), frC: $$('.fr-c'),
    halftone: $('.halftone'), tape: $('.tape'), chapter: $('#chapter'), ctChip: $('.ct-chip'), ctTitle: $('.ct-title'),
    badge: $('#badge'), bdN: $('.bd-n i'), alert: $('#alert'), toast: $('#toast'), note: $('#note'),
    hdN: $('.hd-n i'), hdDate: $('.hd-date'), coord: $('.hg-coord'), elev: $('.hg-elev'), clock: $('.hc-time'), needle: $('.cp-needle'),
    np: $('.np'), lyric: $('.np-lyric-text'), sub: $('.np-sub'), eq: $$('.np-eq rect'), scale: $('.scale'), scBar: $('.sc-bar'), scText: $('.sc-text'),
    attrib: $('.attrib'), map: $('#map'), hudDay: $('.hud-day'), fallback: $('#fallback'),
  };
  let locKey = '', locCJK = [], locEN = [];
  const lyricSpans = new Map();

  const plateRoot = $('#plates');
  const plates = new Map();
  if (PC) stageEl.dataset.pattern = PC.id;
  let patternBar = null;
  let attributionOrient = null;
  let tl;

  function segmentAt(t) {
    let selected = PC.segments[0];
    for (const segment of PC.segments) if (t >= segment.start) selected = segment;
    return selected;
  }
  function caseTime(t) {
    const s = segmentAt(t), p = clamp((t-s.start)/s.duration);
    return +lerp(s.from,s.to,s.mode === 'drag' ? ease.inOutCubic(p) : p).toFixed(6);
  }
  function platePath(segment, orient = O) {
    return segment.plate == null ? null : `${PC.plateBase}/${orient}-${segment.plate}-${segment.layers.replaceAll(',','-')}.webp`;
  }
  function maskPattern() {
    stageEl.appendChild(el.attrib);
    attributionOrient = null;
    const hud = PC.showHud;
    const allowed = new Set(['plates','grain']);
    if (isLive) allowed.add('map');
    if (PC.id === 'day-night-flip') allowed.add('wash');
    if (hud) ['hudgfx'].forEach(id=>allowed.add(id));
    if (PC.id === 'collect-counter') ['badge','hudgfx'].forEach(id=>allowed.add(id));
    if (PC.id === 'seekable-timeline') ['cards','geo','badge'].forEach(id=>allowed.add(id));
    if (PC.id === 'vertical-title-blur') ['intro','loc','flashback','outro'].forEach(id=>allowed.add(id));
    if (PC.id === 'card-expand-fullscreen') ['cards','geo','labels'].forEach(id=>allowed.add(id));
    if (PC.showBadge) allowed.add('badge');
    if (PC.id === 'chapter-frame') ['chapter','decor'].forEach(id=>allowed.add(id));
    if (PC.id === 'split-compare-stamp') allowed.add('compare');
    if (PC.id === 'alert-reroute') ['geo','labels','alert'].forEach(id=>allowed.add(id));
    if (PC.id === 'route-draw-marker') ['geo','labels'].forEach(id=>allowed.add(id));
    if (PC.id === 'outro-stat-stack') allowed.add('outro');
    for(const child of stageEl.children) {
      const keep = child === el.attrib || allowed.has(child.id) || child.classList.contains('vignette') ||
        (hud && (child.classList.contains('hud') || child.classList.contains('hud-fade') || child.classList.contains('attrib'))) ||
        (['outro-stat-stack','vertical-title-blur'].includes(PC.id) && child.classList.contains('outro-bg')) || child === patternBar;
      child.classList.toggle('pattern-off', !keep);
    }
    tagEls.forEach(tag=>tag.el.classList.add('pattern-off'));
    G.stamps.forEach(st=>st.g.classList.toggle('pattern-off',!PC.showStamps));
    if(PC.id==='seekable-timeline') {
      $('.hud-bottom').classList.add('pattern-off');
      $('.hud-fade.bottom').classList.add('pattern-off');
      G.stepGroup.classList.add('pattern-off');
    }
    if (PC.id === 'collect-counter') {
      [...hudgfx.children].forEach(e=>e.classList.toggle('pattern-off',!e.classList.contains('stamp') && e!==G.stepGroup));
    }
    if (['card-expand-fullscreen','seekable-timeline'].includes(PC.id)) {
      const stop = PC.id==='card-expand-fullscreen' ? 'inari' : 'kix';
      cardEls.forEach(ce=>ce.el.classList.toggle('pattern-off',ce.c.stop!==stop));
      markerEls.forEach((me,i)=>{me.el.classList.toggle('pattern-off',me.m.stop!==stop || PC.id==='seekable-timeline');G.nodes[i].g.classList.toggle('pattern-off',me.m.stop!==stop || PC.id==='seekable-timeline');});
      G.heads.filter(Boolean).forEach(g=>g.classList.add('pattern-off'));
    }
  }
  function renderPlates(t) {
    const s=segmentAt(t), i=PC.segments.indexOf(s), prev=PC.segments[Math.max(0,i-1)];
    currentPlateT=s.plate;
    const alpha=i===0 ? 1 : clamp((t-s.start)/.4);
    for(const [key,img] of plates) {
      const now=key===platePath(s), before=i>0 && key===platePath(prev);
      img.style.opacity=now?(i>0 && prev.plate==null?String(alpha):'1'):before?String(1-alpha):'0';
      img.style.zIndex=now?'1':'2';
      if(now && before) {img.style.opacity='1';img.style.zIndex='1';}
      if(film)img.style.transform=`scale(${1+.04*clamp((t-s.start)/2.5)})`;
    }
    film?.render(t,s,alpha);
  }
  function drawPatternMarkers(t,cam,ui,activeCard) {
    const route=PC.id==='route-draw-marker';
    const alert=PC.id==='alert-reroute' && por();
    const avoid=L.avoid;
    const saidaijiMin=S.saidaiji.minZoom,takanoharaMin=S.takanohara.minZoom;
    if(route)L.avoid=[];
    if(alert)S.saidaiji.minZoom=S.takanohara.minZoom=0;
    try {
      return drawMarkers(t,cam,ui,activeCard);
    } finally {
      if(route)L.avoid=avoid;
      if(alert) {
        S.saidaiji.minZoom=saidaijiMin;
        S.takanohara.minZoom=takanoharaMin;
      }
    }
  }
  function drawPatternAttribution(t) {
    const index=PC.segments.indexOf(segmentAt(t));
    const hidden=PC.id==='film-grain' ? index>0 : PC.id==='vertical-title-blur' && index===2;
    el.attrib.classList.toggle('pattern-attrib-hidden',hidden);
    if(PC.id==='seekable-timeline' && patternBar && attributionOrient!==O) {
      const scale=stage.scale||1,gap=por()?18:12;
      const bar=patternBar.getBoundingClientRect();
      const lineHeight=el.attrib.getBoundingClientRect().height/scale;
      const barTop=(bar.top-stageEl.getBoundingClientRect().top)/scale;
      sty(el.attrib,'top',`${barTop-gap-lineHeight}px`);
      attributionOrient=O;
    }
  }
  function drawPattern(t,{cam=cameraAt(t),night=valueAt(T.night,t),hudT=t,grainT=t,geo:drawGeo=true}={}) {
    O=stage.orient;
    /* --- 覆盖程度：全屏卡片 / 回忆 / 对比时，HUD 转白字 --- */
    let over = 0, expandF = 0;
    for (const ce of cardEls) if (ce.c.expand) {
      const ex = ce.c.expand;
      const f = seg(t, ex.t, 0.6, ease.inOutCubic) * (1 - seg(t, ex.t + 0.6 + ex.hold, 0.55, ease.inOutCubic));
      expandF = Math.max(expandF, f);
    }
    const fbItem = T.flashback.find((f) => t >= f.t - 0.3 && t <= f.until + 0.4);
    const fbVis = !PC.ignoreOverlays && fbItem ? env(t, fbItem.t, fbItem.until, 0.28, 0.32) : 0;
    const cmpItem = T.compare.find((c) => t >= c.t - 0.5 && t <= c.until + 0.6);
    const cmpVis = !PC.ignoreOverlays && cmpItem ? env(t, cmpItem.t, cmpItem.until, 0.3, 0.5) : 0;
    over = PC.ignoreOverlays ? 0 : Math.max(expandF, fbVis, cmpVis);

    /* --- 章节与强调色 --- */
    const ch = T.chapter.find((c) => t >= c.t - 0.1 && t <= c.until + 0.7);
    const chDef = ch && C.chapters[ch.key];
    const chK = ch ? env(t, ch.t, ch.until, 0.5, 0.6) : 0;
    const accent = chDef ? mix(PAL.accent, hex(chDef.accent), env(t, ch.t, ch.until, 0.35, 0.6)) : PAL.accent;

    /* --- 全局配色变量 --- */
    const paper = mix(PAL.paper, PAL.nightPaper, night);
    const inkBase = mix(PAL.ink, PAL.nightInk, night);
    const ink = mix(inkBase, WHITE, over);
    const surfaceBase = mix([250, 249, 245], [22, 28, 40], night);
    sty(stageEl, '--paper', css(paper));
    sty(stageEl, '--ink', css(ink));
    sty(stageEl, '--ink-map', css(inkBase));
    sty(stageEl, '--muted', css(ink, 0.62));
    sty(stageEl, '--line', css(ink, 0.26));
    sty(stageEl, '--surface', css(mix(surfaceBase, [12, 14, 20], over), 0.94));
    sty(stageEl, '--accent', css(accent));
    sty(stageEl, '--accent-soft', css(accent, 0.22));
    sty(stageEl, '--night', String(+night.toFixed(3)));
    sty(TOP, '--shadow', over > 0.01 ? `0 1px 10px rgba(0,0,0,${f2(0.45 * over)})` : 'none');


    const id=PC.id;
    if(id==='vertical-title-blur') {
      drawIntro(t);drawLocTitle(t,over);drawFlashback(t,fbItem,fbVis);drawOutro(t);
    }
    if(id==='chapter-frame')drawChapter(t,ch,chDef,chK,fbVis,cmpVis);
    if(id==='split-compare-stamp')drawCompare(t,cmpItem,cmpVis);
    if(PC.showHud || id==='collect-counter')drawHud(hudT,cam,night,over,fbVis,cmpVis);
    if(['card-expand-fullscreen','seekable-timeline'].includes(id)) {
      const active=drawCards(t,cam,accent,chDef,expandF);
      drawMarkers(t,cam,1-over,active);drawLeader();
    }
    if(id==='outro-stat-stack')drawOutro(t);
    if(id==='alert-reroute')drawAlert(t);
    if(drawGeo && ['route-draw-marker','alert-reroute'].includes(id)) {
      drawRoutesSVG(t,cam,1-over,accent);drawPatternMarkers(t,cam,1-over,null);
    }
    drawGrain(grainT,fbVis,night,cmpVis);
    return {cam,night,accent,over,fbVis,cmpVis};
  }
  function drawGrain(t,fbVis,night,cmpVis) {
    /* --- 质感：颗粒、暗角、色调 --- */
    const fi = Math.floor(t * 12);
    if (fi !== grainIdx) {
      grainIdx = fi;
      const gr = MK.rng(9 + fi);
      sty(grainEl, 'transform', `translate(${Math.floor(gr() * 512)}px, ${Math.floor(gr() * 512)}px)`);
    }
    op(grainEl, 0.1 + 0.14 * fbVis + 0.04 * night + 0.05 * cmpVis);
    const noteK = T.note.reduce((m, n) => Math.max(m, env(t, n.t, n.until, 0.5, 0.4)), 0);
    op(el.wash, noteK * 0.55);


  }
  function renderPattern(t) {
    if(isLive)return renderLive(t);
    renderPlates(t);
    const caseT=PC.frameTimes ? PC.frameTimes[PC.segments.indexOf(segmentAt(t))] : caseTime(t);
    const result=drawPattern(caseT,{grainT:PC.frameTimes?t:caseT});
    drawPatternAttribution(t);
    if(patternBar) {
      patternBar.querySelector('input').value=String(caseT);
      patternBar.querySelector('output').textContent=`${MK.pad(caseT/60)}:${MK.pad(caseT%60)}`;
      patternBar.toggleAttribute('data-playing',tl?.playing || false);
      patternBar.querySelector('[data-act="toggle"]').setAttribute('aria-label',tl?.playing?'暂停':'播放');
    }
    return result && null;
  }
  const film = PC?.createFilm?.({MK, C, stage, plateRoot, sceneCanvas});
  async function preloadPlates() {
    MK.load.register(PC.segments.flatMap(s => ['landscape','portrait'].map(orient => platePath(s, orient))).filter(Boolean));
    for(const s of PC.segments)for(const orient of ['landscape','portrait']) {
      const src=platePath(s,orient);if(!src || plates.has(src))continue;
      const img=await MK.load.image(src);img.className='plate';img.dataset.orient=orient;plates.set(src,img);plateRoot.appendChild(img);
    }
    for(const [key,img] of plates)img.style.display=img.dataset.orient===O?'block':'none';
  }
  function startPattern() {
    maskPattern();
    patternBar=PC.createControls?.({MK, C, stage, stageEl, A, timeline:()=>tl}) || null;
    tl=MK.timeline({duration:PC.duration,render:renderPattern,markers:PC.markers});
    const scoreTask=MK.load.fetch(PC.scoreUrl).then(r=>r.json()).then(score=>A.attach(tl,score));
    MK.preload([
      {label:'document.fonts.ready',run:()=>MK.preload.fonts()()},
      {label:'案例场景与固定底图',run:async()=>{
        MAP.scenes=true;layout(O);maskPattern();
        film?.build();
        if(isLive)await initPatternMap();else await preloadPlates();
        measureMarkerLabels();
      }},
      {label:'案例声音事件',run:()=>scoreTask},
    ]);
    MK.expose(tl,{title:PC.id,fps:30,bpm:C.meta.bpm});
    if(PC.id!=='seekable-timeline')MK.controls(tl,{accent:C.palette.accent});
    stage.on('orient',()=>{
      maskPattern();
      film?.build();
      for(const img of plates.values())img.style.display=img.dataset.orient===O?'block':'none';
      tl.seek(tl.time);
    });
    MK.start(tl,{t:0,reduced:0});
  }


  function render(t) {
    O = stage.orient;
    const por = portrait();

    /* --- 镜头 --- */
    const cam = cameraAt(t);
    applyCamera(cam);
    if (!MAP.ok) {
      const cell = 96 * 2 ** (cam.zoom % 1), ws = 512 * 2 ** cam.zoom, mc = merc(cam.center);
      sty(el.fallback, 'background-size', `${f1(cell)}px ${f1(cell)}px`);
      sty(el.fallback, 'background-position', `${f1((((-mc[0] * ws + cam.focus[0]) % cell) + cell) % cell)}px ${f1((((-mc[1] * ws + cam.focus[1]) % cell) + cell) % cell)}px`);
    }
    const night = valueAt(T.night, t);

    /* --- 覆盖程度：全屏卡片 / 回忆 / 对比时，HUD 转白字 --- */
    let over = 0, expandF = 0;
    for (const ce of cardEls) if (ce.c.expand) {
      const ex = ce.c.expand;
      const f = seg(t, ex.t, 0.6, ease.inOutCubic) * (1 - seg(t, ex.t + 0.6 + ex.hold, 0.55, ease.inOutCubic));
      expandF = Math.max(expandF, f);
    }
    const fbItem = T.flashback.find((f) => t >= f.t - 0.3 && t <= f.until + 0.4);
    const fbVis = fbItem ? env(t, fbItem.t, fbItem.until, 0.28, 0.32) : 0;
    const cmpItem = T.compare.find((c) => t >= c.t - 0.5 && t <= c.until + 0.6);
    const cmpVis = cmpItem ? env(t, cmpItem.t, cmpItem.until, 0.3, 0.5) : 0;
    over = Math.max(expandF, fbVis, cmpVis);

    /* --- 章节与强调色 --- */
    const ch = T.chapter.find((c) => t >= c.t - 0.1 && t <= c.until + 0.7);
    const chDef = ch && C.chapters[ch.key];
    const chK = ch ? env(t, ch.t, ch.until, 0.5, 0.6) : 0;
    const accent = chDef ? mix(PAL.accent, hex(chDef.accent), env(t, ch.t, ch.until, 0.35, 0.6)) : PAL.accent;

    /* --- 全局配色变量 --- */
    const paper = mix(PAL.paper, PAL.nightPaper, night);
    const inkBase = mix(PAL.ink, PAL.nightInk, night);
    const ink = mix(inkBase, WHITE, over);
    const surfaceBase = mix([250, 249, 245], [22, 28, 40], night);
    sty(stageEl, '--paper', css(paper));
    sty(stageEl, '--ink', css(ink));
    sty(stageEl, '--ink-map', css(inkBase));
    sty(stageEl, '--muted', css(ink, 0.62));
    sty(stageEl, '--line', css(ink, 0.26));
    sty(stageEl, '--surface', css(mix(surfaceBase, [12, 14, 20], over), 0.94));
    sty(stageEl, '--accent', css(accent));
    sty(stageEl, '--accent-soft', css(accent, 0.22));
    sty(stageEl, '--night', String(+night.toFixed(3)));
    sty(TOP, '--shadow', over > 0.01 ? `0 1px 10px rgba(0,0,0,${f2(0.45 * over)})` : 'none');

    /* --- 地图配色、路线 --- */
    const spaceVis = night * (1 - seg(cam.zoom, 3.2, 1.6, ease.linear));
    drawSpace(t, spaceVis);
    if (MAP.ok) {
      const map = MAP.map;
      const n2 = Math.round(night * 200) / 200;
      for (const l of mapLayers) setPaint(l.id, l.prop, css(dayNight(MP[l.key][0], MP[l.key][1], n2)));
      setPaint('hillshade', 'hillshade-shadow-color', css(dayNight(MP.shade[0], MP.shade[1], n2), lerp(0.55, 0.75, n2)));
      setPaint('hillshade', 'hillshade-highlight-color', css(dayNight(MP.light[0], MP.light[1], n2), lerp(0.55, 0.12, n2)));
      setPaint('hillshade', 'hillshade-accent-color', css(dayNight(MP.shade[0], MP.shade[1], n2), 0.25));
      // 星空在地球外可见：地球背景透明，白天用纸色
      sty(el.map, 'background', spaceVis > 0.01 ? 'transparent' : css(paper));
      updateRoutesGL(t, n2, accent, over);
    }

    if (layerMode) {
      if (layerMode === 'map,routes,markers') drawMarkers(t, cam, 1, null, true);
      if (MAP.ok) {
        if (P.render) return renderWait();
        liveDegrade(t);
      }
      return null;
    }

    /* --- 事件文字先画：它们的矩形是地图标签的避让区 --- */
    drawChapter(t, ch, chDef, chK, fbVis, cmpVis);
    drawIntro(t);
    drawLocTitle(t, over);
    drawDayCard(t, over);
    drawNote(t);

    /* --- 地图锚定图形 --- */
    const ui = 1 - over;
    drawRoutesSVG(t, cam, ui, accent);
    const activeCard = drawCards(t, cam, accent, chDef, expandF);
    drawMarkers(t, cam, ui, activeCard);
    drawLeader();
    drawRouteTags(t, cam, ui, activeCard);

    /* --- 回忆、对比、压暗 --- */
    drawFlashback(t, fbItem, fbVis);
    drawCompare(t, cmpItem, cmpVis);
    op(el.scrim, Math.max(expandF, cmpVis * 0.9, fbVis * 0.4));

    /* --- HUD --- */
    drawHud(t, cam, night, over, fbVis, cmpVis);

    /* --- 事件：警示 --- */
    drawAlert(t);

    /* --- 收尾 --- */
    drawOutro(t);

    drawGrain(t, fbVis, night, cmpVis);

    /* --- 地图降级与渲染等待 --- */
    if (MAP.ok) {
      if (P.render) return renderWait();
      liveDegrade(t);
    }
    return null;
  }

  /* ---------- 路线（GL） ---------- */
  const visCache = new Map();
  function setVis(r, on) {
    if (visCache.get(r.id) === on) return;
    visCache.set(r.id, on);
    const sid = 'rt-' + r.id, ids = r.style === 'rail' || r.style === 'wrong' ? [sid + '-glow', sid + '-casing', sid] : [sid + '-casing', sid];
    for (const id of ids) { try { MAP.map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none'); } catch (e) { /* 图层不存在时忽略 */ } }
  }
  function updateRoutesGL(t, n, accent, over) {
    const map = MAP.map;
    const inkC = css(dayNight(PAL.ink, PAL.nightInk, n));
    const paperC = css(dayNight(PAL.paper, [20, 26, 38], n));
    for (const r of routes) {
      const sid = 'rt-' + r.id;
      const p = routeP(r, t);
      // 出场前 0.6 秒以前，整条路线的图层设为不可见：不可见图层的数据源不参与瓦片计算。实测（软件渲染、地球视角）
      // 8 条还没出场的路线即使全透明 / 数据为空，每帧仍要为它们计算覆盖瓦片并切 GeoJSON 瓦片，帧率约 9 → 隐藏后约 16。
      // 提前 0.6 秒设为可见（此时仍全透明），让数据源先切好瓦片，出场第一帧不缺线
      const show = layerMode ? layerMode === 'map,routes,markers' && t >= r.t1 : t >= r.t0 - 0.6;
      setVis(r, show);
      if (layerMode && !show) continue;
      if (r.style === 'rail' || r.style === 'wrong') {
        const col = r.style === 'wrong' ? css(PAL.alert) : css(PAL.accent);
        const fade = r.style === 'wrong' ? 1 - 0.6 * seg(t, r.t1 + 1.6, 0.8) : 1;
        // 描出中发光更强，完成后回落
        const glowK = (t >= r.t0 && t <= r.t1 + 0.6 ? 0.85 : 0.35 + 0.25 * n) * fade;
        const on = p > 0 ? 1 : 0;
        setPaint(sid, 'line-gradient', STEP(p, col));
        setPaint(sid + '-casing', 'line-gradient', STEP(p, paperC));
        setPaint(sid + '-glow', 'line-gradient', STEP(p, col));
        setPaint(sid + '-glow', 'line-opacity', f2(glowK * 0.55 * on));
        setPaint(sid, 'line-opacity', f2(fade * on));
        setPaint(sid + '-casing', 'line-opacity', f2(0.9 * fade * on));
      } else {
        const pts = t >= r.t0 ? partial(r, p) : [];
        const key = pts.length + ':' + (pts.length ? pts[pts.length - 1].join(',') : '');
        if (key !== r.partialKey) { r.partialKey = key; map.getSource(sid).setData(pts.length > 1 ? lineFeature(pts) : EMPTY); }
        const on = pts.length > 1 ? 1 : 0;
        setPaint(sid, 'line-color', r.style === 'flight' ? inkC : inkC);
        setPaint(sid + '-casing', 'line-color', paperC);
        setPaint(sid + '-casing', 'line-opacity', f2(0.55 * on));
        // 航线在城市尺度下淡出（它从 1300 km 外过来，近景只留到达的一小段）
        setPaint(sid, 'line-opacity', f2(on * (r.style === 'flight' ? 0.85 * (1 - 0.7 * seg(t, 14.2, 1.0)) * (1 - seg(t, 54.8, 0.8)) : 0.9)));
      }
    }
  }

  /* ---------- 路线的车头、航线飞机（SVG，与 GL 线用同一个投影） ---------- */
  function drawRoutesSVG(t, cam, ui, accent) {
    routes.forEach((r, i) => {
      const g = G.heads[i];
      if (!g) return;
      const p = routeP(r, t);
      const drawing = t >= r.t0 - 0.05 && t <= r.t1 + 0.45;
      let vis = drawing ? ui * (1 - seg(t, r.t1 + 0.1, 0.35)) : 0;
      if (vis <= 0.001) { op(g, 0); return; }
      const h = pointAt(r, p);
      if (!visible(h.ll, cam)) { op(g, 0); return; }
      const q = project(h.ll);
      let rot = 0;
      if (r.style === 'flight') {
        const ahead = pointAt(r, Math.min(1, p + 0.01)), back = pointAt(r, Math.max(0, p - 0.01));
        const qa = project(ahead.ll), qb = project(back.ll);
        rot = Math.atan2(qa.y - qb.y, qa.x - qb.x) / rad;
        vis *= seg(t, r.t0 - 0.05, 0.25);
      }
      op(g, vis);
      const pulse = 1 + 0.18 * Math.sin(t * 9);
      attr(g, 'transform', `translate(${f2(q.x)} ${f2(q.y)}) rotate(${f1(rot)})`);
      const halo = g.querySelector('.hd-halo');
      if (halo) attr(halo, 'r', String(f1((r.style === 'flight' ? 22 : 16) * pulse)));
    });
  }

  /* ---------- 地图标记 ---------- */
  function drawMarkers(t, cam, ui, activeCard, dotsOnly = false) {
    const z = cam.zoom;
    const cardRect = activeCard && activeCard.rect;
    const placed = (G.placed = []);
    let zones = null, textRects = null;
    markerEls.forEach((me, i) => {
      me.box = null;
      const nd = G.nodes[i];
      const k = seg(t, me.m.t, 0.45, ease.outBack);
      const s = me.s;
      const ll = s.lngLat;
      const titleK = dotsOnly ? 1 : 1 - env(t, 3.9, 7.3, 0.3, 0.5); // 片名出现时，地图标记让位
      let vis0 = t >= me.m.t ? ui * titleK : 0;
      if (vis0 <= 0.001 || !visible(ll, cam)) { op(nd.g, 0); op(me.el, 0); return; }
      // 有可见节点时才读取避让几何，避免空镜头也同步刷新整页布局。
      if (!dotsOnly && !zones) {
        zones = avoidZones(t); textRects = [];
        const sr = stageEl.getBoundingClientRect(), sk = stage.scale || 1;
        for (const b of [intro, loc, dayc, el.chapter]) {
          const m = cache(b), o = m['s:visibility'] === 'hidden' ? 0 : parseFloat(m['s:opacity'] ?? '0');
          if (!(o > 0.02)) continue;
          b.querySelectorAll('*').forEach((e) => {
            if (e.children.length || !e.textContent.trim()) return;
            const r = e.getBoundingClientRect();
            if (r.width >= 1) textRects.push({ x: (r.left - sr.left) / sk, y: (r.top - sr.top) / sk, w: r.width / sk, h: r.height / sk, o });
          });
        }
      }
      const q = project(ll);
      for (const r of textRects || []) if (q.x > r.x - 16 && q.x < r.x + r.w + 16 && q.y > r.y - 16 && q.y < r.y + r.h + 16) { vis0 *= 1 - r.o; break; }
      if (vis0 <= 0.001) { op(nd.g, 0); op(me.el, 0); return; }
      const x = f2(q.x), y = f2(q.y);
      // 节点：从 0.6 弹到 1；脉冲两圈错开半个周期
      op(nd.g, clamp(k) * vis0);
      attr(nd.g, 'transform', `translate(${x} ${y}) scale(${f2(0.6 + 0.4 * clamp(k, 0, 1.25))})`);
      if (!s.node) {
        [nd.p1, nd.p2].forEach((c, j) => {
          const f = ((((t - me.m.t) / 1.8 + j * 0.5) % 1) + 1) % 1;
          attr(c, 'r', String(f1(10 + f * 30)));
          sty(c, 'opacity', String(f2((1 - f) * 0.55)));
        });
      }
      if (nd.x) sty(nd.x, 'opacity', String(f2(seg(t, me.m.t + 0.1, 0.25, ease.outBack))));
      if (dotsOnly) { op(me.el, 0); return; }
      // 标签：缩放过小（全景）时只留主站；片名出现时让位
      const minZ = s.minZoom ?? 0;
      const lvis = vis0 * seg(z, minZ - 0.25, 0.25, ease.linear) * seg(t, me.m.t + 0.1, 0.25);
      if (lvis <= 0.001) { op(me.el, 0); return; }
      const prefix = MK.typeText(me.full, seg(t, me.m.t + 0.12, 0.5, ease.linear));
      const jaOpacity = f2(seg(t, me.m.t + 0.55, 0.3));
      txt(me.en, prefix);
      sty(me.em, 'opacity', String(jaOpacity));
      const labelW = prefix === me.full && jaOpacity > 0 ? me.fullW : me.padW + me.prefixW.get(prefix) + (jaOpacity > 0 ? me.gapW + me.emW : 0);
      sty(me.el, 'width', labelW + 'px');
      // 放置：先右后左，碰到卡片、已放好的标签或出画就换边 / 下移（锚点 = 节点外缘 + 间隙，用完整文字的宽度决定，打字时不跳）
      const gap = (s.node ? 6 : por() ? 12 : 10) + 10;
      const wLab = me.fullW || me.el.offsetWidth || 200, hLab = me.el.offsetHeight || 40;
      // side 1 右 / -1 左 / 0 居中（配合 dy 放在节点正上方或正下方）
      const tryBox = (side, dy) => { const x0 = side > 0 ? q.x + gap : side < 0 ? q.x - gap - wLab : q.x - wLab / 2; return { x0, x1: x0 + wLab, y0: q.y - hLab / 2 + dy, y1: q.y + hLab / 2 + dy, side }; };
      const bad = (bx) => bx.x0 < 16 || bx.x1 > W - 16 || hitRect(bx, cardRect) || placed.some((p) => hitRect(bx, p, 6)) || zones.some((zr) => hitRect(bx, zr, 4));
      let box = null;
      // 偏好：side（1 右 / -1 左）；竖屏可单独给 sideP，0 表示先放节点正下方（例如关西机场：左边是航线来向、右边是印章栏）
      const pf0 = por() && s.sideP !== undefined ? s.sideP : me.pref, pf = pf0 || 1, vy = hLab / 2 + gap + 4;
      const order = [[pf, 0], [-pf, 0], [0, vy + hLab / 2], [0, -vy - hLab / 2], [pf, hLab + 6], [-pf, hLab + 6], [pf, -hLab - 6], [-pf, -hLab - 6]];
      if (pf0 === 0) order.unshift(order.splice(2, 1)[0]);
      for (const [side, dy] of order) { const bx = tryBox(side, dy); if (!bad(bx)) { box = bx; break; } }
      if (!box) { me.box = null; op(me.el, 0); return; }
      placed.push({ x: box.x0, y: box.y0, w: wLab, h: hLab });
      me.box = box;
      op(me.el, lvis);
      sty(me.el, 'transform', `translate(${Math.round(box.x0)}px, ${Math.round(box.y0)}px)`);
      me.el.classList.toggle('is-left', box.side < 0);
    });
  }
  /** HUD 保留区（文字区域）：地图标签不进入这些矩形；收尾时加上左侧统计区 */
  // 事件文字（地点标题、日序卡、章节标签、通知、便签、片名）出现时，它们的矩形也是保留区
  const EVENT_BLOCKS = () => [loc, dayc, el.chapter, el.toast, el.note, intro];
  window.__labelDebug = () => ({ zones: avoidZones(tl.time).map((r) => [r.x, r.y, r.w, r.h].map(Math.round)), placed: (G.placed || []).map((r) => [r.x, r.y, r.w, r.h].map(Math.round)) }); // 验证脚本：标签避让区
  function avoidZones(t) {
    const z = (L.avoid || []).map(([x, y, w, h]) => ({ x, y, w, h }));
    for (const b of EVENT_BLOCKS()) {
      const m = cache(b);
      if (m['s:visibility'] === 'hidden' || !(parseFloat(m['s:opacity'] ?? '0') > 0.02)) continue;
      z.push({ x: b.offsetLeft - 8, y: b.offsetTop - 8, w: b.offsetWidth + 16, h: b.offsetHeight + 16 });
    }
    if (t > O_.t - 1.2) z.push(L.outroZone ? { x: L.outroZone[0], y: L.outroZone[1], w: L.outroZone[2], h: L.outroZone[3] } : { x: 0, y: 0, w: 0, h: 0 });
    return z;
  }
  const hitRect = (b, r, pad = 0) => r && b.x1 + pad > r.x && b.x0 - pad < r.x + r.w && b.y1 + pad > r.y && b.y0 - pad < r.y + r.h;
  const por = portrait;

  /* ---------- 路线标签（全景时） ---------- */
  function drawRouteTags(t, cam, ui, activeCard) {
    const placed = G.placed || [];
    const zones = avoidZones(t);
    for (const { r, el: tg } of tagEls) {
      const show = cam.zoom < (r.style === 'flight' ? 7.5 : 11.5) && cam.pitch < 40;
      const fresh = env(t, r.t1 - 0.2, r.t1 + 2.6, 0.4, 0.4), outroK = r.style === 'flight' ? 0 : seg(t, 55.0, 0.5) * (1 - seg(t, O_.t + 1.2, 0.4));
      const k = show ? Math.max(fresh, outroK) * ui : 0;
      if (k <= 0.001) { op(tg, 0); continue; }
      const w = tg.offsetWidth || 260, h = tg.offsetHeight || 40;
      let best = null;
      // 候选：沿线 50% / 35% / 65% / 20% / 80% 处，法线两侧各偏 30px；第一个不碰撞的就用
      for (const u of [0.5, 0.35, 0.65, 0.2, 0.8]) {
        const m = pointAt(r, u);
        if (!visible(m.ll, cam)) continue;
        const q = project(m.ll), qa = project(pointAt(r, Math.min(1, u + 0.02)).ll), qb = project(pointAt(r, Math.max(0, u - 0.02)).ll);
        let nx = -(qa.y - qb.y), ny = qa.x - qb.x;
        const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
        for (const sgn of [1, -1]) {
          const cx = q.x + sgn * nx * (30 + Math.abs(nx) * w / 2), cy = q.y + sgn * ny * (30 + Math.abs(ny) * h / 2);
          const box = { x0: cx - w / 2, x1: cx + w / 2, y0: cy - h / 2, y1: cy + h / 2 };
          if (box.x0 < 24 || box.x1 > W - 24 || box.y0 < 24 || box.y1 > H - 24) continue;
          if (zones.some((zr) => hitRect(box, zr, 4)) || placed.some((p) => hitRect(box, p, 8))) continue;
          best = box; break;
        }
        if (best) break;
      }
      if (!best) { op(tg, 0); continue; }
      placed.push({ x: best.x0, y: best.y0, w, h });
      op(tg, k);
      sty(tg, 'transform', `translate(${Math.round(best.x0)}px, ${Math.round(best.y0)}px)`);
    }
  }

  /* ---------- 卡片（含展开为全屏）与引线 ---------- */
  function drawCards(t, cam, accent, chDef, expandF) {
    let active = null;
    G.leaderSpec = null;
    for (const ce of cardEls) {
      const c = ce.c;
      const vis = t >= c.t - 0.05 && t <= c.until + 0.5;
      if (!vis) { op(ce.el, 0); continue; }
      const pin = seg(t, c.t, 0.55, ease.outCubic), pout = seg(t, c.until - 0.4, 0.4, ease.inCubic);
      const base = c.portrait ? L.cardTall : L.card;
      let f = 0, kb = 0;
      if (c.expand) {
        const ex = c.expand;
        f = seg(t, ex.t, 0.6, ease.inOutCubic) * (1 - seg(t, ex.t + 0.6 + ex.hold, 0.55, ease.inOutCubic));
        kb = seg(t, ex.t, 0.6 + ex.hold + 0.55, ease.linear);
      }
      const x = lerp(base.x, 0, f), y = lerp(base.y, 0, f), w = lerp(base.w, W, f), h = lerp(base.h, H, f);
      sty(ce.el, 'left', `${f1(x)}px`); sty(ce.el, 'top', `${f1(y)}px`);
      sty(ce.el, 'width', `${f1(w)}px`); sty(ce.el, 'height', `${f1(h)}px`);
      const o = pin * (1 - pout);
      op(ce.el, o);
      sty(ce.el, 'transform', f > 0.001 ? 'none' : `translate(${f1((1 - pin) * (por() ? 0 : 36))}px, ${f1((1 - pin) * (por() ? 30 : 0) - pout * 14)}px) scale(${f2(0.97 + 0.03 * pin)})`);
      sty(ce.el, 'z-index', f > 0.001 ? '5' : '1');
      sty(ce.el, '--r', `${f1(10 * (1 - f))}px`);
      sty(ce.el, '--ring', chDef && f < 0.01 ? css(accent) : 'transparent');
      const cv = ce.media.firstChild;
      if (cv) sty(cv, 'transform', `scale(${f2(1.04 + 0.06 * kb + 0.012 * seg(t, c.t, c.until - c.t, ease.linear))})`);
      op(ce.cap, (1 - f) * seg(t, c.t + 0.3, 0.4));
      if (o > 0.5 && f < 0.01) active = { rect: { x: base.x, y: base.y, w: base.w, h: base.h }, ce };
      // 引线参数（路径在标记放好之后由 drawLeader() 画：起点要避开标签）
      if (f < 0.02 && o > 0.05 && visible(ce.stop.lngLat, cam)) {
        G.leaderSpec = { stop: c.stop, q: project(ce.stop.lngLat), base, k: seg(t, c.t + 0.25, 0.4, ease.outCubic) * (1 - pout) };
      }
    }
    return active;
  }

  /* ---------- 引线：节点（或其标签右缘）→ 卡片外缘；横屏连卡片左边、竖屏连卡片上边，转角为直角 ---------- */
  function drawLeader() {
    const sp = G.leaderSpec;
    let d = '', capX = 0, capY = 0, len = 1;
    if (sp && sp.k > 0.01) {
      const { q, base } = sp;
      const me = markerEls.find((m) => m.m.stop === sp.stop);
      const box = me && me.box;
      if (!por()) {
        // 起点：标签在右侧时从标签右缘出发，否则从节点外缘出发；终点停在卡片左缘外 10px
        const sx = box && box.side > 0 && Math.abs((box.y0 + box.y1) / 2 - q.y) < 2 ? box.x1 + 8 : q.x + 18;
        const ex = base.x - 10, ey = clamp(q.y, base.y + 40, base.y + base.h - 40);
        if (ex - sx > 24) {
          const mx = Math.round(lerp(sx, ex, 0.55));
          d = ey === q.y ? `M${f1(sx)} ${f1(q.y)}H${f1(ex)}` : `M${f1(sx)} ${f1(q.y)}H${mx}V${f1(ey)}H${f1(ex)}`;
          len = (ex - sx) + Math.abs(ey - q.y);
          capX = ex; capY = ey;
        }
      } else {
        // 标签在节点下方且横向盖住节点（居中 / 偏下）时，引线从标签下缘出发，不穿过标签
        const sy = box && box.y0 >= q.y - 4 && box.x0 - 4 <= q.x && q.x <= box.x1 + 4 ? Math.max(q.y + 18, box.y1 + 8) : q.y + 18;
        const ey = base.y - 10, ex = clamp(q.x, base.x + 40, base.x + base.w - 40);
        if (ey - sy > 24) {
          const my = Math.round(lerp(sy, ey, 0.55));
          d = ex === q.x ? `M${f1(q.x)} ${f1(sy)}V${f1(ey)}` : `M${f1(q.x)} ${f1(sy)}V${my}H${f1(ex)}V${f1(ey)}`;
          len = (ey - sy) + Math.abs(ex - q.x);
          capX = ex; capY = ey;
        }
      }
    }
    attr(G.leader, 'd', d);
    if (d) {
      sty(G.leader, 'stroke-dasharray', `${f1(len)} ${f1(len)}`);
      sty(G.leader, 'stroke-dashoffset', `${f1(len * (1 - sp.k))}`);
      attr(G.leaderCap, 'x', String(f1(capX - 4))); attr(G.leaderCap, 'y', String(f1(capY - 4)));
      op(G.leaderCap, sp.k > 0.98 ? 1 : 0);
    } else op(G.leaderCap, 0);
  }

  /* ---------- 回忆 ---------- */
  let fbV = [];
  function drawFlashback(t, item, vis) {
    op(fb, vis);
    if (!item || vis <= 0) return;
    const media = $('.fb-media', fb).firstChild;
    const p = seg(t, item.t, item.until - item.t, ease.linear);
    if (media) {
      sty(media, 'transform', `scale(${f2(1.08 - 0.06 * p)}) translateX(${f1(-14 * p)}px)`);
      // 进入时一次曝光闪白 + 模糊收拢：从地图“跳进”记忆
      const flash = 1 - seg(t, item.t, 0.45, ease.outCubic);
      sty(media, 'filter', `saturate(1.08) brightness(${f2(1 + 0.6 * flash)}) blur(${f1(6 * flash)}px)`);
    }
    txt($('.fb-tag', fb), item.tag);
    const vEl = $('.fb-vtext', fb);
    const key = item.vtext.join('|');
    if (vEl.dataset.text !== key) {
      vEl.dataset.text = key;
      vEl.innerHTML = '';
      fbV = [];
      item.vtext.forEach((line) => { const col = document.createElement('span'); col.className = 'col'; col.lang = 'ja'; vEl.appendChild(col); fbV.push(...splitChars(col, line)); });
    }
    blurIn(fbV, t, item.t + 0.45, 0.13, 0.45, 12, -10);
    const enStart = item.t + 0.6 + fbV.length * 0.13, enDur = item.en.length * 0.028;
    txt($('.fb-en-text', fb), MK.typeText(item.en, seg(t, enStart, enDur, ease.linear)));
    sty($('.fb-caret', fb), 'opacity', t > enStart - 0.1 && (t < enStart + enDur || Math.floor(t * 4) % 2 === 0) ? '1' : '0');
    txt($('.fb-caption', fb), item.caption);
    sty($('.fb-caption', fb), 'opacity', String(f2(seg(t, item.t + 0.35, 0.4))));
    sty($('.fb-frame', fb), 'transform', `scale(${f2(1.02 - 0.02 * seg(t, item.t, 0.5, ease.outCubic))})`);
  }

  /* ---------- 分屏对比（横屏左右、竖屏上下） ---------- */
  function drawCompare(t, item, vis) {
    op(cmp, vis);
    if (!item || vis <= 0) return;
    const dx = seg(t, item.t + 0.5, 0.75, ease.outQuart);
    const a = $('.cmp-a', cmp), dv = $('.cmp-divider', cmp);
    if (por()) {
      sty(a, 'clip-path', `inset(0 0 ${f2(100 - 50 * dx)}% 0)`);
      sty(dv, 'transform', `translateY(${f1(H * 0.5 * dx)}px)`);
    } else {
      sty(a, 'clip-path', `inset(0 ${f2(100 - 50 * dx)}% 0 0)`);
      sty(dv, 'transform', `translateX(${f1(W * 0.5 * dx)}px)`);
    }
    op(dv, dx > 0.003 ? 1 : 0);
    const [la, lb] = $$('.cmp-label', cmp);
    txt(la, item.left); txt(lb, item.right);
    op(lb, seg(t, item.t + 0.25, 0.3));
    op(la, seg(t, item.t + 0.95, 0.3));
    const st = $('.cmp-stamp', cmp);
    txt(st, item.stamp);
    const sk = seg(t, item.t + 1.45, 0.36, ease.outBack);
    sty(st, 'opacity', String(f2(clamp(sk * 3))));
    sty(st, 'transform', `rotate(-5deg) scale(${f2(1.5 - 0.5 * sk)})`);
    $$('.cmp-media canvas', cmp).forEach((cv) => sty(cv, 'transform', `scale(${f2(1.05 - 0.04 * seg(t, item.t, item.until - item.t, ease.linear))})`));
  }

  /* ---------- 章节：标签 + 框线 / 胶带 + 网点 ---------- */
  function drawChapter(t, ch, chDef, k, fbVis, cmpVis) {
    const decor = chDef ? chDef.decor : null;
    op(el.chapter, k * (1 - Math.max(fbVis, cmpVis)) * (1 - alertK(t)));
    if (ch) {
      txt(el.ctChip, chDef.tag);
      sty(el.ctChip, 'clip-path', `inset(0 ${f2((1 - seg(t, ch.t, 0.35, ease.outCubic)) * 100)}% 0 0)`);
      txt(el.ctTitle, MK.typeText(chDef.title, seg(t, ch.t + 0.25, 0.7, ease.linear)));
    }
    // 四角框线
    const fk = decor === 'frame' ? k * (1 - fbVis) : 0;
    op(el.frameSvg, fk); el.frC.forEach((c) => op(c, fk));
    if (decor === 'frame') {
      const inset = por() ? 18 : 20, fw = W - inset * 2, fh = H - inset * 2, per = 2 * (fw + fh);
      attr(el.frLine, 'd', `M${inset} ${inset}H${W - inset}V${H - inset}H${inset}Z`);
      const fp = seg(t, ch.t + 0.1, 0.8, ease.inOutCubic);
      sty(el.frLine, 'stroke-dasharray', `${per} ${per}`);
      sty(el.frLine, 'stroke-dashoffset', String(f1(per * (1 - fp))));
      el.frC.forEach((c, i) => { const kk = seg(t, ch.t + 0.2 + i * 0.12, 0.3, ease.outBack); sty(c, 'transform', `scale(${f2(kk)})`); });
    }
    // 胶带 + 网点 + 漂浮圆点
    const tk = decor === 'tape' ? k : 0;
    op(el.tape, tk); op(el.halftone, tk * 0.9);
    if (decor === 'tape') {
      sty(el.tape, '--x', `${f1((1 - seg(t, ch.t, 0.6, ease.outCubic)) * -100)}%`);
      sty(el.tape, '--shift', `${f1((t * 40) % 56)}px`);
      sty(el.halftone, 'transform', `translateY(${f1((1 - seg(t, ch.t, 0.6, ease.outCubic)) * -40)}px)`);
    }
  }

  /* ---------- 片名 ---------- */
  function drawIntro(t) {
    const vis = t < 8.2 ? 1 - seg(t, 7.3, 0.6, ease.inCubic) : 0;
    op(intro, vis);
    if (vis <= 0) return;
    sty(intro, 'filter', t > 7.3 ? `blur(${f1(seg(t, 7.3, 0.6) * 10)}px)` : 'none');
    blurIn(introCJK, t, 4.0, 0.16, 0.55, 18, -14);
    sty($('.it-rule', intro), 'transform', `scaleX(${f2(seg(t, 4.5, 0.5, ease.outCubic))})`);
    typeIn(introEN, t, 4.75, 0.9);
    sty($('.it-sub', intro), 'opacity', String(f2(seg(t, 5.7, 0.5))));
  }

  /* ---------- 地点标题 ---------- */
  function drawLocTitle(t, over) {
    const lt = T.locTitle.find((l) => t >= l.t - 0.05 && t <= l.t + l.dur + 0.5);
    op(loc, lt ? env(t, lt.t, lt.t + lt.dur, 0.2, 0.45) * (1 - alertK(t)) : 0);
    if (!lt) return;
    if (locKey !== lt.cjk) {
      locKey = lt.cjk;
      locCJK = splitChars($('.lt-cjk', loc), lt.cjk);
      locEN = splitChars($('.lt-en', loc), lt.en);
      $('.lt-sub', loc).textContent = lt.sub;
    }
    blurIn(locCJK, t, lt.t, 0.16, 0.5, 16, -12);
    sty($('.lt-rule', loc), 'transform', `scaleX(${f2(seg(t, lt.t + 0.15, 0.4, ease.outCubic))})`);
    typeIn(locEN, t, lt.t + 0.3, 0.8);
    sty($('.lt-sub', loc), 'opacity', String(f2(seg(t, lt.t + 0.9, 0.4))));
  }

  /* ---------- 大号日序 ---------- */
  function drawDayCard(t, over) {
    const dc = T.dayCard.find((d) => t >= d.t - 0.05 && t <= d.t + d.dur + 0.4);
    op(dayc, dc ? env(t, dc.t, dc.t + dc.dur, 0.3, 0.35) : 0);
    if (!dc) return;
    const i = $('.dc-num i', dayc);
    txt(i, MK.pad(dc.n));
    sty(i, 'transform', `translateY(${f1((1 - seg(t, dc.t + 0.15, 0.45, ease.outCubic)) * 100)}%)`);
    sty($('.dc-day', dayc), 'transform', `translateX(${f1((1 - seg(t, dc.t, 0.4, ease.outCubic)) * -28)}px)`);
    txt($('.dc-date', dayc), (C.days.find((d) => d.n === dc.n) || {}).date || '');
    sty($('.dc-date', dayc), 'opacity', String(f2(seg(t, dc.t + 0.4, 0.4))));
  }

  /* ---------- HUD ---------- */
  const alertK = (t) => { const a = T.alert.find((x) => t >= x.t - 0.05 && t <= x.until + 0.4); return a ? env(t, a.t, a.until, 0.25, 0.35) : 0; };
  function drawHud(t, cam, night, over, fbVis, cmpVis) {
    const hudNight = night < 0.5 ? 0 : 1;
    const hudAlpha = clamp(Math.abs(night - 0.5) / 0.25);
    const hudInk = mix(mix(PAL.ink, PAL.nightInk, hudNight), WHITE, over);
    for (const container of [TOP, BOTTOM, G.ruleGroup, G.stepGroup]) {
      sty(container, '--ink', css(hudInk));
      sty(container, '--muted', css(hudInk, 0.62));
      sty(container, '--line', css(hudInk, 0.26));
      sty(container, '--paper', css(mix(PAL.paper, PAL.nightPaper, hudNight)));
    }
    op(G.ruleGroup, hudAlpha);
    const hudIn = seg(t, 7.5, 0.8, ease.outCubic);
    const hudOut = seg(t, O_.t - 0.4, 0.8);
    op(TOP, hudIn * (1 - fbVis) * hudAlpha);
    sty(TOP, 'transform', `translateY(${f1((1 - hudIn) * -14)}px)`);
    op(el.hudDay, 1 - hudOut * 0.8);
    // 日序（滚动）
    const dayIt = stepAt(T.day, t);
    const dayN = dayIt ? dayIt.n : 1;
    const dayK = dayIt && dayIt.t > 0 ? seg(t, dayIt.t, 0.46, ease.outCubic) : 1;
    txt(el.hdN, MK.pad(dayN));
    sty(el.hdN, 'transform', `translateY(${f1((1 - dayK) * 70)}%)`);
    sty(el.hdN, 'opacity', String(f2(dayK)));
    txt(el.hdDate, (C.days.find((d) => d.n === dayN) || C.days[0]).date);
    // 坐标 / 海拔 / 缩放 / 时钟
    const c = cam.center;
    txt(el.coord, `${Math.abs(c[1]).toFixed(4)}°${c[1] >= 0 ? 'N' : 'S'} ${Math.abs(c[0]).toFixed(4)}°${c[0] >= 0 ? 'E' : 'W'}`);
    let near = null, nd = Infinity;
    for (const s of Object.values(S)) { const d = Math.hypot(s.lngLat[0] - c[0], s.lngLat[1] - c[1]); if (d < nd) { nd = d; near = s; } }
    const inFlight = t > T.routes[0].t0 && t < T.routes[0].t1;
    txt(el.elev, inFlight ? `ALT ${MK.count(0, 10600, seg(t, T.routes[0].t0, 1.2, ease.outCubic))} M · Z ${cam.zoom.toFixed(1)}` : `ELEV ${nd < 0.6 ? near.elev : 0} M · Z ${cam.zoom.toFixed(1)}`);
    txt(el.clock, clockAt(t));
    attr(el.needle, 'transform', `rotate(${f1(-cam.bearing)})`);
    // 顶部规尺：与步进器读同一个进度值
    const prog = valueAt(T.progress, t);
    const rx = ruleX(prog);
    attr(G.ruleFill, 'width', String(f1(Math.max(0, rx - L.rule.x0))));
    attr(G.ruleHead, 'transform', `translate(${f1(rx)} ${half(L.rule.y)})`);
    G.ruleTicks.forEach((tk, i) => tk.classList.toggle('on', prog >= i - 0.01));
    // 徽章计数
    const cnt = stepAt(T.counter, t);
    const badgeVis = seg(t, 8.2, 0.6) * (1 - hudOut) * (1 - alertK(t));
    op(el.badge, badgeVis * (1 - fbVis) * (1 - cmpVis));
    const bk = cnt ? t - cnt.t : 9;
    sty(el.badge, 'transform', `scale(${f2(1 + 0.16 * Math.exp(-bk * 7) * (bk < 0.8 ? 1 : 0))})`);
    txt(el.bdN, `×${cnt ? cnt.n : 0}`);
    sty(el.bdN, 'transform', `translateY(${f1((1 - seg(bk, 0, 0.3, ease.outCubic)) * 80)}%)`);
    // 印章托盘
    const trayVis = seg(t, 12.6, 0.5) * (1 - over) * (1 - hudOut * (por() ? 1 : 0)) * (1 - Math.max(fbVis, cmpVis));
    G.stamps.forEach((st, i) => {
      const it = T.stamps.find((s) => s.i === i);
      op(st.g, trayVis);
      const sk = it ? seg(t, it.t, 0.34, ease.outBack) : 0;
      const on = it && t >= it.t;
      sty(st.ink, 'opacity', on ? String(f2(clamp(sk * 2.4))) : '0');
      const { x, y } = stampXY(i);
      attr(st.ink, 'transform', `rotate(${st.rot}) scale(${f2(on ? 1.5 - 0.5 * clamp(sk, 0, 1.2) : 1)})`);
      sty(st.ghost, 'opacity', on ? '0' : '0.32');
      st.slot.classList.toggle('on', !!on && sk > 0.35);
      const stampScale = portrait() ? 0.917 : 0.75;
      attr(st.g, 'transform', `translate(${x} ${y + L.stamps.r * (1 - stampScale)}) scale(${stampScale})`);
    });
    // 步进器：线、节点、标签由 stepX() 计算；填充末端 = stepAtX(进度)
    const sy = L.stepper.y;
    attr(G.stepFill, 'x2', String(f1(stepAtX(prog))));
    G.stepNodes.forEach((n, i) => {
      const reached = prog >= i - 0.01;
      n.g.classList.toggle('on', reached);
      n.g.classList.toggle('cur', reached && prog < i + 0.99 && Math.round(prog) === i);
      const f = ((t * 0.7) % 1);
      attr(n.pulse, 'r', String(f1(10 + f * 16)));
      sty(n.pulse, 'opacity', reached && Math.round(prog) === i ? String(f2((1 - f) * 0.6)) : '0');
    });
    op(G.stepGroup, hudIn * (1 - Math.max(fbVis, cmpVis)) * hudAlpha);
    op(G.ruleBase, hudIn * (1 - fbVis)); op(G.ruleFill, hudIn * (1 - fbVis)); op(G.ruleHead, hudIn * (1 - fbVis));
    G.ruleTicks.forEach((tk) => op(tk, hudIn * (1 - fbVis)));
    // 底部：正在播放、歌词、比例尺
    op(BOTTOM, seg(t, 1.2, 0.8) * (1 - fbVis) * hudAlpha);
    op(el.np, 1 - hudOut);
    const ly = stepAt(C.music.lyrics, t);
    txt(el.lyric, ly ? MK.typeText(ly.text, seg(t, ly.t, 0.8, ease.linear)) : '♪ · · ·');
    txt(el.sub, ly ? ly.sub : '');
    sty(el.sub, 'opacity', ly ? String(f2(seg(t, ly.t + 0.45, 0.4))) : '0');
    const beat = t / SPB;
    el.eq.forEach((r, i) => {
      const pulse = Math.exp(-((beat + i * 0.25) % 1) * 3.2);
      const hh = 4 + 18 * (0.35 + 0.65 * pulse) * (0.55 + 0.45 * Math.sin(t * (5 + i * 1.7) + i));
      attr(r, 'y', String(f1(22 - hh))); attr(r, 'height', String(f1(hh)));
    });
    // 比例尺：焦点处的米 / 像素，取 1 / 2 / 5 × 10ⁿ 的整齐长度
    const mpp = (40075016.686 * Math.cos(cam.center[1] * rad)) / (512 * 2 ** cam.zoom);
    const target = (por() ? 200 : 160) * mpp;
    const pow = Math.pow(10, Math.floor(Math.log10(target)));
    const nice = [1, 2, 5, 10].map((k) => k * pow).filter((d) => d <= target).pop() || pow;
    const px = nice / mpp;
    sty(el.scBar, 'width', `${f1(px)}px`);
    txt(el.scText, nice >= 1000 ? `${nice / 1000} km` : `${nice} m`);
    op(el.scale, hudIn * (1 - hudOut) * (cam.zoom > 4.5 ? 1 : 0));
    op(el.attrib, 1);
  }

  /* ---------- 警示改道 ---------- */
  function drawAlert(t) {
    const al = T.alert.find((a) => t >= a.t - 0.05 && t <= a.until + 0.4);
    op(el.alert, al ? 1 - seg(t, al.until, 0.35) : 0);
    if (!al) return;
    sty($('.al-bar', el.alert), 'clip-path', `inset(0 ${f2((1 - seg(t, al.t, 0.38, ease.outCubic)) * 100)}% 0 0)`);
    txt($('.al-title', el.alert), al.title);
    txt($('.al-detail', el.alert), MK.typeText(al.detail, seg(t, al.t + 0.3, 0.9, ease.linear)));
    const chip = $('.al-chip', el.alert);
    sty(chip, 'opacity', String(f2(seg(t, al.t + 0.5, 0.25))));
    sty(chip, 'transform', `translateX(${f1((1 - seg(t, al.t + 0.5, 0.3, ease.outCubic)) * -16)}px)`);
    // 省略号与“改道”提示音同拍：每 1/3 秒一个点
    txt($('.al-chip-text', el.alert), al.chip + '.'.repeat(Math.max(0, Math.floor((t - al.t - 0.5) * 3)) % 4));
  }

  /* ---------- 通知与便签 ---------- */
  function drawNote(t) {
    const ts = T.toast.find((x) => t >= x.t - 0.05 && t <= x.until + 0.4);
    const tv = ts ? env(t, ts.t, ts.until, 0.35, 0.3) : 0;
    op(el.toast, tv);
    sty(el.toast, 'transform', `translateX(${f1((1 - tv) * 44)}px)`);
    if (ts) { txt($('.ts-text', el.toast), ts.text); txt($('.ts-sub', el.toast), ts.sub); }
    const nt = T.note.find((x) => t >= x.t - 0.05 && t <= x.until + 0.4);
    const nin = nt ? seg(t, nt.t, 0.5, ease.outBack) : 0, nout = nt ? seg(t, nt.until, 0.35, ease.inCubic) : 0;
    op(el.note, nt ? clamp(nin) * (1 - nout) : 0);
    if (nt) {
      sty(el.note, 'transform', `translateY(${f1((1 - clamp(nin)) * 34 + nout * 22)}px) rotate(${f2(3.5 - 2 * nout)}deg) scale(${f2(0.9 + 0.1 * nin)})`);
      txt($('.nt-text', el.note), nt.text);
      txt($('.nt-sign', el.note), nt.sign);
      // 涂鸦按笔画描出
      $$('path, circle', $('.nt-doodle', el.note)).forEach((p, i) => {
        const len = 420;
        sty(p, 'stroke-dasharray', `${len} ${len}`);
        sty(p, 'stroke-dashoffset', String(f1(len * (1 - seg(t, nt.t + 0.2 + i * 0.08, 0.5, ease.outCubic)))));
      });
    }
  }

  /* ---------- 收尾统计 ---------- */
  function drawOutro(t) {
    const ov = seg(t, O_.t, 0.5);
    op(outro, ov);
    op($('.outro-bg'), ov);
    if (ov <= 0) return;
    statEls.forEach((li, i) => {
      const s = O_.stats[i], st0 = O_.t + 0.25 + i * 0.32;
      const k = seg(t, st0, 0.45, ease.outCubic);
      sty(li, 'opacity', String(f2(k)));
      sty(li, 'transform', `translateY(${f1((1 - k) * 16)}px)`);
      txt(li.querySelector('b'), `${s.prefix || ''}${MK.count(0, s.value, seg(t, st0, 0.9, ease.outQuart))}${s.suffix || ''}`);
    });
    blurIn(finChars, t, O_.t + 2.0, 0.06, 0.5, 12, -8);
    sty($('.ou-handle', outro), 'opacity', String(f2(seg(t, O_.t + 2.6, 0.4))));
    sty($('.ou-credits', outro), 'opacity', String(f2(seg(t, O_.t + 2.7, 0.5))));
  }

  /* ---------- 地图就绪：渲染模式等待、实时模式降级 ---------- */
  // 渲染模式：等这一帧的瓦片就绪再返回。连续多次 seek（快速拖动与播放）共用同一个等待，
  // 等待期间只检查“当前”镜头的瓦片，所以最后一次 seek 返回时画面一定是完整的
  let waitP = null;
  function renderWait() {
    const map = MAP.map;
    if (!waitP) waitP = nextRender(map).then(() => tilesSettled(map, 20000)).then(() => waitIdle(map, 4000)).finally(() => { waitP = null; });
    return waitP;
  }
  // “露白”判定：画面需要的瓦片既没解析好，也没有 upLevels 级以内的上级瓦片可以顶替（MapLibre 会用上级瓦片先画出来）
  function baseMissing(map) {
    for (const id of ['openmaptiles', 'dem']) {
      const sc = map.style.sourceCaches[id];
      if (!sc) continue;
      for (const k in sc._tiles) {
        const tile = sc._tiles[k], st = tile.state;
        if (st === 'loaded' || st === 'errored') continue;
        if (sc.findLoadedParent(tile.tileID, Math.max(0, tile.tileID.overscaledZ - upLevels(tile.tileID.overscaledZ)))) continue;
        return id + '/' + k + ' z' + tile.tileID.overscaledZ; // 真值：缺的是哪块（验证脚本记录）
      }
    }
    return false;
  }
  window.__baseMissing = () => (MAP.ok ? !!baseMissing(MAP.map) : false);
  function liveDegrade(t) {
    const map = MAP.map;
    if (!MAP.started) return;
    // 只看底图（矢量瓦片 + 高程）；路线的 GeoJSON 在描线时每帧更新，本来就会短暂处于加载中
    const missing = baseMissing(map);
    MAP.stats.frames++;
    if (missing) { MAP.stats.misses++; if (MAP.stats.missFrames.length < 200) MAP.stats.missFrames.push(+t.toFixed(2)); if (MAP.stats.missTiles.length < 20) MAP.stats.missTiles.push(t.toFixed(2) + ' ' + missing + ' ' + (BUF.tiles.has(missing.split(' ')[0]) ? BUF.tiles.get(missing.split(' ')[0]).state : 'unplanned')); }
    // 降级：持续缺瓦片 120ms 后，地图层淡到纸色遮罩（不露白）；就绪后 250ms 淡出
    const now = performance.now();
    if (missing) { if (MAP.lastMissAt < 0) MAP.lastMissAt = now; }
    else MAP.lastMissAt = -1;
    const target = missing && now - MAP.lastMissAt > 120 ? 1 : 0;
    MAP.veil += (target - MAP.veil) * (target ? 0.12 : 0.2);
    if (MAP.veil < 0.005) MAP.veil = 0;
    op(el.veil, MAP.veil * 0.85);
  }

  /* =====================================================================
   * 10. 乐谱：铺底和弦 + 贝斯 + 阳音阶拨弦 + 半拍鼓组 + 事件音
   * ===================================================================== */
  const A = MK.audio;
  const SND = C.sound;
  // 自定义音色：在 Demo 内用 audio.dsp 合成（kit 不需要新能力）
  const D = A.dsp;
  // 车轮过轨：两次“咔嗒”（ガタン・ゴトン），带通噪声 + 低频闷击
  A.define('clack', (ctx, out, w, p) => {
    const vel = p.vel ?? 1, r = D.rng(p.seed || 1), end = w + 0.32;
    [0, 0.105 + r() * 0.01].forEach((dt, j) => {
      const t0 = w + dt, n = D.noise(ctx, t0, t0 + 0.08, { seed: (p.seed || 1) + j }), bp = D.filter(ctx, 'bandpass', 2100 - j * 500, 1.6), g = D.gain(ctx, 0);
      D.perc(g.gain, t0, 0.55 * vel * (j ? 0.75 : 1), 0.0008, 0.035);
      n.connect(bp).connect(g).connect(out);
      const o = D.osc(ctx, 'sine', 110 - j * 18, t0, t0 + 0.12), og = D.gain(ctx, 0);
      o.frequency.exponentialRampToValueAtTime(60, t0 + 0.08);
      D.perc(og.gain, t0, 0.5 * vel * (j ? 0.8 : 1), 0.002, 0.07);
      o.connect(og).connect(out);
    });
    return end;
  }, { bus: 'sfx', send: 0.12, level: 0.7 });
  // 黑胶噪点：回忆段的质感层（随机稀疏的咔嗒 + 低通底噪）
  A.define('vinyl', (ctx, out, w, p) => {
    const vel = p.vel ?? 1, total = p.dur ?? 3, off = clamp(p.offset || 0, 0, total - 0.05), dur = total - off, r = D.rng(p.seed || 3), end = w + dur + 0.05;
    const hiss = D.noise(ctx, w, end, { seed: 11 }), lp = D.filter(ctx, 'lowpass', 3200, 0.7), hp = D.filter(ctx, 'highpass', 900, 0.7), hg = D.gain(ctx, 0);
    hg.gain.setValueAtTime(0.0001, w); hg.gain.linearRampToValueAtTime(0.09 * vel, w + 0.25); hg.gain.setValueAtTime(0.09 * vel, w + dur - 0.3); hg.gain.linearRampToValueAtTime(0.0001, w + dur);
    hiss.connect(hp).connect(lp).connect(hg).connect(out);
    const crack = D.noise(ctx, w, end, { seed: 23 }), cbp = D.filter(ctx, 'highpass', 2500, 0.8), cg = D.gain(ctx, 0);
    cg.gain.setValueAtTime(0, w);
    for (let tt = 0; tt < dur; tt += 0.025 + r() * 0.11) {
      const a = (0.25 + r() * 0.75) * vel * 0.8;
      cg.gain.setValueAtTime(a, w + tt); cg.gain.setValueAtTime(0, w + tt + 0.0015 + r() * 0.002);
    }
    crack.connect(cbp).connect(cg).connect(out);
    return end;
  }, { bus: 'sfx', send: 0.05, level: 0.6, resume: 3 });
  A.meta.vinyl.resume = 3;
  // 霓虹嗡鸣：120Hz 谐波经带通，振幅偶发闪断
  A.define('neon', (ctx, out, w, p) => {
    const vel = p.vel ?? 1, dur = p.dur ?? 1.4, r = D.rng(p.seed || 5), end = w + dur + 0.05;
    const o1 = D.osc(ctx, 'sawtooth', 120, w, end), o2 = D.osc(ctx, 'square', 240, w, end, 6), bp = D.filter(ctx, 'bandpass', 1400, 2.2), g = D.gain(ctx, 0);
    o1.connect(bp); o2.connect(D.gain(ctx, 0.35)).connect(bp);
    g.gain.setValueAtTime(0, w);
    let tt = 0;
    while (tt < dur) { const on = r() > 0.18; g.gain.setValueAtTime(on ? 0.22 * vel * (1 - tt / dur * 0.5) : 0.02, w + tt); tt += 0.03 + r() * 0.09; }
    g.gain.setValueAtTime(0.0001, w + dur);
    bp.connect(g).connect(out);
    return end;
  }, { bus: 'sfx', send: 0.15, level: 0.5 });

  let liveCameras = [], liveCameraOrient = null, liveReady = false, liveWait = null;

  function mercatorFrame(points, inset, reference = null) {
    const projected = points.map(merc);
    const xs = projected.map(point => point[0]), ys = projected.map(point => point[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const focus = reference ? reference.focus.slice() : [W / 2, H / 2];
    const width = 2 * Math.min(focus[0] - W * inset, W * (1 - inset) - focus[0]);
    const height = 2 * Math.min(focus[1] - H * inset, H * (1 - inset) - focus[1]);
    return {
      center: unmerc([(x0 + x1) / 2, (y0 + y1) / 2]),
      zoom: Math.log2(Math.min(width / ((x1 - x0) * 512), height / ((y1 - y0) * 512))),
      bearing: 0, pitch: 0, focus,
      padding: reference ? { ...reference.padding } : { left: 0, right: 0, top: 0, bottom: 0 },
    };
  }

  function insideFrame(points, inset) {
    return points.every(point => {
      const p = project(point);
      return p.x >= W * inset && p.x <= W * (1 - inset) && p.y >= H * inset && p.y <= H * (1 - inset);
    });
  }

  function projectedFrame(camera, points, inset) {
    applyCamera(camera);
    if (insideFrame(points, inset)) return camera;
    let low = 0, high = camera.zoom;
    for (let iteration = 0; iteration < 24; iteration++) {
      camera.zoom = (low + high) / 2;
      applyCamera(camera);
      if (insideFrame(points, inset)) low = camera.zoom;
      else high = camera.zoom;
    }
    camera.zoom = low;
    return camera;
  }

  function configureLiveCameras() {
    MAP.map.resize();
    if (PC.id === 'route-draw-marker') {
      const thirdPoints = [S.jrNara.lngLat, S.naraPark.lngLat];
      const third = mercatorFrame(thirdPoints, .2);
      third.center = [0, 1].map(axis => (thirdPoints[0][axis] + thirdPoints[1][axis]) / 2);
      projectedFrame(third, thirdPoints, .2);
      third.zoom = Math.max(13, third.zoom);
      liveCameras = [
        projectedFrame(mercatorFrame([S.kix.lngLat, S.kyoto.lngLat], .12), [S.kix.lngLat, S.kyoto.lngLat], .12),
        projectedFrame(mercatorFrame([S.kyoto.lngLat, S.jrNara.lngLat], .12), [S.kyoto.lngLat, S.jrNara.lngLat], .12),
        third,
      ];
    } else if (PC.id === 'alert-reroute') {
      const original = cameraAt(46.475, O);
      const points = [...R.wrong.pts, ...R.reroute.pts];
      applyCamera(original);
      if (insideFrame(points, .08)) liveCameras = [original];
      else {
        const camera = { ...original, center: mercatorFrame(points, .15, original).center };
        let low = 0, high = original.zoom;
        for (let iteration = 0; iteration < 24; iteration++) {
          camera.zoom = (low + high) / 2;
          applyCamera(camera);
          if (insideFrame(points, .15)) low = camera.zoom;
          else high = camera.zoom;
        }
        camera.zoom = low;
        liveCameras = [camera];
      }
    } else liveCameras = [cameraAt(34.5, O)];
    liveCameraOrient = O;
    G.leader.classList.add('pattern-off'); G.leaderCap.classList.add('pattern-off');
    if (PC.id === 'route-draw-marker') {
      G.heads.filter(Boolean).forEach(head => op(head, 0));
      const selected = new Set(PC.actions.filter(action => action.stop).map(action => action.stop));
      markerEls.forEach((marker, i) => {
        marker.el.classList.toggle('pattern-off', !selected.has(marker.m.stop));
        G.nodes[i].g.classList.toggle('pattern-off', !selected.has(marker.m.stop));
      });
      el.veil.classList.remove('pattern-off');
      $('.veil-tag', el.veil).classList.add('pattern-off');
      sty(el.veil, 'z-index', '14');
    }
  }

  function liveCameraAt(t) {
    return liveCameras[PC.id === 'route-draw-marker' ? t < 3.8 ? 0 : t < 7 ? 1 : 2 : 0];
  }

  function cameraNeedsApply(camera) {
    const map = MAP.map, center = map.getCenter(), padding = map.getPadding();
    const focus = [(W + padding.left - padding.right) / 2, (H + padding.top - padding.bottom) / 2];
    const current = `${center.lng.toFixed(7)},${center.lat.toFixed(7)},${map.getZoom().toFixed(4)},${map.getPitch().toFixed(3)},${map.getBearing().toFixed(3)},${focus[0].toFixed(1)},${focus[1].toFixed(1)}`;
    const target = `${camera.center[0].toFixed(7)},${camera.center[1].toFixed(7)},${camera.zoom.toFixed(4)},${camera.pitch.toFixed(3)},${camera.bearing.toFixed(3)},${camera.focus[0].toFixed(1)},${camera.focus[1].toFixed(1)}`;
    return current !== target;
  }

  function settleLiveMap() {
    if (!liveWait) liveWait = (async () => {
      const map = MAP.map;
      await nextRender(map);
      const loaded = await tilesSettled(map, 20000);
      let idle = false;
      const markIdle = () => { idle = true; };
      map.once('idle', markIdle);
      await waitIdle(map, 4000);
      map.off('idle', markIdle);
      if (!loaded || !idle || !map.areTilesLoaded() || !map.loaded()) throw new Error('Fixed map did not reach idle with visible tiles loaded');
    })().finally(() => { liveWait = null; });
    return liveWait;
  }

  function paintLiveMap(night) {
    const n2 = Math.round(night * 200) / 200;
    for (const layer of mapLayers) setPaint(layer.id, layer.prop, css(dayNight(MP[layer.key][0], MP[layer.key][1], n2)));
    setPaint('hillshade', 'hillshade-shadow-color', css(dayNight(MP.shade[0], MP.shade[1], n2), lerp(.55, .75, n2)));
    setPaint('hillshade', 'hillshade-highlight-color', css(dayNight(MP.light[0], MP.light[1], n2), lerp(.55, .12, n2)));
    setPaint('hillshade', 'hillshade-accent-color', css(dayNight(MP.shade[0], MP.shade[1], n2), .25));
    sty(el.map, 'background', css(mix(PAL.paper, PAL.nightPaper, night)));
  }

  function routeStrokeWidth(route, zoom) {
    const map = MAP.map, sid = 'rt-' + route.id;
    const ids = route.style === 'rail' || route.style === 'wrong' ? [sid + '-glow', sid + '-casing', sid] : [sid + '-casing', sid];
    return Math.max(...ids.filter(id => map.getLayoutProperty(id, 'visibility') !== 'none' && map.getPaintProperty(id, 'line-opacity') > 0).map(id => {
      const width = map.getPaintProperty(id, 'line-width');
      return typeof width === 'number' ? width : lerp(width[4], width[6], clamp((zoom - width[3]) / (width[5] - width[3])));
    }));
  }

  function routeHitsLabel(a, b, box, radius) {
    let low = 0, high = 1;
    for (const axis of ['x', 'y']) {
      const delta = b[axis] - a[axis], min = box[axis + '0'], max = box[axis + '1'];
      if (delta === 0) { if (a[axis] < min || a[axis] > max) { low = 1; high = 0; break; } }
      else {
        const u = (min - a[axis]) / delta, v = (max - a[axis]) / delta;
        low = Math.max(low, Math.min(u, v)); high = Math.min(high, Math.max(u, v));
      }
    }
    if (low <= high) return true;
    const pointBox = p => Math.hypot(p.x - clamp(p.x, box.x0, box.x1), p.y - clamp(p.y, box.y0, box.y1));
    if (Math.min(pointBox(a), pointBox(b)) <= radius) return true;
    const dx = b.x - a.x, dy = b.y - a.y, length2 = dx * dx + dy * dy;
    return [box.x0, box.x1].some(x => [box.y0, box.y1].some(y => {
      const k = length2 ? clamp(((x - a.x) * dx + (y - a.y) * dy) / length2) : 0;
      return Math.hypot(x - a.x - dx * k, y - a.y - dy * k) <= radius;
    }));
  }

  function placeRouteLabels(t, visibleRoutes) {
    const labels = markerEls.filter(me => me.box && !me.el.classList.contains('pattern-off'));
    const nodes = markerEls.map((me, i) => ({ me, nd: G.nodes[i] })).filter(({ me, nd }) => !nd.g.classList.contains('pattern-off') && Number(cache(nd.g)['s:opacity']) > .001).map(({ me, nd }) => {
      const k = seg(t, me.m.t, .45, ease.outBack), scale = .6 + .4 * clamp(k, 0, 1.25);
      const circles = [nd.ring, nd.p1, nd.p2].filter(circle => circle === nd.ring || Number(cache(circle)['s:opacity']) > .001);
      return { me, ...project(me.s.lngLat), radius: scale * Math.max(...circles.map(circle => Number(circle.getAttribute('r')) + (circle === nd.ring ? me.s.node ? 1.25 : 1.5 : 1))) };
    });
    const debug = P.render ? { referenceT: t, orient: O, width: W, height: H, candidateIndexBase: 0, routes: visibleRoutes.map((route, index) => ({ index, width: route.width, points: route.points })), labels: [] } : null;
    const collisions = (me, box) => ({
      stage: box.x0 < 16 || box.x1 > W - 16 || box.y0 < 16 || box.y1 > H - 16,
      labels: labels.filter(other => other !== me && hitRect(box, { x: other.box.x0, y: other.box.y0, w: other.box.x1 - other.box.x0, h: other.box.y1 - other.box.y0 }, 6)).map(other => other.m.stop),
      markers: nodes.filter(node => node.me !== me && Math.hypot(node.x - clamp(node.x, box.x0, box.x1), node.y - clamp(node.y, box.y0, box.y1)) <= node.radius).map(node => ({ stop: node.me.m.stop, x: node.x, y: node.y, radius: node.radius })),
      routes: visibleRoutes.map((route, index) => ({ index, width: route.width, segments: route.points.slice(1).flatMap((point, i) => routeHitsLabel(route.points[i], point, box, route.width / 2 + 4) ? [i] : []) })).filter(route => route.segments.length),
    });
    for (const me of labels) {
      const q = project(me.s.lngLat), s = me.s;
      const gap = (s.node ? 6 : por() ? 12 : 10) + 10;
      const wLab = me.fullW || me.el.offsetWidth || 200, hLab = me.el.offsetHeight || 40;
      const tryBox = (side, dy) => { const x0 = side > 0 ? q.x + gap : side < 0 ? q.x - gap - wLab : q.x - wLab / 2; return { x0, x1: x0 + wLab, y0: q.y - hLab / 2 + dy, y1: q.y + hLab / 2 + dy, side }; };
      const pf0 = por() && s.sideP !== undefined ? s.sideP : me.pref, pf = pf0 || 1, vy = hLab / 2 + gap + 4;
      const order = [[pf, 0], [-pf, 0], [0, vy + hLab / 2], [0, -vy - hLab / 2], [pf, hLab + 6], [-pf, hLab + 6], [pf, -hLab - 6], [-pf, -hLab - 6]];
      if (pf0 === 0) order.unshift(order.splice(2, 1)[0]);
      const bad = box => box.x0 < 16 || box.x1 > W - 16 || box.y0 < 16 || box.y1 > H - 16 ||
        labels.some(other => other !== me && hitRect(box, { x: other.box.x0, y: other.box.y0, w: other.box.x1 - other.box.x0, h: other.box.y1 - other.box.y0 }, 6)) ||
        nodes.some(node => node.me !== me && Math.hypot(node.x - clamp(node.x, box.x0, box.x1), node.y - clamp(node.y, box.y0, box.y1)) <= node.radius) ||
        visibleRoutes.some(route => route.points.slice(1).some((point, i) => routeHitsLabel(route.points[i], point, box, route.width / 2 + 4)));
      const candidates = order.map(([side, dy]) => tryBox(side, dy));
      const selectedIndex = candidates.findIndex(candidate => !bad(candidate));
      const box = candidates[selectedIndex];
      if (debug) {
        const sourceIndex = candidates.findIndex(candidate => candidate.x0 === me.box.x0 && candidate.y0 === me.box.y0 && candidate.side === me.box.side);
        const index = box ? selectedIndex : sourceIndex;
        debug.labels.push({ stop: me.m.stop, sourceCandidateIndex: sourceIndex, sourceRect: { ...me.box }, selectedCandidateIndex: index, fallback: !box, side: (box || me.box).side, dy: index < 0 ? null : order[index][1], rect: { ...(box || me.box) }, candidates: candidates.map((candidate, index) => ({ index, side: candidate.side, dy: order[index][1], rect: candidate, collisions: collisions(me, candidate) })) });
      }
      if (!box) continue;
      me.box = box;
      sty(me.el, 'transform', `translate(${Math.round(box.x0)}px, ${Math.round(box.y0)}px)`);
      me.el.classList.toggle('is-left', box.side < 0);
    }
    G.placed = labels.map(me => ({ x: me.box.x0, y: me.box.y0, w: me.box.x1 - me.box.x0, h: me.box.y1 - me.box.y0 }));
    if (debug) {
      debug.labels.forEach(label => { label.finalCollisions = collisions(markerEls.find(me => me.m.stop === label.stop), label.rect); });
      window.__routeLabelDiagnostics = debug;
    }
  }

  function drawRouteActions(t, camera, accent) {
    const savedRoutes = routes.slice(), savedHeads = G.heads;
    const visibleRoutes = [];
    for (const action of PC.actions.filter(action => action.route)) {
      const route = R[action.route], index = savedRoutes.indexOf(route);
      const completed = t >= action.at + action.to - action.from;
      const caseT = t < action.at ? action.from - 1 : completed && route.style === 'rail' ? route.t1 + 1 : action.from + clamp(t - action.at, 0, action.to - action.from);
      routes.splice(0, routes.length, route); G.heads = [savedHeads[index]];
      updateRoutesGL(caseT, 0, accent, 0);
      drawRoutesSVG(caseT, camera, 1, accent);
      const progress = routeP(route, caseT), width = routeStrokeWidth(route, camera.zoom);
      if (progress > 0 && width > 0) visibleRoutes.push({ points: partial(route, progress).map(project), width });
    }
    routes.splice(0, routes.length, ...savedRoutes); G.heads = savedHeads;
    const referenceT = 41.65;
    const starts = markerEls.map(marker => marker.m.t);
    markerEls.forEach(marker => {
      const action = PC.actions.find(action => action.stop === marker.m.stop);
      marker.m.t = action && t >= action.at ? referenceT - clamp(t - action.at, 0, .85) : referenceT + 1;
    });
    drawPatternMarkers(referenceT, camera, 1, null);
    placeRouteLabels(referenceT, visibleRoutes);
    markerEls.forEach((marker, i) => { marker.m.t = starts[i]; });
    const fade = Math.max(0, 1 - Math.abs(t - 3.8) / .2, 1 - Math.abs(t - 7) / .2);
    el.veil.classList.remove('pattern-off');
    op(el.veil, fade);
  }

  function renderLive(t) {
    O = stage.orient;
    if (!MAP.ok) return drawPattern(PC.id === 'day-night-flip' ? 34.5 : PC.id === 'alert-reroute' ? 44.8 : t, { geo: false });
    const reoriented = liveCameraOrient !== O;
    if (reoriented) configureLiveCameras();
    const camera = liveCameraAt(t), changed = cameraNeedsApply(camera);
    if (changed || reoriented) applyCamera(camera);
    if (PC.id === 'route-draw-marker') {
      const result = drawPattern(t, { cam: camera, night: 0, geo: false });
      paintLiveMap(0);
      drawRouteActions(t, camera, result.accent);
    } else if (PC.id === 'day-night-flip') {
      const caseT = t < 4.5 ? 31.3 + t : 36.6 + t - 4.5;
      const night = valueAt(T.night, caseT);
      drawPattern(caseT, { cam: camera, night, hudT: caseT, grainT: caseT, geo: false });
      paintLiveMap(night);
    } else {
      const caseT = 44.8 + clamp(t, 0, 5.5);
      const result = drawPattern(caseT, { cam: camera, geo: false });
      paintLiveMap(result.night);
      updateRoutesGL(caseT, result.night, result.accent, result.over);
      drawRoutesSVG(caseT, camera, 1 - result.over, result.accent);
      drawPatternMarkers(caseT, camera, 1 - result.over, null);
    }
    drawPatternAttribution(t);
    if (liveReady && (P.render || changed || reoriented)) return settleLiveMap();
    return null;
  }

  async function initPatternMap() {
    await initMap();
    routes.forEach(route => setVis(route, false));
    configureLiveCameras();
    for (const camera of liveCameras) {
      applyCamera(camera);
      await settleLiveMap();
    }
    liveReady = true;
    await renderLive(tl.time);
    await settleLiveMap();
  }


  const at = (bar, beat = 0) => (bar * 4 + beat) * SPB; // 第 bar 小节（从 0 起）第 beat 拍 → 秒
  const CH = SND.chords;
  function buildScore() {
    const ev = [];
    const E = (t, voice, p = {}) => ev.push(Object.assign({ t: +t.toFixed(4), voice }, p));
    // ——— 环境底：全程空气声；夜间加低频持续音 ———
    E(0, 'air', { dur: DUR, fade: 1.5, vel: 0.5, tone: 1500 });
    E(0, 'drone', { note: 'B1', dur: 4.2, fade: 1.6, vel: 0.5, cutoff: 300 });
    E(32.8, 'drone', { note: 'B1', dur: 4.0, fade: 0.8, vel: 0.42, cutoff: 320 });
    E(47.6, 'drone', { note: 'E2', dur: 6.4, fade: 0.8, vel: 0.36, cutoff: 360 });
    // ——— 铺底和弦（每段一个长音色块，接续时自动从中途进入） ———
    const PAD = [
      [0, 4.0, CH.night, 0.5], [4.0, 4.0, CH.home, 0.55], [8.0, 4.0, CH.home, 0.5], [12.0, 2.0, CH.four, 0.5], [14.0, 4.0, CH.five, 0.5],
      [18.0, 3.0, CH.home, 0.5], [21.0, 2.8, CH.dream, 0.52], [23.8, 1.8, CH.four, 0.5], [25.6, 3.6, CH.dream, 0.55], [29.2, 3.6, CH.six, 0.5],
      [32.8, 4.0, CH.night, 0.5], [36.8, 4.0, CH.home, 0.52], [40.8, 3.2, CH.four, 0.5], [44.0, 3.4, CH.six, 0.44], [47.4, 2.6, CH.five, 0.5],
      [50.0, 4.0, CH.night, 0.5], [54.0, 2.0, CH.five, 0.5], [56.0, 4.0, CH.home, 0.55],
    ];
    for (const [t0, d, notes, vel] of PAD) E(t0, 'pad', { notes, dur: d, attack: t0 === 0 ? 1.4 : 0.35, release: 1.2, vel, cutoff: t0 >= 25.6 && t0 < 29.2 ? 2200 : 1500 });
    // ——— 贝斯：根音，在每小节第 1 拍与第 3 拍后半 ———
    const ROOT = (t) => (t < 4 ? 'B1' : t < 12 ? 'D2' : t < 14 ? 'G1' : t < 18 ? 'A1' : t < 21 ? 'D2' : t < 23.8 ? 'G1' : t < 25.6 ? 'G1' : t < 32.8 ? 'B1' : t < 36.8 ? 'B1' : t < 40.8 ? 'D2' : t < 44 ? 'G1' : t < 47.4 ? 'B1' : t < 50 ? 'A1' : t < 54 ? 'B1' : t < 56 ? 'A1' : 'D2');
    const grooveOn = (t) => (t >= 8 && t < 21) || (t >= 24 && t < 25.6) || (t >= 37 && t < 45) || (t >= 47.4 && t < 56);
    for (let b = 4; b < 30; b++) {
      for (const [beat, vel, len] of [[0, 0.8, 0.9], [2.5, 0.55, 0.4], [3.5, 0.45, 0.3]]) {
        const tt = at(b, beat);
        if (!grooveOn(tt)) continue;
        E(tt, 'bass', { note: ROOT(tt), dur: len * SPB * 2, vel, cutoff: 480, env: 1.2 });
      }
    }
    // ——— 鼓组：半拍感（每小节第 1 拍底鼓、第 3 拍拍手），十六分轻镲 ———
    const sections = [[8.0, 21.0], [24.0, 25.6], [37.0, 45.0], [47.4, 56.0]];
    for (const [a, b] of sections) {
      ev.push(MK.audio.pattern({
        bpm: C.meta.bpm, from: a, to: b,
        tracks: { kick: 'X.........x.....', clap: '........X.......', hat: 'x.o.x.o.x.o.x.oo', rim: '......o.......o.' },
        voices: { kick: { gain: 0.75, duck: 0.22 }, clap: { gain: 0.55 }, hat: { gain: 0.42, tone: 1.1 }, rim: { gain: 0.3 } },
      }));
    }
    // ——— 阳音阶拨弦：八分音符琶音（像拨动的琴弦），段落间换型 ———
    const YO = SND.yo;
    const plucks = [[4.0, 8.0, [0, 2, 4, 3, 5, 4, 2, 3]], [8.0, 14.0, [0, 3, 4, 6, 5, 3, 4, 2]], [18.0, 21.0, [4, 2, 3, 0, 1, 3, 2, 4]], [21.0, 24.0, [6, 4, 5, 3, 4, 2, 3, 1], 0.6], [37.0, 44.0, [0, 2, 4, 5, 6, 4, 3, 2]], [50.0, 56.0, [5, 3, 4, 1, 2, 0, 3, 2]]];
    for (const [a, b, pat, k = 1] of plucks) {
      let i = 0;
      for (let tt = a; tt < b - 1e-6; tt += SPB / 2, i++) {
        const deg = pat[i % pat.length];
        E(tt, 'pluck', { note: YO[deg], vel: (i % 2 ? 0.32 : 0.46) * k, decay: k < 1 ? 0.7 : 0.42, bright: k < 1 ? 0.6 : 0.85, pan: ((i % 4) - 1.5) * 0.18, send: k < 1 ? 0.45 : undefined });
      }
    }
    // ——— 事件音 ———
    // 冷开场：地点标记出现（声呐 + 打字 tick）
    for (const m of T.markers) {
      if (m.t < 3) E(m.t, 'sonar', { note: m.stop === 'pvg' ? 'E6' : 'A6', vel: 0.5, decay: 0.8, echo: 0.3 });
    }
    // 天亮：反向渐强 + 上扫呼啸 → 钟声
    E(2.2, 'reverse', { dur: 1.8, vel: 0.55, note: 'D4' });
    E(3.4, 'whoosh', { dur: 0.6, dir: 'up', vel: 0.5, peak: 0.85 });
    E(4.0, 'chime', { note: 'A6', vel: 0.55 }); E(4.0, 'shimmer', { vel: 0.4, dur: 1.4 });
    // 片名：逐字落下（tick），英文打字
    C.meta.titleCJK.split('').forEach((_, i) => E(4.0 + i * 0.16, 'key', { vel: 0.5, heavy: 0.8 }));
    typeSteps(C.meta.titleEN, 4.75, 0.9).forEach((s, i) => E(s.t, 'tick', { vel: i % 2 ? 0.28 : 0.4 }));
    E(6.0, 'riser', { dur: 2.0, vel: 0.5, from: 300, to: 5000, tonal: 0.25, note: 'D3' });
    // HUD 上线：四角依次落位
    [7.5, 7.62, 7.74, 7.86].forEach((tt, i) => E(tt, 'click', { vel: 0.5, pan: i % 2 ? 0.5 : -0.5 }));
    E(8.0, 'kick', { vel: 1 }); E(8.0, 'sub', { note: 'D1', dur: 1.2, vel: 0.65 });
    // 航线：起飞的长呼啸（低频风声）+ 远去的喷气
    E(8.0, 'whoosh', { dur: 3.2, from: 260, to: 1400, q: 1.2, peak: 0.5, vel: 0.55, sweep: 0.9 });
    E(8.0, 'wind', { dur: 3.4, vel: 0.35, tone: 500, gust: 0.3 });
    E(11.3, 'whoosh', { dur: 0.5, dir: 'down', vel: 0.5 });
    // 到达关西：DAY 01 卡、着陆 ping、卡片快门、计数、印章
    E(11.6, 'impact', { vel: 0.45, dur: 1.0, crack: 0.4 }); E(11.6, 'sonar', { note: 'A5', vel: 0.55 });
    stationChime(11.75, 0);
    for (const c of T.cards) { E(c.t, 'shutter', { vel: 0.7 }); E(c.t + 0.02, 'paper', { dur: 0.35, vel: 0.35 }); }
    for (const c of T.counter) { E(c.t, 'confirm', { note: 'E6', steps: [0, 7], vel: 0.55 }); }
    for (const s of T.stamps) { E(s.t, 'stamp', { vel: 0.85, weight: 0.8 }); E(s.t + 0.03, 'sparkle', { vel: 0.3, dur: 0.4 }); }
    for (const d of T.dayCard) { E(d.t, 'thud', { vel: 0.6 }); E(d.t + 0.15, 'blip', { note: 'D6', vel: 0.5 }); }
    // 地图标记（到达）
    for (const m of T.markers) if (m.t >= 3) E(m.t, 'blip', { note: S[m.stop].alert ? 'A4' : S[m.stop].node ? 'A5' : 'E6', vel: S[m.stop].node ? 0.3 : 0.5 });
    // 铁路：描线时的过轨节奏（ガタン・ゴトン），车头抵达时到站提示音
    for (const r of routes) {
      if (r.style === 'rail' || r.style === 'wrong') {
        for (let tt = r.t0 + 0.05; tt < r.t1 - 0.1; tt += SPB) E(tt, 'clack', { vel: r.style === 'wrong' ? 0.45 : 0.55, pan: lerp(-0.5, 0.5, (tt - r.t0) / (r.t1 - r.t0)) });
        E(r.t0, 'whoosh', { dur: Math.min(1.2, r.t1 - r.t0), from: 500, to: 2600, vel: 0.35 });
      }
      if (r.style === 'walk') for (let tt = r.t0; tt < r.t1; tt += SPB / 2) E(tt, 'tick', { note: 1800, vel: 0.18 });
    }
    stationChime(16.6, 1); stationChime(39.4, 2); stationChime(49.6, 3);
    // 地点标题：竖排字落下
    for (const lt of T.locTitle) { MK.chars(lt.cjk).forEach((_, i) => E(lt.t + i * 0.16, 'key', { vel: 0.42, heavy: 0.9 })); typeSteps(lt.en, lt.t + 0.3, 0.8).forEach((s, i) => E(s.t, 'tick', { vel: i % 2 ? 0.2 : 0.3 })); }
    // 卡片 → 全屏：上扫 + 低频；收回：下扫
    for (const c of T.cards) if (c.expand) {
      E(c.expand.t - 0.25, 'whoosh', { dur: 0.7, dir: 'up', vel: 0.75, peak: 0.6 });
      E(c.expand.t + 0.5, 'impact', { vel: 0.4, dur: 1.2, crack: 0.3 });
      E(c.expand.t + 0.6 + c.expand.hold - 0.1, 'whoosh', { dur: 0.6, dir: 'down', vel: 0.6 });
    }
    // 章节：框线描出（上升）+ 钟 + 确认
    for (const ch of T.chapter) {
      E(ch.t - 0.6, 'riser', { dur: 0.7, vel: 0.35, from: 800, to: 6000, tonal: 0.1 });
      E(ch.t + 0.1, 'bell', { note: ch.key === 'river' ? 'D5' : 'A4', vel: 0.5 });
      E(ch.t + 0.2, 'confirm', { note: 'A5', steps: [0, 5, 7], vel: 0.45, gap: 0.09 });
    }
    // 回忆：反向渐强进入、黑胶质感、竖排字逐字、英文打字
    for (const f of T.flashback) {
      E(f.t - 0.9, 'reverse', { dur: 0.95, vel: 0.6, note: 'G3' });
      E(f.t, 'shimmer', { dur: 2.2, vel: 0.45 });
      E(f.t, 'vinyl', { dur: f.until - f.t + 0.2, vel: 0.85 });
      let k = 0;
      f.vtext.join('').split('').forEach((_, i) => E(f.t + 0.45 + i * 0.13, 'bell', { note: SND.yo[(k++ * 3) % SND.yo.length], vel: 0.16, decay: 1.2 }));
      const n = f.vtext.join('').length, enStart = f.t + 0.6 + n * 0.13;
      typeSteps(f.en, enStart, f.en.length * 0.028).forEach((s, i) => { if (i % 2 === 0) E(s.t, 'tick', { vel: 0.16, note: 4200 }); });
      E(f.until - 0.15, 'whoosh', { dur: 0.5, dir: 'down', vel: 0.5 });
    }
    // 分屏对比：分割线滑动 + 盖章
    for (const c of T.compare) {
      E(c.t, 'whoosh', { dur: 0.5, vel: 0.45 });
      E(c.t + 0.5, 'whoosh', { dur: 0.75, dir: 'up', from: 700, to: 3000, vel: 0.5, sweep: 0.9 });
      E(c.t + 1.45, 'stamp', { vel: 1 }); E(c.t + 1.45, 'sub', { note: 'B0', dur: 0.6, vel: 0.5 });
    }
    // 昼夜切换：入夜下扫 + 低音；天亮上扫 + 钟
    const N = T.night;
    for (let i = 1; i < N.length; i++) {
      const a = N[i - 1], b = N[i];
      if (a.v === b.v || a.t < 3) continue;
      if (b.v > a.v) { E(a.t, 'whoosh', { dur: b.t - a.t, dir: 'down', from: 3000, to: 300, vel: 0.45 }); E(b.t - 0.1, 'sub', { note: 'B0', dur: 1.0, vel: 0.4 }); }
      else { E(a.t, 'reverse', { dur: b.t - a.t, vel: 0.4 }); E(b.t, 'chime', { note: 'D7', vel: 0.4 }); }
    }
    // 通知、便签
    for (const ts of T.toast) { E(ts.t, 'blip', { note: 'B5', vel: 0.55 }); E(ts.t + 0.09, 'blip', { note: 'E6', vel: 0.55 }); }
    for (const nt of T.note) { E(nt.t, 'paper', { dur: 0.5, vel: 0.6 }); E(nt.t + 0.25, 'pluck', { note: 'D6', vel: 0.35 }); }
    // 意外：错误提示 + 警报 + 故障；改道“嘀”与省略号同拍
    for (const al of T.alert) {
      E(al.t, 'error', { vel: 0.7 }); E(al.t + 0.05, 'alarm', { dur: 1.2, vel: 0.45, rate: 3 }); E(al.t, 'glitch', { dur: 0.3, vel: 0.5 });
      for (let i = 0; i < 6; i++) E(al.t + 0.5 + i / 3, 'beep', { note: i % 3 === 2 ? 1320 : 990, dur: 0.06, vel: 0.35 });
    }
    const wr = R.wrong;
    if (wr) { E(wr.t1, 'stamp', { vel: 0.7, tone: 0.8 }); E(wr.t1, 'error', { note: 233, vel: 0.4 }); }
    // 道顿堀的霓虹
    E(50.2, 'neon', { dur: 2.2, vel: 0.6 });
    // 收尾：逐行计数（阳音阶上行）、fin. 钟声、终止和弦
    O_.stats.forEach((s, i) => { const t0 = O_.t + 0.25 + i * 0.32; E(t0, 'blip', { note: SND.yo[i + 1], vel: 0.45 }); for (let k = 1; k < 5; k++) E(t0 + k * 0.12, 'tick', { vel: 0.18 }); });
    E(O_.t + 2.0, 'bell', { note: 'D5', vel: 0.6 }); E(O_.t + 2.0, 'shimmer', { dur: 2.2, vel: 0.45 }); E(O_.t + 2.0, 'sub', { note: 'D1', dur: 2.4, vel: 0.5 });
    E(55.2, 'whoosh', { dur: 0.9, dir: 'down', vel: 0.5 });
    return ev;

    // 原创到站提示：四音上行，每站上移一个音级
    function stationChime(t0, k) {
      SND.station.forEach((n, i) => {
        const hz = A.noteHz(n) * Math.pow(2, [0, 2, 5, 7][k] / 12);
        E(t0 + i * 0.13, 'chime', { f: hz, vel: 0.38 - i * 0.03, decay: 1.1, pan: (i - 1.5) * 0.2 });
      });
    }
  }
  if (PC) {
    startPattern();
    return;
  }
  const SCORE = buildScore();

  /* =====================================================================
   * 11. 时间轴、协议、控制条、预加载
   * ===================================================================== */
  const markers = [
    { t: 0, label: '冷开场 · 夜间地球' }, { t: 3.0, label: '天亮' }, { t: 4.0, label: '片名' }, { t: 8.0, label: '航线' },
    { t: 11.6, label: 'DAY 01 · 抵达关西' }, { t: 14.6, label: '特急 → 京都' }, { t: 18.0, label: '京都 · 伏見稲荷' }, { t: 21.0, label: '卡片 → 全屏' },
    { t: 24.4, label: '章节 · 鴨川' }, { t: 25.6, label: '回忆' }, { t: 29.2, label: '分屏对比' }, { t: 32.8, label: '入夜 · 便签' },
    { t: 37.0, label: 'DAY 02 · 奈良线' }, { t: 40.8, label: '奈良公园' }, { t: 45.0, label: '意外 · 改道' }, { t: 47.4, label: '改道 · 入夜' },
    { t: 50.0, label: '道頓堀' }, { t: 54.6, label: '全程鸟瞰 · DAY 03' }, { t: 56.0, label: '结尾统计' },
  ];
  tl = MK.timeline({ duration: DUR, render, markers });
  A.attach(tl, SCORE);
  MK.expose(tl, { title: '地图巡礼', fps: 30, bpm: C.meta.bpm });
  Object.defineProperty(window, '__mapStats', { get: () => MAP.stats });
  if (!layerMode) MK.controls(tl, { accent: C.palette.accent });

  // 预加载：字体、场景画面、地图（实时模式加上全部镜头的瓦片预取）
  // 预加载：字体、场景画面、地图。实时模式分三段登记（地图库与样式 1 · 扫描 1 · 开头 ${BUF_CFG.gate} 秒的瓦片 4），
  // 站点据 motion:loading 显示进度；其余瓦片在播放中由缓冲泵在后台继续预取
  const defer = () => { let r; const p = new Promise((res) => (r = res)); p.resolve = r; return p; };
  const stMap = defer(), stPlan = defer(), stGate = [defer(), defer(), defer(), defer()];
  const mapTask = async () => {
    showLoading(0, '连接地图');
    await initMap();
    MAP.t0 = performance.now();
    console.info(`[地图巡礼] 地图库与样式就绪：页面打开后 ${Math.round(performance.now())}ms`);
    stMap.resolve();
    if (P.render) {
      // 渲染模式：每帧都等瓦片，这里只预热第一帧
      applyCamera(cameraAt(P.t ?? 0));
      await nextRender(MAP.map);
      await tilesSettled(MAP.map, 20000);
      stPlan.resolve(); stGate.forEach((d) => d.resolve());
    } else {
      // 改过图层后数据源处于“暂停、等下一帧重载”的状态：先渲染一帧（不等瓦片），并等两个基础数据源的元数据就绪，
      // 扫描结果才与播放时一致（实测在第一帧之前扫描，DEM 与矢量瓦片的清单都会算错）
      showLoading(0.15, '规划缓冲');
      applyCamera(cameraAt(0));
      await nextRender(MAP.map);
      for (let k = 0; k < 100 && !BASE_SOURCES.every((id) => { const sc = MAP.map.style.sourceCaches[id]; return !sc || (sc._sourceLoaded && !sc._paused); }); k++) await new Promise((r) => setTimeout(r, 30));
      planBuffer(O);
      installDefer();
      applyCamera(cameraAt(tl.time));
      stPlan.resolve();
      pump(BUF.gen);
      MAP.map.triggerRepaint();
      await untilGate((p) => {
        showLoading(0.2 + 0.8 * p, '缓冲开头');
        stGate.forEach((d, i) => { if (p >= (i + 1) / stGate.length) d.resolve(); });
      });
      stGate.forEach((d) => d.resolve());
      MAP.readyMs = Math.round(performance.now() - MAP.t0);
      console.info(`[地图巡礼] 开头 ${BUF_CFG.gate}s 已缓冲：地图就绪后 ${MAP.readyMs}ms，已解析 ${BUF.loads} 块`);
    }
    MAP.started = true;
    hideLoading();
  };
  const mapReady = mapTask();
  MK.preload([
    { label: '地图开头缓冲', run: () => mapReady },
    { label: 'document.fonts.ready', run: () => MK.preload.fonts()().then((result) => { measureMarkerLabels(); return result; }) },
    { label: '场景画面', weight: 1, run: () => new Promise((res) => { requestAnimationFrame(() => { const a = performance.now(); MAP.scenes = true; layout(O); console.info(`[地图巡礼] 场景画面 ${Math.round(performance.now() - a)}ms`); res(true); }); }) },
    { label: '地图库与样式', weight: 1, run: () => stMap },
    { label: '缓冲计划', weight: 1, run: () => stPlan },
    ...stGate.map((d, i) => ({ label: `开头瓦片 ${i + 1}/${stGate.length}`, weight: 1, run: () => d })),
  ]);
  tl.on('pause', () => onUserPause());
  // 统计（验证脚本读取）
  Object.defineProperty(window, '__buffer', { get: () => ({
    orient: BUF.orient, tiles: BUF.tiles.size, samples: BUF.samples.length, planMs: BUF.planMs, readyMs: MAP.readyMs,
    bufferedUntil: +BUF.bufferedUntil.toFixed(2), stalled: BUF.stalled, stallCount: BUF.stallCount, stallMs: Math.round(BUF.stallMs), stalls: BUF.stalls,
    loads: BUF.loads, fetches: BUF.fetches, deferred: BUF.deferred, evicted: BUF.evicted, cachedMB: +BUF.cachedMB.toFixed(1), maxCachedMB: +BUF.maxCachedMB.toFixed(1), budgetHits: BUF.budgetHits, timeouts: BUF.timeouts || 0, maxHeapMB: Math.round(BUF.maxHeap / 1048576),
    cache: Object.fromEntries(BASE_SOURCES.map((id) => { const sc = MAP.map && MAP.map.style.sourceCaches[id]; return [id, sc ? sc._cache.order.length : 0]; })),
  }) });
  MK.start(tl, { t: 0, reduced: 19.6 });
})();
