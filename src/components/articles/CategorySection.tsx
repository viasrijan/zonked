import Link from "next/link";
import { ArticleCard } from "./ArticleCard";
import { ArrowRight } from "lucide-react";

interface Article {
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  publishedAt: Date | string | null;
}

interface CategorySectionProps {
  title: string;
  href: string;
  articles: Article[];
  color?: string;
}

const CAT_COLORS: Record<string, string> = {
  film: "#E01A4F",
  tv: "#F9C22E",
  celebs: "#53B3CB",
  fashion: "#06D6A0",
  lifestyle: "#C0C0C0",
  dating: "#F15946",
  internet: "#8B5CF6",
};

export function CategorySection({ title, href, articles, color }: CategorySectionProps) {
  if (!articles.length) return null;
  const accentColor = CAT_COLORS[color || "film"] || "#E01A4F";

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-3">
          <span className="inline-block h-7 w-2" style={{ backgroundColor: accentColor }} />
          <h2 className="text-2xl font-black uppercase tracking-wide text-gray-900">
            {title}
          </h2>
        </div>
        <Link
          href={href}
          className="group flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-[#E01A4F] transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  );
}
