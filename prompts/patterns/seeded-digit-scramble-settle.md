# 乱数跳变落定

## 实现 Prompt

以来源案例lemo-hologram-hud的原作render(t)重放“乱数跳变落定”。等宽数字按字符位置、帧号与种子确定性跳变，按从右到左的锁定门限逐字落定；空格、小数点、逗号与中点保持，完整锁定时读数转为琥珀色。 参数：order=(n−1−i)/max(1,n)，lockAt=.25+order×.7；hash(frame×13.7+i×7.1+seed)选字，frame=round(t×24)。；数字使用0123456789，文字使用GLY_A；monoText以最宽数字固定adv；specCard在st.roll>=1时变琥珀色。。按入口segments映射原片，复用原作素材、字体与同段音轨，声音默认关闭。

## 参数

- **原片重放区间**：9.800—11.300秒；15.300—16.300秒；19.300—20.300秒，1倍速。

[打开 Demo](../../demos/patterns/seeded-digit-scramble-settle/index.html) · [在库中查看](../../patterns.html#pattern/seeded-digit-scramble-settle)
