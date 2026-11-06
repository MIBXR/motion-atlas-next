# 量出来的蓝 · 显微叙事

## 实现 Prompt

制作“量出来的蓝 · 显微叙事”：从一张真实肝组织玻片连续推到细胞核，逐像素数出两个1毫米圆内13.5%与32.6%的蓝色，再拉回玻片。相似变换的对数螺旋镜头衔接影像金字塔，计数遮罩、读数、比例尺与核膜圆环都取自同一玻片。画面：PathAI Ventana-1.bif三色染色人肝全玻片扫描和扫描仪自带玻片照片，OpenSlide托管，CC0。运动：玻片、组织、结节、细胞核连续变焦与转动，细节按影像金字塔切换；扫描前沿点亮计入的蓝色像素。声音：90 BPM原配乐、玻璃主题、物镜转盘与伺服声、计数滴答和焦面扫声、Kokoro af_heart旁白。实现文件为film/film.js、film/timeline.js，保留真实数据、素材署名和原片音轨，按1920×1080舞台的原作render(t)逐帧定位。

## 动效 Token

- **源码时间线**：film/timeline.js的T/HIT/BUILD；段落见rhythm.beats。

## 制作约束

- 素材、数据、字体与时间线由原作文件直接驱动。

## 迁移

- `film/film.js`：修改画面、时间线或对应数据；参数位置见该文件。
- `film/timeline.js`：修改画面、时间线或对应数据；参数位置见该文件。

[打开 Demo](../../demos/cases/lemo-microscope/index.html) · [在库中查看](../../cases.html#case/lemo-microscope)
