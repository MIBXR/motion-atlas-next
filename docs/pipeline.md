# 渲染管线：舞台、时间轴、声音与预加载

本库按时间播放的 Demo 通过 `window.__motion` 提供定位与播放；时间纯函数作品的**画面只取决于时刻 t**，有自己时钟、状态或交互的作品负责重建相应画面。同一份代码支持实时播放、站点刻度条拖动和脚本逐帧渲染视频，结果完全一致。Motion Kit 提供以下接口：

- **固定画幅舞台** `MotionKit.stage()`：横屏 1920×1080、竖屏 1080×1920 两套构图，整体等比缩放（黑边），舞台内部只用像素。
- **声音引擎** `MotionKit.audio`：零素材的 WebAudio 合成音色库 + 乐谱调度；同一份乐谱可离线渲染成 WAV。
- **预加载** `MotionKit.preload()`：资源就绪后才宣告 ready，站点可显示进度。
- **宿主通信**：站点用 postMessage 切换画幅、开关声音，Demo 回报就绪、画幅、加载进度与声音状态。

参考模板位于 `scripts/templates/`：`case-film/`（时间纯函数作品）、`case-native/`（作品自接 MotionKit）、`pattern-replay/`（片段重放）、`pattern-split/`（入口与 `mechanism/`）和 `material-demo/`（可运行素材）。复制模板后运行构建，由构建生成条目内的 `motion-kit.js` 副本。

## mountFilm 与 replay

画面只取决于时刻 t 的作品，把代码与样式放在 `film/`，由根 `index.html` 加载字体、`motion-kit.js` 与作品入口，再调用 `MotionKit.mountFilm(config)`。它创建舞台、时间轴、控制条与 `window.__motion`，并按 URL 参数启动，返回时间轴。

| 配置 | 说明 |
| --- | --- |
| `film` | `{ renderAt(t) → void｜Promise, duration, width, height, fps }` |
| `title`、`bpm` | 可选，写入 `__motion` |
| `root` | 舞台根节点或选择器 |
| `orients`、`sizes`、`background` | 传给 `MotionKit.stage` |
| `markers` | `{ t, label }[]`；各案例在 `index.html` 从自己的 cues 换算 |
| `accent` | 控制条强调色 |
| `rates` | 播放速率，默认 `[0.5, 0.75, 1, 1.25, 1.5, 2]` |
| `step` | `'seconds'`（默认）或 `'frames'`；后者按 `film.fps` 逐帧步进 |
| `start` | `{ t: 0, reduced: <秒> }` |
| `audio` | 可选 `{ src, mime }`；音轨下载并解码后才就绪；以时间轴为时钟，偏差超过 0.08 秒时校正，`?render` 下禁声 |

`renderAt(t)` 的 Promise 负责画面准备；媒体音轨纳入 `__motion.ready`。cue 数据结构属于案例；通用接入只接收换算好的 markers。

复刻作品的 `film/` 保持原作代码；`index.html` 的 `renderAt(t)` 调用原作暴露的帧函数（如 lemo-* 案例的 `window.render(t)`），按原作渲染脚本的方式等待该帧完成。下文“一、约定”的 `render(t)` 写法用于本库原创作品。

