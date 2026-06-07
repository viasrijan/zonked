import { getPublishedArticles, getFeaturedArticles, getTrendingArticles } from "@/lib/db/queries";
import { MobileArticleCard } from "@/components/articles/MobileArticleCard";

export const revalidate = 60;

export default async function MobileHomePage() {
  const [featured, latest, trending] = await Promise.all([
    getFeaturedArticles(5),
    getPublishedArticles(18),
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

  const latestStories = latest.slice(0, 8);

  const latestSlugs = new Set(latestStories.map(a => a.slug));
  const moreStories = latest.filter(a => !latestSlugs.has(a.slug)).slice(0, 6);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Latest Stories */}
      {latestStories.length > 0 && (
        <section className="px-3 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block h-5 w-1.5 bg-[#14b57a]" />
            <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
              Latest
            </h2>
          </div>
          <div>
            {latestStories.map((a) => (
              <MobileArticleCard key={a.slug} {...mapArticle(a)} />
            ))}
          </div>
        </section>
      )}

      {/* Trending - horizontal scroll */}
      {trending.length > 0 && (
        <section className="py-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="flex items-center gap-2 px-3 mb-3">
            <span className="inline-block h-5 w-1.5 bg-[#E01A4F]" />
            <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
              Trending
            </h2>
          </div>
          <div className="flex gap-3 px-3 overflow-x-auto pb-2 scrollbar-hide">
            {trending.map((a) => (
              <div key={a.slug} className="w-48 shrink-0">
                <MobileArticleCard {...mapArticle(a)} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* More Stories */}
      {moreStories.length > 0 && (
        <section className="px-3 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block h-5 w-1.5 bg-[#F9C22E]" />
            <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
              More
            </h2>
          </div>
          <div>
            {moreStories.map((a) => (
              <MobileArticleCard key={a.slug} {...mapArticle(a)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
