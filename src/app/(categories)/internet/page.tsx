import { Metadata } from "next";
import { getPublishedArticles, getTrendingArticles } from "@/lib/db/queries";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TrendingSidebar } from "@/components/articles/TrendingSidebar";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Internet",
  description: "Viral trends, social media, and digital culture.",
};

export default async function CategoryPage() {
  const [allArticles, trending] = await Promise.all([
    getPublishedArticles(50),
    getTrendingArticles(5),
  ]);

  const articles = allArticles.filter((a: any) => a.category === "internet");

  const mapArticle = (a: any) => ({
    title: a.title, slug: a.slug, excerpt: a.excerpt,
    imageUrl: a.imageUrl || a.imageBlobUrl, category: a.category, publishedAt: a.publishedAt,
  });

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-5xl font-black tracking-[-0.03em] md:text-6xl" style={{ color: "#8B5CF6" }}>
          Internet
        </h1>
        <p className="mt-2 text-lg text-gray-500">Viral trends, social media, and digital culture.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5 sm:grid-cols-2">
          {articles.map((article: any) => (
            <ArticleCard key={article.slug} {...mapArticle(article)} aspectRatio="16:9" />
          ))}
          {articles.length === 0 && (
            <p className="col-span-full py-12 text-center text-gray-500 text-lg">
              No articles in this category yet.
            </p>
          )}
        </div>
        <aside className="hidden lg:block">
          <TrendingSidebar articles={trending.map(mapArticle)} />
        </aside>
      </div>
    </div>
  );
}
