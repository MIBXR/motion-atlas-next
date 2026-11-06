# 网格即乐谱

## 实现 Prompt

用来源案例 lemo-swiss-motion 的原作 render(t) 重放“网格即乐谱”。score.json 同时被画面和 music/score.py 读取，column 对应 A 多利亚调音高、row 对应八分音符起音、length 对应音长；旋转与标签先后完成后，playRow 扫到条块起点时染红并播放对应音符。保留参数：film/score.json:cols / midi / final：7列 A/B/C/D/E/F#/G，对应 MIDI 57/59/60/62/64/66/67；16行，每行 E8=.25 秒。；film/film.js:T / drawUnits / drawScoreLabels / renderFilm：rotD=.75 秒；playRow=(t−32)/.25；film/score.json:timeline.sweep=[32,36]。；film/film.js:PW/PH/CW/RH：海报706×1008，格91×40，条宽 CW−8，相邻段多画1px；source/music/score.py 从同一 final.lead/bass 取起音与音长。。按 index.html 的 segments 把巧思时间映射到原片 29.25–36.25 秒，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **来源片段**：29.25–36.25 秒；29.25–30 秒旋转，30.5 秒标签开始，32–36 秒两小节扫奏。

[打开 Demo](../../demos/patterns/grid-reveals-score/index.html) · [在库中查看](../../patterns.html#pattern/grid-reveals-score)
