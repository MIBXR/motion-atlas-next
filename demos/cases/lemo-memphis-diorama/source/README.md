# 柚子城的四季 · 孟菲斯微缩景 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，公开成片的原混音在 `../audio/film.m4a`。本目录保留上游制作脚本与输入数据的原字节。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 字体、60fps 画面、音乐、合成与风格帧入口。 |
| `CREDITS` | Eian 作者署名、字体、Three.js 与原声制作来源。 |
| `music.py` | 连续钢琴曲、四季伴奏、主树回弹和场景拟音。 |
| `tools/fonts.py` | 从 TEXT 至 TITLE 的文字与可打印 ASCII 生成五个字体子集。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的库根目录使用上游依赖环境，将制作文件与本案例运行文件合并到 `styles/memphis-diorama/demo/`；页面使用上游 `index.html` 的字体和模块路径。共享工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)，可放回该制作库的 `core/`。

1. `python -I styles/memphis-diorama/demo/tools/fonts.py styles/memphis-diorama/demo`。
2. `node core/render/video.mjs styles/memphis-diorama/demo --fps 60 --workers 4 --out styles/memphis-diorama/demo/out/video.mp4`。
3. `python -I styles/memphis-diorama/demo/music.py` → `sh core/render/mux.sh styles/memphis-diorama/demo/out/video.mp4 styles/memphis-diorama/demo/out/mix.wav styles/memphis-diorama/memphis-diorama.mp4 60 0`。
4. 按 `build.sh` 输出风格帧与四季静帧；原目录可用 `sh styles/memphis-diorama/demo/build.sh` 串联。

## 外部输入

- 字体由 `tools/fonts.py` 从 <https://fonts.googleapis.com/css2> 按字符取得，OFL 原文来自 <https://github.com/google/fonts/tree/main/ofl>。
- 声音由 `music.py` 的 NumPy / SciPy 合成，不使用采样库或 TTS 模型。
- Three.js 固定为 0.170.0，运行模块及 MIT 原文保存在案例 `vendor/three@0.170.0/`。


