# 天鹅绒密码 · 60s 间谍片头

## 实现 Prompt

制作虚构60年代间谍片的剪纸片头：四种不透明纸墨，无渐变；局部缓存的剪边、切缝和薄纸阴影形成材质。每个地点由一行完整可读的字幕搭成，人物是帽型和一条强调色领带可辨的侧面剪影。人物12fps、相机24fps，按铜管短击硬切；用同位圆形押韵加速追逐，以两拍停时与全总线静默制造悬念。30°斜线拆开旧景，标题自绘字形沿该方向入场，钥匙进入片名中的锁孔。字幕为左下窄纸条，League Gothic剪边字与League Spartan分工；沿用原片磁带旁白与间谍大乐队混音。引擎位于 demos/cases/lemo-spy-titles/film/paper.js、glyph.js、scenes.js、film.js 与 title.js。

## 动效 Token

- **节拍网格**：film/story.js：BPM=132，BEAT=60/132，OFF=BEAT，B(n,beat)计算所有提示点。
- **剪边与纸影**：film/paper.js:rough / piece：9–10px采样，1.2–2.2px扰动；切缝2.4px，阴影偏移2.5/3.5px、blur5。
- **角色步频**：film/chars.js:runPose；film/film.js:tw：人物按12fps，跑步循环2拍、8幅姿势。
- **标题与斜线**：film/title.js:CUT_ANG=30°；film/film.js:sShatter：旧景260px条带沿DIR退场，新字以1500px位移飞入，sTitle在click后.08秒合缝。

## 制作约束

- 字形整体先可读，推进后仍露出帽檐、鼻子和领带。
- 剪纸边按物件局部空间生成和缓存，背景道具使用更暗底色。
- 匹配剪辑保持圆心与半径衔接。
- 铜管音头提前8ms，停时连混响尾音一起归零。

## 迁移

- `film/story.js → B / HIT / T`：修改速度网格、停时、追逐及标题节点。
- `film/scenes.js / glyph.js`：修改字幕行、字母布景、机场与火车布局。
- `film/chars.js / title.js → GLYPH`：修改角色剪影、钥匙与自绘片名。
- `film/paper.js → C / rough / paperFinish`：修改四墨、剪边和纸纹。

[打开 Demo](../../demos/cases/lemo-spy-titles/index.html) · [在库中查看](../../cases.html#case/lemo-spy-titles)
