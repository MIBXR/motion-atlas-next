from pathlib import Path
import numpy as np, cv2,json
from PIL import Image, ImageDraw, ImageFont
OUT=Path(__file__).parent
ref=np.array(Image.open(OUT/'frames/f00480.png'))
def trim(a):
    ys,xs=np.where(a>40)
    return a[ys.min():ys.max()+1,xs.min():xs.max()+1],(int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1))
cases=[
 ('scene-title','第一場',(35,75,250,150),'cjk'),
 ('sidebar-title','蝶',(1730,60,1855,170),'cjk-white'),
 ('latin-italic','Scene I — Section A',(300,73,513,101),'latin'),
 ('bar-counter','04',(1450,64,1565,168),'latin-red'),
 ('row-name','Fl.',(132,228,162,255),'latin'),
 ('caption-body','马林巴与钢琴',(155,970,310,1004),'cjk'),
 ('caption-title','F 大调 · 动机 M 登场',(153,916,533,959),'mixed'),
]
records=[]
for name,text,box,kind in cases:
    x0,y0,x1,y1=[round(x*2) for x in box]; clip=ref[y0:y1,x0:x1]
    if kind=='cjk-white':mask=np.minimum(clip[:,:,1],clip[:,:,2])
    elif kind=='latin-red':mask=np.clip(clip[:,:,0].astype(float)-clip[:,:,1],0,255).astype('uint8')
    else:mask=255-cv2.cvtColor(clip,cv2.COLOR_RGB2GRAY)
    target,bbox=trim(mask);h,w=target.shape
    Image.fromarray(clip).save(OUT/'font-compare'/f'{name}-source.png')
    scores=[];ims=[]
    for path in (OUT/'fonts-candidates').glob('*/*.ttf'):
        fam=path.parent.name
        cjk=fam in ['notoserifsc','notoserifjp','shipporimincho','notosanssc','sourcehanserifsc']
        if ('cjk' in kind or kind=='mixed')!=cjk:continue
        if not cjk and 'Italic' not in path.name:continue
        weights=[200,300,400,500,600,700,800,900] if '[wght]' in path.name or '-VF' in path.name else [400]
        if '[opsz,wght]' in path.name:weights=[400,500,600,700,800,900]
        for weight in weights:
            f=ImageFont.truetype(str(path),180)
            axes=f.get_variation_axes() if '[' in path.name or '-VF' in path.name else []
            if axes:
                values=[weight if b'Weight' in a['name'] else a['default'] for a in axes]
                if any(v<a['minimum'] or v>a['maximum'] for v,a in zip(values,axes)):continue
                f.set_variation_by_axes(values)
            best=None
            for tracking in (range(0,31,2) if cjk and len(text)>1 else range(0,9) if len(text)>3 else [0]):
                canvas=Image.new('L',(max(3000,210*len(text)),350));d=ImageDraw.Draw(canvas)
                if tracking:
                    xx=20
                    for ch in text:d.text((xx,20),ch,font=f,fill=255);xx+=f.getlength(ch)+tracking
                else:d.text((20,20),text,font=f,fill=255)
                a,bb=trim(np.array(canvas))
                scale=h/a.shape[0];native_w=a.shape[1]*scale
                scaled=cv2.resize(a,(w,h),interpolation=cv2.INTER_AREA)
                tb=target>96;sb=scaled>96
                iou=float((tb&sb).sum()/(tb|sb).sum())
                width_ratio=w/native_w
                score=iou-max(0,abs(np.log(width_ratio))-.01)*.6
                if best is None or score>best[0]:best=(score,iou,width_ratio,scale,bb,scaled,tracking)
            score,iou,width_ratio,scale,bb,scaled,tracking=best
            rec=dict(family=fam,file=str(path.relative_to(OUT)).replace('\\','/'),weight=weight,score=round(float(score),5),iou=round(iou,5),horizontalScale=round(width_ratio,5),fontSize=round(180*scale/2,3),letterSpacing=round(tracking*scale/2,3),inkBox=[(x0+bbox[0])/2,(y0+bbox[1])/2,(x0+bbox[2])/2,(y0+bbox[3])/2],baseline=round((y0+bbox[1]-bb[1]*scale+(20+f.getmetrics()[0])*scale)/2,2))
            scores.append(rec);ims.append(scaled)
    order=np.argsort([-r['score'] for r in scores])
    W=max(800,w+20);panel=Image.new('RGB',(W, (h+50)*6),(245,245,245));pd=ImageDraw.Draw(panel)
    panel.paste(Image.fromarray(255-target).convert('RGB'),(10,35));pd.text((10,8),'SOURCE: '+name,fill='black')
    for j,idx in enumerate(order[:5]):
        a=ims[idx];out=np.full((h,w,3),255,np.uint8)
        out[:,:,1]=255-target;out[:,:,2]=255-target
        out[:,:,0]=np.minimum(out[:,:,0],255-a)
        yy=(h+50)*(j+1);panel.paste(Image.fromarray(out),(10,yy+35))
        rr=scores[idx];pd.text((10,yy+8),f"{rr['family']} {rr['weight']} IoU={rr['iou']} xScale={rr['horizontalScale']}",fill='black')
    panel.save(OUT/'font-compare'/f'{name}-overlay.png')
    result=dict(category=name,text=text,referenceFrame=480,sourceBox=box,best=scores[order[0]],candidates=sorted(scores,key=lambda r:-r['score']),metric='ink masks at equal bounding box; horizontalScale is separately penalized; red=source cyan=candidate')
    records.append(result)
    print(name,result['best'],flush=True)
(OUT/'font-compare/results.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf8')
