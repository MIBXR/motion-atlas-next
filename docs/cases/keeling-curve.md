# 基林曲线的制作与节奏观察

制作来源与作品参数见[条目 JSON](../../entries/cases/keeling-curve.json)。

## 作品文件

画面、数据、时间表和绘制工具位于 `film/`；字体、NOAA 原始数据与最终混音分别位于 `fonts/`、`assets/` 和 `audio/final.wav`。`source/` 保存 brief、数据与配乐说明，以及制作预览脚本。画面由 `film/scene.js` 的 `render(t)` 绘制，舞台固定为 1920×1080。

## 播放接入

`index.html` 通过 `MotionKit.mountFilm` 提供 `window.__motion`、固定横屏、播放、暂停、定位、倍速、逐帧步进与声音开关。六段起点读取 `film/timeline.js` 的 `SHOTS`，三个音效标记读取 `EVENTS`。声音默认关闭，开启后按时间轴同步最终混音；渲染模式禁声。

支持 `?embed`、`?render`、`?t=秒`；嵌入和渲染隐藏控制条。减少动态偏好下暂停，未指定时刻时显示 18.5 秒落版。

## 拆解与估计

实现 Prompt、视频生成 Prompt 和负向约束由 Motion Atlas 依据 brief 撰写。当前音乐拍点由 `candidate-1-beats-60.json` 的 `beats` 减去 7.162 秒得到；原时间轴中的拍点用于视觉参考。

能量值由 Motion Atlas 依据成片的运动量与停留时间估计，不是 skill brief 中给出的数值。

六段的起止能量值由用户指定，时间取自最终时间轴的实际秒数；段内线性插值，边界允许跳变。`energySegments` 记录精确端点；`energy` 是每 0.5 秒的等距采样。它们描述视觉运动与停留。

数据来源和画面数值映射见 [DATA.md](../../demos/cases/keeling-curve/source/DATA.md)，音乐、音效及署名见 [AUDIO.md](../../demos/cases/keeling-curve/source/AUDIO.md)。
