# 字即布景

## 实现 Prompt

用来源案例lemo-spy-titles的原作render(t)重放“字即布景”。先排出一行可读字幕，再把字母和单词作为柱廊、列车与赌场道具的支撑；剪影人物在字的前后穿行。保留参数：film/glyph.js:loadFonts / layout / drawLine：League Gothic经opentype.js轮廓采样与rough缓存，每字重剪边；纸缝和阴影由paper.js:piece统一绘制。；film/story.js:T.airport=B(6)、train=B(10)、roulette=B(13)、HIT.pupil=B(14,3)；scenes.js:airport / train / casino以layout组织场景。；film/film.js:sAirport先全行再推近；sTrain把单词作为车厢，sCasino将字幕留出2.2倍轮盘半径的空隙；角色按tw(t)的12fps定位。。按index.html内联segments映射原片时刻，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：9.545455–25.000000秒；1倍速，总时长15.454545秒。

[打开 Demo](../../demos/patterns/type-as-architecture/index.html) · [在库中查看](../../patterns.html#pattern/type-as-architecture)
