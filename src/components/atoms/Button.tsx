import { type ButtonHTMLAttributes, type Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full  font-body font-medium tracking-wider transition-all duration-150 outline-none",
  {
    variants: {
      variant: {
        primary: [
          "relative overflow-hidden",
          "bg-primary text-white shadow-btn",
          "transition-colors duration-300",
          // Sliding overlay
          "before:absolute before:inset-y-0 before:left-0 before:w-full",
          "before:translate-x-[-100%] before:bg-orange-hover",
          "before:transition-transform before:duration-300 before:ease-in-out",
          "hover:before:translate-x-0",
          // Keep content above the overlay
          "[&>*]:relative [&>*]:z-10",
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

        previous: [
          "bg-gray-custom/60 text-white border border-gray-custom/50",
          "hover:bg-gray-custom/90",
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
        true: " w-40",
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
