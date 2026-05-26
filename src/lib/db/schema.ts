import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  imageBlobUrl: text("image_blob_url"),
  sourceName: text("source_name"),
  sourceUrl: text("source_url"),
  category: text("category").notNull().default("entertainment"),
  tags: text("tags").array(),
  isPublished: boolean("is_published").default(false),
  isAiGenerated: boolean("is_ai_generated").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  viewCount: integer("view_count").default(0),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});
