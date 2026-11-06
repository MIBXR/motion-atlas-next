# 扫浪托起字母

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-3d-render 原片 0–4.3 秒；总时长 4.3 秒。扫波到达胶囊阵列 → 高斯波包同步驱动胶囊高度、倾斜与着色，反向扫波按阅读顺序托起字母。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：((0.34, -0.94), 0.12, 3.4, 0.80, 0.26, 1.0, (-1.8 + V5_DX, 0.2))
(tuple(CS_D), CS_TM, CS_SP, 0.75, 0.10, 0.55, (0.0, 0.0))
V_LIFT = 1.55。使用 1920×1080 横屏。

## 参数

- **原片重放区间**：mg-3d-render 原片 0–4.3 秒；1 倍速，总时长 4.3 秒。
- **扫浪托起字母**：((0.34, -0.94), 0.12, 3.4, 0.80, 0.26, 1.0, (-1.8 + V5_DX, 0.2))
(tuple(CS_D), CS_TM, CS_SP, 0.75, 0.10, 0.55, (0.0, 0.0))
V_LIFT = 1.55

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/capsule-sweep-lift/index.html) · [在库中查看](../../patterns.html#pattern/capsule-sweep-lift)
