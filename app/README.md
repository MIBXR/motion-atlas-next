# Atlas 工作台

两套浏览与拆解工作台，共用一套 React 组件与内容读取方式：

- **Web Atlas**：内容来自 `content/web`，展示网页案例、网页巧思与实现素材。
- **Motion Atlas**：内容来自 `content/motion`，展示动态影像案例、运动巧思与制作素材。

两个工作台各自独立构建。Web 的产物只含 Web 内容，Motion 的产物只含 Motion 内容。

## 启动与构建

在 `app/` 下安装并运行：

```bash
npm install

npm run dev:web      # http://localhost:5221
npm run dev:motion   # http://localhost:5222

npm run build:web
npm run build:motion
```

Web 的开发与构建根目录是 `web/`，Motion 是 `motion/`。构建产物分别位于 `web/dist`、`motion/dist`。构建结束时，对应的内容库会复制到 `dist/atlas/`，页面里的封面、Demo、Prompt、Agent 包和文档都从这个目录读取。构建只复制当前工作台的内容库。

## 截图

先启动两个开发服务，再在 `app/` 下运行：

```bash
npm run screenshots
```

脚本用本机的 Microsoft Edge 无界面模式，在 `screenshots/` 下生成桌面 1440×900 和移动 390×844 两个尺寸，覆盖首页、列表、案例、巧思、素材、文档六个页面。Edge 安装在非默认路径时，用 `EDGE_PATH` 指定。

## 目录

```text
app/
├─ shared/                 # 两套工作台共用的代码与样式
│  ├─ components/          # 页面骨架、卡片、播放器、定位器、画廊、对照视图
│  ├─ lib/                 # 路由、主题、收藏、比较、筛选、Markdown、数据 URL
│  ├─ pages/               # 首页、列表、三种详情、文档、收藏、比较、占位页
│  ├─ styles/              # 站点 token 与各页面样式
│  ├─ types.ts             # 内容条目和虚拟模块类型
│  ├─ site.ts              # 两套站点的标题、导航、默认主题、精选条目
│  ├─ ui/arc/              # Arc UI 组件（按上游 README 复制）
│  └─ vite/                # 内容虚拟模块、开发期静态服务、构建期复制
├─ web/                    # Web Atlas 的 Vite 入口
├─ motion/                 # Motion Atlas 的 Vite 入口
├─ scripts/screenshots.mjs # Edge 无界面截图
└─ package.json            # npm workspaces 与根脚本
```

页面路由采用 hash，详情、筛选、排序、文档位置和比较选择都可直接分享：

```text
#/browse?type=cases&q=…&category=…&sort=order-asc
#/cases/:id
#/patterns/:id?source=:caseId
#/materials/:id
#/docs?path=…&anchor=…
#/favorites
#/compare?ids=:idA,:idB
```

筛选条件、搜索词、排序和“只看收藏”都写在 URL 查询串里，浏览器的前进、后退会恢复这些状态。

## 两个工作台如何共用

`shared/` 不直接引用任何一方的数据。Vite 插件按当前工作台读取 `content/web` 或 `content/motion`，生成 `virtual:atlas-meta` 与 `virtual:atlas-docs` 两个模块。页面只通过 `useAtlas()` 取 meta 和 `SiteConfig`，因此同一个 `Workbench` 可以渲染两套内容。

站点差异集中在两处：

- `shared/site.ts`：名称、默认主题、导航、精选条目、收藏存储键。
- 详情页里的运行器：Web 用 `WebDemo`、`WebPatternLocator`；Motion 用 `MotionPlayer` 和素材 Demo。

两个工作台的构建配置各有一个 `atlasContentPlugin`，只传入自己的内容目录。这样两份产物不会互相夹带数据，内容库更新时也不需要额外同步脚本。

## Web 与 Motion 的共同点

- 首页、案例/巧思/素材列表、搜索、筛选、排序。
- 三种详情：案例、巧思、素材。
- 收藏、只看收藏、收藏 JSON 导入导出。
- 最多 3 个案例的拆解字段比较。
- 文档目录、全文搜索、长文目录、仓库内链接与图片。
- 浅色、深色、跟随系统三种主题。
- 拆解字段、Prompt、Agent JSON、来源与相关条目。

## Web 与 Motion 的不同点

**Web Atlas**

- 浅色纸面、砖红强调色。
- 案例 Demo 支持适应容器、1440px 桌面、390px 手机三种宽度；可重播、新标签页打开，有原站截图时可并排对照。
- 巧思没有独立 Demo。巧思详情在来源案例的 Demo 中按 `sources[].focus` 定位、滚动并高亮机制位置；有多个来源案例时可切换。
- 素材可以是可运行的目录 Demo、图片画廊，或带原作与复刻对照的交互作品（如 Vigil）。
- 素材的示例可切换，并展示工作流、安装说明、上游版本和许可。

**Motion Atlas**

- 深色底、荧光黄绿强调色。
- 案例和巧思都有独立 Demo，共用时间轴播放器：播放/暂停、拖动、节拍标记、能量曲线、前后节拍跳转、横竖屏、声音、全屏、键盘快捷键、加载进度与失败重试。
- 巧思详情还展示参数、时序、声音构成与迁移指南。
- 素材示例同样可切换，保留上游的版本、许可和来源链接。

## 为什么这样组织

- **共用界面层、分开数据层**：浏览、详情、文档、收藏与比较的行为相同，放在 `shared/`；两套内容库的数据边界不同，放在各自的 Vite 根目录，构建时只装载自己的一份。
- **Web 靠来源定位，Motion 靠时间轴**：网页巧思的价值在页面中的位置和前后文，所以 Web 巧思用来源案例 `focus` 定位；动态巧思需要逐帧检查，所以 Motion 案例和巧思共用播放器与节拍数据。
- **状态先留在本地**：收藏和比较用浏览器存储与 URL，不引入账号或服务端，符合原型范围，也让链接可以直接转发。

## 原型范围

已实现两套工作台的浏览、搜索、筛选、三种详情和文档。

以下入口保留为占位页，不包含实际功能：

- Web 设计实验室（`#/lab`）
- Motion 节奏实验室（`#/lab`）
- Agent 工作流（`#/workflow`）

收藏与比较采用原型实现：收藏存本地、支持 JSON 导入导出；比较只对齐案例的拆解字段，不生成新的分析文本。