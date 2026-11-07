import { useEffect } from "react";
import { ToastStack, useToastStack } from "@/registry/components/toast-stack/toast-stack";

export { useToastStack as useToast } from "@/registry/components/toast-stack/toast-stack";

export function ToastViewport() {
  const { toast } = useToastStack();
  useEffect(() => {
    const observer = new MutationObserver(records => {
      for (const button of new Set(records.map(record => record.target as HTMLElement))) {
        const state = button.dataset.copyState;
        if (state === "copied" || state === "error") toast({ type: state === "copied" ? "success" : "error", title: state === "copied" ? "复制成功" : "复制失败" });
      }
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-copy-state"] });
    return () => observer.disconnect();
  }, [toast]);
  return <ToastStack label="提示消息" position="bottom-center" />;
}
