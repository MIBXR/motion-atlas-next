# 平面图与立面图投影对位

## 实现 Prompt

用来源案例的原作render(t)实现“平面图与立面图投影对位”。上方平面河道的两岸沿蓝色虚线投影到下方桥梁立面，各种桥型用同一跨距作判断；同一条船先在平面受阻，再在立面穿过答案。参数：source/scenes/_gen_film.py:PROJ_T=14.4；proj0/proj1从BANK_L/BANK_R、RIV_B+40投到BH−70，lw7、dash[26,22]，间隔.05秒。；film/scenes/film.json的ship/ship_side、proj0/proj1与四桥立面；source/scenes/_gen_film.py:rows使用L/R锚点、SPANS和KPM计算等比例跨距。。复用来源字体、素材和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-briefing-board：14.100000–18.450000秒，1倍速，总时长4.350000秒。

[打开 Demo](../../demos/patterns/plan-elevation-projection/index.html) · [在库中查看](../../patterns.html#pattern/plan-elevation-projection)
