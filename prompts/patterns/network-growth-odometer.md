# 线网按年生长

## 实现 Prompt

以来源案例lemo-transit-map的原作render(t)重放“线网按年生长”。线路依各年份的phase沿八方向路径逐段画出，笔尖经过时站点亮起；新线抵达后生成换乘胶囊，线路圆标带出年份，既有线网保持原位。 参数：14.3—21.7秒依次展开2002—2010线路；phase按t0/t1插值路径弧长，2010在19.9秒落定。；路径先画到tip，passed状态驱动站点显现与换乘；多线共享走廊用平行偏移保持可读。。按入口segments映射原片，复用原作素材、字体与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：13.000—21.700秒，1倍速。

[打开 Demo](../../demos/patterns/network-growth-odometer/index.html) · [在库中查看](../../patterns.html#pattern/network-growth-odometer)
