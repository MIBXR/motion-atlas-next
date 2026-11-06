from pathlib import Path
import json,numpy as np,re,cv2
from PIL import Image
from concurrent.futures import ThreadPoolExecutor
from extract import frame
OUT=Path(__file__).parent
def write(p,d):(OUT/p).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
caps=json.loads((OUT/'frames/caption-transcripts.json').read_text(encoding='utf8'));bars=json.loads((OUT/'bars.json').read_text(encoding='utf8'));shots=json.loads((OUT/'shots.json').read_text(encoding='utf8'));notes=json.loads((OUT/'notes.json').read_text(encoding='utf8'));selection=json.loads((OUT/'frames/footer-selection.json').read_text());tokens=json.loads((OUT/'tokens.json').read_text(encoding='utf8'))
bf=np.array([b['frame']for b in bars['counters']]);ys={r['row']:r['y']for r in notes['rows']}
for n in notes['notes']:
    ix=max(0,min(56,int(np.searchsorted(bf,n['t0']*60,side='right')-1)));bar=bars['counters'][ix];n['bar']=ix+1
    n['beatStart']=round((n['t0']-bar['t'])/bar['duration']*int(bar['meter'][0]),5)if ix>0 and bar['duration']else None
    n['beatUnit']='eighth'if bar['meter'].endswith('/8')else'quarter'
    rr=json.loads(re.search(r'```json\s*(.*?)\s*```',(OUT/'render-rules.md').read_text(encoding='utf8'),re.S).group(1))
    cc=n.get('colorClass',n['color']);n['colorClass']=cc
    n['color']='#'+''.join(f'{v:02x}'for v in rr['colors']['white'][cc]);n['invertedColor']='#'+''.join(f'{v:02x}'for v in rr['colors']['red'][cc])
write('notes.json',notes)

# Native caption samples retain visual punctuation and exact line breaks.
def caption_image(item):
    j,c=item;f=c['frame']+60;path=f'frames/caption-{j+1:02d}.png'
    if not(OUT/path).exists():
        a=frame(f/60);Image.fromarray(a).crop((290,1740,3120,2100)).save(OUT/path)
    c['sourceFrame']=f;c['sourceImage']=path
with ThreadPoolExecutor(max_workers=3)as pool:list(pool.map(caption_image,enumerate(caps)))
write('frames/caption-transcripts.json',caps)

# Exact final ladder line positions, with its A entry measured after the prior score has faded.
ending=next(e for e in shots['events']if e['id']=='ending-key-ladder')
for g in ending['groups']:
    g['t0']=g['startFrame']/60
ending['startFrame']=min(g['startFrame']for g in ending['groups']);ending['t0']=ending['startFrame']/60
cadence=next(e for e in shots['events']if e['id']=='cadence-key-ladder')
cadence['groups']=[dict(label='F',lineBox=[1010,422,1270,426],textBox=[930,401,963,436],barText='第 3–10 小节',barTextBox=[1010,439,1150,461]),dict(label='D',lineBox=[1010,492,1270,496],textBox=[930,471,963,506],barText='第 11–14 小节',barTextBox=[1010,509,1160,531]),dict(label='B♭',lineBox=[1010,562,1270,566],textBox=[930,541,992,576],barText='第 15–22 小节',barTextBox=[1010,579,1160,601])]
cadence['analysisText']=[dict(text='结构属于前段',box=[728,284,860,307]),dict(text='调性属于后段',box=[900,284,1034,307]),dict(text='调号仍是两个降号，排练号 C 还没到',box=[584,319,860,338]),dict(text='低音 A 上叠着它的属七',box=[900,319,1100,338]),dict(text='两次下行三度',box=[1312,478,1495,508]),dict(text='F → D → B♭ 合起来下行五度',box=[1312,516,1580,540]),dict(text='落在 F 的下属调',box=[1312,547,1500,570])]
cadence['uncertainty']='native frame 2520 records final coordinates; individual ladder/text first-visible frame boundaries remain unmeasured'
write('shots.json',shots)

