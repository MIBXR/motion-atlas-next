# 纸雾洗白转地图

## 实现 Prompt

用来源案例 lemo-watercolor 的原作 render(t) 重放“纸雾洗白转地图”。drawMist 用两条带噪声的上升边界裁切纸纹，先半透明再全不透明覆盖；drawMap 从 73.2 秒开始以海岸线笔画、径向填色和引线重新组织信息。保留参数：film/main.js:drawMist：c=eio(seg(t,70.3,73.6))；top=1180−1400c−lift；[lift,alpha]=[120,.55]、[0,1]。；film/main.js:drawMist / drawMap：x 每 40px 取样；vnoise*.006 的边缘幅度 160px，sin(x*.01+t)*12；裁切后重画 PAPER_IMG，地图沿 AUS 逐段描画。。按 index.html 的 segments 把巧思时间映射到原片 70.3–80.8 秒，复用原作字体、素材与同区间音轨，声音默认关闭。

## 参数

- **来源片段**：70.3–80.8 秒，洗白 70.3–73.6 秒，地图从 73.2 秒开始。

[打开 Demo](../../demos/patterns/mist-wash-to-map/index.html) · [在库中查看](../../patterns.html#pattern/mist-wash-to-map)
