# 兴登堡号：四分钟与三十二秒 · 视觉调查

## 实现 Prompt

制作一支视觉调查影片。时间读数属于证据本身：电报与风图按分钟运行，三列材料按同一秒表亮起，五路来源的红线汇向同一舱段。硬切、短闪、顺时针圈注、逐行高亮、波形游标和按同一事件时钟依次亮起的证据列。沿用以下制作方法：Universal Newsreel 1937年原片、美国海军与NARA照片、FBI案卷页、USGS 1947年地形图及商务部调查报告文字。声音采用Release原混音：Kokoro am_michael旁白、两段1937年原声、低音弦乐与拨奏、事件秒针、纸张和电报声。可编辑入口：film/film.json → sections / subs / vo；film/index.html → TG / playhead / sRun；source/tools/prep.sh。

## 动效 Token

- **事件时钟**：film/index.html:playhead / sWait / sRun；分钟尺度15:40–18:14；秒尺度T+0–32，新闻片约T+7才进入。
- **五路汇聚**：film/index.html:sOrigin；29秒起红线汇向16舱侧视图中的4–5号区域。

## 制作约束

- 替换影像、字体和数据后，同步调整原作取帧与文字时间表。
- 声音与画面沿用同一来源时间，音轨默认关闭。

## 迁移

- `film/film.json → sections / subs / vo`：修改段落、字幕和旁白时刻。
- `film/index.html → TG / playhead / sRun`：修改事件时钟、来源起点和同步区间。
- `source/tools/prep.sh`：替换档案片段、文件页和地图裁片。

[打开 Demo](../../demos/cases/lemo-visual-investigation/index.html) · [在库中查看](../../cases.html#case/lemo-visual-investigation)
