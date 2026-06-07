import { getPublishedArticles } from "@/lib/db/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";

function pickPhotoOfTheDay<T extends { imageUrl: string | null; imageBlobUrl: string | null; publishedAt: Date | string | null; viewCount: number | null }>(
  articles: T[]
): T | null {
  const withImage = articles.filter((a) => a.imageUrl || a.imageBlobUrl);
  if (withImage.length === 0) return null;

  const now = Date.now();
  const dayMs = 1000 * 60 * 60 * 24;
  const candidates = withImage.filter((a) => {
    const ts = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    return ts > 0 && now - ts < 7 * dayMs;
  });
  const pool = candidates.length > 0 ? candidates : withImage;
  const sorted = [...pool].sort((a, b) => {
    const av = (a.viewCount ?? 0) * 2 + (a.publishedAt ? new Date(a.publishedAt).getTime() / 1e9 : 0);
    const bv = (b.viewCount ?? 0) * 2 + (b.publishedAt ? new Date(b.publishedAt).getTime() / 1e9 : 0);
    return bv - av;
  });
  return sorted[0] || null;
}

export async function PhotoOfTheDay() {
  const recent = await getPublishedArticles(20);
  const pick = pickPhotoOfTheDay(recent);
  if (!pick) return null;

  const imageUrl = pick.imageUrl || pick.imageBlobUrl;
  if (!imageUrl) return null;

  return (
    <section>
      <SectionHeader title="Photo of the Day" color="#06b6d4" size="small" />
      <a
        href={`/article/${(pick as any).slug}`}
        className="block group relative overflow-hidden"
        style={{
          background: "var(--bg-section, #151515)",
          border: "3px solid #06b6d4",
        }}
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <div className="zonked-grain absolute inset-0">
            <img
              src={imageUrl}
              alt={(pick as any).title}
              className="zonked-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 text-center"
            style={{
              background: "#000000",
            }}
          >
            <blockquote
              className="text-[10px] sm:text-[11px] font-semibold leading-tight line-clamp-2"
              style={{ color: "#ffffff" }}
            >
              &ldquo;{(pick as any).title}&rdquo;
            </blockquote>
          </div>
        </div>
      </a>
    </section>
  );
}
