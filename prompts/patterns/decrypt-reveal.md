# 对角解密与磨砂转清

## 实现 Prompt

从当前archive-os裁出单档案解密。引用../../cases/archive-os/film/app/中的archive-cassette.glb与MiSans字体，保留CardAppearance/glass-reveal/internal-optics和decryption/document-decryption/inspection-overlay源模块，保持案例GLB各层材质、照明和长焦详情投影。进入detail后等待detail>0.78且lift>3.3，再以速率1.5播放参考时间34.12→39.56秒，物理解密总长3.6267秒。一条模型空间对角线从[-1.6,0.5]到[1.98,3.24]，34.24→36.04秒两端接通、37.72→38.84秒收束，按源文件测量结点做单调Hermite插值，保留四角标与中心点。38.84→39.56秒高度相关着色器把Frosted_Polymer粗糙度0.42转0.025。正文读取X-001当前莱茵生命/RHINE LAB、Kristen Wright/Saria及摘要；用Range.getClientRects测量实际折行，每行覆盖装饰黑条，clarity>0才启动0.95秒揭示：delay=order/(count−1)×0.22，行进度=(progress−delay)/0.78，自定义加减速后translateX至101%。Demo以当前阵列待机10秒的状态为起点，按源lift临界阻尼速率4.2、detail指数速率2.8及相机速率5在60Hz推导到解密门槛，保留当时的位置与速度，再从正式解密起点展示，保留5.2秒时间轴容纳正文尾部；该物理解密段本身不另触发声音，开档声发生在此前输入阶段，声音默认关闭。可调项集中index.html顶部CONFIG，异步加载资源后render(t)按t直接求帧，减少动态直接显示完成态。出处：demos/cases/archive-os/source/rhinelabui/src/scene.ts:341–405,1434–1439；decryption.ts:3–103,148–175；document-decryption.ts:25–95。

## 视频生成 Prompt

暖灰底的长焦档案特写，使用当前archive-os的GLB档案真实玻璃、内构件与RHINE LAB标签。只保留一条模型平面对角线与四角标：从两端接通、保持、向中心收束。整个物理解密3.6267秒，最后0.48秒磨砂玻璃自上而下转清。右侧X-001档案正文依实际折行覆盖黑条，玻璃开始转清才以0.95秒顺序向右移开。保持材质、测量曲线与文案，声音默认关闭。

## 负向约束

不要双交叉X线、SVG假玻璃、CSS模糊盖层、整块scaleX黑条、均匀80毫秒错峰、旧LUMEN文案、提前露字、回弹或自造解密音效；不要引用cases目录或把整个案例嵌入巧思。

## 参数

- **对角线**：参考34.24→36.04秒接通，36.04→37.72秒保持，37.72→38.84秒收束；互动时间分别约1.2秒、1.12秒、0.7467秒，使用测量结点的单调三次Hermite插值
- **转清**：参考38.84→39.56秒，互动时间约0.48秒

[打开 Demo](../../demos/patterns/decrypt-reveal/index.html) · [在库中查看](../../patterns.html#pattern/decrypt-reveal)
