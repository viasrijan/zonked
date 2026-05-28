import * as React from "react";
import { cn } from "@/lib/utils/cn";

const categoryStyles: Record<string, string> = {
  film: "bg-[#E01A4F] text-white",
  tv: "bg-[#F9C22E] text-[#1E1E1E]",
  celebs: "bg-[#53B3CB] text-white",
  fashion: "bg-[#06D6A0] text-white",
  lifestyle: "bg-[#C0C0C0] text-[#1E1E1E]",
  dating: "bg-[#F15946] text-white",
  internet: "bg-[#8B5CF6] text-white",
};

const badgeVariants = {
  default: "bg-gray-900 text-white",
  secondary: "bg-gray-100 text-gray-900",
  destructive: "bg-[#E01A4F] text-white",
  outline: "border border-gray-300 text-gray-700",
} as const;

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
  colorScheme?: string;
}

function Badge({ className, variant = "default", colorScheme, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider",
        colorScheme ? categoryStyles[colorScheme] : badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
