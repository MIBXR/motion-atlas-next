# 翻页立体书换景

## 实现 Prompt

用来源案例lemo-paper-popup的原作render(t)重放“翻页立体书换景”。曲面纸页用旧地面作正面、新天空作背面，沿40段积分得到刚性弯曲；旧立体件折倒，新件绕底铰链弹起。保留参数：film/story.js:TURNS=[[48.6,51.4],[71.6,74.4],[86.8,89.6]]；main.js:render在[a+.45,b−.3]用eio(seg)调用setLeaf。；film/book.js:setLeaf：NS=40，th=π/2*u，L=.55*sin(πu)，逐段积分cos(phi)/sin(phi)；leafFront=旧ground，leafBack=下一skyLeaf或sky。；film/sets.js:RISE为各翻页结束前.9秒，FOLD为翻页开始；riseOf以.55秒back(...,1.7)升起，延迟(.3−z)*1.2，updatePops绕底边转dir*π/2*(1−k)。。按index.html内联segments映射原片时刻，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：48.600000–52.500000秒；71.600000–75.500000秒；86.800000–90.700000秒；1倍速，总时长11.700000秒。

[打开 Demo](../../demos/patterns/page-turn-popup-swap/index.html) · [在库中查看](../../patterns.html#pattern/page-turn-popup-swap)
