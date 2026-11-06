# 逐帧线条抖动接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-cel-boil.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `index.html`、`film/scene.js` | 删除 `V5`、`nolink`、`linkAt`、外部汉字数据载入、逐帧手绘／FRAME BY FRAME 字形及独占火种、链接边界计算；各条件保留默认值与调用顺序。 | 另一版剪辑分支 |
| `index.html` | 字体表改为 `fonts/fonts.css`；import map 使用 `vendor/simplex-noise@4.0.3/dist/esm/simplex-noise.js` 与 `vendor/opentype.js@2.0.0/dist/opentype.mjs`；入口加载 `motion-kit.js` 后调用 `MotionKit.mountFilm`，依赖固定版本并接入播放控制。 | 路径改写 |
| `film/scene.js` | 纸面、纸齿、四张尘点、时刻表和字形解析字体使用 `./assets/`、`./film/cues.json` 与 `./fonts/`，资源位于案例目录内。 | 路径改写 |
| `fonts/fonts.css` | 保留原作三个字体声明，URL 指向同目录完整字体，Caveat 使用官方文件名 `Caveat[wght].ttf`，字体随案例独立交付。 | 路径改写 |
| `audio.py`、`tools/gen_paper.py`、`tools/gen_dust.py` | 原样移动为 `source/audio.py`、`source/tools/gen_paper.py`、`source/tools/gen_dust.py`，脚本内部路径保持原文，独立保存配乐与现有素材的制作资料。 | 移至 source |
| `tools/hitmax.py` | 原样移动为 `source/tools/hitmax.py`，保持与 `source/audio.py` 的相对位置。 | 移至 source |

v5 分支属于另一版剪辑，已删除。

原作 MIT 许可见 [LICENSE](film/LICENSE)，字体、固定版本库、纹理与音轨来源见 [LICENSES.md](LICENSES.md)。字体版本为 LXGW Marker Gothic 1.004、Caveat 2.000、Long Cang 2.001。

## 适配层说明

`index.html` 中的 `MotionKit.mountFilm` 等待原作 `window.__ready === true` 后接入。尺寸、帧率与时长取 `window.DEMO`：1920×1080、24fps、10 秒。`MotionKit.timeline` 的 `render(t)` 返回原作 `window.renderAt(t)` 的 Promise，通过 `MotionKit.expose`、`MotionKit.controls`、`MotionKit.start` 接入本库。

`MotionKit.stage` 保持原 Canvas 内部像素，通过根节点的 `translate` 与等比 `scale` 居中适配窗口，四周黑边，仅提供横屏。markers 与条目节拍读取 `film/cues.json` 的动作节点，保留曝光表与一拍一、一拍二、一拍三节奏。

中文控制条提供播放、暂停、重播、拖动、倍速与声音开关。声音默认关闭，开启后播放 `audio/film.m4a`；seek、暂停、变速同步，播放偏差超过 0.08 秒时校正。音轨加载为 `audio/mp4` Blob，等待元数据后启动。浏览器阻止发声时，页面内点击或按键后恢复。

`?embed`、`?render` 隐藏控制条，`?render` 停止自动播放与音轨，`?t=秒` 定位。减少动态时显示 9.75 秒并暂停。

`previewAt: 9.75`：拇指翻页已结束，「手作」、HAND MADE、中文标语、灯箱纸页、红笔张数圈注与眨眼火苗共同构成完整落版。

## 已接受差异

细微边缘与纹理差异符合视频压缩表现；五张对照未见字体版本导致的字形偏差。

## 与原片对照结果

对照图左侧为原片，右侧为复刻；两侧均为 1920×1080，路径相对本批工作区的上一级目录。

| 时刻 | 对照图 | 逐张结论 |
| --- | --- | --- |
| 1.0 秒 | `mg-batch2/compare/mg-cel-boil/compare-1.png` | 火苗、火柴盒、黄光、标签及编号的构图、颜色、字形与位置一致。 |
| 3.0 秒 | `mg-batch2/compare/mg-cel-boil/compare-3.png` | 火苗舞姿、手臂残影、火柴烟线、盒体及编号一致。 |
| 5.0 秒 | `mg-batch2/compare/mg-cel-boil/compare-5.png` | 火苗表情、亮星、火柴、标签及编号一致。 |
| 7.5 秒 | `mg-batch2/compare/mg-cel-boil/compare-7.5.png` | 红色花边徽章、前三笔、火星笔尖、外围烟团及编号一致。 |
| 9.5 秒 | `mg-batch2/compare/mg-cel-boil/compare-9.5.png` | 灯箱、定位孔、叠纸、拇指掀角、重放画格及标签一致。 |

浏览器验收使用 Edge，服务端口 4331。案例页自动播放，拖动后停在 7.1636 秒；独立 Demo 的 `?t=5&autoplay=0` 停在 5 秒并暂停，声音默认关闭。声音开关与 1.5 倍速有效；播放抽样时音轨为 5.166574 秒、时间轴为 5.15 秒，相差约 16.6ms；暂停后音轨与时间轴均为 5.42501 秒，媒体与时间轴均暂停。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/05-cel-boil && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。

配乐后处理调用 `source/tools/hitmax.py`。纸面生成器为 `source/tools/gen_paper.py`，读取素材快照 `assets/textures/paper/Paper001_4K_color.jpg`；尘点生成器为 `source/tools/gen_dust.py`，读取本案例 `source/assets/textures/dust/` 的四张原图。将这些输入合入复现根的同名 `assets/` 路径，案例现有输出位于 `assets/`。
