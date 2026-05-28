import { getPublishedArticles, getFeaturedArticles, getTrendingArticles } from "@/lib/db/queries";
import { FeaturedArticle } from "@/components/articles/FeaturedArticle";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TrendingSidebar } from "@/components/articles/TrendingSidebar";

export const revalidate = 60;

export default async function HomePage() {
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

  const hero = featured[0];
  const subHero = featured.slice(1, 3);

  const mixedStories = latest.slice(0, 7);

  const mixedSlugs = new Set(mixedStories.map(a => a.slug));
  const threeCol = latest.filter(a => !mixedSlugs.has(a.slug)).slice(0, 6);
  const threeColSlugs = new Set(threeCol.map(a => a.slug));
  const moreStories = latest.filter(a => !mixedSlugs.has(a.slug) && !threeColSlugs.has(a.slug)).slice(0, 6);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6">

      {/* HERO */}
      {hero && (
        <section className="animate-in border-b border-gray-200 pb-6 mb-8">
          <FeaturedArticle {...mapArticle(hero)} />
        </section>
      )}

      {/* SUB-HERO */}
      {subHero.length > 0 && (
        <section className="animate-in delay-1 grid gap-5 md:grid-cols-2 pb-6 mb-8 border-b border-gray-200">
          {subHero.map((a) => (
            <ArticleCard key={a.slug} {...mapArticle(a)} aspectRatio="16:9" />
          ))}
        </section>
      )}

      {/* MIXED STORIES */}
      {mixedStories.length > 0 && (
        <section className="animate-in delay-2 mb-10">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
            <span className="inline-block h-7 w-2 bg-[#F9C22E]" />
            <h2 className="text-2xl font-black uppercase tracking-wide text-gray-900">
              Latest Stories
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mixedStories.map((a) => (
              <ArticleCard key={a.slug} {...mapArticle(a)} aspectRatio="4:3" />
            ))}
          </div>
        </section>
      )}

      {/* MORE + TRENDING */}
      {moreStories.length > 0 && (
        <section className="animate-in delay-3 border-t border-gray-200 pt-6 mb-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
                <span className="inline-block h-7 w-2 bg-[#06D6A0]" />
                <h2 className="text-2xl font-black uppercase tracking-wide text-gray-900">
                  More Stories
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {moreStories.map((a) => (
                  <ArticleCard key={a.slug} {...mapArticle(a)} aspectRatio="16:9" />
                ))}
              </div>
            </div>
            <aside className="hidden lg:block">
              <TrendingSidebar articles={trending.map(mapArticle)} />
            </aside>
          </div>
        </section>
      )}
    </div>
  );
}
