# 第三方许可索引

[来源、版本和许可事实](../../../entries/cases/mg-collage.json)

- [film/LICENSE](film/LICENSE)
- [fonts/AlimamaShuHeiTi-LICENSE.txt](fonts/AlimamaShuHeiTi-LICENSE.txt)
- [fonts/Anton-OFL.txt](fonts/Anton-OFL.txt)
- [fonts/BebasNeue-OFL.txt](fonts/BebasNeue-OFL.txt)
- [fonts/IBMPlexMono-OFL.txt](fonts/IBMPlexMono-OFL.txt)
- [fonts/NotoSansSC-OFL.txt](fonts/NotoSansSC-OFL.txt)
- [fonts/NotoSerifSC-OFL.txt](fonts/NotoSerifSC-OFL.txt)

## 制作依赖

共用纸张原图位于素材快照的 [assets/textures/paper/Paper001_4K_color.jpg](../../materials/mg-styles-15/assets/textures/paper/Paper001_4K_color.jpg)，沿用上游 README 列明的 CC0 许可。

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/06-collage && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。
