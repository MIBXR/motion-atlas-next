# 三层液浪漫屏

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-liquid 原片 3.8–5.95 秒；总时长 2.15 秒。三层不同方向和相位的波前依次漫屏，后沿退去时从液面边缘拉出四组字标种子。参数保持原作数值：  function sheet(delay, rdelay, u, amp, freq, ph0, lean, dx, dur = 0.46) {
  const sheetV = sheet(0.0, 0.14, 0.9, 80, 0.0115, 0.3, 0.02, 0.42, 0.62);  // s4: slower front (peak diff /1.3)    // main field (violet) L->R, fuses with blobs
  const sheetO = sheet(0.07, 0.07, 0.06, 85, 0.0102, 2.1, -0.03, -0.55); // tangerine R->L
  const sheetP = sheet(0.14, 0.0, 0.46, 90, 0.0125, 4.4, 0.04, 0.3);     // hot pink L->R, top sheet (crisp)
  "sheets_in": [
    4.035,
    4.105,
    4.175
  ],
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-liquid 原片 3.8–5.95 秒；1 倍速，总时长 2.15 秒。
- **三层液浪释滴参数**：  function sheet(delay, rdelay, u, amp, freq, ph0, lean, dx, dur = 0.46) {
  const sheetV = sheet(0.0, 0.14, 0.9, 80, 0.0115, 0.3, 0.02, 0.42, 0.62);  // s4: slower front (peak diff /1.3)    // main field (violet) L->R, fuses with blobs
  const sheetO = sheet(0.07, 0.07, 0.06, 85, 0.0102, 2.1, -0.03, -0.55); // tangerine R->L
  const sheetP = sheet(0.14, 0.0, 0.46, 90, 0.0125, 4.4, 0.04, 0.3);     // hot pink L->R, top sheet (crisp)
  "sheets_in": [
    4.035,
    4.105,
    4.175
  ],

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/phase-offset-liquid-flood/index.html) · [在库中查看](../../patterns.html#pattern/phase-offset-liquid-flood)
