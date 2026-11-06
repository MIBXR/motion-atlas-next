# 口袋里的爱因斯坦 · 白板讲解 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保存[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/whiteboard/demo)的制作脚本与输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按上游顺序生成声音、逐帧画面、字幕和成片。 |
| `CREDITS` | 画面、声音、字体与资料的原始来源和许可。 |
| `events.json` | 画面导出的笔画、场景和声音事件。 |
| `mix.py` | 拟音、环境、旁白和配乐的原混音。 |
| `music.py` | 原创配乐与合成音效。 |
| `test.js` | 白板引擎示例场景。 |
| `tools/asr_check.py` | 识别旁白并导出词级时间。 |
| `tools/cuecheck.py` | 上游音画时间对照工具。 |
| `tools/subs.mjs` | 导出旁白字幕时段。 |
| `tools/svgfont2json.py` | 把EMS单线SVG字形转换为笔顺JSON。 |
| `voices/dur.json` | 已生成旁白的原始时长。 |

## 重建顺序

在上游固定提交的制作库中，把`film/`与本目录的文件按相对路径合并到`styles/whiteboard/demo/`，把字体放回该目录的`fonts/`。入口的字体和`/core/lib.js`路径使用上游写法。共享制作工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，放回制作库的`core/`；Python环境与渲染依赖按其README安装。

```sh
python core/tts/tts.py styles/whiteboard/demo/lines.json styles/whiteboard/demo/voices
WM=medium.en python styles/whiteboard/demo/tools/asr_check.py styles/whiteboard/demo/lines.json styles/whiteboard/demo/voices
sh styles/whiteboard/demo/build.sh
```

白板的EMS Tech笔顺已在`fonts/EMSTech.json`；`tools/svgfont2json.py`读取hersheytext包中的EMS Tech SVG来生成同格式字形。`voices/words.json`是`atS/atE`的输入。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，由上游`sh tools/fetch.sh voice`安装到`core/tts/`。
- CC0乐器采样：[instruments-vsco2ce.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- CC0乐器采样：[instruments-vcsl.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- CC0乐器采样：[instruments-freepats.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-freepats.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- 字体家族与字重在条目`tokens.type`；Google Fonts字体取自[固定字体源码](https://github.com/google/fonts/tree/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/)。
- 公开成片：[whiteboard.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/whiteboard.mp4)。
