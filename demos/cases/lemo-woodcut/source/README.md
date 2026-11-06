# 铸钟人 · 木刻版画 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，公开成片混音在 `../audio/film.m4a`。本目录保存上游制作文件原字节。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 旁白、配乐、事件、混音、字幕、24fps画面与合成入口。 |
| `CREDITS` | 上游原始素材、许可与署名。 |
| `events.json` | 画面导出的声音事件。 |
| `lines.json` | 四句旁白原文及am_onyx参数。 |
| `mix.py` | 木、纸、铜、陶、炉火与钟的合成拟音及混音。 |
| `music/CREDITS.txt` | 配乐采样库许可与署名。 |
| `music/score.json` | 配乐速度、乐句和提示点。 |
| `music/score.py` | 读取timeline.json的低弦与打击乐配乐。 |
| `sheet.js` | 人物模型和场景概览页。 |
| `test.js` | 上游人物、手部、村庄、滤镜与刻光样例调度。 |
| `tools/cuecheck.py` | 上游配乐、画面与静默提示点对齐工具。 |
| `tools/final_asr.py` | 成片旁白语音识别工具。 |
| `tools/mux.sh` | 共享mux之后以CRF28与tune grain合成最终画面。 |
| `tools/subs.py` | 由旁白时长生成字幕。 |
| `voices/words.json` | 旁白单词时间戳。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的制作环境中，将本目录与 `../film/` 的文件按原相对路径合并至 `styles/woodcut/demo/`，字体放回该目录的 `fonts/`；运行页面使用固定提交的原始 `index.html`。共享渲染、TTS、采样器、拟音与混音工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. `python core/tts/tts.py styles/woodcut/demo/lines.json styles/woodcut/demo/voices`，随后按 `build.sh` 使用共享语音识别工具。
2. `python styles/woodcut/demo/music/score.py`。
3. `node core/render/events.mjs styles/woodcut/demo` → `python styles/woodcut/demo/mix.py`。
4. `node core/render/video.mjs styles/woodcut/demo --fps 24 --workers 4 --out styles/woodcut/demo/out/video24.mp4`。
5. `sh styles/woodcut/demo/tools/mux.sh styles/woodcut/demo/out/video24.mp4 styles/woodcut/demo/mix.wav styles/woodcut/woodcut.mp4 24 6`。
6. 按 `build.sh` 生成字幕、海报与风格帧；在制作库根目录运行该脚本可串联上述流程。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，由上游 `tools/fetch.sh voice` 放入 `core/tts/`。
- 采样库由上游 `tools/fetch.sh instruments` 安装至 `core/audio/instruments/`；固定提交的 `tools/assets.json` 列出 `instruments-freepats`、`instruments-karoryfer`、`instruments-vsco2ce`、`instruments-vcsl` 等Release包，`music/score.py` 通过共享采样器读取。
- 字体从 [Google Fonts原始文件](https://github.com/google/fonts/tree/main/ofl) 取得，文件名与字重由 `../fonts/fonts.css` 确定，OFL原文随字体保存。
- IM Fell English原文件为 `imfellenglish/IMFeENrm28P.ttf`、`IMFeENit28P.ttf` 与 `imfellenglishsc/IMFeENsc28P.ttf`；字体在本案例按原页面所用文件名保存。核桃木纹来自 [Poly Haven](https://polyhaven.com/a/american_walnut_veneer)，运行版在 `../assets/`；重建时放回 `core/assets/polyhaven/walnut_diff.jpg`。运行使用的 `voices/dur.json`、`timeline.json` 在 `../film/`，共享 `lib.js` 在 `../film/core/`。
