# 提灯人 · HD-2D · 制作文件

上游固定在[bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/hd-2d/demo)。运行源码与输入数据在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。

## 文件

| 文件 | 用途 |
| --- | --- |
| `CREDITS` | 作品、字体、声音与素材署名。 |
| `lines.json` | 配音文本、声音与语速。 |
| `mix.py` | 合成环境、拟音、配音和配乐并执行闪避。 |
| `music/CREDITS.txt` | 原配乐与采样署名。 |
| `music/CUES.md` | 配乐剪辑、静默和主击点的时间表。 |
| `music/edit.py` | 按画面时间剪辑和自动化原配乐。 |
| `music/measure.json` | 原配乐测量结果。 |
| `sfx_events.json` | 脚步与动作拟音时间表。 |
| `tools/render_range.mjs` | 分段重渲染和拼接入口。 |
| `tools/sheet/index.html` | 像素角色图集制作页。 |
| `tools/srt.py` | 读取剧情与配音时长生成SRT。 |
| `vo_times.json` | 混音读取的旁白起点。 |
| `voices/words.json` | 配音逐词识别时间。 |

## 重建

在上游目录结构`styles/hd-2d/demo/`工作：将`../film/`中的作品源码与运行JSON放回demo目录，将本目录制作文件按相对路径覆盖，字体放回demo/fonts/。`film/index.html`的import map和本库素材路径按上游目录入口设置。

共享制作工具在[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)：`render/`提供事件导出、字幕、逐帧渲染与合成；`tts/`提供Kokoro配音；`audio/`提供拟音、混音与采样乐器。运行中的`core/lib.js`副本在`../film/core/`。

命令从上游根目录按下列顺序执行，Python环境安装上游core/README列出的依赖：

```sh
D=styles/hd-2d/demo
python core/tts/tts.py $D/lines.json $D/voices
(cd $D/music && python edit.py)
python $D/mix.py
python $D/tools/srt.py
node core/render/video.mjs $D --fps 60 --workers 2 --q tilt=1 --out $D/out/video_tilt.mp4
sh core/render/mux.sh $D/out/video_tilt.mp4 $D/mix.wav styles/hd-2d/hd-2d.mp4 60 0
```

## 字体与制作输入

| 字体文件 | 固定来源 |
| --- | --- |
| `h0.woff2` | [cinzel](https://fonts.gstatic.com/s/cinzel/v26/8vIU7ww63mVu7gtR-kwKxNvkNOjw-uTnfY3lDWxcZqTFUw.woff2) |
| `h1.woff2` | [cinzel](https://fonts.gstatic.com/s/cinzel/v26/8vIU7ww63mVu7gtR-kwKxNvkNOjw-jHgfY3lDWxcZqTFUw.woff2) |
| `h2.woff2` | [cormorantgaramond](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5wDD-iNM8A_6pUKz9.woff2) |
| `h3.woff2` | [cormorantgaramond](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_s06KnTOitk9IfqxUQ.woff2) |
| `h4.woff2` | [cormorantgaramond](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_iE9KnTOitk9IfqxUQ.woff2) |

字重、格式与拉丁子集按`../fonts/fonts.css`加载；许可原文同目录提供。

配乐输入[`sb_precipice.mp3`](https://www.scottbuckley.com.au/library/wp-content/uploads/2021/01/sb_precipice.mp3)放到demo/music/src/；剪辑列表在music/CUES.md。

Kokoro模型与voices-v1.0.bin按共享`core/README.md`取得；生成的单句WAV、分轨、mix.wav、渲染视频由以上制作顺序输出。
