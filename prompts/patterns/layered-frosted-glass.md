# 玻璃逐层磨砂

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-aurora-glass 原片 0–8.8 秒；总时长 8.8 秒。每张玻璃卡片模糊其背后已合成的内容，再加入倾斜平面的边缘、高光与界面。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-aurora-glass 原片 0–8.8 秒；1 倍速，巧思时长 8.8 秒。
- **玻璃逐层磨砂**：L239: const TAPS_FROST = gaussTaps(30 * DPR / 4);；L839: blurInto(cur, T.qB, thin > 0 ? gaussTaps(lerp(30, 9, thin) * DPR / 4) : TAPS_FROST);

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/layered-frosted-glass/index.html) · [在库中查看](../../patterns.html#pattern/layered-frosted-glass)