annotations=[]
supers='¹²³⁴⁵⁶⁷⁸⁹'
sources=[(480,274),(600,586),(960,382),(1410,306),(1530,382),(1860,242),(3750,274),(3870,306),(5400,517)]
for i,(sel,(f,targety))in enumerate(zip(selection,sources)):
    t=sel['t0'];row=sel['row'];g=190*t
    candidates=[n for n in notes['notes']if n['row']==row and n['x0']>g-15 and n['x0']<g+350]
    candidates.sort(key=lambda n:n['x0']);uniq=[]
    for n in candidates:
        if not uniq or abs(n['x0']-uniq[-1]['x0'])>8:uniq.append(n)
    digits=[1,7,5,3]if i==8 else[7,1,3,7,5]if i==6 else[]if i==7 else[7,1,3,5]
    notehits=[]
    for digit,n in zip(digits,uniq):notehits.append(dict(text=str(digit),noteId=n['id'],highlightFrame=int(np.ceil(n['t0']*60)),highlightT=n['t0'],globalX=n['x0'],y=ys[row]+n['yOffset']+20))
    appear=max(139,int(np.ceil((g+880-1580)/190*60)))
    annotations.append(dict(id=f'motif-{i+1}',text='M'+supers[i],row=row,sourceFrame=f,sourceBox=[max(180,round(880+g-190*f/60)-20),targety-70,min(1580,round(880+g-190*f/60)+230),targety+30],globalAnchorX=g,firstVisibleFrame=appear,firstVisibleT=appear/60,timeEvidence='viewport entry inferred from measured constant scroll; first low-opacity frame not independently resolved',soundStartFrame=sel['startFrame'],soundStartT=t,numbers=notehits,animation='bracket extends to the right; numerical labels change from pale to full emphasis as their note starts; motif connection arcs are dashed',samples=[dict(frame=int(ff),t=ff/60,anchorX=round(g-190*ff/60+880,3))for ff in np.linspace(appear,min(7319,sel['endFrame']),17).round().astype(int)]))
annotations +=[
 dict(id='ostinato-12',text='ostinato ×12',sourceFrame=480,box=[267,485,622,513],globalX0=907,globalX1=1262,firstVisibleFrame=139,endFrame=507,animation='text and bracket translate with scroll; Mar./Pf. alternating short bars repeat; hidden by Ob./Va. focus',timeEvidence='intro/viewport constrained; low-opacity first frame uncertain'),
 dict(id='b-natural-circle',text='B♮ · ♯4',sourceFrame=480,box=[502,699,597,736],circleCenter=[513,725],radius=10,globalCenterX=1153,firstVisibleFrame=143,endFrame=507,animation='circle and label translate with the Vc. pizzicato dot',timeEvidence='viewport entry inferred; hidden by focus'),
 dict(id='mf-giocoso',text='mf giocoso',sourceFrame=480,box=[265,780,348,806],globalX0=905,firstVisibleFrame=139,endFrame=507,animation='scrolls along dyn. row with fixed baseline about798',timeEvidence='first visible score fade'),
 dict(id='dynamic-opening-wedge',text='',sourceFrame=180,box=[180,789,420,803],row='dyn.',firstVisibleFrame=139,endFrame=287,animation='wedge widens toward f and moves with score',timeEvidence='bar/viewport boundary; exact drawn endpoint sampled in source'),
 dict(id='unison-and-ab',text='unis. Fl. · Cl. · Vn.II\n𝄆 a\nb 𝄇 ×2',sourceFrame=900,box=[375,218,905,287],firstVisibleFrame=516,endFrame=1209,animation='section brackets and a/b text scroll; dotted repeat boundaries descend across rows',timeEvidence='bar range; precise first visibility differs per element'),
 dict(id='leggiero',text='leggiero: 第 11–14 小节的叹息音型，移到了小提琴',sourceFrame=3720,box=[465,509,1000,593],firstVisibleFrame=3406,endFrame=4419,animation='three rising curved lines end in dots; growing curves accompany Vln. I figures',timeEvidence='visible source and associated bars; exact individual curve reveals unmeasured'),
 dict(id='clarinet-inversion-outline',text='M⁹',sourceFrame=5400,box=[950,367,1620,476],firstVisibleFrame=5289,endFrame=5589,animation='hollow rounded bars above the filled clarinet melody show the interval inversion; focus matrix changes their scale',timeEvidence='focus interval measured from adjacent frames'),
 dict(id='motif-connection-arcs',text='',sourceFrame=900,box=[200,218,1250,750],firstVisibleFrame=287,endFrame=5589,animation='dashed curved connections join successive motif entries; approximately 1.5px stroke, dash about7px with7px gaps',timeEvidence='multiple events; per-arc first and last frames unmeasured'),
 dict(id='other-dynamics',text='f · espressivo\nmp dolce\nf dolce\nmf\np\ncresc.',row='dyn.',sourceFrames=[1320,1800,3720,4800,5100,6000],firstVisibleFrame=1209,endFrame=7014,animation='italic dynamic labels and cresc./dim. wedges translate with score; wedge endpoints grow or shrink',timeEvidence='sampled frame text; all individual wedge paths/first-visible frames are not recovered')
]
write('frames/annotations.json',annotations)
md=(OUT/'render-rules.md').read_text(encoding='utf8').split('| 注释 | 来源帧')[0]
md += '| 注释 | 来源帧 / 时刻 | 来源位置 | 出现 / 结束帧 | 动画 |\n| --- | --- | --- | --- | --- |\n'
for r in annotations:md+=f'| {r["id"]}: {r.get("text","").replace(chr(10)," / ")} | {r.get("sourceFrame",r.get("sourceFrames",[]))} | {r.get("box",r.get("sourceBox","dyn."))} | {r.get("firstVisibleFrame")} / {r.get("endFrame","随动机卷出")} | {r["animation"]} |\n'
md += '\n注释的坐标、动机数字点亮帧与17点横向位移采样在 frames/annotations.json。逐项时间依据在 timeEvidence；由卷轴位置推算的出现帧与未恢复的曲线路径在 report.md 列明。M⁷ 的可见数字为 7 1 3 7 5，M⁸ 在所取原帧中没有数字，M⁹ 为 1 7 5 3。\n'
(OUT/'render-rules.md').write_text(md,encoding='utf8')

