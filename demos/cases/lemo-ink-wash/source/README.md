# 剑客渡江 · 中国水墨 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，公开成片混音在 `../audio/film.m4a`。本目录保存上游制作文件原字节。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 旁白、配乐、事件、混音、24fps逐帧视频与合成入口。 |
| `CREDITS` | 上游原始素材、许可与署名。 |
| `cues.json` | 字幕提示点。 |
| `cues.mjs` | 由VO导出字幕提示点。 |
| `events.json` | 画面导出的拟音与静默事件。 |
| `frames.js` | 由真实引擎绘制的风格帧入口。 |
| `lines.json` | Kokoro旁白原文和声音参数。 |
| `mix.py` | 纸墨、剑、水与环境拟音，旁白和配乐混音。 |
| `music/score.json` | 配乐段落、音符与提示点。 |
| `music/score.py` | 按story.js时间点编写古琴、箫与打击乐配乐。 |
| `sheet.js` | 人物和笔触模型页。 |
| `test.js` | 上游模型、姿势、书法与风格帧页面调度。 |
| `voices/words.json` | 旁白单词时间戳。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的制作环境中，将本目录与 `../film/` 的文件按原相对路径合并至 `styles/ink-wash/demo/`，字体放回该目录的 `fonts/`；运行页面使用固定提交的原始 `index.html`。共享渲染、TTS、采样器、拟音与混音工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. `python core/tts/tts.py styles/ink-wash/demo/lines.json styles/ink-wash/demo/voices`，随后按 `build.sh` 使用共享语音识别工具。
2. `python styles/ink-wash/demo/music/score.py`。
3. `node core/render/events.mjs styles/ink-wash/demo` → `python styles/ink-wash/demo/mix.py`。
4. `node core/render/video.mjs styles/ink-wash/demo --fps 24 --workers 3 --out styles/ink-wash/demo/out/video24.mp4`。
5. `sh core/render/mux.sh styles/ink-wash/demo/out/video24.mp4 styles/ink-wash/demo/mix.wav styles/ink-wash/ink-wash.mp4 24 0`。
6. 按 `build.sh` 生成字幕、海报与风格帧；在制作库根目录运行该脚本可串联上述流程。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，由上游 `tools/fetch.sh voice` 放入 `core/tts/`。
- 采样库由上游 `tools/fetch.sh instruments` 安装至 `core/audio/instruments/`；固定提交的 `tools/assets.json` 列出 `instruments-freepats`、`instruments-karoryfer`、`instruments-vsco2ce`、`instruments-vcsl` 等Release包，`music/score.py` 通过共享采样器读取。
- 字体从 [Google Fonts原始文件](https://github.com/google/fonts/tree/main/ofl) 取得，文件名与字重由 `../fonts/fonts.css` 确定，OFL原文随字体保存。
- Cormorant字体见 `ofl/cormorantgaramond/` 和 `ofl/cormorantsc/`；Ma Shan Zheng和Zhi Mang Xing见 `ofl/mashanzheng/`、`ofl/zhimangxing/`。运行版 `film/core/lib.js` 是固定提交的共享工具原文，由入口import map映射 `/core/lib.js`。
