# 定格 · 体育战术板

## 实现 Prompt

制作一支体育战术板影片。每次定格只讲一个发现，跑位线和圈注与真实球员处于同一变换下；数据来自源帧计数及球场标线透视。原速播放、.6秒倒带、1.8–2.4秒定格，圈人→路径或区域→标签逐次画入，慢放用相邻源帧混合。沿用以下制作方法：beIN SPORTS Türkiye官方CC BY 3.0比赛摘要及Commons同源剪辑，Thomas Rodenbücher球员照片与Olos88球场照片。声音采用Release原混音：比赛解说与人群、Kokoro bm_george旁白、120 BPM乐队采样；定格时鼓组停止，进球和VAR印章配铜管主拍。可编辑入口：film/timeline.json → segments / voice；film/index.html → TRK / GOALS / overlayAnalysis / overlayG1；source/tools/pitch.json / source/tools/homography.py。

## 动效 Token

- **定格画线**：film/index.html:overlayG1 / overlayAnalysis；6.8–9.0、23–25、26.6–28.4、29.6–31.6秒；闪白.1秒、1.035倍急推回定。
- **双机位**：film/index.html:splitView / overlayG2；10.6–14.6秒，960px双窗，6px黄线，.32秒展开。

## 制作约束

- 替换影像、字体和数据后，同步调整原作取帧与文字时间表。
- 声音与画面沿用同一来源时间，音轨默认关闭。

## 迁移

- `film/timeline.json → segments / voice`：修改播放、定格、慢放与旁白区间。
- `film/index.html → TRK / GOALS / overlayAnalysis / overlayG1`：修改球员脚底追踪、进球帧与分析图层。
- `source/tools/pitch.json / source/tools/homography.py`：修改球场标线测点并重建战术板矩阵。

[打开 Demo](../../demos/cases/lemo-telestrator/index.html) · [在库中查看](../../cases.html#case/lemo-telestrator)
