# 多格倒数合一

## 实现 Prompt

用来源案例lemo-countdown的原作render(t)重放“多格倒数合一”。倒数原声逐个打开3×3布局的摄影机格，零点时每个旧格移动到同一全屏镜头对应的拼块位置；边框和标签消退，所有拼块交叉淡入同一个镜头，时钟与转写回到底部。保留参数：film/index.html:LAY；22.42秒进入3×3骨架，23.10/24.22/25.24秒接入Orion、无人机、控制室。；film/index.html:TR=.34、POP=.30、MERGE=.42、T0=32.5；render在零点将旧格lerpR到全屏拼块，mergeK>.45隐藏格内包装。；film/index.html:render；每格绘制同一ims.osb，alpha=eio(seg(t,T0,T0+MERGE*.8))，时钟和转写返回HUD_CLOCK / HUD_TX。。重放区间由入口segments配置，来源素材与音轨直接复用。

## 参数

- **原片重放区间**：19.6–36.36秒；1倍速，总时长16.76秒。

[打开 Demo](../../demos/patterns/many-into-one-countdown/index.html) · [在库中查看](../../patterns.html#pattern/many-into-one-countdown)
