# 周日骑行 · Risograph 孔版印刷 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保存[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/risograph/demo)的制作脚本与输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按上游顺序生成声音、逐帧画面、字幕和成片。 |
| `CREDITS` | 画面、声音、字体与资料的原始来源和许可。 |
| `events.json` | 画面导出的笔画、场景和声音事件。 |
| `mix.py` | 拟音、环境、旁白和配乐的原混音。 |
| `music/bell.py` | 自行车铃的程序合成。 |
| `music/score.json` | 巴萨诺瓦配乐结构与混音输入。 |
| `music/score.py` | 案例原创配乐与分轨。 |
| `tools/mux.sh` | 原版最终编码与混音脚本。 |
| `tools/subs.py` | 将案例旁白时间导出为字幕。 |
| `tools/video_png.mjs` | PNG逐帧截图和yuv444p无损中间视频。 |
| `voices/words.json` | 语音识别导出的逐词边界。 |

## 重建顺序

在上游固定提交的制作库中，把`film/`与本目录的文件按相对路径合并到`styles/risograph/demo/`，把字体放回该目录的`fonts/`。入口的字体和`/core/lib.js`路径使用上游写法。共享制作工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，放回制作库的`core/`；Python环境与渲染依赖按其README安装。

```sh
python core/tts/tts.py styles/risograph/demo/lines.json styles/risograph/demo/voices
python core/tts/asr_check.py styles/risograph/demo/lines.json styles/risograph/demo/voices
sh styles/risograph/demo/build.sh
```

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，由上游`sh tools/fetch.sh voice`安装到`core/tts/`。
- 字体家族与字重在条目`tokens.type`；Google Fonts字体取自[固定字体源码](https://github.com/google/fonts/tree/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/)。
- 公开成片：[risograph.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/risograph.mp4)。
