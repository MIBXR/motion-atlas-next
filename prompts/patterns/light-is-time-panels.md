# 光照到哪格哪格动

## 实现 Prompt

复用来源案例lemo-stained-glass的原作render(t)，重放“光照到哪格哪格动”。太阳带从左到右访问四个窗格，人物在离光时刻停格；玫瑰窗亮度与日色同步，作为整日时钟。参数与源码：film/story.js:28–52的light：sunU由LX[0]到LX[3]，15.6–17.2秒移到第二格、22.6–23.4秒移到第三格；roseI从.45升1.3后降到0。；film/story.js:56–76：lancetI的lt=min(t,15.9)，lancetII的lt=clamp(t,16.9,22.95)，lancetIII锁定离光时刻；人物8fps，光24fps。按入口segments映射原片时刻，保留原作字体、画面与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：14.800000–23.800000秒；1倍速，共9.000000秒。

[打开 Demo](../../demos/patterns/light-is-time-panels/index.html) · [在库中查看](../../patterns.html#pattern/light-is-time-panels)
