from pathlib import Path
import sys
import json,subprocess,cv2,numpy as np,shutil
from PIL import Image
ROOT=Path(sys.argv[1]).resolve();ANA=ROOT/'analysis/case';WORK=ROOT/'codex/case-impl';CASE=Path(sys.argv[2]).resolve()/'demos/cases/butterfly-garden-score'
def read(p):return json.loads(Path(p).read_text(encoding='utf8'))
def write(p,d):Path(p).write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf8')
def seq(s,e,step=1):
    p=subprocess.Popen(['ffmpeg','-v','error','-ss',str(s/60),'-i',str(ROOT/'audio/case.mp4'),'-frames:v',str(e-s),'-an','-vf','format=rgb24,scale=1920:1080:flags=area','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],stdout=subprocess.PIPE)
    for f in range(s,e):
        b=p.stdout.read(1920*1080*3)
        if len(b)!=1920*1080*3:raise ValueError(f)
        if (f-s)%step==0:yield f,np.frombuffer(b,np.uint8).reshape(1080,1920,3)
    p.stdout.close();p.wait()
def smooth(p):p=np.clip(p,0,1);return p*p*(3-2*p)
def runs(m):z=np.flatnonzero(np.diff(np.r_[False,m,False]));return list(zip(z[::2],z[1::2]))
raw=read(ANA/'shots.json');events=raw['events'];bg=np.array(read(ANA/'frames/scan.json')['backgrounds']);heads=np.load(ANA/'frames/heads.npy');prof=np.load(ANA/'frames/rowprofiles.npy');ys={'Ob.':274,'Va.':694,'Cl.':306,'Cym.':490,'Hp.':586}
shots=dict(backgrounds=[],focus=[],giants=[],intro=next(e for e in events if e['id']=='intro'),captions=[])
for e in events:
    if e['type']=='global-background-transition':shots['backgrounds'].append(dict(t0=e['t0'],t1=e['t1'],to=1 if e['toState']=='red'else 0,curve=[[s['t'],s['redOpacity']]for s in e['samples']]))
    if e['type']=='caption-transition':shots['captions'].append(dict(t0=e['t0'],t=e['switchFrame']/60,t1=e['t1'],old=e['oldCaption'],new=e['newCaption']))

def track_guide(start,end,fromy,toy):
    choices=np.arange(min(fromy,toy)-5,max(fromy,toy)+6);count=len(choices);cost=[]
    for f in range(start,end):
        v=np.max(abs(prof[f,choices-220]-bg[f]),1)
        cost.append(np.minimum(abs(v-23),28)+np.where(v<6,20,0))
    cost=np.array(cost);dp=np.full(count,1e9);dp[np.argmin(abs(choices-fromy))]=0;back=[]
    for row in cost:
        new=np.full(count,1e9);prev=np.zeros(count,int)
        for k in range(count):
            lo=max(0,k-6);hi=min(count,k+7);vals=dp[lo:hi]+.65*(np.arange(lo,hi)-k)**2
            j=lo+int(vals.argmin());new[k]=vals[j-lo]+row[k];prev[k]=j
        back.append(prev);dp=new
    k=int(np.argmin(abs(choices-toy)));path=[]
    for b in back[::-1]:path.append(int(choices[k]));k=int(b[k])
    return path[::-1]

for e in [x for x in events if x['type']=='row-focus']:
    s=e['startFrame'];end=e['endFrame'];rows=e['rows'];targets={'Ob.':448,'Va.':586,'Cl.':517,'Cym.':425,'Hp.':609};curve=[]
    if e['id']=='focus-cym-hp':
        start=3370;stop=3640;p=np.zeros(stop-start)
        enter=track_guide(start,3460,490,425);leave=track_guide(3550,stop,425,490)
        p[:len(enter)]=(490-np.array(enter))/65;p[len(enter):3550-start]=1;p[3550-start:]=(490-np.array(leave))/65;p=np.clip(p,0,1)
    else:
        start=s-8;stop=end+8;p=np.clip((heads[start:stop,0]-879.5)/290,0,1)
    for i,f in enumerate(range(start,stop)):
        q=float(p[i]);rowpos=[]
        for row in rows:
            expected=ys[row]+(targets[row]-ys[row])*q
            if e['id']=='focus-cym-hp':y=490-65*q if row=='Cym.'else 586+23*q
            else:
                lo=max(220,round(expected)-8);hi=min(784,round(expected)+9);v=np.max(abs(prof[f,lo-220:hi-220]-bg[f]),1)
                good=np.flatnonzero((v>8)&(v<65))+lo
                y=float(good[np.argmin(abs(good-expected))])+.5 if len(good)else expected
            rowpos.append(round(y,3))
        curve.append([round(f/60,6),round(q,6),round(880+290*q if e['id']!='focus-cym-hp'else 880,3),*rowpos])
    shots['focus'].append(dict(id=e['id'],t0=start/60,t1=stop/60,rows=rows,maxX=2 if e['id']=='focus-cym-hp'else 1.5,maxY=6,curve=curve))

shots['giants']=read(CASE/'source/analysis/title-planes.json')['giants']

ann=dict(motifs=[],arcs=[],leggiero=[],wedges=[],dynamics=[],ladders=[])
srcnotes=read(WORK/'repaired-notes.json');selections=read(ANA/'frames/footer-selection.json')
for i,m in enumerate(selections):
    near=[n for n in srcnotes if n['row']==m['row']and abs(n['x0']-190*m['t0'])<12]
    first=min(near,key=lambda n:abs(n['x0']-190*m['t0']))if near else None
    x=first['x0']if first else 190*m['t0'];mnotes=[n for n in srcnotes if n['row']==m['row']and x-3<=n['x0']<x+430]
    unique=[]
    for n in sorted(mnotes,key=lambda n:n['x0']):
        if not unique or n['x0']-unique[-1]['x0']>12:unique.append(n)
    digits=[1,7,5,3]if i==8 else[7,1,3,7,5]if i==6 else[]if i==7 else[7,1,3,5]
    ann['motifs'].append(dict(index=i+1,row=m['row'],x=x,t=m['t0'],end=m['t1'],notes=[dict(x0=n['x0'],x1=n['x1'],y=n['yOffset'],label=str(label))for n,label in zip(unique,digits)],label='M'+'¹²³⁴⁵⁶⁷⁸⁹'[i]))
rows={r['row']:r['y']for r in read(ANA/'notes.json')['rows']}
pano=np.array(Image.open(ANA/'panorama/source-scroll.png'));pbg=np.median(pano,axis=0)
for a,b in zip(ann['motifs'][:-1],ann['motifs'][1:]):
    xa=a['x']+100;xb=b['x'];ya=rows[a['row']]-24;yb=rows[b['row']]-20
    if xb-xa<30:continue
    c1=min(ya,yb)-100;c2=min(ya,yb)-100;points=[]
    for x in np.arange(max(0,xa+20),min(pano.shape[1]-1,xb-15),8):
        u=(x-xa)/(xb-xa);guess=(1-u)**3*ya+3*(1-u)**2*u*c1+3*(1-u)*u*u*c2+u**3*yb
        low=max(222,int(guess)-20);high=min(777,int(guess)+21)
        if high<=low:continue
        col=pano[low-220:high-220,int(x)].astype(float);contrast=np.max(abs(col-pbg[int(x)]),axis=1);valid=np.flatnonzero((contrast>40)&(contrast<190))
        if len(valid):points.append([x,float(valid[np.argmin(abs(valid+low-guess))]+low)])
    if len(points)>10:
        xy=np.array(points);u=(xy[:,0]-xa)/(xb-xa);X=np.stack([3*(1-u)**2*u,3*(1-u)*u*u],1);Y=xy[:,1]-(1-u)**3*ya-u**3*yb;co=np.linalg.lstsq(X,Y,rcond=None)[0]
        if np.all((co>150)&(co<750)):c1,c2=co.tolist()
    ann['arcs'].append(dict(x0=xa,y0=ya,c1=[xa+(xb-xa)/3,c1],c2=[xa+2*(xb-xa)/3,c2],x1=xb,y1=yb,appear=b['t']-.5))

for f in range(3660,4081,30):
    t=f/60;a=cv2.cvtColor(cv2.imread(str(ANA/'frames'/f's{f:05d}.jpg')),cv2.COLOR_BGR2RGB);clip=a[565:640,180:1580];mask=(clip[:,:,1]>128).astype(np.uint8);mask[:,698:704]=0
    num,lab,stats,cents=cv2.connectedComponentsWithStats(mask)
    for k,(x,y,w,h,area)in enumerate(stats[1:],1):
        if w<50 or h<25 or area/w/h>.45 or x<2 or x+w>1397:continue
        points=[]
        for xx in range(x,x+w,2):
            yy=np.flatnonzero(lab[:,xx]==k)
            if len(yy):points.append([round(xx+180+190*t-880,2),round(float(np.median(yy)+565),2)])
        if points and not any(abs(points[-1][0]-v['points'][-1][0])<25 for v in ann['leggiero']):ann['leggiero'].append(dict(points=points,t0=points[0][0]/190,t1=points[-1][0]/190))

wedgeobs=[]
for f in range(180,7020,30):
    t=f/60
    if 8.3<t<12.3 or 56.3<t<61.3 or 88<t<93.3:continue
    a=cv2.cvtColor(cv2.imread(str(ANA/'frames'/f's{f:05d}.jpg')),cv2.COLOR_BGR2RGB);c=a[784:812,180:1580];back=np.median(c,axis=(0,1));mask=(np.max(abs(c.astype(float)-back),2)>80).astype(np.uint8)*255
    lines=cv2.HoughLinesP(mask,1,np.pi/720,25,minLineLength=70,maxLineGap=8)
    if lines is None:continue
    ls=[v.tolist()for v in np.asarray(lines).reshape(-1,4)if abs(v[3]-v[1])<=9 and v[2]-v[0]>65]
    for i,l in enumerate(ls):
        for q in ls[i+1:]:
            if abs(l[0]-q[0])<14 and abs(l[2]-q[2])<14 and (l[3]-l[1])*(q[3]-q[1])<=0 and max(abs(l[1]-q[1]),abs(l[3]-q[3]))>3:
                x0=min(l[0],q[0])+180+190*t-880;x1=max(l[2],q[2])+180+190*t-880
                if l[0]>2 and l[2]<1397:wedgeobs.append(dict(x0=x0,x1=x1,ys=[l[1]+784,l[3]+784,q[1]+784,q[3]+784]))
for o in sorted(wedgeobs,key=lambda o:o['x1']-o['x0'],reverse=True):
    if any(abs(o['x0']-q['x0'])<60 and abs(o['x1']-q['x1'])<60 for q in ann['wedges']):continue
    if o['x1']-o['x0']<700:ann['wedges'].append(o)
ann['dynamics']=[dict(x=x,text=text)for x,text in [(350,'f'),(908,'mf giocoso'),(3828,'f'),(5275,'mp dolce'),(11390,'f dolce'),(14925,'mf'),(15394,'p'),(18560,'cresc.'),(20570,'dim.')]]

for ev in [e for e in events if e['id']in ['cadence-key-ladder','ending-key-ladder']]:
    groups=ev['groups'];curves=[[]for _ in groups]
    s=2340 if ev['id'].startswith('cadence')else 6990;end=2610 if s==2340 else 7250
    for f,a in seq(s,end,2):
        for i,g in enumerate(groups):
            x0,y0,x1,y1=g['lineBox'];left=round(x0+4);right=round(x1-4);top=round(y0+1);bottom=max(top+1,round(y1-1));c=a[top:bottom,left:right].astype(float);back=np.array([255,255,255]);fg=np.array([232,8,39]if (g['label']=='B♭'and s==2340)or g['label']=='E'else[24,24,24]);v=fg-back
            p=np.clip(np.sum((c-back)*v,axis=2)/(v@v),0,1);col=np.median(p,axis=0);strong=np.flatnonzero(col>.05);alpha=float(np.percentile(col[strong],70))if len(strong)else 0;length=float((strong.max()+1)/(right-left))if len(strong)else 0
            curves[i].append([round(f/60,6),round(alpha,5),round(length,5)])
    ann['ladders'].append(dict(id=ev['id'],t0=s/60,t1=43.5 if s==2340 else 122.005,groups=[dict(label=g['label'],line=g['lineBox'],text=g.get('textBox')or g.get('box'),barText=g.get('barText'),barTextBox=g.get('barTextBox'),curve=curve)for g,curve in zip(groups,curves)],analysisText=ev.get('analysisText',[]),intervals=ev.get('intervalLabels',[])))

ann['fixed']=[dict(kind='bracket',text='ostinato ×12',x0=907,x1=1262,y=505,labelY=500),dict(kind='circle',text='B♮ · ♯4',x=1153,y=725,r=10)]
cross=read(ANA/'frames/cross-motion.json');shots['cross']=[[x['t'],x['angle']]for x in cross if x.get('angle')is not None]
shots['intro']={k:v for k,v in shots['intro'].items()if k in ['glyphs','exitGlyphTracking','title','prologue','leftVertical','rightVertical']}
write(CASE/'film/data/shots.json',shots);write(CASE/'film/data/annotations.json',ann)
shutil.copyfile(ANA/'timeline.json',CASE/'film/data/timeline.json');shutil.copyfile(ANA/'bars.json',CASE/'film/data/bars.json')
write(CASE/'source/analysis/motion-fits.json',shots)
print(json.dumps(dict(focus=len(shots['focus']),giants=len(shots['giants']),wedges=len(ann['wedges']),leggiero=len(ann['leggiero']),arcs=len(ann['arcs']))),flush=True)
