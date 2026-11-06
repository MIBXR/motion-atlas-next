# 套印漂移与锁版

## 实现 Prompt

用来源案例的原作renderAt(t)重放套印漂移与锁版。保留plate A的RGB分色和plate B的黑墨通道、彩色镂空与黑套印；色边使用原作4px补缝及lineWidth=5的彩形描边。保留oY、oR、oB、oK的原偏移表达式，初始reg=1、dens=0.955。6.5秒至reveal-1/30，按reg=1+1.3*in2(prog(q,R2.start,reveal-1/30))漂开色版。7秒主击时偏移收至reg=0.15，并在首帧、次帧分别增加墨密度0.12、0.05。8.5秒至lock-1/30，以io2推进reg=1+0.4*u和spread=4.5*u。9.5秒锁版时reg=0.12、dens=0.985，首帧、次帧再加0.10、0.04，spread归0。按index.html 内联配置的segments映射时间，保留原作字体、素材和同区间音轨，声音默认关闭。

## 参数

- **分色套印**：plate A RGB分别编码Y/R/B，plate B R编码K；black不清除plate A；Y=(242,183,5)/255，R=(224,60,49)/255，B=(30,79,163)/255，K=17/255。
- **色边补缝**：方块宽+4*s；半圆r=244、clip x=1436；红形左边1436；背面彩形描边lineWidth=5，外扩2.5px。
- **微偏套准**：oY=rough+(spread,0)；oR=rough+(1.3,-0.9)*reg+(0,spread)；oB=rough+(-1,1.2)*reg-(0,spread)；oK=rough+(0.5,0.4)*reg；初值reg=1，dens=0.955。
- **翻牌漂开**：6.5–6.9667秒；reg=1+1.3*in2(prog(q,R2.start,reveal-1/30))。
- **主击墨吻**：7秒；reg=0.15+0.85*io2(prog(q,R4.start,FREEZE))；fr=0时dens+=0.12，fr=1时+=0.05。
- **定格松版**：8.5–9.4667秒；u=io2(prog(q,FREEZE+0.5,lock-1/30))；reg=1+0.4*u；spread=4.5*u。
- **末拍锁版**：9.5秒；reg=0.12，dens=0.985；fl=0加0.10，fl=1加0.04；spread回0。

[打开 Demo](../../demos/patterns/misregistration-lock/index.html) · [在库中查看](../../patterns.html#pattern/misregistration-lock)
