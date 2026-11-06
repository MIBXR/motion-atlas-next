# 小精灵冒险记 · 纸片立体书 · 接入与保真说明

复刻范围为完整代码影片，来源与固定版本见[条目JSON](../../../entries/cases/lemo-paper-popup.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `index.html` | 预载运行文件、字体、音轨与场景素材；同源iframe等待load及READY后按原fps调用render(t)。 | 接入MotionKit舞台、时间线与声音。 |
| `audio/film.m4a` | 从Release成片以-c:a copy流复制。 | 同步正式混音。 |
| `source/` | 保存成片运行目录之外的上游制作文件，原字节与相对目录结构保留。 | 保存重建依赖。 |
| `stills/` | 上游风格帧与调试图留在来源；本库预览由capture生成。 | 成品绘制不读取这些静帧。 |
| `film/index.html` | import map指向vendor/three@0.170.0/，字体样式指向../fonts/；DefaultLoadingManager把assets/请求定位到../assets/。 | 保存本案例的固定运行库与场景文件。 |
| `fonts/fonts.css` | 以原fetch_fonts.mjs取得相同家族、字重和CJK字集，字体URL移至本目录。 | 字体路径接入。 |
| `assets/` | Lythwood Lounge HDRI取自上游assets Release，木纹、台灯、茶具取自固定提交，闹钟和盆栽取自Poly Haven 1K glTF包。 | 补齐成片运行输入。 |

`film/` 的绘制、着色器、数据表与时间轴文件保留固定提交的原字节；入口负责路径接入。许可索引见 [LICENSES.md](LICENSES.md)。

## 适配层

`index.html` 使用 `MotionKit.load.prepare` 预载，等待同源iframe的load事件与 `window.READY === true`，再以 `MotionKit.mountFilm` 接入1920×1080横屏、60fps、133.0秒的舞台。`renderAt(t)` 执行并等待 `upstream.render(Math.round(t*60)/60)`，画面由上游直接绘制。声音读取Release音轨流复制的 `audio/film.m4a`，默认关闭。

`?embed` 隐藏控制条，`?render` 暂停自动播放与声音，`?t=秒` 定位；减少动态时暂停在条目的 `previewAt`。镜头标记取上游Shots与源码时间表。

## 已接受差异

本次所有采样帧的原始PNG与编码链测量均达到0.95。

闹钟和盆栽的上游记录给出模型名称，运行素材使用Poly Haven官方1K glTF包；其余木纹、台灯、茶具来自固定提交，2K HDRI来自上游assets Release。对应下载入口见assets/SOURCES.md。

## 与原片对照结果

无头Edge使用 `--enable-gpu --ignore-gpu-blocklist --font-render-hinting=none --force-color-profile=srgb`，ANGLE使用本机默认后端，实际为Intel Iris Xe／ANGLE Direct3D11；视口1920×1080、DPR1。等待 `__motion.ready` 后，按 `floor(t×60+.5)` 对齐视频帧并定位截图。参考PNG取自Release的相同帧号。

**原始**列比较参考PNG与本库PNG。**编码链**列把本库PNG在独立测量页捕获为JPEG95，按上游链编码并解码；全部编码在过程目录进行，页面直接运行原作render(t)。两幅PNG转为yuv444p，取ffmpeg SSIM All。

`source/render.mjs:55–60`与`source/mux.sh:8–10`：60fps，JPEG95 → libx264 medium CRF14 yuv420p → libx264 slow CRF17 yuv420p、noise=c0s=2:c0f=t+u。

测量使用单张I帧视频，颗粒从该测量帧起计算。`compare-N.png`为左参考、右本库原始PNG，`compare-encoded-N.png`为左参考、右编码链测量PNG。

Shots表的数字时段按原作时间表与镜头调度确定，开头、frame_sec、各段中点和片尾前1秒按视频帧去重。

| Shots段 | 起止（秒） | 中点（秒） | 视频帧号 |
| --- | --- | --- | --- |
| Establishing | 0.000000–10.000000 | 5.000000 | 300 |
| Book opens | 10.000000–15.000000 | 12.500000 | 750 |
| In the book · home | 15.000000–48.600000 | 31.800000 | 1908 |
| Page turn · forest | 48.600000–51.400000 | 50.000000 | 3000 |
| In the book · forest | 51.400000–71.600000 | 61.500000 | 3690 |
| Page turn · sea | 71.600000–74.400000 | 73.000000 | 4380 |
| In the book · sea | 74.400000–86.800000 | 80.600000 | 4836 |
| Page turn · last page | 86.800000–89.600000 | 88.200000 | 5292 |
| In the book · last page | 89.600000–96.400000 | 93.000000 | 5580 |
| Emotional close | 39.000000–46.500000 | 42.750000 | 2565 |
| Edge of the page | 96.400000–104.800000 | 100.600000 | 6036 |
| Flight out | 104.800000–123.400000 | 114.100000 | 6846 |
| End | 123.400000–133.000000 | 128.200000 | 7692 |

| 序号 | 视频帧号 | 请求秒 | 实际秒 | 原始SSIM All | 编码链SSIM All | 覆盖 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0.000000 | 0.000000 | 1.000000 | 1.000000 | 开头 |
| 2 | 1596 | 26.600000 | 26.600000 | 0.983289 | 0.982358 | frame_sec |
| 3 | 300 | 5.000000 | 5.000000 | 0.982237 | 0.983360 | Shots · Establishing中点 |
| 4 | 750 | 12.500000 | 12.500000 | 0.983668 | 0.985069 | Shots · Book opens中点 |
| 5 | 1908 | 31.800000 | 31.800000 | 0.981155 | 0.981320 | Shots · In the book · home中点 |
| 6 | 3000 | 50.000000 | 50.000000 | 0.985634 | 0.989674 | Shots · Page turn · forest中点 |
| 7 | 3690 | 61.500000 | 61.500000 | 0.984238 | 0.984247 | Shots · In the book · forest中点 |
| 8 | 4380 | 73.000000 | 73.000000 | 0.984719 | 0.988948 | Shots · Page turn · sea中点 |
| 9 | 4836 | 80.600000 | 80.600000 | 0.979813 | 0.978001 | Shots · In the book · sea中点 |
| 10 | 5292 | 88.200000 | 88.200000 | 0.984924 | 0.985376 | Shots · Page turn · last page中点 |
| 11 | 5580 | 93.000000 | 93.000000 | 0.981992 | 0.983657 | Shots · In the book · last page中点 |
| 12 | 2565 | 42.750000 | 42.750000 | 0.986535 | 0.984795 | Shots · Emotional close中点 |
| 13 | 6036 | 100.600000 | 100.600000 | 0.993211 | 0.992630 | Shots · Edge of the page中点 |
| 14 | 6846 | 114.100000 | 114.100000 | 0.992538 | 0.992036 | Shots · Flight out中点 |
| 15 | 7692 | 128.200000 | 128.200000 | 0.981635 | 0.981030 | Shots · End中点 |
| 16 | 7920 | 132.000000 | 132.000000 | 0.984911 | 0.982835 | 片尾前1秒 |

16帧：原始最低 **0.979813**、最高 **1.000000**，16/16达到0.95；编码链最低 **0.978001**、最高 **1.000000**，16/16达到0.95。

声音：成片与本库音轨解码为48kHz单声道，每10ms的RMS包络在±500ms内互相关；最佳偏移 **0ms**，相关系数 **1.000000**。
