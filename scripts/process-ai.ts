import { config } from "dotenv";
config({ path: ".env.local" });

import { generateOriginalArticle, generateTrendingTopics } from "../src/lib/ai/gemini";

async function main() {
  console.log("[AI Processor] Generating trending topics...");
  const start = Date.now();

  const topics = await generateTrendingTopics();
  console.log(`[AI Processor] Found ${topics.length} trending topics`);

  for (const t of topics) {
    try {
      console.log(`[AI Processor] Writing article about: ${t.topic}`);
      const article = await generateOriginalArticle(t.topic, t.category);
      console.log(`  -> Title: ${article.title}`);
      console.log(`  -> Tags: ${article.tags?.join(", ")}`);
      console.log(`  -> Excerpt: ${article.excerpt?.slice(0, 100)}...`);
    } catch (err) {
      console.error(`  -> Failed: ${err}`);
    }
  }

  console.log(`[AI Processor] Done in ${Date.now() - start}ms`);
}

main().catch(console.error);
