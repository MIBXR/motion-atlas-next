# 重建样例与索引

在仓库根目录运行，`<上游目录>` 指向 HyperFrames 提交 `f0b2dd0cdbd926e32cb11435c53819933fcc1ef3` 的源码目录：

```bash
node --experimental-strip-types demos/materials/hyperframes-registry/source/rebuild-demo.mjs <上游目录>
node demos/materials/hyperframes-registry/source/build-catalog-index.mjs
```

第一个脚本复制模板与精选模块、下载 registry 的 `url` 文件、补齐背景图片、生成占位符模板的预览副本，并按 `cdn-map.json` 改写实际加载的 CDN 地址。`catalog-previews.json` 保存 16 个包装页的原文，重建时把内嵌合成改为本地文件、把 GSAP 地址改为 vendor 路径；`camera-shake` 直接加载 `camera-shake.html`。字幕覆盖文件为 `caption-pill-karaoke/caption-overrides.json` 与 `examples-preview/vignelli/caption-overrides.json`，内容为 `[]`。`vendor/` 保存固定版本运行库和素材，下载独立于此脚本。

第二个脚本按 `docs/docs.json` 的分类与顺序和 `registry/registry.json` 的模板顺序生成 456 项的 `demo/catalog-index.json`，从播放入口生成 62 项的 `demo/local-items.json`。`vfx-shatter` 保留入库标记，通过官网链接查看，不建立本地播放器。
