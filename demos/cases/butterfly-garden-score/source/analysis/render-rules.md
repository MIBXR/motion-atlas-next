# 绘制规则

坐标为 1920×1080。音符全局横坐标以视频 0s 的播放头为原点，screenX = globalX − 190t + 880。以下 JSON 是离线复绘脚本的数值输入；notes.json 的 samples 保存原帧采样的颜色与厚度。

```json
{
  "speed": 190,
  "playhead": 880,
  "backgrounds": {"white": [255,255,255], "red": [232,8,39]},
  "colors": {
    "white": {"woodwind":[24,24,24],"brass":[166,149,93],"percussion":[24,24,24],"strings":[232,8,39]},
    "red": {"woodwind":[255,255,255],"brass":[255,234,181],"percussion":[0,0,0],"strings":[255,211,217]}
  },
  "opacity": {"past":0.60,"current":1.0,"future":0.30},
  "pixelDifferenceThreshold": 16
}
```

矩形与线均为圆端，端部半径为厚度的一半；dot 为圆点。yOffset 是相对行中心的实测偏移。

## 数值测量

普通谱面横向速度为 190 px/s（每帧 3.166667 px）；不同小节的持续帧数改变，卷轴速度保持不变。音符横坐标存至 0.5px，首尾时间由横坐标除以 190 换算。

行中心：Fl.=242；Ob.=274；Cl.=306；Bsn.=338；Hn.=382；Trp.=414；Trb.=446；Cym.=490；Mar.=522；Pf.=554；Hp.=586；Vln. I=630；Vln. II=662；Va.=694；Vc.=726；Cb.=758。

音符主体是圆端矩形，dot 为圆点。notes.json 的 thickness 为常态厚度，samples.thickness 为该帧厚度；正在发声的 bar 在缺少同帧采样时用常态厚度加 2px。相邻音高间的几何偏移见 yOffset；谱面未给出各行音高零点与八度。

| 背景 | 音色组 | 状态 | 透明度中值 | 10–90% | RGB 中值 | 样本数 |
| --- | --- | --- | --- | --- | --- | --- |
| white | woodwind | past | 0.57205 | [0.56277, 0.90814] | [122.0, 122.0, 122.0] | 1182 |
| white | woodwind | current | 1.02183 | [0.66693, 1.02183] | [19.0, 19.0, 19.0] | 97 |
| white | woodwind | future | 0.31441 | [0.31004, 0.31878] | [181.0, 181.0, 181.0] | 1193 |
| white | brass | past | 0.57159 | [0.42363, 0.85493] | [202.5, 192.0, 160.0] | 136 |
| white | brass | current | 1.01947 | [1.00556, 1.02699] | [166.0, 147.0, 89.5] | 42 |
| white | brass | future | 0.30706 | [0.29544, 0.332] | [224.0, 222.0, 204.0] | 117 |
| white | percussion | past | 0.29694 | [0.28967, 0.4818] | [187.0, 185.0, 183.0] | 2295 |
| white | percussion | current | 0.52984 | [0.1684, 0.54731] | [134.5, 132.0, 130.0] | 58 |
| white | percussion | future | 0.16157 | [0.16157, 0.17031] | [216.0, 216.0, 216.0] | 2357 |
| white | strings | past | 0.51026 | [0.46056, 0.82921] | [225.0, 129.0, 142.0] | 2138 |
| white | strings | current | 0.96575 | [0.38229, 1.00002] | [203.0, 20.0, 46.0] | 280 |
| white | strings | future | 0.27042 | [0.24907, 0.30497] | [235.0, 187.0, 196.0] | 2090 |
| red | woodwind | past | 0.54231 | [0.34149, 0.76489] | [246.0, 142.0, 156.0] | 560 |
| red | woodwind | current | 0.98478 | [0.13835, 0.99869] | [253.0, 251.0, 250.0] | 53 |
| red | woodwind | future | 0.298 | [0.27454, 0.31992] | [240.0, 82.0, 103.0] | 425 |
| red | brass | past | 0.54974 | [0.46162, 0.82252] | [245.0, 134.0, 120.0] | 228 |
| red | brass | current | 0.97488 | [0.45756, 0.98823] | [254.0, 230.0, 175.5] | 24 |
| red | brass | future | 0.30484 | [0.29238, 0.33021] | [240.0, 75.0, 85.0] | 161 |
| red | percussion | past | 0.41573 | [0.25604, 0.63252] | [136.0, 3.0, 20.0] | 744 |
| red | percussion | current | 0.57595 | [0.31712, 0.75529] | [99.0, 4.0, 14.0] | 15 |
| red | percussion | future | 0.22351 | [0.21236, 0.23661] | [181.0, 5.0, 26.0] | 560 |
| red | strings | past | 0.50538 | [0.35573, 0.77806] | [253.0, 118.0, 131.0] | 561 |
| red | strings | current | 0.96319 | [0.52664, 0.9913] | [255.0, 208.0, 206.5] | 58 |
| red | strings | future | 0.2869 | [0.24919, 0.3135] | [243.0, 68.0, 89.0] | 345 |

