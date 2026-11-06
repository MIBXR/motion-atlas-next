# 月亮睡不着 · 蜡笔儿童绘本 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，成片混音在 `../audio/film.m4a`。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 从旁白、配乐到逐帧渲染及混音封装的完整入口。 |
| `CREDITS` | 原作采样来源与许可。 |
| `events.json` | 画面导出的声音与动作事件。 |
| `lines.json` | 旁白文本、声音与朗读参数。 |
| `mix.py` | 按事件生成拟音，合成环境声、配乐和旁白。 |
| `music/score.json` | 配乐结构与提示点数据。 |
| `music/score.py` | 原作配乐的乐器、旋律、节奏和采样渲染。 |
| `sheet.js` | 上游人物与道具模型页。 |
| `subs.json` | 字幕起止与文字。 |
| `subs.mjs` | 上游渲染或时间表导出工具。 |
| `test.js` | 上游色卡、人物与姿势模型页调度。 |
| `tools/mux.sh` | 上游音视频封装与编码参数。 |
| `voices/dur.json` | 上游旁白词级时间戳。 |
| `voices/words.json` | 上游旁白词级时间戳。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的制作环境中，把本目录和 `../film/` 按原相对路径合并至 `styles/crayon-book/demo/`，字体放回 `fonts/`，入口采用该固定提交的原始 `index.html`。共享工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. `python core/tts/tts.py styles/crayon-book/demo/lines.json styles/crayon-book/demo/voices`。

2. `python core/tts/asr_check.py styles/crayon-book/demo/lines.json styles/crayon-book/demo/voices`。

3. `node core/render/events.mjs styles/crayon-book/demo`。

4. `python styles/crayon-book/demo/music/score.py`。

5. `python styles/crayon-book/demo/mix.py`。

6. `node core/render/video.mjs styles/crayon-book/demo --fps 24 --workers 3 --out styles/crayon-book/demo/out/video24.mp4`。

7. `CRF=26 sh styles/crayon-book/demo/tools/mux.sh styles/crayon-book/demo/out/video24.mp4 styles/crayon-book/demo/mix.wav styles/crayon-book/crayon-book.mp4 24 0`。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，使用上游 `tools/fetch.sh voice` 放入 `core/tts/`。
- 采样库由上游 `tools/fetch.sh instruments` 安装至 `core/audio/instruments/`；[固定素材清单](https://github.com/lemomo-ai/lemo-opuscar/blob/f17136060781a0068a7951245a3aa7835a7230de/tools/assets.json)提供FreePats、Karoryfer、VSCO2CE与VCSL的Release包地址。`music/score.py` 读取所用乐器。
- 字体 `gaegu_Gaegu-Regular.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/gaegu/Gaegu-Regular.ttf)。
- 字体 `patrickhand_PatrickHand-Regular.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/patrickhand/PatrickHand-Regular.ttf)。
- 字体 `gaegu_Gaegu-Bold.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/gaegu/Gaegu-Bold.ttf)。
- 字体 `caveatbrush_CaveatBrush-Regular.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/caveatbrush/CaveatBrush-Regular.ttf)。
- 字体 `gochihand_GochiHand-Regular.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/gochihand/GochiHand-Regular.ttf)。
- 字体 `shortstack_ShortStack-Regular.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/shortstack/ShortStack-Regular.ttf)。
- 字体 `sniglet_Sniglet-Regular.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/sniglet/Sniglet-Regular.ttf)。
- 字体家族、字重与字符范围见 `../fonts/fonts.css`；OFL原文随字体保存。
