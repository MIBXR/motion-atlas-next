# 海报五则 · 瑞士动态排版

## 实现 Prompt

以瑞士国际主义排版制作一支纯二维动态海报片：暖灰页、白纸、黑字、浅灰格线与唯一饱和信号色，十二列画幅内左页规则右页海报，严格左齐和强烈字号反差。所有元素落在网格，所有动作在拍点到达；只用 cubic-bezier(.7,0,.2,1) 与线性，擦入与刀线删除构成转场。令一个信号色元素以线性运动离网并短暂停顿，其他单元按距离重排；海报旋转停稳后才揭示其网格是乐谱，列映射音高、行映射起音、长度映射音长。配乐逐规则加层，离网处断鼓、揭示前呼吸，保留干燥印刷拟音与原片旁白。引擎位于 demos/cases/lemo-swiss-motion/film/film.js、ease.js 与 score.json。

## 动效 Token

- **两条曲线**：film/ease.js:E=cubicBezier(.7,0,.2,1)；snap 默认提前 E8=.25 秒启动并准时落拍；E16=.125 秒。
- **网格绘制**：film/film.js:gridState：列自 4+c*.25 秒起，行自 5.625+r*.125 秒起，各用 .25 秒画成。
- **旋转与揭谱**：film/film.js:T / drawScoreLabels：29.25–30 秒旋转 90°，30.5 秒起标签擦入，32–36 秒扫过 16 行。
- **离网例外**：film/film.js:flight / circleState：24.5–25 秒走 40%，25–25.25 停顿，25.25–26 秒走余下 60%。

## 制作约束

- 海报列宽保持图形分量，过窄会变成数据图表。
- 旋转、停顿、标签、播放线按顺序出现。
- 合并条块多画 1px，旋转后保持无缝。
- 修改字幕后重新对齐 Whisper 词时刻；先设置 Canvas 字距，再测宽。

## 迁移

- `film/film.js → TX / RULES / LAYOUT`：修改海报文案、规则章节与字幕布局。
- `film/lines.json；film/voices/words_rel.json`：修改旁白文本及逐词时刻。
- `film/score.json → stiff / final / timeline`：修改音符格点、红圆位置、乐句与绝对时间。
- `film/film.js → C；film/ease.js → BPM`：修改色板与节拍，制作配乐时同步 source/music/score.py。

[打开 Demo](../../demos/cases/lemo-swiss-motion/index.html) · [在库中查看](../../cases.html#case/lemo-swiss-motion)
