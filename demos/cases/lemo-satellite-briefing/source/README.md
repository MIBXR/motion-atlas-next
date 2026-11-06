# 地图上还写着海 · 卫星简报 · 制作源文件

运行画面在 `../film/`，字体在 `../fonts/`，成片原混音在 `../audio/film.m4a`。本目录保留上游制作脚本与输入数据，相对目录结构保持原样。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按顺序取得素材、制作声音、渲染并合成成片。 |
| `CREDITS` | 作品、声音、字体和素材的上游署名与许可。 |
| `events.json` | 画面与声音共用的事件、音高和时间。 |
| `FACTS.md` | 画面数字、叙事事实和逐项来源。 |
| `mix.py` | 合成声音、剪辑旁白并混合成片音轨。 |
| `timeline.json` | 原作分段、节拍与时间节点。 |
| `tools/audiocheck.py` | 分析原作声音包络与节点。 |
| `tools/bmng.py` | 制作全球与中亚的Blue Marble底板。 |
| `tools/cuecheck.py` | 上游画音节点对照工具。 |
| `tools/export.mjs` | 从旁白时长导出字幕、时间与声音节点。 |
| `tools/fetch_gibs.py` | 取得NASA GIBS Blue Marble影像。 |
| `tools/fetch_landsat.py` | 按场景编号取得Landsat反射率并共注册。 |
| `tools/finalasr.py` | 转写成片旁白并对照字幕。 |
| `tools/fonts.py` | 取得卫星简报同家族、字重与字符子集。 |
| `tools/growth.py` | 生成北咸海回水顺序蒙版。 |
| `tools/impactcheck.py` | 分析撞击主拍前后的响度。 |
| `tools/lowcheck.py` | 分析原片低频能量。 |
| `tools/mapfield.py` | 生成印刷地图距离场、地形和河流。 |
| `tools/motioncheck.py` | 分析原作画面运动。 |
| `tools/plates.py` | 将Landsat数据转换成影像底板和水体蒙版。 |
| `tools/plates_spec.json` | 卫星场景选择、范围、分辨率与波段。 |
| `tools/subcheck.mjs` | 检查原作字幕的时长与画面范围。 |
| `tools/vectors.py` | 生成海岸轮廓、测量和标记数据。 |
| `tools/voicefix.py` | 处理原作指定的旁白音节。 |
| `voice/lines.json` | 语音文案、角色与语速。 |
| `voice/out/dur.json` | 逐句旁白时长。 |
| `voice/out/words.json` | 逐词语音时间戳。 |

## 重建顺序

在固定提交 `bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00` 的完整上游目录中，将本目录文件与 `../film/` 合为原 `demo/` 结构，入口使用固定上游的 `index.html`；字体放回 `fonts/`。`<demo>` 指该目录，`<core>` 指上游共享运行与制作代码。

```sh
python tools/fetch_gibs.py <demo>
python tools/fetch_landsat.py <demo> <plate>
python tools/plates.py <demo>
python tools/bmng.py <demo>
python tools/vectors.py <demo>
python tools/mapfield.py <demo>
python tools/growth.py <demo>
python tools/fonts.py <demo>
python <core>/tts/tts.py voice/lines.json voice/out
python tools/voicefix.py <demo>
node tools/export.mjs <demo>
node <core>/render/events.mjs <demo>
python mix.py
node <core>/render/video.mjs <demo> --fps 24 --workers 3 --out out/video.mp4
sh <core>/render/mux.sh out/video.mp4 out/mix.wav satellite-briefing.mp4 24 1
```

共享依赖见 [`demos/materials/lemo-opuscar/core/`](../../../materials/lemo-opuscar/core/) 的 `render/`、`audio/`、`tts/`；运行用的共享代码同时保存在 `../film/core/`。原作完整命令与声音工具调用顺序见 `build.sh`。

## 素材与大文件来源

- [固定上游源码](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/satellite-briefing)。
- [原片音轨来源](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/satellite-briefing.mp4)：从MP4以 `ffmpeg -i satellite-briefing.mp4 -vn -c:a copy film.m4a` 取得。
- [乐器采样](https://github.com/lemomo-ai/lemo-opuscar/releases/tag/assets)：FreePats、VSCO2 CE与VCSL按CREDITS取得；语音模型、原始声音与制作缓存保留在工作区。
- `tools/plates_spec.json`列出11张Landsat底板的固定时间范围、场景编号、分辨率和波段；执行上述fetch_landsat命令时依次使用 `r2025 r1977 r1989 r2000 r2009 r2014 la2025 mu2025 ko2001 ko2009 ko2025`。原始输入从 [NASA GIBS WMS](https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi)、[Planetary Computer STAC](https://planetarycomputer.microsoft.com/api/stac/v1/search)、[数据API](https://planetarycomputer.microsoft.com/api/data/v1/item/bbox) 与 [Natural Earth GeoJSON](https://github.com/nvkelso/natural-earth-vector/tree/master/geojson) 取得，具体请求由对应fetch脚本和plates_spec.json定义；运行底板与水体蒙版保存在 `../film/assets/`。
