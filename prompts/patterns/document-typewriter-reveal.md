# 文档打字机自写

## 实现 Prompt

用来源案例 ink-press 的原作 renderAt(t) 重放文档打字机自写。保留正文两块一组、cueFor(i)=6+floor(i/2)*3.5、WIPE=8 和琥珀光标；历史侧栏按 58+i*5 帧启动，各用 8 帧完成 -44px 弹入。保留绝对帧 840–865、每 5 帧一次的六个 pop，音量 0.4、0.37、0.34、0.31、0.28、0.25，以及 781 帧开始的 44 帧键盘声。按 index.html 内联配置的 segments 映射时间，保留原作素材和同区间音轨，声音默认关闭。

## 参数

- **片段**：AIFL_SHOTS.wbr：775–885 帧，110/30 秒。
- **正文揭示**：cueFor(i)=6+floor(i/2)*3.5，WIPE=8；20 块正文的最后一组在 45.5 帧完成。
- **侧栏与声音**：左栏 46→56、右栏 54→64；WEEK_CUE(i)=58+i*5，8 帧弹入；pop 绝对帧 840,845,850,855,860,865，volume=0.4-0.03*i。

[打开 Demo](../../demos/patterns/document-typewriter-reveal/index.html) · [在库中查看](../../patterns.html#pattern/document-typewriter-reveal)
