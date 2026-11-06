# 等距 2.5D 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-isometric.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `film/main.js` | 移除 `V5`、`NOLINK`、夜景、另一版标题与镜头分支及独占参数；保留默认 `buildTitle` 块、默认标题和全部数值逻辑，以及 `spp`、`cam`、`ta`、`mono`、`mb` 等默认功能参数。 | 另一版剪辑分支 |
| `js/title5.js`、`js/night5.js` | 移除只服务另一版剪辑的三维中文标题与夜景模块。 | 另一版剪辑分支 |
| `film/main.js` | 移除 `window.linkAt` 及其另一剪辑的场景重定位导出。 | 开发工具 |
| `index.html` | 字体样式改为 `fonts/fonts.css`；three、three/addons、opentype 导入映射改为固定版本 `vendor/`；原模块入口改为 `./film/main.js`，入口调用 `MotionKit.mountFilm`。 | 路径改写 |
| `film/main.js` | 时间表从 `/demos/03-isometric/cues.json` 改为 `./film/cues.json`。 | 路径改写 |
| `film/title.js` | 静态字重从 `/demos/03-isometric/assets/fonts/Unbounded-800-static.ttf` 改为 `./fonts/Unbounded-800-static.ttf`。 | 路径改写 |
| `fonts/fonts.css` | 只声明默认画面的 HarmonyOS Sans SC 700/500、JetBrains Mono、Unbounded；URL 指向本地完整字体文件。 | 路径改写 |
| `audio.py` → `source/audio.py` | 保存生成原作配乐的脚本，内容字节和内部路径保持不变。 | 移至 source |

原作、字体、固定版本库与音轨的来源和许可见 [LICENSES.md](LICENSES.md)。

静态字重：

`fonts/Unbounded[wght].ttf` 为官方完整可变字体，字体版本 1.701。`fonts/Unbounded-800-static.ttf` 使用 `fonttools==4.53.1` 在 `wght=800` 实例化，保持原作文件名与相对路径。实例化命令在本仓库目录执行：

```powershell
& 'C:\Users\mibxr\AppData\Local\Temp\atlas-work\mg-batch2\.venv\Scripts\python.exe' -m fontTools.varLib.instancer 'demos/cases/mg-isometric/fonts/Unbounded[wght].ttf' wght=800 --output 'demos/cases/mg-isometric/fonts/Unbounded-800-static.ttf'
```

## 适配层

`film/setup.js` 创建舞台节点并在后台初始化原作画面。`index.html` 读取 `film/cues.json` 后调用 `MotionKit.mountFilm`，通过 `MotionKit.preload` 登记画面与时间表准备任务。`renderAt(t)` 等待画面初始化后调用原作 `window.renderAt(t)`；时长、尺寸与帧率为 10 秒、1920×1080、30fps。`window.__motion.ready` 等待画面就绪，音轨在后台加载。

`MotionKit.stage` 固定原作 `#stage` 的内部像素尺寸，仅通过根节点的 `translate` 与等比 `scale` 居中适配窗口，四周黑边，舞台背景保留原作薰衣草色。只提供 `landscape` 画幅。

markers 和条目节拍取自 `film/cues.json` 的地块、土层、道路、建筑、风机、轨道、核心塔、车辆、激活、无人机、数据卡、拉远、标题和蓝图时间节点，label 译为不超过八字的中文。`roof_lag`、`pulse_speed`、`letters_step` 保留为原作参数。

控制条支持播放、暂停、重播、拖动、中文倍速选择与声音开关。声音默认关闭，开启后播放 `audio/film.m4a`；seek、暂停与变速同步音轨，播放时校正超过 0.08 秒的偏移。浏览器阻止声音时回报待启用状态，在页面内点击或按键后继续。

音轨在后台加载原始字节并创建 `audio/mp4` Blob，不参与首帧预加载；开启声音时等待媒体元数据后同步音轨。元数据未就绪时，暂停只停止播放，定位留待声音启用时完成。

`?embed` 与 `?render` 隐藏控制条，`?render` 关闭自动播放与音轨；`?t=秒` 指定时刻。减少动态偏好下默认显示 9.75 秒并暂停，运行中启用该偏好会暂停。


`previewAt: 9.75`。`film/title.js:156` 的状态行在 `cues.final + 0.62 = 9.62` 秒完全揭示；9.75 秒时镜头已拉远到完整浮岛，ISOPOLIS 字母全部落定，中文标语与状态行均完整，城市保留运行与轻微浮动。

## 已接受差异

复刻保留原作默认的 16 子样本绘制配置；未见构图、配色、字形或元素位置的实质差异，细微边缘和纹理差异符合视频压缩表现。

## 与原片对照结果

本案例预览与五时刻对照均已生成。参考 MP4 用 ffmpeg 取帧，复刻页由 `scripts/shot.mjs` 在 1920×1080 截图；拼图左侧为原片、右侧为复刻，保存在工作区 `mg-batch2/compare/mg-isometric/`。

| 时刻 | 拼图 | 逐张结论 |
| --- | --- | --- |
| 1.0 秒 | `compare-1.png` | 蓝图网格、地块落位、翻转姿态、阴影与配色一致。 |
| 3.0 秒 | `compare-3.png` | 住宅、树木、轨道、地块与完整浮岛前缘的构图、颜色和位置一致。 |
| 5.0 秒 | `compare-5.png` | 灰模楼房、核心塔、风机、轨道与车辆的位置、颜色和生长状态一致。 |
| 7.5 秒 | `compare-7.5.png` | 彩色城市、核心光环、引线与三张数据卡的构图、数值、字形和位置一致。 |
| 9.5 秒 | `compare-9.5.png` | 浮岛、云层、ISOPOLIS 三维字标、中文标语、状态行与背景点阵位置一致，字形一致。 |

浏览器验收使用 Edge，服务端口 4331。案例页自动播放，拖动后暂停在 7.1636 秒；独立 Demo 的 `?t=5&autoplay=0` 定位在 5 秒并暂停，声音默认关闭。声音开关与 1.5 倍速有效；按绘制帧抽样，音轨与时间轴均为 5.15 秒且均在播放，暂停后两者均为 5.3 秒并停止。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/03-isometric && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。
