# 主树蹲起换季波

## 实现 Prompt

用来源案例 lemo-memphis-diorama 的原作 render(t) 重放“主树蹲起换季波”。WAVES 定义换季起止与主树中心，seasonState 派生半径；主树 y 轴先压到 .8，再 backOut 恢复并按体积关系横向伸展。flat 材质同时持有 uCol/uCol2，片元按世界空间到中心的距离选色；passed 按环越过物件的距离触发生长或折叠。保留参数：film/main.js:place：sy=1−.2*io(seg(t,T−.5,T))，T 后 .6 秒 backOut(.8→1)；横向scale=1/√sy。；film/main.js:seasonState / passed：WAVE_MAX=240，r=240*io(seg(t,t0,t1))，progress=clamp((r−distance)/(16*len))。；film/memphis.js:FLAT_FS：uHasC2>.5 且 length(vWP.xz−uSeas.xy)<uSeas.z 时选择 uCol2 / uPatCol2。。按 index.html 的 segments 把巧思时间映射到原片 18.8–22.4 秒，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **来源片段**：18.8–22.4 秒，夏至秋；主树18.8–19.3秒下蹲，秋波19.3–21.9秒扩散。
- **重复节拍**：film/main.js:WAVES：另两次波为9.3–11.9、29.3–31.9秒；source/music.py 在每个 T−.42 秒低击、T 时回弹并上行。

[打开 Demo](../../demos/patterns/season-ripple-wave/index.html) · [在库中查看](../../patterns.html#pattern/season-ripple-wave)
