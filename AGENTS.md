# Motion Atlas 维护

仓库定位与收录原则见 [CONTRIBUTING.md](CONTRIBUTING.md#仓库定位)。

- 修改内容前阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。新增目录、条目或内容类型前，先确认符合其中的三类组织规范；收录、字段、新增流程与验收规则以该文件为准。
- 执行内容或界面审查时，从[验收与交付](CONTRIBUTING.md#验收与交付)进入审查清单，确定基准版本和范围。
- 修改网站前阅读[站点设计与交互约束](CONTRIBUTING.md#站点设计与交互约束)。网站源码在 `site/`，其中 `site/runtime/`、`site/icons/` 是 Demo 共用的内容运行时。
- 内容源为 `entries/`、`demos/`、`docs/`，标签中文名在 `scripts/lib/labels.json`。修改 Demo 共享运行时只改 `kit/motion-kit.js`；Demo 内的副本由构建同步。
- `prompts/`、`agent/`、`data/`、`docs/cases/README.md` 和 README 计数块由构建生成，不手改。`previews/` 中的截图用 `scripts/capture.mjs` 生成。
- 内容更新后运行 `npm run build`，再运行 `npm run check`；修改网站代码后运行 `npm run typecheck`。
- 向仓库新增测试代码、测试数据、测试框架、自动检查脚本或额外完整性校验，须先获仓库所有者明确授权。
- 预览与检查命令见 [CONTRIBUTING 的构建与检查](CONTRIBUTING.md#构建与检查)，交付文件见[验收与交付](CONTRIBUTING.md#验收与交付)。
