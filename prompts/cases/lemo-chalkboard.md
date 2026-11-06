# 汉字的故事 · 黑板粉笔

## 实现 Prompt

制作一支黑板粉笔时间线影片。粉笔笔顺、彩色部件、推拉黑板与一次原位擦写共同承担汉字溯源讲解。深绿板#0f1c15，白粉笔与橙粉笔，孩子的浅黄笔迹；暖白墙与绿色墙裙。中文逐笔中心线，英文EMS Delight / EMS Casual Hand单线字；中英双语字幕使用LXGW WenKai v1.530的精确子集。1920×1080、30fps，6400×1700板面，两块带田字格的前板与一块后板，字幕单独叠在底部。每笔按弧长显露粉粒，前板侧滑，镜头跨四个字形横移；橙线跨板缝后一次擦写落定结论。先提出网上说法，再滑开前板追溯字形；箭尺与跨板线加速，擦写后留1.5秒阅读再写“没弄反”。Microsoft Edge TTS晓晓中文旁白；真实粉笔录音切粒、古琴物理模型、马林巴与拨奏低音、板轨与走廊铃。实现入口位于demos/cases/lemo-chalkboard/film/，保留原作render(t)、原始素材与字体；通过MotionKit.mountFilm接入播放、定位、减少动态暂停和默认关闭的声音。

## 动效 Token

- **原位擦写**：film/js/film.js:182–200：wipe宽360、持续.75秒，q1/q2及英文标记wiped，重写中心沿用G1/G2。
- **橙色部件**：film/js/ancient.js:39–46：L.o选择orange，楷书0–6笔着橙；film.js:151将短的0–4笔着橙。
- **粉笔沉积**：film/js/chalk.js与r2d.js：板面覆盖精灵按弧长显露，2×2超采样粉粒沉积。

## 制作约束

- 画面以原作render(t)按原帧率定位，字体和全部绘制输入预载后开始。
- 声音使用Release成片原混音，修改叙事时同步调整旁白、配乐与画面时间表。

## 迁移

- `film/js/film.js → SUB / VO / build`：更改中英字幕、配音时长、镜头与书写安排。
- `film/js/hz.js / ancient.js`：修改中文笔顺数据与历史字形，原始依据在source/FACTS.md。

[打开 Demo](../../demos/cases/lemo-chalkboard/index.html) · [在库中查看](../../cases.html#case/lemo-chalkboard)
