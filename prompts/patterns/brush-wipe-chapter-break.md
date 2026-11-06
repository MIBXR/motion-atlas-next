# 笔刷横扫换章

## 实现 Prompt

复用 pdoom-video 原作的异步 renderAt(t)，按 index.html 内联 segments 重放“笔刷横扫换章”，总时长2.6秒。WIPES 只列 1.5、38.5、73.0、109.4 秒。drawWorld 在边界两侧各 WIPE_TR=.3 秒调用 wipe；五道有毛边与木炭排线的笔刷带略倾斜，先以 easeOut 从左盖满，再以 ease 向右拖出。两章在全盖住的中点切换。 film/src/timeline.js:74–78：n=5，bh=(H+420)/5+40；rotate(-.1)；错峰 d=[0,.14,.06,.18,.1]。 film/src/timeline.js:79–87：横向 -300→W+400；washOp=255，fillOp=70，bleed=.05，tex=.8，border=.6；charcoal hatch d=44、w=.8。 film/src/timeline.js:72：clayDk/clay、indigo/violet、teal/sap、violet/rose，依次对应四个章界。 保留原画面、固定版本 p5 与 p5.brush、完整字体和同区间 MP3，使用1920×1080、24fps。声音默认关闭，减少动态时暂停在预览帧。

## 参数

- **章界**：film/src/timeline.js:11–12：WIPES=[1.5,38.5,73.0,109.4]；WIPE_TR=.3，单次共 .6 秒。
- **进出缓动**：film/src/timeline.js:40/73–79：p=(t-(b-.3))/.6；p<.5 用 easeOut 盖住，p≥.5 用 ease 揭开。
- **重放区间**：原片37.9–39.2秒、72.4–73.7秒，巧思总时长2.6秒。

## 迁移

- `index.html 内联配置 → segments`：设置原片起止时刻，画面与音轨使用相同映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴节点与减少动态的停留时刻。

[打开 Demo](../../demos/patterns/brush-wipe-chapter-break/index.html) · [在库中查看](../../patterns.html#pattern/brush-wipe-chapter-break)
