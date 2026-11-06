# 被炸平的城市怎样长回来 · 白模投影 · 接入与保真说明

完整代码影片，固定版本见[条目JSON](../../../entries/cases/lemo-white-model.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| index.html | 按原fps调用原作render(t)，等待iframe load与READY；预载运行资源并挂接成片音轨。 | 接入MotionKit的时间线、定位、播放与减少动态。 |
| film/index.html | 字体与import map定位到本案例fonts/、film/core/与固定three.js子集。 | 接入本地路径。 |
| audio/film.m4a | 由Release公开成片以-c:a copy提取。 | 保留原成片混音。 |
| source/ | 保存上游不参与成品运行的制作文件与原始来源、许可证据；stills留在上游。 | 保留重建所需资料。 |
| film/main.js | data/相对URL定位到../assets/data/；core进口由import map接入。 | 模型与阴影素材路径接入。 |

## 适配层

`MotionKit.load.prepare`预载资源，等待原作`READY`；`MotionKit.mountFilm`使用1920×1080、24fps、40.000000秒，`renderAt(t)`调用并等待`render(round(t×fps)/fps)`。镜头标记取DEMO.md的Shots。

`?embed`隐藏工具栏，`?render`暂停播放与声音，`?t=秒`定位；减少动态时停在30.4秒。音轨为公开成片流复制，默认关闭。画面由原作render(t)直接生成。


## 与原片对照结果

无头Edge使用`--enable-gpu --ignore-gpu-blocklist --font-render-hinting=none --force-color-profile=srgb`，1920×1080、DPR 1；三维与灯台使用Intel Iris Xe / ANGLE Direct3D11。等待`__motion.ready`并按`round(t×fps)/fps`定位。参考PNG从Release成片按相同帧号精确提取。

原始列比较参考PNG与本库PNG；编码链列将本库画面以JPEG95、libx264 medium CRF14 yuv420p，再以slow CRF19编码解码；全部编码在过程目录完成。颗粒取上游build.sh的mux参数：1。颗粒滤镜先推进到原视频帧号，再选择测量帧，保持相同的时间相位。编码参数见source/build.sh和共享core/render/video.mjs、mux.sh。

编码链值使用单帧I帧测量。两张图像均转yuv444p，取ffmpeg SSIM All。左右拼图保存在过程目录renders/<id>/，左为参考、右为本库。


| 视频帧号 | 实际秒 | 原始SSIM All | 编码链SSIM All | 覆盖 |
| --- | --- | --- | --- | --- |
| 0 | 0.000000 | 0.997289 | 0.997232 | 开头 |
| 730 | 30.416667 | 0.978426 | 0.980894 | frame_sec |
| 22 | 0.916667 | 0.996589 | 0.996213 | Shots · 白模屋顶中点 |
| 50 | 2.083333 | 0.996540 | 0.995878 | Shots · 展厅熄灯中点 |
| 101 | 4.208333 | 0.987334 | 0.988274 | Shots · 战前投影中点 |
| 211 | 8.791667 | 0.986929 | 0.987676 | Shots · 轰炸日期与市政厅中点 |
| 344 | 14.333333 | 0.973434 | 0.979138 | Shots · 年代逐层点亮中点 |
| 475 | 19.791667 | 0.981842 | 0.985170 | Shots · 高度光层中点 |
| 533 | 22.208333 | 0.995272 | 0.993990 | Shots · 投影静默中点 |
| 598 | 24.916667 | 0.978945 | 0.983196 | Shots · 冬至太阳中点 |
| 749 | 31.208333 | 0.977899 | 0.980636 | Shots · 阴影量程与屋顶中点 |
| 905 | 37.708333 | 0.992183 | 0.991002 | Shots · 展厅亮灯与片尾中点 |
| 936 | 39.000000 | 0.992112 | 0.991010 | 片尾前1秒 |

13帧：原始最低0.973434、最高0.997289；编码链最低0.979138、最高0.997232。

声音：原片与audio/film.m4a解码为48kHz单声道，每10ms取RMS包络，在±500ms内互相关；最佳偏移0ms，相关系数1.000000。
