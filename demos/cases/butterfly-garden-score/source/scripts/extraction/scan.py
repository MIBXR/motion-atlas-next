from pathlib import Path
import json, subprocess, cv2, numpy as np
from PIL import Image, ImageDraw

OUT=Path(__file__).parent
V=OUT.parent.parent/'audio/case.mp4'
rois={'counter':(1370,75,1565,173),'caption':(155,880,1180,1005),'scene':(35,75,660,146),'meter':(1370,76,1440,122),'footer':(1160,923,1557,1002),'progress':(40,169,1560,187),'bg':(200,190,1600,815)}
cmd=['ffmpeg','-v','error','-threads','4','-i',str(V),'-an','-vf','scale=1920:1080','-pix_fmt','rgb24','-f','rawvideo','pipe:1']
p=subprocess.Popen(cmd,stdout=subprocess.PIPE)
N=7320
metrics={k:[] for k in rois}
bg=[]; flows=[]; obs=[]; counter_imgs=[]; caps=[]; tops=[]; meters=[]; footer=[]; strips=[]; backgrounds=[]
prevs={}; prev_g=None
for i in range(N):
    buf=p.stdout.read(1920*1080*3)
    if len(buf)!=1920*1080*3: raise ValueError((i,len(buf)))
    im=np.frombuffer(buf,np.uint8).reshape(1080,1920,3)
    for name,(x0,y0,x1,y1) in rois.items():
        small=cv2.resize(im[y0:y1,x0:x1],(0,0),fx=.5,fy=.5)
        if name in prevs:
            d=cv2.absdiff(small,prevs[name]);metrics[name].append([float(d.mean()),int((d.max(2)>18).sum())])
        else: metrics[name].append([0,0])
        prevs[name]=small
    bg.append(np.median(im[190:815:12,200:1600:12],axis=(0,1)).tolist())
    g=cv2.cvtColor(im[225:765,220:1550],cv2.COLOR_RGB2GRAY).astype(np.float32)
    if prev_g is None: flows.append([0,0,0])
    else:
        (dx,dy),response=cv2.phaseCorrelate(prev_g,g)
        flows.append([dx,dy,response])
    prev_g=g
    counter_imgs.append(im[78:169,1450:1560].copy())
    meters.append(cv2.resize(im[75:122,1370:1440],(70,47)))
    tops.append(cv2.resize(im[77:146,290:760],(470,69)))
    caps.append(cv2.resize(im[881:1005,155:1170],(1015,124)))
    footer.append(cv2.resize(im[924:1003,1170:1555],(385,79)))
    strips.append(im[225:765,868:893].copy())
    backgrounds.append(im[[205,243,275,307,339,383,415,447,491,523,555,587,631,663,695,727,759,797]][:, [50,170,180,600,850,900,1200,1500]].copy())
    if i%30==0:
        cv2.imwrite(str(OUT/'frames'/f's{i:05d}.jpg'),cv2.cvtColor(im,cv2.COLOR_RGB2BGR),[cv2.IMWRITE_JPEG_QUALITY,95])
    if i%300==0: print('scan',i,flush=True)
p.stdout.close();p.wait()
for name,arr in [('counters',counter_imgs),('captions',caps),('headers',tops),('meters',meters),('footers',footer),('strips',strips),('backgrounds',backgrounds)]:
    np.save(OUT/'frames'/f'{name}.npy',np.array(arr))
(OUT/'frames/scan.json').write_text(json.dumps(dict(fps=60,frames=N,rois=rois,frameDifferences=metrics,backgrounds=bg,phaseCorrelation=flows),separators=(',',':')),encoding='utf8')
print('done',flush=True)
