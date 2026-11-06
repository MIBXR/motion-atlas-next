# 认识皮普 · 50s 扁平卡通

## 实现 Prompt

制作以1950年代教育片口吻介绍扫地机皮普：底座靠墙、手机配对、按下启动，最后把清扫路线拉成一张印刷平面图。 编号圆章同时承担步骤层级与转场入口；身体保持不动，手势和圆形放大细节解释每个操作。 角色与套色偏移按12fps跳动，镜头和开圈以24fps运动；俯视路线在局部跟随后以2.6×→1×反旋拉远。 Canvas2D几何人物、四指手套、扫地机、手册图标与路线平面图。 字体：Oleo Script 400/700、Alfa Slab One 400、Jost 100–900。 声音：132 BPM原创冷爵士；MuldjordKit鼓CC BY 4.0，Karoryfer、VSCO CE、VCSL采样CC0；Kokoro am_michael旁白与代码拟音。 实现沿用lemo-midcentury-toon的film/源码、素材与时间表。

## 动效 Token

- **开圈**：film/film.js:renderFilm，边界−.5拍至+.4拍，半径104→1250px，圆心从上镜主体移到画幅中心。
- **反旋拉远**：film/film.js:payoffCam，结果段第.4–5.2拍，z按对数从2.6→1，r由−.1rad→0，镜头中心从路径点移至[960,590]。

## 迁移

- `film/content.json`：修改产品、三步内容、尺寸、配色和路线房间。
- `film/film.js → setup / payoffCam / renderFilm`：调整节拍、路线镜头与圆章、按钮开圈。

[打开 Demo](../../demos/cases/lemo-midcentury-toon/index.html) · [在库中查看](../../cases.html#case/lemo-midcentury-toon)
