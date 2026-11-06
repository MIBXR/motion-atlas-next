# 中轴开门转场

## 实现 Prompt

复用来源案例lemo-art-deco的原作render(t)，重放“中轴开门转场”。旧镜头成为从中缝分开的左右门扇，左右外缘为铰链，门扇在水平方向缩短并加阴影露出新镜；结尾两片电梯门反向合拢。参数与源码：film/film.js:44–65：e=eio(seg(p,.12,1))，每扇w=960*(1−e)，旧画面左右半幅被缩放到外侧，门边阴影强度.55*e。；film/film.js:32–40：archOpen→street、snare→stair、doors→ROOF0采用split；DOORS0→DOORS1用close，关闭后显示片尾。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：4.900000–6.550000秒；1倍速，共1.650000秒。

[打开 Demo](../../demos/patterns/axis-door-transition/index.html) · [在库中查看](../../patterns.html#pattern/axis-door-transition)
