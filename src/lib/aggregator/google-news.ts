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

function extractImageFromHtml(html: string): string | null {
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) {
    const url = imgMatch[1];
    if (url.startsWith("http") && !url.includes("icon") && !url.includes("logo") && !url.includes("pixel")) {
      return url;
    }
  }
  return null;
}

export async function fetchGoogleNews(
  query: string,
  category: string
): Promise<GoogleNewsItem[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const feed = await parser.parseURL(
      `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-IN&gl=IN`
    );
    return feed.items.slice(0, 8).map((item) => {
      const contentHtml = item.content || "";
      const htmlImage = extractImageFromHtml(contentHtml);

      return {
        title: item.title || "",
        content: item.contentSnippet || item.title || "",
        excerpt: item.contentSnippet?.slice(0, 200) || item.title || "",
        url: item.link || "",
        imageUrl: htmlImage,
        sourceName: item.source?.name || "Google News",
        category,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      };
    });
  } catch (error) {
    console.error(`Failed to fetch Google News for "${query}":`, error);
    return [];
  }
}

export async function fetchAllGoogleNews(
  queries: { query: string; category: string }[]
): Promise<GoogleNewsItem[]> {
  const results = await Promise.allSettled(
    queries.map((q) => fetchGoogleNews(q.query, q.category))
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<GoogleNewsItem[]> =>
        r.status === "fulfilled"
    )
    .flatMap((r) => r.value);
}
