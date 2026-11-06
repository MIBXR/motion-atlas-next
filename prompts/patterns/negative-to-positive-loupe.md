# 放大镜下负片转正

## 实现 Prompt

用来源案例的原作render(t)实现“放大镜下负片转正”。放大镜内由中心向外的显影前沿把同一负片转为正片，镜缘随后越过画幅，镜内照片分层产生纵深与轻微位移。保留参数：film/film.js:shot / FS，HIT.develop=15秒，uDev以.8秒ease-in-out推进，rho与smoothstep(uDev−.14,uDev,rho)决定镜内正负像。；film/film.js:D2 / int2s / shot，镜头zoom .335→1.45，镜内S=.84→.56；MAG=2.5、LENS_RW=1000。；film/film.js:shot，enter时地面偏移[260,−140]、dz=.55；Flyer位移[125,−26]、Wilbur[10,0]，读取原照片分层与背景。。按index.html内联segments定位原片，复用原作素材、字体与同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-archive-lighttable：13.3–22.7秒；1倍速，总时长9.400000秒。

[打开 Demo](../../demos/patterns/negative-to-positive-loupe/index.html) · [在库中查看](../../patterns.html#pattern/negative-to-positive-loupe)
