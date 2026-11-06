# 一笔斩浪成字

## 实现 Prompt

用来源案例lemo-ink-wash的原作render(t)重放“一笔斩浪成字”。“水”前三笔按书写顺序出现，静默后末笔沿捺势延伸为飞白斩线；同一笔完成字与动作，斩线扫完才裁开浪体。保留参数：film/story.js:T.w1=[28.5,29]、w2=[29.2,29.75]、w3=[29.95,30.35]；hush=30.5，cut=32.4，cutEnd=32.57。；film/glyph.js:cutStroke从[62,59]等字格坐标沿捺势延伸至[2200,640]；film/climax.js:init使用BOX=[300,110,520]，w=17、dry=.6。；film/climax.js:renderWrite：k=clamp((t-cutEnd)/2.3)；上半旋转−.22、上移330px，下半压为.4倍、下移240px；喷点120个。。按index.html内联segments映射原片时刻，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：26.800000–35.000000秒；1倍速，总时长8.200000秒。

[打开 Demo](../../demos/patterns/decisive-stroke-glyph/index.html) · [在库中查看](../../patterns.html#pattern/decisive-stroke-glyph)
