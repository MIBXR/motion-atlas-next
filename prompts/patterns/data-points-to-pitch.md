# 数据点映射音高

## 实现 Prompt

以来源案例lemo-dataviz的原作render(t)重放“数据点映射音高”。每个数据点在落笔时发出一个音：温度决定音高，时间轴的点密度从四分音符加密到三十二分音符；低于中心的值吸附D大调五声，极端值逐渐失谐。 参数：midi=62+(v+.4)×17；低于中值吸附D大调五声；最后约15点偏移5—45 cents。；yearK依次以1、.5、.25、.125拍推进；90BPM、24fps使三十二分音符等于2帧。。按入口segments映射原片，复用原作素材、字体与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：5.200—31.000秒；32.000—34.000秒，1倍速。

[打开 Demo](../../demos/patterns/data-points-to-pitch/index.html) · [在库中查看](../../patterns.html#pattern/data-points-to-pitch)
