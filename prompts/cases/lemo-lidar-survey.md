# 林下的田 · 点云测绘

## 实现 Prompt

从真实机载激光回波制作点云测绘短片，保持每点的测量位置，用冷黑背景、克制的高度绿阶、暖中性受光地面与唯一琥珀测量强调色。照片被世界空间扫描线变为点云，镜头从俯视下降到低斜角；按离地高度逐拍下降切割面，树冠回波抬离淡出，留下真实地面点，短暂留白后由第二扫描面凝成表面。连续 C1 相机飞过墙网、推到剖面再升起，细线测量与数字来自同一数据。大号窄体读数、等宽仪器、中文标签及左下双语字幕分层；声音使用电子扫描、加速细分、凝面撞击、木质采样乐器与冷静旁白，沿用原片混音。引擎位于 demos/cases/lemo-lidar-survey/film/film.js 与 timeline.js。

## 动效 Token

- **逐层切割**：film/film.js:cutAt；film/timeline.js:PEEL_STEPS：10–13.125 秒按 .625 秒节拍下降，30→24→18→12→6→0，最终插值到 −6m 清除低植被。
- **连续相机**：film/film.js:camAt / placeCamera；film/timeline.js:CAM：目标、距离、方位、俯角和 fov 的 C1 三次 Hermite 插值。
- **凝面与墙网**：film/timeline.js:T.turn=14.375、turnEnd=15.625、wallsEnd=20；film/film.js:F2 / uW 控制扫描和描线。
- **画面处理**：film/film.js:SS=2，ACES 曝光 .92；前沿高阈值 bloom，数据坐标 XY=.02m、Z=.01m。

## 制作约束

- 测量使用原始高度；显示夸张时把 ×2 标注保留在画面。
- 数据转为本地东、北、上坐标，改地点时重新确认垂直基准与分类。
- 切割应低于 0m 清掉低植被，原片最终为 −6m。
- 描墙保留 traced 标识、手工输入与原始回波来源；换场地时重新生成地面、墙线和剖面数据。

## 迁移

- `film/timeline.js → VO / T / CAM`：修改文案、绝对拍点、相机目标与路线。
- `film/film.js → C / pointVS / surfaceFS`：修改高度色带、受光与切割前沿。
- `source/data/walls_traced.json；source/tools/`：修改描线与原始区域，再生成 film/assets/raw/build 和 film/data。
- `film/data/facts.json / profile_C.json；source/FACTS.md`：同步测量结果、剖面与来源事实。

[打开 Demo](../../demos/cases/lemo-lidar-survey/index.html) · [在库中查看](../../cases.html#case/lemo-lidar-survey)
