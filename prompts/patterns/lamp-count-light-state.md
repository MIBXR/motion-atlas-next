# 灯数即光照

## 实现 Prompt

复用来源案例lemo-shadow-puppet的原作render(t)，实现“灯数即光照”：每个太阳读取对应油灯强度，九盏灯依次点亮造成过曝与褪色；每次命中使该灯衰减到零，总灯场和按有效灯数计算的曝光让幕布逐级变暗回暖。参数与源码：film/main.js:lampI / lamps；nEff=sum(lamp intensity)，expoFront=1.75/sqrt(max(1,nEff))，sigB=700，sigC=120。；film/story.js:KILL=[6,1,3,7,2,8,4,9,5]；hitT(i)=T.rel[i]+T.fly[i]；main.js:lampI按命中时间在.35秒内熄灭。；film/gl.js:灯光场乘皮革透射与布纹，暖色调映射与bloom共同显出灯数差异。。按入口segments映射原片时刻，画面、字体与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：7.2–11.3秒；27.2–34.2秒；1倍速，总时长11.100000秒。

[打开 Demo](../../demos/patterns/lamp-count-light-state/index.html) · [在库中查看](../../patterns.html#pattern/lamp-count-light-state)
