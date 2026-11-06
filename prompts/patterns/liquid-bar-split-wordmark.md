# 液条断颈成字

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-liquid 原片 5.55–7.1 秒；总时长 1.55 秒。液体在主拍前挤成横条，主拍沿字缝断颈，每段距离场切换为字形并弹开，碎滴与光环跟随冲量。参数保持原作数值：  const massY = word.massY ?? word.baseY - 100, SLOT = 0.55;   // v5 sets word.massY (CJK ink centre)
        const m = clamp((ts * 30 - 0.6 * i + 1.5) / 2);
        const tBr = tSnap + (br.i + 0.5) / 30;
        S.ring = [960, massY + 10, 40 + 1360 * kr, 0.62 * (1 - 0.45 * kr) * (1 - smooth(inv(5 / 30, 12 / 30, tr)))];
  "logo_snap": 6.4,
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-liquid 原片 5.55–7.1 秒；1 倍速，总时长 1.55 秒。
- **液条断颈成字参数**：  const massY = word.massY ?? word.baseY - 100, SLOT = 0.55;   // v5 sets word.massY (CJK ink centre)
        const m = clamp((ts * 30 - 0.6 * i + 1.5) / 2);
        const tBr = tSnap + (br.i + 0.5) / 30;
        S.ring = [960, massY + 10, 40 + 1360 * kr, 0.62 * (1 - 0.45 * kr) * (1 - smooth(inv(5 / 30, 12 / 30, tr)))];
  "logo_snap": 6.4,

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/liquid-bar-split-wordmark/index.html) · [在库中查看](../../patterns.html#pattern/liquid-bar-split-wordmark)
