# 充气字母的三维制作

作品与固定来源见[案例条目](../../entries/cases/mg-3d-render.json)，导演输入与制作约束来自 [mg-styles-15](../materials/mg-styles-15.md)。场景、模拟、网格和配乐入口保存在[制作源码](../../demos/cases/mg-3d-render/source/README.md)。

## 技术路线与决定

`source/blender/sim.py` 将运动模拟结果写入 `work/anim.npz`，`scene.py` 读取模拟、四个 PLY 字母网格与 HDRI 搭建 Cycles 场景，`render.py` 输出 240 帧三维底片。模拟包含 9991 个胶囊与 60 个散落胶囊，配乐从 `source/out/events.json` 读取碰撞事件。

Blender 负责胶囊、充气字母、金属句点、灯光、景深和运动模糊；案例页面读取 WebP q95 帧序列，再合成文字、调色、暗角与颗粒。时间轴固定为 24 fps、10 秒，最终逐帧导出使用[本库渲染管线](../pipeline.md)。这个分工将高成本的三维渲染与可直接修改的文字、节奏和画面合成分开。

模拟与配乐共用附带的事件表。相同输入在本机生成的 `pill_land`、`pill_launch` 分别有 114、125 项浮点末位差异，画面生成使用模拟输出，配乐使用随源码保留的事件表。

## Windows 环境与渲染成本

Blender 5.1.2 位于 `C:/Program Files/Blender Foundation/Blender 5.1/blender.exe`。设备为 Intel Core i5-13500H，12 核、16 线程；oneAPI 枚举返回 CPU，场景与渲染通过 `MG_DEVICE=NONE` 使用 CPU，`MG_ROOT` 指向复现根目录。

输出为 1920×1080、100% 分辨率；Cycles 最多 24 samples、自适应最少 12 samples、threshold 0.035，使用 OIDN 去噪，开启景深与运动模糊，shutter 0.5，最大反弹 8。

| 渲染范围 | 耗时 |
| --- | --- |
| 帧 0 | 77.6 秒 |
| 帧 120 | 79.0 秒 |
| 帧 200 | 92.1 秒 |
| 按三帧均值估算 240 帧 | 5.53 小时 |
| 同设置完整 240 帧 | 约 7 小时 31 分 |

单帧耗时包括帧切换、渲染、Blender 合成与 PNG 保存。先渲染帧 0、120、200，查看开场、字母全景与收尾，确认场景后再渲染全部帧。复现目录按[素材使用说明](../materials/mg-styles-15.md#配乐复现)组装，在 `demos/04-3d-render/` 运行：

```powershell
$env:MG_ROOT='<复现根目录>'
$env:MG_DEVICE='NONE'
& 'C:/Program Files/Blender Foundation/Blender 5.1/blender.exe' -b --factory-startup -P blender/scene.py
& 'C:/Program Files/Blender Foundation/Blender 5.1/blender.exe' -b work/scene.blend -P blender/render.py -- --frames 0,120,200
& 'C:/Program Files/Blender Foundation/Blender 5.1/blender.exe' -b work/scene.blend -P blender/render.py -- --range 0:239
```

## 修改方法

- 字母轮廓与网格：`source/blender/make_letters.py`、`source/assets/mesh/`；字体路径见本体的制作依赖说明。
- 模拟与碰撞：`source/blender/sim.py`；重新生成 `work/anim.npz` 后再搭建场景。
- 相机、材质、灯光与渲染：`source/blender/scene.py`、`render.py`。
- 文字、颗粒、调色与节奏：`film/scene.js`、`film/style.css`、`film/cues.json`。
- 配乐与事件落点：`source/audio.py`、`source/cues.json`、`source/out/events.json`。

对照结果与已接受差异见本体的 [fidelity.md](../../demos/cases/mg-3d-render/fidelity.md)。
