export interface TrendingSong {
  id: string;
  title: string;
  artist: string;
  cover: string;
  coverSmall: string;
  link: string;
  rank: number;
  previewUrl: string | null;
}

const CACHE_TTL = 60 * 60 * 1000;
let cache: { ts: number; data: TrendingSong[] } | null = null;

async function fetchPreview(artist: string, title: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const q = encodeURIComponent(`${artist} ${title}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${q}&entity=song&limit=1`,
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.results?.[0]?.previewUrl || null;
  } catch {
    return null;
  }
}

export async function getTrendingSongs(limit = 5): Promise<TrendingSong[]> {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return cache.data.slice(0, limit);
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(
      `https://rss.applemarketingtools.com/api/v2/us/music/most-played/${Math.max(limit, 10)}/songs.json`,
      { signal: controller.signal, redirect: "follow" }
    );
    clearTimeout(timer);
    if (!res.ok) return cache?.data || [];

    const data = await res.json();
    const results = data?.feed?.results || [];
    const top = results.slice(0, limit);

    const songs: TrendingSong[] = await Promise.all(
      top.map(async (s: any, i: number) => {
        const artwork = s.artworkUrl100 || s.artworkUrl60 || "";
        const cover = artwork.replace(/\/\d+x\d+bb\.(jpg|png)/, "/400x400bb.$1");
        const previewUrl = await fetchPreview(s.artistName, s.name);
        return {
          id: s.id,
          title: s.name,
          artist: s.artistName,
          cover,
          coverSmall: artwork,
          link: s.url,
          rank: i + 1,
          previewUrl,
        };
      })
    );

    cache = { ts: Date.now(), data: songs };
    return songs;
  } catch {
    return cache?.data || [];
  }
}
