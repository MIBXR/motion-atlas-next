# 按制图顺序自绘

## 实现 Prompt

复用来源案例lemo-blueprint的原作render(t)，重放“按制图顺序自绘”。工程图以中心线、轮廓、齿轮细节、剖面排线、尺寸、球标、标签的约定顺序自绘，沿真实线段长度推进并在每层内错峰。参数与源码：film/film.js:154–156的drawn：c从B(3)，o从B(3,2)，g从B(4)，d从B(4,1)，h从B(4,2)，b在9.3–10.7秒；dims从B(5)开始。；film/machine.js的pr.c/o/g/d/h/b分别驱动中心线、solid轮廓、齿轮、细节、hatch和BAL球标；film/draw.js的trunc按累计线长截取。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：4.300000–11.100000秒；1倍速，共6.800000秒。

[打开 Demo](../../demos/patterns/drafting-order-build/index.html) · [在库中查看](../../patterns.html#pattern/drafting-order-build)