距离以音符中心减播放头计算，负值位于过去侧；跨播放头的长音符归为 current。以下是白底木管的距离分箱实测值。

| 距离 px | 状态 | 透明度中值 | RGB 中值 | 样本数 |
| --- | --- | --- | --- | --- |
| [-600, -300] | past | 0.56769 | [123.0, 123.0, 123.0] | 647 |
| [-300, -100] | past | 0.57205 | [122.0, 122.0, 122.0] | 378 |
| [-300, -100] | current | 1.02183 | [19.0, 19.0, 19.0] | 12 |
| [-100, -20] | past | 0.95633 | [34.0, 34.0, 34.0] | 141 |
| [-100, -20] | current | 1.02183 | [19.0, 19.0, 19.0] | 12 |
| [-20, 20] | past | 1.02183 | [19.0, 19.0, 19.0] | 16 |
| [-20, 20] | current | 1.02183 | [19.0, 19.0, 19.0] | 54 |
| [-20, 20] | future | 0.31441 | [181.0, 181.0, 181.0] | 11 |
| [20, 100] | current | 1.02183 | [19.0, 19.0, 19.0] | 10 |
| [20, 100] | future | 0.31441 | [181.0, 181.0, 181.0] | 151 |
| [100, 300] | current | 1.02183 | [19.0, 19.0, 19.0] | 9 |
| [100, 300] | future | 0.31441 | [181.0, 181.0, 181.0] | 402 |
| [300, 600] | future | 0.31441 | [181.0, 181.0, 181.0] | 629 |

完整采样在 frames/opacity-samples.json。透明度随进入发声区间而变，过去与未来具有不同基值；单一按距离函数不能解释所有行与反色状态。复绘优先使用同帧采样，缺采样时用文件开头的分段值。

## 活跃行与底部图标

普通镜头中，活跃行短杠位于 x=168–172、y=行中心±9；短杠与行名同时使用当前强调色，白底下行名变为黑色。发声行有一个或多个音符跨过播放头时亮起；淡入淡出边界见 frames/active-row-events.json。聚焦镜头重排行名位置。

| 图标顺序 | 乐器 | 选中帧区间 | 时刻 s | 下划线 |
| --- | --- | --- | --- | --- |
| 1 | Ob. | 459–574 | 7.650000–9.566667 | [1186, 990, 1210, 993] |
| 2 | Va. | 574–919 | 9.566667–15.316667 | [1229, 990, 1253, 993] |
| 3 | Hn. | 919–1378 | 15.316667–22.966667 | [1272, 990, 1296, 993] |
| 4 | Cl. | 1378–1493 | 22.966667–24.883333 | [1315, 990, 1339, 993] |
| 5 | Hn. | 1493–1839 | 24.883333–30.650000 | [1358, 990, 1382, 993] |
| 6 | Fl. | 1839–3735 | 30.650000–62.250000 | [1401, 990, 1425, 993] |
| 7 | Ob. | 3735–3852 | 62.250000–64.200000 | [1444, 990, 1468, 993] |
| 8 | Cl. | 3852–5355 | 64.200000–89.250000 | [1487, 990, 1511, 993] |
| 9 | Cl. | 5355–7014 | 89.250000–116.900000 | [1530, 990, 1554, 993] |

选中项在九次动机开始发声时依次推进，下一项开始前保持选中。0–7.65s 和 116.9s 后无下划线；全局反色渐变过程中线色与背景混合，短暂低于检测阈值。图标条中心 x=[1198, 1241, 1284, 1327, 1370, 1413, 1456, 1499, 1542]，图标区 y=926–965，标签基线约984，下划线 y=990–993。

## 顶部进度与十字指针

