import { config } from "dotenv";
config({ path: ".env.local" });

import { getUnpublishedArticles, updateArticle } from "../src/lib/db/queries";

async function main() {
  console.log("[Publisher] Checking for unpublished articles...");
  const start = Date.now();

  const pending = await getUnpublishedArticles(10);
  console.log(`[Publisher] Found ${pending.length} unpublished articles`);

  for (const article of pending) {
    try {
      await updateArticle(article.id, {
        isPublished: true,
        publishedAt: new Date(),
      });
      console.log(`[Publisher] Published: ${article.title?.slice(0, 60)}...`);
    } catch (err) {
      console.error(`[Publisher] Failed to publish ${article.id}: ${err}`);
    }
  }

  console.log(`[Publisher] Done in ${Date.now() - start}ms`);
}

main().catch(console.error);
