# 蜜蜂账本 · 字幕新闻

## 实现 Prompt

制作“蜜蜂账本 · 字幕新闻”：美国一年损失130万箱蜜蜂，总数却上涨6%；大字字幕、原报告高亮、双栏账本、图表与地图逐项解释养蜂人的补建。所有信息由可读字幕和数据图形承担；一镜一事实，在损失与补建的对照后给出结论，画面内保留素材署名。画面：USDA NASS报告、USDA与USGS照片和视频、Wikimedia Commons的CC BY蜜蜂视频与照片、Natural Earth州界。运动：大字逐句进入，计数、分屏、逐格高亮、原文荧光标记、折线与排序条形图、州界遮罩接杏花照片。声音：120 BPM原配乐、MuldjordKit鼓组、蜜蜂自然声、两次音乐硬停、Kokoro af_bella旁白。实现文件为film/main.js，保留真实数据、素材署名和原片音轨，按1920×1080舞台的原作render(t)逐帧定位。

## 动效 Token

- **源码时间线**：film/main.js的SHOTS/CAPS；段落见rhythm.beats。

## 制作约束

- 素材、数据、字体与时间线由原作文件直接驱动。

## 迁移

- `film/main.js`：修改画面、时间线或对应数据；参数位置见该文件。

[打开 Demo](../../demos/cases/lemo-caption-news/index.html) · [在库中查看](../../cases.html#case/lemo-caption-news)
