import type { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`
        w-full
        rounded-lg
        border
        border-slate-300
        px-4
        py-2
        outline-none
        focus:ring-2
        focus:ring-black
        ${className}
      `}
      {...props}
    />
  );
}
