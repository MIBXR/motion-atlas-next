const MK = MotionKit;
MK.stage({ root: '#stage', orients: ['landscape', 'portrait'] });
const mark = document.querySelector('#mark');
const tl = MK.timeline({
  duration: 3,
  markers: [{ t: 1, label: '锁定' }],
  render(t) {
    const p = MK.seg(t, 0, 1, MK.ease.outCubic);
    mark.style.transform = `scale(${MK.lerp(2, 1, p)})`;
    mark.style.opacity = p;
  },
});
MK.expose(tl);
MK.controls(tl);
MK.start(tl, { reduced: 1 });
