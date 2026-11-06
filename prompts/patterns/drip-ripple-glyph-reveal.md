# 末滴涟漪显字

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-liquid 原片 6.9–9.7 秒；总时长 2.8 秒。末滴落地后涟漪从落点传播，标语字形按距落点的距离延迟显现、抬入并去模糊。参数保持原作数值：  const hero = { x: (x0r + x1r) / 2, y: pyBest - 6, rMax: 25, tLand: cues.drip_land };
        S.rip = { x: hero.x, y: FY, age: tl, amp: 1 };
          const tPass = 0.02 + Math.abs(cx - rip.x) / 2000 + li * 0.06;   // r2: wave spreads outward from the splash, done in ~0.5 s
          a = smooth(k); dy = 8 * (1 - flung(k)); blur = 4 * (1 - smooth(inv(0, 0.7, k)));
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-liquid 原片 6.9–9.7 秒；1 倍速，总时长 2.8 秒。
- **末滴涟漪显字参数**：  const hero = { x: (x0r + x1r) / 2, y: pyBest - 6, rMax: 25, tLand: cues.drip_land };
        S.rip = { x: hero.x, y: FY, age: tl, amp: 1 };
          const tPass = 0.02 + Math.abs(cx - rip.x) / 2000 + li * 0.06;   // r2: wave spreads outward from the splash, done in ~0.5 s
          a = smooth(k); dy = 8 * (1 - flung(k)); blur = 4 * (1 - smooth(inv(0, 0.7, k)));

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/drip-ripple-glyph-reveal/index.html) · [在库中查看](../../patterns.html#pattern/drip-ripple-glyph-reveal)
