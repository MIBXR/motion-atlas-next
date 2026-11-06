# 走向远山 · 浮世绘 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，成片混音在 `../audio/film.m4a`。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 从旁白、配乐到逐帧渲染及混音封装的完整入口。 |
| `check_asr.py` | 上游成片语音识别核对入口。 |
| `CREDITS` | 原作采样来源与许可。 |
| `events.json` | 画面导出的声音与动作事件。 |
| `mix.py` | 按事件生成拟音，合成环境声、配乐和旁白。 |
| `music/score.json` | 配乐结构与提示点数据。 |
| `music/score.py` | 原作配乐的乐器、旋律、节奏和采样渲染。 |
| `subs.py` | 根据旁白时刻生成字幕提示点。 |
| `voices/words.json` | 上游旁白词级时间戳。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的制作环境中，把本目录和 `../film/` 按原相对路径合并至 `styles/ukiyoe/demo/`，字体放回 `fonts/`，入口采用该固定提交的原始 `index.html`。共享工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. `python core/tts/tts.py styles/ukiyoe/demo/lines.json styles/ukiyoe/demo/voices`。

2. `python core/tts/asr_check.py styles/ukiyoe/demo/lines.json styles/ukiyoe/demo/voices`。

3. `node core/render/events.mjs styles/ukiyoe/demo`。

4. `python styles/ukiyoe/demo/music/score.py`。

5. `python styles/ukiyoe/demo/mix.py`。

6. `node core/render/video.mjs styles/ukiyoe/demo --fps 24 --workers 3 --out styles/ukiyoe/demo/out/video24.mp4`。

7. `sh core/render/mux.sh styles/ukiyoe/demo/out/video24.mp4 styles/ukiyoe/demo/mix.wav styles/ukiyoe/ukiyoe.mp4 24 0`。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，使用上游 `tools/fetch.sh voice` 放入 `core/tts/`。
- 采样库由上游 `tools/fetch.sh instruments` 安装至 `core/audio/instruments/`；[固定素材清单](https://github.com/lemomo-ai/lemo-opuscar/blob/f17136060781a0068a7951245a3aa7835a7230de/tools/assets.json)提供FreePats、Karoryfer、VSCO2CE与VCSL的Release包地址。`music/score.py` 读取所用乐器。
- 字体 `shippori-500.woff2`：[原始文件](https://fonts.gstatic.com/s/shipporiminchob1/v24/wXK1E2wCr44tulPdnn-xbIpJ9RgT9-nKeol_2XKgxn0Euw.woff2)。
- 字体 `shippori-700.woff2`：[原始文件](https://fonts.gstatic.com/s/shipporiminchob1/v24/wXK1E2wCr44tulPdnn-xbIpJ9RgT9-nKMo9_2XKgxn0Euw.woff2)。
- 字体 `shippori-kanji.woff2`：[原始文件](https://fonts.gstatic.com/l/font?kit=wXK1E2wCr44tulPdnn-xbIpJ9RgT9-nKVo5P23in5H8-t9a7NQ6PztC7RulHVw&skey=2867c78c9b80ca5d&v=v24)。
- 字体 `yuji-kanji.woff2`：[原始文件](https://fonts.gstatic.com/l/font?kit=BngNUXdTV3vO6Lw5ApOPqPLgxKiB0ydh-lwLxWlV6fyCxVBCbV9Hz9faRg_vWEEY4cf0hnbLpnzstjAoEux40RSaBV3vGwtZLAjgPvm8jtd6IIezTTM&skey=9ffd14150d67040a&v=v9)。
- 字体家族、字重与字符范围见 `../fonts/fonts.css`；OFL原文随字体保存。
