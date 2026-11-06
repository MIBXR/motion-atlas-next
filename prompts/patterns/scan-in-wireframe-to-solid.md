# 扫描成线框再实体化

## 实现 Prompt

以来源案例lemo-hologram-hud的原作render(t)重放“扫描成线框再实体化”。扫描前沿按高度显露青色三维线框；归拢后面片按Fresnel与交错扫描线点亮为实体全息，边线保留，产品完成一圈转台。 参数：扫描−0.35—2.6秒，y=.2→1.16；24—24.35秒solid以三次ease-out到1；24—28秒spin=eio(u)×2π。；Fresnel=.3+.7×(1−facing)^1.6；2px明／2px38%交错线，双层低分辨率辉光。。按入口segments映射原片，复用原作素材、字体与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：0.000—2.700秒；22.000—28.000秒，1倍速。

[打开 Demo](../../demos/patterns/scan-in-wireframe-to-solid/index.html) · [在库中查看](../../patterns.html#pattern/scan-in-wireframe-to-solid)
