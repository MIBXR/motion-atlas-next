// MOTION-ATLAS: §4.4 natural opening and the specified A/B input score.
export function timeline(A, array = 22) {
  const B = A + 27.6;
  return { A, B, duration: B + 15, markers: [
    { t: 0, label: '开场' }, { t: array, label: '档案阵列' },
    { t: A, label: '自动读取' }, { t: A + 7.5, label: '页签' },
    { t: A + 14, label: '360° 查看器' }, { t: A + 19.1, label: '拆解' },
    { t: A + 23.35, label: '重组' }, { t: A + 25.6, label: '返回阵列' },
    { t: B, label: '四向浏览' },
  ] };
}
export function inputs(A) {
  const B = A + 27.6;
  const clicks = [[7.5, '[data-tab="notes"]'], [10, '[data-tab="history"]'],
    [12.5, '[data-tab="overview"]'], [14, '[data-action="model-viewer"]'],
    [15.7, '[data-viewer="frosted"]'], [17.4, '[data-viewer="clear"]'],
    [19.1, '[data-viewer="explode"]'], [22.5, '[data-viewer="reset"]'],
    [23.35, '[data-viewer="assemble"]'], [25.15, '[data-viewer="close"]']];
  const actions = clicks.map(([t, selector]) => ({ t: A + t, type: 'click', selector }));
  actions.push({ t: A + 25.6, type: 'key', key: 'Escape' });
  for (const [t, key] of [[0,'ArrowDown'],[1,'ArrowDown'],[2,'ArrowRight'],[3,'ArrowRight'],[4,'ArrowRight'],
    [5,'ArrowUp'],[6,'ArrowUp'],[7,'ArrowDown'],[8,'ArrowDown'],[9,'ArrowLeft'],[9.35,'ArrowLeft'],
    [10.4,'ArrowLeft'],[11.4,'ArrowUp'],[12.4,'ArrowUp']]) actions.push({ t: B + t, type: 'key', key });
  actions.push({ t: A + 20.9, type: 'pointerdown', step: 0 });
  for (let i = 1; i <= 40; i++) actions.push({ t: A + 20.9 + i * .025, type: 'pointermove', step: i });
  actions.push({ t: A + 21.9, type: 'pointerup', step: 40 });
  return actions.sort((a,b) => a.t - b.t);
}
export function snapshot(win) {
  const doc = win.document, stats = win.__filmApp?.stats() ?? win.rhine.stats();
  return { mode: stats.mode, selected: stats.selected,
    cell: stats.selectedCell,
    column: doc.querySelector('#column-index')?.textContent,
    row: doc.querySelector('#selected-number')?.textContent,
    tab: doc.querySelector('[data-tab].active')?.getAttribute('data-tab') ?? 'overview',
    viewerOpen: stats.viewerOpen ?? !!doc.querySelector('.model-viewer:not([hidden])'),
    viewer: stats.viewer ?? null,
  };
}
export function createSequence(win, A, { quantize = true } = {}) {
  const actions = inputs(A), log = [];
  // MOTION-ATLAS: §4.3 synthetic pointer input uses the same focus modality on every replay.
  const nativeFocus = win.HTMLElement.prototype.focus;
  if (win.__clock) win.HTMLElement.prototype.focus = function(options) {
    return nativeFocus.call(this, { ...options, focusVisible: false });
  };
  let center, dragStep = null;
  function dispatch(action) {
    const doc = win.document, before = snapshot(win);
    if (action.type === 'key') {
      for (const type of ['keydown', 'keyup']) {
        const event = new win.KeyboardEvent(type, { key: action.key, code: action.key, bubbles: true, cancelable: true });
        Object.defineProperty(event, 'target', { value: doc.activeElement || doc.body });
        doc.dispatchEvent(event);
      }
    } else if (action.type === 'click') {
      const target = doc.querySelector(action.selector);
      if (!target) throw new Error(`Missing film target ${action.selector}`);
      const r = target.getBoundingClientRect(), position = { clientX: r.x + r.width/2, clientY: r.y + r.height/2, pointerId: 1, pointerType: 'mouse', isPrimary: true, bubbles: true, cancelable: true };
      target.dispatchEvent(new win.PointerEvent('pointerdown', { ...position, button: 0, buttons: 1 }));
      target.dispatchEvent(new win.PointerEvent('pointerup', { ...position, button: 0, buttons: 0 }));
      target.dispatchEvent(new win.MouseEvent('click', { ...position, button: 0 }));
    } else {
      const canvas = doc.querySelector('.viewer-canvas canvas');
      if (!canvas) throw new Error('Missing viewer canvas');
      if (action.type === 'pointerdown') { const r = canvas.getBoundingClientRect(); center = { x:r.x+r.width/2,y:r.y+r.height/2 }; }
      const capture = canvas.setPointerCapture, release = canvas.releasePointerCapture;
      canvas.setPointerCapture = canvas.releasePointerCapture = () => {};
      try { canvas.dispatchEvent(new win.PointerEvent(action.type, {
        clientX:center.x+action.step*win.innerWidth*6/1600, clientY:center.y+action.step*win.innerHeight/900,
        pointerId:1,pointerType:'mouse',isPrimary:true,button:0,buttons:action.type==='pointerup'?0:1,bubbles:true,cancelable:true,
      })); } finally { canvas.setPointerCapture = capture; canvas.releasePointerCapture = release; }
      dragStep = action.type === 'pointerup' ? null : action.step;
    }
    log.push({ ...action, frame: win.__clock?.frame, before, after: snapshot(win) });
  }
  const timers = actions.map(action => win.setTimeout(() => dispatch(action), quantize ? Math.round(action.t*60)*1000/60 : action.t*1000));
  return { actions, log, snapshot: () => snapshot(win),
    cancel() {
      timers.forEach(id => win.clearTimeout(id));
      if (dragStep !== null) dispatch({ type: 'pointerup', step: dragStep });
      if (win.__clock) win.HTMLElement.prototype.focus = nativeFocus;
    },
    async step() { win.__clock.step(); await Promise.resolve(); await Promise.resolve(); },
  };
}
