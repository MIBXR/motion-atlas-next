# 伏特·规格扫描 · 科幻全息界面 · 制作文件

制作输入与工具来自lemo-opuscar `bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00` 的 `styles/hologram-hud/demo/`。

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 完整重建入口。 |
| `content_alt.json` | KITE替换内容。 |
| `CREDITS` | 原作资源署名。 |
| `events.json` | 画面事件导出。 |
| `frames.js` | 原作引擎形状演示。 |
| `lines.json` | 旁白文本与语音配置。 |
| `mix.py` | 原作音乐、旁白、环境与拟音混音。 |
| `models/gen_kite.mjs` | 生成KITE替换模型。 |
| `models/gen_volt.mjs` | 生成VOLT电助力车模型。 |
| `models/kite.json` | KITE替换模型。 |
| `models/mkmodel.mjs` | 线框模型几何构造。 |
| `music/check.py` | 上游乐谱核对工具。 |
| `music/CREDITS_music.txt` | 原作音乐署名。 |
| `music/score.json` | 配乐事件与音符。 |
| `music/score.py` | 原作配乐合成。 |
| `timeline.json` | 镜头与声音共用的时间表。 |
| `tools/cuecheck.py` | 上游画面与乐谱拍点核对工具。 |
| `tools/export.mjs` | 导出字幕、时间表与画面事件。 |
| `tools/final_asr.py` | 上游成片语音核对工具。 |
| `tools/make_lines.mjs` | 由内容表导出旁白。 |
| `voices/words.json` | 逐词语音时间。 |

在仓库外组装 `styles/hologram-hud/demo/`：把本目录文件放回相同相对路径，把 `../film/` 中的作品文件放到demo根，`../fonts/` 放到demo/fonts，恢复 `film/` 入口内已记录的本库相对路径。共用的 `core/` 与制作依赖在[lemo-opuscar素材](../../../materials/lemo-opuscar/core/README.md)。

重建顺序：`models/gen_volt.mjs` → `tools/make_lines.mjs` → `core/tts/tts.py` → `tools/export.mjs` → `music/score.py` → `mix.py` → `core/render/video.mjs`（24fps）→ `core/render/mux.sh`（grain 0）。

从组装的上游根目录运行 `sh styles/hologram-hud/demo/build.sh`。Python环境、Kokoro、采样及渲染依赖按共享 `core/` 的说明准备；three.js固定为0.170.0。
