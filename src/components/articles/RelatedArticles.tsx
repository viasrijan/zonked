import { ArticleCard } from "./ArticleCard";

interface Article {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
}

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
        Related Articles
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  );
}
