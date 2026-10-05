import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet" | "danger";
  size?: "normal" | "small";
};

export function Button({
  className = "",
  size = "normal",
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button className={`button button-${variant} button-${size} ${className}`.trim()} {...props} />
  );
}
