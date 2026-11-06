# 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-morph.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| 原 `index.html` → `film/scene.js`、`film/style.css`、`film/setup.js`、`index.html` | 拆分原作代码、样式与 DOM；由案例入口加载字体并调用 `MotionKit.mountFilm`。 | 路径改写 |
| `film/scene.js` | 删除 `V5`、`NOLINK`、`HIDE_DOT`、`HIDE_TITLE`、自制中文标题几何、另一版末段形变与标题构建；混合表达式保留默认分支。 | 另一版剪辑分支 |
| `film/scene.js` | 删除 `linkAtV5`、`window.linkAt` 与专用元素位置、椭圆测量、遮罩和画面探针；删除未参与绘制的旧颗粒画布。 | 开发工具 |
| `film/scene.js`、`fonts/fonts.css` | 字体、纸纹和运行数据改为案例内相对路径；`cues.json` 与 `glyphs.json` 留在 `film/`，保留原数据；仅声明默认片使用的字体与字重。 | 路径改写 |
| `audio.py` → `source/audio.py`；`tools/glyphs.py` → `source/tools/glyphs.py` | 原样保存配乐与字形轮廓生成脚本，保持脚本字节与相对位置。 | 移至 source |

声音以 `ffmpeg -i videos/08-morph.mp4 -vn -c:a copy audio/film.m4a` 从公开成片抽取，未转码；来源与许可见 [LICENSES.md](LICENSES.md)。

## 字体实例化

完整 `Outfit[wght].ttf` 为 Google Fonts 官方 1.100，使用指定虚拟环境的 `fonttools==4.53.1` 在 600 字重实例化，保留完整可变原文件与原作静态文件名。

```powershell
C:/Users/mibxr/AppData/Local/Temp/atlas-work/mg-batch3/.venv/Scripts/python.exe -m fontTools.varLib.instancer 'demos/cases/mg-morph/fonts/Outfit[wght].ttf' wght=600 --output demos/cases/mg-morph/fonts/Outfit-SemiBold.ttf
```

## 接入

`MotionKit.mountFilm` 以原作 `renderAt(t)` 接入 1920×1080、30fps、10 秒横屏舞台；中文 markers 从 `film/cues.json` 换算。声音默认关闭，开启后音轨与播放、暂停、拖动和倍速同步；`?embed`、`?render` 与 `?t=秒` 由共享运行时处理。

`previewAt: 9.8`：9.8 秒 morphe. 字标、中文“一形 · 万象”和英文标语均已完整显现，七颗章节圆点已归入句号。减少动态时在同一时刻暂停。

## 已接受差异

原片由 `harness/render.mjs` 按快门区间对子帧采样平均，实时页面与 `shot.mjs` 直接绘制指定时刻，快速运动边缘保留该渲染层造成的运动模糊差异；原作代码内的解析拖影与模糊保留。

## 与原片对照结果

对照图位于工作区 `compare/mg-morph/`，左侧为原片 ffmpeg 取帧，右侧为 `shot.mjs` 在 1920×1080 的同刻截图。

| 时刻 | 逐张结论 | 拼图 |
| --- | --- | --- |
| 1.0 秒 | 咖啡杯轮廓、杯孔、折面、蒸汽、托盘、纸纹与“早安”字幕的位置、字形和构图对应一致。 | `compare-1.0.png` |
| 3.0 秒 | 太阳、光芒、海平线、三条倒影与章节字幕对应一致，运动中的海面和倒影边缘保留原片子帧平均模糊差异。 | `compare-3.0.png` |
| 5.0 秒 | 海鸥到纸飞机之间的中介轮廓、主体位置、群青色域与“海风”字幕对应一致，快速形变边缘保留子帧平均模糊差异。 | `compare-5.0.png` |
| 7.5 秒 | 心形、折面、朱红色域、章节圆点与“心动”字幕对应一致；画面下角正在离场的奶油色边缘保留运动模糊差异。 | `compare-7.5.png` |
| 9.5 秒 | morphe. 字标、句号、中英文标语与扩散环中心和半径对应一致；原片扩散环因子帧平均呈现更宽、更淡的边缘。 | `compare-9.5.png` |

`capture.mjs` 在 9.8 秒生成完整预览图，`shot.mjs` 的五个指定时刻均已生成截图与左右拼图。

浏览器中，独立页和站点案例页自动播放、拖动与声音开关正常；独立页 `?t=5&autoplay=0` 停在 5 秒，案例页 `#case/mg-morph?t=5` 将定位传给 Demo。站点播放中的一次声画采样差约 37ms，结束时画面和音轨同时暂停。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/08-morph && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。

字形准备脚本 `source/tools/glyphs.py` 从当前目录的 `assets/fonts/Outfit-SemiBold.ttf` 读取字体；复现时将本案例 `fonts/Outfit-SemiBold.ttf` 放到该位置，输出 `glyphs.json`，现有结果位于 `film/glyphs.json`。
