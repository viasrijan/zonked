import { getPublishedArticles } from "@/lib/db/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface ArticleLite {
  title: string;
  slug: string;
  content: string;
  category: string;
  publishedAt: Date | string | null;
  sourceName: string | null;
  sourceUrl: string | null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getFirstSentence(content: string): string | null {
  const plain = stripHtml(content);
  const sentences = plain.split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    const trimmed = s.trim();
    if (trimmed.length < 30 || trimmed.length > 200) continue;
    if (/^(according to|here's|here is|let me|tldr)/i.test(trimmed)) continue;
    return trimmed;
  }
  return null;
}

function hashStringToInt(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export async function QuoteOfTheDay() {
  const recent = await getPublishedArticles(50);
  const typed = recent as unknown as ArticleLite[];

  const candidates = typed
    .map((a) => {
      const sentence = getFirstSentence(a.content);
      return sentence ? { ...a, sentence } : null;
    })
    .filter((a): a is ArticleLite & { sentence: string } => a !== null);

  if (candidates.length === 0) return null;

  const today = new Date().toISOString().slice(0, 10);
  const dayKey = `quote-${today}`;
  const idx = hashStringToInt(dayKey) % candidates.length;
  const pick = candidates[idx];

  const shortSentence = pick.sentence.length > 120
    ? pick.sentence.slice(0, 117).replace(/\s+\S*$/, "") + "…"
    : pick.sentence;

  return (
    <section>
      <SectionHeader title="Quote of the Day" color="#a855f7" size="small" />
      <a
        href={`/article/${pick.slug}`}
        className="block p-3 sm:p-4 transition-colors"
        style={{
          background: "var(--bg-section, #151515)",
        }}
      >
        <div
          className="text-2xl sm:text-3xl font-black leading-none mb-1.5 sm:mb-2 select-none"
          style={{ color: "#a855f7", opacity: 0.5 }}
        >
          &ldquo;
        </div>
        <blockquote
          className="text-xs sm:text-sm font-medium leading-snug italic line-clamp-4"
          style={{ color: "var(--text-primary, #ffffff)" }}
        >
          {shortSentence}
        </blockquote>
        <div
          className="mt-2.5 sm:mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider line-clamp-1"
          style={{ color: "var(--text-muted, #999)" }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#a855f7" }} />
          {pick.sourceName || "ZONKED"}
        </div>
      </a>
    </section>
  );
}
