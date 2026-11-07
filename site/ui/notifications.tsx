import { useLayoutEffect } from "react";
import { ToastStack, useToastStack, type ToastStackApi, type ToastType } from "@/registry/components/toast-stack/toast-stack";

let showToast: ToastStackApi["toast"];

export function notify(message: string, tone: ToastType = "info") {
  showToast({ title: message, type: tone });
}

export function Notifications() {
  const { toast } = useToastStack();
  useLayoutEffect(() => { showToast = toast; }, [toast]);
  return <ToastStack label="通知" />;
}
