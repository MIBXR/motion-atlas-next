# 中轴散字收拢

## 实现 Prompt

复用来源案例的原作 window.renderAt(t)，按 index.html 内联配置 的 segments 以1倍速重放原片8.133–9.85秒，巧思时长1.717秒。字标入场节点到达后，字母按离中轴的距离错峰，从宽字距向最终位置收拢显现；标语随后抬入，两侧细线由亮点领绘向外展开。const word = 'ATELIER LINEA', size = 50, track = 0.46;start: 8.333；stagger: 0.045；dur: 0.95；const d = Math.abs(i - mid);const spread = (1 - e) * 0.22 * size * (i - mid);tagline: 8.75；rules: [9.25, 9.6]；hl = 24 * ru；gap = 1.2 * ts。沿用原画面、字体与成品音轨，保持1920×1080、30fps；画面和音轨共用同一时刻映射，声音默认关闭。

## 参数

- **原片重放区间**：8.133–9.85秒，1倍速；巧思时长1.717秒。
- **字标尺寸字距**：const word = 'ATELIER LINEA', size = 50, track = 0.46;
- **由中轴错峰**：start: 8.333；stagger: 0.045；dur: 0.95；const d = Math.abs(i - mid);
- **字母收拢**：const spread = (1 - e) * 0.22 * size * (i - mid);
- **标语与签章**：tagline: 8.75；rules: [9.25, 9.6]；hl = 24 * ru；gap = 1.2 * ts。

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/center-out-tracking-in/index.html) · [在库中查看](../../patterns.html#pattern/center-out-tracking-in)
