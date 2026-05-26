import { NextRequest, NextResponse } from "next/server";
import {
  getPublishedArticles,
  getArticlesByCategory,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    const articles = category
      ? await getArticlesByCategory(category, limit, offset)
      : await getPublishedArticles(limit, offset);

    return NextResponse.json({
      articles: articles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        imageUrl: a.imageUrl || a.imageBlobUrl,
        category: a.category,
        tags: a.tags,
        publishedAt: a.publishedAt,
        viewCount: a.viewCount,
      })),
      total: articles.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
