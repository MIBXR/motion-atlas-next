# 天鹅绒密码 · 60s 间谍片头 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，公开成片混音在 `../audio/film.m4a`。本目录保存上游制作文件原字节。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 旁白、配乐、事件、混音、字幕、24fps画面与合成入口。 |
| `CREDITS` | 上游原始素材、许可与署名。 |
| `events.json` | 剪纸、脚步、铜管、列车和锁等声音事件。 |
| `mix.py` | 纸与金属拟音、磁带旁白、配乐闪避和静默混音。 |
| `music/CREDITS_music.txt` | MuldjordKit等配乐采样库的署名与许可。 |
| `music/score.json` | 乐器、乐句与编辑提示点。 |
| `music/score.py` | 132BPM间谍大乐队原创配乐。 |
| `tools/mux.sh` | 双遍响度归一与可设CRF的颗粒视频合成。 |
| `tools/subs.py` | 导出字幕提示点。 |
| `voices/words.json` | 旁白单词时间戳。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的制作环境中，将本目录与 `../film/` 的文件按原相对路径合并至 `styles/spy-titles/demo/`，字体放回该目录的 `fonts/`；运行页面使用固定提交的原始 `index.html`。共享渲染、TTS、采样器、拟音与混音工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. `python core/tts/tts.py styles/spy-titles/demo/lines.json styles/spy-titles/demo/voices`，随后按 `build.sh` 使用共享语音识别工具。
2. `python styles/spy-titles/demo/music/score.py`。
3. `node core/render/events.mjs styles/spy-titles/demo` → `python styles/spy-titles/demo/mix.py`。
4. `node core/render/video.mjs styles/spy-titles/demo --fps 24 --workers 3 --out styles/spy-titles/demo/out/video24.mp4`。
5. `CRF=24 sh styles/spy-titles/demo/tools/mux.sh styles/spy-titles/demo/out/video24.mp4 styles/spy-titles/demo/mix.wav styles/spy-titles/spy-titles.mp4 24 6`。
6. 按 `build.sh` 生成字幕、海报与风格帧；在制作库根目录运行该脚本可串联上述流程。

## 外部输入

- Kokoro模型与声音包：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，由上游 `tools/fetch.sh voice` 放入 `core/tts/`。
- 采样库由上游 `tools/fetch.sh instruments` 安装至 `core/audio/instruments/`；固定提交的 `tools/assets.json` 列出 `instruments-freepats`、`instruments-karoryfer`、`instruments-vsco2ce`、`instruments-vcsl` 等Release包，`music/score.py` 通过共享采样器读取。
- 字体从 [Google Fonts原始文件](https://github.com/google/fonts/tree/main/ofl) 取得，文件名与字重由 `../fonts/fonts.css` 确定，OFL原文随字体保存。
- League Gothic与League Spartan原文件为 `leaguegothic/LeagueGothic[wdth].ttf` 和 `leaguespartan/LeagueSpartan[wght].ttf`，按原页面使用的名字保存。opentype.js 1.3.4原版与MIT许可在 `../vendor/`；重建时放回 `demo/vendor/`。运行使用的 `lines.json`、`voices/dur.json` 在 `../film/`，共享 `lib.js` 在 `../film/core/`。
