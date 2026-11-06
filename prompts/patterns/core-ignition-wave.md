# 核心激活全城

## 实现 Prompt

复用等距 2.5D 来源案例的原作 window.renderAt(t)，重放原片5.7–7.35秒，时长1.65秒。核心在5.90–5.967秒下蹲蓄力，Y缩6%、XZ扩3%，镜头缩小2%、曝光压低.15EV。PULSE_T=cues.drop-.015，drop=6，PULSE_V=15，PULSE_R0=1；按r=max(abs(x),abs(z))的切比雪夫距离传播方形波。空地以FLIP_D=5/30和Math.PI*A.easeOutBack(u,1.4)翻到彩色面，载物地块由顶点着色器携模型跳起.25*y，建筑沿立面扫描着色。核心冲量exp(-(T-PULSE_T)*6)*cos((T-PULSE_T)*26)*.07，镜头两帧冲近6%后.4秒回定，主拍曝光+.3EV衰减；保留光柱、光环、冲击和扫过音。1920×1080、30fps，画面和原片同区间音轨使用同一时间映射，声音默认关闭。

## 参数

- **预备**：A.smooth(A.inv(5.90,5.967,T))；核心Y-6%、XZ+3%；镜头缩小2%；曝光-0.15EV。
- **波前**：PULSE_T=cues.drop-.015；drop=6；PULSE_V=15；PULSE_R0=1；r=max(abs(x),abs(z))。
- **地块翻面**：FLIP_D=5/30；Math.PI*A.easeOutBack(u,1.4)；中段抬升.15*sin(πu)。
- **核心冲量**：exp(-(T-PULSE_T)*6)*cos((T-PULSE_T)*26)*.07；载物顶点波抬升.25*y。
- **镜头与曝光**：镜头2帧冲近6%，.4秒easeOutExpo回定；曝光主击+.3EV，exp(-max(0,t-drop)*30)衰减。
- **时长**：1.65s；原片5.7–7.35s。

## 迁移

- `index.html 内联配置 → segments`：设置重放原片的起止时刻，画面与音轨使用同一映射。
- `index.html 内联配置 → markers / reduced`：设置巧思相对时间轴的中文节点与减少动态时刻。

[打开 Demo](../../demos/patterns/core-ignition-wave/index.html) · [在库中查看](../../patterns.html#pattern/core-ignition-wave)
