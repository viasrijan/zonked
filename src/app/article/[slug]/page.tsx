import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, incrementViewCount } from "@/lib/db/queries";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SocialShare } from "@/components/shared/SocialShare";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { formatDate } from "@/lib/utils/date";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };

  return {
    title: article.title,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.imageUrl || article.imageBlobUrl || undefined,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  incrementViewCount(slug);

  const related = article.category
    ? await getRelatedArticles(article.category, slug)
    : [];

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        {article.category && (
          <Badge
            variant="outline"
            className="mb-3 border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400"
          >
            {article.category.charAt(0).toUpperCase() +
              article.category.slice(1).replace("-", " ")}
          </Badge>
        )}
        <h1 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-white md:text-4xl md:leading-tight">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
          {article.publishedAt && (
            <time dateTime={article.publishedAt.toISOString()}>
              {formatDate(article.publishedAt)}
            </time>
          )}
          {article.sourceName && (
            <span>
              Source: {article.sourceName}
            </span>
          )}
          <span className="text-zinc-300">|</span>
          <span>{article.viewCount || 0} views</span>
        </div>
      </div>

      {article.imageUrl && (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
          <ImageWithFallback
            src={article.imageUrl || article.imageBlobUrl}
            alt={article.title}
            className="h-full w-full"
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.tags && article.tags.length > 0 && (
        <div className="mb-8 mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {article.sourceUrl && (
        <div className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">
            Originally reported by{" "}
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-red-600 hover:underline"
            >
              {article.sourceName || "the source"}
            </a>
          </p>
        </div>
      )}

      <div className="mb-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <SocialShare url={`/article/${slug}`} title={article.title} />
      </div>

      {related.length > 0 && <RelatedArticles
        articles={related.map((a) => ({
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          imageUrl: a.imageUrl || a.imageBlobUrl,
          category: a.category || "",
          publishedAt: a.publishedAt,
        }))}
      />}
    </article>
  );
}
