# 字按墨度排成图

## 实现 Prompt

用来源案例lemo-ascii-crt的原作render(t)重放“字按墨度排成图”。一句回复拆成同字母粒子；目标格的亮度经实测墨量坡选择字母和亮度档，字粒子由原字位置落位，地球部分先落到地平线后再升起。保留参数：film/main.js:MSG / RAMP_MSG / cellGlyph；film/term.js:makeRamp：只取I AM STILL HERE.中的非空格字符，以图集alpha测墨量，dim/normal/bold=.42/.7/1。；film/main.js:buildFall / partPos / sFall：T.fall0=33.6；18px缩到8px；淡入.2秒；落位1+.9exp(−dt/.12)。。按index.html中的segments映射时间，复用原作素材、字体和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：33.200000–40.200000秒；1倍速，总时长7.000000秒。

[打开 Demo](../../demos/patterns/text-sorts-into-image/index.html) · [在库中查看](../../patterns.html#pattern/text-sorts-into-image)
