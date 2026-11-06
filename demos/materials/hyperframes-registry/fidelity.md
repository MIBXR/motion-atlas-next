# HyperFrames Registry 对照

## 本地适配

- 实际加载的 CDN 运行库、字体和纹理地址改为 `vendor/`；第三方模块内的导入地址指向相应本地文件。
- 按 `registry-item.json` 的 `url` 把图片下载到模块的 `path`，保留元数据与 HTML 中的图片引用。
- `code-snippet-dark-modern` 保留根目录的 `background.jpeg`，另存一份到 HTML 使用的 `assets/background.jpeg`。
- `play-mode`、`swiss-grid`、`vignelli`、`warm-grain` 的 `demo/examples/` 保留上游原文，播放器加载 `demo/examples-preview/`；预览副本对全部 HTML 应用上游 `patchMediaPlaceholders(html, { durationSeconds: 10 })`，并本地化运行库地址。
- `kinetic-type` 主视频原字节保存为 `vendor/kinetic-type-a-roll/a-roll.mp4`，对应 `<video>` 只改 `src`。
- 样例页用播放器的 `srcdoc` 入口和指向本地入口文件的 `base` 加载合成；`runtime-src` 指向本地 0.8.231 运行时，在合成脚本前加载。
- 15 个 component 使用官网 catalog JSON 的包装页，将内嵌 base64 合成改为本地同名 HTML、将 GSAP 地址改为 vendor 路径。`code-snippet-dark-modern` 按上游 `renderWrapperHtml` 生成包装页，使用官网的白色背景、11 秒时长与 1920×1080 尺寸，挂载本地合成。16 份包装原文保存在 `source/catalog-previews.json`，播放入口为各模块的 `catalog-preview.html`；上游 `demo.html` 保留。
- `camera-shake` 的播放入口为 `camera-shake.html`。
- `demo/modules/caption-pill-karaoke/caption-overrides.json` 与 `demo/examples-preview/vignelli/caption-overrides.json` 的内容为 `[]`。

## HTML-in-Canvas

`vfx-shatter` 在带 `CanvasDrawElement` 参数的 Edge 中启动时抛出 `No cached paint record for element`，`currentTime` 停在 0。官网标记 `unsupported: canvas-draw-element`，只放录好的视频。本库保留原文件与索引中的入库标记，样例页只提供安装命令和官网链接，不建立播放器，`local-items.json` 不包含这一项。

## 官网同名模块对照

在 1440×900 视口和启用 `CanvasDrawElement` 的 Edge 155.0.4283.62 中，以下 5 个模块在播放中点的合成画面与官网一致。共同差异是播放器工具栏的显示尺寸随舞台缩放。

| 模块 | 对照时刻 |
| --- | ---: |
| kinetic-type-swap | 2 秒 |
| typed-prompt | 2 秒 |
| terminal-simulator | 2.5 秒 |
| product-turntable | 3 秒 |
| liquid-glass-widgets | 4 秒 |
