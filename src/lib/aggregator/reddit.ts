export interface RedditPost {
  title: string;
  content: string;
  excerpt: string;
  url: string;
  imageUrl: string | null;
  sourceName: string;
  category: string;
  publishedAt: Date;
}

export async function fetchRedditPosts(
  subreddit: string,
  limit = 10
): Promise<RedditPost[]> {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`,
      {
        headers: {
          "User-Agent": "Zonked/1.0 (entertainment news aggregator)",
        },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data.children
      .filter((child: any) => !child.data.stickied)
      .map((child: any) => ({
        title: child.data.title,
        content: child.data.selftext || child.data.title,
        excerpt: child.data.title,
        url: `https://reddit.com${child.data.permalink}`,
        imageUrl:
          child.data.url?.match(/\.(jpg|jpeg|png|gif)$/i)
            ? child.data.url
            : null,
        sourceName: `r/${subreddit}`,
        category: inferCategory(child.data.title, child.data.link_flair_text),
        publishedAt: new Date(child.data.created_utc * 1000),
      }));
  } catch (error) {
    console.error(`Failed to fetch r/${subreddit}:`, error);
    return [];
  }
}

function inferCategory(
  title: string,
  flair: string | null
): string {
  const t = title.toLowerCase();
  if (flair?.toLowerCase().includes("south")) return "south-cinema";
  if (t.includes("kpop") || t.includes("k-pop") || t.includes("k-drama") || t.includes("bts"))
    return "korean";
  if (t.includes("hollywood") || t.includes("marvel") || t.includes("dc"))
    return "hollywood";
  if (t.includes("tv") || t.includes("serial") || t.includes("telly"))
    return "television";
  if (t.includes("fashion") || t.includes("style") || t.includes("outfit"))
    return "fashion";
  if (t.includes("lifestyle") || t.includes("health") || t.includes("food"))
    return "lifestyle";
  return "bollywood";
}

export async function fetchAllRedditPosts(
  subreddits: string[]
): Promise<RedditPost[]> {
  const results = await Promise.allSettled(
    subreddits.map((s) => fetchRedditPosts(s))
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<RedditPost[]> =>
        r.status === "fulfilled"
    )
    .flatMap((r) => r.value);
}
