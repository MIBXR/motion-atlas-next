# 分屏对比与时间戳盖章

## 实现 Prompt

旧明信片与今日实景在横屏左右、竖屏上下对比，分割线划过后盖上时间戳。复用地图巡礼的 drawCompare、mountScene、sceneCanvas、paintScene 与对应 CSS。drawCompare 的两侧插画、分割线、边框与时间戳印章。片段：caseT 29→33.4；时长 6.133s。使用横屏 1920×1080 与竖屏 1080×1920 的案例布局；按 mechanism/config.js 的 segments / markers 重放，使用固定底图与屏幕锚点，声音由 mechanism/score.json 挂接。 按 index.html 内联 segments 在原有 4.8 秒之后重放mg-hanazi 原片 8.167–9.5 秒，总时长 6.133 秒。综艺片的认证印章从 2.5 倍缩到落点，旋转回弹并带动相框镜震。画面与音轨沿用同一映射，声音默认关闭。

## 参数

- **时长**：6.133s
- **声音 voice**：whoosh、stamp、sub
- **追加原片区间**：mg-hanazi 原片 8.167–9.5 秒；s = lerp(2.5, 1, E.inQuad(k)); o = clamp(k * 2.2);
s = 1 - .09 * Math.exp(-w * 16) * Math.cos(w * 44);
kick(t, C.stamp, 14, 10, 13)

## 动效 Token

- **分屏**：0s
- **盖章**：1.65s
- **时长**：4.8s

## 迁移

- `../../cases/map-pilgrimage/film/script.js → drawCompare、mountScene`：修改分屏、两侧场景、边框与印章的实现。
- `mechanism/scene.html → script 与样式加载；../../cases/map-pilgrimage/film/script.js → layout、startPattern`：入口加载 MotionKit、来源案例的 ../../cases/map-pilgrimage/film/config.js、../../cases/map-pilgrimage/film/paths.js、../../cases/map-pilgrimage/film/scenes.js，以及本巧思配置；地图依赖地址在 ../../cases/map-pilgrimage/film/config.js → map，初始化在 ../../cases/map-pilgrimage/film/script.js → initMap。
- `../../cases/map-pilgrimage/film/config.js → tracks.compare → scene、left、right、stamp、t、until；layout`：修改对比场景、两侧标签、印章与时刻；程序画面在 ../../cases/map-pilgrimage/film/scenes.js → paintScene。
- `mechanism/replay.js → config.segments / markers；mechanism/config.js → segments / markers`：mechanism/replay.js 设置地图与追加案例的重放区间、顺序和标记；mechanism/config.js 设置 mechanism/scene.html 地图片段。地图来源时刻：29→33.4。
- `mechanism/score.json`：调整声音事件，按巧思时间对齐，保留音色参数。

[打开 Demo](../../demos/patterns/split-compare-stamp/index.html) · [在库中查看](../../patterns.html#pattern/split-compare-stamp)
