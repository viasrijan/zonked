import { Metadata } from "next";
import { searchArticles } from "@/lib/db/queries";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SearchBar } from "@/components/shared/SearchBar";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles on Zonked",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const results = q ? await searchArticles(q) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
        Search Articles
      </h1>
      <SearchBar className="mb-8" />
      {q && (
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          {results.length > 0
            ? `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${q}"`
            : `No results for "${q}"`}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
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
