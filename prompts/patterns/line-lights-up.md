# 逐行点亮原文

## 实现 Prompt

用来源案例的原作render(t)实现“逐行点亮原文”。保留扫描文档的全部原文，按指定行的坐标推进高亮前沿，让正在引用的句子变亮或被荧光笔覆盖。保留参数：lemo-archive-lighttable film/film.js:TG_DATE / TG_SUCC / TG_57L / NEWS_LINE / tgSweep / FS.band，2.667/4/7.333秒电报三行、12秒剪报行按扫描坐标点亮并压暗邻文。；lemo-caption-news film/main.js:paper / shotDoc6 / shotQuote，以220dpi的PT比例把PDF行框投到图片，multiply高亮宽度按eo(seg(...))推进，13.28秒标题持续.45秒。。按index.html内联segments定位原片，复用原作素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-archive-lighttable：2.5–9.3秒；lemo-archive-lighttable：11.5–13.3秒；lemo-caption-news：13–16秒；lemo-caption-news：27.5–30秒；1倍速，总时长14.100000秒。

[打开 Demo](../../demos/patterns/line-lights-up/index.html) · [在库中查看](../../patterns.html#pattern/line-lights-up)
