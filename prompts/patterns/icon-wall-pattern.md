# 图标墙成纹

## 实现 Prompt

复用来源案例lemo-pictogram-motion的原作render(t)，重放“图标墙成纹”。313把伞在规则货架上从主伞向外撑开，按行变成同一黄系，整行交替错移半格；打开的伞冠成为网格半圆纹样。参数与源码：film/film.js:476–512：20列×16行，格90；ITEMS七格为手套等杂物，其余313格是伞，主伞位于[11,7]。；film/film.js:643–655：open延迟hypot(i−11,j−7)*.014、时长.32；变色37.5+j*.07起、时长.3；39/39.5/40秒整行交替移45。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：36.200000–40.500000秒；1倍速，共4.300000秒。

[打开 Demo](../../demos/patterns/icon-wall-pattern/index.html) · [在库中查看](../../patterns.html#pattern/icon-wall-pattern)
