# 汉字的故事 · 黑板粉笔 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保存[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/chalkboard/demo)的制作脚本与输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `audio.py` | 粉笔录音切粒、古琴物理模型、旁白与配乐的混音。 |
| `build.sh` | 按上游顺序生成声音、逐帧画面、字幕和成片。 |
| `CREDITS` | 画面、声音、字体与资料的原始来源和许可。 |
| `events.json` | 画面导出的笔画、场景和声音事件。 |
| `FACTS.md` | 射、矮、短与历史字形的原始资料出处。 |
| `foley/lib/index.json` | 粉笔切粒索引与源录音分段。 |
| `lines.json` | 制作旁白的文本、读音、角色和语速。 |
| `lines_en.json` | 英文配音版本的输入。 |
| `tools/foley_lib.py` | 把三种粉笔录音切成拟音颗粒。 |
| `tools/srt.py` | 输出黑板案例的中英字幕。 |
| `tools/subset.py` | 按SUB与ASCII字符生成霞鹜文楷字幕子集。 |
| `vo/dur.json` | 已生成旁白的原始时长。 |
| `vo/words.json` | 语音识别导出的逐词边界。 |
| `vo_en/dur.json` | 已生成旁白的原始时长。 |

## 重建顺序

在上游固定提交的制作库中，把`film/`与本目录的文件按相对路径合并到`styles/chalkboard/demo/`，把字体放回该目录的`fonts/`。入口的字体和`/core/lib.js`路径使用上游写法。共享制作工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，放回制作库的`core/`；Python环境与渲染依赖按其README安装。

```sh
sh styles/chalkboard/demo/build.sh
sh styles/chalkboard/demo/build.sh en
```

`build.sh`先取得EMS字体、LXGW WenKai v1.530与三种粉笔录音，按`tools/subset.py`制作字幕子集，再制作所选语言的旁白、事件、拟音与配乐、画面和成片。英文命令制作另一套音轨。

## 外部输入

- CC0乐器采样：[instruments-vsco2ce.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- CC0乐器采样：[instruments-vcsl.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- 旁白：Microsoft Edge TTS，中文`zh-CN-XiaoxiaoNeural`、+15%；英文`en-US-AvaNeural`、+10%，由`core/tts/tts_zh.py`生成。
- 粉笔录音：[fattirewhitey](https://upload.wikimedia.org/wikipedia/commons/8/81/264944_chalk-on-chalkboard.wav)、[Tomproberts](https://upload.wikimedia.org/wikipedia/commons/3/36/Chalkboard-writing.ogg)、[Work With Sounds / La Fonderie](https://upload.wikimedia.org/wikipedia/commons/2/20/WWS_Chalk.ogg)；运行`tools/foley_lib.py`恢复`foley/lib/`音频颗粒。
- 字体家族与字重在条目`tokens.type`；Google Fonts字体取自[固定字体源码](https://github.com/google/fonts/tree/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/)。
- [LXGW WenKai v1.530](https://github.com/lxgw/LxgwWenKai/releases/tag/v1.530)；[EMS单线SVG](https://gitlab.com/oskay/svg-fonts/-/tree/master/fonts/EMS)。
- 公开成片：[chalkboard.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/chalkboard.mp4)。
