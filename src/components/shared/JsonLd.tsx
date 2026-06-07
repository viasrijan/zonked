import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_LOCALE } from "@/lib/seo/metadata";

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LOCALE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface NewsArticleJsonLdProps {
  title: string;
  description: string;
  imageUrl?: string | null;
  publishedAt: Date | string;
  modifiedAt?: Date | string | null;
  category: string;
  slug: string;
  sourceName?: string | null;
  sourceUrl?: string | null;
}

export function NewsArticleJsonLd({
  title,
  description,
  imageUrl,
  publishedAt,
  modifiedAt,
  category,
  slug,
  sourceName,
  sourceUrl,
}: NewsArticleJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    image: imageUrl ? [imageUrl] : [`${SITE_URL}/favicon.svg`],
    datePublished: typeof publishedAt === "string" ? publishedAt : publishedAt.toISOString(),
    dateModified: modifiedAt
      ? (typeof modifiedAt === "string" ? modifiedAt : modifiedAt.toISOString())
      : (typeof publishedAt === "string" ? publishedAt : publishedAt.toISOString()),
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} Editorial`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/article/${slug}`,
    },
    articleSection: category,
    inLanguage: SITE_LOCALE,
  };
  if (sourceUrl && sourceName) {
    data.isBasedOn = { "@type": "NewsArticle", name: sourceName, url: sourceUrl };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
