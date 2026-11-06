/*
 * 地图巡礼 · 迁移入口
 * 只改这个文件（和 paths.js 的路线几何）就能换成你自己的旅程：地点、日期、路线、卡片、章节、节奏与声音。
 * 约定：
 *  - 所有 t 单位为秒；配乐 120 BPM（1 拍 = 0.5 秒，1 小节 = 2 秒），段落起点尽量落在小节线上，画面与乐谱读同一张时间表。
 *  - “轨道”思路同剪辑软件：每条轨道是一串按时间排列的事件。
 *  - 镜头关键帧 f 是“地点出现在画面上的位置”（横屏舞台像素），fp 是竖屏的位置；zp 是竖屏相对横屏的缩放差。
 *  - 版式坐标是舞台像素（横屏 1920×1080 / 竖屏 1080×1920），几何（步进器、印章、规尺刻度）由 script.js 的同一组函数计算。
 *  - 照片卡片的画面由 scenes.js 程序生成；有真实照片时在 cards[].media 填图片路径即可。
 */
window.CONFIG = {
  meta: {
    titleCJK: '関西周遊',
    titleEN: "KANSAI LOOP '26",
    subline: 'SHANGHAI → KANSAI · KYOTO · NARA · OSAKA · 10.01 – 10.03',
    handle: '@motion_atlas',
    tz: 'JST',
    totalDays: 3,
    duration: 60,
    bpm: 120,
  },

  // 底图：OpenFreeMap（无需密钥）+ AWS Terrain Tiles 山体阴影；离线或加载失败时自动退回纸面网格
  map: {
    style: 'https://tiles.openfreemap.org/styles/positron',
    lib: 'https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.js',
    css: 'https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.css',
    dem: 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
    demMaxZoom: 10,
    attribution: '© OpenStreetMap contributors · OpenFreeMap · OpenMapTiles · Terrain Tiles',
    attributionShort: '© OpenStreetMap contributors · OpenFreeMap',
  },

  palette: {
    paper: '#f1eee7', ink: '#16171a', nightPaper: '#0b1019', nightInk: '#e9edf3',
    accent: '#d9562c', // 朱：默认强调色（路线、日序、步进器）；章节会临时替换
    alert: '#e23b3b',
    space: '#05070c',
  },

  // 底图逐图层配色：[白天, 夜晚]；中途经过去饱和的灰（不是整体反色）
  mapPalette: {
    bg: ['#efece5', '#111824'], water: ['#bdd0dc', '#0a0f17'], green: ['#e1e6d6', '#121b1e'], ice: ['#f6f5f1', '#141b25'],
    landuse: ['#e9e5dc', '#141b26'], building: ['#ddd7cb', '#1a2231'], aero: ['#e5e1d8', '#18202c'], casing: ['#dad4c9', '#0d131c'],
    road: ['#ffffff', '#273245'], motorway: ['#fffdf8', '#5b4934'], rail: ['#9d978c', '#40506a'], boundary: ['#b2aca1', '#3e495b'],
    extrusion: ['#efebe3', '#1e2839'], shade: ['#5f5644', '#000000'], light: ['#ffffff', '#3b5172'],
  },

  mascot: { label: 'MIKAN SPOTTED', name: 'MIKAN' },

  music: {
    title: 'Kansai Loop',
    artist: 'Motion Atlas Original',
    // 歌词式旅行字幕：英文一行 + 中文一行，在小节线上换行
    lyrics: [
      { t: 8.0, text: 'Window seat, the sea turns into land', sub: '靠窗的位置，海慢慢变成陆地' },
      { t: 14.0, text: 'Haruka hums the whole way north', sub: '特急一路向北，轻轻哼着' },
      { t: 18.0, text: 'A thousand gates, one quiet climb', sub: '一千座鸟居，一段安静的上坡' },
      { t: 24.0, text: 'The river runs, the water never stays', sub: '河一直在流，水却不是原来的水' },
      { t: 33.0, text: 'Lanterns on Pontocho, rain on the stones', sub: '先斗町的灯笼，石板上的雨' },
      { t: 37.0, text: 'Morning trains and bowing deer', sub: '早班车，和会鞠躬的鹿' },
      { t: 44.0, text: 'Wrong platform, right adventure', sub: '站错了站台，走对了旅途' },
      { t: 48.6, text: 'Neon on the canal says hello', sub: '运河上的霓虹打了个招呼' },
      { t: 54.0, text: 'Three days, one loop, all the way home', sub: '三天，一个圈，一路回家' },
    ],
  },

  days: [
    { n: 1, date: 'THU · OCT 01 2026' },
    { n: 2, date: 'FRI · OCT 02 2026' },
    { n: 3, date: 'SAT · OCT 03 2026' },
  ],

  // 地点：name 英文、ja 日文、lngLat 经纬度、elev 海拔（米）；路线的端点会对齐到这里
  stops: {
    pvg: { name: 'SHANGHAI · PVG', ja: '上海浦東', lngLat: [121.8052, 31.1443], elev: 4, side: -1 },
    kix: { name: 'KANSAI · KIX', ja: '関西空港', lngLat: [135.24433, 34.4364], elev: 5, sideP: 0 }, // sideP：竖屏标签位置（0 = 节点正下方）
    kyoto: { name: 'KYOTO STA.', ja: '京都駅', lngLat: [135.75878, 34.98513], elev: 29 },
    inari: { name: 'FUSHIMI INARI', ja: '伏見稲荷', lngLat: [135.7727, 34.9671], elev: 38, minZoom: 12 },
    kamo: { name: 'KAMO RIVER · SANJO', ja: '鴨川', lngLat: [135.7716, 35.0088], elev: 40, minZoom: 12 },
    jrNara: { name: 'JR NARA', ja: '奈良駅', lngLat: [135.81901, 34.68079], elev: 64, minZoom: 13, node: true },
    naraPark: { name: 'NARA PARK', ja: '奈良公園', lngLat: [135.8398, 34.6853], elev: 95 },
    kintetsuNara: { name: 'KINTETSU-NARA', ja: '近鉄奈良', lngLat: [135.82849, 34.68408], elev: 70, minZoom: 13, node: true },
    saidaiji: { name: 'YAMATO-SAIDAIJI', ja: '大和西大寺', lngLat: [135.78265, 34.69375], elev: 76, minZoom: 11 },
    takanohara: { name: 'TAKANOHARA · WRONG WAY', ja: '高の原', lngLat: [135.7917, 34.7244], elev: 96, minZoom: 11, alert: true },
    namba: { name: 'OSAKA NAMBA', ja: '大阪難波', lngLat: [135.49778, 34.66717], elev: 3, minZoom: 13, node: true },
    dotonbori: { name: 'DOTONBORI', ja: '道頓堀', lngLat: [135.50125, 34.66876], elev: 3 },
  },

  // 旅程步进器（右下）与车站印章：四段
  stepper: [
    { id: 'kix', label: 'KIX', stamp: '関空', icon: 'plane' },
    { id: 'kyoto', label: 'KYOTO', stamp: '京都', icon: 'torii' },
    { id: 'naraPark', label: 'NARA', stamp: '奈良', icon: 'deer' },
    { id: 'dotonbori', label: 'OSAKA', stamp: '大阪', icon: 'bridge' },
  ],

  // 章节：标签 + 标题 + 强调色 + 装饰（frame 四角框线 / tape 底部斜纹胶带 + 网点）
  chapters: {
    river: { tag: 'CHAPTER 01', title: '方丈記 · Kamo River', accent: '#2a8fae', decor: 'frame' },
    deer: { tag: 'CHAPTER 02', title: '鹿の国 · Nara Park', accent: '#c98a2a', decor: 'tape' },
  },

  tracks: {
    // 镜头：c 中心 [lng,lat]、z 缩放、p 俯仰、b 方位；f / fp 为地点在横 / 竖屏上的位置；e 为到达这一帧的缓动
    camera: [
      { t: 0, c: [124.0, 30.5], z: 1.55, p: 0, b: 0, f: [960, 560], fp: [540, 820], zp: -0.25 },
      { t: 3.0, c: [126.0, 31.6], z: 1.75, p: 0, b: 0, f: [1420, 560], fp: [540, 1180], zp: -0.25 },
      { t: 7.8, c: [127.6, 32.4], z: 1.95, p: 0, b: 0, f: [1460, 560], fp: [540, 1300], zp: -0.3 },
      // 航线：一口气从地球推到关西机场（中间不停留：快速推拉的帧用已就绪的上级瓦片，不必下载 z2–z8 的大块世界瓦片）
      { t: 11.6, c: [135.2440, 34.4310], z: 11.1, p: 42, b: -16, f: [640, 600], fp: [540, 700], e: 'out' },
      { t: 14.0, c: [135.2440, 34.4310], z: 11.35, p: 46, b: -22, f: [640, 600], fp: [540, 700] },
      { t: 14.8, c: [135.50, 34.71], z: 9.0, p: 18, b: 0, f: [900, 470], fp: [540, 760], zp: -0.6 },
      { t: 16.4, c: [135.51, 34.72], z: 9.1, p: 20, b: 0, f: [900, 470], fp: [540, 760], zp: -0.6 },
      { t: 17.8, c: [135.7727, 34.9671], z: 14.05, p: 48, b: -10, f: [720, 680], fp: [540, 760], e: 'out' },
      { t: 21.6, c: [135.7727, 34.9671], z: 14.25, p: 52, b: -16, f: [720, 680], fp: [540, 760] },
      { t: 22.4, c: [135.7727, 34.9671], z: 14.3, p: 52, b: -16, f: [720, 680], fp: [540, 760] }, // 全屏遮住期间换到鴨川
      { t: 23.2, c: [135.7716, 35.0088], z: 15.1, p: 55, b: 10, f: [700, 580], fp: [600, 880] },
      { t: 33.0, c: [135.7714, 35.0076], z: 15.45, p: 57, b: 18, f: [700, 580], fp: [600, 880] },
      { t: 36.6, c: [135.7714, 35.0076], z: 15.55, p: 57, b: 20, f: [700, 580], fp: [600, 880] },
      { t: 37.4, c: [135.80, 34.835], z: 10.15, p: 28, b: 0, f: [800, 560], fp: [540, 760], zp: -0.75 },
      { t: 39.2, c: [135.80, 34.825], z: 10.25, p: 30, b: 0, f: [800, 560], fp: [540, 760], zp: -0.75 },
      { t: 40.6, c: [135.8372, 34.6852], z: 15.15, p: 54, b: -12, f: [640, 600], fp: [540, 700], e: 'out' },
      { t: 44.0, c: [135.8368, 34.6853], z: 15.35, p: 55, b: -18, f: [640, 600], fp: [540, 700] },
      { t: 44.8, c: [135.7870, 34.7090], z: 12.35, p: 34, b: 0, f: [760, 520], fp: [540, 760] },
      { t: 46.6, c: [135.7870, 34.7095], z: 12.45, p: 36, b: -4, f: [760, 520], fp: [540, 760] },
      { t: 47.4, c: [135.64, 34.69], z: 10.55, p: 25, b: 0, f: [800, 600], fp: [540, 760], zp: -0.75 },
      { t: 48.6, c: [135.63, 34.69], z: 10.65, p: 26, b: 0, f: [800, 600], fp: [540, 760], zp: -0.75 },
      { t: 50.0, c: [135.50125, 34.66876], z: 15.6, p: 58, b: 28, f: [640, 620], fp: [540, 700], e: 'out' },
      { t: 53.8, c: [135.50125, 34.6690], z: 15.9, p: 60, b: 38, f: [640, 620], fp: [540, 700] },
      { t: 55.2, c: [135.56, 34.72], z: 8.95, p: 0, b: 0, f: [1420, 540], fp: [500, 1408], zp: -0.85, e: 'inOut' }, // 竖屏焦点略偏左上：奈良公园标签整段放得下在右侧、关西机场标签放得下在节点下方，收尾拉远途中不换边
      { t: 60, c: [135.56, 34.72], z: 8.9, p: 0, b: 0, f: [1420, 540], fp: [500, 1408], zp: -0.85 }, // 收尾只留极轻的拉远（0.05 级）：标签整段不换边
    ],
    // 昼夜：0 白天 → 1 夜晚
    night: [
      { t: 0, v: 1 }, { t: 3.0, v: 1 }, { t: 4.0, v: 0 },
      { t: 32.8, v: 0 }, { t: 33.8, v: 1 },
      { t: 36.6, v: 1 }, { t: 37.5, v: 0 },
      { t: 47.6, v: 0 }, { t: 48.6, v: 1 },
      { t: 54.6, v: 1 }, { t: 55.5, v: 0 },
    ],
    // 当地时间（JST）；同一时刻相邻两项可表示跨天跳变
    clock: [
      { t: 0, time: '10:35' }, { t: 8.0, time: '10:50' }, { t: 11.6, time: '13:25' }, { t: 14.0, time: '13:58' },
      { t: 17.8, time: '15:20' }, { t: 24.0, time: '16:40' }, { t: 32.8, time: '18:45' }, { t: 36.5, time: '22:10' },
      { t: 36.6, time: '08:30' }, { t: 40.6, time: '09:40' }, { t: 44.0, time: '15:05' }, { t: 47.4, time: '16:20' },
      { t: 50.0, time: '19:30' }, { t: 54.5, time: '21:40' }, { t: 54.6, time: '07:50' }, { t: 60, time: '07:56' },
    ],
    day: [{ t: 0, n: 1 }, { t: 36.6, n: 2 }, { t: 54.6, n: 3 }],
    // 大号日序卡：DAY 描边 + 数字实心滚入
    dayCard: [{ t: 11.6, n: 1, dur: 2.0 }, { t: 37.0, n: 2, dur: 2.0 }, { t: 54.6, n: 3, dur: 1.4 }],
    // 旅程进度（0 = 第一站 … 3 = 最后一站），连续值：与步进器、顶部规尺读同一个值
    progress: [
      { t: 0, v: 0 }, { t: 14.6, v: 0 }, { t: 16.6, v: 1 }, { t: 37.4, v: 1 }, { t: 39.4, v: 2 },
      { t: 47.0, v: 2 }, { t: 49.6, v: 3 }, { t: 60, v: 3 },
    ],
    // 路线：style = flight（航线虚线 + 飞机）| rail（发光实线 + 车头）| walk（步行圆点）| wrong（错误路线）
    // path 写经纬度数组，或写 paths.js 里的名字；from / to 指定端点对齐的站点
    routes: [
      { id: 'flight', from: 'pvg', to: 'kix', style: 'flight', bend: 0.16, t0: 8.0, t1: 11.3, tag: 'MU 515 · 2H 05M', follow: true }, // follow：飞机按屏幕位置跟随镜头（一口气推近时不被甩出画面）
      { id: 'haruka', path: 'haruka', from: 'kix', to: 'kyoto', style: 'rail', t0: 14.6, t1: 16.6, tag: 'JR HARUKA · 75 MIN' },
      { id: 'naraLine', path: 'naraLine', from: 'kyoto', to: 'jrNara', style: 'rail', t0: 37.4, t1: 39.4, tag: 'JR NARA LINE · 45 MIN' },
      { id: 'walk1', path: 'jrNaraToPark', from: 'jrNara', to: 'naraPark', style: 'walk', t0: 39.4, t1: 40.8 },
      { id: 'walk2', path: 'parkToKintetsu', from: 'naraPark', to: 'kintetsuNara', style: 'walk', t0: 44.0, t1: 44.6 },
      { id: 'kintetsu', path: 'kintetsuToSaidaiji', from: 'kintetsuNara', to: 'saidaiji', style: 'rail', t0: 44.4, t1: 45.0 },
      { id: 'wrong', path: 'wrong', from: 'saidaiji', to: 'takanohara', style: 'wrong', t0: 45.0, t1: 46.2 },
      { id: 'reroute', path: 'reroute', from: 'saidaiji', to: 'namba', style: 'rail', t0: 47.0, t1: 49.6, tag: 'KINTETSU NARA LINE · 40 MIN' },
      { id: 'walk3', path: 'nambaToDotonbori', from: 'namba', to: 'dotonbori', style: 'walk', t0: 49.6, t1: 50.4 },
    ],
    // 地图标记出现时刻（站点 id）
    markers: [
      { stop: 'pvg', t: 1.0 }, { stop: 'kix', t: 1.5 },
      { stop: 'kyoto', t: 16.6 }, { stop: 'inari', t: 18.4 }, { stop: 'kamo', t: 24.4 },
      { stop: 'jrNara', t: 39.4 }, { stop: 'naraPark', t: 40.8 }, { stop: 'kintetsuNara', t: 44.4 },
      { stop: 'saidaiji', t: 45.0 }, { stop: 'takanohara', t: 46.2 }, { stop: 'namba', t: 49.6 }, { stop: 'dotonbori', t: 50.4 },
    ],
    // 地点标题：竖排汉字逐字模糊入场 + 英文打字
    locTitle: [
      { t: 18.0, dur: 3.0, cjk: '京都', en: 'KYOTO · FUSHIMI', sub: '京都駅 → 伏見稲荷' },
      { t: 24.4, dur: 1.0, cjk: '鴨川', en: 'KAMO RIVER', sub: '三条大橋 · SANJO' },
      { t: 40.8, dur: 2.8, cjk: '奈良', en: 'NARA PARK', sub: '奈良公園 · 東大寺' },
      { t: 50.2, dur: 3.0, cjk: '大阪', en: 'OSAKA · DOTONBORI', sub: '道頓堀 · 戎橋' },
    ],
    // 照片卡片：scene 为 scenes.js 的场景；expand 定义“卡片 → 全屏 → 回到卡片”
    cards: [
      { stop: 'kix', t: 12.0, until: 15.0, scene: 'window', caption: 'KANSAI INTL. AIRPORT', time: '13:25' },
      { stop: 'inari', t: 18.6, until: 24.4, scene: 'torii', caption: 'FUSHIMI INARI · SENBON TORII', time: '15:55', expand: { t: 21.0, hold: 2.2 } },
      { stop: 'naraPark', t: 41.2, until: 44.0, scene: 'deer', caption: 'NARA PARK · TODAI-JI', time: '09:52' },
      { stop: 'dotonbori', t: 50.6, until: 54.0, scene: 'neon', caption: 'DOTONBORI · EBISU BRIDGE', time: '19:42', portrait: true },
    ],
    counter: [{ t: 12.8, n: 1 }, { t: 19.4, n: 2 }, { t: 42.0, n: 3 }, { t: 51.4, n: 4 }],
    // 车站印章：与步进器同列，按到达依次盖下
    stamps: [{ t: 13.2, i: 0 }, { t: 19.8, i: 1 }, { t: 42.4, i: 2 }, { t: 51.8, i: 3 }],
    chapter: [
      { key: 'river', t: 24.4, until: 33.0 },
      { key: 'deer', t: 40.8, until: 44.0 },
    ],
    // 全屏回忆：插画风格 + 回忆框 + 竖排字幕逐字
    flashback: [
      {
        t: 25.6, until: 29.2, scene: 'kamo', tag: 'FLASHBACK · 方丈記 1212',
        vtext: ['ゆく河の流れは', '絶えずして'], en: 'The flowing river never ceases — and yet the water is never the same.',
        caption: 'Kamo River — Kamo no Chōmei, Hōjōki (1212)',
      },
    ],
    // 分屏对比：先实景全屏，再由分割线滑到中线露出旧明信片
    compare: [
      { t: 29.2, until: 32.8, scene: 'kamo', left: 'POSTCARD · 1930s', right: 'REAL · 2026', stamp: '10.01 · 17:40 JST' },
    ],
    toast: [{ t: 34.0, until: 36.4, text: 'TRAVEL NOTE · 1 NEW', sub: 'PONTOCHO · KAMO RIVER' }],
    note: [{ t: 34.4, until: 36.6, text: 'Rain stopped at Sanjō.\n川の音だけが残る。', sign: '@motion_atlas · 10.01' }],
    alert: [
      { t: 45.0, until: 47.6, title: 'WRONG TRAIN', detail: 'KINTETSU KYOTO LINE · boarded at Yamato-Saidaiji · heading north', chip: 'REROUTING' },
    ],
    outro: {
      t: 56.0,
      stats: [
        { value: 3, label: 'DAYS · 4 STOPS' },
        { value: 4, label: 'STATION STAMPS' },
        { value: 4, prefix: '×', label: 'MIKAN SIGHTINGS' },
        { value: 1, label: 'WRONG TRAIN' },
        { value: 194, suffix: ' km', label: 'ON THE RAILS · +1,307 km IN THE AIR' },
      ],
      fin: '関西周遊 — fin.',
      credits: [
        'MUSIC · “Kansai Loop” · Motion Atlas',
        'TEXT · 鴨長明《方丈記》1212 · 公有领域',
      ],
    },
  },

  // 声音：120 BPM；和弦与音阶（D 大调 + 日本阳音阶 D E G A B），各段落的鼓组开关
  sound: {
    chords: {
      night: ['B1', 'F#2', 'B2', 'D3', 'A3', 'C#4'],
      home: ['D2', 'A2', 'D3', 'F#3', 'A3', 'E4'],
      four: ['G1', 'D2', 'G2', 'B2', 'D3', 'F#3', 'A3'],
      five: ['A1', 'E2', 'A2', 'C#3', 'E3', 'G3', 'B3'],
      six: ['B1', 'F#2', 'A2', 'D3', 'E3', 'A3'],
      dream: ['G2', 'D3', 'A3', 'B3', 'E4', 'F#4'],
    },
    yo: ['D5', 'E5', 'G5', 'A5', 'B5', 'D6', 'E6'],
    station: ['A5', 'D6', 'E6', 'A6'], // 原创到站提示：四音上行（每站移调）
  },

  // 版式几何（舞台像素）：步进器节点、印章、卡片区域；CSS 负责字号与配色
  layout: {
    landscape: {
      margin: 64,
      rule: { y: 116, x0: 64, x1: 1856 },
      stepper: { y: 952, xs: [1292, 1468, 1644, 1820] },
      stamps: { y: 866, r: 50 },
      card: { x: 1032, y: 212, w: 824, h: 464 },
      cardTall: { x: 1416, y: 200, w: 440, h: 516 },
      tray: 'stepper',
      // 地图标签避让区：顶部 HUD、左下正在播放、右下印章与步进器
      avoid: [[0, 0, 1920, 128], [0, 812, 780, 268], [1220, 800, 700, 280], [1560, 128, 360, 70]],
      outroZone: [0, 140, 1130, 820],
    },
    portrait: {
      margin: 56,
      rule: { y: 264, x0: 56, x1: 1024 },
      stepper: { y: 1778, xs: [176, 418, 662, 904] },
      stamps: { r: 44, xs: [980, 980, 980, 980], ys: [486, 590, 694, 798] }, // 竖屏：右侧一列（像护照上的印章栏）
      card: { x: 56, y: 940, w: 968, h: 544 },
      cardTall: { x: 300, y: 820, w: 480, h: 640 },
      tray: 'top',
      avoid: [[0, 0, 1080, 276], [0, 1590, 1080, 330], [620, 276, 460, 92], [924, 430, 156, 420]],
      outroZone: [0, 300, 1080, 940],
    },
  },
};
