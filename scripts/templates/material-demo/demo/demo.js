const demo = new URLSearchParams(location.search).get('demo') || 'pulse';
const frames = {
  pulse: [{ opacity: 0.4 }, { opacity: 1 }, { opacity: 0.4 }],
  slide: [{ transform: 'translateX(-80px)' }, { transform: 'translateX(80px)' }, { transform: 'translateX(-80px)' }],
};
const animation = document.querySelector('#sample').animate(frames[demo], {
  duration: 2000,
  iterations: matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : Infinity,
});
animation.pause();
const tl = MotionKit.timeline({
  duration: 2,
  loop: !matchMedia('(prefers-reduced-motion: reduce)').matches,
  render(t) { animation.currentTime = t * 1000; },
});
MotionKit.expose(tl, { title: document.title });
MotionKit.controls(tl, { orient: false });
MotionKit.start(tl, { reduced: 2 });
