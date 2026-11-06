# video-shotcraft 使用说明

先在[素材详情](../../materials.html#material/video-shotcraft)查看工作流、安装方式与工具收录范围，再打开[主文档](../../demos/materials/video-shotcraft/SKILL.md)。制作完整宣传片有三种模式：直接套用 Ink Press 模板、Agent 自主创作、与用户逐阶段共同创作，对应流程分别见 `template/TEMPLATE.md`、`references/pipeline.md`、`references/guided-free-creation.md`。为已有视频处理音效时，直接进入声音选材与对齐流程。

只借一个镜头时，在 `references/shots/` 找配方卡，按卡上“参考实现”打开 `demos/` 下对应的 Remotion 组件；卡名与样式名以 `gallery/api/library.json` 为准。配方卡提供语义说明和参数表，组件包含调校过的缓动与时值；取用时一并带上实际引用的 `_fixtures/` 共享组件与 `_textures/` 纹理。素材详情按类别列出全部 150 个镜头样式的作者预览，可按标题定位对应卡片。`demos/_legacy/` 仅用于工作台旧工程兼容，不供新片选卡。

声音设计读 `references/sound-design.md`，Freesound 选材方法读 `references/sfx-sourcing.md`；按动作、材质、时长和许可选择音效，保留来源与署名，画面锁定后精确钉帧。配乐备选在 `assets/audio/bgm/`，来源见 `assets/audio/ATTRIBUTION.md`。模板固定音频用于原样预览与复刻，其来源和未确认项见 `template/public/audio/ATTRIBUTION.md`。

本库收录了 Ink Press 模板的可运行复刻案例 [Ink Press 纸墨宣传片](../../cases.html#case/ink-press)，拖到任一镜头即可对照 `template/src/` 的场景源码。独立取得收录文件的方法见[Agent 取材说明](../agent.md)。
