# 切割面逐层剥除点云

## 实现 Prompt

用来源案例 lemo-lidar-survey 的原作 render(t) 重放“切割面逐层剥除点云”。共享 uCut 以离地高度判定植被回波的抬离、淡出与发亮，cutAt 按节拍下移；第二个世界空间扫描面 F2 同时控制点与地面着色器，把残余回波凝成受光表面，uW 再沿描墙顺序亮起。保留参数：film/timeline.js:PEEL_STEPS / BEAT；film/film.js:cutAt：96BPM，每拍 .625 秒，30→24→18→12→6→0m，最后达到 −6m 以去掉低植被。；film/film.js:pointVS / camAt；film/timeline.js:CAM：点 XY 量化 .02m、Z .01m；剥层时距92–105m、俯角14–15°，相机连续绕行。；film/film.js:surfaceFS / F2 / uW：地面0.5m、局部起伏×2、315°/26°掠射光；描线由墙距离场与 reveal 顺序控制。。按 index.html 的 segments 把巧思时间映射到原片 3.75–20 秒，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **来源片段**：3.75–20 秒；10–13.125 秒剥层，13.125–14.375 秒留白，14.375–15.625 秒凝面，15.625–20 秒亮墙。

[打开 Demo](../../demos/patterns/point-cloud-cutting-plane/index.html) · [在库中查看](../../patterns.html#pattern/point-cloud-cutting-plane)
