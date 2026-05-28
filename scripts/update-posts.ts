import "dotenv/config";
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { articles } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL not set");

const neonClient = neon(databaseUrl);
const db = drizzle(neonClient);

// Category mapping: old -> new
const CATEGORY_MAP: Record<string, string> = {
  bollywood: "film",
  television: "tv",
  "south-cinema": "film",
  hollywood: "film",
  korean: "celebs",
  fashion: "fashion",
  lifestyle: "lifestyle",
};

// Unsplash images by category (reliable, direct URLs)
const CATEGORY_IMAGES: Record<string, string[]> = {
  film: [
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=600&fit=crop",
  ],
  tv: [
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&h=600&fit=crop",
  ],
  celebs: [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop",
  ],
  fashion: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=600&fit=crop",
  ],
  lifestyle: [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
  ],
  dating: [
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop",
  ],
  internet: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&h=600&fit=crop",
  ],
};

async function updatePosts() {
  console.log("Updating posts to new categories and adding images...");

  // Get all posts
  const allPosts = await db.select().from(articles);
  console.log(`Found ${allPosts.length} posts`);

  let updatedCount = 0;
  let imageAddedCount = 0;

  for (const post of allPosts) {
    const oldCategory = post.category;
    const newCategory = CATEGORY_MAP[oldCategory] || oldCategory;
    const needsImage = !post.imageUrl && !post.imageBlobUrl;

    if (newCategory !== oldCategory || needsImage) {
      const updates: any = {};

      if (newCategory !== oldCategory) {
        updates.category = newCategory;
        console.log(`  ${post.title.substring(0, 40)}... : ${oldCategory} -> ${newCategory}`);
        updatedCount++;
      }

      if (needsImage) {
        const images = CATEGORY_IMAGES[newCategory] || CATEGORY_IMAGES.film;
        const randomIndex = Math.floor(Math.random() * images.length);
        updates.imageUrl = images[randomIndex];
        imageAddedCount++;
      }

      await db.update(articles).set(updates).where(eq(articles.id, post.id));
    }
  }

  console.log(`\nUpdated ${updatedCount} posts to new categories`);
  console.log(`Added images to ${imageAddedCount} posts`);
}

updatePosts();
