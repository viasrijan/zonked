import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/db/queries";

const SITE_URL = "https://zonked.vercel.app";

const CATEGORIES = [
  "bollywood",
  "television",
  "south-cinema",
  "hollywood",
  "korean",
  "fashion",
  "lifestyle",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const articleEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/article/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...categoryEntries,
    ...articleEntries,
  ];
}
