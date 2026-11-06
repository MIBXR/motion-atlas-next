# 林下的田 · 点云测绘 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，公开成片的原混音在 `../audio/film.m4a`。本目录保留上游制作脚本与输入数据的原字节。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 数据、字体、旁白、镜头事件、逐帧画面、配乐、混音与合成入口。 |
| `CREDITS` | USGS、USDA、字体、采样与语音来源和许可。 |
| `data/walls.json` | 吸附到地面脊线后的石墙点与长度。 |
| `data/walls_traced.json` | 手工描绘石墙的输入折线。 |
| `events.json` | 拟音事件时间表。 |
| `FACTS.md` | 画面数字、来源与测量方法。 |
| `mix.py` | 读取时间表、原始旁白与乐器采样生成配乐和混音。 |
| `timeline.json` | 从 timeline.js 导出的制作时间表。 |
| `tools/audiocheck.py` | 上游响度和关键声音段检查。 |
| `tools/build_data.py` | 将回波、地面、墙线和剖面编码为页面二进制与事实数据。 |
| `tools/cuecheck.py` | 上游拍网格检查。 |
| `tools/export.mjs` | 从 timeline.js 导出旁白、cue 与时间表。 |
| `tools/fetch_ept.py` | 按区域和深度获取公开 USGS EPT 子集。 |
| `tools/fetch_naip.py` | 取得并裁切公开 NAIP 航拍。 |
| `tools/fonts.py` | 下载 Barlow、Plex、Noto Sans SC 并按画面字符子集化。 |
| `tools/load.py` | 读取 LAZ 回波与分类。 |
| `tools/motioncheck.py` | 上游画面运动检查。 |
| `tools/profile.py` | 从真实地面回波生成石墙 C 剖面。 |
| `tools/scout_dem.py` | 用 USGS 3DEP 地形服务寻找场地。 |
| `tools/subcheck.mjs` | 上游字幕宽度检查。 |
| `tools/terrain.py` | 换算本地坐标并由地面点三角化地形。 |
| `tools/trace.py` | 将手描墙线吸附到局部地形脊线并测量。 |
| `tools/walls.py` | 生成地面、局部起伏和候选石墙脊线。 |
| `voice/lines.json` | 旁白文本与语音参数。 |
| `voice/out/dur.json` | 原旁白时长。 |
| `voice/out/words.json` | 原语音识别结果与时刻。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的库根目录使用上游依赖环境，将制作文件与本案例运行文件合并到 `styles/lidar-survey/demo/`；页面使用上游 `index.html` 的字体和模块路径。共享工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，可放回该制作库的 `core/`。

1. `python -I demo/tools/fetch_ept.py demo/assets/raw/ept 14 USGS_LPC_CT_Statewide_B8_2016 -72.2005,-72.1915,41.8830,41.8920`。
2. `python -I demo/tools/walls.py demo/assets/raw/ept demo/assets/raw/work` → `python -I demo/tools/trace.py demo/assets/raw/work demo/data` → `python -I demo/tools/profile.py demo/assets/raw/ept demo/data C 20 80`。
3. `python -I demo/tools/build_data.py demo/assets/raw/ept demo/assets/raw/work demo/data demo/assets/raw/build` → `python -I demo/tools/fetch_naip.py demo/assets/raw/build` → `python -I demo/tools/fonts.py demo`。
4. `node demo/tools/export.mjs demo` → `python core/tts/tts.py demo/voice/lines.json demo/voice/out` → `python core/tts/asr_check.py demo/voice/lines.json demo/voice/out --lang en --model small.en` → `node demo/tools/export.mjs demo`。
5. `node core/render/events.mjs demo` → `node core/render/video.mjs demo --fps 24 --workers 3 --out demo/out/video.mp4` → `python demo/mix.py` → `sh core/render/mux.sh demo/out/video.mp4 demo/out/mix.wav demo/out/master.mp4 24 0`。
6. 按 `build.sh` 的 CRF 26 命令输出最终 MP4，再从 `out/cues_srt.json` 导出字幕；原目录可用 `FETCH=1 sh styles/lidar-survey/demo/build.sh` 串联。

这里的 `demo` 是 `styles/lidar-survey/demo`。数据工具的私有环境需要 laspy、lazrs、scikit-image、NumPy、SciPy、Pillow、fontTools 和 Brotli。

## 外部输入

- 激光原始数据：<https://s3-us-west-2.amazonaws.com/usgs-lidar-public/USGS_LPC_CT_Statewide_B8_2016/ept.json>，由 `tools/fetch_ept.py` 按指定经纬框获取，不保存整个数据集。
- 2016-07-24 NAIP 航拍：<https://planetarycomputer.microsoft.com/api/data/v1>，项目 `ct_m_4107207_sw_18_.6_20160724_20160913`，由 `tools/fetch_naip.py` 裁切；运行用成品已在 `film/assets/raw/build/naip.jpg`。
- VSCO 2 CE 与 VCSL（CC0）：<https://github.com/sgossner/VSCO-2-CE>、<https://github.com/sgossner/VCSL>，由上游 `tools/fetch.sh instruments vsco2ce` / `instruments vcsl` 取得，`mix.py` 经 sampler 读取。
- Kokoro bm_george 与模型：<https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar>，上游 `tools/fetch.sh voice`。
- 字体：<https://github.com/google/fonts/tree/main/ofl>，由 `tools/fonts.py` 取得并对子集字符编码。

LAZ节点、原始地形中间数据、采样库、Kokoro模型和完整CJK源字体按上述地址及脚本取得，放回原脚本指定目录。

上游 `tools/fetch.sh` 从 `assets` Release 获取大文件包，清单为固定提交的 `tools/assets.json`。采样包：[instruments-vsco2ce.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)、[instruments-vcsl.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)。
