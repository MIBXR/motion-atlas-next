# 套印圆盘吞景

## 实现 Prompt

复用lemo-risograph原作render(t)，重放23.5–26秒的套印圆盘吞景。粉圆以lighter只增加粉版密度，透印蓝版并变紫；24–24.6秒半径从20增到2300，24.6秒切换河景，25.5秒缩至330成为太阳。保留riso.js专色相乘、网点、纸纹和同区间原音轨，通过MotionKit.replay接入播放和定位，声音默认关闭。

## 参数

- **原片重放区间**：23.5–26秒，1倍速，总时长2.5秒。

[打开 Demo](../../demos/patterns/overprint-disc-transition/index.html) · [在库中查看](../../patterns.html#pattern/overprint-disc-transition)
