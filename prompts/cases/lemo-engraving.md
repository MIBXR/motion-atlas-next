# 蜜蜂，第七号图版 · 铜版画

## 实现 Prompt

制作一支铜版画时间线影片。让刻线承载明暗、放大镜承载知识、后加淡彩承载奖赏；整支影片以一张博物志图版为世界。纸#f1e8d2、黑墨#1c1510、铜褐；腹部琥珀#d9962a、胸部赭#a8743e、翅灰蓝#a9c3cf、花粉#eaa21a。Bodoni Moda罗马大写与斜体，Pinyon Script手写注释和字幕，全部属于图版排版。1920×1080、24fps，图版压痕与双线边框，蜜蜂居中，四角分配放大圈和自然尺寸标本。开场4.2倍跟刀，揭纸后由4倍拉到整版；放大镜随相机飞排，手工上色时只保留2%呼吸推进。刻刀钩子—揭印—逐层排线—三处细节加速—25至26.25秒静默—弓弦首次进入伴随上色—整版落定—薄纸片尾。96BPM大调羽管键琴与弦乐，CC0 VSCO/VCSL采样；Kokoro bm_fable旁白、刻刀刮擦、铜屑、压版、揭纸、落水与湿刷。实现入口位于demos/cases/lemo-engraving/film/，保留原作render(t)、原始素材与字体；通过MotionKit.mountFilm接入播放、定位、减少动态暂停和默认关闭的声音。

## 动效 Token

- **刻线调度**：film/film.js:42–47：ol0从−2.6到4.2，轮廓/一层/二层/暗部conc=16/70/70/90；burin.js的Ink.schedule分配每线时间。
- **分区上色**：film/film.js:94–104：26.35秒起每区错峰.42秒，翅1.6秒、其余1.25秒；Wash.draw噪声环裁切湿前沿。
- **放大圈**：film/film.js:52–91：半径120，飞行弧高30，引线绕主体保留34px间距。

## 制作约束

- 预载字体和全部绘制输入后，用原作render(t)按原帧率定位画面。
- 声音使用Release成片原混音，修改叙事时同步调整旁白、配乐与画面时间表。

## 迁移

- `film/content.json`：更改标题、拉丁名、三个知识点、字幕、色区、展厅引导与片尾。
- `film/film.js / subjects/bee.js / subjects/details.js`：修改图版时间表、雕刻对象与放大细节。
- `film/engine/burin.js / wash.js / plate.js`：修改刻线宽度、排线、分区淡彩和图版边框排版。

[打开 Demo](../../demos/cases/lemo-engraving/index.html) · [在库中查看](../../cases.html#case/lemo-engraving)
