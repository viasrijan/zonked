import { NextResponse } from "next/server";
import { aggregateAllSources, deduplicateAndRank } from "@/lib/aggregator";
import { rewriteArticle, generateOriginalArticle } from "@/lib/ai/gemini";
import { insertArticle } from "@/lib/db/queries";
import { isDuplicate } from "@/lib/utils/deduplicate";
import { slugify } from "@/lib/utils/slugify";
import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db/queries";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

export async function GET() {
  try {
    console.log("[Aggregate API] Starting aggregation...");

    const rawItems = await aggregateAllSources();
    const ranked = deduplicateAndRank(rawItems);
    const existingTitles = await getExistingTitles();

    let newCount = 0;
    let skipCount = 0;

    for (const item of ranked.slice(0, 15)) {
      if (isDuplicate(item.title, existingTitles)) {
        skipCount++;
        continue;
      }

      try {
        const rewritten = await rewriteArticle(
          item.title,
          item.content,
          item.sourceName
        );

        const articleSlug = slugify(rewritten.title);

        await insertArticle({
          title: rewritten.title,
          slug: articleSlug,
          excerpt: rewritten.excerpt,
          content: rewritten.content,
          imageUrl: item.imageUrl,
          sourceName: item.sourceName,
          sourceUrl: item.url,
          category: item.category,
          tags: [item.sourceName.toLowerCase()],
          isPublished: false,
          isAiGenerated: true,
        });

        existingTitles.push(rewritten.title);
        newCount++;
        console.log(`[Aggregate] Processed: ${rewritten.title.slice(0, 60)}...`);
      } catch (err) {
        console.error(`[Aggregate] Failed to process "${item.title}":`, err);
        skipCount++;
      }
    }

    return NextResponse.json({
      success: true,
      fetched: rawItems.length,
      deduped: ranked.length,
      published: newCount,
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
