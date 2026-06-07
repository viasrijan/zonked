"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo } from "@/lib/utils/date";

interface MobileArticleCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
}

const CAT_COLORS: Record<string, string> = {
  film: "#E01A4F",
  tv: "#F9C22E",
  celebs: "#1aafc9",
  fashion: "#14b57a",
  lifestyle: "#ad6e47",
  dating: "#F15946",
  internet: "#8B5CF6",
};

export function MobileArticleCard({
  title,
  slug,
  imageUrl,
  category,
  publishedAt,
}: MobileArticleCardProps) {
  const accentColor = CAT_COLORS[category] || "#E01A4F";

  return (
    <Link
      href={`/article/${slug}`}
      className="group editorial-card block"
    >
      <article className="overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4" style={{ backgroundColor: "var(--bg-section)" }}>
          <h3 className="text-sm font-bold line-clamp-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
          {publishedAt && (
            <p className="mt-2 text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              {timeAgo(publishedAt)}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
