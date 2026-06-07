import { config } from "dotenv";
config({ path: ".env.local" });

import { getDb } from "@/lib/db/queries";
import { articles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

async function main() {
  const db = getDb();
  const result = await db
    .select({ id: articles.id, title: articles.title, slug: articles.slug, category: articles.category, publishedAt: articles.publishedAt })
    .from(articles)
    .where(eq(articles.isPublished, true))
    .orderBy(desc(articles.publishedAt))
    .limit(20);

  console.log('Total articles:', result.length);
  result.forEach((a, i) => {
    const words = a.title.split(/\s+/).filter(Boolean).length;
    const chars = a.title.length;
    console.log(`${i+1}. [${a.category}] ${a.title}`);
    console.log(`   slug: ${a.slug}`);
    console.log(`   words: ${words}, chars: ${chars}`);
    console.log(`   over 12 words: ${words > 12}, over 60 chars: ${chars > 60}`);
    console.log('');
  });
}

main().catch(console.error);
