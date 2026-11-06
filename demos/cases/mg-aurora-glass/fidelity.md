# 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-aurora-glass.json)。

## 已决定删减与接入修改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| 原 `index.html` → `index.html`、`film/style.css`、`film/setup.js` | 拆分样式与舞台，入口加载作品并调用 `MotionKit.mountFilm`。 | 路径改写 |
| `film/main.js`、`film/shaders.js` | 删除 `V5`、`V52`、`NOLINK`、中文界面和标题、时间变换、玻璃字形专用目标与 `FS_GLYPH`；保留默认英文界面、Aurora 字标和默认材质数值。 | 另一版剪辑分支 |
| `film/main.js`、`film/shaders.js` | 删除 `linkAt`、`__tw`、`__v5dbg`、隐藏元素开关、`noui`、`nomotes` 和 URL 调参；将画面参数固定为原作默认值，移除独占的 `uHide` 着色器分支。 | 开发工具 |
| `film/main.js`、`fonts/fonts.css` | 纹理、字体与 cues 改为案例内相对路径；只声明默认片使用的字体。 | 路径改写 |
| `out/env.json` → `film/out/env.json` | 保留运行时读取的原始 100Hz 音量包络；直接加载该文件。 | 路径改写 |
| `audio.py` → `source/audio.py` | 原样保存配乐与音量包络生成脚本。 | 移至 source |

声音以 `ffmpeg -i videos/12-aurora-glass.mp4 -vn -c:a copy audio/film.m4a` 从公开成片抽取，未转码；来源与许可见 [LICENSES.md](LICENSES.md)。

## 接入

`MotionKit.mountFilm` 以原作 `renderAt(t)` 接入 1920×1080、30fps、10 秒横屏舞台；中文 markers 从 `film/cues.json` 换算。声音默认关闭，播放、暂停、定位与倍速由共享运行时控制；`?embed`、`?render` 与 `?t=秒` 由共享运行时处理。

`previewAt: 9.8`：9.8 秒玻璃卡片已让出画面，透镜已成为字母 o，Aurora 字标与中英文标语均已完整显现。减少动态时在同一时刻暂停。

本库自行实现舞台与 `MotionKit.mountFilm` 接入、中文 markers、资源路径和声音控制；画面沿用上游默认片的 `renderAt(t)`、材质与着色器。

## 已接受差异

原片由 `harness/render.mjs` 按快门区间对子帧采样平均，实时页面与 `shot.mjs` 直接绘制指定时刻，快速运动边缘保留该渲染层造成的运动模糊差异；原作代码内的解析拖影与模糊保留。

## 与原片对照结果

对照图位于工作区 `compare/mg-aurora-glass/`，左侧为原片 ffmpeg 取帧，右侧为 `shot.mjs` 在 1920×1080 的同刻截图。

| 时刻 | 逐张结论 | 拼图 |
| --- | --- | --- |
| 1.0 秒 | 极光色场、对话卡和声波卡的投影、用户气泡、输入提示与微界面字体对应一致。 | `compare-1.0.png` |
| 3.0 秒 | 三张玻璃卡片的布局、逐行回复、声波、Focus 关闭状态和 Glow 30% 对应一致。 | `compare-3.0.png` |
| 5.0 秒 | 74% 滑杆、玻璃化控钮与拉出的珠体、回复卡和操作标签的位置、折射与配色对应一致。 | `compare-5.0.png` |
| 7.5 秒 | Aurora 字标、胶囊透镜和离场卡片的位置、尺寸与遮挡关系对应一致；离场卡片的清晰度保留原片子帧平均差异。 | `compare-7.5.png` |
| 9.5 秒 | Aurora 字标、玻璃 o、中英文标语、极光光场与扩散光环对应一致。 | `compare-9.5.png` |

浏览器中，独立页和站点案例页自动播放、拖动与声音开关正常；独立页 `?t=5&autoplay=0` 停在 5 秒，案例页 `#case/mg-aurora-glass?t=5` 将定位传给 Demo。开启声音和跳转时起点对齐，可见标签页连续播放音画同步。测试中约 0.88 秒的偏差来自浏览器对后台标签页的节流，RAF 约每 1 秒回调一次。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/12-aurora-glass && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。

配乐还生成 `out/env.json` 的包络数据，页面对应数据位于 `film/out/env.json`。
