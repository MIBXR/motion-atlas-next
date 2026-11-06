# 海面遮罩吞日

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-morph 原片 2.2–4.6 秒；总时长 2.4 秒。海面升起，以同一水平边界裁掉太阳下半部，光芒变成波浪，随后海水上涌占满画面。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-morph 原片 2.2–4.6 秒；1 倍速，巧思时长 2.4 秒。
- **海面遮罩吞日**：L341: function heroClip(t) { if (t <= 2.3 || t >= 4.45) return null; return seaSurface(t) + 300 * EIO(clamp((t - 3.84) / 0.13)); }；L342: function seaSurface(t) { if (t < cues.wipes.sea) return H + 10; return lerp(H + 10, 560, EO(clamp((t - cues.wipes.sea) / 0.5))); }；L436: function seaTop(t) { if (t < WP.flood) return seaSurface(t); return lerp(560, -80, EIO(clamp((t - WP.flood) / 0.42))); }

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/sea-mask-sunset/index.html) · [在库中查看](../../patterns.html#pattern/sea-mask-sunset)
