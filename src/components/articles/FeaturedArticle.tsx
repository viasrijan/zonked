import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";

interface FeaturedArticleProps {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
}

export function FeaturedArticle({
  title,
  slug,
  excerpt,
  imageUrl,
  category,
  publishedAt,
}: FeaturedArticleProps) {
  return (
    <Link href={`/article/${slug}`} className="group block">
      <article className="relative overflow-hidden rounded-xl">
        <div className="relative aspect-[2/1] md:aspect-[3/1]">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <Badge className="mb-2 bg-red-600 text-white hover:bg-red-600">
            {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
          </Badge>
          <h1 className="text-xl font-bold leading-tight text-white md:text-3xl md:leading-tight">
            {title}
          </h1>
          {excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-zinc-300 md:text-base">
              {excerpt}
            </p>
          )}
          {publishedAt && (
            <p className="mt-2 text-xs text-zinc-400">{timeAgo(publishedAt)}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
