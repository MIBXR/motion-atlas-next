# 风去了哪里 · 钢笔淡彩

## 实现 Prompt

制作一支钢笔淡彩时间线影片。以草帽轨迹生成每个像素的颜色到达时间，让淡彩成为事件的痕迹；钢笔线与偏位透明水彩始终分层可见。纸#f5eede、墨#2b2520；树叶由黄绿到深绿，天空蓝灰，建筑赭黄与砖红。Reenie Beanie写角落观察，Caveat 500–600写片名与页脚；文字在世界坐标内随镜头移动。1920×1080、24fps，5120×2880纸页；草帽与人物占据主拍，页边留空承载题字。弹簧追随草帽，横移、抬升、急落、接帽时短震，再长距离拉远成一页。草帽独自上色，风来后逐渐加快；帽子最高处静默一小节，急落与扑接落在合奏下拍，最后题字。无旁白；150BPM爵士圆舞曲，CC0乐器采样与程序化钢笔、风、草帽、脚步、铃声和水声。实现入口位于demos/cases/lemo-urban-sketch/film/，保留原作render(t)、原始素材与字体；通过MotionKit.mountFilm接入播放、定位、减少动态暂停和默认关闭的声音。

## 动效 Token

- **颜色到达场**：film/film.js:143–160：GW=640、GH=360；帽子6–24秒每.04秒采样，v=900、R=360/520/760/400，噪声amp=240。
- **追随弹簧**：film/film.js:165–167：dt=1/240，刚度28、急落70，阻尼2sqrt(k)。
- **纸面晕染**：film/engine.js:arrivalField / compositor：到达时刻控制湿前沿与水彩覆盖。

## 制作约束

- 画面以原作render(t)按原帧率定位，字体和全部绘制输入预载后开始。
- 声音使用Release成片原混音，修改叙事时同步调整旁白、配乐与画面时间表。

## 迁移

- `film/film.js → hatPath / src / extras / camera`：更改帽子轨迹、着色源、人物调度与镜头。
- `film/world.js → buildWorld`：更改公园、建筑、树冠与纸页边界。

[打开 Demo](../../demos/cases/lemo-urban-sketch/index.html) · [在库中查看](../../cases.html#case/lemo-urban-sketch)
