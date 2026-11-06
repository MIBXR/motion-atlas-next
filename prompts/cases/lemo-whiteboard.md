# 口袋里的爱因斯坦 · 白板讲解

## 实现 Prompt

制作一支白板讲解时间线影片。以真实单线笔顺承载讲解，用旁白词级时间安排书写窗口；笔迹、相机、磁铁和板擦共用一张8000×4500白板。暖白板#fbfbf9 / #eeede9，墨黑#23262c、信号蓝#2a5cb3、重点橙#d97757，旧课残迹为低透明灰与淡蓝。板面EMS Tech单线字形逐笔绘制；字幕Architects Daughter 44px，标题与署名也写在板上。1920×1080、24fps，镜头在8000×4500板面内移动；底部12%留给字幕，最后拉远到墙面。相机以1/z插值推拉，沿线横移和甩镜；移动超过14px/帧时最多12个子帧合成180°快门运动模糊。地图开场后沿空间推导GPS测距，以双速刻度和七日漂移给出冲突，静默后擦回校准，整板拉远收束。Kokoro bm_george英语旁白，120BPM时钟式配乐、每笔干擦声、磁铁碰击、板擦摩擦和倒放压缩的回溯声音。实现入口位于demos/cases/lemo-whiteboard/film/，保留原作render(t)、原始素材与字体；通过MotionKit.mountFilm接入播放、定位、减少动态暂停和默认关闭的声音。

## 动效 Token

- **按词书写**：film/film.js:20–24的atS/atE查voices/words.json；D把各笔限制在a–b时间窗口。
- **倒抹回溯**：film/film.js:230–232：87–89秒倒序trailSegs，宽230、擦除强度0.9。
- **相机快门**：film/film.js:387–395：dt=1/24，sp>14时N=min(12,ceil(sp*.5/4))。

## 制作约束

- 画面以原作render(t)按原帧率定位，字体和全部绘制输入预载后开始。
- 声音使用Release成片原混音，修改叙事时同步调整旁白、配乐与画面时间表。

## 迁移

- `film/film.js → VO / atS / atE / EQ / cam`：更改旁白时刻、词级锚点、板面布局与相机键；词级输入在film/voices/words.json。
- `film/engine/wb.js → Timeline / Pen / Camera`：调整笔顺调度、笔触材质、浮笔和白板相机。

[打开 Demo](../../demos/cases/lemo-whiteboard/index.html) · [在库中查看](../../cases.html#case/lemo-whiteboard)
