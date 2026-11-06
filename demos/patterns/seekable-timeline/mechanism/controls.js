window.CONFIG.createControls = ({MK, C, stage, stageEl, A, timeline}) => {
    const PC=window.CONFIG;
    const accent=C.palette.accent, ICON=MK.icons;
    const bar=document.createElement('div');bar.className='mk-controls';bar.setAttribute('role','toolbar');bar.setAttribute('aria-label','播放控制');
    bar.innerHTML=`
      <button type="button" data-act="toggle" aria-label="播放"><span class="mk-i mk-i-play">${ICON.play}</span><span class="mk-i mk-i-pause">${ICON.pause}</span></button>
      <button type="button" data-act="restart" aria-label="从头播放"><span class="mk-i">${ICON.restart}</span></button>
      <input type="range" min="12" max="16.6" step="0.01" value="12" aria-label="时间">
      <output></output>
      <button type="button" data-act="orient" aria-label="切换为竖屏" hidden><span class="mk-i mk-i-land">${ICON.landscape}</span><span class="mk-i mk-i-port">${ICON.portrait}</span></button>
      <button type="button" data-act="sound" aria-label="开启声音" aria-pressed="false"><span class="mk-i mk-i-on">${ICON.soundOn}</span><span class="mk-i mk-i-off">${ICON.soundOff}</span></button>`;
    const style=document.createElement('style');
    style.textContent=`
      [data-orient="landscape"] .mk-controls{position:fixed;left:50%;bottom:19.38462px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:11.07692px;
        padding:8.30769px 13.84615px;border-radius:1383.23077px;background:rgba(14,15,18,.78);color:#f1efe9;backdrop-filter:blur(13.84615px);
        font:18px/1 "Cascadia Mono","JetBrains Mono",Consolas,monospace;box-shadow:0 11.07692px 41.53846px rgba(0,0,0,.25);opacity:.3;transition:opacity .2s;
        box-sizing:border-box;max-width:calc(100vw - 22.15385px)}
      [data-orient="landscape"] .mk-controls:hover,[data-orient="landscape"] .mk-controls:focus-within{opacity:1}
      [data-orient="landscape"] .mk-controls button{all:unset;cursor:pointer;width:44.30769px;height:44.30769px;display:grid;place-items:center;border-radius:50%;flex:none}
      [data-orient="landscape"] .mk-controls button[hidden]{display:none}
      [data-orient="landscape"] .mk-controls button:focus-visible{outline:2.76923px solid ${accent};outline-offset:1.38462px}
      [data-orient="landscape"] .mk-controls button:hover{background:rgba(255,255,255,.12)}
      [data-orient="landscape"] .mk-controls .mk-i{display:grid;place-items:center;pointer-events:none}
      [data-orient="landscape"] .mk-controls svg{width:24.92308px;height:24.92308px;pointer-events:none}
      [data-orient="landscape"] .mk-controls .mk-i-pause,[data-orient="landscape"] .mk-controls[data-playing] .mk-i-play{display:none}
      [data-orient="landscape"] .mk-controls[data-playing] .mk-i-pause{display:grid}
      [data-orient="landscape"] .mk-controls .mk-i-on,[data-orient="landscape"] .mk-controls[data-sound="on"] .mk-i-off,[data-orient="landscape"] .mk-controls[data-sound="blocked"] .mk-i-off{display:none}
      [data-orient="landscape"] .mk-controls[data-sound="on"] .mk-i-on,[data-orient="landscape"] .mk-controls[data-sound="blocked"] .mk-i-on{display:grid}
      [data-orient="landscape"] .mk-controls[data-sound="blocked"] [data-act="sound"]{opacity:.55}
      [data-orient="landscape"] .mk-controls[data-orient="landscape"] .mk-i-land,[data-orient="landscape"] .mk-controls[data-orient="portrait"] .mk-i-port{display:none}
      [data-orient="landscape"] .mk-controls input{flex:1 1 498.46154px;width:auto;min-width:66.46154px;max-width:498.46154px;accent-color:${accent}}
      [data-orient="landscape"] .mk-controls output{min-width:105.23077px;font-variant-numeric:tabular-nums}
      @media (max-width:720px){[data-orient="landscape"] .mk-controls{gap:2.76923px;padding:5.53846px 8.30769px;bottom:11.07692px}[data-orient="landscape"] .mk-controls output{display:none}[data-orient="landscape"] .mk-controls button{width:41.53846px;height:41.53846px}}

      [data-orient="portrait"] .mk-controls{position:fixed;left:50%;bottom:35.53846px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:20.30769px;
        padding:15.23077px 25.38462px;border-radius:2535.92308px;background:rgba(14,15,18,.78);color:#f1efe9;backdrop-filter:blur(25.38462px);
        font:33px/1 "Cascadia Mono","JetBrains Mono",Consolas,monospace;box-shadow:0 20.30769px 76.15385px rgba(0,0,0,.25);opacity:.3;transition:opacity .2s;
        box-sizing:border-box;max-width:calc(100vw - 40.61538px)}
      [data-orient="portrait"] .mk-controls:hover,[data-orient="portrait"] .mk-controls:focus-within{opacity:1}
      [data-orient="portrait"] .mk-controls button{all:unset;cursor:pointer;width:81.23077px;height:81.23077px;display:grid;place-items:center;border-radius:50%;flex:none}
      [data-orient="portrait"] .mk-controls button[hidden]{display:none}
      [data-orient="portrait"] .mk-controls button:focus-visible{outline:5.07692px solid ${accent};outline-offset:2.53846px}
      [data-orient="portrait"] .mk-controls button:hover{background:rgba(255,255,255,.12)}
      [data-orient="portrait"] .mk-controls .mk-i{display:grid;place-items:center;pointer-events:none}
      [data-orient="portrait"] .mk-controls svg{width:45.69231px;height:45.69231px;pointer-events:none}
      [data-orient="portrait"] .mk-controls .mk-i-pause,[data-orient="portrait"] .mk-controls[data-playing] .mk-i-play{display:none}
      [data-orient="portrait"] .mk-controls[data-playing] .mk-i-pause{display:grid}
      [data-orient="portrait"] .mk-controls .mk-i-on,[data-orient="portrait"] .mk-controls[data-sound="on"] .mk-i-off,[data-orient="portrait"] .mk-controls[data-sound="blocked"] .mk-i-off{display:none}
      [data-orient="portrait"] .mk-controls[data-sound="on"] .mk-i-on,[data-orient="portrait"] .mk-controls[data-sound="blocked"] .mk-i-on{display:grid}
      [data-orient="portrait"] .mk-controls[data-sound="blocked"] [data-act="sound"]{opacity:.55}
      [data-orient="portrait"] .mk-controls[data-orient="landscape"] .mk-i-land,[data-orient="portrait"] .mk-controls[data-orient="portrait"] .mk-i-port{display:none}
      [data-orient="portrait"] .mk-controls input{flex:1 1 913.84615px;width:auto;min-width:121.84615px;max-width:913.84615px;accent-color:${accent}}
      [data-orient="portrait"] .mk-controls output{min-width:192.92308px;font-variant-numeric:tabular-nums}
      @media (max-width:1320px){[data-orient="portrait"] .mk-controls{gap:5.07692px;padding:10.15385px 15.23077px;bottom:20.30769px}[data-orient="portrait"] .mk-controls output{display:none}[data-orient="portrait"] .mk-controls button{width:76.15385px;height:76.15385px}}`+`\n.mk-controls{position:absolute!important;left:64px!important;right:64px!important;bottom:30px!important;transform:none!important;max-width:none!important}.mk-controls input{max-width:none!important}[data-orient="portrait"] .mk-controls{left:56px!important;right:56px!important;bottom:34px!important}`;
    document.head.appendChild(style);stageEl.appendChild(bar);
    const orientButton=bar.querySelector('[data-act="orient"]');
    orientButton.hidden=false;
    const syncOrient=()=>{bar.dataset.orient=stage.orient;orientButton.setAttribute('aria-label',stage.orient==='portrait'?'切换为横屏 1920×1080':'切换为竖屏 1080×1920');};
    syncOrient();stage.on('orient',syncOrient);
    A.on('change',()=>{bar.dataset.sound=A.state;const sound=bar.querySelector('[data-act="sound"]');sound.setAttribute('aria-pressed',String(A.enabled));sound.setAttribute('aria-label',A.enabled?'关闭声音':'开启声音');});
    bar.addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b)return;
      if(b.dataset.act==='toggle')timeline().toggle();
      if(b.dataset.act==='restart'){timeline().seek(0);timeline().play();}
      if(b.dataset.act==='sound'){A.toggle();bar.dataset.sound=A.state;}
      if(b.dataset.act==='orient')stage.toggleOrient();
    });
    bar.querySelector('input').addEventListener('input',e=>{
      timeline().pause();const v=Number(e.target.value);
      const s=PC.segments.find(s=>v>=Math.min(s.from,s.to) && v<=Math.max(s.from,s.to));
      let p=(v-s.from)/(s.to-s.from);
      if(s.mode==='drag')p=p<.5 ? Math.cbrt(p/4) : 1-Math.cbrt((1-p)/4);
      timeline().seek(s.start+p*s.duration);
    });
    return bar;
};
