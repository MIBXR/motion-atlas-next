# 三十三只 · 印刷长镜头 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，原混音在`../audio/film.m4a`。本目录保留上游制作文件和输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `audio.py` | 叙事配乐、环境与印刷拟音、旁白及混音。 |
| `build.sh` | 按原目录结构重建字体、声音、画面、字幕与静帧。 |
| `CREDITS` | 第三方资源、署名与许可原文。 |
| `DEMO.md` | 上游示范片故事、镜头、声音与制作说明原文。 |
| `events.json` | 从影片时间表导出的声音与画面事件。 |
| `FACTS.md` | 片中地点、数值与陈述的来源。 |
| `lines_en.json` | 英语旁白与屏幕文本。 |
| `lines_zh.json` | 中文旁白与屏幕文本。 |
| `style.json` | 风格名称、简介、时长与预览秒。 |
| `STYLE.md` | 上游风格提示词原文。 |
| `tools/chars.txt` | 原作字体子集字符表。 |
| `tools/srt.py` | 把双语时间表导出SRT。 |
| `tools/subset.py` | 把Noto Serif SC固定到700并按作品字符生成WOFF2。 |
| `voice/en/dur.json` | 逐句旁白实长。 |
| `voice/en/words.json` | 逐词语音定位数据。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/printed-long-take)的上游库根目录执行，`<demo>`表示`styles/printed-long-take/demo`，`<film>`表示`styles/printed-long-take`；本目录制作文件、`../film/`作品代码和`../fonts/`字体按上游路径组合，入口路径使用上游`index.html`。共享工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，对应`core/render/`、`core/audio/`与`core/tts/`；制作环境使用固定提交的依赖。

1. 从下表取得Noto Serif SC变量字体到`<demo>/tools/NotoSerifSC-VF.ttf`，运行`python <demo>/tools/subset.py`，字重700、252字符、`kern,palt`。
2. `python core/tts/tts_zh.py <demo>/lines_en.json <demo>/voice/en --voice en-US-AvaNeural --rate +10%`；中文时长使用`voice/zh/dur.json`。
3. `node core/render/events.mjs <demo>` → `python <demo>/audio.py en`。
4. `node core/render/video.mjs <demo> --fps 30 --workers 3 --out <demo>/out/video.mp4` → `sh core/render/mux.sh <demo>/out/video.mp4 <demo>/mix.wav <film>/printed-long-take.mp4 30 0` → `python <demo>/tools/srt.py`。

`sh styles/printed-long-take/demo/build.sh`按上游顺序重建成片与制作静帧。

## 字体与外部输入

| 字体文件 | 来源 |
| --- | --- |
| `NotoSerifSC-VF.ttf` | [固定版本字体](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf) |

- [vcsl采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)：`sh tools/fetch.sh instruments vcsl`，放在`core/audio/instruments/`。
- [vsco2ce采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)：`sh tools/fetch.sh instruments vsco2ce`，放在`core/audio/instruments/`。
- Microsoft edge-tts在线语音：英语`en-US-AvaNeural`与中文`zh-CN-XiaoxiaoNeural`，按`build.sh`的逐句语速生成。

字体许可见`../fonts/OFL-*.txt`，音频采样与旁白声明见[../audio/CREDITS](../audio/CREDITS)。
