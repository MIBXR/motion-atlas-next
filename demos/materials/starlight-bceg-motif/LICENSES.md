# 许可与来源

## 音乐、封面与动机谱例

「少女☆歌劇 レヴュースタァライト」オリジナルサウンドトラック，藤澤慶昌・加藤達也，2018。音乐与封面版权归原权利人，本素材作个人学习研究收录。

动机整理与谱例来源：栎社大木，[《少女歌剧》配乐的灵魂？藏在TV原声带里的BCEG（7135）动机](https://www.bilibili.com/video/BV1w5XfBYEPr/)。`source/score-crops/` 保留 45 张谱例原帧裁切。

`demo/data/motif.json` 记录各曲目原名、原始 MP3 文件名、视频曲号与切片时间。视频 26 ランチボックス 对应的音频文件是 OST 25 子猫のカーニバル。

## VexFlow 4.2.5

- 版本：4.2.5。
- 来源：[npm tarball](https://registry.npmjs.org/vexflow/-/vexflow-4.2.5.tgz)。
- 运行库：`vendor/vexflow@4.2.5/vexflow.js`。
- 许可原文：[MIT](vendor/vexflow@4.2.5/LICENSE)。

## Noto Serif JP

- 来源：[Google Fonts 固定提交 8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5](https://github.com/google/fonts/tree/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/notoserifjp)。
- 字体：`fonts/NotoSerifJP-700.woff2`、`fonts/NotoSerifJP-900.woff2`，完整字库，未做字符子集；从该提交的完整可变字体固定 wght 700、900 后保存为 WOFF2。
- 许可原文：[SIL Open Font License 1.1](fonts/OFL.txt)。

## 数据与音频重建

在本体目录运行 `python source/build-data.py`，由 `source/analysis/` 生成页面数据与 C 大调 MIDI。脚本仅使用 Python 标准库。

安装 FFmpeg 后运行 `python source/cut-audio.py <OST目录>`，按 `source/analysis/edits.json` 使用 `ffmpeg -c copy` 生成 28 个 MP3 切片；`--help` 列出需要的 OST 文件名。
