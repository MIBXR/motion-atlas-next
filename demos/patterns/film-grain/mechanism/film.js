window.CONFIG.createFilm = ({MK, C, stage, plateRoot, sceneCanvas}) => {
  const filmFrames=[];
  const PC = window.CONFIG, T = C.tracks;
  const { clamp, seg, ease } = MK;
  function renderFilm(t,s,alpha) {
    const index=PC.segments.indexOf(s);
    filmFrames.forEach((frame,i)=>{
      const segmentIndex=i+1;
      frame.style.opacity=segmentIndex===index?'1':segmentIndex===index-1?String(1-alpha):'0';
      frame.style.zIndex=segmentIndex===index?'1':'2';
      frame.style.transform=`scale(${1+.04*clamp((t-(segmentIndex*2.5))/2.5)})`;
    });
  }
  function buildFilm() {
    filmFrames.forEach(frame=>frame.remove());
    filmFrames.length=0;
    const W=stage.width,H=stage.height,L=C.layout[stage.orient];
    for(const [kind,style] of [['window','photo'],['kamo','illustration']]) {
      const cv=document.createElement('canvas');cv.width=W;cv.height=H;
      const source=sceneCanvas(kind,style,W,H);
      let sx=0,sy=0,sw=source.width,sh=source.height;
      if(style==='photo') {
        const card=T.cards.find(card=>card.stop==='kix'),box=L.card;
        const zoom=1.04+0.012*seg(13.5,card.t,card.until-card.t,ease.linear);
        const scale=Math.max(box.w/source.width,box.h/source.height)*zoom;
        sw=box.w/scale;sh=box.h/scale;
        sx=(source.width-sw)/2;sy=(source.height-sh)/2;
      }
      const cover=Math.max(W/sw,H/sh);
      cv.getContext('2d').drawImage(source,sx,sy,sw,sh,(W-sw*cover)/2,(H-sh*cover)/2,sw*cover,sh*cover);
      cv.className='plate';plateRoot.appendChild(cv);filmFrames.push(cv);
    }
  }
  return { build: buildFilm, render: renderFilm };
};
