# 全屏定格静音

## 实现 Prompt

用来源案例lemo-dark-keynote的原作render(t)重放“全屏定格静音”。同一节点冻结全场界面物件姿态并把所有混音轨清为数字零；静音中相机推向唯一亮着的光标，光标蓄力后按下释放。保留参数：film/world.js:poseAt与film/film.js:winParams均使用min(t,K.freeze)；K.freeze=15、K.stretch=15.5、K.press=16。；film/film.js:camMess在15–16秒继续推近；caretState从15.5秒纵向拉伸；source/mix.py:193/198对15–16秒样本置0。。按index.html中的segments映射时间，复用原作素材、字体和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：14.600000–16.250000秒；1倍速，总时长1.650000秒。

[打开 Demo](../../demos/patterns/freeze-digital-silence/index.html) · [在库中查看](../../patterns.html#pattern/freeze-digital-silence)
