# 绕远路回家 · 丝印旅行海报 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，原混音在`../audio/film.m4a`。本目录保留上游制作文件和输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按原目录结构重建字体、声音、画面、字幕与静帧。 |
| `CREDITS` | 第三方资源、署名与许可原文。 |
| `DEMO.md` | 上游示范片故事、镜头、声音与制作说明原文。 |
| `events.json` | 从影片时间表导出的声音与画面事件。 |
| `FACTS.md` | 片中地点、数值与陈述的来源。 |
| `mix.py` | 合成拟音、处理旁白和配乐、按事件混音。 |
| `music/compose.py` | 从共享采样乐器生成原始配乐。 |
| `style.json` | 风格名称、简介、时长与预览秒。 |
| `STYLE.md` | 上游风格提示词原文。 |
| `tools/cues.py` | 从旁白入点与音频长度导出字幕。 |
| `tools/fetch_fonts.sh` | 下载原作使用的字体家族。 |
| `voice/lines.json` | 原始旁白台词、语音与字幕数据。 |
| `voice/subs.json` | 导出的字幕时刻与文本。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/silkscreen-poster)的上游库根目录执行，`<demo>`表示`styles/silkscreen-poster/demo`，`<film>`表示`styles/silkscreen-poster`；本目录制作文件、`../film/`作品代码和`../fonts/`字体按上游路径组合，入口路径使用上游`index.html`。共享工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，对应`core/render/`、`core/audio/`与`core/tts/`；制作环境使用固定提交的依赖。

1. `sh styles/silkscreen-poster/demo/tools/fetch_fonts.sh`。
2. `python core/tts/tts.py <demo>/voice/lines.json <demo>/out/voice`，然后`python <demo>/tools/cues.py`。
3. `node core/render/events.mjs <demo>` → `python <demo>/music/compose.py` → `python <demo>/mix.py`。
4. `node core/render/video.mjs <demo> --fps 24 --workers 2 --out <demo>/out/video.mp4` → `sh core/render/mux.sh <demo>/out/video.mp4 <demo>/out/mix.wav <film>/silkscreen-poster.mp4 24 2`。

`sh styles/silkscreen-poster/demo/build.sh`按上游顺序重建成片与制作静帧。

## 字体与外部输入

| 字体文件 | 来源 |
| --- | --- |
| `BigShouldersDisplaywght.ttf` | [固定版本字体](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/bigshouldersdisplay/BigShouldersDisplay%5Bwght%5D.ttf) |
| `Outfitwght.ttf` | [固定版本字体](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/outfit/Outfit%5Bwght%5D.ttf) |
| `NotoSansSCwght.ttf` | [固定版本字体](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf) |

- [freepats采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-freepats.tar)：`sh tools/fetch.sh instruments freepats`，放在`core/audio/instruments/`。
- [karoryfer采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-karoryfer.tar)：`sh tools/fetch.sh instruments karoryfer`，放在`core/audio/instruments/`。
- [vcsl采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)：`sh tools/fetch.sh instruments vcsl`，放在`core/audio/instruments/`。
- [vsco2ce采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)：`sh tools/fetch.sh instruments vsco2ce`，放在`core/audio/instruments/`。
- [Kokoro语音模型与声音包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)：`sh tools/fetch.sh voice`，放在`core/tts/`。

字体许可见`../fonts/OFL-*.txt`，音频采样与旁白声明见[../audio/CREDITS](../audio/CREDITS)。
