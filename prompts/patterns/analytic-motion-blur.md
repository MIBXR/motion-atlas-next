# 解析运动模糊

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-morph 原片 5.2–9.6 秒；mg-paperclip 原片 0–8.34 秒；总时长 12.74 秒。以快门区间的位置解析生成拖影：圆形生成胶囊轮廓与透明度坡，镜头运动使用仿射偏移采样和速度相关高斯模糊。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-morph 原片 5.2–9.6 秒；mg-paperclip 原片 0–8.34 秒；1 倍速，巧思时长 12.74 秒。
- **速度解析拖影**：L31: const qT = x => Math.round(x * FPS) / FPS, SH = 0.5 / FPS;；L607: const [R0, G0, B0] = hexRgb(col).map(v => Math.round(v * 255)), cs = a => `rgba(${R0},${G0},${B0},${a})`, ux = dx / L, uy = dy / L, T = L + 2 * r, am = Math.min(1, 2 * r / L), o1 = Math.min(2 * r, L) / T, an = Math.atan2(dy, dx);；L608: const gr = c.createLinearGradient(mx - ux * T / 2, my - uy * T / 2, mx + ux * T / 2, my + uy * T / 2);
- **相机仿射快门**：L567: const camEl=document.getElementById('cam'),mbg=document.getElementById('mbg'),MBN=12,SH=.5,RM=1100,DL=SH/MBN;；L575: function camSigma(t){const{vx,vy,g}=camVel(t),k=.8*DL/4,vz=620*Math.abs(g);return[Math.hypot(vx*k,vz*k),Math.hypot(vy*k,vz*k)];}；L579: [-.375,-.125,.125,.375].forEach((f,k)=>{const h=f*DL;MO[k].setAttribute('dx',(h*vx).toFixed(3));MO[k].setAttribute('dy',(h*vy).toFixed(3));

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/analytic-motion-blur/index.html) · [在库中查看](../../patterns.html#pattern/analytic-motion-blur)
