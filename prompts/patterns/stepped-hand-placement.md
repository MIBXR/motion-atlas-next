# 抽帧手摆抖动

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-collage 原片 0–10 秒；总时长 10 秒。运动或停留状态变化 → 位置与旋转按 12fps 或 6fps 取样，并用种子抖动保持手摆纸片感。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：const K = t => Math.floor(t * 12 + 1e-4);
const Q6 = t => Math.floor(t * 6 + 1e-4) / 6;
const boil = (moving) => moving ? { amp: 2, fps: 12 } : { amp: 1.1, fps: 6 };。使用 1920×1080 横屏。

## 参数

- **原片重放区间**：mg-collage 原片 0–10 秒；1 倍速，总时长 10 秒。
- **抽帧手摆抖动**：const K = t => Math.floor(t * 12 + 1e-4);
const Q6 = t => Math.floor(t * 6 + 1e-4) / 6;
const boil = (moving) => moving ? { amp: 2, fps: 12 } : { amp: 1.1, fps: 6 };

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/stepped-hand-placement/index.html) · [在库中查看](../../patterns.html#pattern/stepped-hand-placement)
