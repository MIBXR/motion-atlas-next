# 自己倒数 · 实时倒计时分屏

## 实现 Prompt

制作一支实时倒计时分屏影片。事件原声决定布局时刻，画面与任务时钟共用连续时间；机位徽章区分实时同步、同一时段和慢动作还原。布局按.34秒三次缓动插值，新格由左展开；.30秒逐格接入，零点.42秒多格合一。沿用以下制作方法：NASA同日直播、箭载和猎户座摄像机、无人机、两路地面机位、发射控制室、乘组照片与NASA任务简介。声音采用Release原混音：NASA直播解说与回路通话、Kokoro bf_emma两句旁白、60 BPM采样配乐、任务秒针与节点拟音。可编辑入口：film/index.html → T0 / LAY / HANDS；source/tools/prep.sh；film/index.html → CUES / CHECK / SYNC。

## 动效 Token

- **多格合一**：film/index.html:render / LAY / MERGE；T0=32.5，MERGE=.42，TR=.34，POP=.30。
- **时钟与控制**：film/index.html:drawClock / HANDS；每秒数字上方14px落入，.12秒，零点配色反转，.4/53.78秒移交。

## 制作约束

- 影像、字体和数据替换后同步调整原作取帧与文字时间表。
- 声音与画面沿用同一来源时间，音轨默认关闭。

## 迁移

- `film/index.html → T0 / LAY / HANDS`：修改事件零点、格子布局和控制权节点。
- `source/tools/prep.sh`：修改各机位源时刻到影片帧号的同步表。
- `film/index.html → CUES / CHECK / SYNC`：修改原声转写、计划节点与机位同步徽章。

[打开 Demo](../../demos/cases/lemo-countdown/index.html) · [在库中查看](../../cases.html#case/lemo-countdown)
