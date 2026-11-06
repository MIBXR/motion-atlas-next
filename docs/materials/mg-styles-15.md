# mg-styles-15 使用说明

从[素材详情](../../materials.html#material/mg-styles-15)选择风格，打开对应提示词，把「提示词」整段交给能够写代码、运行命令的 AI。套件把导演输入、制作约束和独立评审分开：`prompts/` 提供完整范例，`template.md` 用于写新风格，`rubric.md` 用于审片，`lib/audio/` 负责配乐与音效。

填写模板时，先用 Style 命名风格，再填写四段导演输入。Output 写画幅、帧率、时长与声音规格；Suggested technical route 选择画面实现手段；Creative seed 把故事写成有秒数的钩子、升级、高潮和落版，同时交代色彩、字体与声音；Signature features 写出可观察的视觉特征和可执行技法，突出风格的辨识度。角色设定、How to work、Rules、Craft checklist、自评和 Deliver 等通用部分从现有提示词照抄。

评审时，将成片与 `rubric.md` 一起交给另一个 AI，让它按量表看片、给出分项评价，再把具体修改意见交回制作 AI。修改时保留画面和声音共用的时间点，使视觉事件、音乐段落和音效瞬态一起调整。

## 配乐复现

配乐从[模块说明](../../demos/materials/mg-styles-15/lib/audio/README.md)进入：按风格选 recipe，设置高潮、落版、速度与调性，再将音效放到画面事件上；需要自定义配器时使用 synth、drums、samples 和 seq。原案例的 `source/audio.py` 是完整编曲入口，所用的采样与合成模块都来自同一份 `lib/audio`。

在仓库外准备复现目录，把素材快照的 `lib/audio` 放到根目录的 `lib/audio`，把案例 `source/` 内容放到 `demos/<原 slug>/`，然后在该案例目录运行配乐脚本。额外图片、纹理、字体和场景的映射见各案例 `fidelity.md`；这种组装保留脚本原有的相对路径。


Windows 使用 Python 3.12，在复现根目录创建 `requirements-windows.txt`，固定依赖如下：

```text
numpy==2.4.6
scipy==1.16.3
soundfile==0.14.0
numba==0.66.0
pedalboard==0.9.25
pyloudnorm==0.2.0
matplotlib==3.9.1.post1
librosa==0.11.0
pillow==12.3.0
fonttools==4.53.1
scikit-image==0.26.0
opencv-python==5.0.0.93
rembg==2.0.78
```

在复现根目录用 PowerShell 安装，并运行线条艺术与手绘案例的编曲入口：

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-windows.txt --only-binary=matplotlib
$env:PYTHONUTF8='1'
$env:MPLBACKEND='Agg'
Set-Location demos/02-line-art
& ..\..\.venv\Scripts\python.exe audio.py
Set-Location ../05-cel-boil
& ..\..\.venv\Scripts\python.exe audio.py
Set-Location ../..
```

两例均输出 `out/audio.wav`，为 48 kHz、双声道、10 秒。线条艺术同时生成频谱图；手绘编曲入口调用 `tools/hitmax.py` 后处理。

## 画面导出

画面采用按给定时刻绘制一帧的协议。上游的 `harness/render.mjs` 对应本库的 `scripts/render.mjs`：原作 `window.renderAt(t)` 由 MotionKit 接到 `window.__motion.seek(t)`，先导出画面，再用 ffmpeg 将配乐 WAV 与画面合成。三维画面先由 Blender 输出帧序列，再由案例页面叠加文字和颗粒，页面仍通过同一个逐帧入口导出。具体命令见[渲染管线](../pipeline.md)。

本库收录该套件的14个案例。HUD风格提示词保留在快照中，HUD案例见[伏特·规格扫描 · 科幻全息界面](../../cases.html#case/lemo-hologram-hud)。
