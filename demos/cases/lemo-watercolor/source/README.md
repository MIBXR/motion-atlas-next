# 跟着雨走 · 水彩笔刷 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，公开成片的原混音在 `../audio/film.m4a`。本目录保留上游制作脚本与输入数据的原字节。

## 文件

| 文件 | 用途 |
| --- | --- |
| `asr.py` | 逐条识别旁白并输出转写。 |
| `CREDITS` | 音乐、语音、海岸线与字体的原始来源和许可。 |
| `extract_aus.mjs` | 由世界地图抽取澳大利亚海岸环。 |
| `fetch_fonts.mjs` | 从 Google Fonts 下载相同家族、字重并收集画面 CJK 字符。 |
| `fonts.css` | 上游字体声明，供在原目录重建时使用。 |
| `mix.py` | 合成拟音，混合旁白与 Wildflowers 剪辑。 |
| `music/analyze.py` | 分析配乐拍点与相似性。 |
| `music/edit.py` | 按原设定拍点剪接连续配乐。 |
| `music/jump.py` | 列出拍对齐的跳接候选。 |
| `music/lag.py` | 估计音乐对齐时差。 |
| `music/prep.sh` | 取得 Wildflowers 并解码为分析与混音输入。 |
| `music/score_beats.json` | 剪辑后音乐的节拍。 |
| `music/wf_beats.json` | 原配乐的拍点与分析输入。 |
| `mux.sh` | 拼接分段画面、混入音轨并合成正式 MP4。 |
| `paper.py` | 以固定种子生成暖纸、纤维与细颗粒。 |
| `render.mjs` | 等待 READY，按秒调用 render，输出静帧、声音事件或逐帧视频。 |
| `sheet.py` | 把静帧排成接触表。 |
| `tts/gen.py` | 用 Kokoro af_heart、0.93 倍速生成十三句旁白。 |
| `tts/lines.json` | 十三句旁白原文。 |
| `vendor/countries-50m.json` | 生成海岸线用的 Natural Earth / world-atlas 输入。 |
| `vendor/LICENSE-topojson-client` | topojson-client 的 ISC 许可原文。 |
| `vendor/LICENSE-world-atlas` | world-atlas 的 ISC 许可原文。 |
| `vendor/topojson-client.min.cjs` | 解码 TopoJSON 的 topojson-client 3.1.0。 |
| `voices/dur.json` | 旁白原始时长。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的库根目录使用上游依赖环境，将制作文件与本案例运行文件合并到 `styles/watercolor/demo/`；页面使用上游 `index.html` 的字体和模块路径。共享工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，可放回该制作库的 `core/`。

1. `node styles/watercolor/demo/fetch_fonts.mjs`；在 demo 中用 Python 运行 `paper.py`，海岸线输入已在 `aus.js`，需要时再运行 `extract_aus.mjs`。
2. `python styles/watercolor/demo/tts/gen.py` → `python styles/watercolor/demo/asr.py`；旁白时长写入 `scene.js` 的 VO。
3. `sh styles/watercolor/demo/music/prep.sh` → `python styles/watercolor/demo/music/analyze.py` → `python styles/watercolor/demo/music/jump.py` → `python styles/watercolor/demo/music/edit.py`。
4. `python styles/watercolor/demo/mix.py` → `node styles/watercolor/demo/render.mjs video 8` → `sh styles/watercolor/demo/mux.sh`。
5. VO 生成字幕 cue 后，用 `python core/render/srt.py <cues.json> <watercolor.srt>` 输出字幕。

## 外部输入

- 配乐：Scott Buckley《Wildflowers》，CC BY 4.0，`music/prep.sh` 从 <https://www.scottbuckley.com.au/library/wp-content/uploads/2025/12/Wildflowers.mp3> 取得。
- Kokoro 模型和声音包：<https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar>；由上游 `tools/fetch.sh voice` 安装至 `core/tts/`，`tts/gen.py` 读取。
- 字体由 `fetch_fonts.mjs` 调用 <https://fonts.googleapis.com/css2> 取得，CJK 范围是 `scene.js` + `main.js` 中的字符。
- 海岸线：<https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json>，输入与 ISC 许可已保存在 `vendor/`。

配乐源文件与Kokoro模型按上述地址和脚本取得，放回 music/ 与制作库 core/tts/。

上游 `tools/fetch.sh` 从 `assets` Release 获取大文件包，清单为固定提交的 `tools/assets.json`。
