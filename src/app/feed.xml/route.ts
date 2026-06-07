import { getPublishedArticles } from "@/lib/db/queries";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_LOCALE } from "@/lib/seo/metadata";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const revalidate = 1800;

export async function GET() {
  const articles = await getPublishedArticles(50);
  const buildDate = new Date().toUTCString();

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/article/${a.slug}`;
      const pubDate = (a.publishedAt instanceof Date ? a.publishedAt : new Date(a.publishedAt || Date.now())).toUTCString();
      const desc = stripHtml(a.excerpt || "");
      const image = a.imageUrl || a.imageBlobUrl;
      return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(desc)}</description>
      <category>${escapeXml(a.category || "general")}</category>${image ? `
      <enclosure url="${escapeXml(image)}" type="image/jpeg" length="0" />` : ""}${a.sourceUrl ? `
      <source url="${escapeXml(a.sourceUrl)}">${escapeXml(a.sourceName || "Source")}</source>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>${SITE_LOCALE}</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
