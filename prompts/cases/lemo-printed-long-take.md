# 三十三只 · 印刷长镜头

## 实现 Prompt

制作一支印刷长镜头代码影片。北海道雪地河谷一镜到底，丹顶鹤从河中苏醒、起飞到投喂田；同一地点四次再印，让1952年的33只与2025年的1927只在告示板旁对照。三维地形通过刮版着色器化成墨与纸；长镜跟随红冠，固定机位再印承担时间变化。墨#16171b、纸#ede5cd，红#c4332b只用于鹤冠，暖黄#dfa443用于晨光与玉米。1920×1080、30fps；天空、远山林带、中景河田与前景树栅分层；数值雕在世界内的桥铭、温度计和告示板。连续长镜沿水面过桥，跟鹤起飞并降落；桥下时间平滑放慢，固定机位纸角揭开下一年。字体：Noto Serif SC 700；按scene.js、props.js、timeline.js字符范围子集，仅保留kern、palt布局特性。声音：Microsoft edge-tts en-US-AvaNeural英文旁白，VSCO/VCSL室内乐采样；河水、霜、鹤鸣、翼拍、木版与印章拟音。按film目录的原作render(t)组织镜头与动作，采用MotionKit时间线逐帧定位，声音默认关闭。

## 动效 Token

- **慢镜映射**：film/scene.js:636–646：WARP={a:9.95,b:11.75,d:.4}，render、TEXTS和EV统一变换。
- **同地四版**：film/timeline.js:17–20、film/scene.js:546–569：三次peel=.3秒，红版延后.45秒，偏移(1.6×SS,−1.1×SS)。

## 制作约束

- 改字体与文案时按原作字体载入和子集范围同步取得资源。
- 图形、着色器与时间线通过film内原作render(t)绘制，音轨沿用成片混音。

## 迁移

- `film/world.js / textures.js`：修改地形、河道、布景与鹤的轮廓图集。
- `film/timeline.js / scene.js → WARP / ERA_N`：修改长镜关键点、年代数量与慢镜时段。
- `film/props.js`：修改桥铭、告示板与印章。

[打开 Demo](../../demos/cases/lemo-printed-long-take/index.html) · [在库中查看](../../cases.html#case/lemo-printed-long-take)
