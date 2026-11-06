# 多源同一时间轴

## 实现 Prompt

用来源案例lemo-visual-investigation的原作render(t)重放“多源同一时间轴”。电报卡与气象记录指向同一分钟游标；五来源板把新闻片、照片、证词、原声和报告连向同一舱段，随后报告、照片与新闻片按各自覆盖时刻在同一T+秒表下依次亮起。保留参数：film/index.html:PKF / playhead / sWait；15:40–18:14，TG电报引线连接风图的同一时间轴。；film/index.html:sOrigin；23.8–31.8秒，29秒起五路红线指向4–5号气囊。；film/index.html:sRun；31.8–38.6秒，报告T+0、照片约T+2、新闻片约T+7开始，T+32共同停住。。重放区间由入口segments配置，来源素材与音轨直接复用。

## 参数

- **原片重放区间**：6.3–12.3秒；23.8–38.6秒；1倍速，总时长20.8秒。

[打开 Demo](../../demos/patterns/multi-source-timeline/index.html) · [在库中查看](../../patterns.html#pattern/multi-source-timeline)
