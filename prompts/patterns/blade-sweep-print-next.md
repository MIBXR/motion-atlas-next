# 刮板斜扫印出下一城

## 实现 Prompt

复用来源案例lemo-silkscreen-poster的原作render(t)，重放“刮板斜扫印出下一城”。斜向刮板沿带噪声边缘的裁切区扫过旧海报，后方直接印出下一座城市；刮板墨珠并列装载新海报的色组。参数与源码：film/film.js:183–204的swRegion / swFront / sweep：SW_BOX=[−500,−500,2920,2080]，噪边50/7；裁切drawB，前沿绘squeegee。；film/film.js:43–45、303–312：巴黎14.1667起.5秒、角−.32rad，布宜诺斯艾利斯17.7778起.6秒、角−.28rad；墨珠分别为巴黎四色和BOCA_INKS。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：13.700000–15.100000秒；1倍速，共1.400000秒。

[打开 Demo](../../demos/patterns/blade-sweep-print-next/index.html) · [在库中查看](../../patterns.html#pattern/blade-sweep-print-next)
