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
    <section>
      <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
        <span className="inline-block h-7 w-2 bg-[#E01A4F]" />
        <h2 className="text-2xl font-black uppercase tracking-wide text-gray-900">
          Related Articles
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} {...article} aspectRatio="16:9" />
        ))}
      </div>
    </section>
  );
}
