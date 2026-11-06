# 显微俯冲

## 实现 Prompt

用来源案例的原作render(t)实现“显微俯冲”。镜头沿对数螺旋连续推入真实玻片的组织、结节和细胞核，影像金字塔按像素密度衔接，焦面扫过后在细胞核外缘画出量测圆环。保留参数：film/film.js:key / KEYS / camAt，以复数相似变换M^u围绕固定点插值，视野68000→9200→2700→345µm，roll与变焦同步。；film/film.js:plateAlpha / activeLevel，ORDER=a8/a4/a2/c1/c05/c025，FULL=1.45、NONE=2.2像素密度阈值。；film/film.js:focus / nucleus，T.land=29.3333附近软焦前沿从−300移到2440px；nucleus.json的外缘拟合圆提供8.5µm直径。。按index.html内联segments定位原片，复用原作素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-microscope：2.67–10.67秒；lemo-microscope：26.67–32.67秒；1倍速，总时长14.000000秒。

[打开 Demo](../../demos/patterns/microscope-dive/index.html) · [在库中查看](../../patterns.html#pattern/microscope-dive)
