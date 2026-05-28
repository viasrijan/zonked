import Parser from "rss-parser";
import { RSSSource } from "./sources";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; ZonkedBot/1.0; +https://zonked.vercel.app)",
  },
  timeout: 10000,
});

export interface FeedItem {
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

export async function fetchRSSFeed(source: RSSSource): Promise<FeedItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    return feed.items
      .filter((item) => item.title && (item.content || item.contentSnippet))
      .slice(0, 10)
      .map((item) => {
        const enclosureUrl = item.enclosure?.url;
        const mediaUrl = (item["media:content"] as any)?.$.url;
        const contentHtml = item.content || "";
        const htmlImage = extractImageFromHtml(contentHtml);

        return {
          title: item.title || "",
          content: item.content || item.contentSnippet || "",
          excerpt:
            item.contentSnippet?.slice(0, 200) || item.title || "",
          url: item.link || "",
          imageUrl: enclosureUrl || mediaUrl || htmlImage,
          sourceName: source.name,
          category: source.category,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        };
      });
  } catch (error) {
    console.error(`Failed to fetch ${source.name}:`, error);
    return [];
  }
}

export async function fetchAllRSSFeeds(
  sources: RSSSource[]
): Promise<FeedItem[]> {
  const results = await Promise.allSettled(
    sources.map((s) => fetchRSSFeed(s))
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<FeedItem[]> =>
        r.status === "fulfilled"
    )
    .flatMap((r) => r.value);
}
