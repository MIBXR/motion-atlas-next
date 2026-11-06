# 板擦倒抹回溯

## 实现 Prompt

复用来源案例lemo-whiteboard的原作render(t)，重放“板擦倒抹回溯”。将已经画出的七天轨迹倒序重组为板擦路径，板擦反向抹去轨迹，定位磁铁同步沿倒序轨迹回到起点。参数与源码：film/film.js:230–232：按d=6→0、k=末→首形成trailBack，tl.erase在87–89秒执行，路径y+42、宽230、强度.9。；film/film.js:272–276：u=(t−87)/2沿trailBack插值，lift=.35sin(πu)，结束回PIN。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：84.5–90秒；1倍速，总时长5.500000秒。

[打开 Demo](../../demos/patterns/eraser-rewind/index.html) · [在库中查看](../../patterns.html#pattern/eraser-rewind)
