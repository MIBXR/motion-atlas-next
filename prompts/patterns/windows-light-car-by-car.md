# 车窗逐节亮灭

## 实现 Prompt

复用来源案例lemo-paper-lantern的原作render(t)重放“车窗逐节亮灭”。机车与七节车厢各自控制车窗glow map，开场从车头起逐节点亮并配同拍上行钟琴；到终点按同一车厢顺序熄灭，钟琴音高倒序下行，最后保留站灯。参数与源码：film/timeline.json:HIT.cars=1.5+.34*i，i=0…7；film/src/world.js:world.update对每个cars[i]设置uGlowLit=ss(seg(t,H.cars[i],H.cars[i]+.12))*(1+.03*sin(9*t+2*i))。；film/timeline.json:HIT.off=[42,42.42,42.84,43.26,43.68,44.1,44.52,45.75]；film/src/shots.js:s6.update用1-ss(seg(t,H.off[i],H.off[i]+.18))逐节熄灭，站灯保留。；source/mix.py:UP=[D5,E5,F#5,A5,B5,D6,E6,F#6]；H.cars读取UP[k]，H.off读取UP[::-1][k]，每事件一声glockenspiel，共用timeline.json。。以入口segments映射原片时间，保留原作字体、纸层、灯光和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：0.4–5.25秒；41–46.5秒；1倍速，共10.350000秒。

[打开 Demo](../../demos/patterns/windows-light-car-by-car/index.html) · [在库中查看](../../patterns.html#pattern/windows-light-car-by-car)
