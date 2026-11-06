# 静海日志 · ASCII / CRT 终端 · 制作文件

运行画面在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保留原作制作文件与原相对目录。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按顺序重建字幕字体、旁白、配乐、事件、混音和成片。 |
| `CREDITS` | 原作素材、声音、字体的来源与署名。 |
| `events.json` | 画面导出的拟音与旁白事件表。 |
| `mix.py` | 合成配乐或拟音，叠加旁白、闪避与混音。 |
| `music/score.json` | 配乐音符、声部、节拍与音效时间数据。 |
| `music/score.py` | 原片配乐的可编辑乐谱与渲染入口。 |
| `tools/subs.mjs` | 导出字幕或生成SRT。 |
| `voice_fx.py` | 将Kokoro原声处理为机器声。 |
| `voices_raw/dur.json` | 逐句配音时长。 |

## 重建

在[上游固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00)的仓库根目录运行，Demo位置为`styles/ascii-crt/demo/`。本目录文件对应Demo内同名相对路径，`../film/`对应其绘制代码，字体放回Demo的`fonts/`。

共享制作工具与依赖位于本库[`demos/materials/lemo-opuscar/core/`](../../../materials/lemo-opuscar/core/README.md)：`tts/`制作与识别旁白，`audio/`提供合成、采样和混音，`render/`导出事件、逐帧渲染、字幕和编码。环境和采样取得方式见其中README和`core/audio/INSTRUMENTS.md`。

1. 按下表取得字体并放回Demo的`fonts/`。
2. `core/tts/tts.py`按`lines.json`生成旁白，`core/tts/asr_check.py`取得时长和词时间戳。 `voice_fx.py`位于原声与识别之间。
3. 由画面导出`events.json`，渲染`music/score.py`，再执行混音脚本；具体先后顺序见本目录`build.sh`。
4. `core/render/video.mjs`按原fps逐帧绘制，再以原mux脚本合成字幕、声音和编码。

完整命令：`sh styles/ascii-crt/demo/build.sh`。

## 字体与大文件来源

- `VT323-Regular.ttf`：[同一家族源文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/vt323/VT323-Regular.ttf)。

成片：[Release/ascii-crt.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/ascii-crt.mp4)。旁白WAV、采样库、配乐stems与中间视频由制作脚本在上游环境生成；正式音轨在本体中以AAC流保存。所有资源署名见[../audio/CREDITS](../audio/CREDITS)。

制作依赖的大文件包按上游`tools/assets.json`取得：

- `voice`：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)。
