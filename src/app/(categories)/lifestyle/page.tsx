import { Metadata } from "next";
import { getArticlesByCategory, getTrendingArticles } from "@/lib/db/queries";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TrendingSidebar } from "@/components/articles/TrendingSidebar";

export const metadata: Metadata = {
  title: "Lifestyle",
  description: "Latest lifestyle tips, health, wellness, food, travel and relationship advice.",
};

export default async function LifestylePage() {
  const [articles, trending] = await Promise.all([
    getArticlesByCategory("lifestyle", 30),
    getTrendingArticles(5),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">
        Lifestyle
      </h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              slug={article.slug}
              excerpt={article.excerpt}
              imageUrl={article.imageUrl || article.imageBlobUrl}
              category={article.category}
              publishedAt={article.publishedAt}
            />
          ))}
          {articles.length === 0 && (
            <p className="col-span-full py-12 text-center text-zinc-500">
              No articles yet. Content aggregation is running...
            </p>
          )}
        </div>
        <aside className="hidden lg:block">
          <TrendingSidebar
            articles={trending.map((a) => ({
              title: a.title,
              slug: a.slug,
              excerpt: a.excerpt,
              imageUrl: a.imageUrl || a.imageBlobUrl,
              category: a.category,
              publishedAt: a.publishedAt,
            }))}
          />
        </aside>
      </div>
    </div>
  );
}
