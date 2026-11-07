import type { ComponentProps } from "react";
import type { ButtonSize, ButtonVariant } from "@/registry/components/button/button";
import styles from "@/registry/components/button/button.module.css";

interface LinkButtonProps extends ComponentProps<"a"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function LinkButton({ href, variant = "secondary", size = "sm", className, ...props }: LinkButtonProps) {
  return <a {...props} href={href} className={[styles.button, styles[variant], styles[size], "arc-button link-button", className].filter(Boolean).join(" ")} />;
}
