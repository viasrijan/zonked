import * as React from "react";
import { cn } from "@/lib/utils/cn";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-white/5 border border-white/10 text-white", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
