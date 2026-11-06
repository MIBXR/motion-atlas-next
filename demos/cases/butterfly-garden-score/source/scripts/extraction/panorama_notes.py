from pathlib import Path
import numpy as np,cv2,json
from PIL import Image
OUT=Path(__file__).parent
d=json.loads((OUT/'notes.json').read_text(encoding='utf8'));a=np.array(Image.open(OUT/'panorama/playhead-strip.png'));bg=np.median(a,axis=0);new=[]
for ri,r in enumerate(d['rows']):
    row=r['row'];y=r['y'];lo=y-225-14;hi=y-225+14;im=a[max(0,lo):hi];dist=np.max(abs(im.astype(float)-bg[None,:]),2);m=(dist>55).astype(np.uint8)
    count,labels,stats,cents=cv2.connectedComponentsWithStats(m)
    for x,yy,w,h,area in stats[1:]:
        if x<280 or x>22300 or h>13 or h<2 or w<6 or area/w/h<.65:continue
        cy=225+max(0,lo)+yy+h/2;kind='dot'if w/h<1.65 and h>=4 else'line'if h<=3.5 else'bar'
        if kind=='dot'and ri<11:continue
        if kind!='dot'and w<8:continue
        matched=False
        for n in d['notes']:
            if n['row']!=row or abs(n['yOffset']+y-cy)>3:continue
            overlap=max(0,min(n['x1'],x+w)-max(n['x0'],x))
            if overlap/min(n['x1']-n['x0'],w)>.7:matched=True;break
        if not matched:new.append(dict(row=row,x0=float(x),x1=float(x+w),t0=float(x/190),t1=float((x+w)/190),yOffset=float(cy-y),thickness=int(h),kind=kind,fill=round(float(area/w/h),4)))
(OUT/'frames/panorama-extra-rectangles.json').write_text(json.dumps(new,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(dict(newCandidates=len(new),first=[dict(row=n['row'],t=round(n['t0'],3),width=n['x1']-n['x0'])for n in new[:35]])),flush=True)
