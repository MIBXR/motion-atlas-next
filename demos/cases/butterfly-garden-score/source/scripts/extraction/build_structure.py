from pathlib import Path
import json,numpy as np
OUT=Path(__file__).parent
def write(name,data): (OUT/name).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8')
barframes=[139,230,287,402,516,631,746,861,977,1093,1209,1321,1436,1551,1666,1781,1896,2011,2125,2239,2354,2467,2608,2722,2836,2950,3065,3179,3293,3406,3527,3597,3716,3832,3950,4067,4185,4303,4419,4526,4578,4720,4861,5002,5143,5285,5426,5567,5709,5861,6020,6179,6338,6497,6656,6814,6927]
meters=[dict(frame=139,t=139/60,meter='6/8'),dict(frame=230,t=230/60,meter='3/8'),dict(frame=287,t=287/60,meter='6/8'),dict(frame=3527,t=3527/60,meter='3/8'),dict(frame=3597,t=3597/60,meter='6/8'),dict(frame=4526,t=4526/60,meter='3/8'),dict(frame=4578,t=4578/60,meter='6/8'),dict(frame=6814,t=6814/60,meter='5/4'),dict(frame=6927,t=6927/60,meter='4/4')]
bars=[]
for i,f in enumerate(barframes):
    meter=[m['meter']for m in meters if m['frame']<=f][-1]
    dur=(barframes[i+1]-f)/60 if i<56 else None
    bpm=None if dur is None or i==0 else ((int(meter[0])/3*60/dur)if meter.endswith('/8')else int(meter[0])*60/dur)
    bars.append(dict(bar=i+1,t=round(f/60,8),frame=f,meter=meter,duration=round(dur,8)if dur else None,tempo=round(bpm,6)if bpm else None,tempoUnit='dotted quarter'if meter.endswith('/8')else 'quarter',transitionFrames=1,transition='hard cut',durationStatus='first bar starts behind the intro, only first visible counter time is known'if i==0 else 'last bar has no following counter; its duration is not measured'if i==56 else 'measured between adjacent counter changes'))
