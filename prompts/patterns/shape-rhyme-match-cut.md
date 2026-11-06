# 形状押韵硬切

## 实现 Prompt

用来源案例lemo-spy-titles的原作render(t)重放“形状押韵硬切”。保持圆形的屏幕位置与交接尺度，在时间阈值直接切换轮子、轮盘、瞳孔和月亮；场内推进衔接下一次硬切，匹配段间隔逐步缩短。保留参数：film/film.js:renderFilm的互斥else-if：t<T.roulette画wheelShot，t<HIT.pupil画sCasino，t<HIT.moon画sPupil，随后画sRoof；阈值处无轮廓插值或遮罩。；film/story.js：roulette=B(13)，pupil=B(14,3)，moon=B(15)；轮盘段6拍=2.727273秒，瞳孔段2拍=.909091秒。scenes.js:RW共用圆形位置，film.js:sRoof在切点从RW.r / RW.y过渡到r=330、y=430。；film/scenes.js:KH_SCREEN={x:960,y:430,h:560}；sTitle把片名锁孔推到该位置，最终bongoEnd硬切全片名。。按index.html内联segments映射原片时刻，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：21.590909–26.609091秒；1倍速，总时长5.018182秒。

[打开 Demo](../../demos/patterns/shape-rhyme-match-cut/index.html) · [在库中查看](../../patterns.html#pattern/shape-rhyme-match-cut)
