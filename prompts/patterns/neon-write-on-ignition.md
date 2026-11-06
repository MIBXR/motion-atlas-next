# 霓虹描写通电

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-synthwave 原片 5.6–7.1 秒；总时长 1.5 秒。发亮笔头沿真实字形路径推进并留下暗玻璃管，通电节点按逐帧电平闪烁，最后整字稳定发光。参数保持原作数值：  const drawn = lvl > 0 ? TOTAL : p * TOTAL;
    strokeRange(g, drawn - 60, drawn, LIT);
  "neon_trace": [5.8, 6.6],
  "neon_strike": [[6.6, 1], [6.633, 0.15], [6.667, 1], [6.7, 1], [6.733, 0.08], [6.767, 0.5], [6.8, 0.85], [6.833, 1]],
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-synthwave 原片 5.6–7.1 秒；1 倍速，总时长 1.5 秒。
- **霓虹描写通电参数**：  const drawn = lvl > 0 ? TOTAL : p * TOTAL;
    strokeRange(g, drawn - 60, drawn, LIT);
  "neon_trace": [5.8, 6.6],
  "neon_strike": [[6.6, 1], [6.633, 0.15], [6.667, 1], [6.7, 1], [6.733, 0.08], [6.767, 0.5], [6.8, 0.85], [6.833, 1]],

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/neon-write-on-ignition/index.html) · [在库中查看](../../patterns.html#pattern/neon-write-on-ignition)
