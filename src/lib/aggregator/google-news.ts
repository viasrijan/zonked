import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; ZonkedBot/1.0; +https://zonked.vercel.app)",
  },
  timeout: 10000,
});

export interface GoogleNewsItem {
  title: string;
  content: string;
  excerpt: string;
  url: string;
  imageUrl: string | null;
  sourceName: string;
  category: string;
  publishedAt: Date;
}

export async function fetchGoogleNews(
  query: string,
  category = "entertainment"
): Promise<GoogleNewsItem[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const feed = await parser.parseURL(
      `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-IN&gl=IN`
    );
    return feed.items.slice(0, 8).map((item) => ({
      title: item.title || "",
      content: item.contentSnippet || item.title || "",
      excerpt: item.contentSnippet?.slice(0, 200) || item.title || "",
      url: item.link || "",
      imageUrl: null,
      sourceName: item.source?.name || "Google News",
      category,
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    }));
  } catch (error) {
    console.error(`Failed to fetch Google News for "${query}":`, error);
    return [];
  }
}

export async function fetchAllGoogleNews(
  queries: string[]
): Promise<GoogleNewsItem[]> {
  const results = await Promise.allSettled(
    queries.map((q) => fetchGoogleNews(q))
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<GoogleNewsItem[]> =>
        r.status === "fulfilled"
    )
    .flatMap((r) => r.value);
}
