# 方片翻牌级联波

## 实现 Prompt

用来源案例的原作renderAt(t)重放方片翻牌级联波。6秒开始R1，120px方片按距(840,300)的径向延迟自转90°，dur=0.25、span=0.25，并用s=1/(abs(cosθ)+abs(sinθ))内缩。6.5秒开始R2，240px卡片按对角延迟绕横轴翻面，dur=0.2、span=0.3、sc=cos(π*ease(u))。保留xs=1-0.22*sn*(0.5+0.5*fs*ca/120)的梯形透视、col*=1-0.2*shd的明暗与黑床衔接。背面显示黄色三角、红色方块与蓝色圆形；7.1秒在背面遮挡时复位正面映射。7.5秒开始R4，卡片按距(960,540)的向心延迟绕竖轴翻回正面，dur=0.2、span=0.3、sc=-cos(π*ease(u))，8秒归位。按index.html 内联配置的segments映射时间，保留原作字体、素材和同区间音轨，声音默认关闭。

## 参数

- **径向自转**：R1.start=6秒；中心(840,300)；dur=0.25，span=0.25，size=120，angle=90；s=1/(abs(cosθ)+abs(sinθ))。
- **对角翻牌**：R2.start=6.5秒；dur=0.2，span=0.3，size=240；sc=cos(π*ease(u))；sc<0为背面。
- **翻牌透视**：sn=sqrt(1-sc²)；xs=1-0.22*sn*(0.5+0.5*fs*ca/120)；gShade=cov*sn；col*=1-0.2*shd。
- **黑床衔接**：board=mix(isK?1:0,back?fB:fF,smoothstep(0.72,0.96,abs(sc)))；abs(sc)<0.002时返回board。
- **遮挡复位**：frontReset=7.1秒；rotTile在tt>=resetT时返回原q与coverage=1。
- **背面三元**：reveal=7–7.2秒；黄色三角[(120,780),(600,780),(360,300)]；红方块(720,300,480,480)；蓝圆(1560,540,r240)。
- **向心归牌**：R4.start=7.5秒；dur=0.2，span=0.3，size=240，中心(960,540)；delay=(maxRadius-distance)*span/(maxRadius-minRadius)；sc=-cos(π*ease(u))；8秒归位。

[打开 Demo](../../demos/patterns/flip-tile-cascade/index.html) · [在库中查看](../../patterns.html#pattern/flip-tile-cascade)
