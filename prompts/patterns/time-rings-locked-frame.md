# 锁定画面里的时间环

## 实现 Prompt

用来源案例的原作render(t)实现“锁定画面里的时间环”。同一地理画面中各年卫星图沿扫描条切换，旧岸线留在原地形成逐年嵌套的时间环；年份加速落定后停在今天的岸线。参数：film/timeline.js:RINGS在7.8/9.6/10.8/11.7/12.3/13.2秒依次落定1977/1989/2000/2009/2014/2025。；film/film.js:drawRings与ringScan按V.rings投影实际海岸线；并非数学同心圆；camKeys仍从980km推到600km并转−15°，岸线锁在同一地理坐标。。复用来源字体、素材和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-satellite-briefing：7.800000–15.300000秒，1倍速，总时长7.500000秒。

[打开 Demo](../../demos/patterns/time-rings-locked-frame/index.html) · [在库中查看](../../patterns.html#pattern/time-rings-locked-frame)
