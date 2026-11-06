# 小人只站界面上沿

## 实现 Prompt

用来源案例lemo-living-screencast的原作render(t)重放“小人只站界面上沿”。每帧测量真实DOM元素上边缘并换回世界坐标，像素吉祥物以这些点为站立、行走和跳跃端点；同一时间表触发文件高亮、计划生成和界面状态变化。保留参数：film/main.js:A：r=getBoundingClientRect()；x=(r.left+r.width×fx−960)/z+cx；y=(r.top+r.height×fy−540)/z+cy；fy默认0。；film/film.js:at / Actor.eval / appState：输入框、文件行、plan条目、按钮等data-a锚点；起跳前.14秒蹲压.28，落地.22秒衰减。。按index.html中的segments映射时间，复用原作素材、字体和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：10.500000–18.500000秒；22.200000–27.800000秒；1倍速，总时长13.600000秒。

[打开 Demo](../../demos/patterns/mascot-on-ui-edges/index.html) · [在库中查看](../../patterns.html#pattern/mascot-on-ui-edges)
