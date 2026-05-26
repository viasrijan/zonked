import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { articles, categories } from "./schema";
import { desc, eq, sql, ilike, and, isNull, isNotNull } from "drizzle-orm";

let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!db) {
    const sqlConnection = neon(process.env.DATABASE_URL!);
    db = drizzle(sqlConnection);
  }
  return db;
}

export async function getPublishedArticles(limit = 20, offset = 0) {
  const db = getDb();
  return await db
    .select()
    .from(articles)
    .where(eq(articles.isPublished, true))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getArticlesByCategory(
  category: string,
  limit = 20,
  offset = 0
) {
  const db = getDb();
  return await db
    .select()
    .from(articles)
    .where(
      and(eq(articles.category, category), eq(articles.isPublished, true))
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getArticleBySlug(slug: string) {
  const db = getDb();
  const result = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);
  return result[0] || null;
}

export async function getFeaturedArticles(limit = 5) {
  const db = getDb();
  return await db
    .select()
    .from(articles)
    .where(eq(articles.isPublished, true))
    .orderBy(desc(articles.viewCount), desc(articles.publishedAt))
    .limit(limit);
}

export async function searchArticles(query: string, limit = 20) {
  const db = getDb();
  const pattern = `%${query}%`;
  return await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.isPublished, true),
        sql`(${ilike(articles.title, pattern)} OR ${ilike(articles.content, pattern)} OR ${ilike(articles.excerpt, sql`${pattern}`)})`
      )
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getRelatedArticles(
  category: string,
  excludeSlug: string,
  limit = 4
) {
  const db = getDb();
  return await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.category, category),
        eq(articles.isPublished, true),
        sql`${articles.slug} != ${excludeSlug}`
      )
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getTrendingArticles(limit = 6) {
  const db = getDb();
  return await db
    .select()
    .from(articles)
    .where(eq(articles.isPublished, true))
    .orderBy(desc(articles.viewCount))
    .limit(limit);
}

export async function insertArticle(article: typeof articles.$inferInsert) {
  const db = getDb();
  return await db.insert(articles).values(article).returning();
}

export async function updateArticle(
  id: string,
  data: Partial<typeof articles.$inferInsert>
) {
  const db = getDb();
  return await db
    .update(articles)
    .set(data)
    .where(eq(articles.id, id))
    .returning();
}

export async function getUnpublishedArticles(limit = 10) {
  const db = getDb();
  return await db
    .select()
    .from(articles)
    .where(
      and(eq(articles.isPublished, false), isNotNull(articles.content))
    )
    .orderBy(desc(articles.createdAt))
    .limit(limit);
}

export async function incrementViewCount(slug: string) {
  const db = getDb();
  await db
    .update(articles)
    .set({ viewCount: sql`${articles.viewCount} + 1` })
    .where(eq(articles.slug, slug));
}

export async function getAllSlugs() {
  const db = getDb();
  const result = await db
    .select({ slug: articles.slug })
    .from(articles)
    .where(eq(articles.isPublished, true));
  return result.map((r) => r.slug);
}

export { articles, categories };
