# 被炸平的城市怎样长回来 · 白模投影

## 实现 Prompt

制作“被炸平的城市怎样长回来 · 白模投影”：投影把鹿特丹白模按建成年代逐层点亮，高度光层升到203米，冬至阴影越过16个屋顶后展厅重新亮起。白色建筑保持真实几何，年代、高度和阴影都通过投影与测量线呈现；同一数据同时决定模型、读数与屋顶标记。画面：3DBAG LOD1.3建筑、Kadaster BAG建成年份、BGT水面与桥面，1:1000白模和实算冬至阴影。运动：连续轨道镜头与景深，投影按年代错峰点亮，立面高度光层向上扫描，太阳推进到冬至正午。声音：100 BPM原配乐、采样管弦与玻璃音、投影机与继电器拟音、Kokoro bm_george旁白。实现文件为film/main.js、film/studio.js、film/overlay.js、film/timeline.js，保留真实数据、素材署名和原片音轨，按1920×1080舞台的原作render(t)逐帧定位。

## 动效 Token

- **源码时间线**：film/timeline.js的T/HIT/BUILD；段落见rhythm.beats。

## 制作约束

- 素材、数据、字体与时间线由原作文件直接驱动。

## 迁移

- `film/main.js`：修改画面、时间线或对应数据；参数位置见该文件。
- `film/studio.js`：修改画面、时间线或对应数据；参数位置见该文件。
- `film/overlay.js`：修改画面、时间线或对应数据；参数位置见该文件。
- `film/timeline.js`：修改画面、时间线或对应数据；参数位置见该文件。

[打开 Demo](../../demos/cases/lemo-white-model/index.html) · [在库中查看](../../cases.html#case/lemo-white-model)
