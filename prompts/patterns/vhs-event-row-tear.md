# 磁带行撕色偏

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-synthwave 原片 0.17–9.867 秒；总时长 9.697 秒。故障节点按固定帧种子选择行段错位，叠加色偏与一次垂直跳帧，随后恢复稳定画面。参数保持原作数值：    float gOn = uGlitch * step(.82, h21(vec2(gRow, uGSeed)));
  let glv = 0, gseed = 0; for (const gt of CUES.glitches) { const g0 = HIT(gt); if (fr >= g0 && fr < g0 + 2) { glv = 1; gseed = gt * 13.7 + fr; } }
  V.uVSlip.value = fr === HIT(CUES.vslip) ? 12 : fr === FSTOP ? -12 : 0;
  "glitches": [0.37, 0.63, 1.53, 2.47, 3.23, 6.07, 7.77, 9.37],
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-synthwave 原片 0.17–9.867 秒；1 倍速，总时长 9.697 秒。
- **磁带行撕色偏参数**：    float gOn = uGlitch * step(.82, h21(vec2(gRow, uGSeed)));
  let glv = 0, gseed = 0; for (const gt of CUES.glitches) { const g0 = HIT(gt); if (fr >= g0 && fr < g0 + 2) { glv = 1; gseed = gt * 13.7 + fr; } }
  V.uVSlip.value = fr === HIT(CUES.vslip) ? 12 : fr === FSTOP ? -12 : 0;
  "glitches": [0.37, 0.63, 1.53, 2.47, 3.23, 6.07, 7.77, 9.37],

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/vhs-event-row-tear/index.html) · [在库中查看](../../patterns.html#pattern/vhs-event-row-tear)