只重放案例片段的巧思调用 `MotionKit.replay(config)`，由 `segments` 拼接片段并复用来源案例 iframe，返回外层时间轴。每条片段用 `caseId`、`from`、`to` 指定来源与时间范围；`title`、`accent`、`markers`、`fps`、`reduced` 配置外层播放，`overlay` 指定巧思自己的 cue 说明层。来源入口为 `../../cases/<id>/index.html?embed=1&render=1`；外层提供 `__motion`、控制条、URL 定位、声音同步及画幅与加载状态。片段设置 `nativeAudio: true` 时，由来源页自身的 MotionKit 时钟与声音驱动；其余片段使用音轨文件。巧思本体结构见 [CONTRIBUTING](../CONTRIBUTING.md#条目本体)。

有自己时钟、状态或交互的作品在 `film/` 内自行接入 MotionKit，使用下面的舞台、时间轴与协议接口；地图巡礼的缓冲和档案终端的仿真、交互由作品控制。

## 一、约定

1. 把画面写成 `render(t)`：给定时刻 `t`（秒），把 DOM / Canvas / SVG 设置成那一刻的样子。**不要**在 render 里读 `Date.now()`、`performance.now()` 或累加状态。
2. 随机数用 `MotionKit.rng(seed)` 生成，并在 render 内按 `t` 派生（例如 `rng(seed + Math.floor(t * 24))`），保证同一时刻结果一致。
3. 舞台内部只用舞台像素，不用 `vw / vh / % / clamp()` 或媒体查询改变布局；横竖两套构图写在 `[data-orient="landscape"]` / `[data-orient="portrait"]` 下。
4. 时间写成“第几拍”，画面与乐谱读同一张节拍表；几何元素（路线、节点、连线、刻度）由同一个坐标函数计算并取整到像素。
5. 需要异步资源（地图瓦片、字体、图片）时：播放前用 `preload()` 预取；render 仍可以返回 Promise，`seek(t)` 会等待它完成（渲染模式下逐帧等待）。

```js
const MK = MotionKit, BT = MK.beats(120), at = (b) => BT.at(b);
const stage = MK.stage();                                   // 1. 固定画幅舞台（#stage）
function layout(orient) { /* 按画幅重建几何 */ }
layout(stage.orient);
stage.on('orient', layout);                                 //    切换画幅：先重建几何，kit 再重新 render 当前时刻
MK.preload([MK.preload.fonts(), MK.preload.image('photo.jpg')]); // 2. 预加载
const tl = MK.timeline({
  duration: at(16),
  markers: [{ t: 0, label: '开场' }, { t: at(4), label: '落点' }],
  render(t) {
    const p = MK.seg(t, at(4), 0.5, MK.ease.emphasized);
    title.style.transform = `translateY(${(1 - p) * 60}px)`;
    title.style.opacity = p;
  },
});
MK.audio.attach(tl, [                                       // 3. 乐谱
  MK.audio.pattern({ bpm: 120, from: at(4), tracks: { kick: 'X...x...', hat: '..x...x.' } }),
  { t: at(4), voice: 'impact' },
]);
MK.expose(tl);                                              // 4. window.__motion（ready 在预加载完成后 resolve）
MK.controls(tl);                                            // 5. 控制条（?embed / ?render 时不创建）
MK.start(tl, { t: 0, reduced: at(8) });                     // 6. 按 ?t / 减少动态定位，就绪后自动播放
```

## 二、舞台 `MotionKit.stage(opts)`

舞台根节点（默认 `[data-stage]`、`#stage` 或 `.stage`）被设为固定像素尺寸，并用 `transform: translate() scale()` 等比缩放，在容器（默认整个窗口）中居中，四周留黑边。缩放只发生在根节点上，所以根节点的 `clientWidth` 恒为 1920（或 1080）——MapLibre、Canvas 等按 `clientWidth` 测量的库直接按舞台像素工作。

| 选项 | 默认 | 说明 |
| --- | --- | --- |
| `root` | `[data-stage]` / `#stage` / `.stage` | 舞台根节点或选择器 |
| `orients` | `['landscape', 'portrait']` | 支持的画幅；只给一个即固定画幅 |
| `sizes` | `{ landscape: [1920, 1080], portrait: [1080, 1920] }` | 可覆盖，一般不改 |
| `container` | 窗口 | 缩放容器；给元素时用 ResizeObserver 跟随 |
| `background` | `#000` | 黑边颜色（CSS 变量 `--mk-letterbox`） |
| `onOrient` | — | `(orient, {width, height})`，切换画幅时调用（创建时不调用） |

返回的 `stage`：

| 成员 | 说明 |
| --- | --- |
| `orient` / `width` / `height` / `scale` / `portrait` | 当前画幅、舞台尺寸、缩放比例 |
| `mode` | 画幅来源：`url` / `host` / `user` / `api` / `auto` / `fixed` |
| `setOrient(o)` | 切换画幅，返回 Promise（重新 render 当前时刻后 resolve）；不支持的画幅返回 false 并回报宿主 |
| `toggleOrient()` | 横竖互换（控制条按钮用） |
| `toStage(clientX, clientY)` | 视口坐标 → 舞台像素坐标（交互 Demo 处理指针用） |
| `fromStage(x, y)` | 舞台像素坐标 → 视口坐标 |
| `on('orient', fn)` / `on('resize', fn)` | 画幅切换 / 缩放比例变化 |
| `root` / `orients` / `sizes` | 只读 |

**画幅选择优先级**：URL `?orient=landscape|portrait` → 宿主消息 `motion:orient`（舞台创建前收到的也会生效）→ 都没有时按窗口宽高比自动（只有自动模式会随窗口尺寸变化而切换，带 ±5% 迟滞）。宿主、控制条、`setOrient()` 的运行时切换总会生效并关闭自动模式。

**运行时切换的顺序**：写入舞台尺寸与 `data-orient`（同时挂在 `<html>` 与舞台根上）→ 重新计算缩放 → 调用 `onOrient` 与 `on('orient')`（Demo 在这里重建几何）→ 停止已排程与正在发声的声音 → 向父页面发 `motion:orient` → `tl.seek(tl.time)` 重新 render 当前时刻（播放状态与时刻保持不变）。

CSS 写法（横竖两套构图）：

```css
.stage { background: #0b0d10; }                       /* 尺寸由 kit 写入，这里不写 */
.stage > * { position: absolute; }
[data-orient="landscape"] .title { left: 152px; top: 372px; font-size: 168px; }
[data-orient="portrait"]  .title { left: 88px;  top: 1350px; font-size: 200px; }
```

另有 CSS 变量 `--stage-w`、`--stage-h`、`--stage-scale`（挂在 `<html>` 上）。

网站界面文字≥12px。缩放后可在页面中检查实际字号。

**常见注意**：

- 子元素显式写 `visibility: visible` 会盖过父层的 `hidden`；闪烁、显隐优先用 `opacity`。
- 交互 Demo 的指针坐标一律先过 `stage.toStage()`；不要用 `offsetX`（会受缩放影响）。
- MapLibre 的鼠标换算本身支持缩放容器；地图画布按舞台像素 × `devicePixelRatio` 渲染，若渲染开销过大，可设 `pixelRatio: Math.max(1, devicePixelRatio * stage.scale)` 并在 `stage.on('resize')` 里更新。
- 渲染模式（`?render`）下视口等于舞台尺寸，`scale` 恰为 1。

## 三、时间轴与 `window.__motion`

`MotionKit.timeline({ duration, render, loop, markers, fps })` 返回控制器；`duration` 可在运行时修改（例如改 BPM 后重算），`loop` 可读写，`setRate(r)` 改变速率。

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `on(fn)` | `(t, playing)` | 每次渲染（播放的每一帧、seek、pause） |
| `on('play', fn)` / `on('pause', fn)` | `(t)` | 播放 / 暂停（暂停只在原本在播放时触发） |
| `on('seek', fn)` | `(to, from)` | 跳转（在 render 之前触发；声音调度器据此判断是否打断） |
| `on('rate', fn)` / `on('loop', fn)` / `on('end', fn)` | | 速率变化 / 循环回绕 / 非循环播放到结尾 |

`MotionKit.expose(tl, meta)` 把时间轴暴露为 `window.__motion`：

| 成员 | 说明 |
| --- | --- |
| `duration` / `markers` / `time` / `playing` / `rate` / `loop` | 同时间轴 |
| `seek(t)` → Promise、`play()`、`pause()`、`toggle()`、`on()` | 同时间轴 |
| `ready` | Promise：全部必需资源、解码和初始帧完成后 resolve；失败或超时 reject。之后 `<html data-motion-ready="1">` 并向父页面发 `motion:ready` |
| `progress` | 预加载进度 0–1 |
| `orient` / `orients` / `setOrient(o)` / `stage` | 画幅；**`orients` 为空数组表示自适应Demo**，站点不应显示画幅切换 |
| `audio` | 离线渲染接口（挂了乐谱时才有，否则为 `null`）：`renderWav({ from, to, sampleRate })` → `{ base64, sampleRate, channels, duration, peakDb, rmsDb, clipped, events }`；`events(from, to)` 列出事件 |
| `kit` | kit 版本号 |
| `meta` 里的字段 | 例如 `title`、`bpm`、`sound` |

`MotionKit.start(tl, { t = 0, reduced, autoplay = true })`：按 `?t=` → 减少动态时的 `reduced` → `t` 的顺序定位，就绪时提交初始时刻并自动播放（`?autoplay=0` 与 `?render` 不播放、减少动态不播放）。

## 四、声音 `MotionKit.audio`

### 4.1 链路与音量规范

```
音色 → 事件增益(gain×校准电平) → 声像(pan) → 总线 music / sfx / ui（bed 属于 music，受侧链闪避）
     ↘ 混响发送(send) → 高通 220Hz → 卷积混响（程序生成的 2.6s 双声道脉冲响应）→ 返回 ┐
                                                                          主增益 0.65 → 压缩（-14dB, 3:1）→ 软削波天花板 → 输出
```

- **峰值上限 -1 dBFS**：最后一级是 WaveShaper 软削波曲线：|x| ≤ 0.6（约 -4.4 dBFS）完全线性，之上用 tanh 软膝趋近 -1 dBFS，超出的输入被钳到曲线端点，所以输出峰值严格低于 -1 dBFS。
- **默认响度**：模板案例整段 RMS 约 -16 dBFS、短时（400ms）最大约 -10 dBFS、峰值约 -2.6 dBFS；单个音色在力度 1 时峰值大致落在：鼓与冲击 -5 ～ -10 dBFS，界面音 -14 ～ -18 dBFS，铺底与环境底按 RMS 约 -21 ～ -29 dBFS。新乐谱用 `gain`（0–1 为主）做相对平衡，不要靠拉高 `gain` 求响度。
- `audio.setMix({ master, music, sfx, ui, bed, reverb, trim, sidechain })` 同时作用于实时与离线；默认 `master 0.65, music 0.8, sfx 0.9, ui 0.7, bed 0.7, reverb 0.3`。
- **侧链闪避**：带 `duck`（0–1）的事件会在触发瞬间压低 bed 总线（pad、drone、air、wind），约 0.3 秒恢复；`kick`、`sub`、`impact`、`stamp`、`thud` 默认带闪避。

### 4.2 开关与状态

- 默认静音。`audio.enable()` / `disable()` / `toggle()`；`enabled` 是用户意图，`state` 是实际状态：`off` 关闭、`on` 正在出声、`blocked` 已开启但被浏览器自动播放策略挡住（等待页面内的一次指针或键盘手势，kit 会自动在那次手势里恢复）。
- `audio.on('change', (enabled, state) => …)`；状态变化同时向父页面发 `motion:sound`。
- 页面切到后台：停止调度、淡出并挂起 AudioContext；回到前台后恢复，从当前时刻重新对齐。
- `audio.meter()` → `{ peak, rms, peakDb, rmsDb }`：输出电平（最近约 43ms），可做电平表；`audio.active`：仍在发声或已排程的声部数。
- `audio.latency`：主混音链的固定处理延迟，当前为 0.006 秒；不包含设备输出延迟。需要将画面贴合实际听到的声音时，还要结合 AudioContext 的输出时间戳或 `outputLatency`。
- 渲染模式（`?render`）默认关闭实时声音；重放宿主以 `enable({ replay: true })` 启用来源乐谱。

### 4.3 乐谱与调度

乐谱是一个数组，元素是**事件**或**生成函数**：

```js
const SCORE = [
  { t: 0, voice: 'air', dur: 9.5, vel: 0.6 },                   // 事件：t 秒、音色名、参数
  { t: 2, voice: 'impact', vel: 0.9, pan: 0, send: 0.4 },
  MK.audio.pattern({ bpm: 120, from: 2, to: 7,                  // 生成函数 (t0, t1) => events
    tracks: { kick: 'X...x...X...x.x.', clap: '....X.......X...', hat: '..x...x...x...x.' },
    voices: { hat: { gain: 0.8 } } }),
  (t0, t1) => myEvents.filter((e) => e.t >= t0 && e.t < t1),   // 任意生成函数：只返回 [t0, t1) 内的事件
];
const sched = MK.audio.attach(tl, SCORE);   // 一个时间轴挂一份乐谱；sched.set(newScore) 替换（如改 BPM）
```

事件通用字段（引擎处理）：`t`、`voice`（音色名或自定义函数）、`gain`（事件增益，默认 1）、`pan`（-1–1）、`bus`（`music` / `sfx` / `ui` / `bed`，默认按音色）、`send`（混响发送 0–1，默认按音色）、`duck`（侧链深度）、`seed`（随机种子，默认由音色名与 t 派生，离线结果可复现）。多数音色还接受 `vel`（力度 0–1）与 `note`（MIDI 数字或 `'A4'`、`'C#5'`）/ `f`（Hz）。

`pattern({ bpm, offset, from, to, div = 4, swing, tracks, voices })`：每个字符一步（`div` 步/拍，默认十六分）；`X` 重音、`x` 普通、`o` 弱音、`.` 休止，空格与 `|` 只是分隔；轨道名去掉末尾数字即音色名（`hat2` → `hat`），或在 `voices` 里给 `voice`；`swing` 0–1（1 = 三连音 shuffle）。

**调度行为**（`attach`）：

- 播放时按前瞻窗口（默认 120ms，`attach(tl, score, { lookahead })`）把时间轴时刻映射到 AudioContext 时刻排程，由时间轴每帧与一个40ms定时器共同调度；时间轴掉帧导致偏移超过 80ms 时自动重新对齐。
- **暂停、跳转（大于 1 帧）、画幅切换、页面转后台**：立即停止本乐谱已排程与正在发声的声部（12–15ms 淡出），连同它们送入的混响尾音一起换新，从新位置继续。暂停后≤60ms输出为数字静音，活跃声部为0。
- 与当前帧相差不到 1 帧的 seek（例如窗口 resize 时 `seek(tl.time)` 重绘）不打断声音。
- **持续音接续**：pad、drone、air、wind、riser、reverse、alarm 是“持续型”音色。播放、跳转、暂停后继续、切换画幅、开启声音时，开始于当前时刻之前、此刻仍应发声的持续事件会以 `offset` 从中途接上（快速淡入，扫频与渐强从对应进度继续）；离线渲染从中途开始时同样处理（与整段导出的同一区间RMS相差≤0.1 dB）。
- 支持 `tl.setRate()` 与 `loop`（循环回绕时继续排程开头的事件）；排程间隔误差0.00ms，按样本精度对齐锚点。

**即时触发**（交互输入）：`audio.play('blip', { note: 'E6', vel: 0.8, pan: -0.3 })` → `{ stop(fade) }`（未开启声音时返回 null）。交互作品的自动驾驶演示仍从乐谱出声；真实输入用 `play()`。

**自定义音色**：`audio.define('myHit', (ctx, out, when, p) => endTime, { bus: 'sfx', send: 0.2, level: 1 })`。在音色里用 `audio.dsp` 的 `osc / noise / gain / filter / perc / drive / panner / fm / noteHz / semis / rng` 创建节点：经 `osc`、`noise` 创建的音源会被引擎登记，暂停时能逐个停止；直接用 `ctx.createOscillator()` 也可以（会被事件增益淡出，但要自己保证会 stop）。

### 4.4 音色库

每个音色是 `(ctx, out, when, params) => 结束时刻` 函数（`audio.voices`），默认总线 / 混响发送 / 校准电平在 `audio.meta`。括号里是默认值。

重拍需要在笔记本扬声器上清晰可辨时，应给低频 `kick` 叠加 `rim`、`click` 等中高频层；节奏实验室的鼓组采用 `kick + rim`。仅用低频峰值判断重音强弱不足以反映小扬声器上的表现。

| 音色 | 总线 | 手段 | 参数 |
| --- | --- | --- | --- |
| `kick` 底鼓 | music | 正弦 + 音高包络、噪声点击、饱和 | `note/f`（48Hz 落点）、`punch`（3.6 倍起跳）、`decay`（0.45）、`drive`（0.35）、`click`（0.5）、`vel` |
| `snare` 军鼓 | music | 两支下滑三角波鼓皮 + 高通噪声响弦 + 峰值 EQ | `note/f`（185）、`decay`（0.2）、`snappy`（0.75）、`bright`（1） |
| `clap` 拍手 | music | 带通噪声三次重触发 + 尾音 | `decay`（0.22）、`spread`（0.011s）、`tone`（1150Hz） |
| `hat` / `openhat` 镲 | music | 六支方波金属音（808 比例）+ 高通噪声 | `open`（false）、`decay`（闭 0.055 / 开 0.38）、`tone`（1） |
| `tom` 通鼓 | music | 正弦下滑 + 带通噪声起音 | `note/f`（110）、`decay`（0.4） |
| `rim` 边击 | music | 三角 + 方波带通 + 噪声 | `tone`（1） |
| `sub` 次低频 | music | 808 式滑音正弦 + 轻饱和 | `note/f`（45）、`dur`（0.8）、`release`（0.35）、`glide`（1.6 倍） |
| `impact` 冲击 | sfx | 下坠次低频 + 棕噪声低通下扫 + 高频爆裂，整体饱和 | `note/f`（62）、`dur`（1.6）、`drive`（0.5）、`crack`（1） |
| `whoosh` 呼啸 | sfx | 粉噪声双带通扫频 + 起伏包络 + 声像扫过 | `dur`（0.6）、`dir`（`up` / `down`）、`from` / `to`、`q`（2.2）、`peak`（峰值位置 0.7 / 0.3）、`sweep`（0.7） |
| `riser` 上升音 | sfx | 噪声扫频 + 失谐锯齿上行 + 加速颤音 | `dur`（2）、`from`（250）、`to`（7000）、`tonal`（0.35）、`note/f`（110）、`semis`（12）、`trem`（0.3）、`rateFrom` / `rateTo`（5 / 22Hz） |
| `reverse` 反向渐强 | sfx | 高通噪声指数渐强后收住，可加和弦层 | `dur`（1.2）、`to`（9000）、`note` / `tonal`（加和弦） |
| `blip` 提示音 | ui | 正弦上挑 + 轻 FM | `note/f`（1320）、`decay`（0.09）、`bend`（1.26） |
| `click` 点击 | ui | 高通噪声 + 短正弦 | `note/f`（2400） |
| `tick` 打字 | ui | 带通噪声颗粒，按种子 ±12% 变调 | `note/f`（3600） |
| `key` 机械键 | ui | 触发点击 + 键身“咚” + 触底回弹 | `heavy`（0.6） |
| `confirm` 确认 | ui | 上行 FM 音阶 | `note/f`（C6）、`steps`（`[0, 7]` 半音）、`gap`（0.075） |
| `error` 错误 | ui | 下行低通方波蜂鸣 + 失真 | `note/f`（311）、`steps`（`[0, -5]`）、`gap`（0.13） |
| `beep` 蜂鸣 | ui | 平稳短音 | `note/f`（1000）、`dur`（0.12）、`wave`（`sine` / `square` / `triangle`） |
| `chime` / `bell` 钟铃 | sfx | 左右失谐 FM + 金属泛音 | `note/f`（G6 / C5）、`decay`（1.4 / 3）、`ratio`（3.5 / 1.4）、`index`（1.6 / 3.2）、`bright`、`width`（0.35） |
| `pluck` 拨弦 | music | 锯齿 + 方波经共振低通快速下落 | `note/f`（440）、`decay`（0.5）、`bright`（1）、`q`（3） |
| `bass` 贝斯 | music | 双锯齿 + 正弦，共振低通包络，可滑音 | `note/f`（55）、`dur`（0.4）、`cutoff`（520）、`env`（1.6）、`q`（5）、`from` + `glide`（0.06） |
| `pad` 铺底和弦 | bed | 每音两支失谐锯齿左右展开、低通 + 慢 LFO | `notes`（`[57,60,64,67]`）、`dur`（4）、`attack`（0.8）、`release`（1.6）、`cutoff`（1500）、`lfo`（0.18）、`detune`（8 音分）、`width`（0.6） |
| `glitch` 故障 | sfx | 随机短颗粒（方波 / 锯齿 / 带通噪声）+ 位深压缩 | `dur`（0.28）、`density`（40/s）、`bits`（4） |
| `shutter` 快门 | sfx | 开合两次机械咔嗒 + 弹簧余振 | `gap`（0.075） |
| `stamp` / `thud` 盖章 / 闷响 | sfx | 低频重击 + 低通棕噪声（+ 纸面拍击） | `weight`（1）、`tone`（1）、`slap`（1）/ `decay`（0.35） |
| `paper` 纸张摩擦 | sfx | 带通噪声 + 颗粒化随机包络 | `dur`（0.45）、`tone`（3200） |
| `air` / `wind` 环境底 | bed | 左右两路不相关噪声，带通中心随慢 LFO 漂移（wind 带阵风） | `dur`（8）、`fade`（1.5）、`tone`（1800 / 600）、`gust`（wind 0.6） |
| `sonar` 声呐 | sfx | 正弦脉冲 + 泛音 + 反馈延迟回声 | `note/f`（1250）、`decay`（1.1）、`echo`（0.34s）、`feedback`（0.38） |
| `alarm` 警报 | sfx | 双音交替方波 + 锯齿，低通 + 失真 | `note/f`（960）、`f2`（0.8 倍）、`rate`（4 次/秒）、`dur`（1.2） |
| `sparkle` / `shimmer` 闪光 / 微光 | sfx | 五声音阶高音 FM 颗粒随机散布 + 高频空气 | `dur`（0.5 / 1.8）、`count`（9 / 18）、`note/f`（C7 / C6） |
| `drone` 持续低音 | bed | 失谐锯齿 + 次八度正弦，低通呼吸 | `note/f`（55）、`dur`（6）、`fade`（1.2）、`release`（1.5）、`cutoff`（380）、`lfo`（0.08） |
| `tone` / `noise` | sfx | 即时声音接口 的基础音色 | 见 4.6 |

别名：`openhat`（= `hat` + `open`）、`ui-blip`（= `blip`）、`ping`（= `sonar`）、`reverse-swell` / `swell`（= `reverse`）。

### 4.5 离线渲染

`audio.renderOffline(score, duration, { sampleRate = 48000, channels = 2, from = 0, preroll = 2 })` 用 OfflineAudioContext 与**同一套音色、同一条混音链**生成 PCM，返回 `{ data, peakDb, rmsDb, clipped, wav(), base64() }`；`from > 0` 时向前多渲染 `preroll` 秒再裁掉，并接上之前开始的持续音。`audio.encodeWav(channels, sampleRate)` 编码 16-bit PCM WAV。站点或脚本通常通过 `__motion.audio.renderWav()` 调用，它按 `from + audio.latency` 截取，补偿主链路的 6ms 处理延迟，使导出的第 0 个样本对齐画面的 `from`。直接使用 `renderOffline()` 时由调用方处理这项补偿。

### 4.6 即时声音接口

`MotionKit.sound()` 返回 `{ enabled, ctx, enable, disable, toggle, tone({f, d, type, g, slide, attack, delay}), noise({d, g, lp, hp, delay}) }`，与 `MotionKit.audio` 共用引擎、声音开关及混音链，所以站点的 `motion:sound` 对自适应 Demo 同样有效。使用即时音效的 Demo 自行安排的前瞻排程在暂停或跳转时也会被淡出。时间轴声音使用乐谱。

`motion:ready.sound` 取乐谱、`expose()` 的声音元数据和 kit 的声音使用标记：创建 `sound()`、调用 `audio.play()` / `audio.attach()`，或给 `controls()` 传入声音对象都会登记。它表示 Demo 使用声音，不表示当前已开启；`__motion.audio` 只表示可离线导出的乐谱接口，不能用于判断即时音效是否存在。仅在用户操作后才调用 `audio.play()` 的 Demo，应在 `expose(tl, { sound: true })` 中预先声明声音能力。

## 五、加载与就绪

案例初始化前用 `MotionKit.load.prepare({ styles, modules, images, data, audio, fontText })` 登记并下载全部必需资源。`styles` 解析样式、字体和图片；`modules` 下载模块依赖图；`images` 下载并解码；`data` 和 `audio` 下载字节。之后通过下列接口读取同一份缓存。

| 接口 | 结果 |
| --- | --- |
| `load.register(urls)` | 登记必需 URL，可传 `{ url, bytes }`；按绝对 URL 去重 |
| `load.fetch(url, options)` | 计数读取响应流，返回可重复读取的 Response |
| `load.image(url)` / `load.url(url)` | 已解码的 Image / 已准备资源的 Blob URL |
| `load.font(family, url, descriptors)` | 下载并加载 FontFace |
| `load.stylesheet(url, { document, fontText, fonts, before })` | 按声明位置保留样式顺序，加载样式及其资源；fontText 选择所需 Unicode 字体分片；fonts:false 只应用布局样式 |
| `load.module(url)` / `load.moduleURL(url)` | 加载模块 / 返回模块依赖已准备的 Blob URL |
| `load.script(url, { document })` | 下载并执行普通脚本 |
| `load.loader(run, window)` | 将第三方 URL loader 的 fetch 接入计数，并保持其原始加载流程 |
| `load.audio(url)` / `load.decode(run)` | 已解码音轨 / 独立解码阶段 |
| `load.source(id, state)` / `load.state` | 合并来源进度 / 当前状态 |

字节总量优先使用固定素材映射的 bytes，其次使用未压缩响应的 Content-Length；未知总量以已下载字节计并标记 unknownTotal。速度使用最近三秒的下载字节变化。下载百分比单调不减，就绪前最高为 99%，100% 与 ready 同步发布；解码和首帧准备使用独立阶段。

`MotionKit.preload(tasks, { onProgress, timeout = 3600000 })` 登记必需准备任务。tasks 接受 Promise、返回 Promise 的函数或 `{ run, weight, label }`。失败或超时会拒绝 ready；计数请求收到响应头后，响应体连续 60 秒没有数据时失败。

公共 expose 层在 ready 前禁用 play、toggle、seek、快捷键与宿主播放／定位消息。控制条、站点播放、重播、刻度条和节拍点同时禁用。URL 的 t 和默认初始时刻在就绪时提交一次；render 模式的 API seek 等待 ready 后执行。音轨是必需资源；声音默认关闭。

replay 等待全部来源 iframe、音轨与初始帧完成，按 URL 合并字节并共享下载缓存。地图巡礼在开头缓冲完成后就绪，播放中的后续瓦片沿用缓冲泵：解析窗口 10 秒，下载窗口 45 秒，开头 6 秒；前方不足 0.5 秒时暂停，缓冲 4 秒后继续。渲染模式逐帧等待地图。档案终端以应用字体、模型、音轨和初始帧的最终完成状态发布 ready。

独立 Demo 与站点详情都显示进度条和“已下载 23.4 / 56.0 MB · 1.8 MB/s · 文件 87 / 243 · 下载中”。阶段为下载中、解码中、准备首帧；失败显示原因与重试，重试重新加载 Demo。减少动态偏好下进度条没有动画。

状态通过 motion:loading 事件及父窗口消息同步，包含：

```js
{ type: 'motion:loading', progress, loadedBytes, totalBytes, unknownTotal,
  bytesPerSecond, filesDone, filesTotal, phase, error,
  resources: [{ url, loaded, total, known, downloaded }] }
```

phase 为 download / decode / frame / ready / error；error 成功时为 null，失败时为原因。resources 用于重放来源按 URL 去重汇总。HTML 的 data-motion-loading 保存进度，data-motion-ready="1" 表示就绪。

## 六、宿主通信协议（postMessage）

站点详情页用**同源** iframe 嵌入 Demo。父页面仍可直接操作 `iframe.contentWindow.__motion`（seek / play / pause / on）；以下消息用于画幅、声音与状态同步。Demo 只接受 `event.source === window.parent` 的消息。

父页面 → Demo：

| 消息 | 说明 |
| --- | --- |
| `{ type: 'motion:orient', orient: 'landscape' \| 'portrait' }` | 切换画幅（舞台创建前收到也有效）；不支持时 Demo 回报实际画幅并带 `rejected` |
| `{ type: 'motion:sound', on: true \| false }` | 开关声音 |
| `{ type: 'motion:query' }` | 请 Demo 重发 `motion:ready`（若已就绪）、`motion:loading`、`motion:sound` |
| `{ type: 'motion:play' }` / `{ type: 'motion:pause' }` / `{ type: 'motion:seek', t }` | 可选，跨源嵌入时代替直接调用 `__motion` |

Demo → 父页面：

| 消息 | 说明 |
| --- | --- |
| `{ type: 'motion:ready', duration, orients, orient, markers, sound, title, kit }` | 预加载完成后发送一次（`motion:query` 可重发）。`orients: []` 表示自适应 Demo；`sound` 表示有声音（乐谱或即时音效） |
| `{ type: 'motion:orient', orient }` | 画幅变化（含自动切换）；请求了不支持的画幅时带 `supported`、`rejected` |
| `{ type: 'motion:loading', … }` | 字节、速度、文件数与阶段，格式见加载与就绪 |
| `{ type: 'motion:sound', on, state }` | 声音状态变化：`state` 为 `off` / `on` / `blocked` |

**开启声音**：点击声音按钮即可开启。若显示“待启用”，点击舞台或再次点击声音按钮。嵌入页面使用 `allow="autoplay"`，通过 `motion:sound` 接收开关状态。画幅按钮只在 Demo 支持多种画幅时显示，切换后保持当前时刻。

## 七、URL 参数

| 参数 | 作用 |
| --- | --- |
| `?embed` | 站点内嵌：不创建 Demo 自带的控制条与加载条 |
| `?render` | 逐帧渲染：不自动播放、不开启实时声音；异步 Demo 在 seek 时等待资源 |
| `?t=12.5` | 打开时定位到 12.5 秒 |
| `?autoplay=0` | 不自动播放 |
| `?orient=landscape` / `?orient=portrait` | 固定画幅（也接受 `l` / `p`） |
| `?sound=1` | 载入后尝试开启声音（仍受自动播放策略约束，见上表） |

## 八、控制条 `MotionKit.controls(tl, { sound, accent, orient = true, rates, step = 'seconds' })`

播放 / 暂停、从头播放、刻度、时间，外加画幅切换（舞台支持两种画幅时出现，SVG 图标显示“将切换到”的画幅）与声音开关（传入 `sound` 或时间轴挂了乐谱时出现；被策略挡住时半透明）。只在独立打开时创建（`?embed` / `?render` 不显示）。键盘：空格播放 / 暂停，←/→ 跳 1 秒，Shift+←/→ 跳到上 / 下一个标记，Home 回到开头；焦点在按钮上时空格与回车交给按钮本身（避免双重切换）。

`rates` 添加速率菜单；`step: 'frames'` 添加前后逐帧按钮，方向键暂停并按 fps 步进。

按钮节点只创建一次，状态变化时切换属性（`data-playing`、`data-sound`、`data-orient`），使一次按下与抬起始终落在同一节点上。网站详情页的播放器位于 `site/motion/player.tsx`，播放按钮保持同一节点；舞台、工具栏与时间轴按视口布局，就绪后允许定位，横竖切换保持当前时刻，全屏时提供控制条。

## 九、逐帧渲染成视频

`scripts/render.mjs` 用本机的 Edge 或 Chrome（无头模式，通过 DevTools 协议控制，无需安装依赖）打开 Demo，等待 `__motion.ready`，按帧率逐帧 `seek` 并截图：

```bash
node scripts/render.mjs demos/cases/map-pilgrimage/index.html --fps 30
node scripts/render.mjs demos/cases/map-pilgrimage/index.html --orient portrait --fps 30 --audio
node scripts/render.mjs demos/cases/map-pilgrimage/index.html --audio-only
```

| 选项 | 默认 | 说明 |
| --- | --- | --- |
| `--orient` | landscape | `landscape`（视口 1920×1080）或 `portrait`（1080×1920），DPR 1，并给 URL 加 `?orient=` |
| `--fps` | 30 | 帧率 |
| `--w` / `--h` | 随画幅 | 覆盖视口尺寸（一般不用） |
| `--from` / `--to` | 0 / duration | 渲染区间（秒） |
| `--out` | `renders/<demo名>`（竖屏加 `-portrait`） | 输出目录：`frame-00001.png` … |
| `--format` | png | `png` 或 `jpeg` |
| `--audio` | | 用 `__motion.audio` 离线渲染同一区间的 WAV，写到 `<out>.wav`（48kHz 16-bit 立体声），打印峰值与 RMS |
| `--audio-only` | | 只导出 WAV |
| `--sample-rate` | 48000 | WAV 采样率 |
| `--port` | 4321 | 传入相对路径时，脚本会自动在该端口起本地服务器 |
| `--no-encode` | | 不调用 ffmpeg |

如果 `ffmpeg` 在 PATH 上，渲染结束后自动合成 `<out>.mp4`（H.264、yuv420p、CRF 18；有 WAV 时 AAC 192k 一起封装）。没有 ffmpeg 时脚本会打印完整的合成命令，例如：

```bash
ffmpeg -y -framerate 30 -i renders/map-pilgrimage/frame-%05d.png -i renders/map-pilgrimage.wav -c:v libx264 -pix_fmt yuv420p -crf 18 -c:a aac -b:a 192k -shortest renders/map-pilgrimage.mp4
```

使用即时音效的 Demo（没有挂乐谱）使用 `--audio` 时会提示跳过；挂接乐谱后即可导出声音。

### 性能提示

- 1920×1080、30fps、30 秒约 900 帧，PNG 序列约 1–2GB；用 `--format jpeg` 可显著减小体积。
- 地图类 Demo 每帧需要等待瓦片空闲，渲染较慢；先用 `--fps 12` 预览节奏，再渲染正式版本。
- 渲染时页面不会播放，所以“播放中才出现”的效果（例如运动模糊残影）需要在 render(t) 里用 `t` 计算，而不是依赖上一帧。

## 十、预览图与截图

| 脚本 | 说明 |
| --- | --- |
| `node scripts/capture.mjs [--only ids] [--orient both\|landscape\|portrait] [--out 目录] [--url 页面 --kind 类别 --t 秒]` | 预览图：横屏 1280×720 → `previews/<kind>/<id>.jpg`；Demo 支持竖屏时再出 720×1280 → `previews/<kind>/<id>-portrait.jpg`（时刻用条目的 `previewAtPortrait`，缺省同 `previewAt`）。类别为 cases、patterns、materials。站点数据里对应 `preview` 与 `previewPortrait` |
| `node scripts/shot.mjs <url> --orient portrait --t 3 --t 5 --out a.png` | 截图：`--orient` 给 URL 加 `?orient=` 并把视口默认设为舞台尺寸；可用 `--w/--h` 检查缩放与黑边 |

预览图工具使用本机 GPU，每个条目完成后关闭浏览器。条目设置 `"renderer": "gpu"` 时，工具还会确认硬件渲染并输出 WebGL renderer。

`seek` / `play` 可以返回 Promise，供截图和渲染工具等待画面就绪。

## 十一、可交互 Demo 的双时钟

操作台类 Demo（档案终端）既要能被操作，又要能被录制。做法：

- 界面状态由**事件列表**推导：`state = derive(events.filter(e => e.t <= t))`。
- 自动驾驶：预设一份事件表，时间轴播放时按 `t` 取事件，演示完整流程；声音写在乐谱里。
- 用户一旦有真实输入，切换到**实时时钟**，把输入作为新事件追加，反馈音用 `audio.play()` 即时触发；指针坐标先过 `stage.toStage()`。外部 `seek` / `play` 时回到自动驾驶。

这样逐帧渲染得到的永远是那份预设演示（声音也能离线导出），而用户在页面上可以随意操作。

## 十二、MotionKit 速查

| 函数 | 用途 |
| --- | --- |
| `clamp / lerp / invLerp` | 基础插值 |
| `bezier(x1, y1, x2, y2)` | CSS cubic-bezier 的 JS 实现 |
| `ease.*` | 常用缓动与命名 Token（snap、glide、emphasized、exit、anticipate） |
| `seg(t, start, dur, ease)` | 片段进度 0→1 |
| `env(t, a, b, inDur, outDur)` | 入—停—出包络 |
| `keyframes(frames, t)` | 多值关键帧插值 |
| `rng(seed)` | 可复现随机数 |
| `typeText / scramble / count / pad` | 打字、解码、数字滚动、补零 |
| `beats(bpm, offset)` | 拍点：`at`、`beatOf`、`pulse`、`quantize` |
| `mountFilm / replay` | 时间纯函数作品接入 / 案例片段重放 |
| `timeline / expose / start / controls / params` | 时间轴、协议暴露、启动、控制条、URL 参数 |
| `stage(opts)` | 固定画幅舞台 |
| `preload(tasks)` + `preload.image / font / fonts / fetch / wait / cache` | 预加载 |
| `audio.enable / disable / toggle / state / on / meter / active` | 声音开关与状态 |
| `audio.attach / pattern / play / stopAll / define / setMix / renderOffline / encodeWav / voices / dsp` | 乐谱、即时触发、自定义音色、混音、离线渲染 |
| `sound()` | 即时声音接口（tone / noise），共用声音引擎 |
| `tween / follow` | 非时间轴场景的补间与临界阻尼跟随 |

完整接口实现见 `kit/motion-kit.js`，仓库操作见 [AGENTS.md](../AGENTS.md)。

## 十三、发布素材地址

完整本地包包含全部运行文件和素材。发布包的 `data/asset-sources.js` 记录源提交与素材地址，图像、音视频、字体与模型等媒体按所在目录分发：

- `demos/` 下的全部媒体（含案例、巧思、素材本体与素材快照），不论大小，均从固定源提交的 GitHub 地址加载。
- `agent/`、`data/`、`docs/`、`entries/`、`kit/`、`previews/`、`prompts/`、`scripts/templates/`、`site/runtime/`、`site/icons/` 中的媒体，至少 128 KiB 时从固定源提交的 GitHub 地址加载，较小文件随站点部署。

JS、CSS、HTML、JSON 等非媒体文件随站点部署。

`MotionAtlasAssets.resolve(url)` 解析图片、字体与 `fetch` 使用的素材地址；MotionKit 提供预加载、缓存、进度与就绪通知。地图瓦片及清单外请求使用其配置地址，发布模式需要访问对应网络来源。

文字快照由条目的 `snapshotPath` 确定，完整保存在源码与本地包内，原始素材与目录结构保持原样。发布副本的 HTML/CSS 改写素材地址并接入素材解析器，网站动态设置的封面等素材地址由运行时解析。快照内的 Markdown、许可等原文不改写。

使用 `npm run build:site -- --commit <提交号>` 生成发布包；提交号为 `MIBXR/motion-atlas-next` 中已推送的 40 位十六进制 Git 提交号。
