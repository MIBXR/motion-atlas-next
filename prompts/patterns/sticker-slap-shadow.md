# 抬高旋转拍贴

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速重放以下片段：mg-paperclip 原片 0–0.8 秒；mg-paperclip 原片 0.98–2.5 秒；mg-paperclip 原片 5.56–6.8 秒；总时长 8.73 秒。抬高、放大、倾转的贴纸下落，阴影同步收紧，落定后以衰减摆动与挤压回弹消力。直接调用来源案例的 renderAt(t)，保留原作参数、画面、字体与成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。 按 index.html 内联 segments 在原有 3.56 秒之后重放mg-collage 原片 0–1.4 秒；mg-collage 原片 2.05–2.8 秒；mg-collage 原片 5.96–7.54 秒；mg-collage 原片 7.96–9.4 秒，总时长 8.73 秒。拼贴片将照片、文字纸片和刊名放大拍下，离纸阴影随高度塌缩，落地后逐格挤压回定。画面与音轨沿用同一映射，声音默认关闭。

## 参数

- **原片重放区间**：mg-paperclip 原片 0–0.8 秒；mg-paperclip 原片 0.98–2.5 秒；mg-paperclip 原片 5.56–6.8 秒；1 倍速，巧思时长 8.73 秒。
- **抬高旋转拍贴**：L69: const shadow=(lift,a=.26)=>`drop-shadow(0 ${6+34*lift}px ${10+34*lift}px rgba(22,34,46,${a-0.08*lift}))`;；L71: function slap(t,land,dur=.2,amp=.3){const p=(t-(land-dur))/dur;if(p<0)return{o:0,s:1+amp,r:6,lift:1};；L73: const w=wob(t-land,4.5,10);return{o:1,s:1-.035*w,r:-.8*w,lift:0};}；L188: const sl={y:pre?-420*(1-he):0,r:pre?-14*(1-he):-.8*sq,s:pre?1+.18*(1-he):1,sx:1+.04*sq,sy:1-.05*sq,lift:pre?1-he:0};
- **追加原片区间**：mg-collage 原片 0–1.4 秒；mg-collage 原片 2.05–2.8 秒；mg-collage 原片 5.96–7.54 秒；mg-collage 原片 7.96–9.4 秒；if (k < 0) { const u = -k / pre; return { s: 1 + 0.38 * u * u + 0.05 * u, lift: u, k }; }
if (k === 0) return { s: 0.972, lift: 0, k, sq: 1 };
c.shadowBlur = 5 + lift * 34; c.shadowOffsetX = 3 + lift * 24; c.shadowOffsetY = 5 + lift * 34;

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段和标记；画面与音轨使用同一时刻映射。

[打开 Demo](../../demos/patterns/sticker-slap-shadow/index.html) · [在库中查看](../../patterns.html#pattern/sticker-slap-shadow)
