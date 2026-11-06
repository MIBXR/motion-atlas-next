# 地图上还写着海 · 卫星简报

## 实现 Prompt

制作《地图上还写着海 · 卫星简报》这样的代码影片：卫星按地图俯冲到咸海，却看到沙漠；同一地理画面逐年留出海岸线，量出旧港口到海边的距离，再转向科卡拉尔大坝，显出北咸海的回水。公开卫星影像与原位岸线组成证据链；地图和照片对照、逐年时间环与测距线把尺度变化变为叙事节奏。USGS/NASA Landsat各年实景、NASA GIBS Blue Marble与Natural Earth岸线；原作代码投影、拼接、蒙版和标注。Barlow Condensed 300/400/500/600、IBM Plex Mono 400/500、Noto Sans SC 400/500与Noto Serif SC 600原字符子集。同一连续镜头以高度与倾角改变取景；年度扫描留下地理岸线，测距镜头追随量线端点，北方水面沿旧岸线向外增长。100 BPM D小调转D大调；遥测、低铜管、金属环、船笛、风与水声，Kokoro bf_emma英语旁白与双语字幕。实现使用demos\cases\lemo-satellite-briefing\film\film.js, demos\cases\lemo-satellite-briefing\film\timeline.js, demos\cases\lemo-satellite-briefing\film\engine.js, demos\cases\lemo-satellite-briefing\film\assets\plates\plates.json。

## 动效 Token

- **年份扫描**：film/timeline.js:RINGS；film/film.js:drawRings；1977/1989/2000/2009/2014/2025分别在7.8/9.6/10.8/11.7/12.3/13.2秒落定。
- **原位影像与测量**：film/film.js:init加载assets/plates、vectors.json；film/engine.js:Engine/makeCamera；source/tools/plates.py与vectors.py生成岸线和数据。

## 制作约束

- 画面由上游render(t)直接绘制，按原作帧率定位。
- 修改字幕或场景文案后按source中的字体流程重建相同字重和字符子集。
- 声音使用原片混音，修改事件时同步更新声音制作文件。

## 迁移

- `film/film.js`：按原作数据与函数修改故事内容、画面和物件。
- `film/timeline.js`：按原作数据与函数修改时间表、镜头和节拍。

[打开 Demo](../../demos/cases/lemo-satellite-briefing/index.html) · [在库中查看](../../cases.html#case/lemo-satellite-briefing)
