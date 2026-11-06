# 思考的空间 · 暗色科技发布

## 实现 Prompt

制作一支暗色科技发布时间线影片。被窗口、文件和通知埋住的光标按下一次，264个界面元素沿三股光流归格；光带显出Tidy产品窗口和0.8秒指标，最后一切收回到开场的光标。生成界面与错相配乐共用音符表，拥挤、冻结和归格形成节奏，暗色产品靠扫光与一个品牌色被看见。画面构成：近黑#0A0B0F，三档抬升表面，荧光绿#B7F34A作品牌强调；过载段使用红色。；Inter界面、Inter Tight大字、JetBrains Mono标签。；1920×1080；48px网格，窗口、通知和文件构成2.5D空间。；全部UI、图标与照片缩略图由Canvas2D代码绘制。；对数拉远、定格推近、一拍拉回、分组弧线归格、窗口扫光和巨数字特写。；原片木琴错相配乐、VCSL采样、UI拟音与Kokoro旁白。；120BPM；15–16秒数字静音，16秒按下，33–34秒近静音。；同一光标完成标题、承压、整理和片尾，画音共享timeline.js。。实现入口为demos/cases/lemo-dark-keynote/film/，MotionKit适配层仅调用并等待原作render(t)，使用原片音轨同步播放。

## 动效 Token

- **归格**：film/world.js:snap：t0=16+.03+d/2600；dur=.26+.14×min(1,trip/1200)；film/film.js:drawWorldItems保留三股弧线和9段拖尾。
- **静音**：film/timeline.js:K.freeze=15、press=16；source/mix.py:193/198将15–16秒清零。
- **光揭示**：film/film.js:sceneProduct；film/engine.js:lightReveal：base=.07、soft=700、band=360、glint=.2。

## 制作约束

- 新增界面元素时，同步修改timeline.js声部和world.js槽位数。
- 扫光与产品窗口投影保持同一坐标。
- 冻结段保留数字静音和相机运动。

## 迁移

- `film/world.js:snap`：修改该处的归格参数。
- `film/timeline.js:K.freeze=15、press=16；source/mix.py:193/198将15–16秒清零。`：修改该处的静音参数。
- `film/film.js:sceneProduct；film/engine.js:lightReveal`：修改该处的光揭示参数。

[打开 Demo](../../demos/cases/lemo-dark-keynote/index.html) · [在库中查看](../../cases.html#case/lemo-dark-keynote)
