# 结尾数据堆叠与计数

## 实现 Prompt

收尾时统计数字逐行堆叠，最后以 fin. 收束。复用地图巡礼的 drawOutro、blurIn 与对应 CSS。drawOutro 的统计行、数值计数与 fin.。片段：caseT 55.6→60；时长 5.2s。使用横屏 1920×1080 与竖屏 1080×1920 的案例布局；按 mechanism/config.js 的 segments / markers 重放，使用固定底图与屏幕锚点，声音由 mechanism/score.json 挂接。

## 参数

- **时长**：5.2s
- **声音 voice**：blip、tick、bell、shimmer、sub

## 动效 Token

- **统计**：0.65s
- **fin.**：2.4s
- **时长**：5.2s

## 迁移

- `../../cases/map-pilgrimage/film/script.js → drawOutro`：修改统计行、数值计数与fin.入场的实现。
- `index.html → script 与样式加载；../../cases/map-pilgrimage/film/script.js → layout、startPattern`：入口加载 MotionKit、来源案例的 ../../cases/map-pilgrimage/film/config.js、../../cases/map-pilgrimage/film/paths.js、../../cases/map-pilgrimage/film/scenes.js，以及本巧思配置；地图依赖地址在 ../../cases/map-pilgrimage/film/config.js → map，初始化在 ../../cases/map-pilgrimage/film/script.js → initMap。
- `../../cases/map-pilgrimage/film/config.js → tracks.outro → t、stats、fin、credits；meta.handle；layout`：修改统计值、结尾文案与横竖布局；逐行时序在 ../../cases/map-pilgrimage/film/script.js → drawOutro。
- `mechanism/config.js → segments / markers`：设置本巧思片段映射与标记；地图来源时刻：55.6→60。
- `mechanism/score.json`：调整声音事件，按巧思时间对齐，保留音色参数。

[打开 Demo](../../demos/patterns/outro-stat-stack/index.html) · [在库中查看](../../patterns.html#pattern/outro-stat-stack)
