import * as React from "react";
import { cn } from "@/lib/utils/cn";

const badgeVariants = {
  default: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
  secondary: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
  destructive: "bg-red-600 text-white",
  outline: "border border-zinc-200 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100",
} as const;

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
