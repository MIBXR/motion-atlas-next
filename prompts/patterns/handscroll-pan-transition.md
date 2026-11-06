# 画卷横移转场

## 实现 Prompt

复用来源案例lemo-ukiyoe的原作render(t)，实现“画卷横移转场”：五幅画按SLOT从右向左铺在同一装裱长卷，相机在两幅画中心间横移，穿过260px装裱留缝后下一景到位，三次横移逐渐加快。参数与源码：film/story.js:GAP=260，SW=1920+GAP，SLOT(i)=(4-i)*SW。；film/story.js:T.pan12=[10.5,11.5]、pan23=[16.4,17.3]、pan34=[22.3,22.9]；film/main.js:camera用eio插值中心；第三次zoom由1.065回到1。。按入口segments映射原片时刻，画面、字体与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：10.1–11.9秒；16–17.7秒；21.95–23.3秒；1倍速，总时长4.850000秒。

[打开 Demo](../../demos/patterns/handscroll-pan-transition/index.html) · [在库中查看](../../patterns.html#pattern/handscroll-pan-transition)
