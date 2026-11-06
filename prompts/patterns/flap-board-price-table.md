# 翻牌价格表

## 实现 Prompt

用来源案例lemo-news-package的原作render(t)重放“翻牌价格表”。价格牌把上半和下半分别裁切，先画新值上半与旧值下半；旧上半压缩至零后，新下半从零展开，再停在完整价格。保留参数：film/main.js:flipTile；p=seg(t,t0,t0+.26)，p<.5时旧上半scaleY=1−2p，其后新下半scaleY=2p−1。；film/main.js:shotPrice；220×130牌，输入与输出两列，上排$2/$10，下排翻到$4/$20，×2在10.3秒出现。。重放区间由入口segments配置，来源素材与音轨直接复用。

## 参数

- **原片重放区间**：9–13秒；1倍速，总时长4秒。

[打开 Demo](../../demos/patterns/flap-board-price-table/index.html) · [在库中查看](../../patterns.html#pattern/flap-board-price-table)
