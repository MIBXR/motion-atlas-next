# 移轴焦带

## 实现 Prompt

调用来源案例原作render(t)重放“移轴焦带”。以主体的屏幕投影高度定位一条清晰窄带，带外距离产生有符号散焦并与物理景深组合；带宽与追踪目标一起引导注意。 参数：film/main.js:tiltCenter追踪薇伦、广景固定.34/.36；film/post_ts.js:tiltAmt=17、tiltW=.075、tiltF=.3，与物理散焦取有符号合成。 使用index.html的segments映射原片时刻，复用来源素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-hd-2d 5.500000–10.000000秒；1倍速，总时长4.500000秒。

[打开 Demo](../../demos/patterns/tilt-shift-focus-band/index.html) · [在库中查看](../../patterns.html#pattern/tilt-shift-focus-band)
