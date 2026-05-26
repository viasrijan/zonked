import { fetchAllRSSFeeds, fetchRSSFeed, FeedItem } from "./rss-parser";
import { fetchAllRedditPosts, RedditPost } from "./reddit";
import { fetchAllGoogleNews, GoogleNewsItem } from "./google-news";
import { RSS_SOURCES, GOOGLE_NEWS_QUERIES, REDDIT_SUBREDDITS } from "./sources";
import { isDuplicate } from "../utils/deduplicate";

export interface AggregatedItem {
  title: string;
  content: string;
  excerpt: string;
  url: string;
  imageUrl: string | null;
  sourceName: string;
  category: string;
  publishedAt: Date;
}

export async function aggregateAllSources(): Promise<AggregatedItem[]> {
  const [rssItems, redditItems, googleNewsItems] = await Promise.all([
    fetchAllRSSFeeds(RSS_SOURCES),
    fetchAllRedditPosts(REDDIT_SUBREDDITS),
    fetchAllGoogleNews(GOOGLE_NEWS_QUERIES),
  ]);
  return [...rssItems, ...redditItems, ...googleNewsItems];
}

export function deduplicateAndRank(
  items: AggregatedItem[]
): AggregatedItem[] {
  const seen: string[] = [];
  const ranked = items
    .filter((item) => {
      if (isDuplicate(item.title, seen)) return false;
      seen.push(item.title);
      return true;
    })
    .sort(
      (a, b) =>
        b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  return ranked;
}
