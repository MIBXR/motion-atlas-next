# 竖排汉字模糊入场 + 英文打字

## 实现 Prompt

竖排大字从模糊中显影，配副标题与逐字打字；片名、地点、回忆字幕与收尾共用一套入场。复用地图巡礼的 drawIntro、drawLocTitle、drawFlashback、drawOutro、blurIn、typeIn、mountScene、paintScene 与对应 CSS。片名、地点标题、全屏回忆插画与竖排字幕，以及 drawOutro 的 fin.。片段：caseT 3.8→8；caseT 17.9→21.6；caseT 25.5→29.6；caseT 57.9→60；时长 16s。使用横屏 1920×1080 与竖屏 1080×1920 的案例布局；按 mechanism/config.js 的 segments / markers 重放，使用固定底图与屏幕锚点，声音由 mechanism/score.json 挂接。 按 index.html 内联 segments 在原有 14.1 秒之后重放mg-3d-render 原片 7.8–9.7 秒，总时长 16 秒。三维片的英文标语逐词上移、去模糊并收字距，横线和中文随后显现。画面与音轨沿用同一映射，声音默认关闭。

## 参数

- **时长**：16s
- **声音 voice**：key、tick、bell、shimmer、sub
- **追加原片区间**：mg-3d-render 原片 7.8–9.7 秒；const u = prog(t, T0 + 0.07 * k, 0.9);
w.style.filter = `blur(${(1 - e) * 7}px)`;
w.style.letterSpacing = `${0.26 + (1 - e) * 0.2}em`;
const uz = prog(t, T0 + 0.30, 0.9), ez = expoOut(uz);

## 动效 Token

- **片名**：0s
- **地点标题**：4.2s
- **回忆竖排字幕**：7.9s
- **fin.**：12s
- **时长**：14.1s

## 迁移

- `../../cases/map-pilgrimage/film/script.js → blurIn、typeIn、drawIntro、drawLocTitle、drawFlashback、drawOutro`：修改片名、地名、回忆与收尾部分的模糊和打字入场实现。
- `mechanism/scene.html → script 与样式加载；../../cases/map-pilgrimage/film/script.js → layout、startPattern`：入口加载 MotionKit、来源案例的 ../../cases/map-pilgrimage/film/config.js、../../cases/map-pilgrimage/film/paths.js、../../cases/map-pilgrimage/film/scenes.js，以及本巧思配置；地图依赖地址在 ../../cases/map-pilgrimage/film/config.js → map，初始化在 ../../cases/map-pilgrimage/film/script.js → initMap。
- `../../cases/map-pilgrimage/film/config.js → meta；tracks.locTitle、tracks.flashback、tracks.outro；layout`：修改片名、地名、回忆字幕、收尾与横竖布局。
- `mechanism/replay.js → config.segments / markers；mechanism/config.js → segments / markers`：mechanism/replay.js 设置地图与追加案例的重放区间、顺序和标记；mechanism/config.js 设置 mechanism/scene.html 的地图片段。地图来源时刻：3.8→8/17.9→21.6/25.5→29.6/57.9→60。
- `mechanism/score.json`：调整声音事件，按巧思时间对齐，保留音色参数。

[打开 Demo](../../demos/patterns/vertical-title-blur/index.html) · [在库中查看](../../patterns.html#pattern/vertical-title-blur)
