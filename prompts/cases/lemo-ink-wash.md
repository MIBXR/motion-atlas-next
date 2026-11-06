# 剑客渡江 · 中国水墨

## 实现 Prompt

制作一卷在暖宣纸上生成的写意水墨影片：用焦、浓、重、淡、清五色墨与加载毛刷塑形，湿层渗化积墨，干层保留飞白。纸白承担天空、水面和沉默，画面只留一处朱红并与落印呼应；人物姿势12fps，镜头、墨晕与水纹24fps。题字写在画中，斜体衬线题跋放在每镜留白。决断前真正静默，末笔先完成，浪体再沿笔势分开；结尾拉远把局部放回整幅画。古琴、箫、鼓与纸墨拟音按事件编排，沿用原片音轨。引擎位于 demos/cases/lemo-ink-wash/film/ink.js、comp.js、shots.js 与各镜头模块。

## 动效 Token

- **墨色与渗化**：film/ink.js:TONE；film/comp.js:inkD：五色墨、12点Poisson湿墨模糊，R约5px，边缘积墨为小模糊减大模糊。
- **决断末笔**：film/story.js:T：前三笔28.5–30.35秒，hush=30.5，cut=32.4，cutEnd=32.57；climax.js:renderWrite在cutEnd之后推进2.3秒的裂浪。
- **尺度揭示**：film/passage.js:renderScroll：42.6–45秒eio，z按log插值从1.25到0.315；seal=44.6。

## 制作约束

- 笔画按索引设种子，飞白断点沿固定参考长度，保持人物局部笔触稳定。
- 题跋绘制时重置相机，保留每镜留白。
- 分浪进度从cutEnd之后计算，使斩线先完成。
- 山体图层底部用透明渐变收边，翻转后按实际屏幕范围放置人物。

## 迁移

- `film/story.js → T / VO`：修改时间表、旁白题跋与静默区间；配乐和拟音沿用同一时刻。
- `film/hero.js / glyph.js → POSE / SHUI`：修改人物姿态、剑穗与书写骨架。
- `film/world.js / cross.js / passage.js`：修改山水、相机与装裱收尾。
- `film/comp.js → paper / inkD / inkCol`：修改宣纸、墨色和渗化参数。

[打开 Demo](../../demos/cases/lemo-ink-wash/index.html) · [在库中查看](../../cases.html#case/lemo-ink-wash)
