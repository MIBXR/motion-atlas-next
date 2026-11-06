# 音量包络放射声波

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-aurora-glass 原片 0.25–7.2 秒；总时长 6.95 秒。从发光球向两侧按距离延迟读取配乐的 100Hz 音量包络，条高随包络变化，球核同步呼吸。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-aurora-glass 原片 0.25–7.2 秒；1 倍速，巧思时长 6.95 秒。
- **音量包络放射声波**：L364: const OX = q('orbx', 178), cy = 122, maxH = 80, bw = 6, step = 11.5;；L367: const tt = t - dist * 0.0042;；L371: const h = Math.max(5, maxH * on * (0.1 + 0.9 * Math.pow(e, 0.75) * shape * jitter));

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/envelope-radiating-waveform/index.html) · [在库中查看](../../patterns.html#pattern/envelope-radiating-waveform)
