import { Check, CircleAlert, Copy } from "lucide-react";
import { Button } from "@/registry/components/button/button";
import { useCopyFeedback } from "@/lib/use-copy-feedback";

export function CopyButton({ value, label = "复制", onCopyError }: { value: string; label?: string; onCopyError?: () => void }) {
  const { state, copy } = useCopyFeedback();
  const Icon = state === "copied" ? Check : state === "error" ? CircleAlert : Copy;
  return <Button type="button" variant="secondary" size="sm" aria-label={label} data-copy-state={state} onClick={async () => { if (!await copy(value)) onCopyError?.(); }}>
    <Icon aria-hidden="true" />
    <span role="status">{state === "copied" ? "已复制" : state === "error" ? "复制失败" : label}</span>
  </Button>;
}
