import { ArticleCard } from "./ArticleCard";

interface Article {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
}

interface TrendingSidebarProps {
  articles: Article[];
  title?: string;
}

export function TrendingSidebar({
  articles,
  title = "Trending Now",
}: TrendingSidebarProps) {
  if (!articles.length) return null;

  return (
    <aside className="space-y-4">
      <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-1">
        {articles.slice(0, 5).map((article, i) => (
          <div key={article.slug} className="flex gap-3 rounded-lg p-2">
            <span className="mt-0.5 text-2xl font-bold text-zinc-300 dark:text-zinc-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <ArticleCard
              title={article.title}
              slug={article.slug}
              excerpt={null}
              imageUrl={article.imageUrl}
              category={article.category}
              publishedAt={article.publishedAt}
              variant="compact"
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
