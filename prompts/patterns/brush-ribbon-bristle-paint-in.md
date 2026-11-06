# 色带飞白逐笔画入

## 实现 Prompt

用来源案例 lemo-watercolor 的原作 render(t) 重放“色带飞白逐笔画入”。mk 为中心线生成宽度轮廓与噪声边缘，drawS 先填色带，再画断续毛刷；drawList 顺序分配笔画进度，sprite 缓存完成物体，scene.js 的 plantP 由屏幕入场距离推动。保留参数：film/engine.js:mk / drawS：rough=.22；w≥6 时 nb=clamp(round(w/3.2),3,9)，body 默认 a*.62，毛刷 alpha .3–.85、end .72–1，实线段 18–90px。；film/scene.js:add / plantP / drawPlants：span 默认 380px；REV 在 10.2–13.4 秒从 −300 到 1650；完成时画 spr，未完成时画 drawList。。按 index.html 的 segments 把巧思时间映射到原片 10.2–22.8 秒，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **来源片段**：10.2–22.8 秒，覆盖刷边揭景与沙漠标本入场。
- **逐笔份额**：film/engine.js:drawList：dur=clamp(4/N,.12,.5)，第 j 笔从 j/N*(1−dur) 起。

[打开 Demo](../../demos/patterns/brush-ribbon-bristle-paint-in/index.html) · [在库中查看](../../patterns.html#pattern/brush-ribbon-bristle-paint-in)
