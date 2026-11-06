# 修改档案内容

[`archives.json`](archives.json) 是页面与 TXT 下载共用的档案数据。修改内容无需编辑 TypeScript；`src/data.ts` 只保留类型和阵列位置映射。

## 文件结构

- `categories`：检索筛选器的五个分类，按显示顺序排列。“全部档案”由界面添加，无需填写。
- `columns`：三维阵列从左到右的五个分类。与 `categories` 包含相同名称，顺序可以不同。
- `records`：四十份档案，按 `X-001` 至 `X-040` 排列。每个分类必须恰好有八份，同分类在数组中的顺序决定列内顺序。

| 字段                        | 内容                                                        |
| --------------------------- | ----------------------------------------------------------- |
| `id`                        | 稳定编号，用于收藏、定位和下载文件名                        |
| `title`、`en`               | 中文标题、英文标题                                          |
| `department`、`category`    | 科室、所属分类；分类须与上面的名称完全一致                  |
| `date`、`lead`、`clearance` | 编目范围、相关人物、访问范围；`RESTRICTED` 对应目录访问状态 |
| `abstract`                  | 摘要                                                        |
| `findings`                  | 至少一条研究记录，使用字符串数组                            |
| `source`                    | 设定参考的完整 HTTP 或 HTTPS 链接                           |

以上字段均必填，文本不能只包含空白。所有内容按纯文本显示，不支持 Markdown 或 HTML；引号按 JSON 规则写为 `\"`，换行写为 `\n`。页面会转义 HTML 特殊字符，TXT 下载保留原文。保留公开设定的来源，区分档案式改写与游戏原文。

## 修改与预览

1. 编辑 JSON 中对应档案的字段。修改分类名称时，同时更新 `categories`、`columns` 和各档案的 `category`。
2. 在 Motion Atlas 根目录运行 `npm run build:archive`，生成档案终端页面。需要同步下载文案时，更新 `demos/cases/archive-os/app/archives/` 中对应的 TXT。
3. 通过根目录静态服务器查看标题、详情、检索和下载结果。

当前五列、每列八份与原片布局、循环阵列相连；调整这些数量需要同步修改阵列逻辑。编号用于关联已有收藏与下载文件。

内容分离的建议来自 [@Tomahawkd 的 PR #3](https://github.com/LBEILC/RhineLabUI/pull/3)。
