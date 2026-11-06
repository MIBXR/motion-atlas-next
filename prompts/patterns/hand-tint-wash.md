# 版画手工上色

## 实现 Prompt

复用来源案例lemo-engraving的原作render(t)，重放“版画手工上色”。在已经完成的黑色刻线下按色区错峰铺透明水彩，各区从落笔点以带噪声的湿边扩张；淡彩独立缓存，保留溢色、偏位、边缘积色、回花与纸齿，黑墨始终盖在颜色上。参数与源码：film/film.js:94–104：c0=T.colour[0]+.1，每区间隔.42秒，翅dur=1.6、其余1.25；alpha=.5/.95/.72，spill=2.5或3.5。；film/engine/wash.js:37–74缓存各区的密度、回花、积色和纸齿；76–91以R=far×[1−(1−p)^2.2]×1.08的噪声环裁切，multiply合成，湿边宽5。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：25–31.25秒；1倍速，总时长6.250000秒。

[打开 Demo](../../demos/patterns/hand-tint-wash/index.html) · [在库中查看](../../patterns.html#pattern/hand-tint-wash)
