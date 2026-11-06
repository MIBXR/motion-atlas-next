# 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-3d-render.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| 原 `index.html` → `film/scene.js`、`film/style.css`、`film/setup.js`、`index.html` | 拆出 DOM、样式与时间绘制；根入口以 `MotionKit.mountFilm` 接入 1920×1080、24fps、10 秒舞台，markers 从 cues 换算。 | 路径改写 |
| `film/scene.js`、`film/style.css` | 删除 `?v5`、`?nolink`、`v5look`、`V5DIR`、另一版帧目录选择、深色床文字样式、dot track 投影、`v5LinkAt` 与 `window.linkAt`；固定为公开默认帧。 | 另一版剪辑分支 |
| `film/scene.js` | 删除 `?frames` 调试入口、未使用的 `cache` 和 `window.__ready`；帧先在独立 Image 中解码，同帧共享解码 Promise，再更新显示层，避免自动播放时取消上一帧解码。 | 开发工具 |
| `assets/frames/0000.webp`–`0239.webp`、`film/scene.js` | 使用指定本机 PNG 帧，转为同名 WebP q95；帧路径改为 `./assets/frames/<帧号>.webp`；颗粒和 cues 使用案例内相对路径。 | 路径改写 |
| `assets/.gitignore` | 在本案例内纳入运行时读取的 `frames/*.webp`。 | 路径改写 |
| `blender/*.py`、`assets/mesh/`、`audio.py`、`out/events.json`、`cues.json`、共享 HDRI → `source/` | 原样保存场景、模拟、字形生成、网格和配乐源文件，保持脚本相对位置；events 由配乐脚本读取，页面不读取。 | 移至 source |
| `fonts/`、`fonts/fonts.css` | 下载完整 DM Sans、Noto Sans SC 与网格来源 Fredoka；只将页面使用的两个家族写入原声明，替换字体 URL。 | 路径改写 |

## 接入

`MotionKit.mountFilm` 使用原作 `renderAt(t)`，画面由指定时刻直接推导；原有带种子的随机算法与逐格取样保留。中文 markers 从 `film/cues.json` 换算，声音默认关闭，`audio/film.m4a` 与播放、暂停、拖动和倍速同步。

`previewAt: 9.5`：正面 soft.、金属句点、中英文标语和前景虚化均已完整呈现。减少动态偏好下在同一时刻暂停。

画面帧由本机 Blender 5.1.2 CPU 按原设置渲染，渲染脚本未改，仅设置环境变量 `MG_DEVICE=NONE`、`MG_ROOT`；以 WebP q95 存储，与 PNG 的 PSNR 约 51 dB。页面再合成原作文字、调色、景深、暗角与颗粒。

```bash
ffmpeg -framerate 24 -i <PNG目录>/%04d.png -c:v libwebp -quality 95 -frames:v 240 -start_number 0 -f image2 assets/frames/%04d.webp
```

## 已接受差异

原片的 `harness/render.mjs` 可按快门区间对子帧采样平均；实时页面与 `shot.mjs` 直接绘制指定时刻，高速边缘保留由成片子帧平均造成的运动模糊差异。原作页面内的解析拖影、帧量化与局部模糊保留。

三维底片使用上述已批准的本机 Blender 渲染与 WebP q95 存储，细颗粒和压缩边缘保留相应差异。

## 与原片对照结果

对照图位于工作区 `compare/mg-3d-render/`，左侧为原片 ffmpeg 取帧，右侧为同刻 `shot.mjs` 截图；视口为 1920×1080。

| 时刻 | 逐张结论 | 拼图 |
| --- | --- | --- |
| 1.0 秒 | 胶囊阵列、首字 s、微距景深、前后景位置与色彩对应一致。 | `compare-1.0.png` |
| 3.0 秒 | soft 四字、两色胶囊排列、机位、反光与接触阴影对应一致。 | `compare-3.0.png` |
| 5.0 秒 | 斜向机位、字母相对位置、前景胶囊与高光对应一致。 | `compare-5.0.png` |
| 7.5 秒 | 冠波退落后的紫色胶囊床、完整 soft 字标与金属句点的位置及比例对应一致。 | `compare-7.5.png` |
| 9.5 秒 | 正面 soft.、两行标语、字距、基线、前景渐进虚化与落版构图对应一致。 | `compare-9.5.png` |

无头浏览器中，独立 Demo 与站点案例页均自动播放，实际鼠标拖动可定位，声音默认关闭并能切换，播放时音轨跟随时间轴；独立页 `?t=5&autoplay=0` 停在 5 秒，案例页 `#case/mg-3d-render?t=5` 在 iframe ready 后从 5 秒定位继续。一次开启声音后的声画采样差为demo 26.9ms、site 116.7ms；三片的两种入口均无浏览器脚本异常。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/04-3d-render && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。

配乐读取 `source/out/events.json`。模拟使用 `source/blender/sim.py` 与 `source/assets/mesh/` 的四个 PLY 和字形元数据，生成 `work/anim.npz`，供 `source/blender/scene.py` 使用。将 `source/assets/hdri/studio_small_09_2k.hdr` 放到复现根的同名路径；重做网格时，将案例 `fonts/Fredoka[wdth,wght].ttf` 放到复现根的 `assets/fonts/latin/fredoka/Fredoka-VF.ttf`。制作步骤见 `source/README.md`，网页最终合成使用本库 `scripts/render.mjs`。
