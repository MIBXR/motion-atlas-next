# 纸墨逐词字卡

## 实现 Prompt

用来源案例 ink-press 的原作 renderAt(t) 重放纸墨逐词字卡。保留 TITLE_CARDS.card2 的原文与 *Radar,* 强调、116px 衬线标题和 #955905 琥珀斜体；按 delay=4+i*4 逐词入场，每词 9 帧，用 bezier(0.2,0.75,0.3,1) 从 scale=1.28 与 blur=7px 落定。数字从第 12 帧起滚动 22 帧，下划线 16→34 帧伸展，47→55 帧退出。按 index.html 内联配置的 segments 映射时间，保留原作素材和同区间音轨，声音默认关闭。

## 参数

- **片段**：AIFL_SHOTS.card2：565–620 帧，55/30 秒。
- **逐词**：delay=4+i*4；每词 delay→delay+9；本张 7 词，最后一词 37 帧落定。
- **副标与退出**：subT=10→22；DigitRoll delay=12、滚动 22 帧；underline=16→34；fadeOut=duration-8→duration，即 47→55。

[打开 Demo](../../demos/patterns/paper-title-card/index.html) · [在库中查看](../../patterns.html#pattern/paper-title-card)
