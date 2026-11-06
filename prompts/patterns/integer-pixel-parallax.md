# 整像素多速视差

## 实现 Prompt

以原作 PIXEL QUEST 的 renderAt(t) 重放整像素多速视差，保留来源目录内的代码、字体与音轨。按 index.html 内联配置 的 segments 以 1 倍速重放原片 0–10 秒，画面仍由原函数绘制。逻辑画布 320×180，输出 1920×1080，30fps，通常放大 6 倍；沿用原作 LINEAR 纹理过滤与 GLSL sharp：reg=0.5-0.5/sc，f=(cd-clamp(cd,-reg,reg))*sc+0.5。远山、中景、近丘、前景分别使用 floor(cx×0.125)、floor(cx×0.3)、floor(cx×0.55)、floor(cx×1.4)。相机按 hx-96 追随角色，末段由 254 到 260，f106 定机；远山叠加 floor(max(0,f-F_CAMSTOP)/16) 继续移动。声音重放原片同一区间，默认关闭；提供横屏、时间定位、播放暂停与减少动态偏好。

## 参数

- **原片重放区间**：0–10 秒，1 倍速
- **画布与输出**：320×180 → 1920×1080，30fps，通常放大 6 倍
- **像素采样**：原作 LINEAR 纹理采样配合 GLSL sharp；reg=0.5-0.5/sc，f=(cd-clamp(cd,-reg,reg))*sc+0.5
- **分层位移**：远山 floor(cx×0.125)，中景 floor(cx×0.3)，近丘 floor(cx×0.55)，前景 floor(cx×1.4)
- **追拍与定机**：r=hx-96；相机末段从 254 到 260，f100–106 每帧一步，f106/30=3.5333 秒定机
- **远山续移**：floor(max(0,f-F_CAMSTOP)/16)，定机后每 16 帧增加一逻辑像素

[打开 Demo](../../demos/patterns/integer-pixel-parallax/index.html) · [在库中查看](../../patterns.html#pattern/integer-pixel-parallax)
