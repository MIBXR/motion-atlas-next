# 逐块长岛配音符

## 实现 Prompt

用来源案例的原作render(t)实现“逐块长岛配音符”。海中地块按节拍由水下升起并带水花，随后树和房屋按部件生长；每个落定事件携带音高导出给配乐，转台镜头在同一世界里展示建造。参数：film/world.js:213–229的ev(t,rise,{note})、253的floor/roof、270的pop；source/music/score.py读取events.json合成旋律。；film/world.js:415–430：地块水下上升、弹性回落、六边形浪圈和14滴水花；film/main.js:cam的grow/grow2使用单调正交转台。。复用来源字体、素材和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-lowpoly-island：6.000000–21.250000秒，1倍速，总时长15.250000秒。

[打开 Demo](../../demos/patterns/tile-by-tile-island-growth/index.html) · [在库中查看](../../patterns.html#pattern/tile-by-tile-island-growth)
