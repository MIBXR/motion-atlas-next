# 可复现的胶片颗粒与暗角

## 实现 Prompt

动态胶片颗粒与暗角覆盖地图、照片和插画，统一整片的质感。复用地图巡礼的 render、sceneCanvas、paintScene、grainPass、vignette 与对应 CSS。地图、kix 照片画布与回忆插画三段全屏底，以及案例颗粒和暗角。片段：地图固定 caseT 10.4；kix 照片画布固定 caseT 13.5；回忆插画画布固定 caseT 27.56；时长 67.5s：原有三段 7.5s，之后接几何包豪斯全片 10s，再接线条艺术全片 10s。使用横屏 1920×1080 与竖屏 1080×1920 的案例布局；按 mechanism/config.js 的 segments / markers 重放，使用固定地图底图与给定 caseT 的程序画布，声音由 mechanism/score.json 挂接。线条艺术段沿用原作固定种子 mulberry(f * 7919 + 13)，2048像素颗粒贴图逐帧偏移，overlay透明度0.1，与H * 0.35至W * 0.66的径向暗角共同覆盖金线画面；同区间原片音轨随时间轴播放，声音默认关闭。 通过 index.html 内联 segments 在前 27.5 秒之后依次重放mg-morph 原片 0–10 秒；mg-aurora-glass 原片 0–10 秒，总时长 67.5 秒。形变片按帧号平移固定种子的软颗粒，并以纸纹亮度调制画面。极光片在移动颗粒和暗角上加入三角分布抖动。沿用同区间原片音轨，声音默认关闭。 按 index.html 内联 segments 在原有 47.5 秒之后重放mg-3d-render 原片 0–10 秒；mg-collage 原片 0–10 秒，总时长 67.5 秒。三维片按帧号平移种子颗粒并叠加暗角；拼贴片逐格移动颗粒并交替两块尘点板。画面与音轨沿用同一映射，声音默认关闭。

## 参数

- **时长**：67.5s
- **声音 voice**：vinyl
- **线条片颗粒**：原片0–10秒，巧思17.5–27.5秒；const f = Math.floor(t * FPS + 1e-4), r = mulberry(f * 7919 + 13); const ox = Math.floor(r() * 2048), oy = Math.floor(r() * 2048); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.1；径向暗角H * 0.35、W * 0.66。
- **逐帧纸面颗粒**：L800: const GT = 512, GN = new Int8Array(GT * GT);；L805: const k = 2.0 / Math.sqrt(ss / b.length); for (let i = 0; i < b.length; i++) GN[i] = Math.max(-6, Math.min(6, Math.round(b[i] * k))); }；L812: const img = ctx.getImageData(0, 0, W, H), d = img.data, ox = (f * 197) % GT, oy = (f * 331) % GT;
- **颗粒抖动防色阶**：L800: const frame = Math.round(t * FPS * 4);；L876: gl.uniform1f(L.uBloomAmt, 0.22); gl.uniform1f(L.uGrainAmt, +(Q.get('grain') || 0.14)); gl.uniform1f(L.uFrame, frame); gl.uniform1f(L.uVig, 0.18);
- **追加原片区间**：mg-3d-render 原片 0–10 秒；mg-collage 原片 0–10 秒；opacity: .09; mix-blend-mode: overlay;
grain.style.transform = `translate(${Math.round(hash(i) * 64 - 32)}px, ${Math.round(hash(i + 999) * 64 - 32)}px)`;；c.globalCompositeOperation = 'overlay'; c.globalAlpha = 0.26;
c.globalCompositeOperation = 'multiply'; c.globalAlpha = 0.35;
dustC[Math.floor(k / 2) % 2]

## 动效 Token

- **地图上的颗粒**：0s
- **照片颗粒**：2.5s
- **插画颗粒**：5s
- **时长**：47.5s

## 迁移

- `../../cases/map-pilgrimage/film/script.js ? drawGrain?renderPattern?mechanism/film.js ? createFilm`：修改场景绘制、颗粒与暗角的实现。
- `mechanism/scene.html → script 与样式加载；../../cases/map-pilgrimage/film/script.js → layout、startPattern`：入口加载 MotionKit、来源案例的 ../../cases/map-pilgrimage/film/config.js、../../cases/map-pilgrimage/film/paths.js、../../cases/map-pilgrimage/film/scenes.js，以及本巧思配置；地图依赖地址在 ../../cases/map-pilgrimage/film/config.js → map，初始化在 ../../cases/map-pilgrimage/film/script.js → initMap。
- `../../cases/map-pilgrimage/film/config.js → palette；tracks.flashback、tracks.compare；layout`：修改底色、回忆与分屏状态；颗粒刷新频率在 ../../cases/map-pilgrimage/film/script.js → drawGrain，固定场景时刻在 render。
- `mechanism/replay.js → config.segments / markers；mechanism/config.js → segments / markers`：mechanism/replay.js 设置地图与追加案例的重放区间、顺序和标记；mechanism/config.js 设置 mechanism/scene.html 地图片段。地图来源时刻：地图固定 10.4/kix 照片画布固定 13.5/回忆插画画布固定 27.56。
- `mechanism/score.json`：调整声音事件，按巧思时间对齐，保留音色参数。

[打开 Demo](../../demos/patterns/film-grain/index.html) · [在库中查看](../../patterns.html#pattern/film-grain)
