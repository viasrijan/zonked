const UA = "ZonkedNews/1.0 (https://zonked.vercel.app; contact@zonked.app)";

interface WikiResult {
  imageUrl: string | null;
}

const cache = new Map<string, { url: string | null; ts: number }>();
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

export async function getCelebrityImage(name: string): Promise<string | null> {
  const cached = cache.get(name);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.url;
  }

  try {
    const title = name.replace(/ /g, "_");
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) {
      cache.set(name, { url: null, ts: Date.now() });
      return null;
    }
    const data = await res.json();
    const rawUrl: string | undefined = data?.originalimage?.source || data?.thumbnail?.source;
    if (!rawUrl) {
      cache.set(name, { url: null, ts: Date.now() });
      return null;
    }
    const url = rawUrl.replace(/\/\d+px-/, "/300px-");
    cache.set(name, { url, ts: Date.now() });
    return url;
  } catch {
    cache.set(name, { url: null, ts: Date.now() });
    return null;
  }
}
