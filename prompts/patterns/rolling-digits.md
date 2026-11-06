# 滚动数字与文字

## 实现 Prompt

实现当前 archive-os 的逐字符滚动：直接裁出案例 bundle 中的滚动库，使用 createRollingNumber/createRollingText，duration:460、motionBlur:true，文字 transition:direct、stagger:none。每个字符建独立 slot/reel/face，临界阻尼使用 49 点及 exp(-10h)；连续更新必须先通过 Bs.read 读取当前动画位置和速度，再向最新目标接续。数字按照上下、左右输入方向滚动；文字使用默认正向。数字 --rn-blur 为 0.35，文字为 0.2，SVG Gaussian blur 随字高和速度变化。档案数据保存在 mechanism/archives.json，字体引用 ../../cases/archive-os/film/app/fonts/，声音引用 ../../cases/archive-os/audio/film-audio.ogg。自动驾驶复用案例 62.6 秒后的四向输入，9 秒及 9.35 秒连续切列；真实输入接管，seek 恢复自动驾驶；默认静音并支持减少动态。

## 视频生成 Prompt

制作档案 HUD 的 13 秒滚轮片段，时间与 archive-os 的 62.6–75.6 秒对应。显示当前 RHINE LAB 档案的 X- 编号、行列号、中文标题、权限和列名；每次选择以 460ms 临界阻尼逐字符翻动，9 秒与 9.35 秒连续切列时保持当前位置和速度。保留 MiSans、浅灰底、字高相关速度模糊与案例原声音片段。

## 负向约束

不要 outCubic，不要整行文字滑入淡出，不要从上一次目标重启，不要固定像素正弦模糊，不要让文字与数字强制共用方向，不要 LUMEN 或固定 X-017 旧档案，不要跨目录读取案例。

## 参数

- **方向**：编号、行号与列号按导航方向；文字默认正向

[打开 Demo](../../demos/patterns/rolling-digits/index.html) · [在库中查看](../../patterns.html#pattern/rolling-digits)
