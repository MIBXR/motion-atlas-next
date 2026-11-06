# 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-liquid.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| 原 `index.html` → `film/main.js`、`film/style.css`、`film/setup.js`、`index.html` | 拆分作品代码、样式与 DOM；案例入口加载字体并调用 MotionKit。 | 路径改写 |
| `film/main.js`、`film/js/scene.js`、`film/js/type.js`、`film/js/engine.js`、`film/js/shaders.js`；原 `js/links.js` | 删除 `V5`、`NOLINK`、中文液态字、另一版大液滴、调色与反射分支、连线标签和 `linkAt`；保留默认 drop、末滴液池与涟漪标语。 | 另一版剪辑分支 |
| 原 `js/lookdev.js` → `film/js/state.js` | 仅保留作品实际读取的 `baseState`，删除静态 lookdev 排列和 `?look` 入口。 | 开发工具 |
| `film/main.js`、`film/js/scene.js`、`film/js/engine.js`、`film/js/shaders.js` | 删除 `dbg`、`mb` 查询覆盖、状态与导出探针、派生 cue 导出和调试着色分支；保留成片自带的自适应片内时间采样。 | 开发工具 |
| `source/out/cues_derived.json` | 保留配乐读取的派生时序，播放页面使用独立音轨。 | 制作依赖 |
| `film/main.js`、`film/js/scene.js`、`fonts/fonts.css` | 运行 cues、字体和状态模块改为案例内相对路径；不加载未参与默认画面绘制的 Instrument Serif。 | 路径改写 |
| `audio.py` → `source/audio.py` | 原样保存配乐与音效生成脚本。 | 移至 source |

声音以 `ffmpeg -i videos/07-liquid.mp4 -vn -c:a copy audio/film.m4a` 从公开成片抽取，未转码；来源与许可见 [LICENSES.md](LICENSES.md)。

## 字体实例化

完整 `Fraunces[SOFT,WONK,opsz,wght].ttf` 为 Google Fonts 官方 Version 1.000;[b76b70a41]。原文件名中的 72、900、Soft 分别对应 `opsz=72`、`wght=900` 和字体 STAT 表中 Soft 的 `SOFT=50`；`WONK=1` 为字体默认值。使用指定环境的 `fonttools==4.53.1` 实例化，完整可变原文件与原作静态文件名一并保留。

```powershell
C:/Users/mibxr/AppData/Local/Temp/atlas-work/mg-batch4/.venv/Scripts/python.exe -m fontTools.varLib.instancer 'demos/cases/mg-liquid/fonts/Fraunces[SOFT,WONK,opsz,wght].ttf' opsz=72 wght=900 SOFT=50 WONK=1 --output demos/cases/mg-liquid/fonts/Fraunces-Liquid-72-900-Soft.ttf
```

## 接入

`MotionKit.mountFilm` 以原作 `renderAt(t)` 接入 1920×1080、30fps、10 秒横屏舞台，时刻上限钳制到最后一帧（10 − 1/30 秒），原作相机插值在 t = 10 时越界；中文 markers 从 `film/cues.json` 换算。种子随机数接入 `MotionKit.rng`，保留原始种子与时间推导。声音默认关闭，开启后音轨与时间轴同步；`?embed`、`?render`、`?t=秒` 与减少动态偏好由共享运行时处理。

`previewAt: 9.5`：drop 字标、末滴形成的地面液珠、涟漪和两行标语均已显现，字内气泡与微动仍在延续。减少动态时在同一时刻暂停。

预览图使用条目 `renderer: "gpu"` 配置，通过 D3D11 GPU 生成。

## 已接受差异

原片生成阶段的 `harness/render.mjs` 子帧平均运动模糊属于已接受差异；作品代码内的解析拖影与片内时间采样保留。整理后的作品文本使用 UTF-8、LF；原样保存的配乐脚本与第三方文件保留原字节。

## 与原片对照结果

对照图位于工作区 `compare/mg-liquid/`，左侧为原片 ffmpeg 取帧，右侧为 1920×1080 的同刻无头截图：1.0 秒使用同一 CDP 客户端启用 D3D11 获取，其余时刻由 `shot.mjs` 获取。

| 时刻 | 逐张结论 | 拼图 |
| --- | --- | --- |
| 1.0 秒 | 两侧液滴压扁形态、次级飞溅、落地倒影、相机取景与背景光场对应；原片的快速运动边缘保留子帧平均模糊差异。 | `compare-1.0.png` |
| 3.0 秒 | 融合后的粉橘液团、内部色带、接触线、反射液滴与倒影的位置和轮廓对应。 | `compare-3.0.png` |
| 5.0 秒 | 退去的紫色液浪、四组字标种子、上方细颈和次级液滴的位置、形态与色彩对应。 | `compare-5.0.png` |
| 7.5 秒 | drop 字标的 Fraunces 字形、字号、排布、挂滴、字内气泡、厚液高光和地面焦散对应；标语尚未显现。 | `compare-7.5.png` |
| 9.5 秒 | 完整 drop 字标、末滴落地形成的液珠、涟漪和双语标语对应；字形、文字位置、气泡与挂滴均对应。 | `compare-9.5.png` |

无头浏览器中，独立 Demo 和站点案例页的自动播放、暂停、实际指针拖动、`?t=5` 定位、声音开关与拖动后声音同步均通过。四次播放／拖动后的声画采样差为 89.1ms / 39.4ms / 96.4ms / 15.8ms；暂停时媒体同步暂停。定位截图及明细位于工作区 `compare/mg-liquid/browser-standalone.png`、`browser-site.png` 与 `browser-results.json`。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/07-liquid && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。

配乐读取 `source/out/cues_derived.json` 的派生时序。该文件与 `source/cues.json` 一起放在复现案例目录，直接供原配乐脚本使用。派生逻辑保存在 `source/js/scene.js`，依赖 `source/js/lookdev.js` 的场景状态；`source/js/textsdf.js` 的 `buildLetterSDF` 使用本案例 `fonts/Fraunces-Liquid-72-900-Soft.ttf` 生成字形几何。word 的 drop 字样、生成与定位参数沿用 `film/main.js`，调用 `createFilm(cues, word)` 后，结果暴露为 `window.__cuesOut`。
