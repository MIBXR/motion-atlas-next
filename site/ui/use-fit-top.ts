import { useLayoutEffect, type RefObject } from "react";

/** 把元素当前在视口中的实际顶部写入 --fit-top，供 CSS 计算可用高度；未吸顶和吸顶时都成立。 */
export function useFitTop(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    let raf = 0;
    const measure = () => { raf = 0; ref.current?.style.setProperty("--fit-top", `${Math.max(0, ref.current.getBoundingClientRect().top)}px`); };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); observer.disconnect(); cancelAnimationFrame(raf); };
  }, [ref]);
}
