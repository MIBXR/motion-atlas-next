# 船说了算 · 工程简报板

## 实现 Prompt

制作《船说了算 · 工程简报板》这样的代码影片：一条千米河道要架桥，船撞上桥墩后确立航道不立墩的条件；简报墙逐个比较梁桥、拱桥、斜拉桥和悬索桥，船从最终方案下通过后拉远整墙结论。同一块板上平面图在上、立面图在下，用两岸投影线对位；磁贴、钢尺和桥梁照片成为可移动的论证物件。Wikimedia Commons桥梁与船照片，经原作BiRefNet抠图、去字、调色、缆索重绘和锚点对齐；板面、墨迹、磁铁和钢尺由代码绘制。LXGW Marker Gothic 400、Archivo可变字重/字宽、IBM Plex Mono 500/600、Noto Sans SC 500/700/900原字符子集。连续板上镜头跟着量线、照片与船移动，四轮判决逐级拉宽；最后从水线船体一次拉到整墙。120 BPM D小调转D大调，电贝斯、MuldjordKit鼓组、低铜管与钟琴；磁贴咔嗒、印章、钢尺和船笛，Kokoro af_heart旁白。实现使用demos\cases\lemo-briefing-board\film\scenes\film.json, demos\cases\lemo-briefing-board\film\kit\board.js, demos\cases\lemo-briefing-board\source\scenes\_gen_film.py。

## 动效 Token

- **投影与尺度**：source/scenes/_gen_film.py:PROJ_T=14.4、BANK_L/BANK_R；film/scenes/film.json:proj0/proj1、ship/ship_side。
- **物件与镜头**：film/kit/board.js:setScene/camAt/renderScene；film/scenes/film.json的elements/cam保存物件、判决和整墙拉远。

## 制作约束

- 画面由上游render(t)直接绘制，按原作帧率定位。
- 修改字幕或场景文案后按source中的字体流程重建相同字重和字符子集。
- 声音使用原片混音，修改事件时同步更新声音制作文件。

## 迁移

- `film/scenes/film.json`：按原作数据与函数修改故事内容、画面和物件。
- `film/kit/board.js`：按原作数据与函数修改时间表、镜头和节拍。

[打开 Demo](../../demos/cases/lemo-briefing-board/index.html) · [在库中查看](../../cases.html#case/lemo-briefing-board)
