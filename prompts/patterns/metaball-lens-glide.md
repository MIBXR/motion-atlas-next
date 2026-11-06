# 拉丝玻璃珠与滑读透镜

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-aurora-glass 原片 4.3–7.1 秒；总时长 2.8 秒。控钮按压后以 SDF 平滑并合拉出玻璃珠，脱离后展开为胶囊透镜沿文字滑行放大，速度驱动弹簧拉伸。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-aurora-glass 原片 4.3–7.1 秒；1 倍速，巧思时长 2.8 秒。
- **控钮拉丝出玻璃珠**：L623: const ant = seg(t, cues.bead - 0.2, cues.bead) * (1 - seg(t, cues.bead, cues.bead + 0.25));；L625: const press = 1.14 * (1 + 0.08 * seg(t, cues.bead - 0.2, cues.bead));；L634: const dt = t - cues.snap, wob = Math.sin(TAU * 7.5 * dt) * Math.exp(-14 * dt) * 0.12;；L651: const beadK = t < 5.9 ? q('neck', 40) * kn[2] * (1 - seg(t, cues.snap - 0.16, cues.snap + 0.01)) + 0.6 : 0;
- **透镜沿句滑读**：L577: const beadRise = hermite([{ t: KN_T, v: [0, 0], m: [150, -6] }, { t: 5.1, v: [q('b1x', 42), q('b1y', -5)] }, { t: cues.snap, v: [q('b2x', 100), q('b2y', -12)] }, { t: 6.0, v: [170, -190] }]);；L579: const G0 = [q('g0x', -150), q('g0y', 36)], G1 = [q('g1x', -40), q('g1y', 40)];；L603: const t0 = 4.9, dt = 1 / 240; let sx = 0, sy = 0, vx = 0, vy = 0;；L604: const w = TAU * 2.0, z = 0.3;；L609: const tvx = (cur[0] - prev[0]) / dt * 0.00016, tvy = (cur[1] - prev[1]) / dt * 0.00016; prev = cur;；L599: const lensMag = keysS([[4.62, 1.0], [5.1, 1.14], [6.0, 1.36], [7.0, 1.32], [7.6, 1.26], [SETTLE, 1.2]], eSine);

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/metaball-lens-glide/index.html) · [在库中查看](../../patterns.html#pattern/metaball-lens-glide)
