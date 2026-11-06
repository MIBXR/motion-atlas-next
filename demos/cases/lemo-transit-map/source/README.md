# 6 公里 · 地铁线路图 · 制作文件

制作输入与工具来自lemo-opuscar `bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00` 的 `styles/transit-map/demo/`。

| 文件 | 用途 |
| --- | --- |
| `audio.py` | 地铁片配乐与拟音。 |
| `build.sh` | 完整重建入口。 |
| `CREDITS` | 原作资源署名。 |
| `events.json` | 画面事件导出。 |
| `FACTS.md` | 画面数字、产品规格及其一手来源。 |
| `tools/chars.txt` | 原作中文字符集合。 |
| `tools/sheet.sh` | 上游联系表工具。 |
| `tools/subset.py` | 按原作字符集合裁切Noto Sans SC。 |

在仓库外组装 `styles/transit-map/demo/`：把本目录文件放回相同相对路径，把 `../film/` 中的作品文件放到demo根，`../fonts/` 放到demo/fonts，恢复 `film/` 入口内已记录的本库相对路径。共用的 `core/` 与制作依赖在[lemo-opuscar素材](../../../materials/lemo-opuscar/core/README.md)。

重建顺序：下载Inter与Noto Sans SC → `tools/subset.py` → `core/render/events.mjs` → `audio.py` → `core/render/video.mjs`（30fps）→ `core/render/mux.sh`（grain 1）。

从组装的上游根目录运行 `sh styles/transit-map/demo/build.sh`。Python环境、Kokoro、采样及渲染依赖按共享 `core/` 的说明准备；three.js固定为0.170.0。

Noto Sans SC原始可变字体由[Google Fonts](https://github.com/google/fonts/raw/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf)取得，放在tools/NotoSansSC-VF.ttf；`tools/subset.py`按原作JS生成239字符子集。Inter来自[Google Fonts](https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf)。
