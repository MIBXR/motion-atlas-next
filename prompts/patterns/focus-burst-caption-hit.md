# 集中线炸字主拍

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-hanazi 原片 5.8–7.833 秒；总时长 2.033 秒。炸毛主拍到达 → 集中线、放射底、爆炸框和震惊花字同时展开，冲击抖动后保留轻摆并在定格帧闪白。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：function focusD(cx, cy, seed, n = 120)
burstD(0, 0, 432, 288, 15, 100 + boil)
const K6 = kick(t, C.drop, 26, 7, 11)
fN === Math.round(C.freeze * 30) ? .85 : 0。使用 1080×1920 竖屏。

## 参数

- **原片重放区间**：mg-hanazi 原片 5.8–7.833 秒；1 倍速，总时长 2.033 秒。
- **集中线炸字主拍**：function focusD(cx, cy, seed, n = 120)
burstD(0, 0, 432, 288, 15, 100 + boil)
const K6 = kick(t, C.drop, 26, 7, 11)
fN === Math.round(C.freeze * 30) ? .85 : 0

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/focus-burst-caption-hit/index.html) · [在库中查看](../../patterns.html#pattern/focus-burst-caption-hit)
