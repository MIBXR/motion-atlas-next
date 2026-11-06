# 对焦游移显隐

## 实现 Prompt

用来源案例的原作render(t)实现“对焦游移显隐”。镜头推向远处并反复拉动对焦距离；身影只在第一次正确对焦的短暂窗口可见，失焦后消失，第二次清晰锁定留下空走廊。参数：film/story.js:FOCUS/APER与W；原时间33.15–33.65秒对焦约33m，W后32.85–33.35秒；APER从3升到14。；film/story.js:T.figOn原时间32.2–33.95；film/main.js:render按T.figOn切换thing.visible并将FOCUS/APER送给原作DOF。。复用来源字体、素材和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-backrooms：31.900000–35.900000秒，1倍速，总时长4.000000秒。

[打开 Demo](../../demos/patterns/autofocus-hunting-reveal/index.html) · [在库中查看](../../patterns.html#pattern/autofocus-hunting-reveal)
