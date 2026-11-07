# 工作台原型存档：Codex（gpt-6.1-sol）

2026 年 11 月重构 Web Atlas 与 Motion Atlas 时，用同一份需求说明（[prompt.md](prompt.md)）让 Claude Opus、Codex、DSH 三个 Agent 各自做了一版工作台原型，界面结构由各 Agent 自行设计。对比后选用了 Claude 的版本，并在其基础上完成了 `main` 分支上的正式网站。

本分支保存 Codex（gpt-6.1-sol） 的那一版，只作参考，不再维护。

- `app/`：原型源码，包含 Web 与 Motion 两个工作台。依赖 `node_modules` 和构建产物没有收录。
- `app/screenshots/`：当时的桌面与手机截图。

原型运行时读取仓库根目录下的 `content/web/` 与 `content/motion/`，本分支没有收录这些内容，所以不能直接运行。
