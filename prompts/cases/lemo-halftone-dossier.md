# 胖橘案卷 · 复古半调案卷

## 实现 Prompt

制作一支复古半调案卷时间线影片。以档案编号、嫌疑人照、三项罪状和盖章节拍组织喜剧，半调网点密度场与印刷错影统一纸面。奶油纸、海军蓝#1D2340、钴蓝、粉#FF5A87、亮黄与橘红；夜间段切到深蓝纸面。Noto Serif SC 900标题、Noto Sans SC 500/900字幕与印章、Bagel Fat One大字及数字、ZCOOL KuaiLe语气字、JetBrains Mono 500/800档案数据。1920×1080、30fps，正面平面印页，大标题左上、猫在右中，底部关键词胶囊、四角案号与REC。逐字弹入、字母坠落压扁、印章冲击、猫腿跑圈、10fps线条沸腾；80px网点阵列扩张遮住剪辑点。标题—指控—嫌疑照—三罪状—证据堆高—23秒下拍无罪印章—可爱理由—结案。无旁白；music.py用NumPy与SciPy合成原创配乐与全部音效，120BPM每小节2秒。实现入口位于demos/cases/lemo-halftone-dossier/film/，保留原作render(t)、原始素材与字体；通过MotionKit.mountFilm接入播放、定位、减少动态暂停和默认关闭的声音。

## 动效 Token

- **盖章**：film/index.html:183–189：p=seg(t,t0−.09,t0)，s=lerp(2.6,1,E.in(p))×[1+.05sin(30a)exp(−9a)]。
- **网点密度**：film/index.html:135–150：r=clamp(f(x,y))×step×maxK；radial为中心光晕，edge为画边密度，创建后路径固定。
- **网点擦场**：film/index.html:wipeUpdate：80px网格、最大r=62、剪辑点两侧.44秒，22/24秒用硬切。

## 制作约束

- 预载字体和全部绘制输入后，用原作render(t)按原帧率定位画面。
- 声音使用Release成片原混音，修改叙事时同步调整旁白、配乐与画面时间表。

## 迁移

- `film/index.html → buildAll / scenes / caption / HUD`：更改标题、三个罪状、道具、猫表演与结案文案。
- `film/index.html → C / F / stampAnim / WIPES`：更改印色、字体层次、印章冲击与转场。

[打开 Demo](../../demos/cases/lemo-halftone-dossier/index.html) · [在库中查看](../../cases.html#case/lemo-halftone-dossier)
