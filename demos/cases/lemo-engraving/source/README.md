# 蜜蜂，第七号图版 · 铜版画 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保存[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/engraving/demo)的制作脚本与输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按上游顺序生成声音、逐帧画面、字幕和成片。 |
| `content_alt.json` | 扇贝主题的可替换图版内容。 |
| `CREDITS` | 画面、声音、字体与资料的原始来源和许可。 |
| `events.json` | 画面导出的笔画、场景和声音事件。 |
| `example/index.html` | 铜版引擎的五秒绘制示例。 |
| `mix.py` | 拟音、环境、旁白和配乐的原混音。 |
| `music/CREDITS_music.txt` | 铜版画配乐和采样署名。 |
| `music/cues.json` | 铜版画配乐与细节落点的时间表。 |
| `music/score.py` | 案例原创配乐与分轨。 |
| `tools/build_alt.sh` | 重建扇贝替换图版的制作入口。 |
| `tools/cuecheck.py` | 上游音画时间对照工具。 |
| `tools/events.mjs` | 从铜版画页面导出事件。 |
| `tools/readcheck/index.html` | 图版标签阅读时间的上游制作页面。 |
| `tools/subs.py` | 将案例旁白时间导出为字幕。 |
| `voices/words.json` | 语音识别导出的逐词边界。 |

## 重建顺序

在上游固定提交的制作库中，把`film/`与本目录的文件按相对路径合并到`styles/engraving/demo/`，把字体放回该目录的`fonts/`。入口的字体和`/core/lib.js`路径使用上游写法。共享制作工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，放回制作库的`core/`；Python环境与渲染依赖按其README安装。

```sh
sh styles/engraving/demo/build.sh
sh styles/engraving/demo/tools/build_alt.sh
```

默认命令使用蜜蜂`content.json`；第二条命令使用`content_alt.json`制作扇贝图版。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，由上游`sh tools/fetch.sh voice`安装到`core/tts/`。
- CC0乐器采样：[instruments-vsco2ce.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- CC0乐器采样：[instruments-vcsl.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- 字体家族与字重在条目`tokens.type`；Google Fonts字体取自[固定字体源码](https://github.com/google/fonts/tree/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/)。
- 公开成片：[engraving.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/engraving.mp4)。
