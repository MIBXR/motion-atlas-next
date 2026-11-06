# 专利申请中：接云机器 · 蓝图 / 工程制图

## 实现 Prompt

制作一支蓝图 / 工程制图代码影片。发明家的蓝图自行画出接云机器，展开、装回并运转；发现纸上没有云后，手影补上修订云线，云线变成雨云，落雨让画中的花盛开。用工程制图顺序组织信息；斜投影系数让立面获得厚度，只有情绪高点的修订云线离开线稿语言。普鲁士蓝#18336B→#2A58A6、蓝白线#E7F0F9与暗桌面#0D1116；红#C23B2E只用于结论章。3200×2200蓝晒纸映入1920×1080；图形居左中，部件表和GENERAL NOTES居右，结论在标题栏。中心线、轮廓、细节、剖线、尺寸、球标、标签按拍画入；沿传动链跟拍，修订云团从纸面升起。字体：Architects Daughter手写标题、标签与注释；B612 400/700、B612 Mono技术字段；Allura签名。声音：Kokoro bm_daniel低调旁白；108BPM大键琴与巴松二声部创意曲，弦乐、竖琴，纸笔、齿轮、雨滴和印章拟音。按film目录的原作render(t)组织镜头与动作，采用MotionKit时间线逐帧定位，声音默认关闭。

## 动效 Token

- **线宽与斜投影**：film/draw.js:10–24：proj.k和π/4；screen width=sheet width×zoom^.65；film/film.js:125让k从0到.5。
- **图符成真**：film/sheet.js:143–211的revCloud从scalloped轮廓转为union整体渐变与阴影；film/film.js的REV与PF驱动升起、接住和落雨。

## 制作约束

- 改字体与文案时按原作字体载入和子集范围同步取得资源。
- 图形、着色器与时间线通过film内原作render(t)绘制，音轨沿用成片混音。

## 迁移

- `film/machine.js`：修改机器零件、尺寸、齿轮和分解路径。
- `film/film.js → CAMS / drawn / figLabel`：修改镜头、制图先后、图号与叙事节点。
- `film/sheet.js`：修改纸张字段、修订符号、雨与印章。

[打开 Demo](../../demos/cases/lemo-blueprint/index.html) · [在库中查看](../../cases.html#case/lemo-blueprint)
