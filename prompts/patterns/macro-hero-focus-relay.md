# 镜头焦点接力

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-3d-render 原片 0–10 秒；总时长 10 秒。各段相机 cue 到达 → 镜头在微距、全字、金属球与正面落版之间换位，独立焦点跟随主角，片尾持续微推。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：POSE3 = dict(pos=(0.0, -9.9, 3.6), tgt=(0.0, 0.0, 0.30), lens=55, fstop=0.42, roll=0.0)
const tc = t - 8.4, crp = tc <= 0 ? 0 : 0.0092 * (tc < 0.6 ? tc * tc / 1.2 : tc - 0.3);。使用 1920×1080 横屏。

## 参数

- **原片重放区间**：mg-3d-render 原片 0–10 秒；1 倍速，总时长 10 秒。
- **镜头焦点接力**：POSE3 = dict(pos=(0.0, -9.9, 3.6), tgt=(0.0, 0.0, 0.30), lens=55, fstop=0.42, roll=0.0)
const tc = t - 8.4, crp = tc <= 0 ? 0 : 0.0092 * (tc < 0.6 ? tc * tc / 1.2 : tc - 0.3);

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/macro-hero-focus-relay/index.html) · [在库中查看](../../patterns.html#pattern/macro-hero-focus-relay)
