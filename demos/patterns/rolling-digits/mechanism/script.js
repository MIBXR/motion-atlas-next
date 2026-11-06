const MK=MotionKit,CONFIG=window.CONFIG;
const stage=MK.stage({orients:['landscape'],background:'#e8e5e1'});
const frame=document.createElement('iframe');frame.title='滚动数字与文字';frame.width=1920;frame.height=1080;stage.root.append(frame);
let ready,buffer,dirty=false,current=-1;
const nextTurn=()=>new Promise(resolve=>setTimeout(resolve,0));
async function reset(){frame.src='mechanism/frame.html';await new Promise(resolve=>frame.addEventListener('load',resolve,{once:true}));while(!frame.contentWindow.__rollingReady)await nextTurn();current=-1;for(let i=0;i<4;i++){await new Promise(resolve=>requestAnimationFrame(resolve));frame.contentWindow.__clock.step();await Promise.resolve();}const win=frame.contentWindow;for(const [t,key]of CONFIG.events)win.setTimeout(()=>win.__navigate(key),Math.round(t*60)*1000/60+1000/60);dirty=false;}
ready=reset();const audioReady=MK.load.audio('../../cases/archive-os/audio/film-audio.ogg').then(value=>{buffer=value;});
MK.preload([{label:'滚轮与字体',run:()=>ready},{label:'档案声音',run:()=>audioReady}]);
async function render(t){await ready;const target=Math.round(t*60);if(dirty||target<current)await reset();while(current<target){frame.contentWindow.__clock.step();current++;await Promise.resolve();await Promise.resolve();}return t;}
const tl=MK.timeline({duration:CONFIG.duration,render,markers:CONFIG.events.map(([t,key])=>({t,label:key.includes('Right')||key.includes('Left')?'切换列':'切换档案'}))});
window.__rollingInput=key=>{if(document.documentElement.dataset.motionReady!=='1')return;tl.pause();frame.contentWindow.__clock.setMode('realtime');frame.contentWindow.__navigate(key);dirty=true;};
MK.audio.attach(tl,[{t:0,dur:CONFIG.duration,resume:true,bus:'music',voice:(ctx,out,when,p)=>{const source=ctx.createBufferSource();source.buffer=buffer;const gain=ctx.createGain();gain.gain.value=CONFIG.soundGain;source.connect(gain).connect(out);source.start(when,CONFIG.caseStart+(p.offset||0),CONFIG.duration-(p.offset||0));return when+CONFIG.duration-(p.offset||0);}}]);
MK.expose(tl);MK.controls(tl);MK.start(tl,{reduced:0});
