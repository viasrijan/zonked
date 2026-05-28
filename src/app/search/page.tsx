import { Metadata } from "next";
import { searchArticles } from "@/lib/db/queries";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SearchBar } from "@/components/shared/SearchBar";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles on ZONKED",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const results = q ? await searchArticles(q) : [];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-black tracking-[-0.03em] text-gray-900">
          Search
        </h1>
        <SearchBar className="mt-4" />
      </div>
      {q && (
        <p className="mb-6 text-lg text-gray-400">
          {results.length > 0
            ? `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${q}"`
            : `No results for "${q}"`}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            slug={article.slug}
            excerpt={article.excerpt}
            imageUrl={article.imageUrl || article.imageBlobUrl}
            category={article.category}
            publishedAt={article.publishedAt}
          />
        ))}
      </div>
    </div>
  );
}
