import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, getTrendingArticles, incrementViewCount } from "@/lib/db/queries";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SocialShare } from "@/components/shared/SocialShare";
import { TrendingSidebar } from "@/components/articles/TrendingSidebar";
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

function stripImgTags(html: string): string {
  return html.replace(/<img[^>]*>/gi, "");
}

function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  incrementViewCount(slug);

  const [related, trending] = await Promise.all([
    article.category ? getRelatedArticles(article.category, slug) : [],
    getTrendingArticles(5),
  ]);

  const cleanContent = stripImgTags(article.content);

  const mapArticle = (a: any) => ({
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    imageUrl: a.imageUrl || a.imageBlobUrl,
    category: a.category,
    publishedAt: a.publishedAt,
  });

  return (
    <>
      <SocialShare url={`/article/${slug}`} title={article.title} variant="floating" />
      <article className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content - Left */}
          <div>
            <div className="mb-6">
              {article.category && (
                <Badge colorScheme={article.category} className="mb-4">
                  {formatCategoryLabel(article.category)}
                </Badge>
              )}
              <h1 className="text-4xl font-black leading-[1.1] tracking-[-0.03em] text-gray-900 md:text-5xl">
                {article.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                {article.publishedAt && (
                  <time dateTime={article.publishedAt.toISOString()}>
                    {formatDate(article.publishedAt)}
                  </time>
                )}
                {article.sourceName && (
                  <>
                    <span>&middot;</span>
                    <span>{article.sourceName}</span>
                  </>
                )}
                <span>&middot;</span>
                <span>{article.viewCount || 0} views</span>
              </div>
            </div>

            {article.imageUrl && (
              <div className="relative mb-8 aspect-video overflow-hidden">
                <ImageWithFallback
                  src={article.imageUrl || article.imageBlobUrl}
                  alt={article.title}
                  className="h-full w-full"
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />

            {article.tags && article.tags.length > 0 && (
              <div className="mb-8 mt-10 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 border border-gray-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {article.sourceUrl && (
              <div className="mb-8 bg-gray-50 border border-gray-200 p-4 text-sm">
                <p className="text-gray-600">
                  Originally reported by{" "}
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#E01A4F] hover:underline"
                  >
                    {article.sourceName || "the source"}
                  </a>
                </p>
              </div>
            )}

            <div className="mb-10 border-t border-gray-200 pt-6">
              <SocialShare url={`/article/${slug}`} title={article.title} />
            </div>

            {related.length > 0 && (
              <RelatedArticles
                articles={related.map((a) => ({
                  title: a.title,
                  slug: a.slug,
                  excerpt: a.excerpt,
                  imageUrl: a.imageUrl || a.imageBlobUrl,
                  category: a.category || "",
                  publishedAt: a.publishedAt,
                }))}
              />
            )}
          </div>

          {/* Sidebar - Right */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TrendingSidebar articles={trending.map(mapArticle)} />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
