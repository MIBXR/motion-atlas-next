from pathlib import Path
import cv2,numpy as np,json,subprocess
from PIL import Image
OUT=Path(__file__).parent
d=json.loads((OUT/'shots.json').read_text(encoding='utf8'));caps=json.loads((OUT/'frames/caption-transcripts.json').read_text(encoding='utf8'));ci=np.load(OUT/'frames/captions.npy',mmap_mode='r')
d['events']=[e for e in d['events']if e['type']!='caption-transition']
for j,c in enumerate(caps):
    tr=c['transition'];pts=[]
    for f in sorted(set(np.linspace(tr['startFrame'],tr['endFrame']-1,25).round().astype(int))):
        a=ci[f];bg=np.median(a,axis=(0,1));dist=np.max(abs(a.astype(float)-bg),2);yy,xx=np.where(dist>12)
        pts.append(dict(frame=int(f),t=f/60,background=bg.tolist(),inkMass=float(dist.sum()),inkBox=[155+int(xx.min()),881+int(yy.min()),155+int(xx.max()+1),881+int(yy.max()+1)]if len(xx)else None))
    d['events'].append(dict(id=f'caption-{j+1:02d}',type='caption-transition',startFrame=tr['startFrame'],endFrame=tr['endFrame'],t0=tr['t0'],t1=tr['t1'],switchFrame=c['frame'],oldCaption={k:caps[j-1][k]for k in ['eyebrow','title','body']}if j else None,newCaption={k:c[k]for k in ['eyebrow','title','body']},samples=pts,animation='outgoing caption fades and shifts upward; incoming caption fades and shifts into its baseline',uncertainty='ink samples measure the composite; independent glyph alpha curves are not separated'))
intro=next(e for e in d['events']if e['id']=='intro')
ref=np.array(Image.open(OUT/'frames/f00120.png').resize((1920,1080)))
box=[1120,135,1270,930];x0,y0,x1,y1=box;template=cv2.Canny(cv2.cvtColor(ref[y0:y1,x0:x1],cv2.COLOR_RGB2GRAY),60,150)
frames=set(np.linspace(125,193,21).round().astype(int).tolist());pts=[]
p=subprocess.Popen(['ffmpeg','-v','error','-ss',str(125/60),'-i',str(OUT.parent.parent/'audio/case.mp4'),'-frames:v','69','-an','-vf','scale=1920:1080','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],stdout=subprocess.PIPE)
for f in range(125,194):
    raw=p.stdout.read(1920*1080*3)
    if len(raw)!=1920*1080*3:raise ValueError(f)
    if f not in frames:continue
    a=np.frombuffer(raw,np.uint8).reshape(1080,1920,3);edge=cv2.Canny(cv2.cvtColor(a[40:970,1000:1920],cv2.COLOR_RGB2GRAY),60,150);best=None
    for s in np.arange(.72,1.021,.02):
        tmp=cv2.resize(template,(round(template.shape[1]*s),round(template.shape[0]*s)),interpolation=cv2.INTER_AREA)
        match=cv2.matchTemplate(edge,tmp,cv2.TM_CCOEFF_NORMED);_,score,_,loc=cv2.minMaxLoc(match)
        if best is None or score>best[0]:best=(score,loc,float(s),tmp.shape)
    score,loc,s,shape=best;bx=loc[0]+1000;by=loc[1]+40
    pts.append(dict(frame=f,t=f/60,scale=round(s,3),score=round(score,6),box=[bx,by,bx+shape[1],by+shape[0]],matrix=[[round(s,3),0,round(bx-s*x0,3)],[0,round(s,3),round(by-s*y0,3)],[0,0,1]]))
p.stdout.close();p.wait()
intro['exitTracking']=pts;intro['exitTrackingMethod']='Canny template of the full five-glyph title; 0.02 scale grid; independent of color inversion';intro['exitTrackingUncertainty']='fitted whole-title scale/position, not original animation settings'
for ev in d['events']:
    if ev['type']=='global-background-transition':ev['boundaryDefinition']='adjacent-frame median G lies strictly between10 and252; stable scaled RGB backgrounds have G9 and253'
(OUT/'shots.json').write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
# Caption semantic switch uses the measured bar/caption switch frame; its transition holds both texts.
tl=json.loads((OUT/'timeline.json').read_text(encoding='utf8'))
for r in tl:
    f=round(r['t0']*60);current=[c for c in caps if c['frame']<=f]
    if current:r['caption']={k:current[-1][k]for k in ['eyebrow','title','body']}
    active=[e['id']for e in d['events']if e['startFrame']<=f<e['endFrame']]
    if r['t0']<122:r['shot']=active or['ordinary-scroll']
(OUT/'timeline.json').write_text(json.dumps(tl,ensure_ascii=False,indent=2),encoding='utf8')
coverage=json.loads((OUT/'frames/coverage.json').read_text());coverage['shots']['events']=len(d['events']);coverage['shots']['primaryEvents']=13;coverage['shots']['captionTransitions']=20
(OUT/'frames/coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(dict(primaryShots=13,captionTransitions=20,introExitSamples=len(pts),minimumIntroMatchScore=min(x['score']for x in pts))),flush=True)
