# 拆件引线联动

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-paperclip 原片 0.98–2.6 秒；总时长 1.62 秒。部件从手机位置沿弧线飞到分解位，引线从锚点生长，端点与双语标签依次展开。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-paperclip 原片 0.98–2.6 秒；1 倍速，巧思时长 1.62 秒。
- **拆件引线联动**：L169: p.land=EV.parts[i]; p.lt=EV.leaders[i];；L198: const x=lerp(src.x,p.x,e), y=lerp(src.y,p.y,e)-arc*60; const w=wob(t-p.land,4,9);；L202: const lu=P(t,p.lt,.28);p.line.setAttribute('stroke-dashoffset',1-oC(lu));

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/explode-parts-leaders/index.html) · [在库中查看](../../patterns.html#pattern/explode-parts-leaders)
