# 线环熔成金章

## 实现 Prompt

复用来源案例的原作 window.renderAt(t)，按 index.html 内联配置 的 segments 以1倍速重放原片7.2–10秒，巧思时长2.8秒。圆环和拱门轮廓闭合后，线环收细蓄势并向内填成保留镂空拱门的金章，外缘过冲、镜头冲击、回声圈与扫光随落章出现，光脉沿原线回溯至种子后在末段正向流回金章。预备7.4–7.5秒；start: 7.5；swell: 0.367；const easeSwell = cubicBezier(0.24, 0.3, 0.2, 1);const ri = Math.max(0, MR * (1 - Math.min(1, e))); const ro = MR + 1.5 / c.z + MR * 0.04 * ov;overshoot: [7.6, 7.8, 7.93]；echo: [7.533, 7.933]；const EC = cues.echo, eq = clamp((t - EC[0]) / (EC[1] - EC[0]));7.55–8.45秒；const easePulse = cubicBezier(0.45, 0, 0.2, 1); const sp = TOTAL * (1 - easePulse(pu)); Math.exp(-(((S[im] - sp) / 300) ** 2))。8.95–9.5秒；bp = TOTAL * easeIO(bu) * 1.04 - 60；Math.exp(-(((S[im] - bp) / 240) ** 2))。const sh = clamp((t - 9.2) / 0.76);沿用原画面、字体与成品音轨，保持1920×1080、30fps；画面和音轨共用同一时刻映射，声音默认关闭。

## 参数

- **原片重放区间**：7.2–10秒，1倍速；巧思时长2.8秒。
- **收细预备与填面**：预备7.4–7.5秒；start: 7.5；swell: 0.367；const easeSwell = cubicBezier(0.24, 0.3, 0.2, 1);
- **径向填充**：const ri = Math.max(0, MR * (1 - Math.min(1, e))); const ro = MR + 1.5 / c.z + MR * 0.04 * ov;
- **过冲与回声**：overshoot: [7.6, 7.8, 7.93]；echo: [7.533, 7.933]；const EC = cues.echo, eq = clamp((t - EC[0]) / (EC[1] - EC[0]));
- **回溯光脉**：7.55–8.45秒；const easePulse = cubicBezier(0.45, 0, 0.2, 1); const sp = TOTAL * (1 - easePulse(pu)); Math.exp(-(((S[im] - sp) / 300) ** 2))。
- **正向回流**：8.95–9.5秒；bp = TOTAL * easeIO(bu) * 1.04 - 60；Math.exp(-(((S[im] - bp) / 240) ** 2))。
- **金属扫光**：const sh = clamp((t - 9.2) / 0.76);

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/line-ring-to-medallion/index.html) · [在库中查看](../../patterns.html#pattern/line-ring-to-medallion)
