# 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-paperclip.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| 原 `index.html` → `film/scene.js`、`film/style.css`、`film/setup.js`、`index.html` | 拆分作品、样式与 DOM；入口使用固定版本 D3、TopoJSON 和 `MotionKit.mountFilm`。 | 路径改写 |
| `film/scene.js` | 删除 `V5`、`NOLINK`、10.4 秒时间变换、另一版“贴纸人科普”标题、贴纸人、手机圆点与专用布局；保留默认 10 秒作品和原数值。 | 另一版剪辑分支 |
| `film/scene.js` | 删除 `v5Links`、`window.linkAt`、另一版源时刻状态和 `window.__camSigma` 导出；保留成片读取的相机仿射快门、局部模糊与纯时间绘制。 | 开发工具 |
| `film/scene.js`、`index.html`、`fonts/fonts.css`、`assets/`、`vendor/` | `/node_modules/` 改为 `vendor/<包>@<版本>/`；贴纸、尺寸数据和地图移到案例 `assets/`；`cues.json` 留在 `film/`；只声明实际使用的字体与字重，删去另一版独占的字体预载。 | 路径改写 |
| `audio.py` → `source/audio.py`；`tools/stickers.py` → `source/tools/stickers.py` | 原样保存配乐与贴纸素材生成脚本，保持脚本字节与相对位置。 | 移至 source |

声音以 `ffmpeg -i videos/19-paperclip.mp4 -vn -c:a copy audio/film.m4a` 从公开成片抽取，未转码；来源与许可见 [LICENSES.md](LICENSES.md)。

## 接入

`MotionKit.mountFilm` 以原作 `renderAt(t)` 接入 1920×1080、30fps、10 秒横屏舞台；中文 markers 从 `film/cues.json` 换算。声音默认关闭，开启后音轨与播放、暂停、拖动和倍速同步；`?embed`、`?render` 与 `?t=秒` 由共享运行时处理。

`previewAt: 9.5`：9.5 秒拉远后的手机、飞出的 70/118 主数字、中文结论、下划线与底部说明均已完整入场。减少动态时在同一时刻暂停。

## 已接受差异

原片由 `harness/render.mjs` 按快门区间对子帧采样平均，实时页面与 `shot.mjs` 直接绘制指定时刻，快速运动边缘保留该渲染层造成的运动模糊差异；原作代码内的解析拖影与模糊保留。

## 与原片对照结果

对照图位于工作区 `compare/mg-paperclip/`，左侧为原片 ffmpeg 取帧，右侧为 `shot.mjs` 在 1920×1080 的同刻截图。

| 时刻 | 逐张结论 | 拼图 |
| --- | --- | --- |
| 1.0 秒 | 手机贴纸、两行中文标题、橙色划线、英文副标题、虚线占位框与章节轨道的位置、字号和字形对应一致。 | `compare-1.0.png` |
| 3.0 秒 | 拆解部件、徽章飞行、引线与进入画面的周期表对应一致；原片快速下移时的纵向拖影更强，来自 harness 子帧平均。 | `compare-3.0.png` |
| 5.0 秒 | 周期表空位、飞往分类柱图的元素顺序、轨迹和重心运镜对应一致；高速格子与背景的清晰度差异来自原片子帧平均。 | `compare-5.0.png` |
| 7.5 秒 | 第一次拉远后的手机边框、分类柱图、地图、矿石贴纸和供应路线的位置、比例与色彩对应一致。 | `compare-7.5.png` |
| 9.5 秒 | 完整手机、70/118、结论、橙色下划线与说明的构图、字体、字号和基线对应一致。 | `compare-9.5.png` |

浏览器中，独立页和站点案例页自动播放、拖动与声音开关正常；独立页 `?t=5&autoplay=0` 停在 5 秒，案例页 `#case/mg-paperclip?t=5` 将定位传给 Demo。独立页正常播放的一次声画采样差约 41ms；站点从 5 秒开启声音时两者起点对齐，结束时同时暂停，AAC 尾端与 10 秒画面相差约 16ms。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/19-paperclip && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。

贴纸准备脚本为 `source/tools/stickers.py`，读取复现案例 `assets/src/` 中 phone、battery、wafer、cobalt、lithium、tin、pcb、rareearth 的 `.img` 原图，输出 `assets/stickers/`；现有成品位于案例 `assets/stickers/`。

原作仓库未提供这八份贴纸原图与 rembg 模型。生成脚本和原作已生成的成品贴纸均已保留，案例直接使用这些成品素材；重新生成需自行准备原始输入与模型。
