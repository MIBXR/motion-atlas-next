# 日晷与投影阴影轨迹

## 实现 Prompt

用来源案例的原作render(t)实现“日晷与投影阴影轨迹”。按真实冬至太阳位置推进时钟到正午，太阳阴影落在模型上，投影描出阴影边缘，量程线从塔楼伸到777米并依次标记16个屋顶。保留参数：film/main.js:sunAt / clockMin / sunVec，读取stats.json的太阳表，10:55→12:40；T.sun=22.8、T.noon=25.8。；film/studio.js:projLight，uZS采样2米高度场阴影，uZSProg沿距离从塔楼向外展开；main.js:shPts为79点。；film/main.js:rangeLine / SH.forEach，27–28.8秒展开777米量程，29.4–31.2秒点亮16屋顶，9个战前屋顶用琥珀色。。按index.html内联segments定位原片，复用原作素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-white-model：22.8–35.4秒；1倍速，总时长12.600000秒。

[打开 Demo](../../demos/patterns/sun-clock-shadow-trace/index.html) · [在库中查看](../../patterns.html#pattern/sun-clock-shadow-trace)
