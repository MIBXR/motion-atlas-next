# 逐刀刻出画面

## 实现 Prompt

用来源案例lemo-woodcut的原作render(t)重放“逐刀刻出画面”。每条刻痕持有起始时刻、持续时间和刀宽，沿刀路逐步显露；形体的reveal key分配粗细刀次，高潮光线由放射刻痕爆开。保留参数：film/engine/knife.js:progOf：u=clamp((t−s.t0)/s.dur)，进度u*(.55+.45*u)；hatch.js:hatch依据key、speed和jit分配t0/dur。；film/world.js:buildWorld：field在3–4.8秒，village从4+i*.08秒，sky在5–6.1秒；shots.js:buildOpen标题6–6.85秒，sp=3.2、wmax=4.4。；film/shots2.js:第二次浇铸的rays：39.3333秒起，t1=t0+.5，n=60、r0=62、r1=[700,1500]、w=22、jit=.8、bend=.03。。按index.html内联segments映射原片时刻，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：0.000000–7.000000秒；39.000000–41.666700秒；1倍速，总时长9.666700秒。

[打开 Demo](../../demos/patterns/carve-cut-by-cut-reveal/index.html) · [在库中查看](../../patterns.html#pattern/carve-cut-by-cut-reveal)
