import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
  variant?: "default" | "compact";
}

const categoryColors: Record<string, string> = {
  bollywood: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  television: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "south-cinema": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  hollywood: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  korean: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  fashion: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  lifestyle: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export function ArticleCard({
  title,
  slug,
  excerpt,
  imageUrl,
  category,
  publishedAt,
  variant = "default",
}: ArticleCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/article/${slug}`} className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="h-full w-full"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-zinc-900 group-hover:text-red-600 dark:text-zinc-100">
            {title}
          </h3>
          {publishedAt && (
            <p className="mt-1 text-xs text-zinc-500">{timeAgo(publishedAt)}</p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <div className="relative aspect-[16/9] overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <Badge
            variant="outline"
            className={cn(
              "mb-2 border-0",
              categoryColors[category] || "bg-zinc-100 text-zinc-700"
            )}
          >
            {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
          </Badge>
          <h2 className="line-clamp-2 text-base font-semibold leading-snug text-zinc-900 group-hover:text-red-600 dark:text-zinc-100">
            {title}
          </h2>
          {excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
              {excerpt}
            </p>
          )}
          {publishedAt && (
            <p className="mt-3 text-xs text-zinc-500">{timeAgo(publishedAt)}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
