# 合影组装与字标砸落

## 实现 Prompt

用来源案例 ink-press 的原作 renderAt(t) 重放合影组装与字标砸落。保留 ELS 九个页面切片、4 起每 3 帧一项的 cue 与 12 帧飞行，FLY_EASE=bezier(0.34,1.4,0.44,1)；字标按 round(42+i*1.8) 入场，各用 8 帧从 28px 下移、1.35 倍和 8px 模糊砸落。保留绝对帧 945/980/1005 的 riser→impact→sparkle 与音量 0.5/0.55/0.3，字标落定后停留一秒。按 index.html 内联配置的 segments 映射时间，保留原作素材和同区间音轨，声音默认关闭。

## 参数

- **片段**：AIFL_SHOTS.outro：940–1085 帧，145/30 秒。
- **组装与砸落**：ELS.cue=[4,7,10,13,16,19,22,25,28]，各飞行 12 帧；字标 delay=round(42+i*1.8)，各入场 8 帧。
- **声音句式**：SFX：945 riser-cine.mp3 volume=0.5；980 impact-cine.mp3 volume=0.55；1005 sparkle.mp3 volume=0.3。
- **收尾**：tag=68→80；fadeOut=duration-12→duration，即 133→145；字标完整后保留至少 30 帧。

[打开 Demo](../../demos/patterns/outro-group-photo-slam/index.html) · [在库中查看](../../patterns.html#pattern/outro-group-photo-slam)
