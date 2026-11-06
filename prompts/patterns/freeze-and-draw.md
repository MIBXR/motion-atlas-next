# 定格画线

## 实现 Prompt

用来源案例lemo-telestrator的原作render(t)重放“定格画线”。先播放真实比赛，到指定源帧冻结并短闪、急推和压暗；脚底圈、球路或跑位线、空间区域和发现标签按进度画入，图层与画面共用变换，随后从同一帧恢复播放。保留参数：film/timeline.json:g1live 5.2–6.8，g1fz 6.8–9，g1go 9–10.6；源片b的106帧前后接续。；film/index.html:overlayG1 / overlayAnalysis；环→路径或空间→标签错开.3–.6秒，追踪坐标由TRK插值。；film/index.html:render；.1秒闪白、1.035倍急推在.35秒回定；分析叠层与画面使用同一punch变换。。重放区间由入口segments配置，来源素材与音轨直接复用。

## 参数

- **原片重放区间**：5.2–10.6秒；22.4–33.2秒；1倍速，总时长16.2秒。

[打开 Demo](../../demos/patterns/freeze-and-draw/index.html) · [在库中查看](../../patterns.html#pattern/freeze-and-draw)
