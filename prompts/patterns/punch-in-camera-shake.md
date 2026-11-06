# 分级急推镜震

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-collage 原片 1.13–7.7 秒；mg-hanazi 原片 4.7–6.2 秒；总时长 8.07 秒。拍点到达 → 镜头分级急推，每级在少数帧内完成推近、过冲与镜震，之后继续缓推或加强颤动。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：z = [1.11, 1.075, 1.056, 1.05][kp]; cx = [12, -8, 3, 0][kp]; cy = [26, -14, 6, 0][kp];
if (q6 >= 5.5 - 1e-4) { z = 1 + 0.022 * eIO((q6 - 5.5) / 2.0); px = 900; py = 540; }；const u = tt - p, e = E.outExpo(clamp(u / (2 * FR)));
os = 1 + .03 * Math.exp(-Math.pow((u - 1.6 * FR) / (.9 * FR), 2))
9 + 4 * k
"pushZ": [
  1.4,
  2.0,
  2.9
 ]。横屏来源使用 1920×1080，竖屏来源使用 1080×1920。

## 参数

- **原片重放区间**：mg-collage 原片 1.13–7.7 秒；mg-hanazi 原片 4.7–6.2 秒；1 倍速，总时长 8.07 秒。
- **逐格俯拍冲镜**：z = [1.11, 1.075, 1.056, 1.05][kp]; cx = [12, -8, 3, 0][kp]; cy = [26, -14, 6, 0][kp];
if (q6 >= 5.5 - 1e-4) { z = 1 + 0.022 * eIO((q6 - 5.5) / 2.0); px = 900; py = 540; }
- **预警三连推**：const u = tt - p, e = E.outExpo(clamp(u / (2 * FR)));
os = 1 + .03 * Math.exp(-Math.pow((u - 1.6 * FR) / (.9 * FR), 2))
9 + 4 * k
"pushZ": [
  1.4,
  2.0,
  2.9
 ]

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/punch-in-camera-shake/index.html) · [在库中查看](../../patterns.html#pattern/punch-in-camera-shake)
