import { config } from "dotenv";
config({ path: ".env.local" });

import { aggregateAllSources, deduplicateAndRank } from "../src/lib/aggregator";

async function main() {
  console.log("[Aggregator] Starting content aggregation...");
  const start = Date.now();

  const items = await aggregateAllSources();
  console.log(`[Aggregator] Fetched ${items.length} raw items`);

  const ranked = deduplicateAndRank(items);
  console.log(`[Aggregator] After dedup: ${ranked.length} unique items`);

  const output = ranked.slice(0, 30).map((item) => ({
    title: item.title,
    content: item.content.slice(0, 500),
    excerpt: item.excerpt.slice(0, 200),
    url: item.url,
    imageUrl: item.imageUrl,
    sourceName: item.sourceName,
    category: item.category,
    publishedAt: item.publishedAt.toISOString(),
  }));

  console.log(JSON.stringify(output, null, 2));
  console.log(`[Aggregator] Done in ${Date.now() - start}ms`);
}

main().catch(console.error);
