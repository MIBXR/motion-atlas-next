# 静音可读字幕新闻

## 实现 Prompt

用来源案例的原作render(t)实现“静音可读字幕新闻”。大字逐句字幕与每镜的数据标签承担完整信息，损失数字、报告反转、双栏账本、图表和两句结论按同一时间线展开。保留参数：film/main.js:CAP / captions，中文88px、英文33px，左对齐，一种语言一行；timeline.json提供同一组中英内容与时刻。；film/main.js:shotDoc6 / shotStock / shotSplit / shotStress / shotLoss，+6%报告原文、1305540与1453600计数及图形标签独立可读。；film/main.js:CAPS来自timeline.json，50.4与52.2秒两句字幕使用1.25倍字号；声音沿用同区间成片音轨。。按index.html内联segments定位原片，复用原作素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-caption-news：0–5秒；lemo-caption-news：13–23.5秒；lemo-caption-news：50–54.5秒；1倍速，总时长20.000000秒。

[打开 Demo](../../demos/patterns/silent-caption-news/index.html) · [在库中查看](../../patterns.html#pattern/silent-caption-news)
