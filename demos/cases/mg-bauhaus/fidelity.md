# 几何包豪斯接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-bauhaus.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `film/film.js` | 移除 `V5`、`NOLINK`、另一剪辑的中文标题、字体预载与测量；默认圆形、轴心、横线和背面蓝圆持续按原条件绘制，保留全部默认数值与 `mb` 参数。 | 另一版剪辑分支 |
| `film/film.js` | 移除 `window.linkAt`、元素位置导出及其独占的卡片采样和投影辅助函数、数据。 | 开发工具 |
| `index.html`、`film/film.js` | 字体样式改为 `fonts/fonts.css`，模块入口为 `./film/film.js`，`BASE` 为 `./`；入口调用 `MotionKit.mountFilm`。 | 路径改写 |
| `film/film.js` | 原共享纸纹与颗粒改为 `assets/textures/paper/Paper001_4K_color.jpg`、`assets/textures/grain/grain_fine_2048.png`。 | 路径改写 |
| `fonts/fonts.css` | 保留默认片的 Noto Sans SC、Poppins 900/600 声明，URL 指向本地完整字体文件。 | 路径改写 |
| `audio.py` → `source/audio.py` | 保存生成原作配乐的脚本，内容字节和内部路径保持不变。 | 移至 source |

原作、字体、纹理与音轨的来源和许可见 [LICENSES.md](LICENSES.md)。

## 适配层

`index.html` 中的 `MotionKit.mountFilm` 等待原作模块初始化完成，再通过 `MotionKit.timeline` 调用原作 `window.renderAt(t)`，并用 `MotionKit.expose`、`MotionKit.controls`、`MotionKit.start` 接入本库。尺寸为 1920×1080、30fps、10 秒；Canvas 保持内部像素，通过 `MotionKit.stage` 等比居中，四周黑边，仅提供横屏。

节点读取 `film/cues.json` 的网格起点、事件与四次级联波，控制条使用中文，支持播放、暂停、重播、拖动和倍速。声音默认关闭，开启后播放 `audio/film.m4a`，与跳转、暂停和倍速同步；音轨以 Audio Blob 加载。

`?embed`、`?render` 隐藏控制条；`?render` 关闭自动播放和声音；`?t=秒` 定位。减少动态时显示 9.75 秒并暂停；`previewAt: 9.75` 时套印锁定与纸张位移已结束，字标、几何构成、小字和拍数完整。

## 已接受差异

原作 `film/film.js` 设置 30fps、`motionBlur.samples: 8`、`shutter: 0.5`，即半帧曝光约 16.67ms；`harness/render.mjs` 按每帧八个子帧平均产生运动模糊。页面实时播放与 `?render` 单帧均直接调用原 `renderAt(t)`，没有该外部运动模糊。

## 与原片对照结果

参考 MP4 用 ffmpeg 取帧，本页用 `scripts/shot.mjs` 在 1920×1080 定位截图，左右对照图保存在第一批工作区 `compare/`。

| 时刻 | 逐张结论 |
| --- | --- |
| 1.0 秒 | 网格、圆形、文字与构图一致；原片黑色横条右缘有拖影，本页边缘清晰。 |
| 3.0 秒 | 圆形、三角形、蓝块、横条、轴心与文字的位置、配色一致。 |
| 5.0 秒 | 圆形、三角形、半圆、竖条与网格的构图和颜色一致。 |
| 7.5 秒 | 三原色图形、黑底、双色标签与几何位置一致。 |
| 9.5 秒 | 竖排字标、中德文字形、几何构成与网格落点一致。 |

浏览器验收使用 Edge，服务端口 4328。案例页和独立 Demo 自动播放；拖动可定位，`?t=5&autoplay=0` 停在 5 秒；声音默认关闭，开关与 1.5 倍速播放有效，播放中音轨与画面时刻差约 5ms，暂停同步停止。


## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/09-bauhaus && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。
