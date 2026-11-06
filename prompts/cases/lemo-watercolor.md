# 跟着雨走 · 水彩笔刷

## 实现 Prompt

制作一支在暖色纤维纸上自画而成的水彩纪录片：所有形体用变宽半透明色带与 3–9 条断续毛刷叠色，露出飞白，不加矢量轮廓；树干、枝、叶逐笔进入，完成后缓存精灵并轻微摇曳。纸白承担光线，场景维持三至五个色相，保留一个强调色；衬线标题、手写批注、等宽测量与中文衬线字幕相互分工。用四层视差和沿可测量梯度的连续横移组织空间，在事件处减速，用纸色雾洗回空白后画出地图。声音保留温和连续配乐、从场景材料生成的刷纸与自然声、舒缓旁白及短暂停顿，原片音轨同步播放。引擎位于 demos/cases/lemo-watercolor/film/engine.js、plants.js、scene.js 与 main.js。

## 动效 Token

- **毛刷色带**：film/engine.js:mk / drawS：rough=.22，w≥6 时 nb=clamp(round(w/3.2),3,9)，bristle alpha=.3–.85；drawList 每笔占 clamp(4/N,.12,.5) 的进度。
- **视差与横移**：film/scene.js:LAY / camXf：0.25/0.55/1/1.55；10.3–73 秒由 700px 单调移到 9800px，54.2–57.8 秒 camYf 上移 980px。
- **纸雾**：film/main.js:drawMist：70.3–73.6 秒 eio；两层 lift=120/0、alpha=.55/1，边缘噪声 160px、正弦 12px。
- **摇曳**：film/scene.js:drawPlants：树约 .006、草 .01–.03，sin(1.15t+φ)+.4sin(2.7t+2φ)。

## 制作约束

- 改文案后，按 fetch_fonts.mjs 中的 scene.js + main.js 字符范围重建 CJK 子集。
- 在 render 内新建笔画时使用 withSeed，避免不同渲染进程出现随机差异。
- 洗色条带应超过画幅，纸雾与纵向抬升时不露出硬边。
- 成千笔画先缓存为精灵；配乐剪辑改变时，同步推导袋鼠落地的节拍常数。

## 迁移

- `film/scene.js → VO / ZONES / RAINK`：修改旁白、字幕、区域范围与降雨量。
- `film/scene.js → camXf / camYf / FIRE`：修改长镜路线、量高与火后重生时刻。
- `film/scene.js → ZCOL；film/plants.js → COL`：修改环境与植物色板。
- `film/main.js → STN / MSTOP / drawMap`：修改地图雨量站、色带与深时插值。

[打开 Demo](../../demos/cases/lemo-watercolor/index.html) · [在库中查看](../../cases.html#case/lemo-watercolor)
