"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { MobileArticlePage } from "@/components/articles/MobileArticlePage";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo, formatDate } from "@/lib/utils/date";
import { TrendingSidebar } from "@/components/articles/TrendingSidebar";
import { InteractivePoll } from "@/components/articles/InteractivePoll";
import { parseArticleContent } from "@/lib/utils/parseContent";
import Link from "next/link";

const CAT_COLORS: Record<string, string> = {
  film: "#E01A4F",
  tv: "#F9C22E",
  celebs: "#1aafc9",
  fashion: "#14b57a",
  lifestyle: "#ad6e47",
  dating: "#F15946",
  internet: "#8B5CF6",
};

interface ArticleContentProps {
  article: {
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    imageUrl: string | null;
    category: string;
    publishedAt: Date | string | null;
    sourceName?: string | null;
    sourceUrl?: string | null;
    viewCount?: number;
  };
  trending: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    imageUrl: string | null;
    category: string;
    publishedAt: Date | string | null;
  }>;
  related: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    imageUrl: string | null;
    category: string;
    publishedAt: Date | string | null;
  }>;
}

function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");
}

export function ArticleContent({ article, trending, related }: ArticleContentProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileArticlePage
        article={article}
        trending={trending}
        related={related}
      />
    );
  }

  const catColor = CAT_COLORS[article.category] || "#E01A4F";
  const segments = parseArticleContent(article.content);

  return (
    <div className="mx-auto max-w-[1200px] px-3 sm:px-4 py-6 sm:py-8">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <Badge colorScheme={article.category} className="mb-4">
            {formatCategoryLabel(article.category)}
          </Badge>
          <h1 className="text-3xl font-black leading-[1.1] tracking-[-0.03em] md:text-5xl" style={{ color: "var(--text-primary)" }}>
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: "var(--text-muted)" }}>
            {article.publishedAt && (
              <time dateTime={typeof article.publishedAt === 'string' ? article.publishedAt : article.publishedAt.toISOString()}>
                {formatDate(article.publishedAt)}
              </time>
            )}
            {article.sourceName && (
              <>
                <span>·</span>
                <span>{article.sourceName}</span>
              </>
            )}
            <span>·</span>
            <span>{article.viewCount || 0} views</span>
          </div>

          {article.imageUrl && (
            <div className="relative mb-8 aspect-video overflow-hidden mt-6">
              <ImageWithFallback
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none"
            style={{
              ["--prose-first-word" as string]: catColor,
              ["--prose-link" as string]: catColor,
            }}
          >
            {segments.map((seg, i) =>
              seg.type === "html" ? (
                <div key={i} dangerouslySetInnerHTML={{ __html: seg.html! }} />
              ) : (
                <InteractivePoll
                  key={i}
                  pollId={`${article.slug}-${i}`}
                  question={seg.poll!.question}
                  options={seg.poll!.options}
                />
              )
            )}
          </div>

          {article.sourceUrl && (
            <div
              className="mb-8 border p-4 text-sm mt-6"
              style={{
                backgroundColor: "var(--bg-section, #151515)",
                borderColor: "var(--border-color, rgba(255,255,255,0.08))",
              }}
            >
              <p style={{ color: "#ffffff" }}>
                Originally reported by{" "}
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                  style={{ color: catColor }}
                >
                  {article.sourceName || "the source"}
                </a>
              </p>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block h-6 w-1.5" style={{ backgroundColor: catColor }} />
                <h2 className="text-2xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
                  Related
                </h2>
              </div>
              <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3">
                {related.map((rel) => {
                  const relColor = CAT_COLORS[rel.category] || "#E01A4F";
                  return (
                    <Link key={rel.slug} href={`/article/${rel.slug}`} className="group editorial-card block">
                      <article className="overflow-hidden">
                        <div className="relative aspect-video overflow-hidden">
                          <ImageWithFallback src={rel.imageUrl} alt={rel.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="p-4" style={{ backgroundColor: "var(--bg-section)" }}>
                          <h3 className="text-sm font-bold line-clamp-2" style={{ color: "var(--text-primary)" }}>{rel.title}</h3>
                          {rel.publishedAt && (
                            <p className="mt-2 text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                              <span
                                className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: relColor }}
                              />
                              {timeAgo(rel.publishedAt)}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <TrendingSidebar articles={trending} />
        </aside>
      </div>
    </div>
  );
}
