# 显像管线点收屏

## 实现 Prompt

调用mg-synthwave原作renderAt(t)，重放9.467—9.966666667秒的显像管线点收屏，沿用原作CRT帧表、画面与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：mg-synthwave原片9.467—9.966666667秒，1倍速，时长0.499666667秒。
- **显像管线点收屏参数**：  if (fr >= st) return CUES.stop + (Math.floor(fr / 2) * 2 - st) / FPS * .5;           // STOP: tape winds down
const CRT = { 295: [1, .30, .25, 0], 296: [1, .0019, 1, .030], 297: [.26, .0019, 1.1, .022], 298: [.0073, .013, 1.3, .036], 299: [.0055, .010, .35, .012] };
    col += vec3(1., .92, .98) * uCrtG * exp(-ly*ly / 1.1) * exp(-lx*lx / 5.);                 // the hot line / dot

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/crt-line-dot-shutdown/index.html) · [在库中查看](../../patterns.html#pattern/crt-line-dot-shutdown)
