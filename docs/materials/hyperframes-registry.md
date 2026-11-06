# HyperFrames Registry 使用说明

HyperFrames Registry 把可复用的视频画面作为可编辑源码安装进项目。本库保存 55 个精选模块与 8 个完整模板；[样例页](../../demos/materials/hyperframes-registry/index.html)可播放本地项，按 22 个官方分类浏览全部 448 个模块与 8 个模板。

## block、component 与模板

- **block** 是自带时间线的场景，安装到 `compositions/<名字>.html`，用 `data-composition-src`、合成 id、起点与时长挂入项目。
- **component** 是合并到场景的片段，安装到 `compositions/components/<名字>.html`，按源码中的接入说明复用标记、样式与脚本。
- **模板** 是项目起点，通过 `init --example` 创建，包含根合成、场景与可替换媒体位置。

## 安装与接入

先用 `/hyperframes-registry` 或 `npx hyperframes catalog --query "<英文视觉描述>" --json` 查找模块，再从样例页复制对应安装命令。block 与 component 使用 `npx hyperframes add <名字>`；模板使用 `npx hyperframes init <项目> --example <模板>`。

block 从 `add` 输出的挂载片段开始接入，component 按其注释合并进场景。保留条目的 id 前缀，为单次挂载设置 `data-variable-values`，再调整文案、颜色、字体与媒体。完成后按 [Agent Skills 流程](hyperframes-skills.md#常用流程)检查、预览和渲染。

## 精选口径

每个官方子类选 1–4 个互不重复的代表。在素材详情与独立页的侧栏切换精选、模板或全部条目，展开分类并点击作品即可播放。“精选”和“全部”支持按中文标题、分类或原名过滤；过滤和切换范围时保留当前作品，点击条目后切换播放。未入库项标注“官网”。在手机上通过“作品目录”展开同一目录树。`?demo=<名字>` 可直接定位条目。播放器默认静音，遵循系统减少动态设置。

从样例页的官网链接查看未入库项，通过上游 CLI 安装；固定版本源码与版本信息见[素材条目](../../materials.html#material/hyperframes-registry)。完整目录索引与本地项尺寸、时长分别在样例的 `demo/catalog-index.json` 和 `demo/local-items.json`，重建命令见 [source/USAGE.md](../../demos/materials/hyperframes-registry/source/USAGE.md)。

## 官方分类

| 分类 | 用途 |
| --- | --- |
| 3D motion | 以空间运动呈现标题与画面。 |
| 3D objects | 展示产品旋转、分层与三维物体。 |
| Carousels | 让图像或文字沿轨道和空间队列运动。 |
| Captions | 以节奏、逐词高亮和排版呈现字幕。 |
| Typography & Text | 以字体切换、翻牌和字符重组呈现文字。 |
| Lower Thirds | 放置字幕条、身份信息与新闻滚动条。 |
| Code Animations | 展示代码差异、变形与终端过程。 |
| Code Snippets | 把代码片段排成视频画面。 |
| Shader Transitions | 以着色器完成溶解、漏光与甩镜转场。 |
| CSS Transitions | 以网格和节拍组织切换。 |
| Data | 呈现图表、排名变化与地图数据。 |
| Showcases | 展示应用、画廊与对话。 |
| Product Demo | 组合浏览器设备、输入提示与编辑器演示。 |
| Social Overlays | 呈现社交帖子与关注信息。 |
| Motion Scenes | 组合卡片、标志与白板笔迹场景。 |
| Cursors | 编排光标点击、移动与拖拽。 |
| Motion Primitives | 复用数字轮、流式文字和滚动数字等运动单元。 |
| Effects | 以拼贴、撕纸和视差扩展画面效果。 |
| Camera | 实现拉远揭示与镜头震动。 |
| Texture | 叠加颗粒与墨迹质感。 |
| HTML-in-Canvas | `liquid-glass-widgets` 需要开启 `chrome://flags/#canvas-draw-element`；`vfx-shatter` 在样例页不实时播放，原因见 [fidelity.md](../../demos/materials/hyperframes-registry/fidelity.md)。 |
| Blocks | 提供流程图、硬件管线、液态金属与标志收尾等场景。 |

源码适配与 5 项官网对照结论见 [fidelity.md](../../demos/materials/hyperframes-registry/fidelity.md)，运行库和媒体的许可见 [LICENSES.md](../../demos/materials/hyperframes-registry/LICENSES.md)。
