const frames = (win: Window) => new Promise<void>(resolve => win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve())));

function visible(doc: Document, selector: string) {
  return Array.from(doc.querySelectorAll<HTMLElement>(selector)).find(node => node.getClientRects().length > 0);
}
function waitFor(doc: Document, selector: string, signal: AbortSignal): Promise<HTMLElement> {
  const node = visible(doc, selector);
  if (node) return Promise.resolve(node);
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(() => { const found = visible(doc, selector); if (found) { cleanup(); resolve(found); } });
    const abort = () => { cleanup(); reject(new DOMException('定位已结束', 'AbortError')); };
    const cleanup = () => { observer.disconnect(); signal.removeEventListener('abort', abort); };
    if (signal.aborted) return abort();
    observer.observe(doc.documentElement, { childList: true, subtree: true, attributes: true });
    signal.addEventListener('abort', abort, { once: true });
  });
}
function waitMedia(node: HTMLImageElement | HTMLVideoElement, event: string, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const complete = () => { cleanup(); resolve(); };
    const failed = () => { cleanup(); reject(new Error('定位所需的媒体未能载入。')); };
    const cleanup = () => { node.removeEventListener(event, complete); node.removeEventListener('error', failed); signal.removeEventListener('abort', failed); };
    node.addEventListener(event, complete, { once: true }); node.addEventListener('error', failed, { once: true }); signal.addEventListener('abort', failed, { once: true });
  });
}

export async function locateFocus(iframe: HTMLIFrameElement, focus: any, signal: AbortSignal, show: (node: HTMLElement, label: string) => void, repeat = false) {
  const win = iframe.contentWindow!;
  const doc = iframe.contentDocument!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (focus.phase !== 'loading') {
    await doc.fonts.ready;
    await (win as any).CaseLoading?.ready;
  }
  const existing = visible(doc, focus.target);
  if (!existing || !repeat) for (const step of focus.prepare || []) {
    if (signal.aborted) return;
    if ((step.maxWidth && win.innerWidth > step.maxWidth) || (step.minWidth && win.innerWidth < step.minWidth)) continue;
    if (step.key) win.dispatchEvent(new (win as any).KeyboardEvent('keydown', { key: step.key, bubbles: true }));
    if (step.scroll) (await waitFor(doc, step.scroll, signal)).scrollIntoView({ block: 'center', inline: 'center' });
    if (step.images) {
      const scope = await waitFor(doc, step.images, signal);
      await Promise.all(Array.from(scope.querySelectorAll('img')).filter(image => image.clientWidth > 0).map(async image => { if (!image.complete) await waitMedia(image, 'load', signal); if (image.naturalWidth > 0) await image.decode(); }));
    }
    if (step.video && !reduced) { const video = await waitFor(doc, step.video, signal) as HTMLVideoElement; if (video.readyState < 2) await waitMedia(video, 'loadeddata', signal); if (video.seeking) await waitMedia(video, 'seeked', signal); }
    if (step.click) (await waitFor(doc, step.click, signal)).click();
    if (step.input) {
      const input = await waitFor(doc, step.input, signal) as HTMLInputElement;
      input.value = step.value;
      input.dispatchEvent(new (win as any).Event('input', { bubbles: true }));
      input.dispatchEvent(new (win as any).Event('change', { bubbles: true }));
    }
    if (step.waitFor) await waitFor(doc, step.waitFor, signal);
    await frames(win);
  }
  const target = (repeat && existing) || await waitFor(doc, focus.target, signal);
  await frames(win);
  if (signal.aborted) return;
  let parent = target.parentElement;
  let fixed = win.getComputedStyle(target).position === 'fixed';
  while (parent) {
    const style = win.getComputedStyle(parent);
    fixed ||= style.position === 'fixed';
    const box = target.getBoundingClientRect(), container = parent.getBoundingClientRect();
    if (/(auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight) parent.scrollTop += box.top - container.top - (parent.clientHeight - box.height) / 2;
    if (/(auto|scroll)/.test(style.overflowX) && parent.scrollWidth > parent.clientWidth) parent.scrollLeft += box.left - container.left - (parent.clientWidth - box.width) / 2;
    parent = parent.parentElement;
  }
  if (!fixed) { const box = target.getBoundingClientRect(); win.scrollBy(0, box.top - (win.innerHeight - box.height) / 2); }
  const header = doc.querySelector('header');
  if (header && /fixed|sticky/.test(win.getComputedStyle(header).position)) { const bottom = header.getBoundingClientRect().bottom; if (target.getBoundingClientRect().top < bottom + 36) win.scrollBy(0, target.getBoundingClientRect().top - bottom - 36); }
  if (focus.replay && !reduced) for (const element of doc.querySelectorAll<HTMLElement>(focus.replay)) { element.style.animationName = 'none'; await frames(win); element.style.removeProperty('animation-name'); }
  if (!signal.aborted) show(target, focus.label);
}
