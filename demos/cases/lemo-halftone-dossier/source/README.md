# 胖橘案卷 · 复古半调案卷 · 制作源文件

运行代码在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。本目录保存[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/halftone-dossier/demo)的制作脚本与输入，文本使用LF。

## 文件

| 文件 | 用途 |
| --- | --- |
| `CREDITS` | 画面、声音、字体与资料的原始来源和许可。 |
| `fetch_fonts.mjs` | 按原Google Fonts家族与字重下载unicode-range字体分片。 |
| `music.py` | 原创配乐与合成音效。 |
| `package-lock.json` | 固定playwright-core 1.63.0的制作依赖锁。 |
| `package.json` | 半调案卷的Playwright制作依赖。 |
| `render.mjs` | 逐帧截图、分段编码与最终混音入口。 |

## 重建顺序

在上游固定提交的制作库中，把`film/`与本目录的文件按相对路径合并到`styles/halftone-dossier/demo/`，把字体放回该目录的`fonts/`。入口的字体和`/core/lib.js`路径使用上游写法。共享制作工具位于本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，放回制作库的`core/`；Python环境与渲染依赖按其README安装。

以下命令在合并后的`styles/halftone-dossier/demo/`运行；其余案例从上游制作库根运行。

```sh
npm ci
node fetch_fonts.mjs
python music.py
node render.mjs video 6
node render.mjs mux ../halftone-dossier.mp4
```

## 外部输入

- 字体分片由`fetch_fonts.mjs`向Google Fonts请求原家族、字重与unicode-range。
- 公开成片：[halftone-dossier.mp4](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/halftone-dossier.mp4)。
