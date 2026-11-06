# lemo-opuscar

Lemomo（[@lemomo-ai](https://github.com/lemomo-ai)）的代码影片风格库，收录66种风格及各自的示范短片，提供导演和技术指南，还包含串起98部奥斯卡最佳影片的长片 OPUSCAR 98。本库原文快照固定在 [`bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00`](https://github.com/lemomo-ai/lemo-opuscar/tree/bebbbe1aa92a3cb4bb6f83500e61b23a17d1aa00)；代码与文档为 MIT，示范成片和静帧为 CC BY 4.0，第三方资源与配音例外见[素材条目的许可](../../materials.html#material/lemo-opuscar)。

## 组成

| 文件 | 提供的内容 |
| --- | --- |
| DIRECTOR.md | 故事、声音、节奏、运镜、表演和交付自检的导演方法。 |
| TECHNIQUE.md | 环境、逐帧页面、旁白、配乐、混音与合成。 |
| styles/&lt;slug&gt;/STYLE.md | 风格的外观、配色、字体、动作、镜头语法、声音与原生招式。 |
| styles/&lt;slug&gt;/DEMO.md | 对应示范片的故事、镜头、配乐结构、道具、参数与制作说明。 |
| MY-STYLES.md | 改造库内风格或从空白制作并保存个人风格的五步流程。 |
| core/ | 渲染、TTS、语音识别、采样乐器、拟音、混音，以及基础随机、缓动与 Three.js 后期工具。 |

## 用法

在终端安装插件后，可以从任意文件夹开始：

```sh
claude plugin marketplace add lemomo-ai/lemo-opuscar
claude plugin install lemo-opuscar@lemolab
```

也可克隆仓库，在库内运行 Claude：

```sh
git clone https://github.com/lemomo-ai/lemo-opuscar.git
cd lemo-opuscar
claude
```

直接说想要的主题、时长和风格。上游 README 的两个示例：

> Make a 45-second film in the **watercolor** style about the coffee farm my family runs. Warm female narrator.

> Make a 40-second **LiDAR Survey** film about the old quarry in the hills behind our town, from public laser-scan data.

Agent 开始时会一次询问三件事：主题中需要用户决定的事实；用户自己的声音、音乐或其他素材；是否先审阅分镜。语言由请求确定，默认与用户使用的语言相同。安装插件后，不带参数调用 `/lemo-opuscar:lemo-opuscar` 可先选语言，再选制作影片、改风格或使用已保存风格。

## 风格目录

### 剪辑与纪实 · Edit & Documentary

- [字幕新闻 · Caption News](../../cases.html#case/lemo-caption-news) · 已复刻
- 1920s 新闻影片 · 1920s Newsreel
- [实时倒计时分屏 · Live Countdown Split-screen](../../cases.html#case/lemo-countdown) · 已复刻
- 延时交响 · Time-lapse Symphony
- [视觉调查 · Visual Investigation](../../cases.html#case/lemo-visual-investigation) · 已复刻
- [构成主义蒙太奇 · Constructivist Montage](../../cases.html#case/lemo-kino-montage) · 已复刻
- [体育战术板 · Sports Telestrator](../../cases.html#case/lemo-telestrator) · 已复刻
- [电视新闻包装 · Broadcast News Package](../../cases.html#case/lemo-news-package) · 已复刻

### 实证影像 · Evidence Films

- [卫星简报 · Satellite Briefing](../../cases.html#case/lemo-satellite-briefing) · 已复刻
- [工程简报板 · Engineering Briefing Board](../../cases.html#case/lemo-briefing-board) · 已复刻
- [点云测绘 · LiDAR Survey](../../cases.html#case/lemo-lidar-survey) · 已复刻
- [白模投影 · Projection on White Model](../../cases.html#case/lemo-white-model) · 已复刻
- 数据实物化 · Data Physicalization
- [产品拆解 · Exploded Teardown](../../cases.html#case/lemo-teardown) · 已复刻
- [显微叙事 · Microscope Story](../../cases.html#case/lemo-microscope) · 已复刻
- [档案灯台 · Archive Light Table](../../cases.html#case/lemo-archive-lighttable) · 已复刻

### 手绘与绘画 · Hand-drawn & Painting

- [蜡笔儿童绘本 · Crayon Picture Book](../../cases.html#case/lemo-crayon-book) · 已复刻
- [水彩笔刷 · Watercolor Brush](../../cases.html#case/lemo-watercolor) · 已复刻
- [中国水墨 · Chinese Ink Wash](../../cases.html#case/lemo-ink-wash) · 已复刻
- [油画厚涂 · Impasto Oil Painting](../../cases.html#case/lemo-impasto) · 已复刻
- 一笔画 · One-line Drawing
- [白板讲解 · Whiteboard Explainer](../../cases.html#case/lemo-whiteboard) · 已复刻
- [钢笔淡彩 · Urban Sketch · Pen & Wash](../../cases.html#case/lemo-urban-sketch) · 已复刻
- [黑板粉笔 · Chalkboard](../../cases.html#case/lemo-chalkboard) · 已复刻

### 东方传统 · East Asian Traditions

- [皮影戏 · Shadow Puppetry](../../cases.html#case/lemo-shadow-puppet) · 已复刻
- [浮世绘 · Ukiyo-e](../../cases.html#case/lemo-ukiyoe) · 已复刻
- [红色窗花剪纸 · Red Paper-cut](../../cases.html#case/lemo-papercut-red) · 已复刻
- [纸雕灯影 · Paper-cut Lightbox](../../cases.html#case/lemo-paper-lantern) · 已复刻

### 印刷与版画 · Print & Printmaking

- [Risograph 孔版印刷 · Risograph Print](../../cases.html#case/lemo-risograph) · 已复刻
- [复古半调案卷 · Halftone Dossier](../../cases.html#case/lemo-halftone-dossier) · 已复刻
- [木刻版画 · Woodcut Print](../../cases.html#case/lemo-woodcut) · 已复刻
- [铜版画 · Copperplate Engraving](../../cases.html#case/lemo-engraving) · 已复刻
- [丝印旅行海报 · Silkscreen Travel Poster](../../cases.html#case/lemo-silkscreen-poster) · 已复刻
- [印刷长镜头 · Printed Long Take](../../cases.html#case/lemo-printed-long-take) · 已复刻

### 图形与排版 · Graphic & Type

- [瑞士动态排版 · Swiss Motion Graphics](../../cases.html#case/lemo-swiss-motion) · 已复刻
- [60s 间谍片头 · 60s Spy Title Sequence](../../cases.html#case/lemo-spy-titles) · 已复刻
- [装饰艺术 · Art Deco](../../cases.html#case/lemo-art-deco) · 已复刻
- [蓝图 / 工程制图 · Blueprint](../../cases.html#case/lemo-blueprint) · 已复刻
- [彩色玻璃窗 · Stained Glass](../../cases.html#case/lemo-stained-glass) · 已复刻
- [象形运动图形 · Pictogram Motion](../../cases.html#case/lemo-pictogram-motion) · 已复刻
- [ASCII / CRT 终端 · ASCII / CRT Terminal](../../cases.html#case/lemo-ascii-crt) · 已复刻

### 信息与发布 · Information & Keynote

- [数据叙事 · Data Storytelling](../../cases.html#case/lemo-dataviz) · 已复刻
- 等距信息图 · Isometric Infographic
- [暗色科技发布 · Dark Tech Keynote](../../cases.html#case/lemo-dark-keynote) · 已复刻
- [活体实机录屏 · Living Screencast](../../cases.html#case/lemo-living-screencast) · 已复刻
- [科幻全息界面 · Sci-fi Hologram HUD](../../cases.html#case/lemo-hologram-hud) · 已复刻
- [地铁线路图 · Transit Map](../../cases.html#case/lemo-transit-map) · 已复刻
- 等距绘本 · Isometric Picture Book
- [电路板 · Circuit Board](../../cases.html#case/lemo-circuit-board) · 已复刻

### 卡通与动画 · Cartoon & Anime

- 1930s 橡皮管卡通 · 1930s Rubber Hose Cartoon
- 80 年代赛璐璐动画 · 80s Cel Anime
- 科幻情景喜剧卡通 · Sci-Fi Sitcom Toon
- [50s 扁平卡通 · Mid-century Cartoon](../../cases.html#case/lemo-midcentury-toon) · 已复刻

### 游戏 · Games

- 16-bit 像素 RPG · 16-bit Pixel RPG
- [HD-2D · HD-2D](../../cases.html#case/lemo-hd-2d) · 已复刻
- 微游戏快闪 · Microgame Frenzy
- 综艺节奏扁平 · Game Show Flat

### 电影与时代 · Cinema & Eras

- 1920s 默片 · 1920s Silent Film
- [后室 / 新怪谈 · Liminal Found Footage](../../cases.html#case/lemo-backrooms) · 已复刻

### 材质与 3D · Materials & 3D

- [积木玩具 · Brick Toy](../../cases.html#case/lemo-brick-toy) · 已复刻
- [纸片立体书 · Paper Pop-up Book](../../cases.html#case/lemo-paper-popup) · 已复刻
- 移轴微缩 · Tilt-Shift Miniature
- [低多边形等距 · Low-poly Isometric Island](../../cases.html#case/lemo-lowpoly-island) · 已复刻
- 玻璃质感产品 · Glass Product Render
- [孟菲斯微缩景观 · Memphis Diorama](../../cases.html#case/lemo-memphis-diorama) · 已复刻
- 桌面穿梭 · Desktop Flythrough

## 改成我的风格

1. 选择库内风格或从空白描述外观，逐题确定用途、平台、品牌、改动方向与名称，每轮最多五项改动。
2. 审阅每项前后状态及其代价，确认摘要后再写入。
3. 先用实际代码绘制风格帧，改库内风格时将原版置左、个人版置右比较。
4. 制作15–30秒、有音乐和音效的示范短片，让每项改动都在画面中出现。
5. 确认满意后保存到 `~/lemo-my-styles/<name>/`，同时保留风格提示词、改动说明、成片和源码，以名称复用。

## 本库收录

原文快照包含根目录的指南、许可和 Node / Python 依赖清单，`plugin/` 中的技能与插件清单，以及 `.claude-plugin/marketplace.json`、`styles/README.md` 和 `styles/_template/`。此外还包含全部66个风格的 `STYLE.md` / `DEMO.md` / `style.json`、`core/` 的代码与文字，以及 `tools/fetch.sh` 和资源清单 `tools/assets.json`。快照不含 `core/assets/`、字体二进制、各风格的 `demo/` 代码和成片。

以下16种风格未复刻：与已有案例重合的 pixel-rpg、iso-infographic、isometric-picture-book、one-line、glass-product；效果未达要求的 game-show、cel-anime-80s、scifi-toon、rubber-hose、microgame、tilt-shift、desktop-flythrough、silent-film、data-physical、newsreel；画面由 Python 离线合成的 city-symphony。

50个案例各自保留运行画面、字体、成片音轨与`source/`制作文件：

- [跟着雨走 · 水彩笔刷](../../cases.html#case/lemo-watercolor)：制作文件见[source/README.md](../../demos/cases/lemo-watercolor/source/README.md)。
- [海报五则 · 瑞士动态排版](../../cases.html#case/lemo-swiss-motion)：制作文件见[source/README.md](../../demos/cases/lemo-swiss-motion/source/README.md)。
- [林下的田 · 点云测绘](../../cases.html#case/lemo-lidar-survey)：制作文件见[source/README.md](../../demos/cases/lemo-lidar-survey/source/README.md)。
- [柚子城的四季 · 孟菲斯微缩景](../../cases.html#case/lemo-memphis-diorama)：制作文件见[source/README.md](../../demos/cases/lemo-memphis-diorama/source/README.md)。
- [剑客渡江 · 中国水墨](../../cases.html#case/lemo-ink-wash)：制作文件见[source/README.md](../../demos/cases/lemo-ink-wash/source/README.md)。
- [铸钟人 · 木刻版画](../../cases.html#case/lemo-woodcut)：制作文件见[source/README.md](../../demos/cases/lemo-woodcut/source/README.md)。
- [天鹅绒密码 · 60s 间谍片头](../../cases.html#case/lemo-spy-titles)：制作文件见[source/README.md](../../demos/cases/lemo-spy-titles/source/README.md)。
- [小精灵冒险记 · 纸片立体书](../../cases.html#case/lemo-paper-popup)：制作文件见[source/README.md](../../demos/cases/lemo-paper-popup/source/README.md)。
- [走向远山 · 浮世绘](../../cases.html#case/lemo-ukiyoe)：制作文件见[source/README.md](../../demos/cases/lemo-ukiyoe/source/README.md)。
- [后羿射日 · 皮影戏](../../cases.html#case/lemo-shadow-puppet)：制作文件见[source/README.md](../../demos/cases/lemo-shadow-puppet/source/README.md)。
- [年兽进城 · 红色窗花剪纸](../../cases.html#case/lemo-papercut-red)：制作文件见[source/README.md](../../demos/cases/lemo-papercut-red/source/README.md)。
- [雨的颜色 · 油画厚涂](../../cases.html#case/lemo-impasto)：制作文件见[source/README.md](../../demos/cases/lemo-impasto/source/README.md)。
- [月亮睡不着 · 蜡笔儿童绘本](../../cases.html#case/lemo-crayon-book)：制作文件见[source/README.md](../../demos/cases/lemo-crayon-book/source/README.md)。
- [末班夜车 · 纸雕灯影](../../cases.html#case/lemo-paper-lantern)：制作文件见[source/README.md](../../demos/cases/lemo-paper-lantern/source/README.md)。
- [口袋里的爱因斯坦 · 白板讲解](../../cases.html#case/lemo-whiteboard)：制作文件见[source/README.md](../../demos/cases/lemo-whiteboard/source/README.md)。
- [风去了哪里 · 钢笔淡彩](../../cases.html#case/lemo-urban-sketch)：制作文件见[source/README.md](../../demos/cases/lemo-urban-sketch/source/README.md)。
- [汉字的故事 · 黑板粉笔](../../cases.html#case/lemo-chalkboard)：制作文件见[source/README.md](../../demos/cases/lemo-chalkboard/source/README.md)。
- [周日骑行 · Risograph 孔版印刷](../../cases.html#case/lemo-risograph)：制作文件见[source/README.md](../../demos/cases/lemo-risograph/source/README.md)。
- [胖橘案卷 · 复古半调案卷](../../cases.html#case/lemo-halftone-dossier)：制作文件见[source/README.md](../../demos/cases/lemo-halftone-dossier/source/README.md)。
- [蜜蜂，第七号图版 · 铜版画](../../cases.html#case/lemo-engraving)：制作文件见[source/README.md](../../demos/cases/lemo-engraving/source/README.md)。
- [绕远路回家 · 丝印旅行海报](../../cases.html#case/lemo-silkscreen-poster)：制作文件见[source/README.md](../../demos/cases/lemo-silkscreen-poster/source/README.md)。
- [三十三只 · 印刷长镜头](../../cases.html#case/lemo-printed-long-take)：制作文件见[source/README.md](../../demos/cases/lemo-printed-long-take/source/README.md)。
- [星光饭店的午夜 · 装饰艺术](../../cases.html#case/lemo-art-deco)：制作文件见[source/README.md](../../demos/cases/lemo-art-deco/source/README.md)。
- [专利申请中：接云机器 · 蓝图 / 工程制图](../../cases.html#case/lemo-blueprint)：制作文件见[source/README.md](../../demos/cases/lemo-blueprint/source/README.md)。
- [东窗之龙 · 彩色玻璃窗](../../cases.html#case/lemo-stained-glass)：制作文件见[source/README.md](../../demos/cases/lemo-stained-glass/source/README.md)。
- [被落下的伞 · 象形运动图形](../../cases.html#case/lemo-pictogram-motion)：制作文件见[source/README.md](../../demos/cases/lemo-pictogram-motion/source/README.md)。
- [静海日志 · ASCII / CRT 终端](../../cases.html#case/lemo-ascii-crt)：制作文件见[source/README.md](../../demos/cases/lemo-ascii-crt/source/README.md)。
- [思考的空间 · 暗色科技发布](../../cases.html#case/lemo-dark-keynote)：制作文件见[source/README.md](../../demos/cases/lemo-dark-keynote/source/README.md)。
- [Clawd 搬进来 · 活体实机录屏](../../cases.html#case/lemo-living-screencast)：制作文件见[source/README.md](../../demos/cases/lemo-living-screencast/source/README.md)。
- [七毫秒 · 电路板](../../cases.html#case/lemo-circuit-board)：制作文件见[source/README.md](../../demos/cases/lemo-circuit-board/source/README.md)。
- [认识皮普 · 50s 扁平卡通](../../cases.html#case/lemo-midcentury-toon)：制作文件见[source/README.md](../../demos/cases/lemo-midcentury-toon/source/README.md)。
- [提灯人 · HD-2D](../../cases.html#case/lemo-hd-2d)：制作文件见[source/README.md](../../demos/cases/lemo-hd-2d/source/README.md)。
- [用零件造火箭 · 积木玩具](../../cases.html#case/lemo-brick-toy)：制作文件见[source/README.md](../../demos/cases/lemo-brick-toy/source/README.md)。
- [长出来的小岛 · 低多边形等距](../../cases.html#case/lemo-lowpoly-island)：制作文件见[source/README.md](../../demos/cases/lemo-lowpoly-island/source/README.md)。
- [夜班入职指引 · 后室 / 新怪谈](../../cases.html#case/lemo-backrooms)：制作文件见[source/README.md](../../demos/cases/lemo-backrooms/source/README.md)。
- [地图上还写着海 · 卫星简报](../../cases.html#case/lemo-satellite-briefing)：制作文件见[source/README.md](../../demos/cases/lemo-satellite-briefing/source/README.md)。
- [船说了算 · 工程简报板](../../cases.html#case/lemo-briefing-board)：制作文件见[source/README.md](../../demos/cases/lemo-briefing-board/source/README.md)。
- [被炸平的城市怎样长回来 · 白模投影](../../cases.html#case/lemo-white-model)：制作文件见[source/README.md](../../demos/cases/lemo-white-model/source/README.md)。
- [量出来的蓝 · 显微叙事](../../cases.html#case/lemo-microscope)：制作文件见[source/README.md](../../demos/cases/lemo-microscope/source/README.md)。
- [差两秒 · 档案灯台](../../cases.html#case/lemo-archive-lighttable)：制作文件见[source/README.md](../../demos/cases/lemo-archive-lighttable/source/README.md)。
- [蜜蜂账本 · 字幕新闻](../../cases.html#case/lemo-caption-news)：制作文件见[source/README.md](../../demos/cases/lemo-caption-news/source/README.md)。
- [兴登堡号：四分钟与三十二秒 · 视觉调查](../../cases.html#case/lemo-visual-investigation)：制作文件见[source/README.md](../../demos/cases/lemo-visual-investigation/source/README.md)。
- [本周 AI 四件事 · 电视新闻包装](../../cases.html#case/lemo-news-package)：制作文件见[source/README.md](../../demos/cases/lemo-news-package/source/README.md)。
- [定格 · 体育战术板](../../cases.html#case/lemo-telestrator)：制作文件见[source/README.md](../../demos/cases/lemo-telestrator/source/README.md)。
- [自己倒数 · 实时倒计时分屏](../../cases.html#case/lemo-countdown)：制作文件见[source/README.md](../../demos/cases/lemo-countdown/source/README.md)。
- [410 天 · 构成主义蒙太奇](../../cases.html#case/lemo-kino-montage)：制作文件见[source/README.md](../../demos/cases/lemo-kino-montage/source/README.md)。

- [伏特·规格扫描 · 科幻全息界面](../../cases.html#case/lemo-hologram-hud)：制作文件见[source/README.md](../../demos/cases/lemo-hologram-hud/source/README.md)。
- [二十一键 · 产品拆解](../../cases.html#case/lemo-teardown)：制作文件见[source/README.md](../../demos/cases/lemo-teardown/source/README.md)。
- [一百个夏天 · 数据叙事](../../cases.html#case/lemo-dataviz)：制作文件见[source/README.md](../../demos/cases/lemo-dataviz/source/README.md)。
- [6 公里 · 地铁线路图](../../cases.html#case/lemo-transit-map)：制作文件见[source/README.md](../../demos/cases/lemo-transit-map/source/README.md)。

共用工具见[本快照的core/](../../demos/materials/lemo-opuscar/core/README.md)。作者画廊共68项，以无声循环 WebP 展示，并保留公开成片链接。
