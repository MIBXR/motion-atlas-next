# Ink Press 纸墨宣传片

## 实现 Prompt

用 Remotion 制作 1920×1080、30fps、36 秒的纸墨琥珀风产品宣传片。以整页 2x 截图、元素透明底切片和 layout.json 坐标表为素材，所有页面镜头放在 2.5D 页面相机里：关键帧插值 cx、cy、zoom、rotX/Y/Z 与透视，3D 模式用 CSS zoom 做布局级放大。十个镜头依次为墨线描画与字标压印开场、聚光主角卡（聚光游走→锁定→推近侧斜→悬浮光束扫→归位）、字卡、牌堆特写后加速发牌飞入网格并搜索筛选、详情页逐行嵌入、字卡、列表堆叠压入与计数落定、字卡、周报打字机自写与历史条目逐条弹入、字卡、虚焦后元素合影组装与铅印字标砸落。字卡为衬线大字逐词入场，强调词琥珀斜体。硬切两侧各 5 帧暖白闪。音效按动作钉帧，结尾 riser→impact→sparkle，字标落定后 hold 1 秒。禁用 Date.now 与 Math.random，伪随机由 index 派生。

## 动效 Token

- **POP_EASE**：Easing.bezier(0.2, 1.25, 0.3, 1)，主角卡在 130–140 帧弹起并超调。
- **RESEAT_EASE**：Easing.bezier(0.4, 0, 0.3, 1.05)，主角卡在 194–212 帧归位。
- **FlashCut**：10 帧（0.3333 秒），从切点前 5 帧开始，第 4 帧达到 0.85 不透明度。
- **字卡逐词入场**：第 4 帧起，每词间隔 4 帧（0.1333 秒），各用 9 帧完成，bezier(0.2, 0.75, 0.3, 1)。

## 制作约束

- 画面依赖整页 2x 截图与 layout.json 坐标表
- 字体为系统字体，跨平台字形会变

## 迁移

- `截图与坐标`：替换 assets/textures/live/ 的整页截图与切片，并更新 film/src/aifl/live-layout.json 的元素坐标；在 source/ 运行 npm run build 重新打包。
- `字卡文案`：修改 film/src/aifl/Main.tsx 的 TITLE_CARDS，*词* 为琥珀斜体强调；在 source/ 运行 npm run build。
- `字幕`：修改 film/src/aifl/Main.tsx 的 CAPTIONS 文案与绝对帧号；在 source/ 运行 npm run build。
- `运镜`：修改各 film/src/aifl/live/Scene*.tsx 中 PageCam 的 keys；在 source/ 运行 npm run build。

[打开 Demo](../../demos/cases/ink-press/index.html) · [在库中查看](../../cases.html#case/ink-press)
