# 本周 AI 四件事 · 电视新闻包装 · 制作文件

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 下载素材、准备字体与画面、制作旁白、渲染、混音和合成的上游入口。 |
| `CREDITS` | 原作素材、声音、字体的作者与许可。 |
| `data/kospi_daily.csv` | 原始KOSPI日收盘表。 |
| `data/kospi_raw_naver_api.json` | Naver行情接口的原始响应。 |
| `data/kospi_raw_naver_mobile.json` | Naver移动端行情接口的原始响应。 |
| `events.json` | 画面导出的声音节点。 |
| `FACTS.md` | 画面和旁白中的事实及原始文献。 |
| `mix.py` | 原作采样配乐、拟音、旁白与原声混音。 |
| `SOURCES.md` | 素材原地址、许可与使用片段。 |
| `tools/fonts.sh` | 按main.js字符取得原作Google Fonts字重与子集。 |
| `tools/footage.py` | 搜索、下载素材并记录来源、作者、许可与使用秒段。 |
| `tools/gen_image.py` | 上游示意底图生图客户端。 |
| `tools/gen_plates.sh` | 上游两张示意底图的生成提示词与入口。 |
| `tools/prep.py` | 把原始素材按原作配方处理为运行影像、文档和数据。 |
| `tools/subs.py` | 导出新闻包装的外置字幕。 |
| `tools/tts_doubao.py` | 豆包TTS 2.0旁白客户端，读取用户环境中的API密钥。 |
| `vo/dur.json` | 旁白每句实长。 |
| `vo/lines.json` | 旁白台词及语音参数。 |
| `vo/words.json` | 旁白词级时间。 |
| `vendor/LICENSE-world-atlas` | world-atlas 2.0.2的ISC许可原文。 |

## 重建

在工作目录把`film/`内容放回Demo根目录，把`source/`按原相对结构合并；字体放`fonts/`，本体`assets/`放`assets/`。页面素材路径按上游目录改回。

1. 设置`LIB`为`demos/materials/lemo-opuscar/`的绝对路径；共享音频、TTS、渲染代码位于其`core/`。依赖与采样包取得方式见该快照的`TECHNIQUE.md`与`core/README.md`。
2. `sh tools/fonts.sh` → 按`build.sh`取得world-atlas 2.0.2 → `python tools/prep.py`。
3. 按`build.sh`使用`core/tts/tts.py`与原台词制作旁白，再运行原作混音脚本。本片原旁白使用`tools/tts_doubao.py`与用户自己的豆包服务凭证。
4. 用快照`core/render/video.mjs`按30fps逐帧渲染，运行`core/render/srt.py`生成字幕，再按原`build.sh`调用`core/render/mux.sh`合成。

## 原始输入

运行画面使用的影像片段、照片、文档裁片和字体在本体`assets/`与`fonts/`。原始大文件按`SOURCES.md`的固定地址取得；使用秒段和作者见同一记录。两张原始示意底图在`assets/plates/`，提示词在`tools/gen_plates.sh`。
