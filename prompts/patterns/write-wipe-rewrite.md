# 写擦原位重写

## 实现 Prompt

复用来源案例lemo-chalkboard的原作render(t)，重放“写擦原位重写”。保留黑板上的两个主字和位置，把错误解释及交叉箭头标记为待擦；一次路径板擦移除旧释义，再在同一区域逐笔写回正确拆字。参数与源码：film/js/film.js:183–187：T.wipe1=T.wipe0+.75，w=360，WP经catmull(...,12)平滑，q1/q1e/q2/q2e和交叉箭头标记wiped。；film/js/film.js:188–194：T.wipe1+.1开始，在G1.x/G2.x、y=1345写弓+手和矢+委，英语解释随后写入post阶段。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：33.5–39.7秒；1倍速，总时长6.200000秒。

[打开 Demo](../../demos/patterns/write-wipe-rewrite/index.html) · [在库中查看](../../patterns.html#pattern/write-wipe-rewrite)
