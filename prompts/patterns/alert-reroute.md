# 警示横幅与改道

## 实现 Prompt

坐错车时红色警示横幅压下，错误路线打叉，改道路线重新描画。复用地图巡礼的 drawAlert、addRouteLayers、updateRoutesGL、drawRoutesSVG、drawMarkers、measureMarkerLabels、cameraAt、project 与对应 CSS。警示横幅、改道胶囊、错误路线与 X、改道路线、该时段标记标签，以及已完成的持续路线。片段：caseT 44.8→50.3；时长 6.2s。使用横屏 1920×1080 与竖屏 1080×1920 的案例布局；按 mechanism/config.js 的 segments / markers 重放，使用固定镜头的实时地图，声音由 mechanism/score.json 挂接。

## 参数

- **时长**：6.2s
- **声音 voice**：blip、whoosh、error、glitch、clack、alarm、beep、stamp

## 动效 Token

- **警示**：0.2s
- **错误终点**：1.5s
- **改道**：2.2s
- **时长**：6.2s

## 迁移

- `../../cases/map-pilgrimage/film/script.js → renderLive、drawAlert、drawRoutesSVG、drawPatternMarkers`：修改警示、改道提示、路线与标签的实现。
- `index.html → script 与样式加载；../../cases/map-pilgrimage/film/script.js → layout、startPattern`：入口加载 MotionKit、来源案例的 ../../cases/map-pilgrimage/film/config.js、../../cases/map-pilgrimage/film/paths.js、../../cases/map-pilgrimage/film/scenes.js，以及本巧思配置；地图依赖地址在 ../../cases/map-pilgrimage/film/config.js → map，初始化在 ../../cases/map-pilgrimage/film/script.js → initMap。
- `../../cases/map-pilgrimage/film/config.js → tracks.alert、tracks.routes、tracks.markers；stops、map、layout`：修改警示文字、错误路线、地点与横竖布局。
- `mechanism/config.js → segments / markers`：设置本巧思片段映射与标记；地图来源时刻：44.8→50.3。
- `mechanism/score.json`：调整声音事件，按巧思时间对齐，保留音色参数。

[打开 Demo](../../demos/patterns/alert-reroute/index.html) · [在库中查看](../../patterns.html#pattern/alert-reroute)
