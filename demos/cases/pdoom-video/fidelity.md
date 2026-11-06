# I'm Upping My P(doom) · 手绘卡通音乐录像 · 接入与保真说明

复刻范围为156.6秒的完整代码音乐录像，来源与固定提交见[条目 JSON](../../../entries/cases/pdoom-video.json)。

## 相对原作的删改

| 文件 | 删改内容 | 原因 |
| --- | --- | --- |
| `film/index.html` | 两个 `node_modules` 脚本改为 `../vendor/` 固定版本。 | 本地运行依赖接入。 |
| `film/index.html` | Google Fonts link 改为 `../fonts/fonts.css`。 | 完整字体本地加载。 |
| `film/index.html` | html/body 去边距与溢出，暖纸底；main 无内边距；#out 固定1920×1080；隐藏 .bar，保留 #scrub 与 #tt。 | 原作画布直接填满舞台。 |
| `vendor/` | npm p5 2.3.3、p5.brush 2.2.3 的运行脚本与包内许可原文。 | 固定运行版本。 |
| `fonts/` | Permanent Marker 与 Shantell Sans 完整字体、各自许可及本地 @font-face；font-display:block。 | 使用原作家族名与字重。 |
| `audio/pdoom.mp3` | 从上游 assets/ 移至案例 audio/，原字节。 | 本库音轨接入。 |
| `source/` | 原字节保留 README、分镜、动画指南、原始入口、渲染脚本和依赖锁。 | 保存制作资料与渲染入口。 |
| `legacy/`、`.gitignore`、`node_modules/` | 不收录。 | 第一代版本与本地环境文件不参与当前影片。 |

`film/src/` 保留原作目录结构与字节。许可原文见 [LICENSES.md](LICENSES.md)。

## 适配层

根 `index.html` 用 `MotionKit.load.prepare` 预载字体样式、原入口、全部源码、两份 vendor 脚本与 MP3。1920×1080同源 iframe 打开 `film/index.html?render=1`，等待 load 与 `upstream.ready === true`；render 参数关闭上游 devUI 的独立初始绘制。`MotionKit.mountFilm` 将156.6秒、24fps的影片接入本库，`renderAt(t)` 按24fps取最近帧，等待 `upstream.renderAt(t,'image/jpeg',.92)` 的 redraw 与 #out 合成完成后返回。

`?embed` 隐藏控制条，`?render` 暂停自动播放并禁声，`?t=秒` 定位；减少动态时暂停在24秒。十个章节点与88 BPM由适配层配置，声音默认关闭。

逐帧渲染时，在仓库外按上游目录组装：把 `source/render.mjs`、`source/package*.json`、`source/studio.html` 放在根目录，把 `film/src/` 放为 `src/`、`audio/pdoom.mp3` 放为 `assets/pdoom.mp3`。安装依赖后运行 `node render.mjs --clip=0:156.6 --fps=24 --out=out/pdoom.mp4`；需要 Chrome 与 ffmpeg。本库定位与预览使用 `node scripts/capture.mjs --only pdoom-video`。

## 已接受差异

- 参考片的水彩边界、浅色叠笔与纸齿呈块状和淡化，本库原始 PNG 保留更细的颗粒；角色位置、镜头、歌词进度相同。`film/src/core.js:155–172/200–207` 生成并 multiply 合成纸底、纸齿；`source/render.mjs:26–27/87/102–106` 以 JPEG、H.264 yuv420p 输出成片，当前参考还经过 YouTube AV1 编码。差异集中在这些有损编码会平滑的纹理与字边。
- 原始 MP3 容器时长为156.650667秒，参考 Opus 音轨为156.594秒，末尾相差56.667毫秒。`film/src/core.js:3` 的影片时长为156.6秒，`source/render.mjs:27/102` 的音视频合成使用 `-shortest`；本库保留原 MP3 字节与影片时钟。

## 与原片对照结果

参考为 YouTube 的1920×1080、24fps AV1视频（format 399），音轨为 Opus（format 251）。分别对照歌曲时间0.5、1.0、2.0秒的幕布、Clawd姿态和实验室构图，确认参考片头偏移为 **0秒**；校准并排图为 `compare-alignment-01.png` 至 `compare-alignment-03.png`。

参考帧按 `round((t+0)×24)` 的帧号用 ffmpeg select 精确取 PNG。本库用无头 Edge/CDP，1920×1080、DPR1，逐个打开 `index.html?embed=1&render=1&t=秒`，依次读取加载状态、等待 `window.__motion.ready`、等待 `seek(t)` 后截图。12个时刻均为 `__motion.time=t`、`data-motion-ready="1"`，上游 `window.ready=true`。

两幅原始 PNG 分别转为 yuv444p，取 ffmpeg ssim 的 All 值。`compare-<序号>.png` 左为参考、右为本库原始 PNG；对照图与逐步状态报告保存在任务工作区的 `work/compare/`、`work/samples.json`。

| 时刻（秒） | 章节 | SSIM All | 对照图文件名 |
| --- | --- | --- | --- |
| 1.0 | 幕启 | 0.919752 | compare-01.png |
| 4.5 | 实验室 | 0.945780 | compare-02.png |
| 10.5 | 实验室 | 0.896708 | compare-03.png |
| 15.0 | 实验室 | 0.970051 | compare-04.png |
| 24.0 | 副歌一 | 0.911237 | compare-05.png |
| 30.5 | 副歌一 | 0.922806 | compare-06.png |
| 45.0 | 升空 | 0.995580 | compare-07.png |
| 64.0 | 副歌二 | 0.955923 | compare-08.png |
| 80.0 | 过时 | 0.922466 | compare-09.png |
| 100.0 | 副歌三 | 0.901937 | compare-10.png |
| 128.0 | 副歌四 | 0.902347 | compare-11.png |
| 150.0 | 谢幕 | 0.909247 | compare-12.png |

本机调用上游 `renderAt(t,'image/jpeg',.92)`，包含 redraw、#out合成与JPEG序列化：4.5秒为3708.7ms，24秒为5505.0ms，128秒为3597.9ms，三帧平均 **4270.5ms/帧**。GPU字符串由 `window.gpuInfo()` 读取：

```text
ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x0000A7A0) Direct3D11 vs_5_0 ps_5_0, D3D11)
```

`?render=1&sound=1` 下等待就绪并尝试开启声音，`soundEnabled=false`、`soundState="off"`；减少动态时为 `time=24`、`playing=false`、`data-motion-ready="1"`。
