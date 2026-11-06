# 形体落位成字标

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-morph 原片 8.1–9.3 秒；mg-aurora-glass 原片 6.7–10 秒；总时长 4.5 秒。主体形状飞到字位、开合成字标中的一个字母，其余字母随后显现；先重放圆环伸展为 morphe，再重放透镜开成 Aurora 的 o。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-morph 原片 8.1–9.3 秒；mg-aurora-glass 原片 6.7–10 秒；1 倍速，巧思时长 4.5 秒。
- **圆环伸展成字标**：L614: const MB = { t0: 8.30, t1: 8.6, arches: [[571.5, 497], [650, 497]], Ro: 55.5, Ri: 22.5,；L683: const LANE = [352, 352, 346, 340, 296, 290], _lp = {};
- **透镜落入字母**：L533: const WORD_SIZE = 178, WORD_BASE = 596, WORD_TRACK = 4;；L565: const LETTER_T = [0.3, 0.15, 0.0, null, 0.02, 0.17].map((d) => d === null ? null : cues.word + d);；L595: { t: SETTLE, v: [O_CX, O_CY], m: [0, 0] },；L598: const lensHY = keysS([[5.95, 110], [6.45, 122], [T_FREE, 106], [7.7, 88], [SETTLE, O_R]], eSine);；L672: const wave = [700 * eOutSine(kw), 0.11 * Math.pow(1 - kw, 0.8) * wk, 6.5 * Math.pow(1 - kw, 0.45) * wk];

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/shape-docks-wordmark/index.html) · [在库中查看](../../patterns.html#pattern/shape-docks-wordmark)
