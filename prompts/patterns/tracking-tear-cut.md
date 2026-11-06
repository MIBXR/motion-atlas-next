# 磁迹撕裂即剪辑

## 实现 Prompt

用来源案例的原作render(t)实现“磁迹撕裂即剪辑”。跟踪撕裂遮住时间切口，恢复后保留相同走廊构图；OSD时钟跳过三小时，电量从三格降到一格，灯光变化共同证明时间被切走。参数：film/story.js:T.tear经W映射为36.05–36.7秒；film/main.js:render将track与roll送入film/vhs.js。；film/story.js:clock/battery在36.35秒切为AM2:59和1格；film/main.js:gLight在撕裂后熄灭头顶灯。。复用来源字体、素材和同区间音轨，声音默认关闭。

## 参数

- **原片重放区间**：lemo-backrooms：35.600000–38.400000秒，1倍速，总时长2.800000秒。

[打开 Demo](../../demos/patterns/tracking-tear-cut/index.html) · [在库中查看](../../patterns.html#pattern/tracking-tear-cut)
