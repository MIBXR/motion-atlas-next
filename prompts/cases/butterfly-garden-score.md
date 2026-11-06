# 蝶の舞う庭 · 曲式赏析滚动总谱

## 实现 Prompt

做一部 1920×1080、60fps 的配乐可视化短片。左侧是向左匀速滚动的总谱：每件乐器一行，音符画成圆头横条，厚度和透明度区分未来、发声、已过去三态，播放头竖线固定。右侧是一条红色竖栏，放竖排曲名和标志。顶部写场次、调名和小节数，底部写当前段落的解说。用括号和数字标出主动机每次入场；转调和高潮时全画面红白反色，并压上巨型场次标题；重要呼应时把镜头聚焦到相关的几行。画面只由时刻 t 决定，声音用原曲。

## 动效 Token

- **卷轴**：卷轴速度 190px/s
- **播放头**：播放头 x=880
- **音高**：半音步长 0.8px

## 制作约束

- 画面数据来自逐帧提取，换曲需要重新制作 notes.json。

## 迁移

- `音符数据`：film/data/notes.json：每行一个音符，横坐标按 190px/s 换算时间。
- `字幕与场次`：film/data/timeline.json。
- `配色`：film/scene.js 顶部的颜色常量。
- `乐器行`：film/scene.js 的 ROWS 与 film/data/notes.json 的 row。

[打开 Demo](../../demos/cases/butterfly-garden-score/index.html) · [在库中查看](../../cases.html#case/butterfly-garden-score)
