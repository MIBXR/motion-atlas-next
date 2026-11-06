# 随旁白按笔顺写式

## 实现 Prompt

复用来源案例lemo-whiteboard的原作render(t)，重放“随旁白按笔顺写式”。将各个公式项分配给旁白词级时间窗口，单线字形在窗口内依笔顺书写；速度与引力两项修正写完后，再写出每天多出的38微秒。参数与源码：film/film.js:20–24的atS/atE从voices/words.json读取词边界；184–195分别安排speed、−7μs、gravity、+45μs、+38μs。；film/film.js:80的D调用Timeline.draw(pen,shapes,a,{by:b})；engine/wb.js的text将glyph.s按次序转换为笔画。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：56.3–70秒；1倍速，总时长13.700000秒。

[打开 Demo](../../demos/patterns/stroke-order-equation-sync/index.html) · [在库中查看](../../patterns.html#pattern/stroke-order-equation-sync)
