# 聚光主角卡

## 实现 Prompt

用来源案例 ink-press 的原作 renderAt(t) 重放聚光主角卡。保留原片 82–220 帧的光池、114→130 帧推近与 rotY=34° 左侧视角；保留 POP_EASE=bezier(0.2,1.25,0.3,1)、RESEAT_EASE=bezier(0.4,0,0.3,1.05)、110px 悬浮高度和 40 帧周期的 4px 起伏。保留 142→156 与 162→182 帧两圈光束、194→212 帧归位。按 index.html 内联配置的 segments 映射时间，保留原作素材和同区间音轨，声音默认关闭。

## 参数

- **片段**：SceneOpen 的 82–220 帧，138/30 秒；以下帧号为场景帧。
- **聚光与推近**：spotX/spotY 键=86,90,98,104,110,130；CAM_KEYS 在 114→130 帧完成推近。
- **卡片动作弧**：rise=130→140；hover=140→194；beam1=142→156；beam2=162→182；reseat=194→212。

[打开 Demo](../../demos/patterns/spotlight-hero-card/index.html) · [在库中查看](../../patterns.html#pattern/spotlight-hero-card)
