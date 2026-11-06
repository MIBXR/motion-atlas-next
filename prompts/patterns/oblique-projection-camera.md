# 斜投影作镜头

## 实现 Prompt

复用来源案例lemo-blueprint的原作render(t)，重放“斜投影作镜头”。沿固定45度深度轴把二维图纸坐标偏移，投影系数从0升到.5；立面转出厚度并沿同一轴展开部件。参数与源码：film/draw.js:10–24：proj={k:0,a:π/4}，x+=d*k*cos(a)，y−=d*k*sin(a)。；film/film.js:125：k=lerp(0,.5,eio(seg(t,B(6),B(6)+1.1)))−.08*ss(seg(t,16.6,17.8))；B(6)=11.111111秒。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：10.700000–13.000000秒；1倍速，共2.300000秒。

[打开 Demo](../../demos/patterns/oblique-projection-camera/index.html) · [在库中查看](../../patterns.html#pattern/oblique-projection-camera)
