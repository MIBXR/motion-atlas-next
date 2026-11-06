from pathlib import Path
import json,numpy as np,cv2,subprocess
from PIL import Image
OUT=Path(__file__).parent
d=json.loads((OUT/'shots.json').read_text(encoding='utf8'));intro=next(e for e in d['events']if e['id']=='intro');ref=np.array(Image.open(OUT/'frames/f00120.png').resize((1920,1080)))
targets=[(1753,73,1849,170),(1760,202,1845,277),(1753,305,1849,403),(1777,423,1837,511),(1754,532,1850,632)]
templates=[]
for r,target in zip(intro['glyphs'][:5],targets):
    x0,y0,x1,y1=r['box'];b=[x0-4,y0-4,x1+4,y1+4];a=ref[b[1]:b[3],b[0]:b[2]];edge=cv2.Canny(cv2.cvtColor(a,cv2.COLOR_RGB2GRAY),60,150)
    roi=[1080,max(30,min(y0,target[1])-35),1920,min(970,max(y1,target[3])+35)]
    scales=[(round(float(s),3),cv2.resize(edge,(round(edge.shape[1]*s),round(edge.shape[0]*s)),interpolation=cv2.INTER_AREA))for s in np.arange(.74,1.021,.02)]
    templates.append(dict(text=r['text'],sourceBox=b,roi=roi,scales=scales,samples=[]))
p=subprocess.Popen(['ffmpeg','-v','error','-ss','2','-i',str(OUT.parent.parent/'audio/case.mp4'),'-frames:v','75','-an','-vf','scale=1920:1080','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],stdout=subprocess.PIPE)
for f in range(120,195):
    raw=p.stdout.read(1920*1080*3)
    if len(raw)!=1920*1080*3:raise ValueError(f)
    a=np.frombuffer(raw,np.uint8).reshape(1080,1920,3)
    edge=cv2.Canny(cv2.cvtColor(a,cv2.COLOR_RGB2GRAY),60,150)
    for r in templates:
        x0,y0,x1,y1=r['roi'];e=edge[y0:y1,x0:x1];best=None
        for s,tmp in r['scales']:
            corr=cv2.matchTemplate(e,tmp,cv2.TM_CCOEFF_NORMED);_,score,_,loc=cv2.minMaxLoc(corr)
            if best is None or score>best[0]:best=(score,loc,s,tmp.shape)
        score,loc,s,shape=best;bx=x0+loc[0];by=y0+loc[1];rx,ry,_,_=r['sourceBox']
        r['samples'].append(dict(frame=f,t=f/60,scale=s,score=round(score,6),box=[bx,by,bx+shape[1],by+shape[0]],matrix=[[s,0,round(bx-s*rx,3)],[0,s,round(by-s*ry,3)],[0,0,1]]))
p.stdout.close();p.wait()
for r in templates:
    r.pop('scales');r.pop('roi');first=r['samples'][0];r['motionStartFrame']=next((s['frame']for s in r['samples']if max(abs(s['box'][0]-first['box'][0]),abs(s['box'][1]-first['box'][1]))>2 or abs(s['scale']-first['scale'])>.021),None)
    r['lowConfidenceFrames']=[s['frame']for s in r['samples']if s['score']<.5]
intro['exitGlyphTracking']=templates;intro['exitGlyphTrackingMethod']='each Japanese glyph tracked on every adjacent frame120–194, independently fitting scale at0.02 steps; templates include4px native-coordinate margin'
intro['exitTrackingUncertainty']='whole-column track is a candidate only; use per-glyph tracks and their score/lowConfidenceFrames'
(OUT/'shots.json').write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps([dict(text=r['text'],motionStartFrame=r['motionStartFrame'],minScore=min(s['score']for s in r['samples']),lowConfidenceFrames=r['lowConfidenceFrames'])for r in templates]),flush=True)
