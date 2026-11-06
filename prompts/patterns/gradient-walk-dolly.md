# 沿梯度横移长镜

## 实现 Prompt

用来源案例 lemo-watercolor 的原作 render(t) 重放“沿梯度横移长镜”。RAINK 给世界坐标对应雨量，rainAt 在量级间做对数插值；camXf 用 monotone 连续横移，LAY 派生各层位置，mixZone / zoneGrad 随区域混色，事件附近的相机键减小速度。保留参数：film/scene.js:camXf；film/engine.js:monotone：Fritsch–Carlson 单调三次插值；10.3 秒 x700，73 秒 x9800。；film/scene.js:LAY：par=.25/.55/1/1.55；scale=.38/.62/1/1.75；alpha=.5/.78/1/.95。；film/scene.js:RAINK / rainAt / ZCOL / mixZone：雨量约 150–4000mm，经 log / exp 插值；地表与天空按区域位置混色。。按 index.html 的 segments 把巧思时间映射到原片 10.3–70.3 秒，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **来源片段**：10.3–70.3 秒；长镜头至 73 秒抵达世界 x=9800。
- **事件减速**：film/scene.js:camXf：41→45 秒 x=5500→5850；54→58.5 秒 x=7300→7550。

[打开 Demo](../../demos/patterns/gradient-walk-dolly/index.html) · [在库中查看](../../patterns.html#pattern/gradient-walk-dolly)
