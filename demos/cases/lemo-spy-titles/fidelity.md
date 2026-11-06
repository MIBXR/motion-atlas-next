# 天鹅绒密码 · 60s 间谍片头 · 接入与保真说明

复刻范围为完整代码影片，来源与固定版本见[条目JSON](../../../entries/cases/lemo-spy-titles.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `index.html` | 预载运行文件、字体、音轨与场景素材；同源iframe等待load及READY后按原fps调用render(t)。 | 接入MotionKit舞台、时间线与声音。 |
| `audio/film.m4a` | 从Release成片以-c:a copy流复制。 | 同步正式混音。 |
| `source/` | 保存成片运行目录之外的上游制作文件，原字节与相对目录结构保留。 | 保存重建依赖。 |
| `stills/` | 上游风格帧与调试图留在来源；本库预览由capture生成。 | 成品绘制不读取这些静帧。 |
| `film/index.html` | 字体样式指向../fonts/；import map把/core/lib.js映射到film/core/lib.js。 | 路径接入；共享lib.js为固定提交原字节。 |
| `film/index.html` | opentype入口指向固定版本vendor/；将其XHR字体请求定位到../fonts/LeagueGothic.ttf。 | 运行库与字体路径接入。 |

`film/` 的绘制、着色器、数据表与时间轴文件保留固定提交的原字节；入口负责路径接入。许可索引见 [LICENSES.md](LICENSES.md)。

## 适配层

`index.html` 使用 `MotionKit.load.prepare` 预载，等待同源iframe的load事件与 `window.READY === true`，再以 `MotionKit.mountFilm` 接入1920×1080横屏、24fps、44.1秒的舞台。`renderAt(t)` 执行并等待 `upstream.render(Math.round(t*24)/24)`，画面由上游直接绘制。声音读取Release音轨流复制的 `audio/film.m4a`，默认关闭。

`?embed` 隐藏控制条，`?render` 暂停自动播放与声音，`?t=秒` 定位；减少动态时暂停在条目的 `previewAt`。镜头标记取上游Shots与源码时间表。

## 已接受差异

原始PNG全部达到0.95；编码链单帧测量中两张平坦纸面低于阈值，差异为纸纹与颗粒的编码和时域相位。

## 与原片对照结果

无头Edge使用 `--enable-gpu --ignore-gpu-blocklist --font-render-hinting=none --force-color-profile=srgb`，ANGLE使用本机默认后端，实际为Intel Iris Xe／ANGLE Direct3D11；视口1920×1080、DPR1。等待 `__motion.ready` 后，按 `floor(t×24+.5)` 对齐视频帧并定位截图。参考PNG取自Release的相同帧号。

**原始**列比较参考PNG与本库PNG。**编码链**列把本库PNG在独立测量页捕获为JPEG95，按上游链编码并解码；全部编码在过程目录进行，页面直接运行原作render(t)。两幅PNG转为yuv444p，取ffmpeg SSIM All。

`source/build.sh:12–13`、`source/tools/mux.sh:9–12`与共享`core/render/video.mjs:49–57`：24fps，JPEG95 → libx264 medium CRF14 yuv420p → libx264 slow CRF24 yuv420p、noise=c0s=6:allf=t。

测量使用单张I帧视频，颗粒从该测量帧起计算。`compare-N.png`为左参考、右本库原始PNG，`compare-encoded-N.png`为左参考、右编码链测量PNG。

Shots表的数字时段按原作时间表与镜头调度确定，开头、frame_sec、各段中点和片尾前1秒按视频帧去重。

| Shots段 | 起止（秒） | 中点（秒） | 视频帧号 |
| --- | --- | --- | --- |
| Cold open | 0.000000–2.272727 | 1.136364 | 27 |
| Every credit-set location · velvet | 5.000000–6.818182 | 5.909091 | 142 |
| Every credit-set location · intro | 7.727273–9.545455 | 8.636364 | 207 |
| Every credit-set location · airport | 9.545455–16.818182 | 13.181818 | 316 |
| Every credit-set location · train | 16.818182–21.818182 | 19.318182 | 464 |
| Every credit-set location · casino | 22.272727–25.000000 | 23.636364 | 567 |
| Chase | 9.545455–31.363636 | 20.454545 | 491 |
| Montage | 21.818182–25.909091 | 23.863636 | 573 |
| Hero moment | 25.909091–31.363636 | 28.636364 | 687 |
| Ending | 33.181818–37.727273 | 35.454545 | 851 |

| 序号 | 视频帧号 | 请求秒 | 实际秒 | 原始SSIM All | 编码链SSIM All | 覆盖 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0.000000 | 0.000000 | 0.984285 | 0.982567 | 开头 |
| 2 | 635 | 26.460000 | 26.458333 | 0.971008 | 0.968340 | frame_sec |
| 3 | 27 | 1.136364 | 1.125000 | 0.986112 | 0.980231 | Shots · Cold open中点 |
| 4 | 142 | 5.909091 | 5.916667 | 0.961771 | 0.944675 | Shots · Every credit-set location · velvet中点 |
| 5 | 207 | 8.636364 | 8.625000 | 0.969625 | 0.953668 | Shots · Every credit-set location · intro中点 |
| 6 | 316 | 13.181818 | 13.166667 | 0.968229 | 0.963308 | Shots · Every credit-set location · airport中点 |
| 7 | 464 | 19.318182 | 19.333333 | 0.962903 | 0.967124 | Shots · Every credit-set location · train中点 |
| 8 | 567 | 23.636364 | 23.625000 | 0.963293 | 0.967688 | Shots · Every credit-set location · casino中点 |
| 9 | 491 | 20.454545 | 20.458333 | 0.965647 | 0.968358 | Shots · Chase中点 |
| 10 | 573 | 23.863636 | 23.875000 | 0.963158 | 0.968992 | Shots · Montage中点 |
| 11 | 687 | 28.636364 | 28.625000 | 0.975100 | 0.970703 | Shots · Hero moment中点 |
| 12 | 851 | 35.454545 | 35.458333 | 0.963973 | 0.953690 | Shots · Ending中点 |
| 13 | 1034 | 43.100000 | 43.083333 | 0.965578 | 0.942868 | 片尾前1秒 |

13帧：原始最低 **0.961771**、最高 **0.986112**，13/13达到0.95；编码链最低 **0.942868**、最高 **0.982567**，11/13达到0.95。

0.95以下帧与对应实现：

| 视频帧号／实际秒 | 原始 | 编码链 | 代码位置与差异 |
| --- | --- | --- | --- |
| 142／5.916667 | 0.961771 | 0.944675 | film/paper.js:91–123的满幅纸纹、2600根纤维和9000处墨隙，经过source/tools/mux.sh:9–12的grain6、yuv420p和CRF24；原始列达到0.95，编码链单帧测量使用独立颗粒相位。 |
| 1034／43.083333 | 0.965578 | 0.942868 | film/paper.js:91–123的满幅纸纹、2600根纤维和9000处墨隙，经过source/tools/mux.sh:9–12的grain6、yuv420p和CRF24；原始列达到0.95，编码链单帧测量使用独立颗粒相位。 |

声音：成片与本库音轨解码为48kHz单声道，每10ms的RMS包络在±500ms内互相关；最佳偏移 **0ms**，相关系数 **1.000000**。
