# 定格退为相框

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-hanazi 原片 7.3–9.2 秒；总时长 1.9 秒。定格 cue 到达 → 保持主拍画面并略推，随后照片缩小、旋转、圆角裁切，白框与阴影展开，余振停稳。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：const uf = t - C.freeze, uh = (uf - HOLD) / (11 * FR);
const sc = lerp(zf, .72, p), rot = lerp(0, -4, p)
const T = 190 * e, Bm = 560 * e, L = 70 * e, b = 30 * e;。使用 1080×1920 竖屏。

## 参数

- **原片重放区间**：mg-hanazi 原片 7.3–9.2 秒；1 倍速，总时长 1.9 秒。
- **定格退为相框**：const uf = t - C.freeze, uh = (uf - HOLD) / (11 * FR);
const sc = lerp(zf, .72, p), rot = lerp(0, -4, p)
const T = 190 * e, Bm = 560 * e, L = 70 * e, b = 30 * e;

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/freeze-to-framed-card/index.html) · [在库中查看](../../patterns.html#pattern/freeze-to-framed-card)
