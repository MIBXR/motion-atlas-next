# 东窗之龙 · 彩色玻璃窗

## 实现 Prompt

制作一支彩色玻璃窗代码影片。阳光沿四格东窗从清晨走向黄昏，依次唤醒骑士寻龙的故事；一剑击裂玻璃后，他发现龙在守护太阳余烬，按拍修补铅条、放下长剑，夜里最后一格仍然发光。光的颜色、位置和长度就是时间；同一花窗透到石地的光斑承接决斗，裂纹和重铅改变故事结局。钴蓝#1d3a9c与红宝石#a8101c为主，金#dc9a22与少量绿、紫；余烬#ff9a2a成为夜间光源。1920×1080；四条竖向尖拱窗并列，上方玫瑰窗作太阳钟，下方石刻字带，光斑落在不规则石板地面。人物8fps硬片动作，光与镜头24fps；离光的窗格冻结，裂纹在.28秒延伸，剑腿身臂分组按拍修补。字体：Cinzel 600/700石刻标题，IM Fell English 400卷轴字幕；Cormorant Garamond和Uncial Antiqua用于原作模型页。声音：Kokoro bf_alice故事旁白；D多利亚调管风琴、竖笛、竖琴、玻璃与钟采样；裂玻璃、铅条摩擦和焊接拟音。按film目录的原作render(t)组织镜头与动作，采用MotionKit时间线逐帧定位，声音默认关闭。

## 动效 Token

- **光与时间**：film/story.js:28–52：sunU走过LX[0..3]；roseI=.45→1.3→.95→.65→0，人物在lancetI/II/III的离光时间停格。
- **裂纹与重铅**：film/story.js:77–143：9条主裂纹与分支，.28秒展开；WELDS=[41.75,42.5,43.25,44,44.6]，修复后以3.2单位铅线保留裂痕。

## 制作约束

- 改字体与文案时按原作字体载入和子集范围同步取得资源。
- 图形、着色器与时间线通过film内原作render(t)绘制，音轨沿用成片混音。

## 迁移

- `film/story.js → light / camera / WELDS`：修改太阳、镜头、故事动作与修补时刻。
- `film/window.js / knight.js / dragon.js`：修改花窗布局、人物剪片和姿态。
- `film/comp.js / glass.js`：修改透光、玻璃纹理、石地与投影。

[打开 Demo](../../demos/cases/lemo-stained-glass/index.html) · [在库中查看](../../cases.html#case/lemo-stained-glass)
