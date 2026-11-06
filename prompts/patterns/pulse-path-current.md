# 电流沿走线奔跑

## 实现 Prompt

用来源案例lemo-circuit-board的原作render(t)重放“电流沿走线奔跑”。把河流和电力路径画成板上走线，按路径弧长推进光；交流短划线来回摇摆，直流由单向光头、连续光流和余辉组成，换流器的内部边缘在转换时发光。保留参数：film/src/main.js:acPhase / sceneCorridor：5.4–10.1秒的相位按.55Hz变化，近景lam=8、amp=.42；film/src/render.js负责沿trace绘光。；film/src/main.js:headS / sceneCorridor：16.5–23秒到终点；dcp/dcn双线，decay=520、floor=.7、v=200、minPx=6.5；23秒后decay=2000。；film/src/main.js:sceneCharger：T_DB=39.4，交流pL/L/L2→plus/minus/pri/sec/vbus单向光流。。按index.html中的segments映射时间，复用原作素材、字体和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：4.700000–10.100000秒；14.400000–23.500000秒；38.400000–41.500000秒；1倍速，总时长17.600000秒。

[打开 Demo](../../demos/patterns/pulse-path-current/index.html) · [在库中查看](../../patterns.html#pattern/pulse-path-current)
