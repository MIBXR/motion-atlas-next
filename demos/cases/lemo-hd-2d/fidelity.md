# 提灯人 · HD-2D · 接入与保真说明

完整代码影片的来源与固定版本见[条目JSON](../../../entries/cases/lemo-hd-2d.json)。

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

`film/`的绘制、材质、着色器、姿势和时间表沿用原作；许可索引见[LICENSES.md](LICENSES.md)。

## 适配层

`index.html`通过`MotionKit.load.prepare`预载，以同源iframe加载`film/index.html?tilt=1`，等待`window.READY === true`后调用`MotionKit.mountFilm`。舞台1920×1080、60fps、76.500000秒；`renderAt(t)`等待`upstream.render(Math.round(t*60)/60)`。音轨来自Release正式混音，默认关闭。

`?embed`隐藏控制条，`?render`暂停自动播放与声音，`?t=秒`定位；减少动态时暂停在条目的previewAt。镜头标记取DEMO.md的Shots和源码时间表。

## 已接受差异

本次全部取样的原始列与编码链列均达到0.95。

## 与原片对照结果

无头Edge使用`--enable-gpu --ignore-gpu-blocklist --font-render-hinting=none --force-color-profile=srgb`，1920×1080、DPR1。WebGL为Intel Iris Xe / ANGLE D3D11。等待`__motion.ready`、按`floor(t×fps+.5)`对齐帧号并等待定位完成；参考PNG从Release按该帧号精确提取。

原始列比较本库PNG和参考PNG；编码链列在过程目录将PNG以浏览器捕获为JPEG95后，经过`JPEG95 → H264 medium CRF14 → H264 medium CRF14拼接重编码 → H264 slow CRF19`，grain=0，解码为PNG再比较。SSIM取ffmpeg统一yuv444p后的All。

| 序号 | 帧号 | 请求秒 | 对齐秒 | 原始SSIM | 编码链SSIM | 取样 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0.000000 | 0.000000 | 0.997362 | 0.999111 | 开头 |
| 2 | 3305 | 55.080000 | 55.083333 | 0.981263 | 0.980948 | frame_sec |
| 3 | 615 | 10.250000 | 10.250000 | 0.984106 | 0.986016 | Shots · 海港极宽景 |
| 4 | 1215 | 20.250000 | 20.250000 | 0.985727 | 0.985283 | Shots · 码头交付任务 |
| 5 | 1830 | 30.500000 | 30.500000 | 0.990202 | 0.991264 | Shots · 夜林横向追踪 |
| 6 | 2550 | 42.500000 | 42.500000 | 0.999114 | 0.999409 | Shots · 风暴石阶俯冲 |
| 7 | 3225 | 53.750000 | 53.750000 | 0.987278 | 0.986937 | Shots · 点亮灯塔拉回 |
| 8 | 4035 | 67.250000 | 67.250000 | 0.985028 | 0.987730 | Shots · 回到海港与片名 |
| 9 | 4530 | 75.500000 | 75.500000 | 0.987730 | 0.987470 | 片尾前1秒 |

9帧：原始最低**0.981263**、最高**0.999114**；编码链最低**0.980948**、最高**0.999409**。

声音：成片与本库音轨解码为48kHz单声道，以10ms RMS包络在±500ms内互相关，最佳偏移**0ms**，相关系数**1.000000**。
