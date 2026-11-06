# 裂纹与重铅

## 实现 Prompt

复用来源案例lemo-stained-glass的原作render(t)，重放“裂纹与重铅”。受击点向外延伸锯齿裂纹，音乐硬停；剑、腿、躯干、手臂逐拍滑到新姿态，焊接后裂痕成为铅线留在玻璃中。参数与源码：film/story.js:77–107：mulberry(31)固定9条主裂纹及分支，.28秒延伸，.45秒闪光，31.8–33.8秒配乐静默。；film/story.js:88、109–143：WELDS=[41.75,42.5,43.25,44,44.6]；每组前.5秒滑动，sin(uπ)*7外凸，修补裂纹以3.2单位铅条覆盖。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：30.800000–45.200000秒；1倍速，共14.400000秒。

[打开 Demo](../../demos/patterns/crack-and-relead/index.html) · [在库中查看](../../patterns.html#pattern/crack-and-relead)
