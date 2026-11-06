# 厚边花字弹入

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-hanazi 原片 0–2.7 秒；mg-hanazi 原片 5.73–7.83 秒；mg-hanazi 原片 7.9–10 秒；总时长 6.9 秒。逐字 cue 到达 → 挤出、彩边、白边、渐变与高光一起弹入，驻留轻摆并按标题拍点依次跳动。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：function spring(t, z = 0.517, w = 22)
const hold = clamp((u - .22) / .35), wf = o.wf ?? 1.15;
white: 13, outer: 12
gloss: .55。使用 1080×1920 竖屏。

## 参数

- **原片重放区间**：mg-hanazi 原片 0–2.7 秒；mg-hanazi 原片 5.73–7.83 秒；mg-hanazi 原片 7.9–10 秒；1 倍速，总时长 6.9 秒。
- **厚边花字弹入**：function spring(t, z = 0.517, w = 22)
const hold = clamp((u - .22) / .35), wf = o.wf ?? 1.15;
white: 13, outer: 12
gloss: .55

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/layered-hanazi-spring-pop/index.html) · [在库中查看](../../patterns.html#pattern/layered-hanazi-spring-pop)
