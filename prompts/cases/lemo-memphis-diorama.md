# 柚子城的四季 · 孟菲斯微缩景

## 实现 Prompt

用暖白纸上的有机颗粒边框容纳一处孟菲斯微缩场景，饱和色搭配浅彩，靛蓝约 2px 轮廓、硬紫影与世界空间纹样，三档明暗而不做平滑塑料质感。高三分之四视角一镜缓慢环绕，水、树、鸟、舟与远处行人保持各自相位的连续微动。主地标先用半秒下蹲，再回弹发出环形波；波内逐像素切换地面、树冠、屋顶和水面的下一状态色，环经过的物件生长、展开或下落。框和底部三行字体位置固定，字体用 Inter Tight、Noto Sans SC 和 IBM Plex Mono；四季沿用一首同速度同和声的温暖钢琴曲，仅改变伴奏厚度，下蹲每次触发同一低击、回弹和竖琴上行，轻拟音压在音乐下。引擎位于 demos/cases/lemo-memphis-diorama/film/memphis.js、main.js 与 people.js。

## 动效 Token

- **主树预备与回弹**：film/main.js:WAVES / place：8.8–9.3、18.8–19.3、28.8–29.3 秒，sy=1−.2*io；随后 .6 秒 backOut，scale.xz=1/√sy。
- **季节波**：film/main.js:seasonState / passed：9.3–11.9、19.3–21.9、29.3–31.9 秒，WAVE_MAX=240；passed=clamp((r−distance)/(16*len))；film/memphis.js:FLAT_FS 在环内用 uCol2。
- **相机**：film/main.js:camAt：fov=30，18–22 秒把速度缓降到 .3 倍，R=92−.4te、H=70−.3te。
- **纹样与描边**：film/memphis.js:Diorama：2× 渲染，法线深度描边，框边颗粒以 floor(t*12) 更新。

## 制作约束

- 人物保持远处装饰尺度，物件先预备再变化。
- 季节只改变各材质的状态色，避免全局滤色让白昼发灰。
- 远处纹样降低密度，薄茎加粗或关闭描边。
- 长镜头速度适时放缓，保持主场地在框内。
- 中文改写后使用 tools/fonts.py 重建 TEXT 至 TITLE 范围内的子集。

## 迁移

- `film/main.js → TEXT / TITLE / SWAPS`：修改底部文字与淡换时刻。
- `film/main.js → WAVES / camAt / place`：修改季节、镜头与微动时刻。
- `film/main.js → S / SEASONAL；film/memphis.js → flat`：修改四季材质色、纹样和描边。
- `film/main.js → 场景几何与 PLAZA / POND`：修改村庄、田地与换季中心，并在 source/music.py 中同步音符和拟音。

[打开 Demo](../../demos/cases/lemo-memphis-diorama/index.html) · [在库中查看](../../cases.html#case/lemo-memphis-diorama)
