# 末班夜车 · 纸雕灯影 · 制作源文件

运行引擎在`../film/`，字体在`../fonts/`，成片音轨在`../audio/film.m4a`。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 字体、旁白、时间表、逐帧画面、混音、封装与风格帧的重建入口。 |
| `CREDITS` | 原作声音、字体和运行库署名与许可。 |
| `FACTS.md` | 虚构铁路、站名和故事设定。 |
| `mix.py` | 配乐、镜像钟琴、车速轮声、环境声、拟音与旁白混音。 |
| `tools/fonts.py` | 下载原字体并按影片字符制作Noto Serif SC子集。 |
| `tools/timeline.py` | 由旁白时长生成timeline.json、中英字幕和HIT动作表。 |
| `tools/subcheck.py` | 上游字幕背景亮度测量工具。 |
| `voices/lines.json` | Kokoro bm_george旁白原文与速度。 |
| `voices/dur.json` | 每行旁白时长。 |
| `voices/words.json` | 旁白词级时间戳。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/)的制作环境中，把本目录与`../film/`按原相对路径合并到`styles/paper-lantern/demo/`，字体放回`fonts/`，入口采用该提交的原始index.html。共享渲染、TTS、采样、拟音和混音工具在本库[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. `python styles/paper-lantern/demo/tools/fonts.py`。
2. `python core/tts/tts.py styles/paper-lantern/demo/voices/lines.json styles/paper-lantern/demo/voices`，随后`python core/tts/asr_check.py styles/paper-lantern/demo/voices/lines.json styles/paper-lantern/demo/voices --lang en`。
3. `python styles/paper-lantern/demo/tools/timeline.py styles/paper-lantern/paper-lantern.srt`。
4. `node core/render/video.mjs styles/paper-lantern/demo --fps 30 --workers 2 --out styles/paper-lantern/demo/out/video.mp4`。
5. `python styles/paper-lantern/demo/mix.py`。
6. `sh core/render/mux.sh styles/paper-lantern/demo/out/video.mp4 styles/paper-lantern/demo/out/mix.wav styles/paper-lantern/paper-lantern.mp4 30 0`。

`build.sh`串联上述步骤，并生成海报、风格帧；传入起止秒可渲染片段。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，用上游`tools/fetch.sh voice`放入`core/tts/`。
- 采样：[instruments-vsco2ce.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vsco2ce.tar)、[instruments-vcsl.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-vcsl.tar)、[instruments-salamander.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/instruments-salamander.tar)，由上游`tools/fetch.sh instruments <库名>`安装。
- Cormorant Garamond：`https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf`；Noto Serif SC：`https://github.com/google/fonts/raw/main/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf`。字重、子集字符和Unicode范围均由`tools/fonts.py`取得，OFL原文随字体保存。
- Three.js 0.170.0：`https://registry.npmjs.org/three/-/three-0.170.0.tgz`，运行模块位于`../vendor/three@0.170.0/`。
