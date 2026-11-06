# 投影按年代逐层刷上白模

## 实现 Prompt

用来源案例的原作render(t)实现“投影按年代逐层刷上白模”。关灯后投影按建成年代点亮固定的白模，四组战后建筑错峰闪亮，随后一层高度光沿立面升到最高屋顶。保留参数：film/studio.js:projLight / roofGlow，建筑高度由model.json生成；变化的是投影颜色和uHgtF。；film/timeline.js:GROW、film/main.js:setLight：1940/1965/1990/2010四组，起点12/13.2/14.4/15.6秒；studio.js以uGT[bd]+vData.z*uGS[bd]逐楼点亮。；film/main.js:hgtFront：18–21秒从−.003升到Zalmhaven屋顶+.005；studio.js以smoothstep(.0015,−.0015,vWP.y−uHgtF)上色。。按index.html内联segments定位原片，复用原作素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-white-model：1.8–21.6秒；1倍速，总时长19.800000秒。

[打开 Demo](../../demos/patterns/projection-layers-by-time/index.html) · [在库中查看](../../patterns.html#pattern/projection-layers-by-time)
