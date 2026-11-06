# 贡献指南

## 仓库定位

本库是个人设计参考库，不是作品画廊。它保存三类内容：可参考的案例范本、从范本中拆出的巧思、可直接取用的素材。

案例范本有两个用途：

1. **参考**：遇到真实需求时，从范本出发修改、增减、拼接，做出新的作品。
2. **验证**：检验某个来源的制作思路、工作流或 skill 能否在本库的条件下真正生效。

范本的价值在于制作过程可读、内容可改，成片只是这个过程的检验结果。复刻他人作品与本库原创的案例按同一标准对待。

## 收录边界

本库收录以时间线为载体的作品：作品掌握节奏，按时间线播放；交互在时间线上分支，时间驱动的 Demo 可以逐帧渲染成视频。

收录影像视频（片头、宣传片、旅行影像、数据短片等）、带自动驾驶时间轴的交互操作台与展示台，以及能单独借用的转场、节奏、文字动效、画面构成、信息层、质感、声音和镜头巧思。网站与网页应用及其页面动效、微交互属于 Web Atlas。

1. 最终形态是视频，或带时间轴、按时间线播放的操作台／展示台，归入本库，即使它运行在浏览器里。
2. 最终形态是网站或网页应用，归入 Web Atlas。
3. 难以判断时，设想逐帧导出视频：核心价值仍在，归入本库；价值依赖重排、滚动阅读和观看者自己的节奏，归入 Web Atlas。
4. 同一来源在两种载体上都有价值时，本库只收时间线部分，条目本身保持完整。
5. 主题相同、表现形式不同的作品可分别进入两个库，各自独立、互不引用。
6. 画幅大小与固定画幅都不是判据，判据冲突时以“谁掌握时间”为准。完全由观看者拖拽、没有时间线的网页光照演示属于 Web Atlas。

## 收录原则

- **案例驱动**：案例以真实 Demo 或作品为对象。skill 或教程中有作品时忠实复刻；只有可实践的方法时，实际制作一个完整作品作为案例。用于制作时间线作品的工具、skill 与提示词作为素材收录。
- **忠实复刻**：忠实复刻是验证过程，不是目的：检验在给定的素材、工作流与工具下能否复现参考作品；能 1:1 复现，说明这套过程正确、可复现。
  - **验收以 1:1 为准**：有明确参考或源码的，与原作在相同视口并排对照一致，差异写明原因；没有源码，或源码、制作过程不完整的，尽力复现，无法复现的差异写明原因。按文档分工记录本次对照结果。
  - **素材可直接取用，成片不能替代实现**：图形、人物形象、图片、字体、音乐、音效、视频等组成画面的素材可以直接取自原作，以后也可以替换；画面的构成、动效、交互与时间线由本库代码实现，不把原作渲染好的成片画面当作复刻结果。原作的品牌内容与文案照用。
  - **实现范围与影像转译**：时间线作品按任务确定的范围实现，删减及原因写入 `fidelity.md`；只有压缩打包代码时，按参考作品自行实现并记录实现范围。官方影像的网页转译以官方影像为素材，整帧画面可作为素材。
  - **生成类素材**：原作由脚本生成的素材（抠图、贴纸、纸纹、渲染帧等）直接使用原作已生成的版本，生成脚本及其输入保留在条目本体的 `source/`；本库自己重新生成并验证过的版本也可以保留。
  - **有可用源码的作品，原作代码保持原样**：不为“易改”重组原作代码结构，改动只限接入本库与去掉与成品无关的内容（其他剪辑分支、调试代码、无人读取的中间文件）。原作缺数据或源码与公开成品不符时，以公开成品为准补全。
  - **对照画面**：只由原作代码产生；适配层只负责加载、定位与播放，不为提高对照分数改动画面（不叠加压缩、不替换原作的着色器与绘制代码）；两列 SSIM 中的编码链只在测量时施加。
