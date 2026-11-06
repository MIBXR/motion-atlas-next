# 夜班入职指引 · 后室 / 新怪谈

## 实现 Prompt

制作《夜班入职指引 · 后室 / 新怪谈》这样的代码影片：一名新夜班员工用摄像机记录入职路线；重复的告示、自动对焦的失灵和磁带断裂逐步让守则失去可信度，时钟与电量留下跳时的证据。拍摄介质承担叙事：身影只在一次正确对焦时出现，磁迹撕裂后同一走廊已跳过三小时，边角OSD成为事件证据。原作Three.js 720×540后室、程序纹理与灯阵；VHS着色器升采样至1920×1080并保留4:3侧边黑条。IBM Plex Sans 400/600/700、Plex Sans Condensed 600/700与Plex Mono 500/600；摄像机OSD为原作5×7位图字。0.72m步幅、呼吸和恐惧驱动手持颤动；自动对焦、曝光滞后与磁迹损坏共用story时间。原片荧光灯、湿地毯脚步、摄像机电机与远处等候音乐；Kokoro af_bella广播和am_michael员工低声对白。实现使用demos\cases\lemo-backrooms\film\story.js, demos\cases\lemo-backrooms\film\main.js, demos\cases\lemo-backrooms\film\vhs.js, demos\cases\lemo-backrooms\film\osd.js。

## 动效 Token

- **自动对焦**：film/story.js:FOCUS/APER/T；film/main.js:render 使用 FOCUS(tv)、APER(tv)，thing.visible由T.figOn区间控制。
- **跳时与介质**：film/story.js:W、clock、battery；film/main.js:track/roll；film/vhs.js:tracking tear，OSD独立绘制。

## 制作约束

- 画面由上游render(t)直接绘制，按原作帧率定位。
- 修改字幕或场景文案后按source中的字体流程重建相同字重和字符子集。
- 声音使用原片混音，修改事件时同步更新声音制作文件。

## 迁移

- `film/story.js`：按原作数据与函数修改故事内容、画面和物件。
- `film/main.js`：按原作数据与函数修改时间表、镜头和节拍。

[打开 Demo](../../demos/cases/lemo-backrooms/index.html) · [在库中查看](../../cases.html#case/lemo-backrooms)
