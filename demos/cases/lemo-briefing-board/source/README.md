# 船说了算 · 工程简报板 · 制作源文件

运行画面在 `../film/`，字体在 `../fonts/`，成片原混音在 `../audio/film.m4a`。本目录保留上游制作脚本与输入数据，相对目录结构保持原样。

## 文件

| 文件 | 用途 |
| --- | --- |
| `audio/cues.json` | 画面事件、声音和字幕的时间节点。 |
| `audio/lines.json` | 语音文案、角色与语速。 |
| `audio/mix.py` | 合成声音、剪辑旁白并混合成片音轨。 |
| `audio/vo/dur.json` | 逐句旁白时长。 |
| `audio/vo/words.json` | 逐词语音时间戳。 |
| `build.sh` | 按顺序取得素材、制作声音、渲染并合成成片。 |
| `CREDITS` | 作品、声音、字体和素材的上游署名与许可。 |
| `events.json` | 画面与声音共用的事件、音高和时间。 |
| `FACTS.md` | 画面数字、叙事事实和逐项来源。 |
| `kit/batch.mjs` | 上游简报板批量出图入口。 |
| `kit/objects/cable_half.json` | 物件的原作尺寸、锚点、裁切与来源参数。 |
| `kit/objects/susp_raw.json` | 物件的原作尺寸、锚点、裁切与来源参数。 |
| `kit/README.md` | 上游简报板制作接口说明。 |
| `kit/tools/clean_lettering.py` | 以中值滤波移除船名与标识。 |
| `kit/tools/fetch_fonts.py` | 取得简报板字体与场景字符子集。 |
| `kit/tools/fetch_sources.py` | 按已采用的Commons照片清单下载原图。 |
| `kit/tools/kit_env.sh` | 准备BiRefNet模型与制作环境。 |
| `kit/tools/make_print.py` | 把原照片做成带纸边的照片物件。 |
| `kit/tools/mirror_span.py` | 由单塔斜拉桥生成双塔主跨。 |
| `kit/tools/prep_object.py` | 抠图、清理边缘、调色并生成物件锚点。 |
| `kit/tools/rebuild_objects.sh` | 按原参数重建船、桥梁与相片物件。 |
| `kit/tools/redraw_stays.py` | 按照片测量重绘斜拉索。 |
| `kit/tools/redraw_suspension.py` | 重绘悬索与吊杆。 |
| `kit/tools/repair_hangers.py` | 连接被背景遮住的拱桥吊杆。 |
| `kit/tools/ship_anchors.py` | 按船体方向设置船首船尾锚点。 |
| `kit/tools/sky_key.py` | 提取天空背景和细缆索。 |
| `kit/tools/stretch_span.py` | 按指定倍率伸展桥塔之间的主跨。 |
| `scenes/_gen_film.py` | 由物件锚点、跨距与镜头生成完整简报板时间线。 |
| `sources/candidates/candidates.json` | 上游考察照片的作者、许可与原始下载地址。 |
| `tools/camcheck.mjs` | 检查镜头可见范围和判决构图。 |
| `tools/camplot.py` | 绘制原作镜头运动。 |
| `tools/cuecheck.py` | 上游画音节点对照工具。 |
| `tools/final_asr.py` | 转写成片旁白并对照字幕。 |
| `tools/rescheck.mjs` | 测量照片的源像素与屏幕像素比例。 |
| `tools/rhythm_report.py` | 分析原作时间段、旁白与节奏。 |
| `tools/subcheck.mjs` | 检查原作字幕的时长与画面范围。 |

## 重建顺序

在固定提交 `bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00` 的完整上游目录中，将本目录文件与 `../film/` 合为原 `demo/` 结构，入口使用固定上游的 `index.html`；字体放回 `kit/fonts/`。`<demo>` 指该目录，`<core>` 指上游共享运行与制作代码。

```sh
python kit/tools/fetch_fonts.py
sh kit/tools/rebuild_objects.sh
python <core>/tts/tts.py audio/lines.json audio/vo
python scenes/_gen_film.py
node <core>/render/events.mjs <demo>
python audio/mix.py
node <core>/render/video.mjs <demo> --fps 24 --workers 3 --out out/video.mp4
sh <core>/render/mux.sh out/video.mp4 out/mix.wav briefing-board.mp4 24 1
```

共享依赖见 [`demos/materials/lemo-opuscar/core/`](../../../materials/lemo-opuscar/core/) 的 `render/`、`audio/`、`tts/`。原作完整命令与声音工具调用顺序见 `build.sh`。

## 素材与大文件来源

- [固定上游源码](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/briefing-board)。
- [原片音轨来源](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/briefing-board.mp4)：从MP4以 `ffmpeg -i briefing-board.mp4 -vn -c:a copy film.m4a` 取得。
- [乐器采样](https://github.com/lemomo-ai/lemo-opuscar/releases/tag/assets)：FreePats、VSCO2 CE与VCSL按CREDITS取得；语音模型、原始声音与制作缓存保留在工作区。
- 六张原始照片的Commons页面、原始文件地址、作者与许可见 `sources/candidates/candidates.json` 的 `used: true`；原分辨率照片约470MB。BiRefNet-general ONNX模型约970MB，由 `kit/tools/kit_env.sh` 的固定Release地址取得；抠图、去字、吊索重绘、主跨伸展和锚点参数在 `kit/tools/rebuild_objects.sh`。
