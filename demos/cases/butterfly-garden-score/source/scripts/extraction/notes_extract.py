from pathlib import Path
import json,cv2,numpy as np
from PIL import Image,ImageDraw
OUT=Path(__file__).parent
ROWS=['Fl.','Ob.','Cl.','Bsn.','Hn.','Trp.','Trb.','Cym.','Mar.','Pf.','Hp.','Vln. I','Vln. II','Va.','Vc.','Cb.']
YS=[242,274,306,338,382,414,446,490,522,554,586,630,662,694,726,758]
SPEED=190
def head(a):
    bg=a[205,500].astype(np.int16);d=np.max(np.abs(a[198:810,700:1300].astype(np.int16)-bg),2)
    c=(d>75).sum(0); k=int(c.argmax())+700
    return k if c.max()>360 else 880
def detect(a,t):
    native=a.shape[1]/1920
    bg=np.median(a[int(204*native):int(210*native),int(400*native):int(700*native)],axis=(0,1)).astype(float)
    gp=a[[round(y*native)+o for y in YS for o in range(-round(native),round(native)+1)],round(180*native):round(1580*native)].reshape(-1,3)
    gd=np.max(np.abs(gp.astype(float)-bg),1);gp=gp[(gd>8)&(gd<55)]
    vals,counts=np.unique(gp//4*4,axis=0,return_counts=True)
    grid=vals[counts.argmax()].astype(float) if len(vals)else bg
    results=[]
    for ri,(row,y) in enumerate(zip(ROWS,YS)):
        top=round((y-14)*native);left=round(180*native);right=round(1580*native)
        im=a[top:round((y+14)*native),left:right]
        dist=np.max(np.abs(im.astype(float)-bg),2)
        mask=(dist>32).astype(np.uint8)
        samegrid=np.max(np.abs(im.astype(float)-grid),axis=2)<12
        lo=round(13*native);hi=round(15*native)+1
        mask[lo:hi][samegrid[lo:hi]]=0
        for yy in range(max(0,round(14*native)-3),min(mask.shape[0],round(14*native)+4)):
            gc=np.median(im[yy],axis=0)
            same=np.max(np.abs(im[yy].astype(float)-gc),axis=1)<10
            if same.mean()>.65 and 8<max(abs(gc-bg))<75:mask[yy,same]=0
        hs=round((880-180)*native);mask[:,hs-round(2*native):hs+round(2*native)+1]=0
        n,lab,stats,cents=cv2.connectedComponentsWithStats(mask)
        parts=[]
        for st in stats[1:]:
            x,yy,w,h,area=st
            if h/native>12.5 or w/native<3 or area/(w*h)<.55:continue
            if h/native<1.4:continue
            if w/native<7 and h/native<4:continue
            if w/native/h>1.8 and w/native<8:continue
            gy=top+yy+h/2
            if abs(gy/native-y)>13:continue
            parts.append([float(left+x),float(top+yy),float(w),float(h),float(area)])
        parts.sort()
        merged=[]
        for p in parts:
            if merged:
                q=merged[-1]
                if 0<=p[0]-(q[0]+q[2])<6*native and abs((q[1]+q[3]/2)-(p[1]+p[3]/2))<2*native and q[0]+q[2]<883*native and p[0]>877*native:
                    q[2]=p[0]+p[2]-q[0];q[1]=min(p[1],q[1]);q[3]=max(p[3],q[3]);q[4]+=p[4];continue
            merged.append(p)
        for x,yy,w,h,area in merged:
            xn=x/native;wn=w/native;hn=h/native;cy=(yy+h/2)/native
            kind='dot' if wn/hn<1.65 and hn>=4 else 'line' if hn<=3.5 else 'bar'
            if kind=='dot' and wn>13:continue
            if kind=='dot' and ri<11:continue
            if kind!='dot' and wn<7:continue
            midx=int(x+w/2);midy=int(yy+h/2)
            patch=a[max(0,midy-1):midy+2,max(0,midx-2):midx+3]
            color=np.median(patch,axis=(0,1)).tolist()
            clipped=xn<182 or xn+wn>1578
            results.append(dict(row=ri,x0=xn+190*t-880,x1=xn+wn+190*t-880,y=cy,thickness=hn,kind=kind,t=t,screenX=xn,color=color,bg=bg.tolist(),clipped=clipped,leftClipped=xn<182,rightClipped=xn+wn>1578,nativeScale=native))
    return results

if __name__=='__main__':
    observations=[];used=[];pano=np.full((568,23400,3),255,np.uint8);best=np.full(23400,np.inf)
    for f in range(180,7021,30):
        p=OUT/'frames'/f's{f:05d}.jpg';a=cv2.cvtColor(cv2.imread(str(p)),cv2.COLOR_BGR2RGB)
        if 8.2<f/60<12.3 or 56.3<f/60<61.3 or 88<f/60<93.3:continue
        h=head(a)
        if abs(h-880)>5:continue
        # Camera focus also removes most horizontal row guides.
        guide=np.median(a[228:770,220:700:3],axis=1)
        bg=a[205,500].astype(float)
        lines=(np.max(np.abs(guide-bg),1)>10)
        if np.count_nonzero(lines)<8:continue
        used.append(f);t=f/60
        native_path=OUT/'frames'/f'f{f:05d}.png'
        native=np.array(Image.open(native_path))if native_path.exists()else a
        observations.extend(detect(native,t))
        gx=np.arange(180,1580)+round(190*t-880);valid=(gx>=0)&(gx<23400)
        xs=np.arange(180,1580)[valid];gx=gx[valid];cost=np.abs(xs-880).astype(float);cost[cost<4]=9999
        ok=cost<best[gx];pano[:,gx[ok]]=a[220:788,xs[ok]];best[gx[ok]]=cost[ok]
    (OUT/'frames/note-observations.json').write_text(json.dumps(observations,separators=(',',':')),encoding='utf8')
    tracks=[];index={};rowtracks={r:[]for r in range(16)};bounds=[]
    for o in observations:
        key=(o['row'],round(o['x0']/6));matches=[]
        for kk in range(key[1]-2,key[1]+3):
            for j in index.get((key[0],kk),[]):
                tr=tracks[j];p=tr[0]
                if abs(p['x0']-o['x0'])<5 and abs(p['x1']-o['x1'])<5 and abs(p['y']-o['y'])<2.5:matches.append(j)
        if not matches:
            for j in rowtracks[o['row']]:
                tr=tracks[j];p=tr[0];b0,b1=bounds[j]
                if not(o['clipped'] or any(x['clipped']for x in tr)):continue
                if abs(p['y']-o['y'])>2.5:continue
                overlap=max(0,min(b1,o['x1'])-max(b0,o['x0']))
                if overlap/min(b1-b0,o['x1']-o['x0'])>.82:
                    if not o['leftClipped'] and not p['leftClipped'] and abs(p['x0']-o['x0'])>5:continue
                    if not o['rightClipped'] and not p['rightClipped'] and abs(p['x1']-o['x1'])>5:continue
                    matches.append(j);break
        if matches:
            j=matches[0];tracks[j].append(o);bounds[j]=[min(bounds[j][0],o['x0']),max(bounds[j][1],o['x1'])]
        else:
            j=len(tracks);tracks.append([o]);index.setdefault(key,[]).append(j);rowtracks[o['row']].append(j);bounds.append([o['x0'],o['x1']])
    notes=[]
    for tr in tracks:
        if len(tr)<2:continue
        tr.sort(key=lambda x:abs(x['screenX']+(x['x1']-x['x0'])/2-880))
        first=tr[0]
        precise=[x for x in tr if x['nativeScale']>1]
        xstarts=[x['x0']for x in tr if not x['leftClipped']];xends=[x['x1']for x in tr if not x['rightClipped']]
        vals=[float(np.median(xstarts))if xstarts else min(x['x0']for x in tr),float(np.median(xends))if xends else max(x['x1']for x in tr),float(np.median([x['y']for x in (precise if precise else tr)]))]
        x0,x1,y=[round(float(v)*2)/2 for v in vals]
        # Thin and thick observations at the playhead share the same rectangle.
        thin=[x['thickness']for x in tr if abs(x['screenX']-880)>90]
        thick=round(float(np.median(thin if thin else [x['thickness']for x in tr]))*2)/2
        kind='dot' if first['kind']=='dot' else 'line' if thick<=3.5 else 'bar'
        samples=[]
        for x in tr:
            dist=x['screenX']+(x['x1']-x['x0'])/2-880
            if abs(dist)<600:
                samples.append(dict(t=x['t'],distance=round(dist,2),color=x['color'],bg=x['bg'],thickness=x['thickness']))
        notes.append(dict(row=ROWS[first['row']],bar=None,beatStart=None,x0=x0,x1=x1,t0=round(x0/190,8),t1=round(x1/190,8),yOffset=round((y-YS[first['row']])*2)/2,thickness=thick,color='strings' if first['row']>=11 else 'brass' if 4<=first['row']<=6 else 'percussion' if 7<=first['row']<=10 else 'woodwind',kind=kind,observations=len(tr),samples=samples,endpointsObserved=bool(xstarts and xends)))
    rejected=[];keep=[]
    for n in notes:
        smaller=[m for m in notes if m is not n and m['row']==n['row'] and abs(m['x0']-n['x0'])<5 and abs(m['x1']-n['x1'])<5 and m['thickness']<n['thickness']*.65 and abs(m['yOffset']-n['yOffset'])<n['thickness']/2]
        if n['thickness']>6 and len(smaller)>=2:rejected.append(n)
        else:keep.append(n)
    notes=keep
    notes.sort(key=lambda n:(n['t0'],ROWS.index(n['row']),n['yOffset']))
    for j,n in enumerate(notes):n['id']=j+1
    Image.fromarray(pano).save(OUT/'panorama/source-scroll.png')
    for row,y in zip(ROWS,YS):
        lo=y-220-15;hi=y-220+15
        Image.fromarray(pano[max(0,lo):hi]).save(OUT/'panorama'/f'{ROWS.index(row)+1:02d}-{row.replace(".","").replace(" ","-")}.png')
    result=dict(coordinates='1920x1080, x global = screen x - 880 + 190 * video t',scrollSpeed=190,rows=[dict(row=r,y=y)for r,y in zip(ROWS,YS)],notes=notes,extraction=dict(sourceFrames=used,sourceFrameCount=len(used),observations=len(observations),tracks=len(tracks),accepted=len(notes),rejectedMergedParallelBars=len(rejected),minimumObservations=2,detector='connected rectangles from full score views; native-color median background; alpha-contrast threshold 32; playhead column removed; endpoints median to 0.5px',unknown='Pitch names are not encoded in the video; yOffset is the observed displacement.'))
    (OUT/'notes.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
    print(json.dumps(result['extraction']|{'sourceFrames':'omitted'},ensure_ascii=False),flush=True)
