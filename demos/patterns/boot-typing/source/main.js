import { BootSequence } from '../../../cases/archive-os/source/rhinelabui/src/boot.ts';
import { logo, brandHeading } from '../../../cases/archive-os/source/rhinelabui/src/brand.ts';
const MK=MotionKit, CONFIG=window.CONFIG;
const stage=MK.stage({orients:['landscape'],background:'#e8e5e1'});
stage.root.dataset.mode='boot';
stage.root.innerHTML=`  <div id="boot-background" class="boot-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#fff" stroke-width="3"><path d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"/><path d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"/><circle cx="1450" cy="648" r="346"/><circle cx="1450" cy="648" r="348"/></g></svg></div>
<header class="brand">${brandHeading}</header>
  <section id="boot" class="boot" aria-label="系统启动">
    <div class="access-text">ACCESS</div>
    <div class="boot-logo">${logo}</div>
    <div class="auth-status"><span>▪</span> <span id="auth-message"></span><i></i></div>
    <div class="scan"><svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-width="2" stroke-linecap="round"><path/><path stroke="#fff"/><path/><path/><path/><path/><circle class="orbit-dot" r="8" fill="#ed821b" stroke="none"/><circle class="orbit-dot" r="8" fill="#ed821b" stroke="none"/><circle class="scan-core" cx="960" cy="540" r="5" fill="#080a08" stroke="none"/></g></svg><span>PERMISSION AUTHORIZED</span></div>
    <div class="welcome"><div class="welcome-panel"></div><div class="welcome-heading">WELCOME TO</div><div class="welcome-company"><strong>RHINE LAB.LLC.</strong><strong class="welcome-highlight" aria-hidden="true">RHINE LAB.LLC.</strong></div><div class="welcome-database">INTERNAL DATABASE</div><div class="welcome-logo">${logo}</div></div>
  </section>
<div class="powered">POWERED BY <b>RHINE LAB</b><i></i></div>`;
stage.root.querySelector('#boot-background').insertAdjacentHTML('beforeend','<div class="boot-white"></div>');
const sequence=new BootSequence(stage.root);
let buffer;
const audioReady=MK.load.audio('../../../cases/archive-os/audio/film-audio.ogg').then(value=>{buffer=value;});
MK.preload([{label:'字体',run:()=>document.fonts.ready},{label:'开场声音',run:()=>audioReady}]);
const tl=MK.timeline({duration:CONFIG.duration,markers:[{t:1.8,label:'请求权限'},{t:4.16,label:'单轮廓标志'},{t:6.28,label:'确认身份'},{t:14.48,label:'扫描'},{t:17.76,label:'欢迎'}],render(t){const s=sequence.update(t*25/CONFIG.fps);stage.root.dataset.boot=s.step;}});
MK.audio.attach(tl,[{t:0,dur:CONFIG.duration,resume:true,bus:'music',voice:(ctx,out,when,p)=>{const source=ctx.createBufferSource();source.buffer=buffer;const gain=ctx.createGain();gain.gain.value=CONFIG.soundGain;source.connect(gain).connect(out);source.start(when,p.offset||0,CONFIG.duration-(p.offset||0));return when+CONFIG.duration-(p.offset||0);}}]);
MK.expose(tl);MK.controls(tl);MK.start(tl,{reduced:20.5});
