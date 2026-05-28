import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo } from "@/lib/utils/date";

interface FeaturedArticleProps {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
  variant?: "standard" | "split";
}

function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");
}

export function FeaturedArticle({
  title,
  slug,
  excerpt,
  imageUrl,
  category,
  publishedAt,
  variant = "standard",
}: FeaturedArticleProps) {
  if (variant === "split") {
    return (
      <Link href={`/article/${slug}`} className="group block">
        <article className="grid gap-6 white-card overflow-hidden md:grid-cols-2">
          <div className="relative overflow-hidden hero-image-overlay">
            <ImageWithFallback src={imageUrl} alt={title} className="aspect-[4/3] w-full" />
          </div>
          <div className="flex flex-col justify-center p-6">
            <Badge colorScheme={category} className="mb-3 w-fit">
              {formatCategoryLabel(category)}
            </Badge>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.03em] text-gray-900 group-hover:text-[#E01A4F] md:text-5xl">
              {title}
            </h1>
            {excerpt && (
              <p className="mt-4 line-clamp-3 text-lg leading-relaxed text-gray-600">
                {excerpt}
              </p>
            )}
            {publishedAt && (
              <p className="mt-4 text-sm font-medium text-gray-400">
                {timeAgo(publishedAt)}
              </p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/article/${slug}`} className="group block">
      <article className="relative overflow-hidden white-card">
        <div className="relative aspect-[2/1] overflow-hidden md:aspect-[2.8/1] hero-image-overlay">
          <ImageWithFallback src={imageUrl} alt={title} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <Badge colorScheme={category} className="mb-3">
            {formatCategoryLabel(category)}
          </Badge>
          <h1 className="mt-2 max-w-4xl text-3xl font-black leading-tight tracking-[-0.03em] text-white md:text-6xl md:leading-[1.05]">
            {title}
          </h1>
          {excerpt && (
            <p className="mt-3 max-w-2xl line-clamp-2 text-lg text-white/80 md:text-xl">
              {excerpt}
            </p>
          )}
          {publishedAt && (
            <p className="mt-4 text-sm font-medium text-white/60">
              {timeAgo(publishedAt)}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
