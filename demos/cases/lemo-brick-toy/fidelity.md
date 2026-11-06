# 用零件造火箭 · 积木玩具 · 接入与保真说明

完整代码影片的来源与固定版本见[条目JSON](../../../entries/cases/lemo-brick-toy.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `index.html` | 预载运行文件、字体与音轨，等待iframe的load和READY，再按原fps调用并等待render(t)。 | 接入MotionKit舞台、时间线与声音。 |
| `film/index.html` | 字体入口指向../fonts/；import map把/core/lib.js映射至./core/lib.js。 | 相对路径接入。 |
| `film/core/lib.js` | 复制固定提交的共享运行代码，文本使用LF。 | 本地运行依赖。 |
| `audio/film.m4a` | 从Release以-c:a copy流复制。 | 沿用正式混音。 |
| `fonts/` | 按上游字体、字重和子集保存字体与OFL原文。 | 本地字体加载。 |
| `source/` | 保存成品运行之外的上游制作文件及目录，文本统一LF。 | 保存制作依赖。 |
| `stills/` | 风格帧与制作截图保留在上游，预览由capture生成。 | 成品绘制的输入为源码。 |
| `film/index.html`、`vendor/three@0.170.0/` | Three.js入口与addons映射到本地固定0.170.0依赖链。 | 原作运行库接入。 |
| `film/set.js` | PH从/core/assets/polyhaven/改为../assets/。 | 同源模型、贴图与HDR路径接入。 |
| `film/index.html`、`film/core/three/post.js` | /core/three/post.js映射到原样复制的本地后期模块。 | 共享后期运行依赖。 |

`film/`的绘制、材质、着色器、姿势和时间表沿用原作；许可索引见[LICENSES.md](LICENSES.md)。

## 适配层

`index.html`通过`MotionKit.load.prepare`预载，以同源iframe加载`film/index.html`，等待`window.READY === true`后调用`MotionKit.mountFilm`。舞台1920×1080、24fps、54.000000秒；`renderAt(t)`等待`upstream.render(Math.round(t*24)/24)`。音轨来自Release正式混音，默认关闭。

`?embed`隐藏控制条，`?render`暂停自动播放与声音，`?t=秒`定位；减少动态时暂停在条目的previewAt。镜头标记取DEMO.md的Shots和源码时间表。

## 已接受差异

本次全部取样的原始列与编码链列均达到0.95。

## 与原片对照结果

无头Edge使用`--enable-gpu --ignore-gpu-blocklist --font-render-hinting=none --force-color-profile=srgb`，1920×1080、DPR1。WebGL为Intel Iris Xe / ANGLE D3D11。等待`__motion.ready`、按`floor(t×fps+.5)`对齐帧号并等待定位完成；参考PNG从Release按该帧号精确提取。

原始列比较本库PNG和参考PNG；编码链列在过程目录将PNG以浏览器捕获为JPEG95后，经过`JPEG95 → H264 medium CRF14 → H264 slow CRF19`，最终grain=2，解码为PNG再比较。SSIM取ffmpeg统一yuv444p后的All。

| 序号 | 帧号 | 请求秒 | 对齐秒 | 原始SSIM | 编码链SSIM | 取样 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0.000000 | 0.000000 | 0.994657 | 0.995008 | 开头 |
| 2 | 933 | 38.880000 | 38.875000 | 0.992760 | 0.993173 | frame_sec |
| 3 | 41 | 1.700000 | 1.708333 | 0.993157 | 0.993015 | Shots · 单块积木微距 |
| 4 | 236 | 9.851416 | 9.833333 | 0.994430 | 0.995092 | Shots · 逐小节低机位拼搭 |
| 5 | 503 | 20.950000 | 20.958333 | 0.992961 | 0.993079 | Shots · 崩塌与孤独全景 |
| 6 | 616 | 25.650000 | 25.666667 | 0.990713 | 0.991018 | Shots · 双手与零件特写 |
| 7 | 948 | 39.500000 | 39.500000 | 0.994126 | 0.994683 | Shots · 低机位升空与伴飞 |
| 8 | 1197 | 49.855000 | 49.875000 | 0.984138 | 0.984943 | Shots · 拉远整张书桌 |
| 9 | 1272 | 53.000000 | 53.000000 | 0.985845 | 0.984102 | 片尾前1秒 |

9帧：原始最低**0.984138**、最高**0.994657**；编码链最低**0.984102**、最高**0.995092**。

声音：成片与本库音轨解码为48kHz单声道，以10ms RMS包络在±500ms内互相关，最佳偏移**0ms**，相关系数**1.000000**。
