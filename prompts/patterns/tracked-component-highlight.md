# 部件追色

## 实现 Prompt

复用来源案例lemo-chalkboard的原作render(t)，重放“部件追色”。将同一部件的笔画固定为橙色，甲骨、金文、小篆和楷书按时间线依次书写；字形和镜头变化时，橙色保持对应部件与相对高度，随后追到短字中的矢。参数与源码：film/js/ancient.js:9–46：FORMS每条线的o标记选orange，坐标以100×100字格变换；楷书0–6笔沿用orange。；film/js/film.js:130–144按FX/FY书写四形；151的writeChar(短)把0–4笔着橙，164–169把箭放到尺线上。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：18.5–28.7秒；28.7–33.5秒；1倍速，总时长15.000000秒。

[打开 Demo](../../demos/patterns/tracked-component-highlight/index.html) · [在库中查看](../../patterns.html#pattern/tracked-component-highlight)
