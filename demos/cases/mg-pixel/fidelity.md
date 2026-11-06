# 像素冒险复刻说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-pixel.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `index.html`、`film/film.js` | 删除 `?v5=1`、`nolink`、`linkAt` 及像素风标题、圆形水晶球、独占字形构造与布局数据；条件表达式直接保留公开成片 PIXEL QUEST 的默认分支。 | 另一版剪辑分支 |
| `film/film.js` | 删除 `?sheet`、`?nocrt`、`?nolight`、精灵图板 `drawSheet()` 与调试接口 `window.__frame`；默认成片使用完整 CRT、光池、夜色波与缩放。 | 开发工具 |
| `index.html` | 字体表改为 `fonts/fonts.css`，原作入口改为 `./film/film.js`；在 `window.__ready = true` 后调用 `MotionKit.mountFilm`，使用案例目录内资源并接入播放控制。 | 路径改写 |
| `film/film.js`、`fonts/fonts.css` | 时刻表改为 `./film/cues.json`，只保留 Fusion Pixel 12、Press Start 2P 声明并使用同目录完整字体，资源随案例独立交付。 | 路径改写 |
| `audio.py` → `source/audio.py` | 配乐制作脚本原样保存，内部路径保持原文；播放使用 `audio/film.m4a`。 | 移至 source |

## 适配层说明

`index.html` 中的 `MotionKit.mountFilm` 通过 `MotionKit.timeline` 调用原作 `window.renderAt(t)` 并返回原 Promise；时长、尺寸、帧率读取 `window.DEMO`。`MotionKit.stage` 保持原作 1920×1080 内部像素，仅提供横屏，通过 `translate` 与等比 `scale` 居中适配窗口，四周黑边。

`MotionKit.expose`、`MotionKit.controls`、`MotionKit.start` 提供自动播放、暂停、拖动、`?embed`、`?render`、`?t=秒` 与减少动态偏好；控制条和倍速选项为中文。时间轴标记读取 `film/cues.json` 的事件与色板节点。

声音默认关闭，开启后播放无损抽取的 `audio/film.m4a`；播放、暂停、跳转、结束与变速同步，播放偏差超过 80ms 时对齐。原始音轨字节先加载为 `audio/mp4` Blob，等待媒体元数据后启动。减少动态时显示 9.5 秒落版并暂停。

`previewAt: 9.5`：片名、中文副标题和开始提示已经出现，主角举起水晶，开箱后的夜景与光池构图完整。

## 已接受差异

字体为 Fusion Pixel 2026.10.25 官方发布的完整文件；它与原片发布前的 2026.09.25 版字形完全相同。中文笔画比原片多出约 10% 像素（「欢迎来」133→157），来自系统文字栅格化：原片在 macOS 渲染，同一字体在 Windows 上笔画更粗。

## 与原片对照结果

参考 MP4 用 ffmpeg 取帧，本页用 `scripts/shot.mjs` 在 1920×1080 定位截图，左右对照图保存在本批工作区 `compare/`。

| 时刻 | 逐张结论 |
| --- | --- |
| 1.0 秒 | 分数、金币数量、主角、瀑布、山林、桥与色板一致。 |
| 3.0 秒 | 主角过桥位置、三枚金币、宝箱、瀑布与分数一致。 |
| 5.0 秒 | 夕阳、对话框、宝箱与主角位置一致；「欢迎来」笔画略粗（见下）。 |
| 7.5 秒 | 英文片名、开箱光芒、金币、水晶与主角姿态一致。 |
| 9.5 秒 | 夜景、片名、水晶光池与开始提示一致；「像素冒险」笔画略粗（见下）。 |

浏览器验收使用 Edge，服务端口 4328。案例页和独立 Demo 自动播放；拖动可定位，`?t=5&autoplay=0` 停在 5 秒；声音默认关闭，开关与 1.5 倍速播放有效，播放中音轨与画面时刻差约 5ms，播放中暂停后音画时刻一致。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/20-pixel && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。
