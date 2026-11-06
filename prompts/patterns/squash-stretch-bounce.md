# 预备、拉伸与压扁回弹

## 实现 Prompt

复用来源案例的原作 window.renderAt(t)，按 index.html 内联配置 的 segments 依次重放圆点下落弹射与图标接力片段。保留原片的起跳前压缩、飞行速度导向拉伸、触地压扁与回弹：g=2040，R0=74；首次压缩3帧，回跳高78；弹射用 E.outQt；速度拉伸 st=clamp(speed/5200)*.42；接力落地用 kick(t,上一落地,3.5,.4)。沿用原画面、字体与成品音轨，保持1920×1080、30fps；画面和音轨共用同一时刻映射，声音默认关闭。追加mg-cel-boil原片1.05–5.7秒，保留24fps火苗的蹲压、起跳纵向拉伸、落地压扁回弹和HOPS舞步；起跳sy数组为[2.6,1.3,1.18,1.06,1.0,0.95,1.0,1.06,1.12,1.18,1.24,1.26]，落地压缩幅度-0.44，后接0.14、-0.05衰减。四个重放段总时长10.033333333秒。 在原有 7.883333333 秒之后依次重放mg-liquid 原片 0–2.15 秒；全部重放总时长 10.033333333 秒。液态片沿速度拉伸的液滴在触地时压扁回弹，冠状液臂变细断裂，次级液滴延迟飞出。参数沿用：const G = 5000;                              // gravity px/s^2 (droplets, leaps, drips)
  const svLand = (d, tl) => { const s = 1.3 + (SV_PUD - 1.3) * spring(tl + 1.3 / 30, 6, d.z); return s < SV_PUD ? SV_PUD - (SV_PUD - s) * 0.45 : s; };
  const TEN_T = 0.27;
        r: rr(3.5, big ? 8 : 6), u: d.u + rr(-0.05, 0.05), tEmit: d.tLand + 2 / 30 + rr(0, 1 / 30), tGrow: 0.03, owner: di, melt, fy: rr(-36, 30),
原有段的画面和时序保持原样，新增段沿用同区间原片音轨，声音默认关闭。

## 参数

- **下落拉伸**：g=2040；a=-0.12；R0=74；k=min(g*(t-a)/1500,1)*.16；sy=1+k，sx=1/(1+k)。
- **首次触地**：15/30=.500秒；3帧压缩sy=1-.4*sin(πu)、sx=1+.36*sin(πu)；回跳高78。
- **再次触地**：24/30=.800秒；2.5帧压缩幅.2/.18。
- **起跳预备**：27/30–31/30=.900–1.033秒；sy*=1-.3*a，sx*=1+.24*a；y=GY-R0*sy。
- **弧线弹射**：31/30–40/30=1.033–1.333秒；E.outQt；dt=1/240；st=clamp(speed/5200)*.42；sx=1+st，sy=1/(1+st)。
- **连续接力预备**：a/o=171/173、185/188、200/203帧；an=E.outQ(inv(a,o,t))；sy乘1-.3*an，sx乘1+.2*an。
- **连续接力落地**：180/30=6.000、195/30=6.500秒；land=kick(t,上一落地,3.5,.4)；sy乘1-.22*land，sx乘1+.2*land；y补偿R_D*(1-sy)。
- **火苗跳跃形变**：24fps；s.sy=[2.6,1.3,1.18,1.06,1.0,0.95,1.0,1.06,1.12,1.18,1.24,1.26][fi]；s.sx=1/pow(s.sy,0.8)；落地K(t,[[2.5,-0.44],[2.583,0.14,out2],[2.667,-0.05],[2.75,0]])。
- **火苗连续舞步**：HOPS=[{t0:2.833,t1:3.0,h:120},{t0:3.333,t1:3.5,h:115},{t0:3.75,t1:4.0,h:175,spin:true}]。
- **重放总时长**：10.033333333 秒
- **落滴压扁飞溅参数**：const G = 5000;                              // gravity px/s^2 (droplets, leaps, drips)
  const svLand = (d, tl) => { const s = 1.3 + (SV_PUD - 1.3) * spring(tl + 1.3 / 30, 6, d.z); return s < SV_PUD ? SV_PUD - (SV_PUD - s) * 0.45 : s; };
  const TEN_T = 0.27;
        r: rr(3.5, big ? 8 : 6), u: d.u + rr(-0.05, 0.05), tEmit: d.tLand + 2 / 30 + rr(0, 1 / 30), tGrow: 0.03, owner: di, melt, fy: rr(-36, 30),

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/squash-stretch-bounce/index.html) · [在库中查看](../../patterns.html#pattern/squash-stretch-bounce)
