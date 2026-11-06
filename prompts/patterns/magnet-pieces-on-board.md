# 磁贴在板上移动

## 实现 Prompt

用来源案例的原作render(t)实现“磁贴在板上移动”。有厚度和贴板阴影的磁贴作为可计数的故事物件：磁铁代表桥墩，受撞后被逐个拔除；白板地图中的磁铁沿道路漂移并倒带归位。参数：film/scenes/film.json:pier0–pier6；source/scenes/_gen_film.py:119，r27/z16，4.25秒起每.25秒落位，12.75秒起每.125秒拔除，中心桥墩受撞dy12/dr6。；lemo-whiteboard/film/film.js:258–278的pinPath；78–85秒沿trailSegs移动，87–89秒沿trailBack回到PIN；engine/wb.js:drawPinMagnet保留升离、旋转和物理高光。。复用来源字体、素材和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-briefing-board：3.800000–13.800000秒；lemo-whiteboard：77.500000–89.300000秒，1倍速，总时长21.800000秒。

[打开 Demo](../../demos/patterns/magnet-pieces-on-board/index.html) · [在库中查看](../../patterns.html#pattern/magnet-pieces-on-board)
