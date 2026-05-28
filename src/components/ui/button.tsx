import * as React from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = {
  default: "bg-deep text-white hover:bg-deep-light",
  destructive: "bg-red-600 text-white hover:bg-red-500",
  outline: "border border-white/30 bg-white/10 hover:bg-white/20 text-white",
  secondary: "bg-white/20 text-white hover:bg-white/30",
  ghost: "hover:bg-white/10 text-white",
  link: "text-white underline-offset-4 hover:underline",
} as const;

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 text-sm",
  lg: "h-11 px-8 text-base",
  icon: "h-10 w-10",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
