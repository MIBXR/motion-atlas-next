# 镂空即光

## 实现 Prompt

复用来源案例lemo-papercut-red的原作render(t)，实现“镂空即光”：团花在圆形范围内反取alpha得到孔洞蒙版；背光使孔洞透出暖光，同一蒙版压扁投到雪地，再与年兽alpha相交落到脸部，纸上剪掉的形状成为照明。参数与源码：film/tuanhua.js:tuanhuaHoles：圆内孔洞为白、红纸与圆外透明；film/world.js读取同一蒙版投地。；film/main.js:shotNianClose调用addMasked，PM=[k,.05*k,-.04*k,.97*k,fc.x,fc.y]，k=C[0]*.5；暖白alpha=.85 blur=.5，橙色alpha=.4 blur=6。；film/light.js:addMasked把蒙版限制在NLc人物alpha中，以lighter叠加。。按入口segments映射原片时刻，画面、字体与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：31.25–35.3秒；1倍速，总时长4.050000秒。

[打开 Demo](../../demos/patterns/holes-are-light/index.html) · [在库中查看](../../patterns.html#pattern/holes-are-light)
