# 轨迹作画成纹

## 实现 Prompt

复用来源案例lemo-impasto的原作render(t)，实现“轨迹作画成纹”：19把伞按中心、内外两环的编舞轨迹运动，每把伞用自身颜色沿已走过的dancePos位置累积刮刀笔触；相机旋转并吊臂拉远，显出群体路径形成的曼陀罗。参数与源码：film/film.js:DANCE=1个中心+6个内环+12个外环；dancePos半径340/640，内外环反向旋转并在强拍呼吸。；film/film.js:shotTop对每把伞从s=0到tt以.055秒步长重建轨迹；用s+.03取切线，笔长60–90、宽26–42、alpha=.9，run=.6。；同函数：zoom由1.32到.6，rot从0到.62，时间冻结在T.gp；轨迹与伞共用dancePos。。按入口segments映射原片时刻，画面、字体与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：23.48–31.66秒；1倍速，总时长8.180000秒。

[打开 Demo](../../demos/patterns/motion-trails-paint-mandala/index.html) · [在库中查看](../../patterns.html#pattern/motion-trails-paint-mandala)
