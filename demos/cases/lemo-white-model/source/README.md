# 被炸平的城市怎样长回来 · 白模投影 · 制作文件

运行画面在`../film/`，字体在`../fonts/`，原片音轨在`../audio/film.m4a`。本目录保存固定提交的制作文件。

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 整片重建入口。 |
| `CREDITS` | 上游作者、素材、字体与声音署名。 |
| `events.json` | 原作画面与声音事件。 |
| `FACTS.md` | 原片事实、数据与测量方法。 |
| `mix.py` | 原作配乐、拟音、旁白混音。 |
| `timeline.json` | 供制作工具读取的时间线。 |
| `tools/cuecheck.py` | 上游制作辅助工具：cuecheck。 |
| `tools/export.mjs` | 从时间线与旁白实长生成字幕和制作数据。 |
| `tools/finalasr.py` | 上游制作辅助工具：finalasr。 |
| `tools/fonts.py` | 按画面字符范围下载同字重字体。 |
| `tools/impactcheck.py` | 上游制作辅助工具：impactcheck。 |
| `tools/motioncheck.py` | 上游制作辅助工具：motioncheck。 |
| `tools/prep.py` | 原图裁切、调色、蒙版、分层或影像片段生成。 |
| `tools/rd.py` | 荷兰RD坐标转换。 |
| `tools/subcheck.mjs` | 上游制作辅助工具：subcheck。 |
| `tools/sun.py` | 太阳位置计算。 |
| `voice/lines.json` | 旁白文字与声线、语速。 |
| `voice/out/dur.json` | 原旁白逐句实长。 |
| `voice/out/words.json` | 原旁白词级时刻。 |

## 重建

1. 在库外新建原作demo目录，合入本目录；把`../film/`中的作品文件放回原作根目录，恢复入口、core、素材和字体的原相对URL。接入改动见[保真说明](../fidelity.md)。
2. 将`assets/data/`放回制作目录的`data/`；原始3DBAG与BGT下载地址和边界在`build.sh`，下载原件留在库外。
3. `python tools/prep.py <demo>` → `python tools/fonts.py <demo>` → `node tools/export.mjs <demo>`。
4. 设置`LIB`为上游工具根目录，运行`sh build.sh`完成原作的画面、声音与封装。

共用工具在[lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)：`render/`负责逐帧与封装，`audio/`提供采样与合成，`tts/`提供旁白。three.js案例使用固定r170，运行子集位于本案例vendor/。

## 库外输入

| 输入 | 取得位置 |
| --- | --- |
| 3DBAG与BGT原始数据 | 见build.sh的WFS和PDOK URL；边界91500,435200,94300,438000。 |
