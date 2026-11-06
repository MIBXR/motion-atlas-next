# 列表堆叠压入

## 实现 Prompt

用来源案例 ink-press 的原作 renderAt(t) 重放列表堆叠压入。保留五条列表、CUES=[18,30,42,54,66]、22 帧入场与 bezier(0.45,0.05,0.25,1.12)。保留 600px 起始下移、1.06→1 缩放、交替 ±2° 旋转，以及后续入场造成 0→6→0px 的 8 帧压入脉冲；计数按 frame>=cue+22 更新。按 index.html 内联配置的 segments 映射时间，保留原作素材和同区间音轨，声音默认关闭。

## 参数

- **片段**：AIFL_SHOTS.chart：620–725 帧，105/30 秒。
- **堆叠**：CUES=[18,30,42,54,66]；DUR=22；最后一条在 88 帧落位。
- **压入与收束**：stackPress：[cue,cue+4,cue+8]→[0,6,0]；glazeVis 在 81,86,92,95 帧取 0,1,1,0。

[打开 Demo](../../demos/patterns/list-stack-press/index.html) · [在库中查看](../../patterns.html#pattern/list-stack-press)
