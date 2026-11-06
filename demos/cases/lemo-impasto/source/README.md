# 雨的颜色 · 油画厚涂 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，成片混音在 `../audio/film.m4a`。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 从旁白、配乐到逐帧渲染及混音封装的完整入口。 |
| `CREDITS` | 原作采样来源与许可。 |
| `mix.py` | 按事件生成拟音，合成环境声、配乐和旁白。 |
| `music/score.py` | 原作配乐的乐器、旋律、节奏和采样渲染。 |
| `test.js` | 上游色卡、人物与姿势模型页调度。 |
| `tools/dump_timeline.mjs` | 上游渲染或时间表导出工具。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的制作环境中，把本目录和 `../film/` 按原相对路径合并至 `styles/impasto/demo/`，字体放回 `fonts/`，入口采用该固定提交的原始 `index.html`。共享工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. `node styles/impasto/demo/tools/dump_timeline.mjs`。

2. `python styles/impasto/demo/music/score.py`。

3. `python styles/impasto/demo/mix.py`。

4. `node core/render/video.mjs styles/impasto/demo --fps 24 --workers 3 --out styles/impasto/demo/out/video24.mp4`。

5. `sh core/render/mux.sh styles/impasto/demo/out/video24.mp4 styles/impasto/demo/mix.wav styles/impasto/impasto.mp4 24 0`。

## 外部输入

- 采样库由上游 `tools/fetch.sh instruments` 安装至 `core/audio/instruments/`；[固定素材清单](https://github.com/lemomo-ai/lemo-opuscar/blob/f17136060781a0068a7951245a3aa7835a7230de/tools/assets.json)提供FreePats、Karoryfer、VSCO2CE与VCSL的Release包地址。`music/score.py` 读取所用乐器。
- 字体 `CormorantGaramond-Italic.woff2`：[原始文件](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtImSqn7B6D.woff2)。
- 字体 `CormorantSC.woff2`：[原始文件](https://fonts.gstatic.com/s/cormorantsc/v19/0ybmGD4kxqXBmOVLG30OGwsmWBMk-hfz0jCGGQ.woff2)。
- 字体家族、字重与字符范围见 `../fonts/fonts.css`；OFL原文随字体保存。
