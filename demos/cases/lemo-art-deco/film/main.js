const Q = new URLSearchParams(location.search);
const cv = document.getElementById('c'), g = cv.getContext('2d');
await Promise.all(['80px Limelight', '80px Poiret', '600 40px Josefin', '400 40px Josefin', '700 40px Josefin', '80px Italiana'].map(f => document.fonts.load(f)));
let film = null;
{
  film = await import('./film.js');
  if (film.init) await film.init();
  window.EV = film.events ? film.events() : [];
  window.DUR = film.DUR;
}
window.render = async t => {
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  film.renderFilm(g, t, Q);
};
if (!window.DUR) window.DUR = 1;
window.READY = true;
