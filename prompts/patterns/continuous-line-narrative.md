# 一线连续成景

## 实现 Prompt

复用来源案例的原作 window.renderAt(t)，按 index.html 内联配置 的 segments 以1倍速重放原片0–7.7秒，巧思时长7.7秒。描绘进度沿同一条连续路径推进，上一形象的尾线接成下一形象；枝端卷须保留路径点序，展开为水平屋梁后接入建筑。const STEP = 0.5; const CHUNK = 12;const tauOfT = monotone(DK.map((k) => k[0]), DK.map((k) => markerTau(k[1])), 1.3, 0);2.063–2.223秒；MX[i] = 358 + (S[i] - pieceStart.tendril); const MORPH = cues.morph; cubicBezier(0.65, 0, 0.35, 1)。7.5秒到达 arch>，连续线完成圆环与拱门。沿用原画面、字体与成品音轨，保持1920×1080、30fps；画面和音轨共用同一时刻映射，声音默认关闭。

## 参数

- **原片重放区间**：0–7.7秒，1倍速；巧思时长7.7秒。
- **路径采样**：const STEP = 0.5; const CHUNK = 12;
- **描绘进度**：const tauOfT = monotone(DK.map((k) => k[0]), DK.map((k) => markerTau(k[1])), 1.3, 0);
- **卷须成梁**：2.063–2.223秒；MX[i] = 358 + (S[i] - pieceStart.tendril); const MORPH = cues.morph; cubicBezier(0.65, 0, 0.35, 1)。
- **闭合节点**：7.5秒到达 arch>，连续线完成圆环与拱门。

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/continuous-line-narrative/index.html) · [在库中查看](../../patterns.html#pattern/continuous-line-narrative)
