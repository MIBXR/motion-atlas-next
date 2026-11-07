import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ButtonGroup, type ButtonGroupItem } from "@/registry/components/button-group/button-group";

export function StageToolbar({ viewport, content, items }: { viewport?: ReactNode; content?: ReactNode; items: ButtonGroupItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const fullGroupWidth = useRef(0);
  const [narrow, setNarrow] = useState(false);
  const hasViewport = Boolean(viewport);
  const hasContent = Boolean(content);
  useLayoutEffect(() => {
    const bar = ref.current!;
    const view = viewportRef.current;
    const group = bar.querySelector<HTMLElement>(".stage-actions")!;
    const measure = () => {
      if (!narrow) fullGroupWidth.current = group.getBoundingClientRect().width;
      const viewportWidth = view?.getBoundingClientRect().width ?? 0;
      const gap = parseFloat(getComputedStyle(bar).columnGap);
      const required = viewportWidth + (hasContent ? 170 : 0) + fullGroupWidth.current + gap * (Number(hasViewport) + Number(hasContent));
      setNarrow(required > bar.getBoundingClientRect().width);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    if (view) observer.observe(view);
    observer.observe(group);
    measure();
    return () => observer.disconnect();
  }, [narrow, hasViewport, hasContent]);
  return <div ref={ref} className="stage-toolbar" data-narrow={narrow ? "" : undefined}>
    {viewport ? <div ref={viewportRef} className="stage-viewport">{viewport}</div> : null}
    {content ? <div className="stage-content">{content}</div> : null}
    <ButtonGroup label="Demo 操作" size="md" collapseLabels={false} className="stage-actions" items={narrow ? items.map(item => ({ ...item, iconOnly: true })) : items} />
  </div>;
}
