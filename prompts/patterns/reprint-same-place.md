# 同地再印换时

## 实现 Prompt

复用来源案例lemo-printed-long-take的原作render(t)，重放“同地再印换时”。固定机位把同一片田地印四次，纸角揭开下一年的鹤群；每次新印先没有红冠，.45秒后单独压上稍有偏位的红版。参数与源码：film/timeline.js:17–20的peels=[38.9,39.7,40.4]为慢镜前时刻；film/scene.js:546–569双路rtA/rtB在.3秒内从右上角揭纸，成片映射后为39.3/40.1/40.8秒。；film/scene.js:551–565：每版t>=lastPeel+.45时亮红，uShift=(1.6*SS,−1.1*SS)，freshInk在.3–1秒间干燥。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：37.900000–42.000000秒；1倍速，共4.100000秒。

[打开 Demo](../../demos/patterns/reprint-same-place/index.html) · [在库中查看](../../patterns.html#pattern/reprint-same-place)
