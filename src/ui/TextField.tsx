import { type InputHTMLAttributes, type Ref } from "react";
import { cn } from "@/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export function TextField({
  ref,
  hasError,
  className,
  ...props
}: TextFieldProps) {
  return (
    <input
      ref={ref}
      className={cn(
        // base
        "w-full rounded-md bg-white px-3 py-3 outline-none",
        "font-body text-sm font-bold text-slate-800 placeholder-slate-400",
        "transition-all duration-150",
        // border
        "border-2  border-gray-border",
        // hover
        "hover:border-navy hover:border-3",
        // focus
        "focus:brand-blue focus:ring-2 focus:ring-brand-blue/20",
        // error
        hasError &&
          "border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20",
        // disabled
        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
