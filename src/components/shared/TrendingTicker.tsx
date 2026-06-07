import { getPublishedArticles } from "@/lib/db/queries";

const CATEGORY_COLORS: Record<string, string> = {
  film: "#E01A4F",
  tv: "#F9C22E",
  celebs: "#1aafc9",
  fashion: "#14b57a",
  lifestyle: "#ad6e47",
  dating: "#F15946",
  internet: "#8B5CF6",
};

interface TickerArticle {
  title: string;
  slug: string;
  category: string;
}

export async function TrendingTicker() {
  const articles = await getPublishedArticles(10);
  if (articles.length === 0) return null;

  const items: TickerArticle[] = articles.map((a) => ({
    title: a.title,
    slug: a.slug,
    category: a.category || "celebs",
  }));

  const doubled = [...items, ...items];

  return (
    <div
      className="w-full fade-edges"
      style={{
        background: "linear-gradient(90deg, #0a0a0a 0%, #151515 50%, #0a0a0a 100%)",
      }}
    >
      <div className="ticker-track whitespace-nowrap py-2 sm:py-2.5">
        {doubled.map((item, i) => {
          const color = CATEGORY_COLORS[item.category] || "#ffffff";
          return (
            <a
              key={`${item.slug}-${i}`}
              href={`/article/${item.slug}`}
              className="ticker-item inline-flex items-center gap-2.5 px-4 sm:px-6 text-xs sm:text-sm font-semibold transition-colors duration-200"
              style={{ color: "#ffffff", ["--cat-color" as string]: color }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="truncate max-w-[260px] sm:max-w-none">{item.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
