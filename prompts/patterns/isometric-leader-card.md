# 等轴引线数据卡

## 实现 Prompt

复用等距 2.5D 来源案例的原作 window.renderAt(t)，重放原片6.1–8.12秒，时长2.02秒。三张数据卡节点为6.5、6.75、7秒，引线提前.2秒从世界锚点沿竖直短桩与等轴轴线画出，卡片到点后以A.spring(tau,20,.55,8)横向展开。右面矩阵rotate(-30deg) skewX(-30deg) scaleY(.86602)，左面矩阵rotate(30deg) skewX(30deg) scaleY(.86602)；CW=360，CH=210，S=.8165*60*zoom*.01。保留.04–.46秒数值计数、i*.035秒柱条错峰、端点弹出扩圈与按屏幕y排序。退出节点7.62/7.66/7.7，卡片与引线在.22秒内同步收回。保留原作模型、字体、颜色和提示音，1920×1080、30fps，同区间原片音轨默认关闭。

## 参数

- **等轴矩阵**：右面rotate(-30deg) skewX(-30deg) scaleY(.86602)；左面rotate(30deg) skewX(30deg) scaleY(.86602)。
- **卡片尺寸**：CW=360，CH=210；S=.8165*60*zoom*.01。
- **引线与卡片**：A.easeOutCubic(A.inv(-.2,0,tau))；A.spring(tau,20,.55,8)；callouts=[6.5,6.75,7]。
- **数值与柱条**：A.easeOutCubic(A.inv(.04,.46,tau))；A.easeOutBack(A.inv(.06+i*.035,.28+i*.035,tau),1.6)。
- **退出**：tOut=7.62/7.66/7.7；A.easeInCubic(A.inv(d.tOut,d.tOut+.22,T))。
- **时长**：2.02s；原片6.1–8.12s。

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/isometric-leader-card/index.html) · [在库中查看](../../patterns.html#pattern/isometric-leader-card)
