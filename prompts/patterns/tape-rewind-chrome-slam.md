# 倒带冲入落版

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-synthwave 原片 3.667–5.1 秒；总时长 1.433 秒。磁带画面先倒退两帧并拖慢压暗，主拍时镀铬字标从放大态冲入，闪光、镜震和跑车加速同步释放。参数保持原作数值：  if (fr >= r0 && fr < r1) return (r0 - 1 - (fr - r0)) / FPS;                          // 2 frames backwards
  if (fr >= FS - 2 && fr < FS) { const k = clamp((t - (S0 - 3 / 30)) / (3 / 30)); sc = lerp(2.2, 1.0, eInQuart(k)); al = fr === FS - 2 ? .6 : 1; }
  else if (fr >= FS) { sc = 1 - .045 * Math.sin(uS * 24) * Math.exp(-uS * 7.5); al = 1; }
  const sh = fr >= FS ? 11 * Math.exp(-uS * 8.5) : 0;
  "music_gap": [4.02, 4.2],
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-synthwave 原片 3.667–5.1 秒；1 倍速，总时长 1.433 秒。
- **倒带冲入落版参数**：  if (fr >= r0 && fr < r1) return (r0 - 1 - (fr - r0)) / FPS;                          // 2 frames backwards
  if (fr >= FS - 2 && fr < FS) { const k = clamp((t - (S0 - 3 / 30)) / (3 / 30)); sc = lerp(2.2, 1.0, eInQuart(k)); al = fr === FS - 2 ? .6 : 1; }
  else if (fr >= FS) { sc = 1 - .045 * Math.sin(uS * 24) * Math.exp(-uS * 7.5); al = 1; }
  const sh = fr >= FS ? 11 * Math.exp(-uS * 8.5) : 0;
  "music_gap": [4.02, 4.2],

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/tape-rewind-chrome-slam/index.html) · [在库中查看](../../patterns.html#pattern/tape-rewind-chrome-slam)
