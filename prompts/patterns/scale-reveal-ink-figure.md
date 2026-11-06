# 拉远显微小人物

## 实现 Prompt

用来源案例lemo-ink-wash的原作render(t)重放“拉远显微小人物”。从人物所在的局部连续拉远，按对数插值缩小世界，直到整卷山水、装裱与轴头进入画幅，人物成为画中小点，朱印落下。保留参数：film/passage.js:renderScroll：42.6–45秒eio，z=exp(lerp(log(1.25),log(.315),u))，cam.x=1150→2800、y=720→700。；同函数：hero s=1.7；43.7秒起题跋，44.48秒起印章150*(1.25−.25*eo(k))压下，44.6秒落印，45.6秒起片尾。。按index.html内联segments映射原片时刻，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：40.400000–48.000000秒；1倍速，总时长7.600000秒。

[打开 Demo](../../demos/patterns/scale-reveal-ink-figure/index.html) · [在库中查看](../../patterns.html#pattern/scale-reveal-ink-figure)
