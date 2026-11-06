# HyperFrames Agent Skills 使用说明

HyperFrames 把 HTML、CSS、媒体与可定位动画逐帧渲染为 MP4。技能包为编码 Agent 提供合成约定、制作流程和按任务查阅的参考。本库保存的 8 个技能目录及固定版本见[素材条目](../../materials.html#material/hyperframes-skills)，原文入口为 [hyperframes/SKILL.md](../../demos/materials/hyperframes-skills/skills/hyperframes/SKILL.md)。

## 总入口

处理视频制作、编辑、动画或渲染任务时，先读 `/hyperframes`。它定义根合成、定时元素、暂停时间线、媒体与字体的写法，并按宣传片、讲解片、数据、竖屏、三维等任务指向对应参考。独立技能以 `/hyperframes` 调用；Claude Code 插件的入口是 `/hyperframes:hyperframes`。

## 核心四件

| 技能 | 做什么 |
| --- | --- |
| `/hyperframes` | 提供 HTML 视频合成约定、制作循环与画面、字幕、动效、分镜参考。 |
| `/hyperframes-cli` | 按任务使用 CLI：新建、检查、看帧、编辑时间线、预览与渲染。 |
| `/hyperframes-registry` | 查找并安装可编辑的 block 与 component，复用转场、标题、字幕、图表、地图、三维和镜头运动。 |
| `/media-use` | 取得或制作音视频、图片、图标、配音与字幕媒体，处理画面质感和放置后的音频混合。 |

`npx hyperframes skills update` 安装或刷新核心集合。安装入口集中在素材条目的“安装”字段。

## 按需四件

| 技能 | 做什么 |
| --- | --- |
| `/figma` | 将 Figma 资产、品牌变量、组件和分镜帧带入视频。 |
| `/slideshow` | 制作带片段揭示、分支热点和演讲者备注的现场演示文稿，用 `hyperframes present` 展示。 |
| `/remotion-to-hyperframes` | 将 Remotion 等视频代码、可逐帧绘制的浏览器动画或既有渲染媒体接入 HyperFrames，并逐帧对照。 |
| `/reverse-any-video` | 测量并观看源视频，重建可编辑项目后逐帧对照；此目录标记为内部技能，要求登录付费方案。 |

## 常用流程

1. **计划**：确定视频类型、尺寸、时长、镜头与媒体。新项目用 `npx hyperframes init <目录>`；完整影片按主技能的叙事与规格参考组织计划。
2. **写 HTML**：以 `index.html` 为根合成，场景放在 `compositions/`，媒体与字体放在 `assets/`。定时元素用 `class="clip"`、`data-start` 和 `data-duration` 声明时间。
3. **接入可定位动画**：为每个合成建立暂停时间线，注册到 `window.__timelines[合成 id]`。画面由时间线时刻确定，媒体定位由运行时处理。需要现成视觉时先查 Registry。
4. **lint**：编写过程中用 `npx hyperframes lint`，完成后用 `npx hyperframes check --json`，并查看关键帧。
5. **预览**：用 `npx hyperframes preview` 打开 Studio 预览，查看画面与时间线。
6. **渲染**：确认预览结果或需要成片时，用 `npx hyperframes render` 导出 MP4。

模块与模板的本地预览见 [HyperFrames Registry](../../materials.html#material/hyperframes-registry)。
