from pathlib import Path
import sys
from functools import lru_cache
import json, shutil, numpy as np, cv2
from PIL import Image, ImageDraw

ROOT=Path(sys.argv[1]).resolve()
ANA=ROOT/'analysis/case'
WORK=ROOT/'codex/case-impl'
CASE=Path(sys.argv[2]).resolve()/'demos/cases/butterfly-garden-score'
YS={'Fl.':242,'Ob.':274,'Cl.':306,'Bsn.':338,'Hn.':382,'Trp.':414,'Trb.':446,'Cym.':490,'Mar.':522,'Pf.':554,'Hp.':586,'Vln. I':630,'Vln. II':662,'Va.':694,'Vc.':726,'Cb.':758}
GROUPS=['woodwind','brass','percussion','strings']
def read(p):return json.loads(Path(p).read_text(encoding='utf8'))
def write(p,d,pretty=False):
    p=Path(p);p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2 if pretty else None,separators=None if pretty else(',',':')),encoding='utf8')
def normal(t):return not(any(a<t<b for a,b in [(0,3),(8.2,12.3),(20,21.3),(27.5,29),(39,43.5),(56.3,61.3),(76,77.7),(88,93.3),(116.7,123)]))
@lru_cache(maxsize=24)
def frame(f):return cv2.cvtColor(cv2.imread(str(ANA/'frames'/f's{f:05d}.jpg')),cv2.COLOR_BGR2RGB)
def spans(m):
    z=np.flatnonzero(np.diff(np.r_[False,m,False]));return list(zip(z[::2],z[1::2]))

for sub in ['film/data','assets','fonts','audio','source/analysis/frames','source/scripts/extraction']:(CASE/sub).mkdir(parents=True,exist_ok=True)
for p in ANA.glob('*.json'):shutil.copyfile(p,CASE/'source/analysis'/p.name)
for name in ['render-rules.md','report.md']:shutil.copyfile(ANA/name,CASE/'source/analysis'/name)
for p in (ANA/'frames').glob('*.json'):shutil.copyfile(p,CASE/'source/analysis/frames'/p.name)
for p in ANA.glob('*.py'):
    if p.name != 'verify_redraw.py':shutil.copyfile(p,CASE/'source/scripts/extraction'/p.name)
shutil.copyfile(ANA/'fonts-candidates/sources.json',CASE/'source/analysis/font-sources.json')
shutil.copyfile(ANA/'font-compare/results.json',CASE/'source/analysis/font-comparison.json')
assets=read(ANA/'assets/index.json')
for a in assets:shutil.copyfile(ANA/'assets'/f'{a["name"]}.png',CASE/'assets'/f'{a["name"]}.png')
write(CASE/'assets/index.json',assets,True)
for family,name,target in [('shipporimincho','ShipporiMincho-Bold.ttf','ShipporiMincho-Bold.ttf'),('cormorantgaramond','CormorantGaramond-Italic[wght].ttf','CormorantGaramond-Italic.ttf'),('notoserifsc','NotoSerifSC[wght].ttf','NotoSerifSC.ttf')]:
    shutil.copyfile(ANA/'fonts-candidates'/family/name,CASE/'fonts'/target)
    shutil.copyfile(ANA/'fonts-candidates'/family/'OFL.txt',CASE/'fonts'/f'OFL-{family}.txt')

original=read(ANA/'notes.json');notes=original['notes'];extra=read(ANA/'frames/panorama-extra-rectangles.json')
classification=[]
for i,n in enumerate(extra):
    keep=n['row']in ['Pf.','Va.','Vc.']
    classification.append(dict(candidate=i,decision='keep'if keep else'delete',reason='钢琴复音或弦乐横条，与逐帧播放头全景一致'if keep else'动机括号或文字碎片，位于相邻乐器的注释高度',**n))
    if keep:
        n=n.copy();n.update(id=2014+i,colorClass='percussion'if n['row']=='Pf.'else'strings',observations=0,samples=[],endpointsObserved=True)
        notes.append(n)
write(WORK/'candidate-classification.json',classification,True)

# Eight non-piano candidates are retained as source-frame evidence outside the repository.
panel=Image.new('RGB',(1000,640),'white');draw=ImageDraw.Draw(panel)
for j,(i,n)in enumerate((x for x in enumerate(extra)if x[1]['row']!='Pf.')):
    t=round((n['t0']+.1)*2)/2;f=round(t*60);im=Image.fromarray(frame(f));x=n['x0']-190*t+880;y=YS[n['row']]+n['yOffset']
    box=(round(x-35),round(y-28),round(x+min(150,n['x1']-n['x0']+35)),round(y+28))
    xx=j%2*500;yy=j//2*160;panel.paste(im.crop(box).resize((480,130)),(xx,yy+30));draw.text((xx,yy+5),f'{i} {n["row"]} {n["t0"]:.3f}',fill='black')
panel.save(WORK/'candidates.png')

