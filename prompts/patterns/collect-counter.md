# 收集计数徽章与收集物托盘

## 实现 Prompt

每到一站计数滚动加一，印章落进托盘，步进器同步前进。复用地图巡礼的 drawHud、stepAtX、ruleX、stampXY 与对应 CSS。MIKAN 徽章、收集计数、印章托盘与 drawHud 的步进器。片段：caseT 8.1→8.9；caseT 12.6→14；caseT 19.2→20.4；caseT 41.8→43；caseT 51.2→52.6；时长 9.533s。使用横屏 1920×1080 与竖屏 1080×1920 的案例布局；按 mechanism/config.js 的 segments / markers 重放，使用固定底图与屏幕锚点，声音由 mechanism/score.json 挂接。 通过 index.html 内联 segments 在前 6.6 秒之后依次重放mg-paperclip 原片 3.1–4.7 秒，总时长 9.533 秒。手机科普片按斜向种子次序点亮余下格子，数字统计当前已亮格数，并在整十及终值处回弹。沿用同区间原片音轨，声音默认关闭。 按 index.html 内联 segments 在原有 8.2 秒之后重放mg-hanazi 原片 1.367–2.7 秒，总时长 9.533 秒。综艺片将三格快乐电池依次充满，满电时弹出闪电、放射标记并轻推照片。画面与音轨沿用同一映射，声音默认关闭。

## 参数

- **时长**：9.533s
- **声音 voice**：confirm、stamp、sparkle
- **点亮级联同步计数**：L222: const R1=rng(19);const rest=[...USED.keys()].filter(Z=>!FIRST.includes(Z)).map(Z=>{const[r,c]=rc(Z);return{Z,k:c+.45*r+R1()*2.2};}).sort((a,b)=>a.k-b.k).map(o=>o.Z);；L224: rest.forEach((Z,i)=>litT.set(Z,lerp(EV.cascade[0],EV.cascade[1],1-Math.cbrt(1-(i+1)/rest.length))));；L260: if(o.lt!=null&&t>=o.lt){lit++;const q=P(t,o.lt,.16);const w=wob(t-o.lt,5,12);s*=1+.16*(1-q)*(o.lt===EV.first_lit?.94:1)+.02*w*(o.lt===EV.first_lit?2:1);
- **追加原片区间**：mg-hanazi 原片 1.367–2.7 秒；const k = spring(ub, .5, 28); X(b, -54 + j * 52, 29 - 29 * k, 0, 1, k);
const h = addK(hand(t, 1, .8), kick(t, C.charge[2], 7, 12, 14))

## 动效 Token

- **徽章出现**：0s
- **×1 + 关空**：0.8s
- **×2 + 京都**：2.2s
- **×3 + 奈良**：3.4s
- **×4 + 大阪**：4.6s
- **时长**：8.2s

## 迁移

- `../../cases/map-pilgrimage/film/script.js → drawHud`：修改计数、徽章、收集物托盘（来源为车站印章）与回弹的实现。
- `mechanism/scene.html → script 与样式加载；../../cases/map-pilgrimage/film/script.js → layout、startPattern`：入口加载 MotionKit、来源案例的 ../../cases/map-pilgrimage/film/config.js、../../cases/map-pilgrimage/film/paths.js、../../cases/map-pilgrimage/film/scenes.js，以及本巧思配置；地图依赖地址在 ../../cases/map-pilgrimage/film/config.js → map，初始化在 ../../cases/map-pilgrimage/film/script.js → initMap。
- `../../cases/map-pilgrimage/film/config.js → tracks.counter、tracks.stamps；mascot、stepper、layout`：修改计数事件、徽章、收集印章与横竖布局。
- `mechanism/replay.js → config.segments / markers；mechanism/config.js → segments / markers`：mechanism/replay.js 设置地图与追加案例的重放区间、顺序和标记；mechanism/config.js 设置 mechanism/scene.html 地图片段。地图来源时刻：8.1→8.9/12.6→14/19.2→20.4/41.8→43/51.2→52.6。
- `mechanism/score.json`：调整声音事件，按巧思时间对齐，保留音色参数。

[打开 Demo](../../demos/patterns/collect-counter/index.html) · [在库中查看](../../patterns.html#pattern/collect-counter)
