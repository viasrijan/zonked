import { getDb } from "../src/lib/db/queries";
import { articles } from "../src/lib/db/schema";
import { truncateTitle, decodeHtmlEntities } from "../src/lib/utils/formatTitle";
import { eq } from "drizzle-orm";

async function reformatTitles() {
  const db = getDb();
  const all = await db.select({ id: articles.id, title: articles.title, slug: articles.slug }).from(articles);
  console.log(`Found ${all.length} articles`);

  let updated = 0;
  for (const article of all) {
    const decoded = decodeHtmlEntities(article.title);
    const truncated = truncateTitle(decoded);
    if (truncated !== article.title) {
      await db.update(articles).set({ title: truncated }).where(eq(articles.id, article.id));
      updated++;
      console.log(`Updated: "${article.title}" → "${truncated}"`);
    }
  }
  console.log(`Done. Updated ${updated} of ${all.length} articles.`);
  process.exit(0);
}

reformatTitles().catch((err) => {
  console.error(err);
  process.exit(1);
});
