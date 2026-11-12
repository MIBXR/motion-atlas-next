// 宿主页面只响应用户自己的滚动：Demo iframe 里的 scrollIntoView、focus() 会连带滚动父页面，这里把它撤回。
// 用户输入（滚轮、触摸、按键、指针）或工作台自己的跳转之后的短时间内，滚动照常生效。
const WINDOW_MS = 1200;
let allowUntil = 0;

export function allowScroll(ms = WINDOW_MS) { allowUntil = Math.max(allowUntil, performance.now() + ms); }

/** 每条历史记录保存自己的滚动位置；后退、前进回到该记录时恢复，新页面从顶部开始。 */
export function restoreOrTop() {
  const y = (history.state as { atlasScroll?: number } | null)?.atlasScroll;
  allowScroll();
  window.scrollTo({ top: typeof y === "number" ? y : 0, behavior: "instant" as ScrollBehavior });
}

export function installScrollGuard() {
  history.scrollRestoration = "manual";
  let save = 0;
  const flush = () => { clearTimeout(save); history.replaceState({ ...(history.state ?? {}), atlasScroll: window.scrollY }, ""); };
  window.addEventListener("scroll", () => { clearTimeout(save); save = window.setTimeout(flush, 150); }, { passive: true });
  // 点链接或按键离开前立刻记下当前位置，避免停止滚动后 150ms 内跳转时丢失。
  window.addEventListener("pointerdown", flush, { capture: true, passive: true });
  window.addEventListener("keydown", flush, { capture: true, passive: true });
  let y = window.scrollY;
  let pressed = false;
  const capture = { capture: true, passive: true };
  const intent = () => allowScroll();
  const onInput = (event: Event) => { if (event.isTrusted) intent(); };
  const watchInput = (target: Window | Document) => {
    for (const type of ["wheel", "touchstart", "touchmove", "touchend", "keydown", "pointerdown"]) {
      target.addEventListener(type, onInput, capture);
    }
  };
  watchInput(window);
  document.addEventListener("load", ({ target }) => {
    if (target instanceof HTMLIFrameElement && target.contentDocument) watchInput(target.contentDocument);
  }, true);
  for (const type of ["popstate", "hashchange", "resize"]) {
    window.addEventListener(type, intent, capture);
  }
  window.visualViewport?.addEventListener("resize", intent, { passive: true });
  // 拖动滚动条或选择文字时指针一直按着，按住期间都算用户滚动。
  window.addEventListener("pointerdown", () => { pressed = true; }, { capture: true, passive: true });
  for (const type of ["pointerup", "pointercancel", "blur"]) window.addEventListener(type, () => { if (pressed) { pressed = false; allowScroll(); } }, { capture: true, passive: true });
  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (pressed || performance.now() < allowUntil) {
      y = current;
      // 惯性滚动仍在进行时延长放行时间。
      allowScroll();
      return;
    }
    if (!document.querySelector("iframe")?.contentDocument) {
      y = current;
      return;
    }
    const { scrollHeight, clientHeight } = document.documentElement;
    const max = Math.max(0, scrollHeight - clientHeight);
    y = Math.max(0, Math.min(y, max));
    const top = Math.max(0, Math.min(current, max));
    if (Math.abs(top - y) > 1) window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  }, { passive: true });
}
