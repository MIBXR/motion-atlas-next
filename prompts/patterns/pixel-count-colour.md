# 逐像素数颜色

## 实现 Prompt

用来源案例的原作render(t)实现“逐像素数颜色”。圆内扫描前沿点亮实际计入的蓝色像素，累计曲线驱动百分比；第二个圆用同一方法计数，两份读数停留后给出2.4倍结论。保留参数：source/tools/plates.py：1µm/px层上，tissue=(lum<200)|(max−min>40)，blue=tissue&(B>R+12)&(B>=G)；两个直径1mm的圆。；film/film.js:roiState / shareAt / circle，读取plates.json的201点cum曲线；遮罩跟随measure_roll_deg=18.5°的屏幕扫描方向。；film/film.js:verdict，圆A13.5%、圆B32.6%，21.667秒起两者同屏，22.667秒出2.4倍结论。。按index.html内联segments定位原片，复用原作素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-microscope：10.67–26.67秒；1倍速，总时长16.000000秒。

[打开 Demo](../../demos/patterns/pixel-count-colour/index.html) · [在库中查看](../../patterns.html#pattern/pixel-count-colour)
