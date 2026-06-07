const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_ENDPOINT = "https://api.pexels.com/v1/search";
const DEFAULT_TIMEOUT = 5000;
const CACHE_TTL = 24 * 60 * 60 * 1000;

type CacheEntry = { url: string | null; ts: number };
const cache = new Map<string, CacheEntry>();

function cacheKey(query: string, orientation: string): string {
  return `${orientation}:${query.toLowerCase().trim()}`;
}

async function fetchPexels(query: string, orientation: "landscape" | "portrait" = "landscape"): Promise<string | null> {
  if (!PEXELS_API_KEY) return null;
  const key = cacheKey(query, orientation);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.url;
  }
  try {
    const url = `${PEXELS_ENDPOINT}?query=${encodeURIComponent(query)}&per_page=10&orientation=${orientation}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
    const res = await fetch(url, {
      headers: { Authorization: PEXELS_API_KEY },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      console.warn(`[Pexels] ${res.status} for "${query}"`);
      cache.set(key, { url: null, ts: Date.now() });
      return null;
    }
    const data = await res.json();
    const photos: any[] = data.photos || [];
    if (photos.length === 0) {
      cache.set(key, { url: null, ts: Date.now() });
      return null;
    }
    const pick = photos[Math.floor(Math.random() * Math.min(5, photos.length))];
    const imageUrl = pick?.src?.large || pick?.src?.medium || pick?.src?.original || null;
    cache.set(key, { url: imageUrl, ts: Date.now() });
    return imageUrl;
  } catch (err) {
    console.warn(`[Pexels] fetch failed for "${query}":`, String(err).slice(0, 100));
    cache.set(key, { url: null, ts: Date.now() });
    return null;
  }
}

const CATEGORY_FALLBACK_QUERIES: Record<string, string[]> = {
  film: ["movie theater", "cinema seats", "film premiere", "red carpet", "hollywood sign"],
  tv: ["television screen", "streaming", "tv remote", "couch television", "laptop streaming"],
  celebs: ["celebrity portrait", "fashion portrait", "red carpet", "studio portrait", "actor headshot"],
  fashion: ["fashion runway", "designer clothes", "fashion model", "couture dress", "high fashion"],
  lifestyle: ["luxury home", "wellness spa", "healthy food", "travel destination", "morning routine"],
  dating: ["couple", "romantic dinner", "wedding", "candlelight", "love"],
  internet: ["smartphone", "laptop code", "social media", "headphones music", "concert crowd"],
};

export async function getFallbackImage(category: string, topicHint?: string): Promise<string | null> {
  if (topicHint) {
    const r = await fetchPexels(topicHint.slice(0, 80));
    if (r) return r;
  }
  const queries = CATEGORY_FALLBACK_QUERIES[category] || CATEGORY_FALLBACK_QUERIES.celebs;
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  return await fetchPexels(randomQuery);
}
