# 路线描画与标记脉冲

## 实现 Prompt

路线按进度描画，车头沿线前进，站点标记弹入并打出双语站名。复用地图巡礼的 cameraAt、addRouteLayers、updateRoutesGL、drawRoutesSVG、drawMarkers、measureMarkerLabels、project、routeP、pointAt 与对应 CSS。三个固定镜头中的路线、车头、标记圆点与双语标签；jrNara minZoom=13；镜头间使用案例纸色转场。片段：kix: caseT 1.5→2.35；haruka: caseT 14.6→17.05；kyoto: caseT 16.6→17.45；naraLine: caseT 37.4→39.85；jrNara: caseT 39.4→40.25；walk1: caseT 39.4→41.25；naraPark: caseT 40.8→41.65；时长 13.175s。使用横屏 1920×1080 与竖屏 1080×1920 的案例布局；按 mechanism/config.js 的 segments / markers 重放，使用固定镜头的实时地图，声音由 mechanism/score.json 挂接。前10.6秒保留原有地图巡礼段，之后追加等距城市原片5.835–7.07秒的数据弧线段，追加1.235秒。数据弧线采用QuadraticBezierCurve3和TubeGeometry(curve,72,.021,8,false)，uT0=PULSE_T+.05+k*.035，uDur=.45，uSpeed=1.3+A.hash(k*7)*.6；到达后的屋顶环按ph=(u*.9)%1放大1+ph*2.2并淡出，沿用同区间原片音轨，声音默认关闭。 通过 index.html 内联 segments 在前 11.835 秒之后依次重放mg-paperclip 原片 5.86–7.2 秒，总时长 13.175 秒。手机科普片的弧线从产地锚点画向组装点，箭头按路线切线落位；数据包随后沿线循环，汇点回弹并周期扩圈。沿用同区间原片音轨，声音默认关闭。

## 参数

- **时长**：13.175s
- **声音 voice**：sonar、whoosh、clack、blip、chime、tick
- **供应路线流向汇点**：L328: const dx=DEST[0]-p[0],dy=DEST[1]-p[1],L=Math.hypot(dx,dy);const bend=Math.min(260,L*.35)*(i===0?-1:1);；L353: const ru=P(t,o.rt,EV.route_dur);o.route.setAttribute('stroke-dashoffset',1-ioC(ru));const ar=oB(P(t,o.rt+EV.route_dur-.08,.24),2);o.arw.style.opacity=ar>0?1:0;o.arw.setAttribute('transform',`translate(${o.ap.x} ${o.ap.y}) rotate(${o.aa}) scale(${ar*Math.min(pk,1.8)})`);；L356: const f=((t-o.rt-EV.route_dur)*0.55+k/3)%1;const q=o.route.getPointAtLength(o.len*f);c.style.opacity=clamp(f*8)*clamp((1-f)*8);c.setAttribute('cx',q.x);c.setAttribute('cy',q.y);});});；L358: const rp=((t-EV.pin)%1.1)/1.1;pinRing.style.opacity=t>EV.pin?(1-rp)*.8:0;pinRing.style.transform=`scale(${1+rp*1.6})`;

## 动效 Token

- **机场**：0s
- **描画**：0.6s
- **第二段**：4s
- **步行**：7.2s
- **时长**：13.175s

## 迁移

- `../../cases/map-pilgrimage/film/script.js → renderLive、drawRouteActions、drawRoutesSVG、drawMarkers`：修改镜头、路线、标记、引线、投影与标签避让的实现。
- `mechanism/scene.html → script 与样式加载；../../cases/map-pilgrimage/film/script.js → layout、startPattern`：入口加载 MotionKit、来源案例的 ../../cases/map-pilgrimage/film/config.js、../../cases/map-pilgrimage/film/paths.js、../../cases/map-pilgrimage/film/scenes.js，以及本巧思配置；地图依赖地址在 ../../cases/map-pilgrimage/film/config.js → map，初始化在 ../../cases/map-pilgrimage/film/script.js → initMap。
- `../../cases/map-pilgrimage/film/config.js → stops；tracks.routes、tracks.markers；layout`：修改地点与路线事件；路线几何在 ../../cases/map-pilgrimage/film/paths.js，巧思动作映射在 mechanism/config.js → actions。
- `mechanism/replay.js → config.segments / markers；mechanism/config.js → segments / markers`：mechanism/replay.js 设置地图与追加案例的重放区间、顺序和标记；mechanism/config.js 设置 mechanism/scene.html 地图片段。地图来源时刻：kix: 1.5→2.35/haruka: 14.6→17.05/kyoto: 16.6→17.45/naraLine: 37.4→39.85/jrNara: 39.4→40.25/walk1: 39.4→41.25/naraPark: 40.8→41.65。
- `mechanism/score.json`：调整声音事件，按巧思时间对齐，保留音色参数。

[打开 Demo](../../demos/patterns/route-draw-marker/index.html) · [在库中查看](../../patterns.html#pattern/route-draw-marker)
