import { type ButtonHTMLAttributes, type Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold uppercase tracking-wider transition-all duration-150 outline-none",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-white shadow-btn",
          "hover:bg-orange-hover",
          "active:scale-[0.97]",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100",
        ].join(" "),
        secondary: [
          "bg-secondary text-white",
          "hover:bg-navy-light",
          "active:scale-[0.97]",
          "focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        ].join(" "),
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-[52px] px-8 text-xl",
        lg: "h-14 px-10 text-xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function Button({
  ref,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const off = disabled || isLoading;

  return (
    <button
      ref={ref}
      disabled={off}
      className={cn(
        buttonVariants({ variant, size, fullWidth }),
        isLoading && "pointer-events-none",
        className,
      )}
      {...rest}
    >
      {isLoading && <Spinner />}
      <span className={cn(isLoading && "opacity-70")}>{children}</span>
    </button>
  );
}
