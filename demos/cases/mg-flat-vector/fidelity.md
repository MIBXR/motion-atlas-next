# 扁平矢量接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-flat-vector.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `film/scene.js` | 移除 `V5`、`NOLINK`、另一剪辑的中文标题、预载与字幕分支；混合表达式保留默认值，保留 popwise 字标、中文标语和全部默认画面数值。 | 另一版剪辑分支 |
| `film/scene.js` | 移除 `window.linkAt`、元素位置导出、`hideLinks` 及其独占辅助函数和数据。 | 开发工具 |
| `index.html`、`film/scene.js` | `/assets/fonts/fonts.css` 改为 `fonts/fonts.css`；`/demos/01-flat-vector/cues.json` 改为 `./film/cues.json`；入口调用 `MotionKit.mountFilm`。 | 路径改写 |
| `fonts/fonts.css` | 只声明默认片使用的 Resource Han Rounded 700 与 Fredoka；字体 URL 指向 `ResourceHanRoundedCN-Bold.ttf` 和官方完整文件 `Fredoka[wdth,wght].ttf`。 | 路径改写 |
| `audio.py` → `source/audio.py` | 保存生成原作配乐的脚本，内容字节和内部路径保持不变。 | 移至 source |

原作、字体、纹理与音轨的来源和许可见 [LICENSES.md](LICENSES.md)。

## 适配层

`index.html` 中的 `MotionKit.mountFilm` 等待原作就绪后，以 `MotionKit.timeline` 调用原作 `window.renderAt(t)`，并用 `MotionKit.expose`、`MotionKit.controls`、`MotionKit.start` 接入本库。尺寸为 1920×1080、30fps、10 秒；原 SVG 保持内部像素，通过 `MotionKit.stage` 等比居中，四周黑边，仅提供横屏。

节点读取 `film/cues.json` 的画面帧与音乐阶段，控制条使用中文，支持播放、暂停、重播、拖动和倍速。声音默认关闭，开启后播放 `audio/film.m4a`，与跳转、暂停和倍速同步；音轨以 Audio Blob 加载。

`?embed`、`?render` 隐藏控制条；`?render` 关闭自动播放和声音；`?t=秒` 定位。减少动态时显示 9.5 秒并暂停；`previewAt: 9.5` 时字标、中英文标语与汇合图形完整。

## 已接受差异

原片中圆点高速飞行与穿窗推镜处有沿速度方向的半透明拖尾：原作 `index.html` 声明 `motionBlur: { samples: 1, shutter: 0.5 }`，`harness/render.mjs` 支持用命令行 `--mb`、`--shutter` 覆盖并按子帧平均出片，拖尾来自这一渲染层。页面实时播放与 `?render` 单帧直接调用原 `renderAt(t)`，没有这层拖尾。

## 与原片对照结果

参考 MP4 用 ffmpeg 取帧，本页用 `scripts/shot.mjs` 在 1920×1080 定位截图，左右对照图保存在第一批工作区 `compare/`。

| 时刻 | 逐张结论 |
| --- | --- |
| 1.0 秒 | 圆点、冲击环、地平线、背景图形与配色一致，边缘差异来自视频压缩。 |
| 3.0 秒 | 太阳、九栋建筑、云树与主角窗口的构图和位置一致。 |
| 5.0 秒 | 人物、手机、气泡、窗框与挂画的位置和形状一致。 |
| 7.5 秒 | 四象限图形、配色与标签字形、字重和位置一致。 |
| 9.5 秒 | 字标、中英文标语的字形、间距、基线及四色点一致。 |

浏览器验收使用 Edge，服务端口 4328。案例页和独立 Demo 自动播放；拖动可定位，`?t=5&autoplay=0` 停在 5 秒；声音默认关闭，开关与 1.5 倍速播放有效，播放中音轨与画面时刻差约 5ms，暂停和结束同步停止。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/01-flat-vector && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。
