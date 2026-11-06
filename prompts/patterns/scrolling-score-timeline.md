# 滚动总谱

## 实现 Prompt

用来源案例 butterfly-garden-score 的原作 renderAt(t) 重放“滚动总谱”。保留 16 行乐器、播放线 x=880、卷轴 190px/s 匀速左移，以及音符按 attack/release 区分未来、发声、已过的三态与各态粗细。按 index.html 内联配置的 segments 定位 3.8–8.3 秒与 61–65 秒，复用原作数据、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：butterfly-garden-score：3.8–8.3秒；butterfly-garden-score：61–65秒；1倍速，总时长8.5秒。
- **卷轴**：190px/s 匀速，播放线 x=880；音符发声窗为 [x0/190, (x1+6)/190] 秒。

[打开 Demo](../../demos/patterns/scrolling-score-timeline/index.html) · [在库中查看](../../patterns.html#pattern/scrolling-score-timeline)
