# 剪影弧线飞出

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-collage 原片 4.46–7.7 秒；总时长 3.24 秒。地球、鹰或蝴蝶 cue 到达 → 剪影沿二次曲线飞出并落位，按物件叠加落地压扁、俯冲或双姿势振翅。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：const fl = 6, u = clamp(k / fl), e = eOut(u);
if (it.mode === 'swoop' && Math.floor(tl * 6 + 1e-4) % 2) { sy = 0.74; skx = -0.12; r += 3 * DEG; }
if (it.mode === 'flutter') sx = k < fl ? [1, 0.35][K(tl) % 2] : [1, 0.58][Math.floor(tl * 6 + 1e-4) % 2];。使用 1920×1080 横屏。

## 参数

- **原片重放区间**：mg-collage 原片 4.46–7.7 秒；1 倍速，总时长 3.24 秒。
- **弧线飞出振翅**：const fl = 6, u = clamp(k / fl), e = eOut(u);
if (it.mode === 'swoop' && Math.floor(tl * 6 + 1e-4) % 2) { sy = 0.74; skx = -0.12; r += 3 * DEG; }
if (it.mode === 'flutter') sx = k < fl ? [1, 0.35][K(tl) % 2] : [1, 0.58][Math.floor(tl * 6 + 1e-4) % 2];

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/cutout-arc-flight-flutter/index.html) · [在库中查看](../../patterns.html#pattern/cutout-arc-flight-flutter)
