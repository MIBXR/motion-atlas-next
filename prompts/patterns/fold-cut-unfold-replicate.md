# 折剪展开复制

## 实现 Prompt

复用来源案例lemo-papercut-red的原作render(t)，实现“折剪展开复制”：红纸三次折成45°楔形，剪刀沿路径显露孔洞；三次展开把同一楔形按D4变换复制为八瓣团花，其中灯笼图案沿飞行轨迹去到八扇窗。参数与源码：film/story.js:T.folds=[24,25,26]，cut0=26.5、cut1=29.4，unfolds=[30,30.25,30.5]；film/fold.js:drawFold / drawUnfold，折页16条带、每折.55秒、每展.2秒。；film/tuanhua.js:D4为R(kπ/2)及R(kπ/2)·mirror(π/4)，wedgeCuts在楔形放一盏灯笼，tuanhua复用八次。；film/main.js:flightPos / shotGlow读取HOUSES；story.js:T.lanterns=[32,32.25,32.5,32.75,33,33.25,33.5,33.75]。。按入口segments映射原片时刻，画面、字体与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：23.8–34秒；1倍速，总时长10.200000秒。

[打开 Demo](../../demos/patterns/fold-cut-unfold-replicate/index.html) · [在库中查看](../../patterns.html#pattern/fold-cut-unfold-replicate)
