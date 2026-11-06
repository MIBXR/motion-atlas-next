# 风过处上色

## 实现 Prompt

复用来源案例lemo-urban-sketch的原作render(t)，重放“风过处上色”。草帽沿风的路径飞过无彩钢笔公园，每隔0.04秒留下颜色扩散源；每个像素读取最早到达时刻，湿前沿铺上淡彩，树冠与天空源补足大色区。参数与源码：film/film.js:143–159：t=6…24、步长.04，源延迟.12秒、速度900，R=360/520/760/400，GW/GH=640/360。；film/engine.js:arrivalField / sampleField / compositor；film.js:315–326从人物起点读取颜色，防止跑到未着色区失色。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：4.4–19.2秒；1倍速，总时长14.800000秒。

[打开 Demo](../../demos/patterns/color-follows-wind/index.html) · [在库中查看](../../patterns.html#pattern/color-follows-wind)
