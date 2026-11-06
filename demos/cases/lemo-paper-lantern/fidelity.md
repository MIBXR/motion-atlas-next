# 末班夜车 · 纸雕灯影 · 接入与保真说明

复刻范围为完整51秒代码影片，原作固定在`bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00`，来源见[条目JSON](../../../entries/cases/lemo-paper-lantern.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `index.html` | 从case-native模板创建同源iframe，预载字体、运行模块、时间表和音轨，等待load与READY后按原帧率调用render(t)。 | 接入MotionKit舞台、时间线和声音。 |
| `film/index.html`、`fonts/fonts.css` | 两条字体声明移到fonts/fonts.css，字体路径指向本案例fonts/；原字号、字重和排版保留。 | 本库字体路径接入。 |
| `film/index.html` | import map将Three.js与addons指向本案例vendor/three@0.170.0/。 | 固定版本运行库接入。 |
| `audio/film.m4a` | 从Release成片以`-vn -c:a copy`流复制。 | 沿用正式旁白、配乐、拟音和混音。 |
| `fonts/` | 按上游tools/fonts.py取得Cormorant Garamond可变字体和Noto Serif SC字符子集，附原OFL文本。 | 补齐未入上游Git的运行字体。 |
| `source/` | 保存build.sh、mix.py、CREDITS、FACTS.md、字体／时间表／字幕工具和旁白数据。 | 保留制作依赖。 |
| `stills/` | 上游风格帧留在来源，本库预览用capture生成。 | 成品绘制不读取静帧。 |

`film/src/`的绘制、着色器、相机与时间调度，以及`film/timeline.json`均保留固定提交内容；复制的文本统一为LF。许可入口见[LICENSES.md](LICENSES.md)。

## 适配层

`MotionKit.load.prepare`预载后创建同源iframe，等待load和`window.READY === true`，以`MotionKit.mountFilm`接入1920×1080、30fps、51秒横屏舞台。`renderAt(t)`执行并等待`upstream.render(Math.round(t*30)/30)`。原作使用SSAA2，逐帧渲染直接取自上游render(t)。

`?embed`隐藏控制条，`?render`暂停自动播放与声音，`?t=秒`定位；减少动态时暂停在9.6秒。六个镜头标记取DEMO.md的Shots与timeline.json，音轨默认关闭。

## 已接受差异

本机为Windows Edge、Intel Iris Xe／ANGLE Direct3D11；原作纸纤维、软影、景深、辉光的栅格化细节和Release的JPEG／H.264编码产生细小像素差异。九个采样点的构图、列车、文字和光照状态与参考相符，两列SSIM全部达到0.95。

## 与原片对照结果

无头Edge使用`--enable-gpu --ignore-gpu-blocklist --font-render-hinting=none --force-color-profile=srgb`，视口1920×1080、DPR1。等待`__motion.ready`与定位完成后截图；字体为loaded，运行资源无错误。参考PNG从Release相同帧号精确提取。

**原始**列比较参考PNG与本库PNG。**编码链**列在独立测量页加载本库PNG并以Chrome JPEG95截图，按上游`core/render/video.mjs`与`core/render/mux.sh`编码并解码：30fps → libx264 medium CRF14 yuv420p → libx264 slow CRF19、无额外颗粒。测量为单张I帧，两图转yuv444p取ffmpeg SSIM All，编码只发生在过程目录。

`compare-N.png`左参考、右本库原始PNG；`compare-encoded-N.png`左参考、右编码链PNG。采样覆盖开头、frame_sec、Shots每段中点与片尾前1秒。

| 序号 | 视频帧号 | 请求秒 | 实际秒 | 原始SSIM All | 编码链SSIM All | 覆盖 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0.000000 | 0.000000 | 1.000000 | 1.000000 | 开头 |
| 2 | 288 | 9.600000 | 9.600000 | 0.989515 | 0.990992 | frame_sec |
| 3 | 207 | 6.900000 | 6.900000 | 0.992232 | 0.993303 | Shots · 雪山站与高架桥中点 |
| 4 | 537 | 17.900000 | 17.900000 | 0.992836 | 0.993873 | Shots · 林间伴行中点 |
| 5 | 716 | 23.875000 | 23.866667 | 0.993044 | 0.994516 | Shots · 隧道淡黑中点 |
| 6 | 917 | 30.575000 | 30.566667 | 0.992946 | 0.993508 | Shots · 河谷亮窗中点 |
| 7 | 1134 | 37.800000 | 37.800000 | 0.992620 | 0.993434 | Shots · 海崖下摇中点 |
| 8 | 1368 | 45.600000 | 45.600000 | 0.995651 | 0.996204 | Shots · 终点灭灯与车票中点 |
| 9 | 1500 | 50.000000 | 50.000000 | 0.992589 | 0.993262 | 片尾前1秒 |

9帧：原始最低 **0.989515**、最高 **1.000000**；编码链最低 **0.990992**、最高 **1.000000**。两列均为9/9达到0.95，无低于阈值的采样帧。

声音：成片与本库音轨解码为48kHz单声道，每10ms的RMS包络在±500ms内互相关；最佳偏移 **0ms**，相关系数 **1.000000**。