- **可修改**：修改范本时直接读改源码，不要求把内容抽成配置。案例、巧思与素材的迁移指南（`migration`）均为可选；有可提炼的常改内容（路线、图片、文案、节拍、配色、素材）时，写明在哪个文件、哪一段。
- **保留制作依赖**：收录是为了日后参考、学习和复现制作。除成品运行所需的内容外，制作该作品必需的工具与依赖也一并保留：配乐合成库与采样、素材生成脚本、模拟与渲染场景，以及这些脚本读取的数据。条目专属的放在条目本体的 `source/`；多个条目共用的作为素材收录在 `demos/materials/<id>/`，由条目引用。与本库已有工具完全等价的可以不收，在条目说明中写明对应关系。工具与依赖要能在库里取得，并写明用法；不要求每个案例都验证一键重跑。
- **方法与决策记录**：有研究价值时，在 `docs/cases/<id>.md` 记录参考与来源、采用的工作流／skill／提示词、关键决定与理由、怎么改；验证结论链接到本体的 `fidelity.md`。不强制每个案例都写，避免用固定格式限制范本。
- **语言**：站点说明使用中文，装饰性的英文眉题除外；被复刻作品自身的原文、作为素材收录的 skill 与 prompt 原文保留原语言。
- **声音**：原创作品采用非 AI 合成的连续公开音乐打底，在 3–4 个关键节点加入低于音乐音量的短音效，例如 Kevin MacLeod 的 CC BY 4.0 音乐、Kenney 的 CC0 音效；复刻作品沿用原作声音。
- **第三方资源**：画面、字体、音乐、贴图与库保留完整素材、原字节、许可原文与署名，许可入口列在条目本体的 `LICENSES.md`。文字素材快照仅含上游原文文件与许可原文，保留原语言与原字节。第三方库按固定版本保存于 `vendor/<库>@<版本>/`；地图案例的 MapLibre 使用固定版本 CDN。
- **作者效果图**：逐图在条目 JSON 中记录原 URL、许可与静态／动态属性。
- **界面**：站点正文、导航、标签、辅助信息和控件的最终字号至少 12px；案例、巧思、嵌入 Demo 及画面内文字按设计需要确定。网站功能图标来自 lucide-react；Demo 内的图标按 Demo 自身。站点控件支持键盘与指针操作，声音由用户启用。

## 三类组织规范

内容分为案例 `cases`、巧思 `patterns`、素材 `materials`，同一 id 在各目录中对齐。只建立实际用到的目录。

三库分别维护内部收录编号 `order`，正序按收录先后递增。新条目使用所属库现有最大编号加一；修改条目或为已有巧思补充来源时保留编号。编号用于排序，并显示在卡片与详情页的位置导航中。

| 一级目录 | 角色 | 组织 |
| --- | --- | --- |
| `entries/` | 内容源：条目 | `{cases,patterns,materials}/<id>.json` |
| `demos/` | 内容源：条目本体 | `{cases,patterns,materials}/<id>/` |
| `docs/` | 内容源：给人读的文档 | 根目录放通用文档；`{cases,patterns,materials}/<id>.md` 放单条文档；`readme/` 放 README 配图 |
| `prompts/` | 生成 | `{cases,patterns,materials}/<id>.md`，条目有 prompt 才生成 |
| `agent/` | 生成 | 根目录仅 `catalog.json`；各类目录含 `index.json` 与 `<id>.json` 资料包 |
| `previews/` | 生成或截图 | `{cases,patterns,materials}/<id>.<ext>`；变体后缀 `-portrait`、`-mobile`、`-reference`；作者效果图放 `materials/<id>/` |
| `data/` | 生成：站点运行时数据 | `atlas.json` 保存条目、文档目录与标签；`asset-sources.js` 保存素材地址映射 |
| `site/` | 站点代码 | 网站源码为 `index.html`、`public/`、`registry/`、`lib/`、`core/`、`ui/`、`motion/`、`vite/`；内容运行时为 `runtime/`、`icons/`；`public/` 下的 `cases.html`、`patterns.html`、`materials.html`、`docs.html`、`lab.html`、`agent.html` 处理对应地址跳转 |
| `kit/` | Demo 运行时 | `motion-kit.js` |
| `scripts/` | 工具与制作模板 | 构建、播放、截图、渲染、取帧与 CLI；`templates/` 放条目模板；`lib/labels.json` 是标签字典的唯一手工维护处；`build-static.mjs` 生成完整构建与发布包 |
| 根目录 | 说明与项目配置 | `README.md`、`CONTRIBUTING.md`、`AGENTS.md`、`package.json`、`package-lock.json`、`vite.config.ts`、`tsconfig.json`、`asset-cache-worker.js` |

