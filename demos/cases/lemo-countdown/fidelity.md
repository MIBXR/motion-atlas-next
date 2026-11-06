# 自己倒数 · 实时倒计时分屏 · 接入与保真说明

复刻范围为完整59.5秒代码影片；来源与固定版本见[条目JSON](../../../entries/cases/lemo-countdown.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `index.html` | 预载字体、素材、绘制代码和音轨；逐帧素材每64个一批下载；等待iframe的READY，按原fps执行并等待render(t)。 | 接入MotionKit舞台、时间线、定位与声音。 |
| `film/index.html` | 字体与assets相对路径指向本体对应目录。上游frames路径指向`../assets/cameras/`。 | 本库目录接入。 |
| `audio/film.m4a` | 从Release成片以`-c:a copy`流复制。 | 保留正式混音。 |
| `source/` | 上游制作脚本、素材证据与非运行数据按原相对结构保存；文本转LF。 | 保留重建依赖。 |
| `assets/` | 逐帧影像仅保留时间线实际读取的源帧区间；原作取帧和处理脚本保存在source/。 | 仅收成片使用的片段。 |
| `stills/` | 预览由本库capture生成。 | 成片绘制不读取上游静帧。 |

## 适配层

`MotionKit.load.prepare`预载后，同源iframe等待`READY === true`。`MotionKit.mountFilm`接入1920×1080、30fps舞台，`renderAt(t)`调用并等待原作`render(Math.round(t*30)/30)`。画面由上游Canvas2D代码直接绘制。`?embed`隐藏控制条，`?render`暂停播放，`?t=`定位；减少动态时停在28.5秒，声音默认关闭。

许可索引见[LICENSES.md](LICENSES.md)。

## 对照结果

在1920×1080、DPR 1的无头Edge中，以30fps精确帧号对照Release成片。取开头、代表帧、DEMO镜头段中点与片尾前1秒，去重后25帧。

| 项目 | 结果 |
| --- | --- |
| 原始PNG SSIM | 0.985175–0.994564 |
| 按原作编码链编解码后的SSIM | 0.985211–0.994109 |
| 音轨RMS包络最佳偏移 | 0ms |
| 音轨包络相关系数 | 1.000000000 |

测量编码链为原作`core/render/video.mjs`的JPEG95 → H.264 CRF14 / medium / yuv420p，再按`source/build.sh`指定的`core/render/mux.sh`执行fps=30、noise=1、H.264 CRF19 / slow / yuv420p；只在过程目录进行。原始画面和编解码后画面的全部采样SSIM均高于0.95。声音采用48kHz单声道、10ms窗口的RMS包络互相关。
