# 反刻版揭印转正

## 实现 Prompt

用来源案例lemo-woodcut的原作render(t)重放“反刻版揭印转正”。木版以镜像变换显示反刻标题，滚墨覆纸后通过圆柱卷纸的正背条带绘制揭出可读正印；唯一铜色随浇铸放大，片尾收于小钟高光。保留参数：film/shots.js:blockFrame镜像木版；7秒滚墨、7.6667覆纸、8秒擦压、8.5–9秒peelState(u,230)并curl(F=1900)。；film/trans.js:curl以step=3条带绕圆柱，F默认2400；peelState前22%缓慢揭起，其后指数2.2加速，半径4+rmax*sin(π*min(1,1.05u))^.7。；film/engine/print.js:plate与白色刻痕相乘；shots2.js:39–41.6667秒浇铸扩大光，endScene在黑色片名板上保留小钟的铜色。。按index.html内联segments映射原片时刻，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：5.800000–10.500000秒；39.000000–41.666700秒；54.400000–58.500000秒；1倍速，总时长11.466700秒。

[打开 Demo](../../demos/patterns/mirrored-block-pull-print/index.html) · [在库中查看](../../patterns.html#pattern/mirrored-block-pull-print)
