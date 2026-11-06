# 反旋拉远

## 实现 Prompt

调用来源案例原作render(t)重放“反旋拉远”。镜头从正在描画的一条清扫路线连续拉远，同时消除倾角并把中心从路径点移到平面图中心，显出完整的路线纹样。 参数：film/film.js:615–619，zk=ss(seg(t,b(.4),b(5.2)))；z=exp(lerp(log(2.6),log(1),zk))，r=lerp(−.1,0,zk)，中心移至[960,590]。 使用index.html的segments映射原片时刻，复用来源素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-midcentury-toon 21.800000–24.500000秒；1倍速，总时长2.700000秒。

[打开 Demo](../../demos/patterns/counter-rotate-pullback/index.html) · [在库中查看](../../patterns.html#pattern/counter-rotate-pullback)
