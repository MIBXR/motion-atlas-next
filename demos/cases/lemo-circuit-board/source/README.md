# 七毫秒 · 电路板 · 制作文件

运行画面在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保留原作制作文件与原相对目录。

## 文件

| 文件 | 用途 |
| --- | --- |
| `audio.py` | 合成配乐或拟音，叠加旁白、闪避与混音。 |
| `build.sh` | 按顺序重建字幕字体、旁白、配乐、事件、混音和成片。 |
| `CREDITS` | 原作素材、声音、字体的来源与署名。 |
| `events.json` | 画面导出的拟音与旁白事件表。 |
| `FACTS.md` | 电力线路、时延与功率事实的公开来源。 |
| `tools/sheet.sh` | 原作静帧与接触表制作工具。 |
| `tools/srt.py` | 导出字幕或生成SRT。 |
| `tools/subset.py` | 按中文和英文字幕集合生成Noto Sans SC 500字重子集。 |
| `voice/words.json` | 逐词时间戳，供重建配音与动作对齐。 |
| `voice_en/dur.json` | 逐句配音时长。 |
| `voice_en/lines.json` | 旁白文本、声线、速度或逐句配置。 |

## 重建

在[上游固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00)的仓库根目录运行，Demo位置为`styles/circuit-board/demo/`。本目录文件对应Demo内同名相对路径，`../film/`对应其绘制代码，字体放回Demo的`fonts/`。

共享制作工具与依赖位于本库[`demos/materials/lemo-opuscar/core/`](../../../materials/lemo-opuscar/core/README.md)：`tts/`制作与识别旁白，`audio/`提供合成、采样和混音，`render/`导出事件、逐帧渲染、字幕和编码。环境和采样取得方式见其中README和`core/audio/INSTRUMENTS.md`。

1. 下载Noto Sans SC变量源，按`tools/subset.py`实例化500字重并取210字符字幕子集。
2. `core/tts/tts_zh.py`生成中文晓晓旁白，`core/tts/asr_check.py`生成词时间戳；英文版本由`build.sh en`制作。
3. `core/render/events.mjs`导出画面事件，`audio.py`生成配乐、拟音和混音。
4. `core/render/video.mjs --fps 30`逐帧绘制，再按`build.sh`的`core/render/mux.sh`步骤合成。

完整命令：`sh styles/circuit-board/demo/build.sh`。

## 字体与大文件来源

- `NotoSansSC-VF.ttf`：[同一家族源文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf)。

`NotoSansSC-VF.ttf`用于制作，运行文件为`fonts/NotoSansSC-Medium-sub.ttf`；字符来自`voice/lines.json`、`data/subs_en.json`和`0123456789,.·×→≈~`，使用原`tools/subset.py`的选项。

成片：[Release/circuit-board.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/circuit-board.mp4)。旁白WAV、采样库、配乐stems与中间视频由制作脚本在上游环境生成；正式音轨在本体中以AAC流保存。所有资源署名见[../audio/CREDITS](../audio/CREDITS)。