def intervals(n,t):
    a=frame(round(t*60));y=YS[n['row']]+n['yOffset'];x0=n['x0']-190*t+880;x1=n['x1']-190*t+880
    lo=max(180,int(x0)-160);hi=min(1580,int(x1)+160)
    if hi-lo<10:return []
    bg=np.median(a[202:214,300:800],axis=(0,1));top=max(225,round(y)-3);bottom=min(774,round(y)+4)
    patch=a[top:bottom,lo:hi].astype(float)
    contrast=np.max(abs(patch-bg),2)
    if n['row']in ['Va.','Vc.','Vln. I','Vln. II','Cb.']:
        chroma=patch[:,:,0]-patch[:,:,1]
        if bg[1]>200:contrast[chroma<20]=0
    profile=np.percentile(contrast,70,axis=0)
    segs=spans(profile>38)
    ans=[]
    for s,e in segs:
        gx0=lo+s+190*t-880;gx1=lo+e+190*t-880
        overlap=max(0,min(gx1,n['x1'])-max(gx0,n['x0']))
        if overlap/min(gx1-gx0,n['x1']-n['x0'])>.6 and gx1-gx0>8:
            ans.append((gx0,gx1,lo+s>182,lo+e<1578,t))
    return ans

repairs=[]
for n in notes:
    if n.get('endpointsObserved',True)and n.get('observations',0):continue
    source=[]
    for t in np.arange(max(3,round((n['t0']-3)*2)/2),min(116.5,n['t1']+3.5),.5):
        if normal(t):source+=intervals(n,float(t))
    left=[v[0]for v in source if v[2]];right=[v[1]for v in source if v[3]]
    before=[n['x0'],n['x1']]
    if left and right:
        n['x0']=round(float(np.median(left))*2)/2;n['x1']=round(float(np.median(right))*2)/2
        method='相邻普通镜头的横向颜色投影';evidence=[v[4]for v in source]
    else:
        peers=[m for m in notes if m is not n and abs(m['x0']-n['x0'])<8 and m.get('endpointsObserved',False)]
        if peers:
            peer=min(peers,key=lambda m:abs(m['x1']-n['x1']));n['x0']=peer['x0'];n['x1']=peer['x1'];method='同起音、同型声部横条';evidence=[peer['id']]
        else:
            gap=6;start=round(n['x0']/2)*2;end=round((n['x1']+gap)/2)*2-gap
            n['x0']=start;n['x1']=end;method='同型音符的2px端点网格';evidence=[]
    n['t0']=n['x0']/190;n['t1']=n['x1']/190;n['endpointsObserved']=True
    if not n.get('observations')or before!=[n['x0'],n['x1']]:repairs.append(dict(id=n['id'],row=n['row'],before=before,after=[n['x0'],n['x1']],method=method,evidence=evidence))
write(WORK/'endpoint-repairs.json',repairs,True)

# The same-time color samples fit an attack, sounding plateau, and release to a past color.
samples=[]
for n in notes:
    for s in n['samples']:
        if not normal(s['t'])or 20< s['bg'][1]<230:continue
        dt=s['t']-n['t0'];de=s['t']-(n['x1']+6)/190
        samples.append((GROUPS.index(n['colorClass']),0 if s['bg'][1]>200 else 1,dt,de,s['color']))
state={}
for group in range(4):
    for background in range(2):
        ss=[s for s in samples if s[0]==group and s[1]==background]
        dt=np.array([s[2]for s in ss]);de=np.array([s[3]for s in ss]);rgb=np.array([s[4]for s in ss]);best=None
        for attack in [0,.025,.05,.075,.1]:
            for release in [.15,.25,.35,.5,.65,.8,1.,1.25]:
                for delay in [0,.025,.05,.1]:
                    on=np.clip(dt/max(attack,.00001),0,1);on=on*on*(3-2*on)
                    rel=np.clip((de-delay)/release,0,1);rel=rel*rel*(3-2*rel)
                    w=np.stack([1-on,on*(1-rel),on*rel],axis=1)
                    colors=np.linalg.lstsq(w,rgb,rcond=None)[0];error=rgb-w@colors
                    loss=np.mean(np.minimum(abs(error),25))
                    if best is None or loss<best[0]:best=(loss,attack,release,delay,np.clip(colors,0,255))
        loss,attack,release,delay,colors=best
        state[f'{group}:{background}']=dict(attack=attack,release=release,delay=delay,colors=np.round(colors,2).tolist(),error=round(float(loss),3),samples=len(ss))

runtime=[]
for n in notes:
    row=n['row'];group=GROUPS.index(n['colorClass']);pastH=[s['thickness']for s in n['samples']if s['t']>n['t1']+.5 and normal(s['t'])]
    futureH=[s['thickness']for s in n['samples']if s['t']<n['t0']-.25 and normal(s['t'])]
    h=float(np.median(pastH))if pastH else float(n['thickness'])
    if n.get('observations',0)==0:h=max(2,h-2)
    fh=float(np.median(futureH))if futureH else max(1,h-(1 if n['kind']=='bar'else 0))
    runtime.append(dict(row=row,x0=round(n['x0'],2),x1=round(n['x1'],2),yOffset=n['yOffset'],thickness=round(h,2),kind=n['kind'],group=group,futureThickness=round(fh,2)))
write(CASE/'film/data/notes.json',dict(rows=original['rows'],states=state,notes=runtime))
write(CASE/'source/analysis/candidate-classification.json',classification,True)
write(CASE/'source/analysis/endpoint-repairs.json',repairs,True)
write(CASE/'source/analysis/state-fits.json',state,True)
write(WORK/'repaired-notes.json',notes)
print(json.dumps(dict(notes=len(runtime),candidatesKept=sum(x['decision']=='keep'for x in classification),candidatesDeleted=sum(x['decision']=='delete'for x in classification),runtimeBytes=(CASE/'film/data/notes.json').stat().st_size,states=state)),flush=True)
