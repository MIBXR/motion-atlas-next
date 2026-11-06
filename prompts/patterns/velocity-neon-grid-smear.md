# 网格速度拖影

## 实现 Prompt

通过 MotionKit.replay 以 1 倍速依次重放mg-synthwave 原片 0–9.867 秒；总时长 9.867 秒。透视霓虹网格随公路速度向镜头推进，横向线条按快门位移展宽并补偿亮度，路侧反光条同步拉长。参数保持原作数值：    vec2 fb = fw + vec2(0., uBlur);                       // transverse lines smeared by this sample's travel (no strobing)
    float eC = max(1.5 * fw.y / (1.5 * fw.y + uBlur), .12), eG = max(6.8 * fw.y / (6.8 * fw.y + uBlur), .10);   // energy-conserving smear
  U.uBlur.value = stepped ? 0 : speed(ts) * SHUT / FPS / MBS / 5;
  postU.uStr.value = stepped ? 1 : 1 + speed(ts) * SHUT / FPS / MBS / CAP_L;
直接调用来源案例 renderAt(t)，沿用画面、字体和同区间成品音轨，声音默认关闭。使用 1920×1080 横屏、30fps，支持播放、暂停、时间定位与减少动态偏好。

## 参数

- **原片重放区间**：mg-synthwave 原片 0–9.867 秒；1 倍速，总时长 9.867 秒。
- **网格速度拖影参数**：    vec2 fb = fw + vec2(0., uBlur);                       // transverse lines smeared by this sample's travel (no strobing)
    float eC = max(1.5 * fw.y / (1.5 * fw.y + uBlur), .12), eG = max(6.8 * fw.y / (6.8 * fw.y + uBlur), .10);   // energy-conserving smear
  U.uBlur.value = stepped ? 0 : speed(ts) * SHUT / FPS / MBS / 5;
  postU.uStr.value = stepped ? 1 : 1 + speed(ts) * SHUT / FPS / MBS / CAP_L;

## 迁移

- `index.html 内联配置 → segments / markers`：调整来源片段与中文节点，画面和声音使用同一时刻映射。

[打开 Demo](../../demos/patterns/velocity-neon-grid-smear/index.html) · [在库中查看](../../patterns.html#pattern/velocity-neon-grid-smear)
