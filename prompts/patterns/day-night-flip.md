# 昼夜翻转：逐层插值

## 实现 Prompt

地图配色与 HUD 强调色一起在昼夜之间过渡，交代时间的流逝。复用地图巡礼的 dayNight、valueAt、cameraAt、drawHud、clockAt、classify、setPaint 与对应 CSS。地图、3D 建筑、HUD 与案例暖色 wash；镜头固定为案例 34.5s，HUD 与昼夜值按 caseT 31.3→35.8、36.6→39.1 求值。片段：caseT 31.3→35.8；caseT 36.6→39.1；固定镜头 caseT 34.5，全部 HUD 按片段求值；时长 7s。使用横屏 1920×1080 与竖屏 1080×1920 的案例布局；按 mechanism/config.js 的 segments / markers 重放，使用固定镜头的实时地图，声音由 mechanism/score.json 挂接。

## 参数

- **时长**：7s
- **声音 voice**：whoosh、sub、reverse、chime

## 动效 Token

- **白天**：0s
- **入夜**：1.5s
- **天亮**：4.5s
- **时长**：7s

## 迁移

- `../../cases/map-pilgrimage/film/script.js → renderLive、drawPattern、drawHud、paintLiveMap`：修改昼夜配色、镜头、时钟与HUD的实现。
- `index.html → script 与样式加载；../../cases/map-pilgrimage/film/script.js → layout、startPattern`：入口加载 MotionKit、来源案例的 ../../cases/map-pilgrimage/film/config.js、../../cases/map-pilgrimage/film/paths.js、../../cases/map-pilgrimage/film/scenes.js，以及本巧思配置；地图依赖地址在 ../../cases/map-pilgrimage/film/config.js → map，初始化在 ../../cases/map-pilgrimage/film/script.js → initMap。
- `../../cases/map-pilgrimage/film/config.js → tracks.night、tracks.camera、tracks.clock；palette、mapPalette、layout`：修改昼夜轨道、地图配色、HUD 与横竖布局；固定镜头位置见 ../../cases/map-pilgrimage/film/script.js → configureLiveCameras。
- `mechanism/config.js → segments / markers`：设置本巧思片段映射与标记；地图来源时刻：31.3→35.8/36.6→39.1/镜头34.5，全部 HUD 按片段求值。
- `mechanism/score.json`：调整声音事件，按巧思时间对齐，保留音色参数。

[打开 Demo](../../demos/patterns/day-night-flip/index.html) · [在库中查看](../../patterns.html#pattern/day-night-flip)
