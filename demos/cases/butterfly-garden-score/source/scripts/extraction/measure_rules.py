from pathlib import Path
import json,numpy as np,cv2,re
from PIL import Image,ImageDraw
OUT=Path(__file__).parent
def write(p,d):(OUT/p).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
def runs(a):
    a=np.asarray(a,bool);z=np.flatnonzero(np.diff(np.r_[False,a,False]));return list(zip(z[::2].tolist(),z[1::2].tolist()))
data=json.loads((OUT/'notes.json').read_text(encoding='utf8'));scan=json.loads((OUT/'frames/scan.json').read_text());bg=np.array(scan['backgrounds']);ys={r['row']:r['y']for r in data['rows']}
rules=json.loads(re.search(r'```json\s*(.*?)\s*```',(OUT/'render-rules.md').read_text(encoding='utf8'),re.S).group(1))
colors=[]
patches=[('white',8,[400,200,700,220]),('red',8,[1640,350,1665,650]),('woodwind-current',8,[828,274,850,276]),('woodwind-future',8,[1110,267,1150,269]),('woodwind-past',36,[240,231,290,234]),('string-current',36,[830,693,855,696]),('brass-current',100,[860,379,900,382]),('grid-white',8,[400,242,600,243]),('muted-row-name',8,[135,297,160,315]),('caption-body',8,[157,977,304,999]),('caption-title',8,[157,923,525,957]),('olive-caption',8,[157,886,431,907]),('red-background',66,[400,202,700,219]),('brass-on-red',66,[860,452,900,455]),('strings-on-red',66,[850,693,1000,695]),('woodwind-on-red',66,[660,336,700,340])]
for name,t,box in patches:
    a=np.array(Image.open(OUT/'frames'/f'f{t*60:05d}.png'));x0,y0,x1,y1=[round(x*2)for x in box];p=a[y0:y1,x0:x1].reshape(-1,3)
    if name in ['muted-row-name','caption-body','caption-title','olive-caption']:
        p=p[(255-p.min(1))>70]
        if len(p):
            vals,cts=np.unique(p//2*2,axis=0,return_counts=True);v=vals[cts.argmax()];p=p[np.max(abs(p.astype(int)-v.astype(int)),1)<5]
    rgb=np.median(p,axis=0).tolist();colors.append(dict(name=name,rgb=rgb,hex='#'+''.join(f'{round(v):02x}'for v in rgb),sourceFrame=t*60,sourceBox=box,method='4K native BT.709 RGB pixels; median of flat core or modal ink cluster'))

# Fill line and seven section ticks.
progress=[]
for f in range(240,6961,30):
    t=f/60
    if any(s<t<e for s,e in [(19.9,21.3),(27.5,29),(59.7,61),(76.0,77.7)]):continue
    a=cv2.cvtColor(cv2.imread(str(OUT/'frames'/f's{f:05d}.jpg')),cv2.COLOR_BGR2RGB)
    red=a[205,500,1]<80
    m=a[177,40:1560,1]>(190 if red else 300)if red else a[177,40:1560,1]<100
    r=runs(m)
    first=next(((s,e)for s,e in r if s<3 and e-s>10),None)
    if first:progress.append([t,40+first[1]])
coef=np.polyfit(np.array(progress)[:,0],np.array(progress)[:,1],1)
progress_data=dict(y=177,x0=40,x1=1560,height=2,tickX=[79,282,383,590,809,1088,1307],tickY=[170,184],tickBars=[3,11,15,23,32,43,50],fillSlope=float(coef[0]),fillIntercept=float(coef[1]),formula='clip(fillSlope*t+fillIntercept,40,1560)',samples=progress)
write('frames/progress-measurements.json',progress_data)

# Cross motion, with every adjacent frame retained.
cross=np.load(OUT/'frames/cross.npy',mmap_mode='r');motion=[]
for f,a in enumerate(cross):
    if bg[f,1]>120:m=(a[:,:,0].astype(int)-a[:,:,1]>80)
    else:m=(a[:,:,1]>190)&(a[:,:,0]>200)
    yy,xx=np.where(m)
    if len(xx)<30:motion.append(dict(frame=f,angle=None));continue
    cov=np.cov(np.stack([xx,yy]));v=np.linalg.eigh(cov)[1][:,-1];angle=float(np.degrees(np.arctan2(v[1],v[0])));angle=(angle+90)%180-90
    motion.append(dict(frame=f,t=f/60,angle=round(angle,5),box=[int(xx.min())+825,int(yy.min())+807,int(xx.max()+1)+825,int(yy.max()+1)+807],center=[round(float(xx.mean()+825),3),round(float(yy.mean()+807),3)]))
write('frames/cross-motion.json',motion)
ang=np.array([x['angle']if x['angle']is not None else 0 for x in motion]);seg=ang[300:1200];fr=np.fft.rfftfreq(len(seg),1/60);spec=abs(np.fft.rfft(seg-seg.mean()));mask=(fr>.3)&(fr<5);freq=float(fr[np.flatnonzero(mask)[np.argmax(spec[mask])]])
crossdata=dict(anchor=[880,822],anglePercentiles=np.percentile(seg,[0,5,50,95,100]).round(5).tolist(),mainFrequency5to20Seconds=freq,raw='frames/cross-motion.json')

# Instrument marker measurements.
active=np.load(OUT/'frames/active.npy',mmap_mode='r');act=[]
for row,y in ys.items():
    lo=y-228-8;hi=y-228+9;patch=active[:,max(0,lo):hi,1:4]
    d=np.max(abs(patch.astype(float)-bg[:,None,None,:]),3).mean((1,2));on=d>90
    rs=[dict(startFrame=s,endFrame=e,t0=s/60,t1=e/60)for s,e in runs(on)if e-s>2]
    act.append(dict(row=row,box=[168,y-9,172,y+9],activationIntervals=rs))
write('frames/active-row-events.json',act)
fscores=np.load(OUT/'frames/footer-selection-scores.npy');selection=[]
onsets=[459,574,919,1378,1493,1839,3735,3852,5355];names=['Ob.','Va.','Hn.','Cl.','Hn.','Fl.','Ob.','Cl.','Cl.'];centers=[1198,1241,1284,1327,1370,1413,1456,1499,1542]
for i,(f,name,x)in enumerate(zip(onsets,names,centers)):
    selection.append(dict(index=i+1,row=name,startFrame=f,endFrame=onsets[i+1]if i<8 else 7014,t0=f/60,t1=(onsets[i+1]if i<8 else 7014)/60,iconBox=[x-18,926,x+18,965],underline=[x-12,990,x+12,993]))
write('frames/footer-selection.json',selection)

# Empirical opacity by state and horizontal distance.
samples=[];tables=[]
for n in data['notes']:
    for s in n['samples']:
        state='current'if n['t0']<=s['t']<=n['t1']else'past'if s['t']>n['t1']else'future'
        red=s['bg'][1]<80;key='red'if red else'white';cc=n.get('colorClass',n['color']);c=np.array(rules['colors'][key][cc]);b=np.array(s['bg']);v=np.array(s['color']);vec=c-b;alpha=float(np.dot(v-b,vec)/max(np.dot(vec,vec),1))
        if 0.04<alpha<1.2:samples.append(dict(id=n['id'],row=n['row'],colorClass=cc,state=state,bgState=key,distance=s['distance'],alpha=alpha,rgb=s['color'],t=s['t'],thickness=s['thickness']))
for bgstate in ['white','red']:
    for group in ['woodwind','brass','percussion','strings']:
        for state in ['past','current','future']:
            ss=[s for s in samples if s['bgState']==bgstate and s['colorClass']==group and s['state']==state]
            if not ss:continue
            tables.append(dict(bgState=bgstate,colorClass=group,state=state,count=len(ss),medianAlpha=round(float(np.median([s['alpha']for s in ss])),5),alphaP10P90=np.percentile([s['alpha']for s in ss],[10,90]).round(5).tolist(),medianRGB=np.median([s['rgb']for s in ss],axis=0).tolist()))
distance=[]
for d0,d1 in [(-600,-300),(-300,-100),(-100,-20),(-20,20),(20,100),(100,300),(300,600)]:
    for state in ['past','current','future']:
        ss=[s for s in samples if s['bgState']=='white'and s['colorClass']=='woodwind'and s['state']==state and d0<=s['distance']<d1]
        if ss:distance.append(dict(range=[d0,d1],state=state,count=len(ss),alpha=round(float(np.median([s['alpha']for s in ss])),5),rgb=np.median([s['rgb']for s in ss],axis=0).tolist()))
write('frames/opacity-samples.json',dict(summary=tables,distanceBins=distance,allSamples=samples))

# Font candidate scores and measured typography.
fr=json.loads((OUT/'font-compare/results.json').read_text(encoding='utf8'));fonts=[]
for r in fr:
    b=r['best'].copy()
    if 'ShipporiMincho-Bold' in b['file']:b['effectiveWeight']=700
    elif 'ExtraBold' in b['file']:b['effectiveWeight']=800
    else:b['effectiveWeight']=b['weight']
    b['category']=r['category'];b['referenceText']=r['text'];b['comparison']=f'font-compare/{r["category"]}-overlay.png'
    b['nearCandidates']=[x for x in r['candidates'][1:]if x['score']>b['score']-.025][:8]
    b['conclusion']='best among downloaded fixed-version candidates; nearCandidates remain indistinguishable from the video'
    fonts.append(b)
tokens=dict(coordinates='1920x1080; native sample pixels divided by 2',videoColorSpace='BT.709, TV-range YUV decoded by FFmpeg to full-range RGB',palette=colors,fonts=fonts,fontSources=json.loads((OUT/'fonts-candidates/sources.json').read_text()),typography=dict(sceneJapanese=dict(font='Shippori Mincho Bold',fontSize=62,letterSpacing=7.5,baseline=142,x=40),sidebarJapanese=dict(font='Shippori Mincho Bold',fontSize=104,lineHeight=116,centerX=1802,glyphTopY=[73,202,305,423,532]),sceneLatin=dict(font='Cormorant Garamond / Infant italic',fontSize=26,letterSpacing=1.16,baseline=98,x=303),counter=dict(font='Cormorant Garamond italic 600',fontSize=111,baseline=143.5,right=1553),rowNames=dict(font='Cormorant Garamond / Infant italic 500',fontSize=24,baselineOffset=8,right=160),captionTitle=dict(font='Noto Serif SC 700',fontSize=38,letterSpacing=1.68,baseline=955,x=156),captionBody=dict(font='Noto Serif SC / Source Han Serif SC 500',fontSize=25,lineHeight=36,baseline=997,x=156),captionEyebrow=dict(font='Cormorant Garamond / Infant italic',fontSize=26,baseline=905,x=156)),progress=progress_data,cross=crossdata,uncertainty=['Noto Serif SC and Source Han Serif SC have equal body scores.','Cormorant Garamond and Infant remain close for several Latin samples.','Compressed and antialiased source images do not establish original font filenames.','Typography baselines/spacing are fitted to visible ink, not recovered project settings.'])
write('tokens.json',tokens)

base=(OUT/'render-rules.md').read_text(encoding='utf8').split('## 数值测量')[0]
lines=[base,'## 数值测量','','普通谱面横向速度为 190 px/s（每帧 3.166667 px）；不同小节的持续帧数改变，卷轴速度保持不变。音符横坐标存至 0.5px，首尾时间由横坐标除以 190 换算。','', '行中心：'+ '；'.join(f'{r}={y}'for r,y in ys.items())+'。','', '音符主体是圆端矩形，dot 为圆点。notes.json 的 thickness 为常态厚度，samples.thickness 为该帧厚度；正在发声的 bar 在缺少同帧采样时用常态厚度加 2px。相邻音高间的几何偏移见 yOffset；谱面未给出各行音高零点与八度。','', '| 背景 | 音色组 | 状态 | 透明度中值 | 10–90% | RGB 中值 | 样本数 |','| --- | --- | --- | --- | --- | --- | --- |']
for r in tables:lines.append(f'| {r["bgState"]} | {r["colorClass"]} | {r["state"]} | {r["medianAlpha"]} | {r["alphaP10P90"]} | {r["medianRGB"]} | {r["count"]} |')
lines +=['','距离以音符中心减播放头计算，负值位于过去侧；跨播放头的长音符归为 current。以下是白底木管的距离分箱实测值。','', '| 距离 px | 状态 | 透明度中值 | RGB 中值 | 样本数 |','| --- | --- | --- | --- | --- |']
for r in distance:lines.append(f'| {r["range"]} | {r["state"]} | {r["alpha"]} | {r["rgb"]} | {r["count"]} |')
lines +=['','完整采样在 frames/opacity-samples.json。透明度随进入发声区间而变，过去与未来具有不同基值；单一按距离函数不能解释所有行与反色状态。复绘优先使用同帧采样，缺采样时用文件开头的分段值。','', '## 活跃行与底部图标','','普通镜头中，活跃行短杠位于 x=168–172、y=行中心±9；短杠与行名同时使用当前强调色，白底下行名变为黑色。发声行有一个或多个音符跨过播放头时亮起；淡入淡出边界见 frames/active-row-events.json。聚焦镜头重排行名位置。','', '| 图标顺序 | 乐器 | 选中帧区间 | 时刻 s | 下划线 |','| --- | --- | --- | --- | --- |']
for r in selection:lines.append(f'| {r["index"]} | {r["row"]} | {r["startFrame"]}–{r["endFrame"]} | {r["t0"]:.6f}–{r["t1"]:.6f} | {r["underline"]} |')
lines +=['','选中项在九次动机开始发声时依次推进，下一项开始前保持选中。0–7.65s 和 116.9s 后无下划线；全局反色渐变过程中线色与背景混合，短暂低于检测阈值。图标条中心 x='+str(centers)+'，图标区 y=926–965，标签基线约984，下划线 y=990–993。','', '## 顶部进度与十字指针','', f'进度底线从 (40,177) 到 (1560,177)，厚约 2px。七个分段刻度 x={progress_data["tickX"]}，y=170–184，分别对应第 {progress_data["tickBars"]} 小节。填充端点 x=clip({coef[0]:.8f}t{coef[1]:+.8f},40,1560)，原始端点采样在 frames/progress-measurements.json。','',f'下方十字指针锚点为 (880,822)，长横臂约84px，短竖臂约22px，白底红色、红底白色。5–20s 主方向角的 [min,p5,median,p95,max] 为 {crossdata["anglePercentiles"]}°，主频约 {freq:.4f}Hz。逐帧角度、包围盒与质心在 frames/cross-motion.json；其他时段随实际小节节奏有变化。','', '## 注释元素','', '注释沿卷轴运动时使用 screenX=globalX−190t+880；聚焦镜头按 shots.json 的每行矩阵变换。下表的来源位置是该帧的屏幕坐标，时间含由画面观察或滚动坐标推算的条目。','']
(OUT/'render-rules.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
print('tokens, opacity, progress, active rows, footer, cross',flush=True)