# Continuous timeline: semantic states plus every measured scene/shot/caption/meter boundary.
scenes=[(0,'序幕','Prologue — bars 1–2',None,None,[1,2]),(287,'第一場','Scene I — Section A · bars 3–10','ヘ長調','F major',[3,10]),(1209,'第二場','Scene II — Section B · bars 11–14','ニ長調','D major',[11,14]),(1666,'間奏','Interlude — bars 15–22','変ロ長調','B♭ major',[15,22]),(2608,'第三場','Scene III — Sections C–D · bars 23–42','イ長調','A major',[23,42]),(4861,'第四場','Scene IV — Sections E–F · bars 43–57','ホ長調','E major',[43,57])]
bound={0,7320}
bound.update(s[0]for s in scenes)
for c in caps:bound.update([c['transition']['startFrame'],c['frame'],c['transition']['endFrame']])
for m in bars['meterChanges']:bound.add(m['frame'])
for e in shots['events']:bound.update([e['startFrame'],e['endFrame']])
for g in ending['groups']:bound.add(g['startFrame'])
bound=sorted(x for x in bound if 0<=x<=7320)
timeline=[]
for s,e in zip(bound[:-1],bound[1:]):
    sc=[x for x in scenes if x[0]<=s][-1]
    cap=[c for c in caps if c['transition']['startFrame']<=s]
    cc={k:cap[-1][k]for k in ['eyebrow','title','body']}if cap else dict(eyebrow='Prologue — bars 1–2',title='蝶の舞う庭',body='劇場版 少女☆歌劇 レヴュースタァライト 劇伴')
    state='white'
    for ev in [x for x in shots['events']if x['type']=='global-background-transition']:
        if s>=ev['endFrame']:state=ev['toState']
        elif ev['startFrame']<=s<ev['endFrame']:state='pink';break
    active=[ev['id']for ev in shots['events']if ev['startFrame']<=s<ev['endFrame']]
    meter=[m['meter']for m in bars['meterChanges']if m['frame']<=s]
    timeline.append(dict(t0=round(s/60,8),t1=round(e/60,8),scene=sc[1],sceneEn=sc[2],keyJa=sc[3],keyEn=sc[4],barsRange=sc[5],meter=meter[-1]if meter else'6/8',caption=cc,bgState=state,shot=active or['ordinary-scroll']))
last=timeline[-1].copy();last['t0']=122.;last['t1']=122.005;last['shot']=['last-frame-hold-audio-tail'];timeline.append(last)
write('timeline.json',timeline)

