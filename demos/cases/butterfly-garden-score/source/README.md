# 制作资料

`film/scene.js` 使用 `film/data/` 中的数据、字体、音频和透明 PNG 生成运行画面。`analysis/` 保存分析档案、字形与平面测量、音符和行内元素的重建数据；原片、取帧、长图、残差 CSV 和对照图片保存在制作工作区。

工作区包含 `analysis/case/`、`audio/case.mp4` 和 `audio/song/butterfly.mp3`。以下命令从本例目录运行，两个参数依次为工作区和 Motion Atlas 仓库根目录。

```bash
uv run --no-project --with numpy --with pillow --with opencv-python-headless python -X utf8 source/scripts/rework/apply-note-model.py <工作区> <仓库>
uv run --no-project --with numpy --with pillow --with opencv-python-headless python -X utf8 source/scripts/rework/apply-thin-elements.py
```

`analysis/rework/note-input/` 提供固定输入，`note-model-measurements.json` 记录音符删除、新增、端点与行内位置、三态参数、行曲线、动机框、注释路径和指针曲线。脚本重建 `notes.json`、`annotations.json`、`rowStates.json`、`shots.json`。`thin-element-measurements.json` 保存连接弧端点、标尺端点显隐、空心框退场、行淡入及重复音符的修正数据，`apply-thin-elements.py` 将其应用到基础模型。虚线与对应文字共用显隐轨。反复记号使用矩形与圆组成的矢量图形，文字使用随附字体；行透明度修正存储在同一测量文件的 `rows` 中。十个候选的收入或删除结论位于 `analysis/rework/candidate-decisions.json`。

音符的颜色和行透明度分别存储。`currentYOffset` 存储 Pf. 的发声纵向偏移；空心动机框使用屏幕坐标曲线，Vc. 尾线沿卷轴继续滚动。

`scripts/extraction/` 保存原片与素材的提取脚本。`scripts/rework/` 包含基础模型重建、细线与状态修正、标题字形提取三个脚本；重建使用固定输入、数值模型和随附字体。

```bash
bash source/scripts/build-audio.sh <butterfly.mp3路径>
```

巨型标题字形来自 `source/fonts/` 中的固定版本 Noto Sans JP 900，OFL 与来源随字体保留。共享透视平面、阶段采样和轮廓边界位于 `analysis/title-planes.json`、`title-phase-sampling.json` 和 `title-contour-boundaries.json`；字形提取脚本为 `scripts/rework/extract-title-glyphs.py`。

```bash
uv run --no-project --with numpy --with pillow --with opencv-python-headless --with fonttools python source/scripts/rework/extract-title-glyphs.py <工作区> <仓库>
```

