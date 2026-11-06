export const duration = 4, width = 1920, height = 1080, fps = 30;
const mark = document.createElement('div');
mark.className = 'mark';
mark.textContent = 'MOTION';
document.querySelector('#stage').appendChild(mark);
export function renderAt(t) {
  const p = MotionKit.seg(t, 0, 2, MotionKit.ease.outCubic);
  mark.style.transform = `translateY(${(1 - p) * 160}px)`;
  mark.style.opacity = p;
}
