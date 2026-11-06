# 末班夜车 · 纸雕灯影

## 实现 Prompt

制作51秒、1920×1080、30fps的纸雕灯影短片《末班夜车》：机车与七节车厢从雪山小站驶向海边终点；平行纸层以纤维、透光、软影、景深与少量暖灯显出距离。开场车窗每0.34秒逐节亮起，配D5到F♯6上行钟琴；越过弧形高架桥，镜头在松林伴行，推向隧道后淡入黑场，再硬切到青绿河谷。海崖段吊臂下摇，终点依次熄灭相同车窗，音符倒序下行，留下站灯；纸车票沿吊线落下作片尾。沿用原作Kokoro bm_george旁白、中英字幕和成片混音。直接修改demos/cases/lemo-paper-lantern/film/src/及timeline.json，保留原作render(t)、Three.js 0.170.0和SSAA2，以MotionKit接入播放、暂停、逐帧定位与默认静音。

## 动效 Token

- **亮窗与灭窗**：film/timeline.json:HIT.cars=1.5+.34*i；HIT.off=[42,42.42,42.84,43.26,43.68,44.1,44.52,45.75]。
- **隧道黑场**：film/src/shots.js:s3.grade用1-ss(seg(t,25.3,25.5))淡黑；timeline.json在25.75秒以cut接S4。
- **吊线车票**：film/src/shots.js:s6.update：47.5秒起1.1秒back入场，摆角=.06*exp(-1.6*sw)*sin(5.5*sw)。

## 制作约束

- 灯光、旁白与动作时刻集中在film/timeline.json。
- 车窗使用独立glow map，站牌和车票避开灯光点。
- 全幅移动镜头的天空板跟随相机，图层长条覆盖行进范围。

## 迁移

- `film/timeline.json；source/tools/timeline.py`：修改旁白、双语字幕、镜头和HIT动作时刻，先运行制作时间表工具再渲染。
- `film/src/world.js → world / car；film/src/shots.js → s2–s6`：修改列车、车站、景色和各段相机。
- `source/mix.py → UP / speed / score`：修改亮灭音高、车速轮声与配乐，保持读取同一时间表。

[打开 Demo](../../demos/cases/lemo-paper-lantern/index.html) · [在库中查看](../../cases.html#case/lemo-paper-lantern)
