# 新墨笔锋渐暗

## 实现 Prompt

复用来源案例的原作 window.renderAt(t)，按 index.html 内联配置 的 segments 以1倍速重放原片0–8.02秒，巧思时长8.02秒。笔尖经过路径点后，新画线段和笔锋先保持明亮，旧线按绘制年龄降低亮度；抬升段逐渐增亮，标志保持高亮。FLOOR[i] = 0.4; (1 - smooth(0.2, 1.5, age))。FLOOR[i] = 0.96;glowAt(sx, sy, 56 * fl, 0.09 * vis, '214,178,112');7.5–7.82秒；const vis = 1 - smooth(cues.tip_fade[0], cues.tip_fade[1], t);沿用原画面、字体与成品音轨，保持1920×1080、30fps；画面和音轨共用同一时刻映射，声音默认关闭。

## 参数

- **原片重放区间**：0–8.02秒，1倍速；巧思时长8.02秒。
- **旧线退亮**：FLOOR[i] = 0.4; (1 - smooth(0.2, 1.5, age))。
- **标志亮度**：FLOOR[i] = 0.96;
- **笔锋光晕**：glowAt(sx, sy, 56 * fl, 0.09 * vis, '214,178,112');
- **笔尖淡出**：7.5–7.82秒；const vis = 1 - smooth(cues.tip_fade[0], cues.tip_fade[1], t);

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/fresh-ink-aging/index.html) · [在库中查看](../../patterns.html#pattern/fresh-ink-aging)
