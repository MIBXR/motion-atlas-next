# 莱茵生命档案终端

## 实现 Prompt

制作莱茵生命档案终端：白底开场、五列循环档案阵列、对角解密、360°查看器与结构拆解。使用两份GLB、MiSans字体、三轨配乐、合成音效、逐字短音与四十份档案。固定画幅，60Hz时钟与统一音轨。开场后自动读取档案，再依次演示页签、360°查看器、六组结构拆解、重组、返回阵列与四向循环浏览。横屏1920×1080、竖屏1080×1920，按画幅排版。保留视觉、字号、文案、动效参数、缓动与音量声像。

## 视频生成 Prompt

A Rhine Lab archive terminal with a white opening, Rhine Lab identity, a five-column archive array, diagonal decryption, document tabs, a 360-degree model viewer, frosted and clear glass, a six-part exploded structure and reassembly. Include two GLB models, MiSans type, forty archive texts, three music tracks and sound. Use landscape 1920×1080 or portrait 1080×1920 layouts. Show the opening, archive reading, tabs, model viewer, disassembly, reassembly and four-direction browsing in sequence.

## 负向约束

保持视觉、布局、字号、文案、动效参数、缓动、模型、字体、档案和声音；不要增添外层UI、文字与装饰；不要裁剪或加速开场；保持动作序列。

## 动效 Token

- **boot-window**：开场以25fps离散播放。
- **orbit**：临界阻尼速率3.7。
- **select-lift**：选中抬起的临界阻尼速率4.2。
- **roll**：滚动时长460ms。
- **idle**：交互停止2.5s后进入空闲呼吸。
- **decrypt**：解密时长为(39.56−34.12)/1.5=3.6267s。
- **quality**：画质分为performance、original、high、ultra。默认original。

## 制作约束

- 模型、字体、音频与四十份档案共同组成完整终端。
- 保持画面布局与排版，网站界面文字≥12px。
- 名称、标志与档案内容围绕莱茵生命展开。

## 迁移

- `source/rhinelabui/content/archives.json；source/rhinelabui/src/`：在 archives.json 中修改四十份档案；在 src/scene.ts、src/model-viewer.ts 和相关样式中修改场景、模型查看器与外观。
- `source/rhinelabui/film/sequence.js → timeline、inputs、createSequence`：修改演示节拍与页签、查看器、拆解、重组、浏览动作；离线音频入口为同目录 render-audio.mjs。
- `film/app/；source/rhinelabui/art/`：film/app/ 保存模型、字体与声音；art/build_archive.py、art/build_assembly.py 和两个 Blender 工程用于制作模型，用法见 art/README.md。
- `film/config.js → ARCHIVE_FILM；film/script.js → loadFrame、seekFrame`：film/config.js 设置开场锚点 A、array；film/script.js 接入舞台、时间轴、定位、手动操作与完整音轨。

[打开 Demo](../../demos/cases/archive-os/index.html) · [在库中查看](../../cases.html#case/archive-os)
