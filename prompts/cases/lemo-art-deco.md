# 星光饭店的午夜 · 装饰艺术

## 实现 Prompt

制作一支装饰艺术代码影片。1930年除夕，门童赶在午夜前把一封信送上星光饭店顶楼；电梯故障后他爬楼、穿过厨房，把乐谱交给指挥，十二声钟响逐字点亮灯牌。中轴门扇开合承担转场，几何建筑、金属刻线与机械对称保持统一；扇舞最终锁成十二点钟面。暖黑#0d0b09、漆黑#060504，金#C9A24B与象牙#F2E8D5；勃艮第红#8E1B2E主角，祖母绿#1D6B57扇面。1920×1080、24fps；固定中轴、阶梯拱门、建筑剖面、单点大厅与双点屋顶透视。人物12fps抽帧，镜头与金线24fps；门扇从中轴开合，八名扇舞者按八分音符展开并在俯拍中归为钟面。字体：Limelight标题、Poiret One灯牌与数字、Josefin Sans 400/600/700字幕标签、Italiana罗马数字。声音：Kokoro bm_fable播音员和am_puck门童；Salamander钢琴、管弦与低音采样，钟、继电器、纸、托盘和门拟音。按film目录的原作render(t)组织镜头与动作，采用MotionKit时间线逐帧定位，声音默认关闭。

## 动效 Token

- **中轴门扇**：film/film.js:44–65、87–109：splitOpen把旧镜分成左右960px门扇，以1−e水平缩短并加边缘阴影。
- **扇面钟阵**：film/shots_misc.js:83–144：8人按B/2开扇；BALL2到clockForm插值站位、朝向与大小，前两人成为指针。

## 制作约束

- 修改字体与文案时，按原作的字体载入方式和子集范围同步取得资源。
- 图形、着色器与时间线通过film内原作render(t)绘制，音轨沿用成片混音。

## 迁移

- `film/timeline.js`：修改节奏、铃声、门扇与舞蹈节点。
- `film/engine/deco.js / chars.js`：修改配色、金属质感和人物。
- `film/engine/bulbs.js / scenes/roof.js`：修改灯牌文字、灯泡与点亮顺序。

[打开 Demo](../../demos/cases/lemo-art-deco/index.html) · [在库中查看](../../cases.html#case/lemo-art-deco)
