from pathlib import Path
import json, numpy as np, cv2
from PIL import Image,ImageDraw
OUT=Path(__file__).parent
def runs(a):
    a=np.array(a,bool); edges=np.flatnonzero(np.diff(np.r_[False,a,False]));return list(zip(edges[::2].tolist(),edges[1::2].tolist()))
def main():
    data=json.loads((OUT/'frames/scan.json').read_text())
    for key,ds in data['frameDifferences'].items():
        a=np.array(ds)
        print(key, 'pcts',np.percentile(a[:,0],[25,50,75,90,95,99]).round(3).tolist())
        if key!='bg':print('  runs',[(s,e,round(s/60,4),round(e/60,4),round(float(a[s:e,0].max()),1)) for s,e in runs(a[:,0]>.6) if e-s>2])
    c=np.load(OUT/'frames/counters.npy',mmap_mode='r')
    for k in range(4):
        fs=list(range(k*1800,min((k+1)*1800,7320),30));out=Image.new('RGB',(12*130,((len(fs)+11)//12)*130),'#ddd');d=ImageDraw.Draw(out)
        for j,f in enumerate(fs):
            x=j%12*130;y=j//12*130;out.paste(Image.fromarray(c[f]),(x,y+25));d.text((x,y+3),f'{f/60:g}s f{f}',fill='black')
        out.save(OUT/'frames'/f'counter-sheet-{k}.png')
    flow=np.array(data['phaseCorrelation']);print('flow by seconds',[[t]+np.median(flow[t*60+1:(t+1)*60],axis=0).round(5).tolist() for t in range(121)])
if __name__=='__main__':main()
