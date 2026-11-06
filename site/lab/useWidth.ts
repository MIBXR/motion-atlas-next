import { useLayoutEffect, useRef, useState } from "react";
export function useWidth() {
  const ref = useRef<HTMLDivElement>(null), [width, setWidth] = useState(300);
  useLayoutEffect(() => {
    const el = ref.current!;
    const observer = new ResizeObserver(() => setWidth(Math.round(el.clientWidth)));
    observer.observe(el);
    setWidth(Math.round(el.clientWidth));
    return () => observer.disconnect();
  }, []);
  return { ref, width };
}
