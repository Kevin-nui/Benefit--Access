import { type SelectHTMLAttributes, type Ref } from "react";
import { cn } from "@/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
  hasError?: boolean;
  ref?: Ref<HTMLSelectElement>;
}

export function Select({
  ref,
  options,
  placeholder = "",
  hasError,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-md bg-white px-3 py-3 pr-9 outline-none",
          "font-body text-sm font-bold text-slate-800",
          "transition-all duration-150",
          "border-2  border-gray-border",
          "hover:border-navy",
          "focus:border-navy focus:ring-2 focus:ring-navy/20",
          hasError &&
            "border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60",
          className,
        )}
        {...props}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 5L7 9.5L11.5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
