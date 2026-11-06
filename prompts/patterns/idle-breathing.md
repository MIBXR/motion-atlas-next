# 空闲呼吸

## 实现 Prompt

实现空闲呼吸：仅在非电影模式、阵列已展示、非详情且无归位中的卡片时启用。模式切换、选档、拖拽及惯性更新 lastInteraction，空闲超过2.5s 后目标强度为1，否则为0；每帧强度以1−exp(−dt×rate)靠近目标，进入rate=0.8、退出rate=4。第row行lane列位移=强度×[0.075·sin(2πt/8+0.3row−0.45lane)+0.027·sin(2πt/13−0.17row+0.3lane)]世界单位，总幅度不超过0.102。prefers-reduced-motion 完全关闭。Demo 保留九张卡片和计量图，按每世界单位50px示意位移；按钮模拟一次实际操作，外部seek/play回到预设事件。参数出处：demos/cases/archive-os/source/rhinelabui/src/motion.ts:74–80、scene.ts:1302–1317。

## 参数

- **阈值与包络**：2.5s 后开始；指数进入速率0.8、退出速率4，无固定完成时刻
- **周期与幅度**：8s / 13s，幅度0.075 / 0.027世界单位，归一化权重约0.735 / 0.265
- **二维相位**：0.3row−0.45lane / −0.17row+0.3lane；总幅度上限0.102世界单位
- **退出**：模式切换、选档、阵列拖拽及惯性更新最后操作时间，按速率4指数退出

[打开 Demo](../../demos/patterns/idle-breathing/index.html) · [在库中查看](../../patterns.html#pattern/idle-breathing)