write('bars.json',dict(fps=60,counters=bars,meterChanges=meters,numberAnimation=dict(type='hard cut',frames=1,oldNumberLastFrame='change frame - 1',newNumberFirstFrame='change frame',colorTransitions='global red/white transitions affect the whole counter; no rolling numerals'),tempoChanges=[dict(bar=b['bar'],t=b['t'],bpm=b['tempo'],unit=b['tempoUnit'],duration=b['duration'])for b in bars if b['tempo']],printedTempos=[dict(frame=2608,t=2608/60,text='♩.=61',location='caption body, bars 23–26'),dict(frame=4526,t=4526/60,text='♩.=53',location='caption title, bars 40–42')]))
caps=[
 (139,1,2,'Bars 1–2 — Prologue','幕起','弦乐 trill 渐强到 f，3/8 小节里竖琴滑奏，帷幕升起'),
 (287,3,4,'Bars 3–4 — Section A · Oboe','F 大调 · 动机 M 登场','马林巴与钢琴 giocoso 铺底；双簧管吹出 7 1 3 5，少女歌剧标志性的「呼唤」'),
 (516,5,6,'Bars 5–6 — Viola','第一次呼应','中提琴晚一小节模仿动机 M；低音拨弦里的 B♮ 带来明亮的悬浮感'),
 (746,7,8,'Bars 7–8 — Flute, Clarinet, Vn.II · Horns','动机传入铜管','三个声部齐奏断奏音型，如蝶翅轻振；圆号齐奏接过动机 M'),
 (977,9,10,'Bars 9–10 — Texture','四层织体，推向转调','长音线 · 拨弦低音 · 断奏音型 · 键盘底色；铜管渐强，吊镲滚奏'),
 (1209,11,12,'Bars 11–12 — Section B','F → D：下行小三度转调','全体 f；第一小提琴 espressivo 唱出主题，单簧管接住动机 M'),
 (1436,13,14,'Bars 13–14 — Horns','一问一答','圆号晚一小节回应单簧管，动机在木管与铜管之间往返'),
 (1666,15,16,'Bars 15–16 — Interlude · Flute','D → B♭ · 首尾呼应','mp dolce；动机 M 回到长笛，7 1 3 5 第四次出现，每四小节一次'),
 (1896,17,20,'Bars 17–20 — Interlude','长笛再次呼出 7135','mp dolce；动机 M 回到长笛，7 1 3 5 第四次出现，每四小节一次'),
 (2354,21,22,'Bars 21–22 — Cadence','结构仍属间奏，调性已入 A','非常精巧的衔接段。结构属于前段，调性属于后段，A 大调先于第 23 小节的调号到来'),
 (2608,23,26,'Bars 23–26 — Section C','B♭ → A：下行半音 · scherzando','♩.=61；长笛、短笛与第一小提琴重拾第 7–10 小节的断奏音型'),
 (3065,27,31,'Bars 27–31 — Build-up','a b 三次反复，推向高潮','第 30 小节渐强到 f；3/8 小节里竖琴滑奏、吊镲滚奏，落到 D 段'),
 (3597,32,35,'Bars 32–35 — Section D','奏响吧！华尔兹全奏 f！','克洛蒂娜落地起舞，大管与大提琴唱出新主题，小提琴 leggiero 如蝶翅轻扑；双簧管吹出\nhook 的变体'),
 (4067,36,39,'Bars 36–39 — Tutti','木管与圓号齐唱 dolce','双簧管、单簧管、圆号同奏一条旋律，小号长音托在上方，长号反拍推动'),
 (4526,40,42,'Bars 40–42 — Transition','♩.=53，一次呼吸','3/8 小节之后，木管、圆号与弦乐的长音涨到 mf 又退去'),
 (4861,43,45,'Bars 43–45 — Section E','A → E · p','织体骤然稀疏：大管、拨弦与零星的钢琴和弦，长笛轻轻附和'),
 (5285,46,49,'Bars 46–49 — Clarinet','hook 的倒影','单簧管吹出 1 7 5 3：7 1 3 5 的音程上下翻转，节奏不变'),
 (5861,50,53,'Bars 50–53 — Section F','舞台少女诉说着她们的理想','让长颈鹿落泪的琶音，第一小提琴沿 1 3 5 7 上行，钢琴琶音铺底，圆号轻声应和'),
 (6497,54,55,'Bars 54–55 — Colour','Starlight 渐暗','低音落到 C♮：E 大调里借来小调的色彩'),
 (6814,56,57,'Bars 56–57 — Close','而下一曲即将奏响。','低音部把借来的 C♮ 升回 C♯，织体只剩长音渐弱，色彩还原、织体收束。'),
]
ds=np.array(json.loads((OUT/'frames/scan.json').read_text())['frameDifferences']['caption'])[:,0]
transitions=[]
for f,*_ in caps:
    cand=np.flatnonzero(ds[max(0,f-22):f+55]>.03)+max(0,f-22)
    start=int(cand.min())if len(cand)else f
    if f==139:start=139
    transitions.append(dict(frame=f,startFrame=start,endFrame=int(cand.max()+1)if len(cand)else f+1,t0=start/60,t1=int(cand.max()+1)/60,animation='old text fades out; new text fades in with vertical displacement',thresholdMeanDifference=.03))
write('frames/caption-transcripts.json',[dict(frame=f,t=f/60,bars=[b0,b1],eyebrow=e,title=tt,body=body,transition=tr)for (f,b0,b1,e,tt,body),tr in zip(caps,transitions)])
write('frames/barframes.json',barframes)
if (OUT/'notes.json').exists():
    nd=json.loads((OUT/'notes.json').read_text(encoding='utf8'))
    for n in nd['notes']:
        ix=int(np.searchsorted(np.array(barframes)/60,n['t0'],side='right')-1)
        ix=max(0,min(56,ix));b=bars[ix];n['bar']=b['bar']
        n['beatStart']=round((n['t0']-b['t'])/b['duration']*int(b['meter'][0]),5)if b['duration']and ix>0 else None
        n['beatUnit']='eighth'if b['meter'].endswith('/8')else 'quarter'
    write('notes.json',nd)
print('57 counters, 9 meter states, 20 caption states',flush=True)
