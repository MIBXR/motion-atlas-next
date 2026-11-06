# 第三方许可索引

[来源、版本和许可事实](../../../entries/cases/mg-synthwave.json)

- [film/LICENSE](film/LICENSE)
- [fonts/archivo-OFL.txt](fonts/archivo-OFL.txt)
- [fonts/mrdafoe-OFL.txt](fonts/mrdafoe-OFL.txt)
- [fonts/michroma-OFL.txt](fonts/michroma-OFL.txt)
- [fonts/vt323-OFL.txt](fonts/vt323-OFL.txt)
- [vendor/three@0.186.1/LICENSE](vendor/three@0.186.1/LICENSE)
- [vendor/simplex-noise@4.0.3/LICENSE](vendor/simplex-noise@4.0.3/LICENSE)
- [vendor/opentype.js@2.0.0/LICENSE](vendor/opentype.js@2.0.0/LICENSE)

## 制作依赖

配乐脚本 `source/audio.py` 依赖素材 `demos/materials/mg-styles-15/lib/audio` 的 [mgaudio 与采样](../../materials/mg-styles-15/lib/audio/README.md)，提示词与原作许可随[素材快照](../../materials/mg-styles-15/README.zh-CN.md)保存；脚本读取的时刻表位于 `source/cues.json`。

在仓库外按[素材使用说明](../../../docs/materials/mg-styles-15.md)组装原目录后执行 `cd <复现根>/demos/10-synthwave && PYTHONUTF8=1 <venv-python> audio.py`，输出 `out/audio.wav`。
