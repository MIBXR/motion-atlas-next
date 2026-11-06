# 杂物一拍归格

## 实现 Prompt

用来源案例lemo-dark-keynote的原作render(t)重放“杂物一拍归格”。数百个按音符生成的UI堆叠被冻结；光标按下后以径向波触发飞行，同类沿同向弧线化为统一方块，按类型和空间顺序填满隐藏网格。保留参数：film/world.js:snap：264个元素，RING=2600；t0=16+.03+d/2600；dur=.26+.14×min(1,trip/1200)，行内按x排序。；film/film.js:drawWorldItems：弧控点偏移.2L×[1,−1,1]；back(...,1.3)切线过冲；9段加色拖尾，前4%–32%形变为方块。。按index.html中的segments映射时间，复用原作素材、字体和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：15.700000–19.300000秒；1倍速，总时长3.600000秒。

[打开 Demo](../../demos/patterns/clutter-snap-grid/index.html) · [在库中查看](../../patterns.html#pattern/clutter-snap-grid)
