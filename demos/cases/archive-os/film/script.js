import { createSequence, timeline } from './app/film/sequence.js';

const MK = MotionKit, settings = ARCHIVE_FILM, score = timeline(settings.A, settings.array);
const stage = MK.stage(), params = new URLSearchParams(location.search);
const probe = document.createElement('canvas'), probeGL = probe.getContext('webgl2') || probe.getContext('webgl');
const probeDebug = probeGL?.getExtension('WEBGL_debug_renderer_info');
const renderer = probeGL ? probeGL.getParameter(probeDebug ? probeDebug.UNMASKED_RENDERER_WEBGL : probeGL.RENDERER) : '';
const softwareGL = /swiftshader|llvmpipe|software|microsoft basic render/i.test(renderer);
probeGL?.getExtension('WEBGL_lose_context')?.loseContext();
const quality = params.get('quality') ?? (softwareGL ? 'performance' : 'original');
const frame = document.createElement('iframe');
frame.title = 'RhineLabUI'; frame.allow = 'autoplay';
stage.root.appendChild(frame);
const initialPrefs = Object.fromEntries(Object.keys(localStorage).filter(k => k.startsWith('rhine-')).map(k => [k,localStorage.getItem(k)]));
let sequence, dirty = false, target = 0, running, audioBuffer;
let fastForward = false, seeking = false;
let playStarted = null, filmTime = 0, playRequest = 0;
const yieldTurn = () => new Promise(resolve => setTimeout(resolve, 0));
function restorePrefs() {
  for (const k of Object.keys(localStorage).filter(k=>k.startsWith('rhine-'))) if (!(k in initialPrefs)) localStorage.removeItem(k);
  for (const [k,value] of Object.entries(initialPrefs)) localStorage.setItem(k,value);
}
async function loadFrame() {
  restorePrefs();
  frame.width=stage.width;frame.height=stage.height;
  frame.style.width=stage.width+'px';frame.style.height=stage.height+'px';
  const loaded=new Promise(resolve=>frame.addEventListener('load',resolve,{once:true}));
  frame.src=`film/app/index.html?film=1&quality=${encodeURIComponent(quality)}`;
  await loaded;
  const win=frame.contentWindow;
  while (!win.__filmApp) await yieldTurn();
  await win.__filmApp.ready;
  sequence=createSequence(win,settings.A);
  dirty=false;
  for (const type of ['keydown','pointerdown','touchstart']) win.document.addEventListener(type,event=>{
    if (tl.playing || !event.isTrusted || dirty) return;
    dirty=true;
    sequence.cancel();
    win.__clock.setMode('realtime');
    void win.__filmAudio.setManual(true,MK.audio.enabled);
  },{capture:true});
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
}
const initial = loadFrame();
const audioReady = MK.load.audio('audio/film-audio.ogg').then(buffer=>{audioBuffer=buffer;});
MK.preload([{label:'档案应用',run:()=>initial},{label:'音轨',run:()=>audioReady}]);
async function seekFrame(k, skip = true) {
  target=k;
  fastForward ||= skip;
  if (running) return running;
  running=(async()=>{
    await initial;
    let rebuilt=false;
    for (;;) {
      if (dirty || frame.contentWindow.__clock.frame>target) { await loadFrame(); fastForward=true; rebuilt=true; }
      const win=frame.contentWindow;
      let count=0;
      while (win.__clock.frame<target && !dirty) {
        win.__filmSkipRender=win.__clock.frame+1<target;
        await sequence.step();
        if (++count%120===0 && fastForward) await yieldTurn();
      }
      win.__filmSkipRender=false;
      if (!dirty && win.__clock.frame===target) break;
    }
    return target/60;
  })().finally(()=>{running=null;fastForward=false;});
  return running;
}
// Film time accumulates wall time; API times and simulation targets share the 60Hz grid.
const elapsedTime=()=>playStarted===null?filmTime:Math.min(score.duration,filmTime+(performance.now()-playStarted)/1000*tl.rate);
const tl=MK.timeline({duration:score.duration,markers:score.markers,render:t=>{
  if (!seeking) t=elapsedTime();
  const skip=seeking||!tl.playing, k=seeking?Math.round(t*60):Math.floor(t*60+1e-6);
  seeking=false;
  if(tl.playing&&t>=score.duration)queueMicrotask(()=>tl.pause());
  return seekFrame(k,skip);
}});
Object.defineProperties(tl,{
  time:{get:()=>Math.floor(elapsedTime()*60+1e-6)/60},
  quality:{get:()=>quality},
  softwareGL:{get:()=>softwareGL},
});
const rawSeek=tl.seek;
tl.seek=t=>{
  playRequest++;
  filmTime=Math.round(Math.max(0,Math.min(score.duration,Number(t)||0))*60)/60;
  if(playStarted!==null)playStarted=performance.now();
  seeking=true;return rawSeek(filmTime);
};
const rawOn=tl.on;
tl.on=(a,b)=>typeof a==='function'?rawOn(()=>a(tl.time,tl.playing)):rawOn(a,b);
const rawSetRate=tl.setRate;
tl.setRate=r=>{filmTime=elapsedTime();if(playStarted!==null)playStarted=performance.now();return rawSetRate(r);};
const rawPause=tl.pause;
tl.pause=()=>{
  playRequest++;
  if(dirty&&!tl.playing)return;
  filmTime=tl.playing?frame.contentWindow.__clock.frame/60:tl.time;
  target=Math.round(filmTime*60);playStarted=null;
  return rawPause();
};
const rawPlay=tl.play;
const startPlay=request=>{if(request!==playRequest||tl.playing)return;playStarted=performance.now();return rawPlay();};
tl.play=()=>{
  if(tl.playing)return;
  const pending=tl.time>=score.duration?tl.seek(0):(dirty||running?tl.seek(tl.time):null);
  const request=++playRequest;
  return pending?pending.then(()=>startPlay(request)):startPlay(request);
};
stage.on('orient',()=>{dirty=true;});
MK.audio.on('change',enabled=>{if(dirty)frame.contentWindow.__filmAudio?.setEnabled(enabled);});
MK.audio.attach(tl,[{t:0,dur:score.duration,resume:true,bus:'music',voice:(ctx,out,when,p)=>{
  MK.audio.dsp.sample(ctx,out,when,audioBuffer,{offset:p.offset||0});
  return when+audioBuffer.duration-(p.offset||0);
}}]);
MK.expose(tl,{title:'莱茵生命档案终端',A:score.A,B:score.B});
window.__filmDriver={get log(){return sequence?.log;},get manual(){return dirty;},get frame(){return frame.contentWindow.__clock?.frame;},get quality(){return quality;}};
MK.start(tl);
