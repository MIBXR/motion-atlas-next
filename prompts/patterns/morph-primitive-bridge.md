# 简形桥接连续变形

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-morph 原片 0.8–8.8 秒；总时长 8 秒。主体、孔洞与子件经圆或胶囊中介连续变形，同时位移、旋转并挤压回弹。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-morph 原片 0.8–8.8 秒；1 倍速，巧思时长 8 秒。
- **简形桥接连续变形**：L40: const EM = bez(0.7, 0, 0.3, 1);；L58: const NB = 240, NH = 72, NM = 24, NS = 60;；L276: 'sun>sunset':   { rot: 0, ctrl: [0, 0], sq: 0.05 },

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/morph-primitive-bridge/index.html) · [在库中查看](../../patterns.html#pattern/morph-primitive-bridge)
