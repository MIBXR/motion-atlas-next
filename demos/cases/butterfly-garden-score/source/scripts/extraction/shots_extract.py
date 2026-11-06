from pathlib import Path
import numpy as np,cv2,json,subprocess
from PIL import Image,ImageDraw,ImageFont
OUT=Path(__file__).parent
def write(p,d):(OUT/p).write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
def spans(a):
    z=np.flatnonzero(np.diff(np.r_[False,np.asarray(a,bool),False]));return list(zip(z[::2].tolist(),z[1::2].tolist()))
def sequence(start,end):
    p=subprocess.Popen(['ffmpeg','-v','error','-ss',str(start/60),'-i',str(OUT.parent.parent/'audio/case.mp4'),'-frames:v',str(end-start),'-an','-vf','scale=1920:1080','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],stdout=subprocess.PIPE)
    for f in range(start,end):
        b=p.stdout.read(1920*1080*3)
        if len(b)!=1920*1080*3:raise ValueError(f)
        yield f,np.frombuffer(b,np.uint8).reshape(1080,1920,3)
    p.stdout.close();p.wait()
scan=json.loads((OUT/'frames/scan.json').read_text());bg=np.array(scan['backgrounds']);heads=np.load(OUT/'frames/heads.npy');profiles=np.load(OUT/'frames/rowprofiles.npy')
events=[]
trans=spans((bg[:,1]>10)&(bg[:,1]<252))
for j,(s,e)in enumerate([(s,e)for s,e in trans if 12<e-s<140]):
    target='red'if bg[s-1,1]>bg[min(e,7319),1]else'white'
    points=[]
    for f in sorted(set(np.linspace(s,e-1,21).round().astype(int).tolist()+[s,e-1])):
        a=(253-bg[f,1])/244
        points.append(dict(frame=int(f),t=round(f/60,8),redOpacity=round(float(a),6),rgb=bg[f].astype(int).tolist(),boundary=[[0,0],[1620,0],[1620,1080],[0,1080]]))
    events.append(dict(id=f'background-{j+1}',type='global-background-transition',startFrame=s,endFrame=e,t0=s/60,t1=e/60,fromState='white'if target=='red'else'red',toState=target,direction=None,shape='uniform full-field blend; sampled corners change together',easing='measured color samples; no spatial wipe edge',samples=points))
for ident,s,e,scale,rows,targets in [('focus-ob-va',500,731,1.50,['Ob.','Va.'],[448,586]),('focus-cym-hp',3375,3637,2.00,['Cym.','Hp.'],[425,609]),('focus-clarinet',5280,5598,1.50,['Cl.'],[517])]:
    base={'Ob.':274,'Va.':694,'Cym.':490,'Hp.':586,'Cl.':306};pts=[]
    if ident!='focus-cym-hp':
        val=np.clip((heads[:,0]-879.5)/290,0,1)
        nz=np.flatnonzero(val[s:e]>.004)+s
        s=int(nz.min());e=int(nz.max()+1)
    else:
        # Grid displacement measures this focus while its playhead stays fixed.
        val=np.zeros(7320)
        prev=490
        for f in range(s,e):
            a=np.max(np.abs(profiles[f]-bg[f]),1)
            candidates=np.flatnonzero((a>9)&(a<72))+220
            near=candidates[np.abs(candidates-prev)<8]
            if len(near):prev=int(near[np.argmin(abs(near-prev))])
            val[f]=np.clip((490-prev)/65,0,1)
        # Stable focus guide positions are directly visible at f3420..3550.
        val[3420:3551]=1
        s=3388;e=3612
    for f in sorted(set(np.linspace(s,e-1,25).round().astype(int).tolist())):
        p=float(val[f]);sc=1+(scale-1)*p;sy=1+5*p;hx=float(heads[f,0]);mat={}
        for row,y in zip(rows,targets):
            yc=base[row]+(y-base[row])*p
            mat[row]=[[round(sc,6),0,round(hx-sc*880,4)],[0,round(sy,6),round(yc-sy*base[row],4)],[0,0,1]]
        pts.append(dict(frame=f,t=f/60,progress=round(p,6),playheadX=hx,matrices=mat))
    events.append(dict(id=ident,type='row-focus',startFrame=s,endFrame=e,t0=s/60,t1=e/60,rows=rows,restOpacity='fades toward zero during focus',maxScaleX=scale,maxScaleY=6,layout='selected rows reflow independently; title/sidebar/footer remain fixed',matrixScope='notes in their ordinary viewport coordinates at this same t; labels are independently positioned',samples=pts,uncertainty='Cym./Hp. transition progress is estimated from grid displacement; its start/end and intermediate matrices remain uncertain'if ident=='focus-cym-hp'else'max scales inferred from note dimensions; head position directly measured; intermediate row spacing uses measured head progress; vertical matrices retain several-pixel uncertainty'))

# Intro glyph masks from the stable 4K frame, sampled against every adjacent frame.
ref=np.array(Image.open(OUT/'frames/f00120.png').resize((1920,1080)))
chars=[]
box=(1120,135,1270,930);x0,y0,x1,y1=box;m=255-ref[y0:y1,x0:x1].min(2);runs=spans((m>60).sum(1)>1);merged=[]
for s,e in runs:
    if merged and s-merged[-1][1]<30:merged[-1]=(merged[-1][0],e)
    else:merged.append((s,e))
for ch,(s,e)in zip('蝶の舞う庭',merged):
    mm=m[s:e]>60;yy,xx=np.where(mm);b=[x0+int(xx.min()),y0+s,x0+int(xx.max()+1),y0+e]
    chars.append(dict(text=ch,box=b,samples=[],mask=mm[:,xx.min():xx.max()+1]))
font=ImageFont.truetype(str(next((OUT/'fonts-candidates/cormorantgaramond').glob('*Italic*.ttf'))),32)
text='Prologue — bars 1–2';tx=141.;scale=253/(font.getlength(text)+1.0*(len(text)-1))
for ch in text:
    adv=(font.getlength(ch)+1)*scale
    if not ch.isspace():
        b=[round(tx),134,round(tx+max(adv,2)),173];mm=(255-ref[b[1]:b[3],b[0]:b[2]].min(2))>30
        chars.append(dict(text=ch,box=b,samples=[],mask=mm))
    tx+=adv
for f,a in sequence(0,125):
    for r in chars:
        x0,y0,x1,y1=r['box'];s=a[y0:y1,x0:x1];mask=r['mask']
        r['samples'].append(float(np.mean(255-s[mask].min(1)))if mask.any()else 0.)
for r in chars:
    arr=np.array(r.pop('samples'));r.pop('mask');norm=arr/max(arr.max(),1)
    ix=np.flatnonzero(arr>3);full=np.flatnonzero(norm>.98)
    r['startFrame']=int(ix[0])if len(ix)else None;r['fullFrame']=int(full[0])if len(full)else None
    r['samples']=[dict(frame=int(f),alpha=round(float(norm[f]),6))for f in np.linspace(0,100,21).round().astype(int)]
events.append(dict(id='intro',type='intro',startFrame=0,endFrame=193,t0=0,t1=193/60,title='蝶の舞う庭',prologue='Prologue — bars 1–2',leftVertical='劇場版 少女☆歌劇 レヴュースタァライト 劇伴',rightVertical='The Garden Where Butterflies Dance — from the original score',glyphs=chars,exit='title and official logo translate into the final right sidebar; the left score/caption enters',uncertainty='Prologue per-glyph boxes follow the fitted font advance; its letters fade together.'))

# Giant titles: chroma/white masks permit independent bounds and opacity measurements.
for ident,s,e,text,polarity in [('giant-scene-ii',1190,1470,'第二場 ニ長調','white'),('giant-scene-iii',2590,3000,'第三場 イ長調','pink'),('giant-scene-iv',4840,5160,'第四場 ホ長調','pink')]:
    pts=[];active=[];peak=0;peakim=None
    for f,a in sequence(s,e):
        clip=a[400:670,100:1530]
        if polarity=='white':
            rgb=clip.astype(float);mask=(rgb[:,:,1]-bg[f,1]>8)&(rgb[:,:,1]>150)&(rgb[:,:,2]>150)&((rgb.max(2)-rgb.min(2))<35)
            # Notes and grid lines are only a few pixels tall.
        else:
            mask=(clip[:,:,0].astype(float)-clip[:,:,1]>8)&(clip[:,:,1]>165)&(clip[:,:,1]<250)
        opened=cv2.morphologyEx(mask.astype(np.uint8),cv2.MORPH_OPEN,np.ones((9,3),np.uint8))
        ys,xs=np.where(opened>0);area=len(xs)
        if area>600:
            active.append(f)
            b=[100+int(xs.min()),400+int(ys.min()),100+int(xs.max()+1),400+int(ys.max()+1)]
            if area>peak:peak=area;peakim=a.copy()
            pts.append(dict(frame=f,t=f/60,box=b,area=area,meanRGB=np.median(clip[opened>0],axis=0).astype(int).tolist()))
    if active:
        selected=np.linspace(0,len(pts)-1,25).round().astype(int)
        samples=[pts[j]|{'areaProgress':round(pts[j]['area']/peak,6)}for j in selected]
        Image.fromarray(peakim).save(OUT/'frames'/f'{ident}-peak.png')
        events.append(dict(id=ident,type='giant-title',text=text,startFrame=min(active),endFrame=max(active)+1,t0=min(active)/60,t1=(max(active)+1)/60,font='Noto Sans JP 900; shared planes in title-planes.json',fontSize=190,position='measured ink bounds in samples',animation='shared projective planes and per-letter opacity',samples=samples,uncertainty='title planes are measured from native contour boundaries and group registration'))

# Final key ladder: local line/text groups are sampled frame by frame.
groups=[('F',(342,350,515,389),(384.5,367,513.5,373.5)),('D',(458,418,576,457),(507,434.5,574.5,441)),('B♭',(475,508,701,549),(568,524,700,530.5)),('A',(645,530,1001,574),(693.5,546.5,1000,553)),('E',(950,642,1288,686),(993.5,658.5,1287,665))]
lad=[dict(label=txt,box=b,lineBox=line,values=[])for txt,b,line in groups]
for f,a in sequence(6950,7320):
    for r in lad:
        x0,y0,x1,y1=[round(v)for v in r['lineBox']];c=a[y0:y1,x0:x1];contrast=255-c.min(2)
        # Horizontal line cores separate this ladder from the moving score.
        core=cv2.morphologyEx((contrast>45).astype(np.uint8),cv2.MORPH_OPEN,np.ones((1,25),np.uint8))
        r['values'].append([f,int(core.sum()),float(np.percentile(contrast,99))])
for r in lad:
    v=r.pop('values');peak=max(x[1]for x in v);good=[x for x in v if x[1]>max(10,peak*.03)]
    r['startFrame']=good[0][0]if good else None;r['samples']=[dict(frame=v[j][0],ink=v[j][1],peakFraction=round(v[j][1]/max(peak,1),6))for j in np.linspace(0,len(v)-1,25).round().astype(int)]
events.append(dict(id='ending-key-ladder',type='key-ladder',startFrame=min(r['startFrame']for r in lad if r['startFrame']is not None),endFrame=7320,t0=min(r['startFrame']for r in lad if r['startFrame']is not None)/60,t1=122.005,labels=['F','D','B♭','A','E'],groups=lad,intervalLabels=[dict(text='↓ m3',box=[521,391,578,423]),dict(text='↓ M3',box=[580,468,641,502]),dict(text='↓ m2',box=[702,512,766,546]),dict(text='↓ P4',box=[1002,590,1063,627])],uncertainty='first visible thresholds retain 1–2 frame uncertainty at very low opacity',terminalHold='last video frame 7319, then audio-only tail through 122.005333s'))

events.append(dict(id='cadence-key-ladder',type='key-ladder-and-analysis',startFrame=2343,endFrame=2608,t0=2343/60,t1=2608/60,labels=['F','D','B♭'],text=['结构属于前段','调性属于后段','调号仍是两个降号，排练号 C 还没到','低音 A 上叠着它的属七','两次下行三度','F → D → B♭ 合起来下行五度','落在 F 的下属调'],samples=[dict(frame=int(f),t=f/60)for f in np.linspace(2343,2607,25).round().astype(int)],uncertainty='line and text appearance/position details are in the source frames and remain only partially measured'))
write('shots.json',dict(fps=60,coordinates='1920x1080',end=122.005,events=events,rawMeasurements=dict(heads='frames/heads.npy',rowProfiles='frames/rowprofiles.npy',backgroundGrid='frames/bggrids.npy',allFrameDifferences='frames/scan.json')))
print('shots',len(events),flush=True)
