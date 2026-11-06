# 字号即镜头

## 实现 Prompt

用来源案例lemo-ascii-crt的原作render(t)重放“字号即镜头”。把字格宽度当镜头尺度，8px字格推到300px并停一秒，再到450px；同一个字形以40列小日志填充，字内全亮、字外压暗，最后按对数尺度退回。保留参数：film/main.js:T.fr0–fr5=40.2/41.6/42.6/43.6/46.8/47.6；fractalCW以对数插值8→300→450→8px。；film/main.js:sFractal / logRow：K=40；thin字形掩模；目标字内1.15、字外.06，邻字内.2、字外.03。。按index.html中的segments映射时间，复用原作素材、字体和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：40.000000–47.800000秒；1倍速，总时长7.800000秒。

[打开 Demo](../../demos/patterns/font-size-zoom/index.html) · [在库中查看](../../patterns.html#pattern/font-size-zoom)
