# 加速发牌飞入

## 实现 Prompt

用来源案例 ink-press 的原作 renderAt(t) 重放加速发牌飞入。保留 26 张牌、PILE=(1430,240)、每张 3px 堆高和 index 派生错位；出发时刻 cue=36+4k-0.0792k(k-1)，飞行 8 帧后用 4 帧压回槽位。保留 40px 悬浮、90px 弧高、DIVE_EASE 与 SETTLE_EASE，以及 0/34/62/82/98 帧相机键。按 index.html 内联配置的 segments 映射时间，保留原作素材和同区间音轨，声音默认关闭。

## 参数

- **片段**：AIFL_SHOTS.table 的 275–375 帧，100/30 秒。
- **镜头阶段**：CAM_KEYS：0→34 旋转特写，34→62 拉远，62→82→98 加速滚动。
- **发牌节奏**：DEAL_START=36；cue=36+4*k-0.0792*k*(k-1)；飞行 cue→cue+8，归位 cue+8→cue+12。

[打开 Demo](../../demos/patterns/deck-deal-flyin/index.html) · [在库中查看](../../patterns.html#pattern/deck-deal-flyin)
