import { getPublishedArticles, getFeaturedArticles, getTrendingArticles } from "@/lib/db/queries";
import { FeaturedArticle } from "@/components/articles/FeaturedArticle";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TrendingSidebar } from "@/components/articles/TrendingSidebar";
import { CategorySection } from "@/components/articles/CategorySection";

const CATEGORIES = [
  { name: "Bollywood", slug: "bollywood" },
  { name: "Television", slug: "television" },
  { name: "South Cinema", slug: "south-cinema" },
  { name: "Hollywood", slug: "hollywood" },
  { name: "Korean", slug: "korean" },
  { name: "Fashion", slug: "fashion" },
  { name: "Lifestyle", slug: "lifestyle" },
];

export default async function HomePage() {
  const [featured, latest, trending] = await Promise.all([
    getFeaturedArticles(3),
    getPublishedArticles(8),
    getTrendingArticles(5),
  ]);

  const mapArticle = (a: any) => ({
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    imageUrl: a.imageUrl || a.imageBlobUrl,
    category: a.category,
    publishedAt: a.publishedAt,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {featured.length > 0 && (
        <section className="mb-8">
          <FeaturedArticle {...mapArticle(featured[0])} />
          {featured.length > 1 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {featured.slice(1).map((a) => (
                <ArticleCard key={a.slug} {...mapArticle(a)} />
              ))}
            </div>
          )}
        </section>
      )}

      <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
            Latest Stories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {latest.slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} {...mapArticle(article)} />
            ))}
          </div>
        </section>
        <aside className="hidden lg:block">
          <TrendingSidebar
            articles={trending.map(mapArticle)}
          />
        </aside>
      </div>

      {CATEGORIES.map((cat) => (
        <div key={cat.slug} className="mb-8">
          <CategorySection
            title={cat.name}
            href={`/${cat.slug}`}
            articles={latest.filter((a) => a.category === cat.slug).map(mapArticle)}
          />
        </div>
      ))}
    </div>
  );
}
