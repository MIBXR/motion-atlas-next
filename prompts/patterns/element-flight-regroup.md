# 同物飞排重组

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-paperclip 原片 2.54–6.44 秒；总时长 3.9 秒。同一元素在信息结构之间飞行换位：标签徽章飞入周期表格子，格子飞排成单位柱图，稀土柱条压成标签飞到产地地图。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-paperclip 原片 2.54–6.44 秒；1 倍速，巧思时长 3.9 秒。
- **徽章飞入周期表**：L234: const o={d,b1:d.children[0],b2:d.children[1],nm:d.children[2],zn:d.children[3],S:[sx,sy],T:[tx+TS/2,ty+TS/2],pk:EV.badge_peel+.012*k,ts:EV.badge_peel+.083+.011*k,ld:EV.badge_land[k],sg:k%2?1:-1,amp:60+(k*37)%70,rr:(k%2?-1:1)*(5+(k*13)%5)};；L236: const eIO=u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2, S0=62/104, eBd=bez(.55,0,.3,1);
- **元素飞排单位柱图**：L270: const DX=300,DY=3860,RP=150,CW=60,CH=72,CPX=66;；L287: chips.push({Z,ci,j,d,b:d.querySelector('b'),fx:x,fy:y,tx:DX+j*CPX,ty:c.slotY,tl,t0:EV.chips[0]+j*EV.chip_stagger[0]+ROWO.indexOf(ci)*EV.chip_stagger[1],col:c.k==='re'?OR:INK});ord++;}));；L289: const chipPos=(o,t)=>{const u=P(t,o.t0,EV.chip_flight),e=ioS2(u),arc=Math.sin(Math.PI*e);return{u,e,arc,x:lerp(o.fx,o.tx,e)+arc*(o.ci-2)*40,y:lerp(o.fy,o.ty,e)-arc*30};};
- **稀土柱条压成标签**：L365: U.push((t,C,W)=>{const[s0,s1,s2]=EV.re_pill;；L371: const lag=.12*oC(P(t,s0,s1-s0)),CL=cam(t-lag),WL=worldM(t-lag,CL),A=mapW(WL.m,BC[0],BC[1]),kA=CL.z*WL.ls;；L374: const X=lerp(A[0],B[0],e)+nx*arc*110,Y=lerp(A[1],B[1],e)+ny*arc*110,k=Math.exp(lerp(Math.log(kA),Math.log(kB),e))*(1+.12*oC(e));

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/element-flight-regroup/index.html) · [在库中查看](../../patterns.html#pattern/element-flight-regroup)
