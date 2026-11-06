# 七毫秒 · 电路板

## 实现 Prompt

制作一支电路板时间线影片。电流从四川水坝沿铜走线奔向江苏，在换流站由交流变成直流，经过降压与插座进入手机充电器，再一口气拉远到包含各级模块的整张电路板。水流、交流和直流各有光的运动方式；同一电路语汇跨越地图、街区、插座和毫米级充电头。画面构成：绿阻焊#05190F/#1C6A44/#4AA977，金焊盘#D9B25B，白丝印#F2EEE1，琥珀电流与银青水流。；板内字为代码布线的单线中英字；字幕使用Noto Sans SC 500子集。；1920×1080俯视；地理走廊与三个子模块相互嵌套，字幕位于底部安全区。；Canvas2D绘制覆铜、间隙、焊盘、丝印、光流、景深和窗光。；沿光头追拍、抬升显全程、穿孔换尺度、嵌套整板拉远。；原片Microsoft晓晓中文配音、合成电流长音、继电器、水声和环境声。；100BPM；16.3秒平滑交流门控，23秒到达，47.6秒等号揭示。；光的形态同时说明电流种类、路径、变换和到达。。实现入口为demos/cases/lemo-circuit-board/film/，MotionKit适配层仅调用并等待原作render(t)，使用原片音轨同步播放。

## 动效 Token

- **电流**：film/src/main.js:acPhase / sceneCorridor：交流说明段.55Hz，16.3秒换流，headS在16.5–23秒沿dcp推进。
- **嵌套**：film/src/levels.js:toChild / toParent / baseOf / drawLevel；四级局部坐标与递归裁切。
- **拉远**：film/src/main.js:camPull：52.9–54.5秒，logLerp(START.z,.8,e)，e=1−(1−p)^2.6。

## 制作约束

- 所有板块维持俯视与局部坐标。
- 字幕字体按原subset.py使用相同字重和字符集合。
- 地图和电流路径使用bebbbe1中的数据。

## 迁移

- `film/src/main.js:acPhase / sceneCorridor`：修改该处的电流参数。
- `film/src/levels.js:toChild / toParent / baseOf / drawLevel；四级局部坐标与递归裁切。`：修改该处的嵌套参数。
- `film/src/main.js:camPull`：修改该处的拉远参数。

[打开 Demo](../../demos/cases/lemo-circuit-board/index.html) · [在库中查看](../../cases.html#case/lemo-circuit-board)
