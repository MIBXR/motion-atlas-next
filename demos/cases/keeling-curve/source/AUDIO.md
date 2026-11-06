# 基林曲线声音

本 Demo 播放 [audio/final.wav](../audio/final.wav)：20 秒、48 kHz、立体声、16-bit PCM，来自作品的最终混音，与成片 `final.mp4` 使用同一音轨。声音默认关闭，由适配层与画面时间同步。全片只有一条连续音乐与三个音效，无口播、TTS 或额外合成声部。

## 音乐

| 项目 | 内容 |
| --- | --- |
| 曲名／作者 | Dreams Become Real / Kevin MacLeod（Incompetech） |
| 官方曲页 | [ISRC USUAN1500027](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1500027) |
| 原曲文件 | [Dreams Become Real.mp3](https://incompetech.com/music/royalty-free/mp3-royaltyfree/Dreams%20Become%20Real.mp3) |
| 许可 | [Creative Commons Attribution 4.0](http://creativecommons.org/licenses/by/4.0/)（CC BY 4.0） |
| 截取 | 原曲 **7.162–27.162 秒**，连续 20 秒，保留原曲速度 |
| 淡入 | 片内 **0.000–0.100 秒**，线性振幅淡入 |
| 淡出 | 片内 **18.500–20.000 秒**，线性振幅淡出至无声 |
| 修改说明 | 截取、淡入淡出、设置混音增益，与三处音效混音并作母带处理 |

官方署名原文如下，另存于 [audio/Kevin-MacLeod-CC-BY-4.0.txt](../audio/Kevin-MacLeod-CC-BY-4.0.txt)：

```text
"Dreams Become Real" Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/
```

片尾保留：`音乐：“Dreams Become Real” Kevin MacLeod（incompetech.com）· CC BY 4.0`。

## 三个音效

时刻指片内主要瞬态目标，原文件起点已按其瞬态偏移提前。原 OGG 来自官方素材包；混音只解码、设增益和偏移。

| 事件 | 素材文件 | 所属包／许可 | 瞬态目标 | 混音播放起点 |
| --- | --- | --- | ---: | ---: |
| 第一笔 | `impactWood_light_001.ogg` | [Kenney Impact Sounds 1.0](https://kenney.nl/assets/impact-sounds)，CC0 | 0.500 秒 | 0.499104167 秒 |
| 2025 峰值 430.51 | `impactSoft_medium_000.ogg` | Kenney Impact Sounds 1.0，CC0 | 10.346 秒 | 10.341229167 秒 |
| 数据来源落版 | `click1.ogg` | [Kenney UI Audio](https://kenney.nl/assets/ui-audio)，包内名 UI SFX Set，CC0 | 17.300 秒 | 17.280687500 秒 |

两包的 `License.txt` 保持原字节，分别位于：

- [audio/kenney-impact-sounds/License.txt](../audio/kenney-impact-sounds/License.txt)
- [audio/kenney-ui-audio/License.txt](../audio/kenney-ui-audio/License.txt)

两包均为 [Creative Commons Zero 1.0](http://creativecommons.org/publicdomain/zero/1.0/)。署名不强制；包内相关原文为：

```text
Impact Sounds (1.0)
Created/distributed by Kenney (www.kenney.nl)
License: (Creative Commons Zero, CC0)
http://creativecommons.org/publicdomain/zero/1.0/
This content is free to use in personal, educational and commercial projects.
Support us by crediting Kenney or www.kenney.nl (this is not mandatory)
```

```text
UI SFX Set
by  Kenney Vleugels (Kenney.nl)
License (Creative Commons Zero, CC0)
http://creativecommons.org/publicdomain/zero/1.0/
You may use these assets in personal and commercial projects.
Credit (Kenney or www.kenney.nl) would be nice but is not mandatory.
```

## 时间与混音口径

名义速度为 60 BPM。音乐拍点来自 `candidate-1-beats-60.json`，减去原曲切入点 7.162 秒；不将视觉时间表当作音乐拍点。三个固定事件最近的音乐拍点为 0.477、10.369、17.289 秒，拍点相对事件偏差分别为 −23、+23、−11 ms。

混音由 motion-showreel 原工具输出，最终 WAV 的既有技术记录为 −14.5 LUFS、LRA 2.5 LU、真峰值 −1.5 dBTP。三个音效在各自瞬态中心 100 ms 的立体声 K 加权 RMS 窗口内，相对同刻音乐的母带后估计为 −3.412、−2.999、−3.043 dB；该短窗量测不是人工听感结论。母带后第三声瞬态估计为 17.299521 秒，其余两声为 0.500000、10.346000 秒。30fps 成片的首可见事件帧为 0.500000、10.366667、17.300000 秒，最大声画偏差 20.667 ms，小于一帧。

## 制作输入与重混

以下路径相对本 `source/` 目录，音源与分轨取自本作品的制作工作区：

| 路径 | 用途 |
| --- | --- |
| `audio/candidates/Dreams Become Real.mp3` | Incompetech 公开下载的完整原曲，与音乐分轨沿用[现有署名与 CC BY 4.0 许可](../audio/Kevin-MacLeod-CC-BY-4.0.txt) |
| `audio/candidates/candidate-1-beats-60.json` | 原曲的 60 BPM 拍点输入 |
| `audio/kenney/impact-sounds/Audio/impactWood_light_001.ogg`、`impactSoft_medium_000.ogg` | 前两个事件的原始音效，沿用[现有 Impact Sounds 许可](../audio/kenney-impact-sounds/License.txt)，副本为同包 `License.txt` |
| `audio/kenney/ui-audio/Audio/click1.ogg` | 来源落版的原始音效，沿用[现有 UI Audio 许可](../audio/kenney-ui-audio/License.txt)，副本为同包 `License.txt` |
| `audio/bgm.wav`、`audio/sfx.wav` | 最终混音使用的 20 秒、48 kHz 立体声、24-bit PCM 母带前音乐与音效分轨 |
| `audio/production.json` | 原曲截取、淡入淡出、三声播放起点与增益、最终混音参数 |

在仓库根目录运行以下制作命令，`<工作区项目>` 为仓库外的输出目录。它使用[素材快照中的原混音工具](../../../materials/motion-showreel/scripts/narration.mjs)，读取保留的两条分轨，输出 `<工作区项目>/audio/final.wav`：

```bash
node demos/materials/motion-showreel/scripts/narration.mjs mix <工作区项目> --bgm demos/cases/keeling-curve/source/audio/bgm.wav --bgm-source user --bgm-gain 1 --sfx demos/cases/keeling-curve/source/audio/sfx.wav --sfx-source user --sfx-gain 1 --narration none --duration 20
```

制作工具执行两轨混音、限制与响度处理；原始音源重新制作分轨时，按 `production.json` 的截取、淡变、偏移和增益设置。
