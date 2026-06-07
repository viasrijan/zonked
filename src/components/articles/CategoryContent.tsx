"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { MobileArticleCard } from "@/components/articles/MobileArticleCard";
import { TrendingSidebar } from "@/components/articles/TrendingSidebar";

interface CategoryContentProps {
  title: string;
  articles: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    imageUrl: string | null;
    category: string;
    publishedAt: Date | string | null;
  }>;
  trending: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    imageUrl: string | null;
    category: string;
    publishedAt: Date | string | null;
  }>;
}

export function CategoryContent({ title, articles, trending }: CategoryContentProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        {/* Category header */}
        <div className="px-3 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border-color)" }}>
          <h1 className="text-3xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
            {title}
          </h1>
        </div>

        {/* Articles grid */}
        <div className="px-3 py-4">
          {articles.length > 0 ? (
            <div className="grid gap-4 grid-cols-2">
              {articles.map((article) => (
                <MobileArticleCard key={article.slug} {...article} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center" style={{ color: "var(--text-muted)" }}>
              No articles in this category yet.
            </p>
          )}
        </div>

        {/* Trending section */}
        {trending.length > 0 && (
          <div className="py-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <div className="px-3 mb-3">
              <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
                Trending
              </h2>
            </div>
            <div className="flex gap-3 px-3 overflow-x-auto pb-2 scrollbar-hide">
              {trending.map((article) => (
                <div key={article.slug} className="w-48 shrink-0">
                  <MobileArticleCard {...article} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="mx-auto max-w-[1200px] px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-black tracking-[-0.03em] md:text-6xl" style={{ background: "linear-gradient(to bottom, var(--text-primary) 60%, transparent 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {title}
        </h1>
      </div>
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-3 items-start">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} aspectRatio="16:9" />
          ))}
          {articles.length === 0 && (
            <p className="col-span-full py-12 text-center text-gray-500 text-lg">
              No articles in this category yet.
            </p>
          )}
        </div>
        <aside className="hidden lg:block">
          <TrendingSidebar articles={trending} />
        </aside>
      </div>
    </div>
  );
}
