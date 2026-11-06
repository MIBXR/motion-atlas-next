# 剑客渡江 · 中国水墨 · 接入与保真说明

复刻范围为完整代码影片，来源与固定版本见[条目JSON](../../../entries/cases/lemo-ink-wash.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `index.html` | 预载运行文件、字体、音轨与场景素材；同源iframe等待load及READY后按原fps调用render(t)。 | 接入MotionKit舞台、时间线与声音。 |
| `audio/film.m4a` | 从Release成片以-c:a copy流复制。 | 同步正式混音。 |
| `source/` | 保存成片运行目录之外的上游制作文件，原字节与相对目录结构保留。 | 保存重建依赖。 |
| `stills/` | 上游风格帧与调试图留在来源；本库预览由capture生成。 | 成品绘制不读取这些静帧。 |
| `film/index.html` | 字体样式指向../fonts/；import map把/core/lib.js映射到film/core/lib.js。 | 路径接入；共享lib.js为固定提交原字节。 |

`film/` 的绘制、着色器、数据表与时间轴文件保留固定提交的原字节；入口负责路径接入。许可索引见 [LICENSES.md](LICENSES.md)。

## 适配层

`index.html` 使用 `MotionKit.load.prepare` 预载，等待同源iframe的load事件与 `window.READY === true`，再以 `MotionKit.mountFilm` 接入1920×1080横屏、24fps、48.0秒的舞台。`renderAt(t)` 执行并等待 `upstream.render(Math.round(t*24)/24)`，画面由上游直接绘制。声音读取Release音轨流复制的 `audio/film.m4a`，默认关闭。

`?embed` 隐藏控制条，`?render` 暂停自动播放与声音，`?t=秒` 定位；减少动态时暂停在条目的 `previewAt`。镜头标记取上游Shots与源码时间表。

## 已接受差异

本次所有采样帧的原始PNG与编码链测量均达到0.95。

## 与原片对照结果

无头Edge使用 `--enable-gpu --ignore-gpu-blocklist --font-render-hinting=none --force-color-profile=srgb`，ANGLE使用本机默认后端，实际为Intel Iris Xe／ANGLE Direct3D11；视口1920×1080、DPR1。等待 `__motion.ready` 后，按 `floor(t×24+.5)` 对齐视频帧并定位截图。参考PNG取自Release的相同帧号。

**原始**列比较参考PNG与本库PNG。**编码链**列把本库PNG在独立测量页捕获为JPEG95，按上游链编码并解码；全部编码在过程目录进行，页面直接运行原作render(t)。两幅PNG转为yuv444p，取ffmpeg SSIM All。

`source/build.sh:11–12`、共享`core/render/video.mjs:49–57`与`core/render/mux.sh:79–89`：24fps，JPEG95 → libx264 medium CRF14 yuv420p → libx264 slow CRF19 yuv420p，grain=0。

测量使用单张I帧视频，颗粒从该测量帧起计算。`compare-N.png`为左参考、右本库原始PNG，`compare-encoded-N.png`为左参考、右编码链测量PNG。

Shots表的数字时段按原作时间表与镜头调度确定，开头、frame_sec、各段中点和片尾前1秒按视频帧去重。

| Shots段 | 起止（秒） | 中点（秒） | 视频帧号 |
| --- | --- | --- | --- |
| Opening | 0.000000–5.600000 | 2.800000 | 67 |
| Establishing | 5.600000–14.450000 | 10.025000 | 241 |
| Travel | 14.450000–21.300000 | 17.875000 | 429 |
| Threat | 21.300000–26.800000 | 24.050000 | 577 |
| Silence | 26.800000–35.000000 | 30.900000 | 742 |
| Release | 35.000000–42.600000 | 38.800000 | 931 |
| Ending | 42.600000–48.000000 | 45.300000 | 1087 |

| 序号 | 视频帧号 | 请求秒 | 实际秒 | 原始SSIM All | 编码链SSIM All | 覆盖 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0.000000 | 0.000000 | 0.990727 | 0.990155 | 开头 |
| 2 | 829 | 34.560000 | 34.541667 | 0.987240 | 0.986924 | frame_sec |
| 3 | 67 | 2.800000 | 2.791667 | 0.990160 | 0.989363 | Shots · Opening中点 |
| 4 | 241 | 10.025000 | 10.041667 | 0.988208 | 0.985827 | Shots · Establishing中点 |
| 5 | 429 | 17.875000 | 17.875000 | 0.986205 | 0.986643 | Shots · Travel中点 |
| 6 | 577 | 24.050000 | 24.041667 | 0.986556 | 0.986242 | Shots · Threat中点 |
| 7 | 742 | 30.900000 | 30.916667 | 0.989022 | 0.988322 | Shots · Silence中点 |
| 8 | 931 | 38.800000 | 38.791667 | 0.989838 | 0.990279 | Shots · Release中点 |
| 9 | 1087 | 45.300000 | 45.291667 | 0.991569 | 0.989274 | Shots · Ending中点 |
| 10 | 1128 | 47.000000 | 47.000000 | 0.991158 | 0.988222 | 片尾前1秒 |

10帧：原始最低 **0.986205**、最高 **0.991569**，10/10达到0.95；编码链最低 **0.985827**、最高 **0.990279**，10/10达到0.95。

声音：成片与本库音轨解码为48kHz单声道，每10ms的RMS包络在±500ms内互相关；最佳偏移 **0ms**，相关系数 **1.000000**。
