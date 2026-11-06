# 斜切条带退场与字形入场

## 实现 Prompt

用来源案例lemo-spy-titles的原作render(t)重放“斜切条带退场与字形入场”。film.js把旧屋顶画面截成260px斜向条带，沿DIR交替滑出画外；新片名字形从1500px外按letterLand沿同一方向入场。保留23条、260px宽条带、.02秒空间延迟、.75秒退场、2600px距离，以及字形1500px入场距离、.42秒落字时长、40px片名切缝。沿30°切线组织132BPM的拆景与逐字落点，按index.html的segments重放31.0–34.2秒，画面与原片音轨共用同一时间映射，声音默认关闭。

## 参数

- **原片重放区间**：31.0–34.2秒；1倍速，总时长3.2秒。

[打开 Demo](../../demos/patterns/diagonal-strip-shatter-title/index.html) · [在库中查看](../../patterns.html#pattern/diagonal-strip-shatter-title)
