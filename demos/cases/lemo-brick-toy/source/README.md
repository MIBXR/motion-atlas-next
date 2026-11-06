# 用零件造火箭 · 积木玩具 · 制作文件

上游固定在[bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00/styles/brick-toy/demo)。运行源码与输入数据在`../film/`，字体在`../fonts/`，正式混音在`../audio/film.m4a`。

## 文件

| 文件 | 用途 |
| --- | --- |
| `CREDITS` | 作品、字体、声音与素材署名。 |
| `events.json` | 画面导出的动作与声音事件。 |
| `lines.json` | 配音文本、声音与语速。 |
| `mix.py` | 合成环境、拟音、配音和配乐并执行闪避。 |
| `music/edit.py` | 按画面时间剪辑和自动化原配乐。 |
| `music/score.json` | 配乐导出的节拍与末击时间。 |

## 重建

在上游目录结构`styles/brick-toy/demo/`工作：将`../film/`中的作品源码与运行JSON放回demo目录，将本目录制作文件按相对路径覆盖，字体放回demo/fonts/。`film/index.html`的import map和本库素材路径按上游目录入口设置。

共享制作工具在[demos/materials/lemo-opuscar/core/](../../../materials/lemo-opuscar/core/README.md)：`render/`提供事件导出、字幕、逐帧渲染与合成；`tts/`提供Kokoro配音；`audio/`提供拟音、混音与采样乐器。运行中的`core/lib.js`与`core/three/post.js`副本在`../film/core/`。

命令从上游根目录按下列顺序执行，Python环境安装上游core/README列出的依赖：

```sh
D=styles/brick-toy/demo
python core/tts/tts.py $D/lines.json $D/voices
node core/render/events.mjs $D
(cd $D/music && python edit.py)
python $D/mix.py
node core/render/video.mjs $D --fps 24 --out $D/out/video24.mp4
sh core/render/mux.sh $D/out/video24.mp4 $D/mix.wav styles/brick-toy/brick-toy.mp4 24
```

## 字体与制作输入

Fredoka沿用共享`core/fonts/fonts.css`中的500/600声明和原始f1–f3.woff2子集，本库从已收录的同源字体复制；许可见`../fonts/OFL-fredoka.txt`。

Poly Haven的环境HDR、木纹、glTF与贴图在`../assets/`，源地址与许可见[素材来源](../assets/SOURCES.md)。上游目录使用`core/assets/polyhaven/`。

音乐输入放在demo/music/：[`Monkeys_Spinning_Monkeys.mp3`](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400011)、[`Heroic_Age.mp3`](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100848)；`Monkeys_Spinning_Monkeys_beats.npy`是`music/edit.py`读取的节拍数组，作为原作者制作输入取得。

Kokoro模型与voices-v1.0.bin按共享`core/README.md`取得；生成的单句WAV、分轨、mix.wav、渲染视频由以上制作顺序输出。
