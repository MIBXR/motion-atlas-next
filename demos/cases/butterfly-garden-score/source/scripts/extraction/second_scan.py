from pathlib import Path
import numpy as np, cv2,json,subprocess
from PIL import Image
OUT=Path(__file__).parent
N=7320
ref=np.array(Image.open(OUT/'frames/f00120.png').resize((1920,1080)))
intro=[]
def spans(mask):
    z=np.flatnonzero(np.diff(np.r_[False,mask,False]));return list(zip(z[::2].tolist(),z[1::2].tolist()))
for txt,box,axis in [('蝶の舞う庭',(1120,135,1270,920),0),('Prologue — bars 1–2',(135,130,410,175),1)]:
    x0,y0,x1,y1=box;a=ref[y0:y1,x0:x1];m=(255-a.min(2))>60
    runs=spans(m.sum(1-axis)>1)
    if axis==0:
        runs=[(s,e)for s,e in runs if e-s>20]
        for ch,(s,e) in zip(txt,runs):
            mask=m[s:e];ys,xs=np.where(mask);intro.append(dict(text=ch,box=[x0+int(xs.min()),y0+s,x0+int(xs.max()+1),y0+e],mask=mask[:,xs.min():xs.max()+1],samples=[]))
    else:
        for s,e in runs:
            if e-s<2:continue
            mask=m[:,s:e];ys,xs=np.where(mask)
            intro.append(dict(text=None,box=[x0+s,y0+int(ys.min()),x0+e,y0+int(ys.max()+1)],mask=mask[ys.min():ys.max()+1],samples=[]))
p=subprocess.Popen(['ffmpeg','-v','error','-threads','4','-i',str(OUT.parent.parent/'audio/case.mp4'),'-an','-vf','scale=1920:1080','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],stdout=subprocess.PIPE)
measure=[];bggrids=[];rowprofiles=[];active=[];cross=[]
for i in range(N):
    raw=p.stdout.read(1920*1080*3)
    if len(raw)!=1920*1080*3:raise ValueError(i)
    a=np.frombuffer(raw,np.uint8).reshape(1080,1920,3)
    bg=a[205,500].astype(np.int16)
    d=np.max(np.abs(a[198:810,700:1300].astype(np.int16)-bg),2)
    counts=(d>75).sum(0); k=int(counts.argmax())+700
    if counts.max()<360:k=880
    near=counts>max(360,counts.max()-50)
    if near.any():k=float(np.flatnonzero(near).mean()+700)
    measure.append([k,int(counts.max())])
    bggrids.append(a[200:840:8,40:1600:20].copy())
    rowprofiles.append(np.median(a[220:785,210:700:3].astype(float),axis=1))
    active.append(a[228:778,168:173].copy())
    cross.append(a[807:840,825:936].copy())
    if i<180:
        for r in intro:
            x0,y0,x1,y1=r['box'];s=a[y0:y1,x0:x1];m=r['mask'];r['samples'].append(float(np.mean(255-s[m].min(1))))
    if i%600==0:print('measure',i,flush=True)
p.stdout.close();p.wait()
for name,arr in [('heads',measure),('bggrids',bggrids),('rowprofiles',rowprofiles),('active',active),('cross',cross)]:np.save(OUT/'frames'/f'{name}.npy',np.array(arr))
for r in intro:del r['mask']
(OUT/'frames/intro-samples.json').write_text(json.dumps(intro,ensure_ascii=False,indent=2),encoding='utf8')
print('done',flush=True)
