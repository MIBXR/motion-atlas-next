# 量表扫针爆表

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-hanazi 原片 6.7–7.833 秒；总时长 1.133 秒。量表主拍到达 → 表盘砸入，指针四帧从左端扫过终点并抵住抖动，爆表字和炸毛再击同拍发生。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：lerp(-88, 96, E.outBack(wn))
3.5 * Math.sin(2 * Math.PI * 17 * t)
[[10, -5], [-10, 6], [6, -3]][fm]。使用 1080×1920 竖屏。

## 参数

- **原片重放区间**：mg-hanazi 原片 6.7–7.833 秒；1 倍速，总时长 1.133 秒。
- **量表扫针爆表**：lerp(-88, 96, E.outBack(wn))
3.5 * Math.sin(2 * Math.PI * 17 * t)
[[10, -5], [-10, 6], [6, -3]][fm]

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/meter-needle-overrange/index.html) · [在库中查看](../../patterns.html#pattern/meter-needle-overrange)
