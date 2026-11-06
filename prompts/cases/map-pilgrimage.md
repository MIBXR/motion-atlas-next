# 地图巡礼 · 游戏过场式旅行影像

## 实现 Prompt

用 HTML/CSS/JS 制作一支 60 秒、可逐帧定位的“地图巡礼”影像，固定画幅两套构图：横屏 1920×1080 与竖屏 1080×1920（舞台像素坐标，整体等比缩放）。舞台字号按设计决定，不设下限；网站界面 ≥ 12px。内容：关西三日（上海 → 关西机场 → 京都伏见稻荷 → 鸭川 → 奈良公园 → 道顿堀），只用真实地名。①世界层：MapLibre GL + OpenFreeMap positron，隐藏全部文字标注，z14 起 3D 建筑，加 AWS Terrain Tiles 山体阴影（z5.5–13）；镜头关键帧 {t, center, zoom, pitch, bearing, 焦点位置 f / 竖屏 fp}，用 padding 把地点放到指定的屏幕位置；开场地球投影 + 星空；长距离用一段 ease-out 一口气推近。②昼夜：按图层类别逐个插值白天与夜晚配色，约 1 秒、中途经过去饱和的灰，不整体反色。③路线：航线虚线 + 飞机、铁路发光实线（line-gradient 按进度截断；几何从矢量瓦片里的 rail 线最短路提取）+ 车头、步行圆点、错误路线红线打叉；所有点位由同一个投影函数计算，端点与圆心严格重合。④HUD：左上 DAY 01 / 03 + 日期，右上坐标 / ELEV·Z / JST 时钟，顶部规尺按旅程进度填充，左下 NOW PLAYING + 双语歌词打字，右下步进器与车站印章（竖屏改为顶部 HUD + 右侧印章栏 + 底部步进器），计数徽章变化时上滚回弹。⑤事件：竖排汉字逐字模糊入场（550ms，字间 160ms）+ 英文模糊前沿打字；照片卡片浮入并用引线连到地图标记；卡片展开为全屏、HUD 保留并压暗；章节换强调色并描出四角框线 / 斜纹胶带；全屏插画回忆（独立框、档案标签、竖排字幕逐字）；分屏对比（分割线滑到中线 + 倾斜时间戳盖章）；红色 WRONG TRAIN 通栏 + REROUTING 胶囊；大号日序；结尾统计逐行计数 + 衬线 fin.。⑥标签避让：站名固定宽度 + 多个候选位置，避开 HUD 保留区与事件文字；文字永不压线。⑦声音：WebAudio 合成 120 BPM 乐谱（环境底、和弦、贝斯、鼓、阳音阶拨弦 + 每个事件的音），默认静音，可离线渲染 WAV。⑧工程：render(t) 纯函数，时间全部写进 config 轨道；window.__motion = {duration, seek(t)→Promise, play, pause, on}；?render=1 时 seek 等待瓦片；实时播放先扫描全片镜头需要的瓦片，再按时间顺序两级缓冲（下载 / 解析，内存预算，快速推拉帧的低价值瓦片降级），前方不足就暂停显示缓冲提示；颗粒用独立合成层平移；离线退回网格底图。

## 视频生成 Prompt

60-second travel cutscene in the style of a video-game map interface, delivered in two fixed frames (1920×1080 landscape and 1080×1920 portrait with its own layout). A pale paper-colored 3D map of Japan's Kansai region (warm light-grey land, blue-grey water, white roads, thin grey railway lines, extruded white buildings in the city close-ups) is the persistent world; the camera glides with slow ease-in-out moves and gentle pitch. Fixed HUD: top-left 'DAY 01 / 03' with a monospace date, top-right latitude/longitude, 'ELEV 38 M · Z 14.1' and a large clock with a 'JST' superscript, a thin progress rule across the top, bottom-left 'NOW PLAYING' with an equalizer icon and bilingual lyric lines, bottom-right a four-stop stepper (KIX, KYOTO, NARA, OSAKA) with red station stamps. Beats: a night globe with stars → the map turns to day through grey → large vertical Japanese title characters '関西周遊' blur in one by one while 'KANSAI LOOP '26' types in → a dashed flight arc with a small plane sweeps from Shanghai and the camera dives straight into Kansai Airport → a glowing vermilion rail line draws along the real railway to Kyoto → close-up of Fushimi Inari with 3D buildings, a photo card of torii gates floats in with a thin leader line, then expands to full screen while the HUD stays on top → a teal chapter frame draws around the screen corners over the Kamo River → an illustrated flashback with its own frame and vertical Japanese subtitles revealing character by character → split screen: a divider slides to center revealing a 1930s sepia postcard against the modern river, a tilted timestamp stamps down → night falls on the map layer by layer, a handwritten note card drops in → day two: rail to Nara, deer park card with an amber tape decoration → a red 'WRONG TRAIN' banner wipes in, the wrong route turns red and ends with an X, a black 'REROUTING…' capsule blinks → night arrival at Dotonbori with neon and tall 3D blocks → the camera pulls back over the whole loop → stacked statistics count up and a serif 'fin.'. Clean, restrained, game-UI precision, subtle film grain, rhythmic edits on a 120 BPM beat, no camera shake.

