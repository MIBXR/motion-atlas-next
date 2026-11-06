# 锚点拉远显载体

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-paperclip 原片 6.8–8.2 秒；总时长 1.4 秒。以屏幕空间锚点约束两段拉远和旋转，先露局部屏幕，再揭示全部内容都在一部手机内。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-paperclip 原片 6.8–8.2 秒；1 倍速，巧思时长 1.4 秒。
- **锚点拉远显手机**：L79: const EASE={fly:eFly,pull:ePull,pullA:bez(.3,0,.1,1),pullB:bez(.42,0,.22,1),hold:u=>u*u*(3-u)/2};；L85: const z=Math.exp(lerp(Math.log(s.a.z),Math.log(s.b.z),e)),r=lerp(ra,rb,e)+(s.b.swing||0)*Math.sin(Math.PI*e);

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/anchor-pullback-phone/index.html) · [在库中查看](../../patterns.html#pattern/anchor-pullback-phone)
