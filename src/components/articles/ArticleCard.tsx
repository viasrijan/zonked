"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo } from "@/lib/utils/date";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
  variant?: "default" | "compact";
  aspectRatio?: "16:9" | "1:1" | "4:3" | "3:2";
}

function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");
}

const CAT_COLORS: Record<string, string> = {
  film: "#E01A4F",
  tv: "#F9C22E",
  celebs: "#53B3CB",
  fashion: "#06D6A0",
  lifestyle: "#C0C0C0",
  dating: "#F15946",
  internet: "#8B5CF6",
};

export function ArticleCard({
  title,
  slug,
  excerpt,
  imageUrl,
  category,
  publishedAt,
  variant = "default",
  aspectRatio = "16:9",
}: ArticleCardProps) {
  const aspectClass =
    aspectRatio === "1:1" ? "aspect-square"
      : aspectRatio === "4:3" ? "aspect-[4/3]"
        : aspectRatio === "3:2" ? "aspect-[3/2]"
          : "aspect-video";

  const hoverColor = CAT_COLORS[category] || "#E01A4F";

  if (variant === "compact") {
    return (
      <Link href={`/article/${slug}`} className="group flex gap-3">
        <div className={`relative h-16 w-16 shrink-0 overflow-hidden ${aspectClass}`}>
          <ImageWithFallback src={imageUrl} alt={title} className="h-full w-full" />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className="line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors duration-200"
            style={{ ["--hover" as string]: hoverColor }}
          >
            <span className="group-hover:text-[var(--hover)]">{title}</span>
          </h3>
          {publishedAt && (
            <p className="mt-0.5 text-xs text-gray-500">
              {timeAgo(publishedAt)}
            </p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${slug}`} className="group editorial-card block">
      <article className="white-card overflow-hidden">
        <div className={`relative overflow-hidden ${aspectClass}`}>
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="h-full w-full"
          />
        </div>
        <div className="p-5">
          <Badge colorScheme={category} className="mb-2">
            {formatCategoryLabel(category)}
          </Badge>
          <h2
            className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors duration-200"
            style={{ ["--hover" as string]: hoverColor }}
          >
            <span className="group-hover:text-[var(--hover)]">{title}</span>
          </h2>
          {excerpt && (
            <p className="mt-2 line-clamp-2 text-base leading-relaxed text-gray-600">
              {excerpt}
            </p>
          )}
          {publishedAt && (
            <p className="mt-3 text-sm font-medium text-gray-400">
              {timeAgo(publishedAt)}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
