# 蜜蜂账本 · 字幕新闻 · 制作文件

运行画面在`../film/`，字体在`../fonts/`，原片音轨在`../audio/film.m4a`。本目录保存固定提交的制作文件。

| 文件 | 用途 |
| --- | --- |
| `audio/cues.json` | 上游制作数据：cues。 |
| `audio/lines.json` | 旁白文字与声线、语速。 |
| `audio/mix.py` | 原作配乐、自然声、唱片和旁白混音。 |
| `audio/vo/dur.json` | 原旁白逐句实长。 |
| `audio/vo/words.json` | 原旁白词级时刻。 |
| `build.sh` | 整片重建入口。 |
| `CREDITS` | 上游作者、素材、字体与声音署名。 |
| `events.json` | 原作画面与声音事件。 |
| `FACTS.md` | 原片事实、数据与测量方法。 |
| `SOURCES.jsonl` | 素材逐项原始记录。 |
| `SOURCES.md` | 第三方素材、许可、原地址和使用片段。 |
| `tools/commons-tools/cinfo.py` | 上游制作辅助工具：cinfo。 |
| `tools/commons-tools/pdfpage.py` | 上游制作辅助工具：pdfpage。 |
| `tools/commons-tools/peek.py` | 上游制作辅助工具：peek。 |
| `tools/commons-tools/seg.py` | 上游制作辅助工具：seg。 |
| `tools/commons_thumb.py` | 上游制作辅助工具：commons_thumb。 |
| `tools/cues.py` | 生成字幕时刻。 |
| `tools/fetch_sources.sh` | 下载原片素材与蜜蜂声音。 |
| `tools/final_check.sh` | 上游制作辅助工具：final_check。 |
| `tools/fonts.sh` | 按画面文字下载字体子集。 |
| `tools/footage.py` | 上游制作辅助工具：footage。 |
| `tools/map_prep.py` | Natural Earth州界的Albers投影。 |
| `tools/prep.sh` | 按原起点、裁切与滤镜生成新闻画面帧。 |
| `licenses/CC-BY-2.0.html` | CC BY 2.0许可原文。 |
| `licenses/CC-BY-3.0.html` | CC BY 3.0许可原文。 |

## 重建

1. 在库外新建原作demo目录，合入本目录；把`../film/`中的作品文件放回原作根目录，恢复入口、core、素材和字体的原相对URL。接入改动见[保真说明](../fidelity.md)。
2. 保持`assets/fr/`、`assets/img/`和`assets/states.json`；将`source/audio/`放回制作目录`audio/`，原始下载放入`raw/`。
3. `sh tools/fetch_sources.sh` → `sh tools/fonts.sh` → `sh tools/prep.sh` → `python tools/cues.py`。
4. 设置`LIB`为上游工具根目录，运行`sh build.sh`完成原作的画面、声音与封装。

共用工具在[lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)：`render/`负责逐帧与封装，`audio/`提供采样与合成，`tts/`提供旁白。three.js案例使用固定r170，运行子集位于本案例vendor/。

## 库外输入

| 输入 | 取得位置 |
| --- | --- |
| 完整视频与USDA报告 | SOURCES.jsonl逐项url；assets/只保留实际画面帧、照片与声音片段。 |
