# 逐版套印成画

## 实现 Prompt

复用来源案例lemo-ukiyoe的原作render(t)，实现“逐版套印成画”：空纸上的关键线、蓝、绿、红四块色版依次用带噪声的斜向巴连遮罩印入，同时消除各版的入场位移，保留固定套印偏差；浪后空纸再次按四版重印。参数与源码：film/story.js:T.print1=[.35,1.05,1.70,2.30]，T.print5=[32.2,32.7,33.2,33.7]；REVEAL_DUR=.34秒。；film/main.js:REG=[[0,0],[2.2,-1.3],[-1.8,1.9],[1.5,2.2]]，SHIFT=[[4,-5],[-6,4],[5,5],[-5,-4]]；revFor / drawSheet调用print.js:stampLayer / stampFn。。按入口segments映射原片时刻，画面、字体与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：0–3.1秒；30.4–34.5秒；1倍速，总时长7.200000秒。

[打开 Demo](../../demos/patterns/block-by-block-print-reveal/index.html) · [在库中查看](../../patterns.html#pattern/block-by-block-print-reveal)
