# 提灯人 · HD-2D

## 实现 Prompt

制作灯塔熄灭，提灯人薇伦接过最后的火，穿越夜林与风暴石阶，重新点亮灯塔，海上的船灯随后逐盏亮起。 随身灯既是照明也是情节；像素角色进入真实三维光照、阴影与焦带，RPG任务对白串起三个夜景。 像素角色按姿势帧切换，镜头、光、焦点与粒子以60fps连续更新；tilt=1焦带追随角色屏幕高度。 Three.js几何场景、逐像素纹理与角色图集、程序海水、火焰、雨与光束。 字体：Cinzel 500/700；Cormorant Garamond斜体500、正体500/600；Google Fonts拉丁子集。 声音：Scott Buckley《Precipice》CC BY 4.0，经music/edit.py剪辑；Kokoro af_heart、bm_george配音，代码生成夜林、海港与风暴声。 实现沿用lemo-hd-2d的film/源码、素材与时间表。

## 动效 Token

- **情绪灯**：film/harbor.js、forest.js、cliff.js的lit与PointLight强度；film/story.js:T.light=16.2、dim=41.3、dark=42、relight=45.6。
- **移轴**：film/main.js:tiltCenter；tiltAmt=17、tiltW=.075、tiltF=.3，角色高度加.7m后投影，中心夹在.2–.8；无角色广景用.34/.36。

## 迁移

- `film/story.js → SHOTS / T / VO`：修改章节、光焰事件与对白；音轨制作起点同步到source/vo_times.json。
- `film/chars.js / harbor.js / forest.js / cliff.js`：修改像素姿态、场景、灯光与相机轨道。

[打开 Demo](../../demos/cases/lemo-hd-2d/index.html) · [在库中查看](../../cases.html#case/lemo-hd-2d)
