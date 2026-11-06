# 同步徽章格

## 实现 Prompt

用来源案例lemo-countdown的原作render(t)重放“同步徽章格”。每个摄影机格携带自己的同步种类，徽章右对齐跟随格子矩形移动；空间不足时从上角移到下角。实时同步用橙色实心点，同一时段用灰色空心点和斜线底纹，恢复实时的慢动作另标1×。保留参数：film/index.html:LABEL / SYNC；sync、window、restored分别对应实时同步、同一时段和慢动作还原1×。；film/index.html:syncBadge；28px高，window为9px间隔斜线、空心点与灰框，其他类型用橙色实心点。；film/index.html:render；cw+bw+40<格宽时放右上，否则放右下；零点mergeK>.45时隐藏格内包装。。重放区间由入口segments配置，来源素材与音轨直接复用。

## 参数

- **原片重放区间**：2.5–7.4秒；22.42–26.2秒；1倍速，总时长8.68秒。

[打开 Demo](../../demos/patterns/sync-badge-grid/index.html) · [在库中查看](../../patterns.html#pattern/sync-badge-grid)
