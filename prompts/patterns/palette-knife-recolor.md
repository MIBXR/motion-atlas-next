# 刮刀重涂换色

## 实现 Prompt

复用来源案例lemo-impasto的原作render(t)，实现“刮刀重涂换色”：同一笔触保存原色与冷灰亮度，着色器按笔触到重涂原点的距离延迟切换；撑伞和终和弦触发不同的reveal / revC波，把已有笔触重新铺成彩色。参数与源码：film/film.js:shotGirl使用reveal=T.pop、revDur=.25、revC=[GOX+100,GOY-1300,2200]；shotReact以T.bowIn触发，revDur=.2。；film/film.js:shotFinale：reveal=T.chord-.05，revDur=.18，revC=[ARCH.x,ARCH.y,1500]；film/engine/impasto.js按距离与revDur计算颜色混合。。按入口segments映射原片时刻，画面、字体与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：14.6–16.5秒；17.5–19.3秒；31.2–33.5秒；1倍速，总时长6.000000秒。

[打开 Demo](../../demos/patterns/palette-knife-recolor/index.html) · [在库中查看](../../patterns.html#pattern/palette-knife-recolor)
