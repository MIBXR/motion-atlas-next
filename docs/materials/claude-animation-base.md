# Claude Animation Base · 手绘卡通动画套件

JohnHeibel 将 [P(doom) 手绘 MV](../../cases.html#case/pdoom-video) 的代码与对模型表现的分析整理为 p5.js + p5.brush 入门套件。快照包含绘制引擎、角色设定、场景时间轴、逐帧渲染入口和给模型阅读的 [ANIMATION_GUIDE.md](../../demos/materials/claude-animation-base/ANIMATION_GUIDE.md)；入口为[上游主文档](../../demos/materials/claude-animation-base/README.md)。

## 怎么用

1. 克隆套件，在 Claude Code 等 Agent 中先让模型阅读 ANIMATION_GUIDE.md。
2. 用一句话说明要做的短片（如“15 秒，Clawd 追蝴蝶”），模型先给分镜，再逐镜头实现。
3. 场景写在 src/scenes/，每个镜头是只取决于时刻 t 的纯函数；时长与节拍在 src/config.js。
4. 在 Chrome 中打开 studio.html，拖动时间轴检查；用 ?loop=emotions、?loop=views 查看表情与视角设定图。
5. 运行 npm install 后，用 node render.mjs --clip --out=out/video.mp4 输出成片；没有独立显卡时让模型换掉水彩填充，或加 --soft-gl。

## 套件内容

| 路径 | 内容 |
| --- | --- |
| ANIMATION_GUIDE.md | 动画规则、制作流程与完整 API，供模型先读 |
| src/clawd.js | 角色视角、31种表情、眼型、嘴型、帽子、符号与舞步 |
| src/core.js | 绘制、节拍与运动函数、镜头、光照、纸底 |
| src/timeline.js | 镜头、独立循环与笔刷擦除 |
| src/config.js | 影片时长与节拍 |
| src/scenes/ | 自己的影片场景，附11秒示例 |
| render.mjs | 无头渲染：接触表、逐帧条、裁切、静帧、MP4 |
| docs/ | 表情动画、静态表情图及视角、动作与帽子设定图 |

## 渲染环境

需要 Node.js、Google Chrome 与 ffmpeg。p5.brush 的水彩填充在集显上每帧需数秒；集显环境可让模型换用其他绘制方式。`--chrome=<路径>` 或 `CHROME_PATH` 指定 Chrome；`--soft-gl` 用软件 WebGL 渲染；无头 Linux 的 NVIDIA 环境可用 `--gpu-angle=gl-egl` 或 `vulkan` 选择 ANGLE 后端，`gpu_probe.mjs` 显示各组参数实际使用的 renderer。
