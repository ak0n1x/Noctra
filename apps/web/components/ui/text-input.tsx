import type { InputHTMLAttributes, ReactNode } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
  trailing?: ReactNode;
};

export function TextInput({ id, label, icon, trailing, ...props }: TextInputProps) {
  const inputId = id ?? label.toLowerCase().replaceAll(" ", "-");

  return (
    <div className="field">
      <label className="field-label" htmlFor={inputId}>
        {label}
      </label>
      <span className="input-wrap">
        {icon && <span className="input-icon">{icon}</span>}
        <input id={inputId} className="text-input" {...props} />
        {trailing}
      </span>
    </div>
  );
}
