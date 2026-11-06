# 拼搭、崩塌、用零件重建

## 实现 Prompt

调用来源案例原作render(t)重放“拼搭、崩塌、用零件重建”。积木逐块按拍点咔嗒落位，塔体失稳后每块都有落地位置；第二次组装复用这些散落部件，从废墟飞回组成更稳的火箭。 参数：film/story.js:T.layer、fall≈17.37、rebuild=29.9、rebuildStep=.19、coneLand=32.5。 film/rockets.js:restPose / toOrigin / update；slots2从v1按颜色分配同一批积木；重建从samples末帧姿态以.45秒弧线飞至slot2。首次落位.35stud过冲在.17秒内归零。 使用index.html的segments映射原片时刻，复用来源素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-brick-toy 12.000000–20.000000秒；lemo-brick-toy 29.800000–32.600000秒；1倍速，总时长10.800000秒。

[打开 Demo](../../demos/patterns/snap-build-collapse-rebuild/index.html) · [在库中查看](../../patterns.html#pattern/snap-build-collapse-rebuild)
