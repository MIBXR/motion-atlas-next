import type { AnchorHTMLAttributes } from "react";
import type { ButtonSize, ButtonVariant } from "@/registry/components/button/button";
import styles from "@/registry/components/button/button.module.css";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function LinkButton({ variant = "secondary", size = "sm", className, ...props }: LinkButtonProps) {
  return <a {...props} className={[styles.button, styles[variant], styles[size], "button-link", className].filter(Boolean).join(" ")} />;
}
