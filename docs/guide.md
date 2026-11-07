# 使用指南

Motion Atlas 提供完整案例、独立巧思和制作素材。案例与巧思详情中可预览作品、拖动时间轴、查看节拍与参数、复制 Prompt；素材详情中可阅读工作流与原文，查看作者效果图。

## 站点入口

| 页面 | 用途 |
| --- | --- |
| [总览](https://motion-atlas-library.mibxranime.chatgpt.site/#/) | 搜索全部条目，浏览三类内容、指南和工具入口。 |
| [案例](https://motion-atlas-library.mibxranime.chatgpt.site/#/cases) | 按画面风格、载体、用途与技术筛选完整作品，查看节奏、分层与 Prompt。 |
| [巧思](https://motion-atlas-library.mibxranime.chatgpt.site/#/patterns) | 按类型、载体与所属案例筛选机制，查看触发、参数及组合关系。 |
| [素材](https://motion-atlas-library.mibxranime.chatgpt.site/#/materials) | 按类型查找制作资源，阅读工作流、安装方式、原文与画廊。 |
| [文档](https://motion-atlas-library.mibxranime.chatgpt.site/#/docs) | 按分组浏览 Markdown，搜索文档标题与路径并跳转章节。 |
| [收藏](https://motion-atlas-library.mibxranime.chatgpt.site/#/favorites) | 查看三类收藏，导入或导出收藏配置。 |
| [比较](https://motion-atlas-library.mibxranime.chatgpt.site/#/compare) | 选择最多三个案例，按字段并排比较。 |
| [节奏实验室](https://motion-atlas-library.mibxranime.chatgpt.site/#/tools/rhythm-lab) | 节拍器、A/B 吸附对比、打拍录入、曲线、时长与错峰。 |
| [Agent 工作流](https://motion-atlas-library.mibxranime.chatgpt.site/#/tools/workflow) | 选条目、生成任务说明、获取结构化资料。 |

搜索覆盖条目中的文字字段，多个词需全部命中；列表支持只看收藏、按编号或名称排序以及正序／反序。收录边界与规则见[贡献指南](../CONTRIBUTING.md#收录边界)。

## 预览作品

案例与巧思详情的舞台提供播放／暂停、上一个节拍、下一个节拍、声音、全屏、键盘快捷键与新标签页打开按钮。拖动时间轴定位，也可点击刻度或节拍表中的时间跳转；条目提供能量数据时，时间轴显示能量曲线。横竖屏按钮仅在作品支持多种画幅时显示，切换后保留当前时刻，舞台整体等比缩放。

声音初始关闭，开启偏好保存在本地，切换条目和刷新后保持。虚线声音按钮表示“已开启、待激活”；在工作台内点按或按键后会再次请求出声，也可点按 Demo 画面激活。无声作品的声音按钮不可用。

加载进度显示在舞台内，总字节未知时按已完成文件数计算；加载失败时可点“重试”。地图镜头等待必要瓦片就绪后继续。素材 Demo 使用自身的播放与操作控件，外层提供“重新加载”“新标签页”，Registry 另有样例搜索。

键盘快捷键：空格／K 播放暂停，左右方向键跳 1 秒（Shift 跳 5 秒），J／L 跳 5 秒，方括号或逗号／句号跳到前后节拍，Home／End 到开头／结尾，O 切换画幅，M 切换声音，F 切换全屏，问号打开快捷键说明；输入框内不触发这些快捷键。每个作品自身的操作、布局与时长见条目，播放协议与声音接口见[渲染管线](pipeline.md)。

## 从参考到作品

先阅读完整案例的节拍表和能量曲线，判断时间结构是否合适，再用巧思详情中的机制和组合关系选取需要的动作。字段释义见[贡献指南](../CONTRIBUTING.md#条目字段)，阅读顺序见[条目阅读方法](methodology.md)。

复制实现 Prompt 后替换内容、品牌、配色和尺寸，保留需要的时间与动效参数；条目提供视频生成 Prompt 或负向约束时可一并使用。写法见[Prompt 指南](prompting.md)。

需要源码、独立 Demo 或原文快照时，按[Agent 取材说明](agent.md)检索和导出；视频帧序列与音轨导出见[渲染管线](pipeline.md#九逐帧渲染成视频)。有迁移指南的条目还会标明常改内容的位置与方法。

## 在实验室练节奏

1. 选择拍号、BPM、鼓组／木块／电子／机械音色，比较重拍、细分、三连音和摇摆；用打拍测速取得速度。
2. 载入示例或录入打拍，调整首拍偏移和量化强度，交替听 A 原始／B 吸附后的落点，并查看落点提前或延后的毫秒数。
3. 调整缓动、时长与错峰，让起步或最后一个元素的落点对准小节重拍，通过线性对照和轨迹观察变化。
4. 导出 CSS 变量、MotionKit 乐谱、Prompt 或 WAV。录入事件按秒保存；按新 BPM 生成示例时重新载入。

节拍与吸附的推导见[节奏方法](rhythm.md)。

## 收藏与迁移

案例、巧思与素材收藏保存在当前浏览器 `localStorage` 的 `ma-favorites` 中。在收藏页点“导出收藏配置”，下载 `motion-atlas-favorites.json`；文件含 `app: "motion-atlas"`、`version: 1`、`exportedAt` 与 `favorites`，`favorites` 中的 `cases`、`patterns`、`materials` 分别保存 id 数组。

点“导入收藏配置”选择 JSON，可导入上述完整对象，也可直接导入含三类 id 数组的对象；缺省类别按空数组处理，合并本库已知的有效 id 并去重。更换浏览器、域名、端口或清理网站数据前导出 JSON，在目标地址导入即可继续使用。

## 本地使用

需要 Node.js 22+，在仓库根目录运行 `npm install` 后执行 `npm run dev`，访问 `http://localhost:5311`。截图与渲染需要本机 Edge 或 Chrome，合成 MP4 需要 PATH 中的 ffmpeg。完整命令见贡献指南的[构建与检查](../CONTRIBUTING.md#构建与检查)。通过本地服务器访问页面，地图 Demo 的 MapLibre、底图与高程瓦片需要网络。
