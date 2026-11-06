# 软床触地回弹

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-3d-render 原片 0.05–3.2 秒；总时长 3.15 秒。字母到达软床 → 接触力驱动下陷、反弹与延迟挤压，落点声音读取同一碰撞事件。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：dt = 1 / 2400.0
ws, zs, beta = 2 * np.pi * 3.3, 0.14, 0.56
FALL_Z = {'s': 1.8, 'o': 2.9, 'f': 2.9, 't': 2.9}。使用 1920×1080 横屏。

## 参数

- **原片重放区间**：mg-3d-render 原片 0.05–3.2 秒；1 倍速，总时长 3.15 秒。
- **软字触地回弹**：dt = 1 / 2400.0
ws, zs, beta = 2 * np.pi * 3.3, 0.14, 0.56
FALL_Z = {'s': 1.8, 'o': 2.9, 'f': 2.9, 't': 2.9}

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/soft-bed-letter-bounce/index.html) · [在库中查看](../../patterns.html#pattern/soft-bed-letter-bounce)
