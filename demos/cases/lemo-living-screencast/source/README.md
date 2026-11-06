# Clawd 搬进来 · 活体实机录屏 · 制作文件

运行画面在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保留原作制作文件与原相对目录。

## 文件

| 文件 | 用途 |
| --- | --- |
| `lines.json` | 旁白文本、声线、速度或逐句配置。 |
| `build.sh` | 按顺序重建字幕字体、旁白、配乐、事件、混音和成片。 |
| `CREDITS` | 原作素材、声音、字体的来源与署名。 |
| `events.json` | 画面导出的拟音与旁白事件表。 |
| `sound.py` | 合成配乐或拟音，叠加旁白、闪避与混音。 |
| `tools/asr_check.py` | 原作语音、混音或节拍制作检查工具。 |
| `tools/mixcheck.py` | 原作语音、混音或节拍制作检查工具。 |
| `tools/subs.mjs` | 导出字幕或生成SRT。 |

## 重建

在[上游固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00)的仓库根目录运行，Demo位置为`styles/living-screencast/demo/`。本目录文件对应Demo内同名相对路径，`../film/`对应其绘制代码，字体放回Demo的`fonts/`。

共享制作工具与依赖位于本库[`demos/materials/lemo-opuscar/core/`](../../../materials/lemo-opuscar/core/README.md)：`tts/`制作与识别旁白，`audio/`提供合成、采样和混音，`render/`导出事件、逐帧渲染、字幕和编码。环境和采样取得方式见其中README和`core/audio/INSTRUMENTS.md`。

1. 按下表取得字体并放回Demo的`fonts/`。
2. `core/tts/tts.py`按`lines.json`生成旁白，`core/tts/asr_check.py`取得时长和词时间戳。
3. 由画面导出`events.json`，`sound.py`一次生成双层配乐、拟音与旁白混音。
4. `core/render/video.mjs`按原fps逐帧绘制，再以原mux脚本合成字幕、声音和编码。

完整命令：`sh styles/living-screencast/demo/build.sh`；重做旁白用`--vo`。

## 字体与大文件来源

- `Inter.ttf`：[同一家族源文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf)。
- `Newsreader-VF.ttf`：[同一家族源文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/newsreader/Newsreader%5Bopsz%2Cwght%5D.ttf)。
- `Newsreader-Italic-VF.ttf`：[同一家族源文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/newsreader/Newsreader-Italic%5Bopsz%2Cwght%5D.ttf)。
- `JetBrainsMono-var.ttf`：[同一家族源文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf)。

成片：[Release/living-screencast.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/living-screencast.mp4)。旁白WAV、采样库、配乐stems与中间视频由制作脚本在上游环境生成；正式音轨在本体中以AAC流保存。所有资源署名见[../audio/CREDITS](../audio/CREDITS)。

配乐采样按共享`core/audio/INSTRUMENTS.md`与`tools/fetch.sh instruments <lib>`取得；采样索引为`core/audio/instruments/index.json`，原作使用的乐器与许可见配乐脚本及CREDITS。

制作依赖的大文件包按上游`tools/assets.json`取得：

- `voice`：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)。
- `instruments-salamander`：[instruments-salamander.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-salamander.tar)。
- `instruments-freepats`：[instruments-freepats.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-freepats.tar)。
- `instruments-karoryfer`：[instruments-karoryfer.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-karoryfer.tar)。
- `instruments-vcsl`：[instruments-vcsl.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)。
- `instruments-vsco2ce`：[instruments-vsco2ce.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)。
