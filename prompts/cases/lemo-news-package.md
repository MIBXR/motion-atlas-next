# 本周 AI 四件事 · 电视新闻包装

## 实现 Prompt

制作一支电视新闻包装影片。同一频道板、柠檬黄分类签与白色标题条组成连续包装；换镜时标题条、来源签与画面一起被带状遮罩切换。频道板砸入并缩至角标；串联单行翻入；上下半牌翻值；折线越阈值；地图推摇与信函弧线飞出。沿用以下制作方法：代码绘制的新闻图形、真实KOSPI收盘数据、Natural Earth欧洲轮廓，以及上游已提交的机房与晶圆示意底图。声音采用Release原混音：120 BPM新闻主题、弦乐与铜管、翻牌声和图形节点拟音；豆包TTS 2.0解说小明2.0中文旁白受火山引擎服务条款约束，排除在CC BY 4.0之外。可编辑入口：film/main.js → SCENES / WIPES / STRAP；film/main.js → KDATA / EUT / S4；source/vo/lines.json / source/mix.py。

## 动效 Token

- **标题条**：film/main.js:strap / layer / wipe；x=96，y=904，1250×104，分类签y=856；按每个镜头在wipe内部绘制。
- **翻牌**：film/main.js:flipTile / shotPrice；上下半分别裁切，.26秒完成一轮，220×130牌。

## 制作约束

- 影像、字体和数据替换后同步调整原作取帧与文字时间表。
- 声音与画面沿用同一来源时间，音轨默认关闭。

## 迁移

- `film/main.js → SCENES / WIPES / STRAP`：修改报道次序、带状转场和标题条。
- `film/main.js → KDATA / EUT / S4`：修改行情序列、地图与规格卡时刻。
- `source/vo/lines.json / source/mix.py`：修改旁白与原作采样配乐。

[打开 Demo](../../demos/cases/lemo-news-package/index.html) · [在库中查看](../../cases.html#case/lemo-news-package)
