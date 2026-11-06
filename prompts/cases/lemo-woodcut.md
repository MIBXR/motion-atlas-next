# 铸钟人 · 木刻版画

## 实现 Prompt

制作一支黑木自刻成画的木刻影片：白光只从刀口生出，排线沿形体与掠射光行进，粗凿先于细线；每刀都有起始时间和推进速度。暖纸边框固定，活字题注置于下边，IM Fell English SC标题先反写于木版，经滚墨、覆纸、擦压与圆柱卷纸揭印后转正。人物12fps，镜头和光24fps，每次新印有两帧错位；只用一种强调色，随高潮扩散，最终收成一处高光。声音由低弦、木皮打击和材料拟音组织，静默后首次出现故事物件的音色，沿用原片混音。引擎位于 demos/cases/lemo-woodcut/film/engine/、shots.js 与 shots2.js。

## 动效 Token

- **刀口推进**：film/engine/knife.js:progOf：u*(.55+.45*u)；hatch.js:hatch把reveal key映射为每刀t0。
- **纸张揭印**：film/trans.js:peelState / curl：前22%慢揭，之后2.2次幂加速；3px条带、圆柱弯曲与透视。
- **印次震动**：film/shots.js:jolt：前两帧[5,-3]、[-2,1]px；regJolt为[10,-6]、[6,1]再回[3,2]。
- **放射刻痕**：film/shots2.js:39–41.6667秒：n=60、r0=62、r1=700–1500、w=22，39.3333秒起0.5秒刻出。

## 制作约束

- 刀线沿形体与掠射光分布，暗部保留完整黑块。
- 雪与火花置于暗块前，使白色刀点可见。
- 每个镜头自行建立缓存，避免依赖其他镜头的先前绘制。
- 题注留在固定纸边，烟汽绘在主体之后。

## 迁移

- `film/timeline.json → grid / keys`：修改速度网格、镜头与声音提示点。
- `film/shots.js / shots2.js`：修改献物、两次铸钟、反刻标题与片尾。
- `film/engine/knife.js / hatch.js / print.js`：修改刀宽、排线、木纹、纸白和错版。
- `film/chars.js / hands.js / world.js`：修改人物、手部高度场和村庄。

[打开 Demo](../../demos/cases/lemo-woodcut/index.html) · [在库中查看](../../cases.html#case/lemo-woodcut)
