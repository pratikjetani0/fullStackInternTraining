import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-lg
        bg-black
        px-4
        py-2
        text-white
        transition
        hover:bg-slate-800
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
