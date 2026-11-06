# 后羿射日 · 皮影戏 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，成片混音在 `../audio/film.m4a`。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 从旁白、配乐到逐帧渲染及混音封装的完整入口。 |
| `CREDITS` | 原作采样来源与许可。 |
| `events.json` | 画面导出的声音与动作事件。 |
| `lines.json` | 旁白文本、声音与朗读参数。 |
| `mix.py` | 按事件生成拟音，合成环境声、配乐和旁白。 |
| `music/credits.txt` | 原作采样来源与许可。 |
| `music/score.json` | 配乐结构与提示点数据。 |
| `music/score.py` | 原作配乐的乐器、旋律、节奏和采样渲染。 |
| `test.js` | 上游色卡、人物与姿势模型页调度。 |
| `tools/cues.py` | 上游制作输入与工具。 |
| `tools/mux.sh` | 上游音视频封装与编码参数。 |
| `tools/probe.mjs` | 上游渲染或时间表导出工具。 |
| `voices/words.json` | 上游旁白词级时间戳。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的制作环境中，把本目录和 `../film/` 按原相对路径合并至 `styles/shadow-puppet/demo/`，字体放回 `fonts/`，入口采用该固定提交的原始 `index.html`。共享工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. `python core/tts/tts.py styles/shadow-puppet/demo/lines.json styles/shadow-puppet/demo/voices`。

2. `python core/tts/asr_check.py styles/shadow-puppet/demo/lines.json styles/shadow-puppet/demo/voices`。

3. `node core/render/events.mjs styles/shadow-puppet/demo`。

4. `python styles/shadow-puppet/demo/music/score.py`。

5. `python styles/shadow-puppet/demo/mix.py`。

6. `node core/render/video.mjs styles/shadow-puppet/demo --fps 24 --workers 3 --out styles/shadow-puppet/demo/out/video24.mp4`。

7. `sh styles/shadow-puppet/demo/tools/mux.sh styles/shadow-puppet/demo/out/video24.mp4 styles/shadow-puppet/demo/mix.wav styles/shadow-puppet/shadow-puppet.mp4 24 2`。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，使用上游 `tools/fetch.sh voice` 放入 `core/tts/`。
- 采样库由上游 `tools/fetch.sh instruments` 安装至 `core/audio/instruments/`；[固定素材清单](https://github.com/lemomo-ai/lemo-opuscar/blob/f17136060781a0068a7951245a3aa7835a7230de/tools/assets.json)提供FreePats、Karoryfer、VSCO2CE与VCSL的Release包地址。`music/score.py` 读取所用乐器。
- 字体 `MaShanZheng-Regular.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/mashanzheng/MaShanZheng-Regular.ttf)。
- 字体 `CormorantGaramond-*.ttf`：[原始文件](https://raw.githubusercontent.com/google/fonts/6c1dbe27dcf7d817d4b62cec033ba77fa8e2a5ec/ofl/cormorantgaramond/)；wght=500/600/700，斜体600；固定字重实例。。
- 字体家族、字重与字符范围见 `../fonts/fonts.css`；OFL原文随字体保存。
