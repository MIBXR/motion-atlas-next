# 转调红白反色

## 实现 Prompt

用来源案例 butterfly-garden-score 的原作 renderAt(t) 重放“转调红白反色”。保留 [3,6] 虚线转调竖线与文字标记随卷轴滚入，到达播放线后 q 在约 1 秒内 0→1，经粉色把底、行线、行名、音符一并反色，场次与调号同步切换；27.7 秒再以同一曲线退回白底。按 index.html 内联配置的 segments 定位 19.8–21.5、27.2–29.2 秒，复用原作数据、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：butterfly-garden-score：19.8–21.5秒；butterfly-garden-score：27.2–29.2秒；1倍速，总时长3.7秒。
- **反色曲线**：backgrounds[0]：20.083–21.133 秒 q→1；backgrounds[1]：27.667–28.9 秒 q→0。
- **转调线**：mod-0 globalX 3827.15，19.2–25.217 秒；mod-1 globalX 5274.325，26.8–32.817 秒。

[打开 Demo](../../demos/patterns/key-change-color-flip/index.html) · [在库中查看](../../patterns.html#pattern/key-change-color-flip)