# Audio offset/fade facts and coverage for the one-page report.
audio=json.loads((OUT/'frames/audio-analysis.json').read_text());fine=audio['tailGain5ms'];v=[r for r in fine if 116.53<=r['t']<=116.77];fit=np.polyfit([r['t']for r in v],[r['gain']for r in v],1);zero=-fit[1]/fit[0];baseline=float(np.median([r['gain']for r in audio['tailGain100ms']if 112<=r['t']<=116]));start=(baseline-fit[1])/fit[0]
audio['fade']=dict(confirmed=True,fitStart=start,fitZero=zero,baselineGain=baseline,lastNonzeroTime=audio['lastNonzeroTime'],method='linear least-squares on 5ms least-squares gains from 116.53 to116.77s; AAC tail measured separately')
write('frames/audio-analysis.json',audio)
redraw=json.loads((OUT/'redraw/results.json').read_text());total=sum(r['originalRectanglePixels']for r in redraw);inter=sum(r['originalRectanglePixels']+r['redrawnRectanglePixels']-r['unionPixels']for r in redraw)
coverage=dict(duration=122.005,timelineCovered=sum(r['t1']-r['t0']for r in timeline),timelineIntervals=len(timeline),frameDifferenceScan=dict(processed=7320,total=7320,ratio=1),captions=dict(states=20,transcribed=20,ratio=1),counters=dict(changes=57,identified=57,ratio=1),rows=dict(total=16,panoramas=16,ratio=1),notes=dict(extracted=len(notes['notes']),totalUnknown=True,endpointsUnobserved=sum(not n['endpointsObserved']for n in notes['notes']),fourFrameOriginalRectanglePixelRecall=inter/total),shots=dict(events=len(shots['events']),minimumSamples=17),assets=dict(sets=12,png=24,svg=12,ratio=1),fonts=dict(categories=7,compared=7,ratio=1),redraw=redraw)
write('frames/coverage.json',coverage)
uncertainties=[
 f'音符总数的分母未知，{coverage["notes"]["endpointsUnobserved"]}个音符未观察到完整端点；四帧仍有几何、抗锯齿和颜色差异，未达到 1:1。',
 f'0–2.316667s 首小节起点被片头遮住；115.45s 后第57小节没有下一计数边界，首尾小节速度未测。',
 '8.45–12.05s、56.466667–60.2s、88.15–93.15s 的聚焦矩阵为拟合值，纵向位置有数像素误差；中间一组起止/缓动仍不精确。',
 '20.15–23.116667s、43.6–47.316667s、81.133333–84.85s 巨型标题的逐字倾斜、遮挡下字形与完整入出变换未恢复。',
 '39.05–43.466667s 调性图各行/文字、虚线连弧、力度楔形、leggiero 曲线的独立出现帧/路径未完整恢复；注释表中若干时间由卷轴位置推算。',
 f'{ending["t0"]:.6f}–{max(g["t0"]for g in ending["groups"]):.6f}s 片尾梯子与全局反色的低透明度起止约有1–5帧误差；M⁸ 所取帧中未见数字。',
 'Noto Serif SC/Source Han Serif SC 正文得分相同，若干 Latin 的 Cormorant Garamond/Infant 得分接近；原字体文件、音高零点/八度不可从画面确定。',
 '片头 Prologue 逐字框按拟合字宽划分；字幕的原始空格码位、全/半角同形标点无法由像素唯一确定，4K 字幕裁切保留实际字形。',
 '透明素材 SVG 是轮廓描摹；片头渐变标志 SVG 量化为16色，非原始矢量。'
]
write('frames/uncertainties.json',uncertainties)
lines=['# 提取结果','','帧差扫描 7,320/7,320（100%）；时间线覆盖 122.005s（100%），'+str(len(timeline))+' 个连续区间；字幕20/20、计数器57/57、谱面16/16行、素材12/12组、字体7/7类。音符提取 '+str(len(notes['notes']))+' 个，总数覆盖率未知；四帧原矩形像素覆盖 '+f'{inter/total:.2%}'+'。','',f'音频偏移 +{audio["offsetSeconds"]:.9f}s（48kHz，估计精度±0.021ms），五窗相关系数0.9887–0.9990，无可测变速。额外淡出约 {start:.3f}–{zero:.3f}s；最后非零音频116.821313s。反色为全场渐变，未测到空间擦除边界。','', '验证命令：`uv run --no-project --with numpy --with pillow --with opencv-python-headless python analysis/case/verify_redraw.py`，退出码0。阈值为最大单通道RGB差>16，分母为原帧与复绘矩形像素并集，播放头除外。','', '| 时刻 | 几何差异 | RGB像素差异 |','| --- | --- | --- |']
for r in redraw:lines.append(f'| {r["t"]}s | {r["geometryDifferenceRatio"]:.2%} | {r["pixelDifferenceRatio"]:.2%} |')
lines +=['','仍不确定或未提取：','']+[f'- {u}'for u in uncertainties]
(OUT/'report.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
print(json.dumps(dict(timelineIntervals=len(timeline),notes=len(notes['notes']),rectangleRecall=inter/total,fade=[start,zero],uncertainties=len(uncertainties))),flush=True)
