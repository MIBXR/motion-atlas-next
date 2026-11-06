# 量出来的蓝 · 显微叙事 · 制作文件

运行画面在`../film/`，字体在`../fonts/`，原片音轨在`../audio/film.m4a`。本目录保存固定提交的制作文件。

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 整片重建入口。 |
| `config.json` | 玻片ROI、核膜估计中心与测量方向。 |
| `CREDITS` | 上游作者、素材、字体与声音署名。 |
| `events.json` | 原作画面与声音事件。 |
| `FACTS.md` | 原片事实、数据与测量方法。 |
| `mix.py` | 原作配乐、拟音、旁白混音。 |
| `OpenSlide-index.yaml` | OpenSlide玻片作者与CC0许可记录。 |
| `timeline.json` | 供制作工具读取的时间线。 |
| `tools/cuecheck.py` | 上游制作辅助工具：cuecheck。 |
| `tools/export.mjs` | 从时间线与旁白实长生成字幕和制作数据。 |
| `tools/finalasr.py` | 上游制作辅助工具：finalasr。 |
| `tools/fonts.py` | 按画面字符范围下载同字重字体。 |
| `tools/nucleus.py` | 拟合核膜外缘圆与直径。 |
| `tools/plates.py` | 从同一玻片生成金字塔切图、玻片照片、像素统计与ROI遮罩。 |
| `tools/subcheck.mjs` | 上游制作辅助工具：subcheck。 |
| `voice/lines.json` | 旁白文字与声线、语速。 |
| `voice/out/dur.json` | 原旁白逐句实长。 |
| `voice/out/words.json` | 原旁白词级时刻。 |

## 重建

1. 在库外新建原作demo目录，合入本目录；把`../film/`中的作品文件放回原作根目录，恢复入口、core、素材和字体的原相对URL。接入改动见[保真说明](../fidelity.md)。
2. 保持`assets/plates/`；原始玻片下载到制作目录`assets/raw/Ventana-1.bif`，文件地址见下表。
3. `python tools/plates.py <demo>` → `python tools/nucleus.py <demo> 13297 9265` → `python tools/fonts.py <demo>` → `node tools/export.mjs <demo>`。
4. 设置`LIB`为上游工具根目录，运行`sh build.sh`完成原作的画面、声音与封装。

共用工具在[lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)：`render/`负责逐帧与封装，`audio/`提供采样与合成，`tts/`提供旁白。three.js案例使用固定r170，运行子集位于本案例vendor/。

## 库外输入

| 输入 | 取得位置 |
| --- | --- |
| 227MB原始玻片 | https://openslide.cs.cmu.edu/download/openslide-testdata/Ventana/Ventana-1.bif |
