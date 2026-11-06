# 夜班入职指引 · 后室 / 新怪谈 · 制作源文件

运行画面在 `../film/`，字体在 `../fonts/`，成片原混音在 `../audio/film.m4a`。本目录保留上游制作脚本与输入数据，相对目录结构保持原样。

## 文件

| 文件 | 用途 |
| --- | --- |
| `build.sh` | 按顺序取得素材、制作声音、渲染并合成成片。 |
| `CREDITS` | 作品、声音、字体和素材的上游署名与许可。 |
| `events.json` | 画面与声音共用的事件、音高和时间。 |
| `lines.json` | 语音文案、角色与语速。 |
| `mix.py` | 合成声音、剪辑旁白并混合成片音轨。 |
| `music/muzak.py` | 合成场景内等候音乐。 |
| `sheet.js` | 上游身影造型图入口。 |
| `tools/mux.sh` | 混入音轨并按原作参数编码成片。 |
| `voices_fx/words.json` | 逐词语音时间戳。 |

## 重建顺序

在固定提交 `bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00` 的完整上游目录中，将本目录文件与 `../film/` 合为原 `demo/` 结构，入口使用固定上游的 `index.html`；字体放回 `fonts/`。`<demo>` 指该目录，`<core>` 指上游共享运行与制作代码。

```sh
python <core>/tts/tts.py lines.json voices
python music/muzak.py
node <core>/render/events.mjs <demo>
python mix.py
node <core>/render/video.mjs <demo> --fps 24 --workers 3 --out out/video.mp4
CRF=24 sh tools/mux.sh out/video.mp4 mix.wav backrooms.mp4 24 0
```

共享依赖见 [`demos/materials/lemo-opuscar/core/`](../../../materials/lemo-opuscar/core/) 的 `render/`、`audio/`、`tts/`；运行用的共享代码同时保存在 `../film/core/`。原作完整命令与声音工具调用顺序见 `build.sh`。

## 素材与大文件来源

- [固定上游源码](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/backrooms)。
- [原片音轨来源](https://github.com/lemomo-ai/lemo-opuscar/releases/download/films/backrooms.mp4)：从MP4以 `ffmpeg -i backrooms.mp4 -vn -c:a copy film.m4a` 取得。
- [乐器采样](https://github.com/lemomo-ai/lemo-opuscar/releases/tag/assets)：FreePats、VSCO2 CE与VCSL按CREDITS取得；语音模型、原始声音与制作缓存保留在工作区。
