# 卡片穿焦起落

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-aurora-glass 原片 0–8.8 秒；总时长 8.8 秒。卡片从纵深与下方倾斜进入并衰减回摆，浮动后沿独立轴向退开，失焦先于离场。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-aurora-glass 原片 0–8.8 秒；1 倍速，巧思时长 8.8 秒。
- **卡片穿焦起落**：L472: const tilt = 20 * Math.exp(-3.2 * tau) * Math.cos(3.6 * tau);；L475: let y = c.base[1] + 70 * (1 - e) + fl[0] + c.drift[1] * eo;；L476: let z = c.base[2] + 560 * (1 - e) + c.drift[2] * eo;；L506: const defocus = 0.5 + 16 * dfk;

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/card-depth-arrival-parting/index.html) · [在库中查看](../../patterns.html#pattern/card-depth-arrival-parting)
