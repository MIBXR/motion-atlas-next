from pathlib import Path
import numpy as np,json,subprocess
OUT=Path(__file__).parent
d=json.loads((OUT/'shots.json').read_text(encoding='utf8'));ev=next(e for e in d['events']if e['id']=='ending-key-ladder')
regions=[(400,368,440,369),(520,435,550,436),(590,525,630,526),(715,547,755,548),(1010,660,1050,661)]
samples=[[]for _ in regions]
p=subprocess.Popen(['ffmpeg','-v','error','-ss','116.5','-i',str(OUT.parent.parent/'audio/case.mp4'),'-frames:v','240','-an','-vf','crop=2040:680:600:680','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],stdout=subprocess.PIPE)
for f in range(6990,7230):
    raw=p.stdout.read(2040*680*3)
    if len(raw)!=2040*680*3:raise ValueError(f)
    a=np.frombuffer(raw,np.uint8).reshape(680,2040,3)
    for k,(x0,y0,x1,y1)in enumerate(regions):
        c=a[round(y0*2)-680:round(y1*2)-680,round(x0*2)-600:round(x1*2)-600]
        samples[k].append(dict(frame=f,t=f/60,contrast=float(np.median(255-c.min(2)))))
p.stdout.close();p.wait()
previous=6990
for g,ss in zip(ev['groups'],samples):
    arr=np.array([s['contrast']for s in ss]);lo=max(0,previous-6990+8)
    good=np.flatnonzero((arr>3)&(np.arange(len(arr))>=lo))
    if g['label']=='A':
        # Its top edge is above the residual moving piano line.
        lo=max(lo,7095-6990);good=np.flatnonzero((arr>3)&(np.arange(len(arr))>=lo))
    f=next((int(i)for i in good if i+3<len(arr)and np.all(arr[i:i+4]>3)),None)
    if f is not None:g['startFrame']=f+6990;g['t0']=g['startFrame']/60;previous=g['startFrame']
    g['timeEvidence']='4K fixed top-edge strip; first four consecutive frames above contrast3/255; raw curve retained'
    g['appearanceSamples']=ss;g['opacitySamples']=[dict(frame=ss[i]['frame'],alpha=round(float(arr[i]/max(arr.max(),1)),6))for i in np.linspace(0,len(ss)-1,25).round().astype(int)]
ev['startFrame']=min(g['startFrame']for g in ev['groups']);ev['t0']=ev['startFrame']/60
(OUT/'shots.json').write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps([(g['label'],g['startFrame'])for g in ev['groups']]),flush=True)
