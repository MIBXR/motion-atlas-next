# 拉远换细节层级

## 实现 Prompt

以来源案例lemo-transit-map的原作render(t)重放“拉远换细节层级”。在同一张纸上持续拉远时，站点小标、普通站名与换乘站名按缩放层级退去，枢纽站名保留并相对放大；信息密度随取景范围改变，网络增长仍连续可见。 参数：2000—2010段镜头由约78拉至52px/G，倾角12°到0°。；小站点ss(seg(z,55,85))；换乘站名ss(seg(z,62,90))；普通站名ss(seg(z,100,130))；枢纽放大min(1.75,(85/z)^.6)，labelOnly再按镜头筛选。。按入口segments映射原片，复用原作素材、字体与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：13.000—21.700秒，1倍速。

[打开 Demo](../../demos/patterns/levels-of-detail-pullback/index.html) · [在库中查看](../../patterns.html#pattern/levels-of-detail-pullback)
