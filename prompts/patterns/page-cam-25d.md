# 2.5D 页面相机

## 实现 Prompt

用来源案例 ink-press 的原作 renderAt(t) 重放2.5D 页面相机。保留 PageCam 的 CamKey、cx/cy/zoom 插值、默认 persp=1400 与 Easing.bezier(0.33,0,0.15,1)；3D 模式使用 CSS zoom 与 translate(960/zoom-cx,540/zoom-cy)。保留 DETAIL_CAM 的 0→75 帧、cy=300→760、zoom=1.1→1.0，以及行嵌入 cue=12+i*9、飞行 12 帧。按 index.html 内联配置的 segments 映射时间，保留原作素材和同区间音轨，声音默认关闭。

## 参数

- **片段**：AIFL_SHOTS.macro：465–565 帧，100/30 秒。
- **相机键**：DETAIL_CAM：[0,cx=960,cy=300,zoom=1.1] → [75,cx=960,cy=760,zoom=1.0]。
- **行嵌入**：cue=12+i*9，land=cue+12，patch 在 land+2 消失，seam 在 land+8 消失。

[打开 Demo](../../demos/patterns/page-cam-25d/index.html) · [在库中查看](../../patterns.html#pattern/page-cam-25d)
