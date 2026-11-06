# 液团拉丝跃起

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-liquid 原片 1.3–4.4 秒；总时长 3.1 秒。液团起跳时拉出细颈，细颈变细断裂、两端回弹，液团沿抛物线并入大液团或落下，引出后续液浪。参数保持原作数值：  const MX = 960, GH = 5000, TH = 0.34;
  hops.forEach((h) => { const d = drops[h.who]; h.side = Math.sign(d.x - MX); h.tTake = h.tc - TH; h.x0 = d.x; h.x1 = MX + h.side * 42; h.vy = GH * TH / 2 + 60 / TH; });
          if (tt < 0.09 && rs === 1) {                        // take-off neck to the floor, snapping
  else { float w = exp(-k*(d-f.m)); f.s += w; f.g += w*g; f.u += w*u; }
  const tLeap = cues.leap, tApex = cues.apex, tImpact = 4.0;
          const rm = lerp(14, 0.7, Math.pow(k, 0.9));
  const GL = 3750;                                      // leap gravity (surface-tension jump reads floatier)
  "thread_snap": 3.433,
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-liquid 原片 1.3–4.4 秒；1 倍速，总时长 3.1 秒。
- **跳滴拉丝并团参数**：  const MX = 960, GH = 5000, TH = 0.34;
  hops.forEach((h) => { const d = drops[h.who]; h.side = Math.sign(d.x - MX); h.tTake = h.tc - TH; h.x0 = d.x; h.x1 = MX + h.side * 42; h.vy = GH * TH / 2 + 60 / TH; });
          if (tt < 0.09 && rs === 1) {                        // take-off neck to the floor, snapping
  else { float w = exp(-k*(d-f.m)); f.s += w; f.g += w*g; f.u += w*u; }
- **液团拔丝跃起参数**：  const tLeap = cues.leap, tApex = cues.apex, tImpact = 4.0;
          const rm = lerp(14, 0.7, Math.pow(k, 0.9));
  const GL = 3750;                                      // leap gravity (surface-tension jump reads floatier)
  "thread_snap": 3.433,

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/liquid-neck-leap/index.html) · [在库中查看](../../patterns.html#pattern/liquid-neck-leap)
