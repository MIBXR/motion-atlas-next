# 网格逐拍构成

## 实现 Prompt

用来源案例的原作renderAt(t)重放网格逐拍构成。保留120px模数、120BPM与每拍0.5秒；网格线对按L=0.125+d*0.125落笔，draw=0.25，使用io2。红圆用u=prog(t,-0.2,0.5)^2和dx=(1-u)*6*M加速落位；target1至target4分别在1.25–1.5、1.75–2、2.25–2.5、2.75–3秒预示落点，再由几何覆盖。红圆在2.75–3秒以sl=io2(prog(t,2.75,3))滑入接触位置。拍数按n=clamp(floor(snap(t)/cues.beat+1e-6)+1,1,20)跳变。按index.html 内联配置的segments映射巧思时间与原片时间，保留原作字体、素材和同区间音轨，声音默认关闭。

## 参数

- **网格**：M=120；Y0=60；15条竖线、9条横线；L=land0+d*step；land0=0.125，step=0.125，draw=0.25；io2。
- **拍数**：每拍0.5秒；n=clamp(floor(snap(t)/cues.beat+1e-6)+1,1,20)；padStart(2,"0")。
- **圆形落位**：u=prog(t,-0.2,0.5)^2；dx=(1-u)*6*M；圆心(840+dx,300-M*(1-sl))，r=240。
- **反拍准星**：target1：1.25–1.5秒；target2：1.75–2秒；target3：2.25–2.5秒；target4：2.75–3秒；环半径21–25，中心点半径4，十字短线32×4。
- **一格接触**：sl=io2(prog(t,2.75,3))；圆心局部y=300-120*(1-sl)。

[打开 Demo](../../demos/patterns/grid-beat-construction/index.html) · [在库中查看](../../patterns.html#pattern/grid-beat-construction)
