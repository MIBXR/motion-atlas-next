# I'm Upping My P(doom) · 手绘卡通音乐录像

## 实现 Prompt

用 p5.js 2.3.3 + p5.brush 2.2.3 制作一支 1920×1080、24fps 的歌词驱动手绘 MV。先按歌曲写分镜：幕启、叙事章节、四次回到同一舞台并升级的副歌、揭幕反转与谢幕；每句歌词对应一个可读的行动和由行动带出的转场。以赤陶色方块角色、暖纸、水彩背景和墨线统一画面，各章限制主色；角色用不透明 wash 加局部 fill，背景用半透明 fill，画面最后 multiply 纸齿与暗角。镜头注册为 chapter(name,start,end,shots)，每个 fn(t,lt,dur) 绘制完整一帧，全部状态由歌曲时刻 t 推导；以 BPM、OFF 和 BOIL=12 驱动舞步、命中和线条随机种子。用 mood 的挤眼、拉伸、挤压回弹与 emote 表演换情绪。仅在大章边界前后各 0.3 秒以错峰笔刷盖满再揭开，章内用咬合黑场、穿眼推进、坠落与爆闪接镜。底部用 Shantell Sans 800 绘制奶油白歌词，在逐句区间内按字符长度从左到右填赭黄，保留 0.18 秒进入和 0.12 秒退出；漫画标题用 Permanent Marker。四段副歌让打气筒逐拍推高同一计量表，舞台表与角落表互斥。沿用一条连续音轨，声音默认关闭，减少动态停在代表帧。实现位置为 demos/cases/pdoom-video/film/src/；根 index.html 用 MotionKit 预载字体、源码、库与音轨，等待 window.ready 后逐帧调用并等待 renderAt(t)。

## 负向约束

机械匀速动作、直接换脸、无事件的静态镜头、每个镜头都用同一擦除、关键动作落在歌词带内、未设种子的帧间随机、把原作成片当作画面实现。

## 动效 Token

- **BPM**：88 · film/src/core.js:3
- **OFF**：0.21s · film/src/core.js:3
- **BOIL**：12fps · film/src/core.js:3/195
- **WIPE_TR**：0.3s · film/src/timeline.js:12
- **WIPES**：[1.5,38.5,73.0,109.4] · film/src/timeline.js:11

## 制作约束

- 每个镜头只由歌曲时刻 t 推导状态，并绘制完整画面；使用 hash 与按时刻重设的随机种子。
- 面孔与关键动作放在约 y=960 以上，避开歌词底带。
- 水彩 fill 与笔画数量决定逐帧成本；原作按离线逐帧绘制设计。
- 改动歌曲、时长或节拍时同步歌词区间、镜头时刻、METER、WIPES 与适配层配置。

## 迁移

- `film/src/lyrics.js → LY`：修改歌词与逐句起止时刻；句内高亮由 timeline.js 按字符长度推进。
- `film/src/ch/c01_lab.js…c09_finale.js → chapter(name,start,end,shots)`：修改九章镜头与注册区间；每个镜头 fn(t,lt,dur) 绘制完整画面。
- `film/src/core.js:3 → BPM / BEAT / OFF / BOIL / DUR`：修改节拍、偏移、时长与线条沸腾频率；同步根 index.html 的 duration、fps 与 bpm。
- `film/src/timeline.js:11–12 → WIPES / WIPE_TR`：修改换章擦除位置与边界两侧各 0.3 秒的过渡。
- `film/src/timeline.js:14 → METER`：修改四段副歌的计量窗口与各段起止值。
- `film/src/clawd.js → eyes / hat / emote / mood`：修改角色眼型、帽子、符号与表情过渡。
- `film/src/cast.js`：修改 Researcher 等配角与舞步。
- `film/src/props.js`：修改幕布、舞台、打气筒与计量表道具。

[打开 Demo](../../demos/cases/pdoom-video/index.html) · [在库中查看](../../cases.html#case/pdoom-video)
