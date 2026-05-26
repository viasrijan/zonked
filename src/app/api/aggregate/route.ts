import { NextResponse } from "next/server";
import { aggregateAllSources, deduplicateAndRank } from "@/lib/aggregator";
import { rewriteArticle } from "@/lib/ai/gemini";
import { insertArticle } from "@/lib/db/queries";
import { isDuplicate } from "@/lib/utils/deduplicate";
import { slugify } from "@/lib/utils/slugify";
import { getDb } from "@/lib/db/queries";
import { articles } from "@/lib/db/schema";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

async function getExistingTitles(): Promise<string[]> {
  try {
    const db = getDb();
    const result = await db
      .select({ title: articles.title })
      .from(articles)
      .limit(500);
    return result.map((r) => r.title);
  } catch {
    return [];
  }
}

async function tryAiRewrite(
  title: string,
  content: string,
  sourceName: string
): Promise<{ title: string; content: string; excerpt: string } | null> {
  try {
    return await rewriteArticle(title, content, sourceName);
  } catch (err) {
    console.warn("[Aggregate] AI rewrite failed, using raw content:", String(err).slice(0, 100));
    return null;
  }
}

export async function GET() {
  try {
    console.log("[Aggregate API] Starting aggregation...");

    const rawItems = await aggregateAllSources();
    const ranked = deduplicateAndRank(rawItems);
    const existingTitles = await getExistingTitles();

    let aiCount = 0;
    let rawCount = 0;
    let skipCount = 0;

    for (const item of ranked.slice(0, 15)) {
      if (isDuplicate(item.title, existingTitles)) {
        skipCount++;
        continue;
      }

      try {
        const rewritten = await tryAiRewrite(
          item.title,
          item.content,
          item.sourceName
        );

        const finalTitle = rewritten?.title || item.title;
        const finalContent = rewritten?.content || `<p>${item.content}</p>`;
        const finalExcerpt = rewritten?.excerpt || item.excerpt.slice(0, 200);
        const articleSlug = slugify(finalTitle);

        const tags = [
          item.sourceName.toLowerCase().replace(/[^a-z0-9]/g, ""),
          item.category,
        ].filter(Boolean);

        await insertArticle({
          title: finalTitle,
          slug: articleSlug,
          excerpt: finalExcerpt,
          content: finalContent,
          imageUrl: item.imageUrl,
          sourceName: item.sourceName,
          sourceUrl: item.url,
          category: item.category,
          tags: tags,
          isPublished: true,
          isAiGenerated: !!rewritten,
          publishedAt: new Date(),
        });

        existingTitles.push(finalTitle);
        if (rewritten) {
          aiCount++;
        } else {
          rawCount++;
        }
        console.log(`[Aggregate] Published: ${finalTitle.slice(0, 60)}...`);
      } catch (err) {
        console.error(`[Aggregate] Failed:`, err);
        skipCount++;
      }
    }

    return NextResponse.json({
      success: true,
      fetched: rawItems.length,
      deduped: ranked.length,
      aiPublished: aiCount,
      rawPublished: rawCount,
      skipped: skipCount,
    });
  } catch (error) {
    console.error("[Aggregate] Error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
