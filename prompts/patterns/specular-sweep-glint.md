# 斜向扫光与星芒

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-synthwave 原片 4.75–5.85 秒；mg-synthwave 原片 7.925–9.8 秒；mg-liquid 原片 6.9–8 秒；总时长 4.075 秒。窄高光带沿倾斜坐标扫过字标表面；镀铬字在指定字角同步绽出旋转星芒，厚液字保留液面上的窄高斯亮带。参数保持原作数值：    float b1 = (x - uGlint) / .09, b2 = (x - uGlint + .22) / .03;
    float band = exp(-b1*b1) * .75 + exp(-b2*b2) * .45;
  const gs = (tc, x, y, dur, r) => { const k = (t - (tc - dur / 2)) / dur; if (k > 0 && k < 1) glints.push({ x, y, r: r * Math.sin(Math.PI * k), a: Math.sin(Math.PI * k), rot: k * .8 }); };
  gs(CUES.glint_star, TITLE_LEFT + TB.tw / TS * .085, TITLE_TOP + 6, .5, 150);
    S.key = { x: -0.78 + 0.06 * Math.sin(t * 0.6) + 0.30 * kd, y: -0.95 + 0.12 * kd,
      glint: glint1 ? lerp(-900, 1700, inOut(inv(cues.glint - 0.1, cues.glint + 0.75, t))) : lerp(-300, 1900, inOut(g2)),
  float gb = (p.x*0.8 - p.y*0.6) - uKey.z;
  col += vec3(1.0,0.95,0.98)*uKey.w*exp(-gb*gb/(2.0*34.0*34.0))*ss(0.35,0.75,side)*(1.0-ss(0.9,1.0,side))*1.1;
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-synthwave 原片 4.75–5.85 秒；mg-synthwave 原片 7.925–9.8 秒；mg-liquid 原片 6.9–8 秒；1 倍速，总时长 4.075 秒。
- **镀铬斜扫星芒参数**：    float b1 = (x - uGlint) / .09, b2 = (x - uGlint + .22) / .03;
    float band = exp(-b1*b1) * .75 + exp(-b2*b2) * .45;
  const gs = (tc, x, y, dur, r) => { const k = (t - (tc - dur / 2)) / dur; if (k > 0 && k < 1) glints.push({ x, y, r: r * Math.sin(Math.PI * k), a: Math.sin(Math.PI * k), rot: k * .8 }); };
  gs(CUES.glint_star, TITLE_LEFT + TB.tw / TS * .085, TITLE_TOP + 6, .5, 150);
- **厚液斜向扫光参数**：    S.key = { x: -0.78 + 0.06 * Math.sin(t * 0.6) + 0.30 * kd, y: -0.95 + 0.12 * kd,
      glint: glint1 ? lerp(-900, 1700, inOut(inv(cues.glint - 0.1, cues.glint + 0.75, t))) : lerp(-300, 1900, inOut(g2)),
  float gb = (p.x*0.8 - p.y*0.6) - uKey.z;
  col += vec3(1.0,0.95,0.98)*uKey.w*exp(-gb*gb/(2.0*34.0*34.0))*ss(0.35,0.75,side)*(1.0-ss(0.9,1.0,side))*1.1;

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/specular-sweep-glint/index.html) · [在库中查看](../../patterns.html#pattern/specular-sweep-glint)
