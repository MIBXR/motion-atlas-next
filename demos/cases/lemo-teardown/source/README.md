# 二十一键 · 产品拆解 · 制作文件

制作输入与工具来自lemo-opuscar `bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00` 的 `styles/teardown/demo/`。

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 完整重建入口。 |
| `cad/corne-cherry.kicad_pcb` | Corne v4.1主板工程文件。 |
| `cad/left.step` | 左半键盘外壳STEP。 |
| `cad/LICENSE_CC` | foostan的CC BY 4.0许可原文。 |
| `cad/LICENSE_MIT` | foostan的MIT许可原文。 |
| `cad/plate-top-cherrymx.kicad_pcb` | 定位板工程文件。 |
| `CREDITS` | 原作资源署名。 |
| `events.json` | 画面事件导出。 |
| `FACTS.md` | 画面数字、产品规格及其一手来源。 |
| `mix.py` | 原作音乐、旁白、环境与拟音混音。 |
| `timeline.json` | 镜头与声音共用的时间表。 |
| `tools/export.mjs` | 导出字幕、时间表与画面事件。 |
| `tools/extract_pcb.py` | 提取KiCad板图。 |
| `tools/fetch_cad.sh` | 获取固定版本Corne工程文件。 |
| `tools/fetch_fonts.py` | 获取Google Fonts同字重与字符子集。 |
| `tools/kicad_geom.py` | 板图几何解析。 |
| `tools/motioncheck.py` | 上游帧序列观察工具。 |
| `tools/sexp.py` | KiCad S表达式读取。 |
| `tools/step2mesh.mjs` | 用occt-import-js 0.0.23把STEP三角化。 |
| `tools/subcheck.mjs` | 上游字幕排版核对工具。 |
| `voice/lines.json` | 旁白文本与语音配置。 |

在仓库外组装 `styles/teardown/demo/`：把本目录文件放回相同相对路径，把 `../film/` 中的作品文件放到demo根，`../fonts/` 放到demo/fonts，恢复 `film/` 入口内已记录的本库相对路径。共用的 `core/` 与制作依赖在[lemo-opuscar素材](../../../materials/lemo-opuscar/core/README.md)。

重建顺序：`tools/fetch_fonts.py` → `tools/fetch_cad.sh` → `core/tts/tts.py` → `tools/export.mjs` → `core/render/events.mjs` → `core/render/video.mjs`（24fps）→ `mix.py` → `core/render/mux.sh`（grain 1）。

从组装的上游根目录运行 `sh styles/teardown/demo/build.sh`。Python环境、Kokoro、采样及渲染依赖按共享 `core/` 的说明准备；three.js固定为0.170.0。

工程输入固定于foostan/crkbd `63366fb7f51cf2a796462fdd90527e99dd126055`，保存在 `cad/`。`case.bin`由 `OCCT_DIR=<安装目录> node tools/step2mesh.mjs cad/left.step data/case.bin` 生成，使用 `occt-import-js@0.0.23`。HDRI为[Poly Haven photo_studio_loft_hall](https://polyhaven.com/a/photo_studio_loft_hall)的2K版本，运行文件在 `../assets/`。
