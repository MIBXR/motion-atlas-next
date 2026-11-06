# 逐词卡拉 OK 歌词

## 实现 Prompt

复用 pdoom-video 原作的异步 renderAt(t)，按 index.html 内联 segments 重放“逐词卡拉 OK 歌词”，总时长7秒。lyrics.js 的 LY 保存逐句起止与文字；karaoke 用整句实测宽度加 110px 生成居中的笔刷底。drawKaraokeText 把句子拆词，以非空格字符总数计算 sung，再按每个词已唱比例裁切填色；逐词高亮由句内字符长度推导。 film/src/timeline.js:96/98/107/111：800 50px Shantell Sans；中心 x=960，底板 y0=978，高约92px；文字基线 y=1022。 film/src/timeline.js:100/113–114：PAL.ink washOp=225、PAL.violet fillOp=60；字底 PAL.cream #FFF5E2，高亮 PAL.ochre #E8AA38；裁切宽 ws[i]*f+2。 film/src/lyrics.js:2–7：LY=[start,end,text]；23–24.4、24.5–26.4、26.5–27.9、28–29.4、29.5–33.4 秒。 保留原画面、固定版本 p5 与 p5.brush、完整字体和同区间 MP3，使用1920×1080、24fps。声音默认关闭，减少动态时暂停在预览帧。

## 参数

- **底板入出场**：film/src/timeline.js:93–102：grow=easeOut((t-a)/.18)*(1-ease((t-(b-.12))/.12))；进入 .18 秒，退出 .12 秒。
- **句内填色**：film/src/timeline.js:104–118：singDur=min(b-a-.1,.45+txt.length*.075)；sung=clamp((t-a)/singDur)*非空格字符数；f=clamp((sung-done)/w.length)。
- **重放区间**：原片23–30秒，巧思总时长7秒。

## 迁移

- `index.html 内联配置 → segments`：设置原片起止时刻，画面与音轨使用相同映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴节点与减少动态的停留时刻。

[打开 Demo](../../demos/patterns/karaoke-word-fill/index.html) · [在库中查看](../../patterns.html#pattern/karaoke-word-fill)
