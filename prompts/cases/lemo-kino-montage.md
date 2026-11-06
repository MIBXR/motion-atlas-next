# 410 天 · 构成主义蒙太奇

## 实现 Prompt

制作一支构成主义蒙太奇影片。红色斜梁承载大字，档案影像在同一纸墨双色中按拍撞击；文档提问、实拍回答，工人剪影逐层成为建筑。−18°轴线、沿轴砸入、72°红带擦除、文档圆圈开光圈、照片楼层逐拍向上叠。沿用以下制作方法：American Bridge Company《Empires of Steel》、Lewis Hine照片及1931年宣传册；上游prep.py生成印刷双色、文档裁片和u2net人物剪影。声音采用Release原混音：120 BPM原作采样配乐、Kokoro am_michael旁白、铆钉机实录与工地环境声。可编辑入口：film/index.html → T / VO / SHOTS；source/tools/prep.py → CLIPS / CUTS；film/index.html → TH / FLOORS / S9。

## 动效 Token

- **斜线条带**：film/index.html:S3；TH=−18°，3条290px高的条带、22px间隔、每条2个1160px窗；BEAT=.5。
- **人物叠塔**：film/index.html:FLOORS / S9；43.25–48.25秒逐层组装，86层锚点停留后升到102。

## 制作约束

- 影像、字体和数据替换后同步调整原作取帧与文字时间表。
- 声音与画面沿用同一来源时间，音轨默认关闭。

## 迁移

- `film/index.html → T / VO / SHOTS`：修改场次、字幕与旁白起点。
- `source/tools/prep.py → CLIPS / CUTS`：更换档案片段、双色处理及人物裁片。
- `film/index.html → TH / FLOORS / S9`：修改斜线角度与人物叠塔顺序。

[打开 Demo](../../demos/cases/lemo-kino-montage/index.html) · [在库中查看](../../cases.html#case/lemo-kino-montage)
