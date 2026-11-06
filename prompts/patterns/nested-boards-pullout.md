# 嵌套电路板拉远

## 实现 Prompt

用来源案例lemo-circuit-board的原作render(t)重放“嵌套电路板拉远”。充电器、街道、城市和走廊各用局部坐标与独立画布，子板嵌入父板的固定足印；对数拉远时递归选择外层并把每级子板裁切合成，连续露出整张大板。保留参数：film/src/levels.js:toChild将(x−at)/s、z×s；toParent将x×s+at、z/s；baseOf按视口覆盖逐层提升，drawLevel递归合成可见子板。；film/src/main.js:PULL0=52.9、PULL1=54.5；camUp / camDown保持充电器锚点；e=1−(1−p)^2.6，z对数插值到.8，末段旋转−.03。。按index.html中的segments映射时间，复用原作素材、字体和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：52.500000–55.500000秒；1倍速，总时长3.000000秒。

[打开 Demo](../../demos/patterns/nested-boards-pullout/index.html) · [在库中查看](../../patterns.html#pattern/nested-boards-pullout)
