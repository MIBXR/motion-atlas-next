# 隧道黑场换景

## 实现 Prompt

复用来源案例lemo-paper-lantern的原作render(t)重放“隧道黑场换景”。相机推向隧道口，列车被前层山崖逐节遮住，场景在25.3–25.5秒淡至黑；黑场停顿后25.75秒硬切河谷，全套场景与色阶由雪山冷蓝切到河谷青绿，声音同步留出短暂停顿。参数与源码：film/src/shots.js:s3.update相机z=.38→.24，目标x=.02→.12；s3.grade使用fade=1-ss(seg(t,H.portal,H.dark[0]))；portal=25.3，dark=[25.5,25.75]。；film/timeline.json:SHOTS的S4=[S4,25.75,cut]；film/src/main.js以cut跳过溶解。HIT.dark跨度.25秒，在30fps帧格覆盖8帧约.266667秒；双语字幕L4按独立cues于25.63秒结束。；source/mix.py:music在portal+.1之后到dark[1]间置零；轮声避开dark区间，fx在dark[0]+.02到dark[1]-.02间置零；音轨沿用原作最终混音。。以入口segments映射原片时间，保留原作字体、纸层、灯光和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：24.9–26.5秒；1倍速，共1.600000秒。

[打开 Demo](../../demos/patterns/tunnel-blink-black/index.html) · [在库中查看](../../patterns.html#pattern/tunnel-blink-black)
