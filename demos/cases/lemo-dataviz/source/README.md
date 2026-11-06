# 一百个夏天 · 数据叙事 · 制作文件

制作输入与工具来自lemo-opuscar `bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00` 的 `styles/dataviz/demo/`。

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 完整重建入口。 |
| `CREDITS` | 原作资源署名。 |
| `data/GLB.Ts+dSST.csv` | NASA GISTEMP原始数据。 |
| `events.json` | 画面事件导出。 |
| `mix.py` | 原作音乐、旁白、环境与拟音混音。 |
| `music/score.json` | 配乐事件与音符。 |
| `music/score.py` | 原作配乐合成。 |
| `tools/cuecheck.py` | 上游画面与乐谱拍点核对工具。 |
| `tools/extract_data.py` | 从GISTEMP JJA列提取数据。 |
| `tools/final_asr.py` | 上游成片语音核对工具。 |
| `tools/subs.py` | 生成原作字幕表。 |
| `tools/words.py` | 整理旁白词级时间。 |
| `voices/words.json` | 逐词语音时间。 |

在仓库外组装 `styles/dataviz/demo/`：把本目录文件放回相同相对路径，把 `../film/` 中的作品文件放到demo根，`../fonts/` 放到demo/fonts，恢复 `film/` 入口内已记录的本库相对路径。共用的 `core/` 与制作依赖在[lemo-opuscar素材](../../../materials/lemo-opuscar/core/README.md)。

重建顺序：`tools/extract_data.py` → `core/tts/tts.py` → `tools/words.py` → `core/render/events.mjs` → `music/score.py` → `mix.py` → `tools/subs.py` → `core/render/video.mjs`（24fps）→ `core/render/mux.sh`（grain 0）。

从组装的上游根目录运行 `sh styles/dataviz/demo/build.sh`。Python环境、Kokoro、采样及渲染依赖按共享 `core/` 的说明准备；three.js固定为0.170.0。
