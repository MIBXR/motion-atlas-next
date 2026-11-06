# 图符成真

## 实现 Prompt

复用来源案例lemo-blueprint的原作render(t)，重放“图符成真”。纸上的修订云线保留同一云轮廓，转成有统一体积渐变、光晕与投影的实体云，原位置留下未曝光痕迹。参数与源码：film/sheet.js:143–211的revCloud：15个轮廓波瓣与4个内瓣，以union统一填渐变；高光、union减位移蒙版与阴影由pf/lift驱动。；film/film.js:171–184、241–286：revision/cloud参数驱动；B(14)=28.888889秒，B(15)=31.111111秒接住云。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：27.500000–31.700000秒；1倍速，共4.200000秒。

[打开 Demo](../../demos/patterns/symbol-becomes-real/index.html) · [在库中查看](../../patterns.html#pattern/symbol-becomes-real)
