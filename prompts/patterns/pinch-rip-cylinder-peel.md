# 夹纸裂页翻卷

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-collage 原片 7.21–8.37 秒；总时长 1.16 秒。手指夹住纸页上沿 → 锯齿裂缝向下展开，左右纸半错一步沿圆柱翻卷，露出反面和下一张红纸。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：const NS = 12, q = PI * CR / 2 / NS;
'-1': { a: [-20, 6, 10, 12], E: [330, 640, 980, 1320], R: [70, 110, 130, 130]
const fmap = (d, R) => d <= PI * R ? R * Math.sin(d / R) : PI * R - d;。使用 1920×1080 横屏。

## 参数

- **原片重放区间**：mg-collage 原片 7.21–8.37 秒；1 倍速，总时长 1.16 秒。
- **夹纸裂页翻卷**：const NS = 12, q = PI * CR / 2 / NS;
'-1': { a: [-20, 6, 10, 12], E: [330, 640, 980, 1320], R: [70, 110, 130, 130]
const fmap = (d, R) => d <= PI * R ? R * Math.sin(d / R) : PI * R - d;

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/pinch-rip-cylinder-peel/index.html) · [在库中查看](../../patterns.html#pattern/pinch-rip-cylinder-peel)
