# 随身灯即情绪

## 实现 Prompt

调用来源案例原作render(t)重放“随身灯即情绪”。主角提灯的lit参数同时改变精灵火焰、点光源和辉光，亮灭承载护火情节；初次点灯让两人的影子一起落在木板上。 参数：film/story.js:T.light=16.2、dim=41.3、dark=42、relight=45.6；film/harbor.js / forest.js / cliff.js的lit、lanternPos与PointLight。 film/px.js:billboard定义剪影阴影；film/chars.js:makeChar与灯焰姿态，点光源向相机移.42–.45m。 使用index.html的segments映射原片时刻，复用来源素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-hd-2d 15.200000–17.400000秒；lemo-hd-2d 40.600000–47.600000秒；1倍速，总时长9.200000秒。

[打开 Demo](../../demos/patterns/carried-light-meter/index.html) · [在库中查看](../../patterns.html#pattern/carried-light-meter)
