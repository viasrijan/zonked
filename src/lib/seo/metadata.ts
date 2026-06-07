import { Metadata } from "next";
import { getArticleBySlug } from "@/lib/db/queries";

export const SITE_NAME = "ZONKED";
export const SITE_URL = "https://zonked.vercel.app";
export const SITE_DESCRIPTION =
  "Global entertainment news: Hollywood movies, Netflix & streaming, celebrity gossip, K-pop, music, fashion, and pop culture — updated every 30 minutes.";
export const SITE_LOCALE = "en_US";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  film: {
    title: "Film",
    description:
      "Latest Hollywood film news, reviews, box office numbers, and industry updates from Variety, Deadline, The Hollywood Reporter and more.",
  },
  tv: {
    title: "TV & Streaming",
    description:
      "TV and streaming news: Netflix, Disney+, HBO, Hulu, Apple TV+, new shows, renewals, cancellations, and reviews.",
  },
  celebs: {
    title: "Celebs",
    description:
      "Celebrity gossip, news, and updates on your favorite stars from People, E! News, TMZ, Just Jared, and Entertainment Weekly.",
  },
  fashion: {
    title: "Fashion",
    description:
      "Red carpet fashion, designer news, trends, and celebrity style updates.",
  },
  lifestyle: {
    title: "Lifestyle",
    description:
      "Celebrity lifestyle news: homes, travel, food, wellness, and personal updates.",
  },
  dating: {
    title: "Dating",
    description:
      "Celebrity dating news, relationships, breakups, engagements, and hookups.",
  },
  internet: {
    title: "Internet & Music",
    description:
      "Internet culture, K-pop, viral moments, music industry news, and trending online content.",
  },
};

export function getCategoryMeta(slug: string) {
  return CATEGORY_META[slug] || { title: slug, description: `Latest ${slug} news on ZONKED.` };
}

export function buildCategoryMetadata(slug: string): Metadata {
  const meta = getCategoryMeta(slug);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
    openGraph: {
      title: `${meta.title} | ${SITE_NAME}`,
      description: meta.description,
      url: `${SITE_URL}/${slug}`,
      siteName: SITE_NAME,
      type: "website",
      locale: SITE_LOCALE,
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | ${SITE_NAME}`,
      description: meta.description,
    },
  };
}

export async function buildArticleMetadata(slug: string): Promise<Metadata> {
  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "Not Found" };
  }
  const description = article.excerpt || article.title;
  const imageUrl = article.imageUrl || article.imageBlobUrl;
  const category = article.category || "film";
  const catMeta = getCategoryMeta(category);
  const url = `${SITE_URL}/article/${slug}`;
  const keywords = [
    catMeta.title,
    category,
    "entertainment news",
    "celebrity",
    SITE_NAME,
  ];
  return {
    title: article.title,
    description,
    keywords,
    authors: [{ name: `${SITE_NAME} Editorial` }],
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      locale: SITE_LOCALE,
      publishedTime: article.publishedAt?.toISOString(),
      authors: [`${SITE_NAME} Editorial`],
      section: catMeta.title,
      images: imageUrl ? [{ url: imageUrl, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
