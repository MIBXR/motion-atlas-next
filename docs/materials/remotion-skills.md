# Remotion Agent Skills 使用说明

Remotion 官方维护的 Agent Skills 发布在 [remotion-dev/skills](https://github.com/remotion-dev/skills/tree/30d4553ecd46fbc5212fd0ff006ae43af522158b)，源码位于主仓库的 [packages/skills](https://github.com/remotion-dev/remotion/tree/35e07c283d704cd6c28bbc63a030e30356e62b09/packages/skills)，供 Claude Code、Codex、Cursor 等 Agent 在 Remotion 项目中用 React 制作视频。本库保存版本 4.0.539、提交 `30d4553ecd46fbc5212fd0ff006ae43af522158b` 的完整原文快照，主入口为 [remotion-best-practices/SKILL.md](../../demos/materials/remotion-skills/skills/remotion-best-practices/SKILL.md)。

## 安装

任选一条命令安装全部技能：

```bash
npx skills add remotion-dev/skills
```

```bash
gh skill install remotion-dev/skills
```

用 `bun create video` 新建项目时也可勾选安装技能。安装命令取得上游当前版本；本库快照固定在上述提交。

## 技能一览

| 技能 | 用途 |
| --- | --- |
| `/remotion-best-practices` | 总入口，按当前任务路由到具体的 Remotion 技能。 |
| `/remotion-create` | 新建 Remotion 项目或合成，搭建 React 视频。 |
| `/remotion-markup` | 编写 Remotion React 画面、动画、排版、媒体元素与特效。 |
| `/remotion-captions` | 转录、显示与制作动态字幕。 |
| `/remotion-maps` | 按镜头选择静态地图、Mapbox、MapLibre、MapTiler 或 CesiumJS 地图动画方案。 |
| `/remotion-multimedia` | 用 Mediabunny 在浏览器中处理音视频，读取时长与视频尺寸。 |
| `/remotion-interactivity` | 按独立编辑单元组织 React 节点，让 Studio 可选择、移动、裁剪和调整样式。 |
| `/remotion-studio` | 启动 Studio 并打开视频预览。 |
| `/remotion-render` | 导出视频、静帧、多帧图像或透明视频。 |
| `/remotion-saas` | 构建接入 Remotion Player 与渲染能力的视频生成应用。 |
| `/remotion-upgrade` | 升级 Remotion、相关包、兼容的 Mediabunny 包与项目内技能。 |
| `/remotion-docs` | 搜索 Remotion 官方文档并读取 Markdown 格式的 API、组件与包指南。 |

## 用法

1. 用 `npx skills add remotion-dev/skills` 或 `gh skill install remotion-dev/skills` 安装全部技能；用 `bun create video` 新建项目时也可勾选安装。
2. 不确定该用哪个技能时调用 `/remotion-best-practices`，由它按任务转到具体技能。
3. 新建项目或合成用 `/remotion-create`；画面、动画与特效的写法按 `/remotion-markup`。
4. 字幕用 `/remotion-captions`，地图动画用 `/remotion-maps`，音视频读取与转换用 `/remotion-multimedia`，要让 Studio 能直接选择、移动和调整画面元素时用 `/remotion-interactivity`。
5. 用 `/remotion-studio` 预览，`/remotion-render` 导出；做成在线生成应用用 `/remotion-saas`，升级版本用 `/remotion-upgrade`，查官方文档用 `/remotion-docs`。

## 与本库的关系

- [Ink Press 纸墨宣传片](../../cases.html#case/ink-press)用 Remotion 4.0.484 制作，可对照 `remotion-markup` 的写法。
- [video-shotcraft · 镜头配方卡宣传片](../../materials.html#material/video-shotcraft)的镜头配方卡以 Remotion 组件为参考实现。

## 社区作品

素材详情的效果画廊收录 [Remotion Prompt Showcase](https://www.remotion.dev/prompts) 中 25 件社区作品的静帧，每张链接到原片与提示词。

## 许可

skills 仓库未附许可文件，package.json 指向 Remotion 主仓库的 packages/skills；按主仓库 Remotion License 记录，原文见快照内 [REMOTION-LICENSE.md](../../demos/materials/remotion-skills/REMOTION-LICENSE.md)。个人、3 名员工以内的营利组织与非营利组织可免费使用（含商用），更大规模的营利组织需购买公司许可。
