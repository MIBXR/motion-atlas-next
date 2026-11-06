# 小精灵冒险记 · 纸片立体书

## 实现 Prompt

制作在真实木桌上展开的纸片立体书影片：书页与纸偶用米为单位，纸绘保持平面饱和色、暗棕轮廓、白边和灰纸芯，真实灯光投出剪纸轮廓阴影。每跨页一个主色族；旧立体件围绕底边折倒，40段弯曲页以旧地面和新天空为正反面翻过，新景用back过冲弹起。纸偶刚性移动，以行走距离驱动步态，用scale.x切换前后图。微距相机在低机位、全跨页和房间反打之间移动，64点景深与Neutral色调保持纸的颜色。使用圆润字幕、纸世界气泡和物件化标题，沿用原片Kevin MacLeod配乐、温暖旁白和纸机关拟音。引擎位于 demos/cases/lemo-paper-popup/film/book.js、sets.js、art.js、main.js 与 post.js。

## 动效 Token

- **弹起**：film/sets.js:riseOf / updatePops：back(seg(t,t0,t0+.55),1.7)，深度延迟(.3-z)*1.2，底铰链转角dir*π/2*(1-k)。
- **翻页**：film/story.js:TURNS=[[48.6,51.4],[71.6,74.4],[86.8,89.6]]；main.js在[a+.45,b-.3]用eio，book.js:setLeaf以40段积分，bend=.55*sin(πu)。
- **昼夜翻板**：film/main.js:EX.slats：81.8+i*.28至82.5+i*.28，rotation.y=π*eio；sets.js:buildSlats建立4块双面纸。
- **微距景深**：film/post.js:CoC最大14px、64点金角螺旋采样；main.js:SH独立键表控制pos/target/fov/aperture/focus。

## 制作约束

- 纸偶翻身用scale.x切换前后图，避免rotation.y露出无图背面。
- 纸卡使用alpha贴图的customDepthMaterial，使投影跟随轮廓。
- 使用NeutralToneMapping，翻页发光贴图沿用色图，使背光纸页保持颜色。
- 改中文文案后运行fetch_fonts.mjs重建子集，中文字体栈保留Latin字体。
- 近镜立体件避开镜头路径，角色画布仅在量化姿态改变时重画。

## 迁移

- `film/story.js → VO / BUB / CHAPTERS / OPEN / TURNS`：修改旁白、气泡、章节和开合翻页时刻。
- `film/sets.js → pages / buildSets / RISE / FOLD`：修改各跨页图案、立体件和机关。
- `film/art.js / actors.js`：修改角色、道具图和可折叠纸飞机。
- `film/main.js → pipState / SH / lightsAt`：修改表演、行走距离、相机与灯光。

[打开 Demo](../../demos/cases/lemo-paper-popup/index.html) · [在库中查看](../../cases.html#case/lemo-paper-popup)
