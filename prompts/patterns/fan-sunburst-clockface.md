# 对称扇面成钟

## 实现 Prompt

复用来源案例lemo-art-deco的原作render(t)，重放“对称扇面成钟”。八位扇舞者按八分音符开扇，镜头升成八向对称俯拍旭日纹；舞者转位、展开的扇面与两根金针合为十二点钟面。参数与源码：film/shots_misc.js:83–115：N=8，fanT(i)=TUTTI+i*B/2，.22秒开扇，rot=(t−BALL1)*.45。；film/shots_misc.js:116–144：form=eio(seg(t,BALL2,clockForm))；hour=[0,0,2,4,5,7,8,10]，前两人到半径115/260，指向XII，钟圈半径520。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：42.066897–48.273793秒；1倍速，共6.206897秒。

[打开 Demo](../../demos/patterns/fan-sunburst-clockface/index.html) · [在库中查看](../../patterns.html#pattern/fan-sunburst-clockface)
