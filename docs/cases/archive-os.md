# 莱茵生命档案终端：接入说明

本篇说明舞台、时间轴与作品状态的组织方式；来源和许可事实见[条目 JSON](../../entries/cases/archive-os.json)。

源码快照及接入边界见 [UPSTREAM.md](../../demos/cases/archive-os/source/rhinelabui/UPSTREAM.md)，许可见 [LICENSES.md](../../demos/cases/archive-os/LICENSES.md)。运行资源保存在 `demos/cases/archive-os/film/app/`。

## 文件职责

| 位置 | 职责 |
| --- | --- |
| `demos/cases/archive-os/source/rhinelabui/src/` | 开场、档案场景、解密、模型查看器、布局、画质和声音 |
| `demos/cases/archive-os/source/rhinelabui/content/archives.json` | 五列各八份、共四十份档案的内容 |
| `demos/cases/archive-os/source/rhinelabui/film/` | 虚拟时钟、输入时间表和离线音频 |
| `demos/cases/archive-os/source/rhinelabui/build.mjs` | 构建相对路径 Vite 页面并复用 `film/app/` 中的资源 |
| `demos/cases/archive-os/` | MotionKit 舞台、同源 iframe、时间轴、预加载、手动模式和完整音轨 |

## 舞台与播放

舞台有横屏 1920×1080 和竖屏 1080×1920 两套画幅；iframe 尺寸与舞台相同。上游按宽高比选择布局，低于 1.05 时使用 portrait。外层通过 `film/app/index.html?film=1&quality=<q>` 加载应用，默认画质为 original；软件 GL 且未显式指定 quality 时使用 performance。

预加载包括字体、两份 GLB、白底首帧与完整音轨，沿用 MotionKit 的进度和 ready 协议。虚拟时钟以 60Hz 推进，输入和动画按同一时钟执行。播放时跳过中间 GPU 绘制，保留状态更新；向后定位或手动操作后定位时，会重新加载 iframe，从零推进到目标时刻。

暂停时，真实的键盘、鼠标或触摸输入会使作品切到手动模式。再次播放或定位时恢复预设演示。切换画幅时会重新加载另一尺寸的 iframe，并恢复当前时刻。

## 演示节拍

| 时刻 | 画面 |
| --- | --- |
| 0s | 白底开场、逐字输入 |
| 22s | 档案阵列展开 |
| 35s | 自动读取第一份档案 |
| 42.5s | 切换页签 |
| 49s | 360° 模型查看器 |
| 54.1s | 拆解 |
| 58.35s | 重组 |
| 60.6s | 返回阵列 |
| 62.6s | 四向循环浏览 |
| 77.6s | 结束 |

在仓库根目录运行 `npm run build:archive` 更新 `film/app/` 构建产物，运行 `npm run build:site` 打包站点。完整音轨通过同一个 WebAudio 采样声部供播放、暂停、定位和视频导出使用。
