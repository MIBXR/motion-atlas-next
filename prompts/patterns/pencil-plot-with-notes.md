# 铅笔逐点描图加手写批注

## 实现 Prompt

以来源案例lemo-dataviz的原作render(t)重放“铅笔逐点描图加手写批注”。双头铅笔逐点描出真实温度序列；1926、1933、1958的蓝色人生批注钉在数据空间，1998与2026的红色记录批注回应升温，破框时铅笔抬起并翻到红头。 参数：K.write1926=[1.4,3.3]、write1933=[14.25,15.35]、write1958=[28.25,29.75]；break1=40拍，flip=[40.5,41]拍，write1998=[41.5,43]拍。；penAt读取逐点和annotation活动；flip=eio(seg(k,40.56,40.94))；handText按字形旋转±1.7°、基线±2.5%并挖去16%像素。。按入口segments映射原片，复用原作素材、字体与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：0.000—10.600秒；18.700—31.000秒；32.000—34.700秒，1倍速。

[打开 Demo](../../demos/patterns/pencil-plot-with-notes/index.html) · [在库中查看](../../patterns.html#pattern/pencil-plot-with-notes)
