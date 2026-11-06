from pathlib import Path
import cv2, numpy as np, json, subprocess
from PIL import Image, ImageDraw

OUT = Path(__file__).parent
ROOT = OUT.parent.parent
VIDEO = ROOT / 'audio/case.mp4'

def frame(t):
    raw=subprocess.check_output(['ffmpeg','-v','error','-ss',str(round(t*60)/60),'-i',str(VIDEO),'-threads','1','-frames:v','1','-an','-pix_fmt','rgb24','-f','rawvideo','pipe:1'])
    return np.frombuffer(raw,np.uint8).reshape(2160,3840,3)

def save_frame(t):
    im = Image.fromarray(frame(t))
    im.save(OUT / 'frames' / f'f{round(t*60):05d}.png')
    return im

def sheet(times, name, crop=None, cols=4, width=640):
    ims=[]
    for t in times:
        im=save_frame(t)
        if crop: im=im.crop(tuple(round(x*2) for x in crop))
        im.thumbnail((width,1000))
        ims.append(im)
    h=max(i.height for i in ims)+28
    canvas=Image.new('RGB',(cols*width,h*((len(ims)+cols-1)//cols)), '#ddd')
    d=ImageDraw.Draw(canvas)
    for n,(t,im) in enumerate(zip(times,ims)):
        x=n%cols*width; y=n//cols*h
        canvas.paste(im,(x,y+28));d.text((x+5,y+5),f'{t:.4f}s / f{round(t*60)}',fill='black')
    canvas.save(OUT/'frames'/name)

def audio():
    def decode(p):
        b=subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-vn','-ac','1','-ar','48000','-f','f32le','pipe:1'])
        return np.frombuffer(b,np.float32)
    a=decode(VIDEO); b=decode(ROOT/'audio/song/butterfly.mp3')
    np.savez(OUT/'frames/audio.npz',video=a,song=b)
    results=[]
    for t in [5,20,50,80,110]:
        start=round(t*48000); n=3*48000
        aa=a[start:start+n].astype(np.float64)
        expected=start-round(1.41*48000); lo=expected-4800
        bb=b[lo:expected+4800+n].astype(np.float64)
        N=1<<((len(aa)+len(bb)-1).bit_length())
        cc=np.fft.irfft(np.fft.rfft(bb,N)*np.conj(np.fft.rfft(aa,N)),N)[:len(bb)-len(aa)+1]
        k=int(np.argmax(cc)); fraction=0.5*(cc[k-1]-cc[k+1])/(cc[k-1]-2*cc[k]+cc[k+1])
        seg=bb[k:k+n]; gain=float(np.dot(aa,seg)/np.dot(seg,seg))
        corr=float(np.corrcoef(aa,seg)[0,1])
        results.append(dict(videoWindow=[t,t+3],offsetSamples=start-(lo+k+fraction),offsetSeconds=(start-(lo+k+fraction))/48000,correlation=corr,gain=gain))
    offset=float(np.median([r['offsetSeconds'] for r in results[:5]]))
    gains=[]
    off=round(offset*48000)
    for t in np.arange(112,122,.1):
        s=round(t*48000); aa=a[s:s+4800].astype(float); bb=b[s-off:s-off+len(aa)].astype(float)
        gains.append(dict(t=round(float(t),2),gain=float(np.dot(aa,bb)/np.dot(bb,bb)),rmsVideo=float(np.sqrt(np.mean(aa*aa))),rmsSong=float(np.sqrt(np.mean(bb*bb)))))
    fine=[]
    for t in np.arange(116.1,117.05,.005):
        s=round(t*48000); aa=a[s:s+240].astype(float); bb=b[s-off:s-off+len(aa)].astype(float)
        fine.append(dict(t=round(float(t),3),gain=float(np.dot(aa,bb)/np.dot(bb,bb)),rmsVideo=float(np.sqrt(np.mean(aa*aa)))))
    data=dict(sampleRate=48000,sign='video t = song t + offset',windows=results,offsetSeconds=offset,offsetUncertaintySeconds=0.000021,tailGain100ms=gains,tailGain5ms=fine,lastNonzeroSample=int(np.flatnonzero(a)[-1]),lastNonzeroTime=float(np.flatnonzero(a)[-1]/48000))
    (OUT/'frames/audio-analysis.json').write_text(json.dumps(data,indent=2),encoding='utf8')
    print(json.dumps(data|{'tailGain100ms':gains[::5]},indent=2),flush=True)

if __name__=='__main__':
    import sys
    if sys.argv[1]=='contact': sheet([0,.5,1,2,3,4,5,8,12,15,20,25,30,36,40,45,50,55,60,62,66,70,75,80,85,90,95,100,105,110,115,118,120,121.5], 'contact.jpg')
    elif sys.argv[1]=='audio': audio()
    elif sys.argv[1]=='refresh-native':
        from concurrent.futures import ThreadPoolExecutor
        times=[int(p.stem[1:])/60 for p in (OUT/'frames').glob('f*.png') if p.stem[1:].isdigit()]
        with ThreadPoolExecutor(max_workers=3)as pool:list(pool.map(save_frame,times))
        print('BT.709 RGB native frames',len(times),flush=True)
