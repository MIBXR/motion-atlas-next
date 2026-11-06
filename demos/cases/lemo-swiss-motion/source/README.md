# 海报五则 · 瑞士动态排版 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，公开成片的原混音在 `../audio/film.m4a`。本目录保留上游制作脚本与输入数据的原字节。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按旁白、乐谱、拟音、画面、混音和合成的顺序制作影片。 |
| `CREDITS` | 原始字体、鼓组、贝斯、钟琴与语音许可。 |
| `events.json` | 从画面 buildEvents 导出的拟音时间表。 |
| `mix.py` | 读取事件、旁白和配乐进行拟音与混音。 |
| `music/score.py` | 与画面共读 score.json，生成 motorik 配乐和分轨。 |
| `music/score_meta.json` | 配乐调式、音色和起音元数据。 |
| `tools/subs.py` | 整理字幕间隔。 |
| `tools/words.py` | 对齐转写单词与字幕字符，导出逐词时刻。 |
| `voices/words.json` | 原始语音识别时刻。 |

## 重建顺序

在固定提交的库根目录使用上游依赖环境，将本目录文件与 `../film/` 合并到 `styles/swiss-motion/demo/`，字体置于其 `fonts/`，页面沿用上游 index 路径。共用工具保存在 [本库 core/](../../../materials/lemo-opuscar/core/README.md)，放回制作库的 `core/`。

```sh
D=styles/swiss-motion/demo
PY=.venv/bin/python
$PY core/tts/tts.py $D/lines.json $D/voices
$PY core/tts/asr_check.py $D/lines.json $D/voices
$PY $D/tools/words.py
$PY $D/music/score.py
node core/render/events.mjs $D
$PY $D/mix.py
$PY $D/tools/subs.py
$PY core/render/srt.py $D/out/subs.json styles/swiss-motion/swiss-motion.srt
node core/render/video.mjs $D --fps 24 --workers 3 --out $D/out/video24.mp4
sh core/render/mux.sh $D/out/video24.mp4 $D/mix.wav styles/swiss-motion/swiss-motion.mp4 24 0
```

`sh styles/swiss-motion/demo/build.sh` 按此顺序串联。Archivo、UnifrakturMaguntia、DM Serif Display 已保存在案例字体目录。

## 外部输入

- 采样由上游 `tools/fetch.sh instruments freepats` / `instruments vcsl` 取得：MuldjordKit <https://freepats.zenvoid.org/Percussion/muldjordkit.html>（CC BY 4.0）；FreePats 电贝斯 <https://freepats.zenvoid.org/>（CC0）；VCSL 钟琴 <https://github.com/sgossner/VCSL>（CC0）。`music/score.py` 经共享 sampler 读取。
- Kokoro af_sarah 模型和声音包：<https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar>，由 `tools/fetch.sh voice` 取得。
- 字体来自 Google Fonts 的 `ofl/archivo`、`ofl/unifrakturmaguntia`、`ofl/dmserifdisplay`；UnifrakturMaguntia 的官方 Book 文件以原页面要求的 `UnifrakturMaguntia-Regular.ttf` 文件名保存。

采样库与Kokoro模型按上述地址和脚本取得，放回制作库 core/audio/instruments/ 与 core/tts/。

上游 `tools/fetch.sh` 从 `assets` Release 获取大文件包，清单为固定提交的 `tools/assets.json`。采样包：[instruments-freepats.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-freepats.tar)、[instruments-vcsl.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)。
