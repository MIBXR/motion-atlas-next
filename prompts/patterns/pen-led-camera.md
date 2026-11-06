# 笔尖牵引镜头与停笔节奏

## 实现 Prompt

复用来源案例的原作 window.renderAt(t)，按 index.html 内联配置 的 segments 以1倍速重放原片0–10秒，巧思时长10秒。笔尖在转角密集处按加权路径长度减速，并在重复标记处停笔；镜头以高斯采样跟随，随停笔刹停与续笔追赶，再把焦点交给标志和海报。const KCORN = 9; (1 + KCORN * Math.min(CORN[i], 0.3))。2.083–2.233、3.5–3.65、4.75–4.9秒。const HA = 0.133, HR = 0.5; const dt = k * 0.05；sigma: 0.3；lead: 0.08；hook lag: 0.067。logo_from: 6.0；logo_to: 7.3；poster_from: 7.8；poster_to: 9.0；end_push amount: 0.03。env = np.clip(spd / 3000.0, 0, 1) ** 0.6 * (tt < T_END + 0.02)；env = filters.lpf(env.astype(np.float32), 30.0)。沿用原画面、字体与成品音轨，保持1920×1080、30fps；画面和音轨共用同一时刻映射，声音默认关闭。

## 参数

- **原片重放区间**：0–10秒，1倍速；巧思时长10秒。
- **转角减速**：const KCORN = 9; (1 + KCORN * Math.min(CORN[i], 0.3))。
- **停笔区间**：2.083–2.233、3.5–3.65、4.75–4.9秒。
- **镜头刹停追赶**：const HA = 0.133, HR = 0.5; const dt = k * 0.05；sigma: 0.3；lead: 0.08；hook lag: 0.067。
- **焦点交接**：logo_from: 6.0；logo_to: 7.3；poster_from: 7.8；poster_to: 9.0；end_push amount: 0.03。
- **笔触响度**：env = np.clip(spd / 3000.0, 0, 1) ** 0.6 * (tt < T_END + 0.02)；env = filters.lpf(env.astype(np.float32), 30.0)。

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/pen-led-camera/index.html) · [在库中查看](../../patterns.html#pattern/pen-led-camera)
