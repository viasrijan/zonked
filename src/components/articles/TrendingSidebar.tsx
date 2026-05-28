"use client";

import Link from "next/link";

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

const NUMBER_COLORS = ["#E01A4F", "#F9C22E", "#53B3CB", "#06D6A0", "#C0C0C0"];

export function TrendingSidebar({ articles, title = "Trending Now" }: TrendingSidebarProps) {
  if (!articles.length) return null;

  return (
    <aside className="white-card p-5">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
        <span className="inline-block h-6 w-1.5 bg-[#E01A4F]" />
        <h2 className="text-xl font-black uppercase tracking-wide text-gray-900">
          {title}
        </h2>
      </div>
      <div className="space-y-0">
        {articles.slice(0, 5).map((article, i) => {
          const color = NUMBER_COLORS[i % NUMBER_COLORS.length];
          return (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group flex items-start gap-3 border-b border-gray-100 last:border-0 py-3"
            >
              <span
                className="text-3xl font-black leading-none tabular-nums"
                style={{ color }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3
                  className="text-base font-bold leading-snug text-gray-900 line-clamp-2 transition-colors duration-200"
                  style={{ ["--hover" as string]: color }}
                >
                  <span className="group-hover:text-[var(--hover)]">{article.title}</span>
                </h3>
                <p className="mt-1 text-xs text-gray-500 uppercase tracking-wide">
                  {article.category}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
