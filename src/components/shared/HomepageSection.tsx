import { ReactNode } from "react";

interface HomepageSectionProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
}

export function HomepageSection({
  children,
  className = "",
  delay = 0,
}: HomepageSectionProps) {
  const delayClass = delay > 0 ? `delay-${delay}` : "";
  return (
    <section className={`animate-in ${delayClass} mb-6 sm:mb-8 ${className}`}>
      {children}
    </section>
  );
}
