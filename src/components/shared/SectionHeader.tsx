import { ReactNode } from "react";

export const CATEGORY_COLORS: Record<string, string> = {
  film: "#E01A4F",
  tv: "#F9C22E",
  celebs: "#1aafc9",
  fashion: "#14b57a",
  lifestyle: "#ad6e47",
  dating: "#F15946",
  internet: "#8B5CF6",
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || "#E01A4F";
}

interface SectionHeaderProps {
  title: string;
  category?: string;
  color?: string;
  action?: ReactNode;
  size?: "default" | "small";
}

export function SectionHeader({
  title,
  category,
  color,
  action,
  size = "default",
}: SectionHeaderProps) {
  const barColor = color || (category ? getCategoryColor(category) : "#E01A4F");

  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
      <span
        className="inline-block h-5 sm:h-6 w-1.5 shrink-0"
        style={{ backgroundColor: barColor }}
      />
      <h2
        className={
          size === "small"
            ? "text-lg sm:text-xl font-black uppercase tracking-wide"
            : "text-2xl sm:text-3xl font-black uppercase tracking-wide"
        }
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {action && <div className="ml-auto shrink-0">{action}</div>}
    </div>
  );
}
