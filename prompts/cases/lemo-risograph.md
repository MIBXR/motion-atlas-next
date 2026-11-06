# 周日骑行 · Risograph 孔版印刷

## 实现 Prompt

制作一支Risograph 孔版印刷时间线影片。每块新增色版推进一个故事段落，透明专色叠印、固定网点和套版节拍构成完整画面。纸#F6F1E6，蓝#0078BF、黄#FFE800、荧光粉#FF48B0，叠版产生绿、紫与橙。Bricolage Grotesque 800粗标题与Jost 500–700字幕，片尾片名粉蓝两次落印相差10px。1920×1080、24fps，宽景保留大块天空和小人物；面包交换、鸽子和分享使用中近景。人物动作12fps保持帧，车轮由路程驱动，双骨IK踩踏，围巾行波；色版在节拍上踢动并回弹。蓝街—黄面包店—粉公园逐层充实，鸽群爆发后圆盘转场；一小节静默漂版，再在28秒下拍锁回。120BPM原创巴萨诺瓦随版数加乐器，Kokoro am_adam旁白，单车铃、纸鼓、鸽翼、刹车与面包脆响。实现入口位于demos/cases/lemo-risograph/film/，保留原作render(t)、原始素材与字体；通过MotionKit.mountFilm接入播放、定位、减少动态暂停和默认关闭的声音。

## 动效 Token

- **色版叠出**：film/film.js:53–59：gate=[1,t>=8,t>=16]，每版.55秒自−60扫到W+200。
- **套版漂移**：film/film.js:36–50：26.05–27.9秒漂开，dv=[[-6,5],[24,-13],[-22,15]]；28秒以exp(−16a)cos(40a)锁回。
- **孔版网点**：film/riso.js：周期7px，网角15°/0°/75°，独立旋转0/.0005/−.0004，grain=.55。

## 制作约束

- 画面通过原作render(t)按原帧率定位，字体和全部绘制输入预载后再开始播放。
- 声音使用Release成片原混音，修改叙事时同步调整旁白、配乐与画面时间表。

## 迁移

- `film/film.js → SHOTS / plates / regist`：更改镜头、加版时刻、套版节拍与圆盘交接。
- `film/riso.js / draw.js / rider.js`：更改专色、网点、纸面与骑车人造型。

[打开 Demo](../../demos/cases/lemo-risograph/index.html) · [在库中查看](../../cases.html#case/lemo-risograph)