## 负向约束

不要整体反色做夜景；不要让多个全屏模式叠在一起；不要把 HUD 做成满屏发光科幻风；不要用卡通贴纸替代信息层；不要在高缩放时保留地图文字标注抢走注意力；不要让镜头连续快速甩动；不要让文字压在路线或标记上；不要横竖画幅共用一套自适应排版；不要使用动画作品名称、截图或无授权的照片与音乐；不要在地图没加载完时露白（缓冲时停在当前帧并提示）。

## 动效 Token

- **blur-in 逐字**：550ms outCubic，字间160ms。模糊18px→0，上移14px→0。地名标题使用同样参数。
- **type-in 打字**：按字符推进，前沿字符带 7px 模糊
- **card-in**：550ms outCubic浮入，400ms inCubic离场。图片持续Ken Burns推近。
- **card-expand**：600ms inOutCubic展开。停2.2s，Ken Burns缩放1.04→1.10。550ms收回，HUD转白字，上下压暗。
- **day-night**：约 1s，逐图层插值；中途经过去饱和的灰，不整体反色
- **chapter-frame**：标签350ms擦出，标题700ms打字。框线800ms inOutCubic描出。四角方块120ms错峰，300ms outBack。
- **split-compare**：分割线750ms outQuart滑到中线。时间戳360ms outBack盖章。
- **stamp**：车站印章与步进器同列，按到达依次盖下（回弹 + 印章音）
- **stat-stack**：每行 320ms 错峰计数，衬线 fin. 在 2s 后
- **buffering**：缓冲<0.5s时暂停，显示BUFFERING MAP xx%。攒够4s继续。

## 制作约束

- 画面、文字、地点与乐谱共同呈现关西三日旅程。
- 照片、明信片与插画按画幅绘制。
- OpenFreeMap底图与AWS高程显示建筑、铁路、水系和地名。
- 在 film/scenes.js 的 paintScene 修改程序场景；film/config.js 的 tracks.cards[] 设置场景类型与时刻。
- 横屏1920×1080、竖屏1080×1920等比缩放，网站文字≥12px。
- 约730块/130MB；约290块/66MB必需。10Mbps缓冲1–2次。

## 迁移

- `film/config.js → meta`：设置片名、副标题、时区、总天数、时长与BPM。
- `film/config.js → stops`：设置地点名称、经纬度、海拔与最小缩放，路线端点自动对齐。
- `film/config.js → tracks.camera`：c中心、z缩放、p俯仰、b方位、f/fp取景、zp竖屏缩放、e缓动。
- `film/paths.js`：设置铁路与步行经纬度，可用rail图层或GeoJSON线。
- `film/config.js → tracks.*`：调整各事件轨道时刻，画面与乐谱同步改变节奏。
- `film/config.js → chapters / stepper`：设置章节标题、强调色、框线或胶带，以及四站步进器与印章。
- `film/config.js → sound`：设置和弦、阳音阶与到站提示音，按轨道生成乐谱。
- `film/config.js → layout`：分别设置横竖规尺、步进器、印章、卡片、避让区与统计区。
- `film/config.js → palette / mapPalette / map`：设置纸色、墨色、夜色、强调色与地图昼夜配色、样式和高程。
- `film/scenes.js → paintScene；film/config.js → tracks.cards[]`：在 paintScene 修改程序绘制的照片、明信片与插画；tracks.cards[] 的 scene、caption、t、until、expand 设置场景、标签、时刻与展开。
- `film/script.js → BUF_CFG`：设置开头门槛、解析与下载范围、内存预算、暂停与继续阈值。

[打开 Demo](../../demos/cases/map-pilgrimage/index.html) · [在库中查看](../../cases.html#case/map-pilgrimage)
