# 星光饭店的午夜 · 装饰艺术 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，原混音在`../audio/film.m4a`。本目录保留上游制作文件和输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按原目录结构重建字体、声音、画面、字幕与静帧。 |
| `CREDITS` | 第三方资源、署名与许可原文。 |
| `DEMO.md` | 上游示范片故事、镜头、声音与制作说明原文。 |
| `frames.js` | 用原引擎制作模型页和风格帧。 |
| `mix.py` | 合成拟音、处理旁白和配乐、按事件混音。 |
| `music/CREDITS_music.txt` | 原始配乐采样署名。 |
| `music/score.json` | 配乐节拍、分段、同步点与声部信息。 |
| `music/score.py` | 按影片节拍和事件生成原始采样配乐。 |
| `style.json` | 风格名称、简介、时长与预览秒。 |
| `STYLE.md` | 上游风格提示词原文。 |
| `timeline.json` | 节拍、段落和同步节点，供Python配乐读取。 |
| `tools/cuecheck.py` | 原作画音同步点检查工具。 |
| `tools/dump_timeline.mjs` | 将timeline.js导出为timeline.json。 |
| `tools/pitch.py` | 调整门童旁白音高。 |
| `tools/subs.py` | 将旁白时刻导出SRT输入。 |
| `voices/words.json` | 逐词语音定位数据。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/art-deco)的上游库根目录执行，`<demo>`表示`styles/art-deco/demo`，`<film>`表示`styles/art-deco`；本目录制作文件、`../film/`作品代码和`../fonts/`字体按上游路径组合，入口路径使用上游`index.html`。共享工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，对应`core/render/`、`core/audio/`与`core/tts/`；制作环境使用固定提交的依赖。

1. 取得下表字体，`node <demo>/tools/dump_timeline.mjs`导出时间表。
2. `python core/tts/tts.py <demo>/lines.json <demo>/voices` → `python <demo>/tools/pitch.py <demo>/lines.json <demo>/voices`。
3. `python <demo>/music/score.py` → `python <demo>/mix.py` → `python <demo>/tools/subs.py`。
4. `node core/render/video.mjs <demo> --fps 24 --workers 2 --out <demo>/out/video24.mp4` → `sh core/render/mux.sh <demo>/out/video24.mp4 <demo>/mix.wav <film>/art-deco.mp4 24 3`。

`sh styles/art-deco/demo/build.sh`按上游顺序重建成片与制作静帧。

## 字体与外部输入

| 字体文件 | 来源 |
| --- | --- |
| `Limelight-Regular.ttf` | [固定版本字体](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/limelight/Limelight-Regular.ttf) |
| `PoiretOne-Regular.ttf` | [固定版本字体](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/poiretone/PoiretOne-Regular.ttf) |
| `JosefinSans[wght].ttf` | [固定版本字体](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/josefinsans/JosefinSans%5Bwght%5D.ttf) |
| `Italiana-Regular.ttf` | [固定版本字体](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/italiana/Italiana-Regular.ttf) |

- [salamander采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-salamander.tar)：`sh tools/fetch.sh instruments salamander`，放在`core/audio/instruments/`。
- [karoryfer采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-karoryfer.tar)：`sh tools/fetch.sh instruments karoryfer`，放在`core/audio/instruments/`。
- [vcsl采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)：`sh tools/fetch.sh instruments vcsl`，放在`core/audio/instruments/`。
- [vsco2ce采样包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)：`sh tools/fetch.sh instruments vsco2ce`，放在`core/audio/instruments/`。
- [Kokoro语音模型与声音包](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)：`sh tools/fetch.sh voice`，放在`core/tts/`。

字体许可见`../fonts/OFL-*.txt`，音频采样与旁白声明见[../audio/CREDITS](../audio/CREDITS)。
