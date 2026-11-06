# 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-collage.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| 原 `index.html` → `film/scene.js`、`film/style.css`、`film/setup.js`、`index.html` | 拆出 Canvas 作品与样式，增加固定 #stage 容器；以 `MotionKit.mountFilm` 接入 1920×1080、30fps、10 秒舞台。 | 路径改写 |
| `film/scene.js` | 删除 `V5`、`NOLINK`、查询参数、另一版拼贴剪贴标题、`V5E`、`ECH`、`bgOf`、`endTitleV5` 与 `window.linkAt` 投影支路；保留默认脑洞大开和 NOGGIN 刊名。 | 另一版剪辑分支 |
| `film/scene.js` | 删除另一版专用预载字符、未绘制的 IBM Plex Mono 600 字重预载与 `window.__ready`。 | 开发工具 |
| `film/scene.js`、`assets/gen/`、`assets/textures/`、`fonts/` | 运行时拼贴图、layout、五张共享贴图和完整字体放在案例内，以相对路径读取；`cues.json` 留在 `film/`。 | 路径改写 |
| `audio.py`、`work/*.py`、`assets/sfx/*.wav`、`cues.json` → `source/` | 原样保存配乐与所有 work 素材生成脚本，音效源文件与 cues 保持相对位置。 | 移至 source |

## 接入

`MotionKit.mountFilm` 使用原作 `renderAt(t)`，画面由指定时刻直接推导；原有带种子的随机算法与逐格取样保留。中文 markers 从 `film/cues.json` 换算，声音默认关闭，`audio/film.m4a` 与播放、暂停、拖动和倍速同步。

`previewAt: 7.2`：四字“脑洞大开”均已拍入，头盖、太空、火箭、地球、花鸟蝴蝶、手指和斜黑带同时完整呈现，撕页尚未开始。减少动态偏好下在同一时刻暂停。

## 已接受差异

原片的 `harness/render.mjs` 可按快门区间对子帧采样平均；实时页面与 `shot.mjs` 直接绘制指定时刻，高速边缘保留由成片子帧平均造成的运动模糊差异。原作页面内的解析拖影、帧量化与局部模糊保留。

## 与原片对照结果

对照图位于工作区 `compare/mg-collage/`，左侧为原片 ffmpeg 取帧，右侧为同刻 `shot.mjs` 截图；视口为 1920×1080。

| 时刻 | 逐张结论 | 拼图 |
| --- | --- | --- |
| 1.0 秒 | 人像、黄铜纸钉、红圆纸、两块报纸及白剪边的位置、比例与半调对应一致。 | `compare-1.0.png` |
| 3.0 秒 | 剪刀所在剪口、虚线、剪线印章、刊号与纸面布局对应一致。 | `compare-3.0.png` |
| 5.0 秒 | 打开的头盖、太空楔形、地球、火箭和烟团的位置及逐格状态对应一致。 | `compare-5.0.png` |
| 7.5 秒 | 撕纸首格裂缝、巨手、花鸟蝴蝶、四字拼贴与斜黑带对应一致。 | `compare-7.5.png` |
| 9.5 秒 | NOGGIN、脑洞季刊、刊号说明、赠品贴纸及扣盖时刻的人像布局对应一致。 | `compare-9.5.png` |

无头浏览器中，独立 Demo 与站点案例页均自动播放，实际鼠标拖动可定位，声音默认关闭并能切换，播放时音轨跟随时间轴；独立页 `?t=5&autoplay=0` 停在 5 秒，案例页 `#case/mg-collage?t=5` 在 iframe ready 后从 5 秒定位继续。一次开启声音后的声画采样差为demo 32.1ms、site 33.5ms；三片的两种入口均无浏览器脚本异常。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/06-collage && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。

配乐读取 `source/assets/sfx/` 的六份录音。`source/work/` 保存图像准备脚本，`work/prep_birds.py` 与 `work/prep_hand.py` 复用 `work/prep.py`；其布局输入取自案例 `assets/gen/layout.json`。共用纸张原图位于素材快照 `assets/textures/paper/Paper001_4K_color.jpg`，组装到复现根同名路径；制作脚本还读取根目录 `assets/images/`、`assets/textures/torn/`、`assets/textures/riso/`、`assets/textures/paper/Paper006_4K_color.jpg`、案例内 `assets/eagle_pillars.jpg` 与 `assets/manicule.svg`。

上游固定版本未提供上述 `assets/images/` 肖像、剪贴图与报纸，撕纸蒙版及边缘、riso 纹理、Paper006、`eagle_pillars.jpg` 和 `manicule.svg`，也未提供 `prep_hand.py` 读取的 `/tmp/c06/manicule.svg.png`。该 PNG 的生成命令为 `qlmanage -t -s 1400 -o /tmp/c06 assets/manicule.svg`。本案例保存原生成脚本和上游已生成的拼贴素材。
