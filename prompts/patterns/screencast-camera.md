# 录屏式相机

## 实现 Prompt

用来源案例lemo-living-screencast的原作render(t)重放“录屏式相机”。在可变DOM界面内部连续插值相机中心和对数缩放；后续镜头从当前状态继续，慢段微漂移，跨面板急摇由相机速度产生方向模糊，缩放不小于1。保留参数：film/film.js:camAt / cam：CAM0=[960,540,1.5]；每个MOVES逐个混合x/y/log(z)；sin(.7t)×1.2、sin(.53t+1)×.9微漂移。；film/main.js:render：用t−1/24求相机速度；max(0,abs(v)−30)×.3，上限36px；stdDeviation施加于未变换mbw层。。按index.html中的segments映射时间，复用原作素材、字体和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：9.000000–18.600000秒；28.800000–32.400000秒；1倍速，总时长13.200000秒。

[打开 Demo](../../demos/patterns/screencast-camera/index.html) · [在库中查看](../../patterns.html#pattern/screencast-camera)
