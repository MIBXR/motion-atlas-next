from pathlib import Path
import numpy as np,cv2,json
from PIL import Image
OUT=Path(__file__).parent
strip=np.load(OUT/'frames/strips.npy',mmap_mode='r')
fallback=np.array(Image.open(OUT/'panorama/source-scroll.png'))[5:545]
canvas=fallback.copy();quality=np.full(canvas.shape[1],1000.)
for f in range(139,7020):
    t=f/60
    if 8.2<t<12.3 or 56.3<t<61.3 or 88<t<93.3:continue
    xs=np.arange(868,893);gx=np.rint(190*t+xs-880).astype(int);cost=abs(xs-880).astype(float);cost[cost<3]=9999
    good=(gx>=0)&(gx<canvas.shape[1]);xs=xs[good];gx=gx[good];cost=cost[good];better=cost<quality[gx]
    canvas[:,gx[better]]=strip[f,:,xs[better]-868].transpose(1,0,2);quality[gx[better]]=cost[better]
Image.fromarray(canvas).save(OUT/'panorama/playhead-strip.png')
focuses=[('focus-ob-va',[570,600,630,660],1.5,6,1170,[('Ob.',274,448),('Va.',694,586)]),('focus-cym-hp',[3450,3480,3510,3540],2,6,880,[('Cym.',490,425),('Hp.',586,609)]),('focus-clarinet',[5340,5370,5400,5430,5460,5490],1.5,6,1170,[('Cl.',306,517)])]
meta=[]
for ident,fs,sx,sy,hx,rows in focuses:
    lo=round(min(fs)/60*190)-500;hi=round(max(fs)/60*190)+500
    pane=np.full((len(rows)*50,hi-lo,3),255,np.uint8);weights=np.full((len(rows),hi-lo),1e9)
    for f in fs:
        a=cv2.cvtColor(cv2.imread(str(OUT/'frames'/f's{f:05d}.jpg')),cv2.COLOR_BGR2RGB)
        for ri,(row,y,ty)in enumerate(rows):
            ys=ty+np.arange(-25,25)*sy;xs=hx+(np.arange(lo,hi)-190*f/60)*sx
            mx,my=np.meshgrid(xs.astype('float32'),ys.astype('float32'))
            warped=cv2.remap(a,mx,my,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=tuple(int(v)for v in a[205,500]))
            cost=abs(xs-hx);cost[(xs<120)|(xs>1620)|(abs(xs-hx)<4)]=1e10
            good=cost<weights[ri];pane[ri*50:(ri+1)*50,good]=warped[:,good];weights[ri,good]=cost[good]
    Image.fromarray(pane).save(OUT/'panorama'/f'{ident}.png')
    meta.append(dict(file=f'{ident}.png',frames=fs,rows=rows,globalX0=lo,globalX1=hi,inverseScaleX=sx,inverseScaleY=sy,uncertainty='vertical scale is inferred; this panorama is a separate focus-shot measurement'))
(OUT/'panorama/index.json').write_text(json.dumps(dict(normalSource='source-scroll.png',allFrameStrip='playhead-strip.png',stripSourceFrames=7320,nearHeadColumns=[868,892],ignoredHeadColumns=[878,882],focuses=meta),ensure_ascii=False,indent=2),encoding='utf8')
print('playhead strip and 3 focus panoramas',flush=True)
