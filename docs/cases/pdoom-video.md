# I'm Upping My P(doom) · 手绘卡通音乐录像

## 来源

作品来自 [JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo)，固定提交 `fa546a38092e75f2b079e6a86d6abc54dd525d17`，[YouTube 成片](https://youtu.be/8j-hR4fJywU)时长约156.6秒。上游说明全部内容由 Claude Opus 5.5 在 Claude Code 中两次生成，本库收录第二次生成的版本；作者只给了两条方向：用 Clawd 角色设计，每句歌词都有有趣的画面与转场。

## 结构

| 时刻（秒） | 章节 | 主色 |
| --- | --- | --- |
| 0–1.5 | 幕启 · Curtain up | 红色幕布、暖纸 |
| 1.5–23 | 实验室 · The Lab | 夜靛蓝、灯光赭黄、显示器青绿 |
| 23–38.5 | 副歌一 · The P(doom) Show | 玫瑰色与赭黄放射纹 |
| 38.5–59 | 升空 · Takeoff | 晨空、速度段、玫瑰色 |
| 59–73 | 副歌二 · Bigger Show | 竞技场，再到太空紫金 |
| 73–95.4 | 过时 · Obsolete | 羊皮纸博物馆、赭黄公路 |
| 95.4–109.4 | 副歌三 · Paperclips | 钢灰，再到爵士蓝 |
| 109.4–123.5 | 扩张 · Scale | 数据中心青绿、安全橙 |
| 123.5–140.5 | 副歌四 · Red Alert；137.4秒揭幕 | 警报红黑 |
| 140.5–156.6 | 谢幕 · Curtain call | 深红与金色 |

完整分镜见 [STORYBOARD.md](../../demos/cases/pdoom-video/source/STORYBOARD.md)。

## 机制

- 每个镜头是只取决于歌曲时刻 t 的纯函数；`film/src/timeline.js:7–8/29–43` 用 `chapter(name,start,end,shots)` 注册章节并选择镜头，镜头函数接收歌曲时刻、镜头内时刻和镜头时长。
- [笔刷横扫换章](../../patterns.html#pattern/brush-wipe-chapter-break)：`film/src/timeline.js:11–12/73–89` 只在四个大章边界，用五道错峰笔刷先覆盖画面，再揭开。
- [逐词卡拉 OK 歌词](../../patterns.html#pattern/karaoke-word-fill)：`film/src/lyrics.js` 保存逐句区间，`film/src/timeline.js:93–118` 生成底板并按字符长度推进每词的赭黄填色。
- [副歌计量表逐拍递增](../../patterns.html#pattern/escalating-chorus-meter)：`film/src/timeline.js:14–23/52–68` 按四段 METER 窗口步进，`film/src/props.js:75–76` 用 METER_SHOWN 隐藏角落中重复的计量表。
- [表情过渡](../../patterns.html#pattern/emotion-take-morph)：`film/src/clawd.js:211–218` 的 mood 在换脸前后挤眼、拉伸和回弹，`emote()` 在头部旁边绘制反应符号。
- [12fps 线条沸腾](../../patterns.html#pattern/cel-line-boil)：`film/src/core.js:3/195` 以 BOIL=12 和 `randomSeed(1000+floor(T*BOIL))` 更新笔触随机种子。

## 怎么改

- `film/src/lyrics.js → LY`：修改歌词与逐句起止时刻；句内高亮由 timeline.js 按字符长度推进。
- `film/src/ch/c01_lab.js…c09_finale.js → chapter(name,start,end,shots)`：修改九章镜头与注册区间；每个镜头 fn(t,lt,dur) 绘制完整画面。
- `film/src/core.js:3 → BPM / BEAT / OFF / BOIL / DUR`：修改节拍、偏移、时长与线条沸腾频率；同步根目录 index.html 中的 duration、fps 与 bpm。
- `film/src/timeline.js:11–12 → WIPES / WIPE_TR`：修改换章擦除位置与边界两侧各 0.3 秒的过渡。
- `film/src/timeline.js:14 → METER`：修改四段副歌的计量窗口与各段起止值。
- `film/src/clawd.js → eyes / hat / emote / mood`：修改角色眼型、帽子、符号与表情过渡。
- `film/src/cast.js`：修改 Researcher 等配角与舞步。
- `film/src/props.js`：修改幕布、舞台、打气筒与计量表道具。

对照结果见 [fidelity.md](../../demos/cases/pdoom-video/fidelity.md)。
