"use client";

import { MobileArticleCard } from "@/components/articles/MobileArticleCard";

interface MobileCategoryPageProps {
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

export function MobileCategoryPage({ title, articles, trending }: MobileCategoryPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Category header */}
      <div className="px-3 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border-color)" }}>
        <h1 className="text-3xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
      </div>

      {/* Articles grid - same as related section */}
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
