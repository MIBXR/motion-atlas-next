# 小精灵冒险记 · 纸片立体书 · 制作源文件

运行引擎在 `../film/`，字体在 `../fonts/`，公开成片混音在 `../audio/film.m4a`。本目录保存上游制作文件原字节。

## 文件

| 文件 | 用途 |
| --- | --- |
| `asr.py` | 逐条识别旁白。 |
| `CREDITS` | 上游原始素材、许可与署名。 |
| `events.json` | 纸机关、角色打字音和场景拟音事件。 |
| `fetch_fonts.mjs` | 下载同家族字重和画面CJK字符子集。 |
| `fonts.css` | 上游字体声明原文，供原目录重建。 |
| `gltest.mjs` | 上游GPU与HDRI场景性能比较工具。 |
| `make_srt.mjs` | 由旁白与气泡时间生成双语字幕。 |
| `mix.py` | 纸机关、角色音、环境、旁白与三曲剪辑混音。 |
| `music/edit.py` | 三曲剪辑与一次拍对齐跳接的制作参数。 |
| `music/jump.py` | Jaunty Gumption的节拍与音色跳接候选。 |
| `music/jump2.py` | Jaunty Gumption的替代跳接分析。 |
| `music/survey.py` | 配乐候选速度和响度分析。 |
| `mux.sh` | 拼接60fps分段画面、颗粒2与CRF17合成。 |
| `package-lock.json` | Three.js 0.170.0及playwright-core 1.63.0的依赖锁。 |
| `package.json` | 上游制作环境声明。 |
| `probe.mjs` | 在已加载场景中读取DBG对象。 |
| `render.mjs` | 等待READY、调用render(t)，导出静帧、事件或60fps分段视频。 |
| `serve.mjs` | 上游制作渲染的静态服务。 |
| `sheet.html` | 人物与道具模型页。 |
| `shot.mjs` | 上游任意页面截图工具。 |
| `test.html` | 上游HDRI与光照场景页。 |
| `tile.py` | 静帧接触表排版。 |
| `tts/gen.py` | Kokoro af_bella全量旁白生成。 |
| `tts/gen1.py` | 选定旁白重新生成。 |
| `tts/lines.json` | 十五句旁白发音输入。 |
| `words.py` | 旁白单词时间戳生成。 |

## 重建顺序

在[固定提交](https://github.com/lemomo-ai/lemo-opuscar/tree/f17136060781a0068a7951245a3aa7835a7230de/)的制作环境中，将本目录与 `../film/` 的文件按原相对路径合并至 `styles/paper-popup/demo/`，字体放回该目录的 `fonts/`；运行页面使用固定提交的原始 `index.html`。共享渲染、TTS、采样器、拟音与混音工具在本库 [demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)。

1. 在 `styles/paper-popup/demo/` 执行 `node fetch_fonts.mjs`；在固定提交环境安装 `package-lock.json` 的依赖。
2. 下载下列三曲MP3至 `music/`，分别用 `ffmpeg -i <曲名>.mp3 -ar 48000 -ac 2 <曲名>.wav` 转换。
3. `python styles/paper-popup/demo/tts/gen.py af_bella` → `asr.py` → `words.py`；运行使用的旁白时长在 `../film/voices/dur.json`。
4. `python styles/paper-popup/demo/music/edit.py` → `node styles/paper-popup/demo/render.mjs events` → `python styles/paper-popup/demo/mix.py`。
5. `node styles/paper-popup/demo/render.mjs video 8` → `zsh styles/paper-popup/demo/mux.sh` → `node styles/paper-popup/demo/make_srt.mjs`。

## 外部输入

- Kevin MacLeod的 [Dreamy Flashback](https://incompetech.com/music/royalty-free/mp3-royaltyfree/Dreamy%20Flashback.mp3)、[Jaunty Gumption](https://incompetech.com/music/royalty-free/mp3-royaltyfree/Jaunty%20Gumption.mp3)、[Heartwarming](https://incompetech.com/music/royalty-free/mp3-royaltyfree/Heartwarming.mp3)，CC BY 4.0；保存为 `music/Dreamy_Flashback.mp3`、`Jaunty_Gumption.mp3`、`Heartwarming.mp3`，`music/edit.py` 读取同名WAV。
- Kokoro模型：[voice.tar](https://github.com/lemomo-ai/lemo-opuscar/releases/download/assets/voice.tar)，放入制作库 `core/tts/`，`tts/gen.py` 读取。
- 字体由 `fetch_fonts.mjs` 从 `fonts.googleapis.com/css2` 下载，中文字集取 `story.js`、`hud.js`、`main.js`、`art.js`；字体OFL原文在 `../fonts/`。
- 场景素材原文件与来源在 [../assets/SOURCES.md](../assets/SOURCES.md)，重建时复制到 `demo/assets/`。Three.js 0.170.0加载链与MIT原文在 `../vendor/`，制作环境按依赖锁取得完整包。
