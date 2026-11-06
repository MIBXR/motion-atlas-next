# 实物上画尺寸

## 实现 Prompt

以来源案例lemo-teardown的原作render(t)重放“实物上画尺寸”。合拢后的键盘直接承载尺寸线：三维端点每帧投影，延伸线、端帽与沿线角度排版的数字逐步画出，数值取真实工程文件。 参数：键距19.05mm、宽138.4mm、深97.6mm、高11.1mm；dimP从27.5秒、dimW从28.125秒、dimD从28.75秒、dimH从29.375秒起。；dimension逐帧投影a/b与偏置向量，按p先画延伸线再画主线，数字放于暗底片上并修正角度以保持正向。。按入口segments映射原片，复用原作素材、字体与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：27.500—33.650秒，1倍速。

[打开 Demo](../../demos/patterns/dimensions-drawn-on-object/index.html) · [在库中查看](../../patterns.html#pattern/dimensions-drawn-on-object)
