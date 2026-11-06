# 风去了哪里 · 钢笔淡彩 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保存[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/urban-sketch/demo)的制作脚本与输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `api.js` | 钢笔与淡彩引擎的最小示例。 |
| `audio/cues.json` | 钢笔淡彩的音画时间与动作输入。 |
| `audio/foley.py` | 钢笔、纸页、风、脚步与接帽等程序拟音。 |
| `audio/mix.py` | 音乐、拟音与环境声混音。 |
| `audio/score.py` | 150BPM爵士圆舞曲原创配乐。 |
| `audio/strokes.json` | 从画面导出的真实笔画时间与位置。 |
| `build.sh` | 按上游顺序生成声音、逐帧画面、字幕和成片。 |
| `CREDITS` | 画面、声音、字体与资料的原始来源和许可。 |
| `events.json` | 画面导出的笔画、场景和声音事件。 |
| `look.js` | 纸页画面与相机的风格预览。 |
| `subs.json` | 字幕时段与文字。 |
| `tools/export_cues.mjs` | 从画面导出颜色、动作与笔画声音输入。 |

## 重建顺序

在上游固定提交的制作库中，把`film/`与本目录的文件按相对路径合并到`styles/urban-sketch/demo/`，把字体放回该目录的`fonts/`。入口的字体和`/core/lib.js`路径使用上游写法。共享制作工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，放回制作库的`core/`；Python环境与渲染依赖按其README安装。

```sh
sh styles/urban-sketch/demo/build.sh
```

## 外部输入

- CC0乐器采样：[instruments-vsco2ce.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- CC0乐器采样：[instruments-vcsl.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- CC0乐器采样：[instruments-karoryfer.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-karoryfer.tar)，按上游`tools/fetch.sh`放入`core/audio/instruments/`。
- 字体家族与字重在条目`tokens.type`；Google Fonts字体取自[固定字体源码](https://github.com/google/fonts/tree/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/)。
- 公开成片：[urban-sketch.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/urban-sketch.mp4)。
