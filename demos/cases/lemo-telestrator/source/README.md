# 定格 · 体育战术板 · 制作文件

## 文件

| 文件 | 用途 |
| --- | --- |
| `audio/cues.json` | 字幕或声音提示的起止时刻。 |
| `audio/lines.json` | 旁白台词及语音参数。 |
| `audio/vo/dur.json` | 旁白每句实长。 |
| `audio/vo/words.json` | 旁白词级时间。 |
| `build.sh` | 下载素材、准备字体与画面、制作旁白、渲染、混音和合成的上游入口。 |
| `CREDITS` | 原作素材、声音、字体的作者与许可。 |
| `FACTS.md` | 画面和旁白中的事实及原始文献。 |
| `SOURCES.jsonl` | 逐项素材证据与源时刻。 |
| `SOURCES.md` | 素材原地址、许可与使用片段。 |
| `tools/cues.py` | 从影片时间表导出字幕。 |
| `tools/fetch_sources.sh` | 下载SOURCES记录的原始素材。 |
| `tools/final_check.sh` | 上游成片的响度、黑帧与语音检查入口。 |
| `tools/fonts.py` | 取得原作字体并按影片字符生成子集。 |
| `tools/footage.py` | 搜索、下载素材并记录来源、作者、许可与使用秒段。 |
| `tools/homography.py` | 由球场标线测点拟合单应矩阵并导出射门位置。 |
| `tools/license-evidence.json` | 官方比赛摘要的频道、CC BY声明与来源证据。 |
| `tools/mix.py` | 原作采样配乐、拟音、旁白与原声混音。 |
| `tools/pitch.json` | 球场标线测点与射门点。 |
| `tools/prep.sh` | 按原作滤镜、时刻和帧号准备运行影像与文档。 |

## 重建

在工作目录把`film/`内容放回Demo根目录，把`source/`按原相对结构合并；字体放`fonts/`，本体`assets/`放`assets/`。页面素材路径按上游目录改回。

1. 设置`LIB`为`demos/materials/lemo-opuscar/`的绝对路径；共享音频、TTS、渲染代码位于其`core/`。依赖与采样包取得方式见该快照的`TECHNIQUE.md`与`core/README.md`。
2. `sh tools/fetch_sources.sh` → `sh tools/prep.sh` → `python tools/homography.py` → `python tools/fonts.py`。
3. 按`build.sh`使用`core/tts/tts.py`与原台词制作旁白，再运行原作混音脚本。
4. 用快照`core/render/video.mjs`按30fps逐帧渲染，运行`core/render/srt.py`生成字幕，再按原`build.sh`调用`core/render/mux.sh`合成。

## 原始输入

运行画面使用的影像片段、照片、文档裁片和字体在本体`assets/`与`fonts/`。原始大文件按`SOURCES.md` / `SOURCES.jsonl`的固定地址取得；使用秒段和作者见同一记录。
