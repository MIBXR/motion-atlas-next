# 贝塞尔极光漂移

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-aurora-glass 原片 0–10 秒；总时长 10 秒。邻近色椭圆光斑沿闭合贝塞尔轨道漂移，结合视差与非线性混色形成连续光场。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-aurora-glass 原片 0–10 秒；1 倍速，巧思时长 10 秒。
- **贝塞尔极光漂移**：L137: { col: PAL.violet, rx: 470, ry: 300, ang: 18, i: 1.15, path: loopBezier([[600, 300], [780, 240], [840, 420], [560, 460]], 30, 0.05) },；L139: { col: PAL.cyan, rx: 360, ry: 260, ang: 32, i: 1.0, path: loopBezier([[1500, 860], [1320, 700], [1160, 660], [1420, 980]], 26, 0.12) },；L813: blobs.set([p[0] - cam.x * 0.35, p[1] - cam.y * 0.35, b.rx, b.i], i * 4); blobE.set([b.ry, b.ang * D2R + 0.08 * Math.sin(t * 0.3 + i)], i * 2);

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/bezier-aurora-drift/index.html) · [在库中查看](../../patterns.html#pattern/bezier-aurora-drift)
