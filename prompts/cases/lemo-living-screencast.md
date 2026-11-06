# Clawd 搬进来 · 活体实机录屏

## 实现 Prompt

制作一支活体实机录屏时间线影片。Clawd从终端字符标志中爬出并搬入Claude应用，沿真实DOM元素上边缘跑跳，演示输入、Plan、diff审阅、预览和并行会话，最后逐词跳出标语。高分辨率DOM界面与低分辨率像素小人的反差；光标代表用户，小人代表软件，每个落点与真实界面状态绑定。画面构成：沿用Claude应用明暗主题；陶土#D97757的小人与中性毛玻璃字幕形成主次。；Inter界面、JetBrains Mono代码、Newsreader标题和标语。；1920×1080；应用浮在桌面壁纸上，字幕与键位HUD固定在屏幕层。；HTML/CSS/SVG重绘界面，像素精灵与道具使用同一方格。；小人落在DOM上沿；相机一镜内推近、漂移、急摇，缩放始终不小于1。；原片钢琴、爵士贝斯、鼓与8位音色，UI拟音和Kokoro旁白。；100BPM；每章以像素块遮挡转场，动作按旁白单词定位。；UI状态、镜头、吉祥物与声音事件由film.js同一时间表派生。。实现入口为demos/cases/lemo-living-screencast/film/，MotionKit适配层仅调用并等待原作render(t)，使用原片音轨同步播放。

## 动效 Token

- **DOM锚点**：film/main.js:A：getBoundingClientRect→(screen−center)/z+cam；film/film.js:at / Actor.eval读取顶部fy=0。
- **相机**：film/film.js:camAt：x/y线性混合、log(z)混合，后续move从当前结果继续；微漂移1.2/.9px。
- **急摇模糊**：film/main.js:render：与t−1/24相机位置求速度，超过30px后×.3，上限36px。

## 制作约束

- 动作端点以现有DOM元素为锚点。
- 旁白词锚点与voices/words.json同步。
- 主题揭示与界面状态共用时间轴。

## 迁移

- `film/main.js:A`：修改该处的DOM锚点参数。
- `film/film.js:camAt`：修改该处的相机参数。
- `film/main.js:render`：修改该处的急摇模糊参数。

[打开 Demo](../../demos/cases/lemo-living-screencast/index.html) · [在库中查看](../../cases.html#case/lemo-living-screencast)
