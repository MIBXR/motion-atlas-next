# 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-synthwave.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| 原 `index.html` → `film/scene.js`、`film/style.css`、`film/setup.js`、`index.html` | 拆分作品代码、样式与 DOM；案例入口加载字体、固定 vendor 与 MotionKit。 | 路径改写 |
| `film/scene.js` | 删除 `V5`、`V5T`、`NOLINK`、中文镀铬标题、另一版手写字与标语布局、`tpt` 和 `linkAt`；所有条件表达式保留默认成片分支。 | 另一版剪辑分支 |
| 原字体探针 DOM、错误监听、阶段日志；`film/scene.js` | 删除开发探针、阶段日志和 `nobloom`、`fixsky`、`fixvhs`、`hhk`、`mb` 查询调试；分析拖影保留默认 `MBS=1`、车灯倍率 3。 | 开发工具 |
| `film/scene.js` | 删除始终不可见的独立标题倒影层及其每帧赋值。 | 过程文件 |
| `film/scene.js`、`index.html`、`fonts/fonts.css` | 字体、运行 cues 和第三方库改为案例内相对路径；保留实际参与描写的 SVG 路径测量。 | 路径改写 |
| `audio.py` → `source/audio.py` | 原样保存配乐与音效生成脚本。 | 移至 source |

声音以 `ffmpeg -i videos/10-synthwave.mp4 -vn -c:a copy audio/film.m4a` 从公开成片抽取，未转码；来源与许可见 [LICENSES.md](LICENSES.md)。

Mr Dafoe 只有一个字重，直接使用官方完整 `MrDafoe-Regular.ttf`，不实例化。

## 接入

`MotionKit.mountFilm` 以原作 `renderAt(t)` 接入 1920×1080、30fps、10 秒横屏舞台；中文 markers 从 `film/cues.json` 换算。种子随机数接入 `MotionKit.rng`，保留原始种子与时间推导。声音默认关闭，开启后音轨与时间轴同步；`?embed`、`?render`、`?t=秒` 与减少动态偏好由共享运行时处理。

`previewAt: 9.5`：镀铬标题、Midnight、夏日标语、落日与网格均已完整显现，尚未进入 9.667 秒磁带停止和关机段。减少动态时在同一时刻暂停。

## 已接受差异

原片生成阶段的 `harness/render.mjs` 子帧平均运动模糊属于已接受差异；作品代码内的解析拖影与片内时间采样保留。整理后的作品文本使用 UTF-8、LF；原样保存的配乐脚本与第三方文件保留原字节。

## 与原片对照结果

对照图位于工作区 `compare/mg-synthwave/`，左侧为原片 ffmpeg 取帧，右侧为 `shot.mjs` 在 1920×1080 的同刻截图。

| 时刻 | 逐张结论 | 拼图 |
| --- | --- | --- |
| 1.0 秒 | 跑车、棕榈、山脉、网格和 4:3 圆角画幅对应；1 秒边界原片保留 TRACKING 与 OSD 邻帧混合，直取时刻已结束 TRACKING，属于原片快门子帧平均差异。 | `compare-1.0.png` |
| 3.0 秒 | 跑车位置、条纹落日、棕榈、山脉和地平线对应；原片近路桩与灯帽被子帧平均拉成较宽拖影，直取时刻杆体更清晰；整秒 OSD 存在邻帧混合。 | `compare-3.0.png` |
| 5.0 秒 | NEON DRIVE 镀铬字的字形、位置、渐变和星芒对应，落日、山脉与网格构图对应；近路桩及灯帽保留原片运动模糊差异，整秒 OSD 存在邻帧混合。 | `compare-5.0.png` |
| 7.5 秒 | NEON DRIVE、Midnight、夏日标语、落日与地平线对应，字形和排布对应；原片近路桩及路面亮点的子帧拖影更宽。 | `compare-7.5.png` |
| 9.5 秒 | 完整镀铬标题、霓虹手写、标语、扫光星芒、条纹落日和网格对应；原片近路桩与灯帽有子帧平均拖影，预览时刻尚未进入 STOP 与关机。 | `compare-9.5.png` |

无头浏览器中，独立 Demo 和站点案例页的自动播放、暂停、实际指针拖动、`?t=5` 定位、声音开关与拖动后声音同步均通过。四次播放／拖动后的声画采样差为 42.5ms / 8.4ms / 50.3ms / 39.1ms；暂停时媒体同步暂停。定位截图及明细位于工作区 `compare/mg-synthwave/browser-standalone.png`、`browser-site.png` 与 `browser-results.json`。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/10-synthwave && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。
