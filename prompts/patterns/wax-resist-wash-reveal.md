# 蜡笔防染显形

## 实现 Prompt

复用来源案例lemo-crayon-book的原作render(t)，实现“蜡笔防染显形”：白蜡笔星星先画入蜡覆盖场，水彩密度经过时按蜡覆盖量降低染色；三道宽刷交错扫过纸面，星星因为防染而从夜色中显出。参数与源码：film/world.js:STARS以mulberry(4242)固定生成250颗，drawStars绘入K.white；film/film.js在p.hf>=1时画入蜡层。；film/world.js:BANDS：27.9–29.9秒向右，30–32.1秒向左，32.5–34.7秒向右；覆盖y=-120到1655，重叠100/110px。；film/gl.js:wash：resist=.93，edge=1.6，gran=.6；水彩密度乘(1-.93*smoothstep(.12,.55,waxCoverage))。。按入口segments映射原片时刻，画面、字体与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：26.8–35.3秒；1倍速，总时长8.500000秒。

[打开 Demo](../../demos/patterns/wax-resist-wash-reveal/index.html) · [在库中查看](../../patterns.html#pattern/wax-resist-wash-reveal)
