// MOTION-ATLAS: §3.1 fixed-step clock; original pages retain their native clock.
(() => {
  if (new URLSearchParams(location.search).get('film') !== '1' && !window.__filmClockRequested) return;
  const native = {
    now: performance.now.bind(performance),
    raf: requestAnimationFrame.bind(window),
    cancel: cancelAnimationFrame.bind(window),
    Date,
    animate: Element.prototype.animate,
  };
  const epoch = native.Date.parse('2026-01-01T00:00:00Z');
  const timers = new Map(), rafs = new Map(), animations = new Map();
  let frame = window.__filmClockRequested ? (window.__filmClockStartFrame || 0) : 0;
  let time = frame * 1000 / 60, serial = 0, mode = 'driven', pump = 0, realStart = 0, virtualStart = 0;
  let seed = 0x5EED;
  Math.random = () => {
    let n = seed += 0x6D2B79F5;
    n = Math.imul(n ^ n >>> 15, n | 1);
    n ^= n + Math.imul(n ^ n >>> 7, n | 61);
    return ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
  function FilmDate(...args) {
    if (!new.target) return new native.Date(epoch + time).toString();
    return Reflect.construct(native.Date, args.length ? args : [epoch + time], new.target);
  }
  FilmDate.prototype = native.Date.prototype;
  Object.setPrototypeOf(FilmDate, native.Date);
  FilmDate.now = () => epoch + time;
  window.Date = FilmDate;
  Object.defineProperty(performance, 'now', { configurable: true, value: () => time });
  window.requestAnimationFrame = callback => { const id = ++serial; rafs.set(id, callback); return id; };
  window.cancelAnimationFrame = id => rafs.delete(id);
  const timer = (callback, delay, args, interval) => {
    const id = ++serial, wait = Math.max(interval ? 1 : 0, Number(delay) || 0);
    timers.set(id, { id, due: time + wait, callback, args, interval: interval ? wait : 0 });
    return id;
  };
  window.setTimeout = (callback, delay, ...args) => timer(callback, delay, args, false);
  window.setInterval = (callback, delay, ...args) => timer(callback, delay, args, true);
  window.clearTimeout = window.clearInterval = id => timers.delete(id);
  function register(animation) {
    if (!animations.has(animation)) {
      animations.set(animation, { start: time, finished: false });
      animation.pause();
      animation.currentTime = 0;
    }
    return animation;
  }
  Element.prototype.animate = function (...args) {
    const animation = native.animate.apply(this, args);
    return mode === 'driven' ? register(animation) : animation;
  };
  function animate() {
    if (mode !== 'driven') return;
    document.getAnimations().forEach(register);
    for (const [animation, state] of animations) {
      if (animation.playState === 'idle') { animations.delete(animation); continue; }
      if (state.finished) continue;
      const elapsed = time - state.start;
      const end = animation.effect?.getComputedTiming().endTime ?? Infinity;
      animation.pause();
      animation.currentTime = Math.min(elapsed, end);
      if (elapsed >= end && Number.isFinite(end)) { state.finished = true; animation.finish(); }
    }
  }
  function advance(target) {
    time = target;
    animate();
    for (;;) {
      const task = [...timers.values()].filter(t => t.due <= time + 1e-7).sort((a, b) => a.due - b.due || a.id - b.id)[0];
      if (!task) break;
      if (task.interval) task.due += task.interval;
      else timers.delete(task.id);
      if (typeof task.callback === 'function') task.callback.apply(window, task.args);
      else (0, eval)(task.callback);
    }
    const pending = [...rafs.keys()];
    for (const id of pending) {
      const callback = rafs.get(id);
      if (!callback) continue;
      rafs.delete(id);
      callback.call(window, time);
    }
    animate();
  }
  function realtime() {
    if (mode !== 'realtime') return;
    advance(virtualStart + native.now() - realStart);
    pump = native.raf(realtime);
  }
  window.__clock = {
    get now() { return time; },
    get frame() { return frame; },
    get mode() { return mode; },
    step() { if (mode !== 'driven') throw new Error('Clock is in realtime mode'); advance(++frame * 1000 / 60); },
    setMode(next) {
      if (next === mode) return;
      native.cancel(pump);
      mode = next;
      if (mode === 'realtime') {
        animations.forEach((state, animation) => { if (!state.finished && animation.playState !== 'idle') animation.play(); });
        animations.clear();
        realStart = native.now(); virtualStart = time;
        pump = native.raf(realtime);
      } else { frame = Math.round(time * 60 / 1000); animate(); }
    },
  };
})();
