import Link from "next/link";
import { ArticleCard } from "./ArticleCard";
import { ArrowRight } from "lucide-react";

interface Article {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
}

interface CategorySectionProps {
  title: string;
  href: string;
  articles: Article[];
}

export function CategorySection({
  title,
  href,
  articles,
}: CategorySectionProps) {
  if (!articles.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {title}
        </h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-500"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  );
}
