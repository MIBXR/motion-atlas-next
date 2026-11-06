# 点线化为条纹

## 实现 Prompt

以来源案例lemo-dataviz的原作render(t)重放“点线化为条纹”。同一组有年份对应关系的数据点先落向条纹带中心，再由小圆伸展为满高温度条；旧折线随左端数据点启动形变而消退，温度颜色与年份次序保持。 参数：mStart(y)=T(56)+(y−1926)/101×B×.85；各点前45%落到带中心，后55%ease-out伸高至−170—170，原折线alpha=1−clamp(mU(left)×3)。。按入口segments映射原片，复用原作素材、字体与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：36.600—39.400秒，1倍速。

[打开 Demo](../../demos/patterns/dots-morph-to-stripes/index.html) · [在库中查看](../../patterns.html#pattern/dots-morph-to-stripes)
