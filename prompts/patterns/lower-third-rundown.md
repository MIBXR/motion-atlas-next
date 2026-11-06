# 串联单与标题条

## 实现 Prompt

用来源案例lemo-news-package的原作render(t)重放“串联单与标题条”。串联单各行按拍在竖向遮罩中翻入，回顾时同一列表逐行打勾；报道的分类签、标题条和来源行与所属画面一起在带状转场裁切区内绘制，新旧文字在同一帧交接。保留参数：film/main.js:rundown；四行2.3/2.7/3.1/3.5秒翻入，回顾45.8/46.2/46.6/47.0秒打勾。；film/main.js:strap；x=96，y=904，宽1250、高104，分类签y=856，中文50px、英文27px。；film/main.js:layer / wipe；WIPES各侧通过layer先绘制自己的strap、credit、cornerTag，再由带状遮罩交接。。重放区间由入口segments配置，来源素材与音轨直接复用。

## 参数

- **原片重放区间**：1.5–9秒；23.7–24.3秒；45–47.5秒；1倍速，总时长10.6秒。

[打开 Demo](../../demos/patterns/lower-third-rundown/index.html) · [在库中查看](../../patterns.html#pattern/lower-third-rundown)
