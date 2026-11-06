# 用零件造火箭 · 积木玩具

## 实现 Prompt

制作积木宇航员把高塔一块块搭起，火箭崩塌后把散落零件拼成更宽的新火箭，飞到积木月亮；镜头拉回真实书桌。 连接凸点与咔嗒落位承担节拍；崩塌产生下一次组装的材料，结尾用真实尺度的桌上道具揭示玩具世界。 角色和积木按12fps停格，镜头与烟焰按24fps更新；咔嗒落位带.35stud过冲，重建逐块从崩塌终点飞回。 Three.js程序积木与角色；Poly Haven摄影棚HDRI、胡桃木、茶具及关节台灯。 字体：Fredoka 500/600声明与原片使用的600/700/400请求；沿用共享fonts.css的原始拉丁、拉丁扩展与希伯来子集。 声音：Kevin MacLeod《Monkeys Spinning Monkeys》《Heroic Age》CC BY 4.0；Kokoro bm_george、am_adam，代码合成塑料、崩塌与火箭拟音。 实现沿用lemo-brick-toy的film/源码、素材与时间表。

## 动效 Token

- **落位与重建**：film/story.js:T.layer / fall / rebuild / rebuildStep；film/rockets.js:restPose从samples的末帧读取散落姿态，slots2复用v1中的同色积木。
- **书桌揭示**：film/main.js:cam的reveal分支；48–51.71秒由月面机位拉到[38,78,100]，look到[−20,4,−18]，fov=38，aper=1100→380。

## 迁移

- `film/story.js → T / SHOTS`：修改拼搭、崩塌、重建与升空节拍。
- `film/rockets.js / bricks.js / set.js`：修改积木配色、连接结构、两次火箭造型与桌面道具。

[打开 Demo](../../demos/cases/lemo-brick-toy/index.html) · [在库中查看](../../cases.html#case/lemo-brick-toy)
