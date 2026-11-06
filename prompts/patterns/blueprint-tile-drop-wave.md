# 蓝图落块波

## 实现 Prompt

复用等距 2.5D 来源案例的原作 window.renderAt(t)，按 index.html 内联配置 的 segments 重放原片0–2.1秒，时长2.1秒。蓝图先从中心扩开，六个地块环按0.25、0.5、0.75、1、1.25、1.5秒落位；ring=max(abs(dx),abs(dz))-.5，tl=ringT[ring]+ang*.07+(R()-.5)*.02，R=A.rng(7)。保留倾斜落块 A.drop(T-t.tl,.3,2.2,t.rot0,.075)、触地压扁与两次微回弹，木质点击和环音符与画面共用时间。保留原作模型、材质、字体和同区间音轨，1920×1080、30fps，声音默认关闭。

## 参数

- **地块环**：rings=[0.25,0.5,0.75,1.0,1.25,1.5]；ring=max(abs(dx),abs(dz))-.5。
- **错峰**：tl=ringT[ring]+ang*.07+(R()-.5)*.02；R=A.rng(7)。
- **落块**：rot0=-(1.25+R()*.3)；A.drop(T-t.tl,.3,2.2,t.rot0,.075)。
- **触地**：b1=.16，b2=.1；第二次回跳幅度为第一次*.3；sy=1-.3*exp(-tau/.05)*cos(tau*40)。
- **时长**：2.1s；原片0–2.1s。

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/blueprint-tile-drop-wave/index.html) · [在库中查看](../../patterns.html#pattern/blueprint-tile-drop-wave)
