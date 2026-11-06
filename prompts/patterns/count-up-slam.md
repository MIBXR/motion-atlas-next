# 计数砸落

## 实现 Prompt

复用来源案例lemo-pictogram-motion的原作render(t)，重放“计数砸落”。同一大字号数值按ease-out从1累计到313，到终值时整体瞬间放大7%，以指数衰减回原尺寸并停住。参数与源码：film/film.js:532：n=max(1,round(1+312*E.o3(inv(22.1,24,t))))，直接重绘数值。；film/film.js:533–537：24秒起slam=1+.07*exp(−9*(t−24))，数字在[90,470]整体缩放，Inter Tight 900、270px。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：21.900000–25.000000秒；1倍速，共3.100000秒。

[打开 Demo](../../demos/patterns/count-up-slam/index.html) · [在库中查看](../../patterns.html#pattern/count-up-slam)
