# 长出来的小岛 · 低多边形等距

## 实现 Prompt

制作《长出来的小岛 · 低多边形等距》这样的代码影片：空海中逐格长出岛屿、树木和村庄，每次生长都奏出一个音符；天黑后灯塔扫过房屋重奏旋律，为出海的小船指路。生长事件同时决定几何、音高和落点，转台镜头展示构成；昼夜光照与窗灯把建造转为一个小世界的生活。Three.js 平面着色六边形地块、房屋、风车、树、海浪、浮标和灯塔；不依赖外部贴图或模型。Josefin Sans 300/600/700、Quicksand 500/600/700，拉开字距的标题与底部字幕。正交转台、逐拍生长与弹性落定；太阳和海天颜色连续插值，灯塔转动后镜头正交拉远至视锥高度420。96 BPM D大调五声音阶感；生长EV带MIDI note驱动马林巴、卡林巴和木块；Kokoro af_sky旁白。实现使用demos\cases\lemo-lowpoly-island\film\story.js, demos\cases\lemo-lowpoly-island\film\world.js, demos\cases\lemo-lowpoly-island\film\main.js, demos\cases\lemo-lowpoly-island\source\music\score.py。

## 动效 Token

- **生长事件**：film/world.js:213–229、370–381：地块EV带note；窗户与beamhit共用H.note，source/music/score.py按事件合成。
- **光照与转台**：film/story.js:SKY、SHOTS；film/main.js:skyAt/cam；2×SSAA、4096阴影、GTAO；film/world.js:448按night提升窗灯自发光。

## 制作约束

- 画面由上游render(t)直接绘制，按原作帧率定位。
- 修改字幕或场景文案后按source中的字体流程重建相同字重和字符子集。
- 声音使用原片混音，修改事件时同步更新声音制作文件。

## 迁移

- `film/story.js`：按原作数据与函数修改故事内容、画面和物件。
- `film/world.js`：按原作数据与函数修改时间表、镜头和节拍。

[打开 Demo](../../demos/cases/lemo-lowpoly-island/index.html) · [在库中查看](../../cases.html#case/lemo-lowpoly-island)
