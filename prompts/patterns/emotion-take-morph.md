# 表情过渡：闭眼、挤压、冒符号再睁眼

## 实现 Prompt

复用 pdoom-video 原作的异步 renderAt(t)，按 index.html 内联 segments 重放“表情过渡：闭眼、挤压、冒符号再睁眼”，总时长5.25秒。mood(t,keys) 根据当前表情键和下一次切换的距离返回 eyes、squint、take、emote、emoteK；提前 .08 秒挤眼，在新眼型的前 .16 秒睁开并做负 take 拉伸，随后 .24 秒做衰减正 take 挤压。eyes 用 squint 压缩眼型，clawd 把 take 加到 sq；emote 用 backOut 弹出符号。 film/src/clawd.js:11/22：sq=(o.sq||0)+(o.take||0)，横向 1+sq*.6，纵向 1-sq。 film/src/clawd.js:90–93：squint>.8 时画闭眼线；否则横向 1+squint*.15、纵向 1-squint。 film/src/clawd.js:75/180–204：头边 (x±5.4u,y+dy-8.6u)，s=.9u；sweat/spark/heart 等以 backOut(k) 缩放，!/? 由 letter 的 pop 绘制。 film/src/ch/c01_lab.js:164/206/240：3.92秒 normal→spark 并冒星，6秒 Researcher star→wide 并冒汗；8秒段含 normal→wink→look。 保留原画面、固定版本 p5 与 p5.brush、完整字体和同区间 MP3，使用1920×1080、24fps。声音默认关闭，减少动态时暂停在预览帧。

## 参数

- **闭眼与睁眼**：film/src/clawd.js:211–216：切换前 .08 秒 squint→1；age<.16 时 squint=1-age/.16，take=-.14*sin(age/.16*PI)。
- **挤压回弹**：film/src/clawd.js:217：.16≤age<.4 时 take=.1*sin((age-.16)/.24*PI)*(1-(age-.16)/.24)。
- **符号包络**：film/src/clawd.js:218：emoteK=seg(age,.05,.3)*(1-seg(age,1.4,1.7))；.05–.3秒进入，1.4–1.7秒退出。
- **重放区间**：原片3.6–5.9秒、6–8.95秒，巧思总时长5.25秒。

## 迁移

- `index.html 内联配置 → segments`：设置原片起止时刻，画面与音轨使用相同映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴节点与减少动态的停留时刻。

[打开 Demo](../../demos/patterns/emotion-take-morph/index.html) · [在库中查看](../../patterns.html#pattern/emotion-take-morph)
