# 接入与保真说明

复刻以公开默认成片为准，作品来源与固定版本见[条目 JSON](../../../entries/cases/mg-hanazi.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| 原 `index.html` → `film/scene.js`、`film/style.css`、`film/setup.js`、`index.html` | 拆出作品、样式和 DOM；等待 build() 完成后，以 `MotionKit.mountFilm` 接入 1080×1920、30fps、10 秒竖屏。 | 路径改写 |
| `film/style.css`、`film/setup.js`、`film/scene.js`、`assets/` | 照片、耳朵与炸毛贴图、共享颗粒、cues 和字体全部改为案例内相对路径；SVG 定位样式限定于 #stage 内。 | 路径改写 |
| `film/scene.js` | 删除原作 harness 的 `window.__ready` 导出，资源就绪由模块导入和 Motion Kit 的 ready 负责。 | 开发工具 |
| `audio.py`、`assets/prep.py`、`prep_r2.py`、`prep_r2b.py`、`cues.json` → `source/` | 原样保存配乐、抠图、景深和炸毛贴图生成脚本，保持相对位置。 | 移至 source |
| `fonts/`、`fonts/fonts.css` | 从官方来源保存完整字体和许可，只保留使用的原 @font-face 并替换 URL。 | 路径改写 |

## 接入

`MotionKit.mountFilm` 使用原作 `renderAt(t)`，画面由指定时刻直接推导；原有带种子的随机算法与逐格取样保留。中文 markers 从 `film/cues.json` 换算，声音默认关闭，`audio/film.m4a` 与播放、暂停、拖动和倍速同步。

`previewAt: 7.25`：炸毛主拍、震惊、副标题、发量检测和爆表均已入场，7.5 秒定格闪白尚未发生。减少动态偏好下在同一时刻暂停。

条目使用 `orients: ["portrait"]` 和 `renderer: "gpu"`；舞台尺寸为 1080×1920。无头浏览器使用 ANGLE D3D11 GPU 合成 SVG 滤镜和圆角裁切，预览脚本按 renderer 选择 GPU；同刻截图通过工作区的进程级 GPU 包装运行原 `shot.mjs`。

## 已接受差异

原片的 `harness/render.mjs` 可按快门区间对子帧采样平均；实时页面与 `shot.mjs` 直接绘制指定时刻，高速边缘保留由成片子帧平均造成的运动模糊差异。原作页面内的解析拖影、帧量化与局部模糊保留。

## 与原片对照结果

对照图位于工作区 `compare/mg-hanazi/`，左侧为原片 ffmpeg 取帧，右侧为同刻 `shot.mjs` 截图；视口为 1080×1920。

| 时刻 | 逐张结论 | 拼图 |
| --- | --- | --- |
| 1.0 秒 | 白猫构图、节目徽章、今日份快乐的字形、分层描边、位置和星光对应一致。 | `compare-1.0.png` |
| 3.0 秒 | 灰猫推近构图与三个问号的颜色、位置和字形对应一致；原片运动中的边缘更柔。 | `compare-3.0.png` |
| 5.0 秒 | 长毛猫构图、嘉宾名牌和高能横幅对应一致；原片横幅快速回摆的子帧拖影更强。 | `compare-5.0.png` |
| 7.5 秒 | 定格闪白、炸毛剪影、震惊花字、爆表量表、集中线和副标题对应一致。 | `compare-7.5.png` |
| 9.5 秒 | 青色条纹底、旋转圆角白框、猫咪、认证印章与两组落版花字对应一致；GPU 合成恢复完整背景与裁切。 | `compare-9.5.png` |

无头浏览器中，独立 Demo 与站点案例页均自动播放，实际鼠标拖动可定位，声音默认关闭并能切换，播放时音轨跟随时间轴；独立页 `?t=5&autoplay=0` 停在 5 秒，案例页 `#case/mg-hanazi?t=5` 在 iframe ready 后从 5 秒定位继续。一次开启声音后的声画采样差为demo 50.0ms、site 20.3ms；三片的两种入口均无浏览器脚本异常。

## 制作依赖与复现

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/18-hanazi && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。

图像准备脚本位于 `source/assets/prep.py`、`prep_r2.py`、`prep_r2b.py`；组装时将案例 `assets/` 中的现有图片合入复现案例的 `assets/`，并在该目录运行准备脚本。准备链读取根目录 `assets/images/originals/cats/`、案例内 `cat_grey_face.jpg`、`tux_cut.png`、`tux_cut_r1.png` 和 `grey_r1.jpg`。

原作仓库未提供猫原图、部分中间图与 rembg 模型。生成脚本和原作已生成的成品素材均已保留，案例直接使用这些成品素材；重新生成需自行准备原始输入与模型。