### 条目本体

案例在 `demos/cases/<id>/` 中组织：

| 路径 | 内容 |
| --- | --- |
| `index.html` | 可运行入口 |
| `film/` | 作品代码、样式及作品许可原文 |
| `assets/`、`fonts/`、`audio/` | 运行素材、完整字体及音轨与各自许可 |
| `vendor/<库>@<版本>/` | 固定版本第三方库及许可 |
| `motion-kit.js` | 运行时副本 |
| `source/` | 制作脚本、输入数据、上游源码与使用说明 |
| `fidelity.md` | 复刻对照，内容见文档分工 |
| `LICENSES.md` | 许可索引 |

巧思在 `demos/patterns/<id>/` 中组织：

| 路径 | 内容 |
| --- | --- |
| `index.html` | 入口；重放型仅内联 `MotionKit.replay` 配置，拆分型加载 `mechanism/` |
| `motion-kit.js` | 由构建同步的运行时副本 |
| `mechanism/` | 拆分型的机制代码、配置、样式与子页面 |
| `assets/` | 本巧思独有的素材；来源案例素材直接引用 |
| `source/` | 机制的可编辑源码与制作资料 |
| `LICENSES.md` | 许可索引 |

重放型仅包含入口与运行时副本；带有本地实现的为拆分型。技术接入与时间协议见[渲染管线](docs/pipeline.md#mountfilm-与-replay)。

可运行素材在 `demos/materials/<id>/` 中组织：

| 路径 | 内容 |
| --- | --- |
| `index.html` | 样例入口，可用 `?demo=` 切换样例 |
| `demo/` | 样例代码、样式与各样例子目录 |
| `vendor/<库>@<版本>/` | 固定版本运行库与各自许可原文 |
| `fonts/` | 字体与许可原文 |
| `source/` | 重建入口、依赖锁、source map、上游源码与 provenance 等制作资料 |
| `fidelity.md` | 复刻型素材的对照结果（如有） |
| `LICENSES.md` | 许可索引 |

可运行素材的用法写入 `docs/materials/<id>.md`，本体内不放 README。文字素材保存固定提交的原文快照；入口字段见“素材”。

#### 交互素材的初始布局

交互素材在详情页和独立入口同步建立布局与初始画幅，再加载模块、数据和媒体；布局样式在入口 HTML 中直接加载，空间由现有容器宽度与可用高度确定，手机按内容排布。HyperFrames Registry 的初始布局由构建从本地可播条目的 Registry 数据生成，独立入口按 `?demo=` 选择初始条目；切换条目时先更新画幅和说明，再请求画面。

素材类型及站点名称统一为：

| `type` | 名称 |
| --- | --- |
| `component-library` | 组件库 |
| `image` | 图像 |
| `sound` | 声音 |
| `font` | 字体 |
| `poster` | 海报 |
| `agent-skill` | Agent Skill |
| `prompt-kit` | 提示词套件 |

类型决定展示方式，目录角色决定收集哪些文件。快照按 `snapshotPath` 收集完整原文；可运行内容按 `demo` 所在目录收集。巧思连同 `sources` 指定的来源案例收集，资料包与导出保留仓库相对路径。

### docs 分工与唯一位置

`docs/` 根目录放使用指南、方法、渲染管线、Prompt 写法、Agent 取材说明与跨案例研究。单个案例的研究放 `docs/cases/<id>.md`，案例索引 `docs/cases/README.md` 由构建生成。素材中文使用说明放 `docs/materials/<id>.md`，总览放 `docs/materials/README.md`；说明采用叙述性用法，结构化事实留在条目中。只有存在单条巧思文档时才建立 `docs/patterns/`。

| 信息 | 唯一位置 |
| --- | --- |
| 来源、版本、许可、用途、适用／避用等结构化事实 | 条目 JSON |
| 研究分析、机制观察 | `docs/<类>/<id>.md` |
| 复刻删改、已接受差异、对照结果 | 条目本体的 `fidelity.md` |
| 第三方许可原文与索引 | 条目本体内的许可原文与 `LICENSES.md` |
| Prompt 文档、Agent 资料包、站点数据、案例索引 | 构建生成 |

文档目录扫描 `docs/`、`prompts/`、`demos/` 下的 Markdown，分组依据 `scripts/lib/labels.json` 的 `DOC_GROUPS.path`：指南、案例研究、巧思研究、素材说明、案例 Prompt、巧思 Prompt、条目文档与素材原文。条目本体与素材原文分组默认折叠；站内指向仓库 Markdown 的链接在文档页打开。标题取正文一级标题，缺失时依次取 frontmatter 的 title、name 与文件名。条目本体的 `fidelity.md`、`LICENSES.md` 由条目详情与资料包提供。

`README.md` 介绍项目并提供入口；本文件集中说明收录规则、目录规范、新增流程与字段；`AGENTS.md` 规定仓库修改操作。

## 新增流程

首次运行 `npm install`；复制模板后运行 `npm run build`，由构建生成条目内的 `motion-kit.js` 副本，`npm run dev` 后在 `http://localhost:5311` 查看。新取值（新载体、新巧思类型等）需在 `scripts/lib/labels.json` 中补中文名。

### 案例

1. 按收录边界确定完整作品，保存来源、固定版本与许可到 `entries/cases/<id>.json`。
2. 在 `demos/cases/<id>/` 制作作品，按本体约定放置运行文件、素材与制作资料。模板位于 `scripts/templates/case-film/`、`scripts/templates/case-native/`。
3. 在条目中填写节拍、构成、分层、参数、实现 Prompt 与关联巧思；按文档分工记录研究与本次对照结果，按第三方资源规则保存文件。
4. 运行构建（见[“构建与检查”](#构建与检查)）。

### 巧思

1. 在 `entries/patterns/<id>.json` 说明机制、触发、结果、参数与组合职责，`sources` 仅保存 `{ caseId }`，并把该 id 加入来源案例的 `patternIds`。
2. 在 `demos/patterns/<id>/` 创建入口。模板位于 `scripts/templates/pattern-replay/` 与 `scripts/templates/pattern-split/`；复用来源案例的素材和上游源码。
3. 有单条研究时写入 `docs/patterns/<id>.md`。
4. 运行构建（见[“构建与检查”](#构建与检查)）。

### 素材

1. 在 `entries/materials/<id>.json` 填写类型、来源、版本、许可、用途、适用／避用、工作流、安装方式与盘点证据。有真实案例时通过 `relatedEntries` 关联，暂无案例时填空数组。
2. 把可运行样例或完整原文快照放入 `demos/materials/<id>/`，可运行样例使用 `scripts/templates/material-demo/`。按第三方资源规则保存文件。
3. 叙述性中文用法写入 `docs/materials/<id>.md`，在 `docs/materials/README.md` 增加入口；作者效果图放入 `previews/materials/<id>/`，逐图事实写入 `gallery`。
4. 运行构建（见[“构建与检查”](#构建与检查)）。

## 构建与检查

在仓库根目录运行：

```bash
npm run build      # 同步 Demo 运行时，生成 Prompt、Agent 资料包、网站数据与计数
npm run check      # 检查换行、忽略类型、条目引用和文件大小
npm run typecheck  # 检查 TypeScript 类型
npm run dev        # 生成数据并启动 http://localhost:5311 开发服务
```

更新预览截图时，在一个终端保持仓库根静态服务运行，再在另一个终端执行截图命令：

```bash
npm start                              # 仓库根静态服务，端口 4321
node scripts/capture.mjs --only <id>    # 生成指定条目的预览截图
```

预览截图使用独立临时浏览器配置目录，禁用扩展并隐藏滚动条；导航前传递 `prefers-color-scheme: light`，保留 Demo 自身的固定主题与主题行为。时间线等待 `__motion.ready`，定位后等待字体、可见图片解码与画面绘制完成；其他 Demo 等待其资源和入场过程完成。截图前查看实际画面，不以固定延时作为加载完成的依据。作者效果图保留原件。

`node scripts/check.mjs` 检查文本换行、已跟踪的忽略类型、条目引用及双向一致性、单文件大小。单个文件超过 50 MiB 时报错；原文件确实超过且不能改动的，经仓库所有者同意后把路径和原因写进 `scripts/check.mjs` 的 `oversizeAllowed`，此后只列提示。

可运行 Demo 按上述顺序更新预览；文字快照直接打开主文档并核对资料包与导出。运行文件随条目入库，检查被忽略的文件：

```bash
git ls-files --others --ignored --exclude-standard
```

`npm run build:local` 输出本地可用的完整 `dist/`；`npm run build:site -- --commit <提交号>` 输出发布包，媒体按[渲染管线](docs/pipeline.md#十三发布素材地址)的规则从 `MIBXR/motion-atlas-next` 该提交的 GitHub 地址加载，提交号为已推送的 40 位十六进制 Git 提交号。`dist/` 是纯静态文件，可放在任意静态主机的任意子路径（`base: ./`、hash 路由）。

参考视频取帧使用 `node scripts/frames.mjs <video>`，生成带时间码的接触表。

## 条目字段

### 通用与路径

| 字段 | 说明 |
| --- | --- |
| `id`、`title`、`summary` | 与文件名一致的 id、中文标题与摘要 |
| `order`、`tags`、`subtitle` | 排序、检索标签与副标题 |
| `demo` | `demos/<类>/<id>/index.html` 可运行入口 |
| `research`、`fidelity` | 单条文档与复刻对照文件路径 |
| `sourceFiles`、`locator` | 源文件路径与机制定位，引用来源案例时指向该案例 |
| `preview`、`previewPortrait` | 构建按同 id 的预览文件生成；条目可指定素材预览 |
| `previewAt`、`previewAtPortrait` | 横屏／竖屏预览时刻；竖屏缺省同横屏 |
| `prompt` | 实现 Prompt，填写后生成同类 Prompt 文档 |
| `videoPrompt`、`negativePrompt` | 可选的视频生成 Prompt 与负向约束 |
| `upstream`、`license`、`sources` | 素材的上游仓库、固定提交、版本、许可与来源证据；`upstream.version` 仅填写上游提供的版本号；案例可记录来源事实，巧思的 `sources` 为案例指针 |
| `attribution` | 按 `scope` 归类的来源、资源、版本与许可说明，`notes` 保留对应事实；案例详情的“署名、上游与许可”展示作品、参考或制作来源及其链接 |

### 案例

案例必填 `id`、`title`、`carriers`、`style`、`purpose`、`tech`、`summary`、`prompt`、`demo`、`composition`。

`carriers`、`style`、`purpose`、`tech` 的取值与中文名在 `scripts/lib/labels.json` 中定义，由 `scripts/lib/catalog.mjs` 的 `TAXONOMY` 读取。

| 字段 | 说明 |
| --- | --- |
| `carriers` | `video` 影像视频、`console` 交互操作台，可多选 |
| `style` | 画面风格，单值：`hand-drawn` 手绘与绘画、`print-craft` 版画、剪纸与传统工艺、`graphic-type` 图形与排版、`interface` 界面与发布、`evidence` 实证与数据、`documentary` 剪辑与纪实、`dimensional` 3D、卡通与游戏 |
| `purpose` | 按影片内容判定的用途题材，单值：`brand` 品牌与产品、`explainer` 知识讲解、`data` 数据与实证、`news` 新闻纪实、`story` 叙事短片、`title-art` 片头与视觉 |
| `tech` | 按 `film/` 运行代码与实际加载的库判定，非空数组：`canvas2d` Canvas 2D、`webgl` 原生 WebGL 着色、`threejs` three.js 3D、`footage` 实拍素材、`prerendered` 离线渲染帧、`remotion` React + Remotion、`maplibre` MapLibre 地图、`dom` DOM / SVG |
| `timeline` | 是否暴露 `window.__motion` |
| `rhythm` | `{ duration, bpm?, beats: [{ t, label, note }] }`，时刻单位为秒 |
| `energy` | 覆盖作品时长的 0–1 等距能量采样 |
| `energySegments`、`energyNote` | `{ t0, t1, from, to, label }` 分段线性插值与数值来源；同时有等距采样时优先显示分段 |
| `focus`、`observations` | 设计重点与画面观察；观察可为纯文本或 `{ at?, what }`，`at` 为时间或画面位置标记 |
| `composition`、`layers` | 视觉、声音构成与画面分层 |
| `tokens` | `{ palette: [], type: '', motion: [{ name, value }] }` |
| `composition.interaction` | 可选，作品自身的操作与反馈 |
| `migration` | 可选，`[{ field, how }]`：常改内容的位置与修改方法 |
| `useCases`、`avoid`、`constraints` | 适用范围、避用与制作约束 |
| `patternIds` | 关联巧思 id |
| `renderer` | `gpu` 表示截图需要 GPU |

### 巧思

巧思填写 `types`、`carriers`、`mechanism`、`trigger`、`effect`、`timing`、`sources`、`demo` 与 `prompt`。`types` 使用 `composition`、`type-motion`、`transition`、`camera`、`feedback`、`rhythm`、`hud`、`texture`、`sound`，可多选。`parameters` 可附参数数值及源码定位，详情参数区按 `timing`、`parameters` 的顺序展示。机制自身需要说明的操作或静态替代写入 `mechanism`。

`composition.role` 为 `foundation`（骨架）、`support`（支撑）或 `accent`（点睛）；`pairsWellWith`、`conflicts` 保存搭配和冲突的巧思 id，`notes` 说明组合条件。

### 素材

素材记录 `type`、`upstream`、`license` 与来源证据 `sources`，按实际内容填写工作流、用途、避用、安装方式和关联条目。`upstream.url` 保存原始出处，存在仓库、固定提交或正式版本时再填写对应信息。`license.name` 记录许可状态，`url` 仅在有真实许可或许可声明依据时填写，`notes` 记录独立补充信息，无内容时省略。来源备注说明资料支持的事实。

`relatedEntries` 为 `{ kind, id, note }[]`，`kind` 使用 `case`、`pattern`、`material`，`id` 指向本库条目；`note` 用一句话描述内容或关联关系。

`snapshotPath` 指向本体目录，`snapshotEntry` 是该目录内的主文档相对路径，Agent Skill 的主文档为 `SKILL.md`；可运行素材填写 `demo`。`gallery` 保存 `{ path, caption, kind, sourceUrl, license }`。`gallery.kind` 区分 `work`、`style`、`theme`；`caption` 写明图像或动画的展示形式，`sourceUrl` 和 `license` 保存逐图来源与许可。

## 验收与交付

新增或修改内容完成后，按[审查清单](docs/review.md)执行增量审查；全库复查使用同一清单的全库范围。

- 复刻作品与公开原作在相同视口、相同时刻并排对照，操作与声音同步复核，按文档分工记录本次对照结果。
- 在干净副本中复验本地服务、详情、独立 Demo、资料包和导出，运行文件全部入库，运行依赖可由固定版本取得。
- 运行“构建与检查”中的 npm 命令（含 `npm run check`）；构建检查本体和快照路径，在实际页面检查播放、定位、画幅、键盘与声音。被忽略的文件中应无运行必需文件。
- 提交内容包括条目、本体、文档、许可和生成物。截图分析、参考取帧、渲染输出与过程报告留在工作区；参考取帧和渲染输出分别使用 `frames/`、`renders/`。

## 站点设计与交互约束

网站源码在 `site/`，采用 React + TypeScript strict + Vite。本节约束网站自有界面与条目说明；原作内容和第三方原文按[收录原则](#收录原则)处理。

- **内容路径**：内容挂在站点根目录，条目路径即 URL；开发服务由 `site/vite/atlas-plugin.ts` 挂载，构建时由 `scripts/build-static.mjs` 复制。
- **URL 状态**：hash 路由保存搜索、筛选、排序、收藏筛选、布局与详情参数。列表使用 `#/cases?q=地图&style=documentary&carriers=video&purpose=story&tech=canvas2d&sort=title&dir=desc&fav=1&view=list`、`#/patterns?types=hud&carriers=console&source=archive-os`、`#/materials?type=agent-skill`；详情使用 `#/cases/map-pilgrimage?orient=portrait&t=12`、`#/materials/hyperframes-registry?demo=product-turntable`；文档使用 `#/docs?path=docs/guide.md&h=站点入口&dq=使用`；收藏为 `#/favorites`，比较使用 `#/compare?ids=archive-os,map-pilgrimage`。搜索输入使用 replace，前进后退恢复筛选与页面滚动位置。
- **导航与工具**：左侧顺序为总览，参考库（案例、巧思、素材、文档），我的（收藏、比较），工具（节奏实验室、Agent 工作流）。两个工具入口为 `#/tools/rhythm-lab`、`#/tools/workflow`。节奏实验室：节拍器、A/B 吸附对比、打拍录入、曲线、时长与错峰；Agent 工作流：选条目、生成任务说明、获取结构化资料。
- **详情布局**：详情页由头部与“舞台 + 拆解”组成。视口宽于 1280px 时，左侧 Demo 舞台吸顶，右侧拆解；1280px 及以下上下排列。只有画廊的素材在左栏展示画廊并随页面滚动。头部左侧放标题、副标题和标签，右侧放上一条／下一条、收藏、案例的加入比较、Agent 资料包下载。正文标题使用名称，编号显示在位置导航中。
- **内容呈现**：可选字段为空时省略整节及小标题，参数表仅在有参数时显示；明确无声、静态等事实可作为机制信息，Agent 取材字段可以独立于页面保留。展示区在加载前预留空间，交互素材按[初始布局](#交互素材的初始布局)接入；画廊按比例预留空间，点开查看原图，逐图出处与许可随图呈现。
- **列表与筛选**：每个取值按其余筛选条件计数；固定顺序采用标签字典或数据顺序，其余按中文名称排列，不随计数重排。来源案例按案例编号排列。列表提供卡片与紧凑列表两种布局，手机筛选收进底部抽屉，清除筛选保留排序方式与方向。Registry 样例和比较案例通过 Combobox 按名称搜索。
- **滚动与章节**：整页由文档滚动，侧栏、工具栏、详情 Demo 舞台与章节条用 sticky 吸附；侧栏、筛选、文档目录与章节目录采用 Arc ScrollArea。`site/core/scroll-guard.ts` 放行用户输入和网站跳转引起的滚动，撤回 iframe 内定位、聚焦引起的父页面滚动。详情章节条随阅读位置高亮，并在条内横向滚到可见位置。
- **播放与加载**：案例与巧思使用时间轴播放器，提供播放暂停、拖动定位、节拍跳转、横竖屏、声音、全屏和键盘快捷键。声音偏好保存在本地；浏览器尚未允许播放时显示虚线的“已开启、待激活”状态，工作台内点按或按键后再次请求出声。加载进度在总字节未知时按已完成文件数计算，加载失败提供重试。素材 Demo 使用自身播放器，宿主提供样例选择、重载与新标签页打开。
- **侧栏**：侧栏可收起为图标，悬停显示 Tooltip，收起状态保存在本地；手机导航使用抽屉。
- **设计语言**：使用 Arc UI foundation token 定义颜色、圆角、间距和阴影，提供浅色、深色、跟随系统三种主题；浅深切换采用 split 变体，由页面正中的细缝向两侧展开，减少动态时直接切换。使用 Button、Theme switch、Tooltip、Scroll area、Combobox、Segmented control、Search field、Drawer、Badge、Copy button、Empty state、Skeleton、Progress、Slider、Switch、Number field、Code block、Toast、Textarea、Accordion、Checkbox、Input；页面无原生下拉，网站图标来自 lucide-react。网站正文、导航、标签、辅助信息与控件的最终字号至少 12px，Demo 画面文字按作品需要确定。
- **组件源码**：Arc UI 按 registry 复制在 `site/registry/`、`site/lib/`，只改过界面中文文字，MIT 许可证随附于 `site/registry/ARC-UI-LICENSE`；更新组件时同样整文件复制。
- **说明与资料**：自有说明写机制、用法与实际条件，收录判断用于选库。研究和复刻文档保留设计分析与当前对照结论；临时调试和阶段过程留在工作区或提交说明。版权、许可与实际能力说明按事实保留。

## 姊妹站

Web Atlas 与 Motion Atlas 是姊妹站，内容互不交叉。基础导航、页脚、侧栏、筛选、收藏、素材缓存和控件保持共同的视觉层级与操作习惯。内容区域按载体组织：Web 保留网页浏览、来源定位与对照，Motion 保留时间线、画幅和播放控制。调整公共界面时对照另一站的同一位置，保留这些功能差异。

品牌层保留各自的主题色（Motion 橙、Web 绿）、标志、圆角大小（Motion 偏大、Web 偏小）与底色色相；卡片按内容提供能量曲线、来源标签或比较入口。

配色：浅色模式下，底色带主题色，卡片与侧栏为白色；深色模式下，底色接近中性黑，卡片与侧栏带少量主题色。页面上的内容放在有圆角和内边距的卡片里，卡片内的子项使用次级面底色，与卡片底色区分。
