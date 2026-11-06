from pathlib import Path
import numpy as np,cv2,json
from PIL import Image
OUT=Path(__file__).parent
im8=np.array(Image.open(OUT/'frames/f00480.png'))
im2=np.array(Image.open(OUT/'frames/f00120.png'))
items=[('giraffe-medallion',im8,8,(39,892,129,983),'dark'),('official-white',im8,8,(1652,850,1889,961),'white'),('official-intro-red',im2,2,(139,702,661,936),'color')]
names=['Ob.','Va.','Hn.','Cl.','Hn.','Fl.','Ob.','Cl.','Cl.']
boxes=[(1187,926,1209,965),(1230,926,1253,965),(1266,926,1304,965),(1314,926,1340,965),(1352,926,1390,965),(1395,930,1432,956),(1443,926,1470,965),(1486,926,1513,965),(1529,926,1556,965)]
items +=[(f'instrument-{n+1:02d}-{names[n].replace(".","").lower()}',im8,8,b,'dark')for n,b in enumerate(boxes)]
records=[]
def paths(mask):
    cs,_=cv2.findContours(mask.astype(np.uint8),cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)
    pieces=[]
    for c in cs:
        if cv2.contourArea(c)<.8:continue
        c=cv2.approxPolyDP(c,.4,True).reshape(-1,2)
        if len(c)<3:continue
        pieces.append('M'+'L'.join(f'{x},{y}'for x,y in c)+'Z')
    return ''.join(pieces)
for name,im,t,box,kind in items:
    x0,y0,x1,y1=[int(v*2)for v in box];rgb=im[y0:y1,x0:x1].copy()
    Image.fromarray(rgb).save(OUT/'assets'/f'{name}.crop.png')
    if kind=='white':
        bg=np.median(rgb[:8,:8],axis=(0,1));alpha=np.clip((rgb[:,:,1].astype(float)-bg[1])/(255-bg[1]),0,1);color=np.full_like(rgb,255)
    elif kind=='color':
        alpha=np.clip((255-rgb[:,:,1].astype(float))/100,0,1);alpha[alpha<.08]=0;color=rgb.copy()
    else:
        if name.startswith('instrument-01'):
            alpha=np.max(255-rgb.astype(float),axis=2)/255;color=np.full_like(rgb,[232,8,39])
        else:
            alpha=(255-np.min(rgb.astype(float),axis=2))/255;color=np.zeros_like(rgb)
        alpha[alpha<.035]=0
    rgba=np.dstack([color,np.rint(alpha*255).astype(np.uint8)])
    Image.fromarray(rgba).save(OUT/'assets'/f'{name}.png')
    h,w=alpha.shape
    if kind=='color':
        quant=np.rint(rgb/32).astype(np.uint8);vals,cts=np.unique(quant[alpha>.5],axis=0,return_counts=True)
        palette=vals[np.argsort(-cts)[:16]].astype(float)*32
        dd=((rgb[:,:,None,:].astype(float)-palette[None,None,:,:])**2).sum(3);labels=dd.argmin(2)
        elements=''.join(f'<path d="{paths((labels==k)&(alpha>.5))}" fill="rgb({",".join(str(int(min(255,v)))for v in col)})" fill-rule="evenodd"/>'for k,col in enumerate(palette))
    else:
        core=np.percentile(rgb.min(2)[alpha>.15],12)if np.any(alpha>.15)else 0
        shade=round(float(core));fill='#fff' if kind=='white' else '#e80827' if name.startswith('instrument-01') else f'#{shade:02x}{shade:02x}{shade:02x}'
        elements=f'<path d="{paths(alpha>.25)}" fill="{fill}" fill-rule="evenodd"/>'
    (OUT/'assets'/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{elements}</svg>',encoding='utf8')
    records.append(dict(name=name,sourceFrame=round(t*60),t=t,box1920=box,files=[f'{name}.crop.png',f'{name}.png',f'{name}.svg'],trace='OpenCV contours; epsilon 0.4 native pixels; evenodd holes; intro logo 16-color contours'))
(OUT/'assets/index.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf8')
lines=['# 素材索引','','坐标为 1920×1080；crop.png 为 4K 原帧裁切，png 为透明底，svg 为轮廓描摹。SVG viewBox 使用原始裁切像素。','', '| 文件前缀 | 来源时刻 / 帧 | 原位置 (x0,y0,x1,y1) |','| --- | --- | --- |']
for r in records:lines.append(f'| {r["name"]} | {r["t"]}s / {r["sourceFrame"]} | {r["box1920"]} |')
lines +=['','九个图标按画面从左到右为：'+' / '.join(names)+'。','片头红色标志含原始渐变色；描摹 SVG 使用 16 个色阶。']
(OUT/'assets/index.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
print('12 assets / 36 PNG+SVG files',flush=True)
