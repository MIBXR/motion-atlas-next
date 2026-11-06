# 条纹落日升起

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-synthwave 原片 0.9–9.8 秒；总时长 8.9 秒。横向镂空条纹的渐变落日从地平线后升起，下半圆条纹按相位卷动且向下加宽。参数保持原作数值：const SUN_D = 1150, SUN_RPX = 250, SUN_R = SUN_RPX / FPX * SUN_D;
    float ph = w * 8.5 - uSunTime * .55;
    float gapF = clamp(w * .42, 0., .62) * step(0., w);
  const sunPx = lerp(-150, 110, rise) + 16 * eInOutSine((ts - 7.2) / 2.8);
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-synthwave 原片 0.9–9.8 秒；1 倍速，总时长 8.9 秒。
- **条纹落日升起参数**：const SUN_D = 1150, SUN_RPX = 250, SUN_R = SUN_RPX / FPX * SUN_D;
    float ph = w * 8.5 - uSunTime * .55;
    float gapF = clamp(w * .42, 0., .62) * step(0., w);
  const sunPx = lerp(-150, 110, rise) + 16 * eInOutSine((ts - 7.2) / 2.8);

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/striped-sun-rise/index.html) · [在库中查看](../../patterns.html#pattern/striped-sun-rise)
