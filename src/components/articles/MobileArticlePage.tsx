"use client";

import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { timeAgo } from "@/lib/utils/date";
import { MobileArticleCard } from "@/components/articles/MobileArticleCard";
import { InteractivePoll } from "@/components/articles/InteractivePoll";
import { parseArticleContent } from "@/lib/utils/parseContent";

const CAT_COLORS: Record<string, string> = {
  film: "#E01A4F",
  tv: "#F9C22E",
  celebs: "#1aafc9",
  fashion: "#14b57a",
  lifestyle: "#ad6e47",
  dating: "#F15946",
  internet: "#8B5CF6",
};

interface MobileArticlePageProps {
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

export function MobileArticlePage({ article, trending, related }: MobileArticlePageProps) {
  const catColor = CAT_COLORS[article.category] || "#E01A4F";
  const segments = parseArticleContent(article.content);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {article.imageUrl && (
        <div className="relative w-full aspect-[4/3]">
          <ImageWithFallback
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="px-4 py-5" style={{ backgroundColor: "var(--bg-primary)" }}>
        <Badge colorScheme={article.category} className="mb-3">
          {formatCategoryLabel(article.category)}
        </Badge>

        <h1 className="text-2xl font-black leading-tight tracking-[-0.02em]" style={{ color: "var(--text-primary)" }}>
          {article.title}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          {article.publishedAt && (
            <span>{timeAgo(article.publishedAt)}</span>
          )}
          {article.sourceName && (
            <>
              <span>·</span>
              <span>{article.sourceName}</span>
            </>
          )}
        </div>

        <div
          className="mt-6 prose prose-sm max-w-none"
          style={{
            color: "var(--text-secondary)",
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
                pollId={`${article.slug}-m-${i}`}
                question={seg.poll!.question}
                options={seg.poll!.options}
              />
            )
          )}
        </div>

        {article.sourceUrl && (
          <div
            className="mt-6 border p-3"
            style={{
              backgroundColor: "var(--bg-section, #151515)",
              borderColor: "var(--border-color, rgba(255,255,255,0.08))",
            }}
          >
            <p className="text-xs" style={{ color: "#ffffff" }}>
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
      </div>

      {trending.length > 0 && (
        <div className="py-4" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="px-4 mb-3 flex items-center gap-2">
            <span className="inline-block h-5 w-1.5 bg-[#E01A4F]" />
            <h2 className="text-lg font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
              Trending
            </h2>
          </div>
          <div className="grid gap-4 grid-cols-2 px-4">
            {trending.map((article) => (
              <MobileArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="py-4" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="px-4 mb-3 flex items-center gap-2">
            <span className="inline-block h-5 w-1.5" style={{ backgroundColor: catColor }} />
            <h2 className="text-lg font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
              Related
            </h2>
          </div>
          <div className="grid gap-4 grid-cols-2 px-4">
            {related.map((article) => (
              <MobileArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
