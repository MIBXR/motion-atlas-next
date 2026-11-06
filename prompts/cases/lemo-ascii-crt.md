# 静海日志 · ASCII / CRT 终端

## 实现 Prompt

制作一支ASCII / CRT 终端时间线影片。月球中继机沉默四十年后收到地球来信，把“I AM STILL HERE.”拆成字符地出图，推入一个由日志构成的字母，最后拉远到空无一人的月球房间并关机。墨量决定字符的图像位置，字格大小承担镜头；匀速机器打字、手动来信和三次光标闪烁组织等待。画面构成：暗玻璃、P3琥珀与地球蓝白#BFE4FF。；VT323等宽字图集；片名、正文、字符画与LOG字幕使用同一家族。；1920×1080；终端安全区和底部固定LOG条分离。；离屏灰度场按墨量转为真实字母；WebGL2合成磷光、扫描线和弧面。；连续字格缩放、离散打字与粒子落位，关机压成线点。；原片模拟合成器配乐、机械键盘、调制解调器、继电器与Kokoro机器旁白。；100BPM，三次光标停顿后回复，字符落位与一次换色形成峰值。；同一回复既是台词也是地出图的全部字母来源。。实现入口为demos/cases/lemo-ascii-crt/film/，MotionKit适配层仅调用并等待原作render(t)，使用原片音轨同步播放。

## 动效 Token

- **字粒子**：film/main.js:buildFall / partPos / sFall：33.6秒拆分；18px→8px；落位闪光1.9倍，.12秒衰减。
- **字内镜头**：film/main.js:fractalCW / sFractal：8→300→450px，K=40；40.2–47.6秒。
- **显像管**：film/crt.js:COMP；film/main.js:T：.35–1.05秒开机，58.6–59.2秒关机。

## 制作约束

- 保持VT323字体与图集墨量测量一致。
- 字格中心使用cw×2的行高。
- 主画面和字幕使用同一显像管后期。

## 迁移

- `film/main.js:buildFall / partPos / sFall`：修改该处的字粒子参数。
- `film/main.js:fractalCW / sFractal`：修改该处的字内镜头参数。
- `film/crt.js:COMP；film/main.js:T`：修改该处的显像管参数。

[打开 Demo](../../demos/cases/lemo-ascii-crt/index.html) · [在库中查看](../../cases.html#case/lemo-ascii-crt)