进度底线从 (40,177) 到 (1560,177)，厚约 2px。七个分段刻度 x=[79, 282, 383, 590, 809, 1088, 1307]，y=170–184，分别对应第 [3, 11, 15, 23, 32, 43, 50] 小节。填充端点 x=clip(13.21796535t+14.55407487,40,1560)，原始端点采样在 frames/progress-measurements.json。

下方十字指针锚点为 (880,822)，长横臂约84px，短竖臂约22px，白底红色、红底白色。5–20s 主方向角的 [min,p5,median,p95,max] 为 [-4.14779, -0.3648, -0.33455, 0.0, 6.04275]°，主频约 0.4667Hz。逐帧角度、包围盒与质心在 frames/cross-motion.json；其他时段随实际小节节奏有变化。

## 注释元素

注释沿卷轴运动时使用 screenX=globalX−190t+880；聚焦镜头按 shots.json 的每行矩阵变换。下表的来源位置是该帧的屏幕坐标，时间含由画面观察或滚动坐标推算的条目。

| 注释 | 来源帧 / 时刻 | 来源位置 | 出现 / 结束帧 | 动画 |
| --- | --- | --- | --- | --- |
| motif-1: M¹ | 480 | [794, 204, 1044, 304] | 238 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| motif-2: M² | 600 | [778, 516, 1028, 616] | 353 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| motif-3: M³ | 960 | [730, 312, 980, 412] | 698 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| motif-4: M⁴ | 1410 | [759, 236, 1009, 336] | 1157 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| motif-5: M⁵ | 1530 | [743, 312, 993, 412] | 1272 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| motif-6: M⁶ | 1860 | [794, 172, 1044, 272] | 1618 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| motif-7: M⁷ | 3750 | [812, 204, 1062, 304] | 3514 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| motif-8: M⁸ | 3870 | [803, 236, 1053, 336] | 3631 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| motif-9: M⁹ | 5400 | [718, 447, 968, 547] | 5134 / 随动机卷出 | bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed |
| ostinato-12: ostinato ×12 | 480 | [267, 485, 622, 513] | 139 / 507 | text and bracket translate with scroll; Mar./Pf. alternating short bars repeat; hidden by Ob./Va. focus |
| b-natural-circle: B♮ · ♯4 | 480 | [502, 699, 597, 736] | 143 / 507 | circle and label translate with the Vc. pizzicato dot |
| mf-giocoso: mf giocoso | 480 | [265, 780, 348, 806] | 139 / 507 | scrolls along dyn. row with fixed baseline about798 |
| dynamic-opening-wedge:  | 180 | [180, 789, 420, 803] | 139 / 287 | wedge widens toward f and moves with score |
| unison-and-ab: unis. Fl. · Cl. · Vn.II / 𝄆 a / b 𝄇 ×2 | 900 | [375, 218, 905, 287] | 516 / 1209 | section brackets and a/b text scroll; dotted repeat boundaries descend across rows |
| leggiero: leggiero: 第 11–14 小节的叹息音型，移到了小提琴 | 3720 | [465, 509, 1000, 593] | 3406 / 4419 | three rising curved lines end in dots; growing curves accompany Vln. I figures |
| clarinet-inversion-outline: M⁹ | 5400 | [950, 367, 1620, 476] | 5289 / 5589 | hollow rounded bars above the filled clarinet melody show the interval inversion; focus matrix changes their scale |
| motif-connection-arcs:  | 900 | [200, 218, 1250, 750] | 287 / 5589 | dashed curved connections join successive motif entries; approximately 1.5px stroke, dash about7px with7px gaps |
| other-dynamics: f · espressivo / mp dolce / f dolce / mf / p / cresc. | [1320, 1800, 3720, 4800, 5100, 6000] | dyn. | 1209 / 7014 | italic dynamic labels and cresc./dim. wedges translate with score; wedge endpoints grow or shrink |

注释的坐标、动机数字点亮帧与17点横向位移采样在 frames/annotations.json。逐项时间依据在 timeEvidence；由卷轴位置推算的出现帧与未恢复的曲线路径在 report.md 列明。M⁷ 的可见数字为 7 1 3 7 5，M⁸ 在所取原帧中没有数字，M⁹ 为 1 7 5 3。

音高的相对几何：M¹、M⁴、M⁶ 的 7 1 3 5 与 M⁹ 的 1 7 5 3，按实际半音间距拟合，每升高一个半音 y 减少 0.798780px，拟合 RMS 0.0828px；设计步长约0.8px/半音。各动机偏移取样在 frames/pitch-geometry.json，绝对音高及八度没有零点标注。
