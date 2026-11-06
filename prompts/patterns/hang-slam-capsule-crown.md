# 悬球砸落冠波

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-3d-render 原片 4.8–8.2 秒；总时长 3.4 秒。金属球进入并减速悬停 → 急砸软床触发镜震和径向胶囊翻跳，冠波顶点放慢后追上时钟，最后沉降。直接调用来源案例的 renderAt(t)，保留原画面、字体、素材、时刻映射和同段音轨，声音默认关闭。参数：herm(ts, HB, TC, 0.80, 0.0, -1.4, -30.0)
t_launch = TC + rr_ / CS
k_spin = np.where(v0 > 4.2, 3, 1)
_w = 1 - 0.65 * _plateau(_tt, 6.42, 6.48, 6.70, 6.76)
const pun = df >= 0 ? 0.035 * (1 - expoOut(df / 6)) : 0;
const shk = [2, -1.5, 1, -0.5][df] || 0;。使用 1920×1080 横屏。

## 参数

- **原片重放区间**：mg-3d-render 原片 4.8–8.2 秒；1 倍速，总时长 3.4 秒。
- **悬球砸落冠波**：herm(ts, HB, TC, 0.80, 0.0, -1.4, -30.0)
t_launch = TC + rr_ / CS
k_spin = np.where(v0 > 4.2, 3, 1)
_w = 1 - 0.65 * _plateau(_tt, 6.42, 6.48, 6.70, 6.76)
const pun = df >= 0 ? 0.035 * (1 - expoOut(df / 6)) : 0;
const shk = [2, -1.5, 1, -0.5][df] || 0;

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/hang-slam-capsule-crown/index.html) · [在库中查看](../../patterns.html#pattern/hang-slam-capsule-crown)
