export interface RSSSource {
  name: string;
  url: string;
  category: string;
}

export const RSS_SOURCES: RSSSource[] = [
  {
    name: "Pinkvilla",
    url: "https://www.pinkvilla.com/rss.xml",
    category: "bollywood",
  },
  {
    name: "Koimoi",
    url: "https://www.koimoi.com/feed/",
    category: "bollywood",
  },
  {
    name: "Filmfare",
    url: "https://www.filmfare.com/feed",
    category: "bollywood",
  },
  {
    name: "Bollywood Hungama",
    url: "https://www.bollywoodhungama.com/feed/",
    category: "bollywood",
  },
  {
    name: "Hindustan Times Bollywood",
    url: "https://www.hindustantimes.com/feeds/rss/entertainment/bollywood-news.xml",
    category: "bollywood",
  },
  {
    name: "NDTV Entertainment",
    url: "https://www.ndtv.com/rss/entertainment",
    category: "bollywood",
  },
  {
    name: "India Today Entertainment",
    url: "https://www.indiatoday.in/rss/entertainment",
    category: "bollywood",
  },
  {
    name: "Times of India Entertainment",
    url: "https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms",
    category: "bollywood",
  },
];

export const GOOGLE_NEWS_CATEGORIES: { query: string; category: string }[] = [
  { query: "Bollywood", category: "bollywood" },
  { query: "Indian celebrities", category: "bollywood" },
  { query: "Bollywood gossip", category: "bollywood" },
  { query: "K-pop India", category: "korean" },
  { query: "Indian TV shows", category: "television" },
  { query: "South Indian cinema", category: "south-cinema" },
  { query: "Bollywood fashion", category: "fashion" },
];

export const REDDIT_SUBREDDITS = [
  "Bollywood",
  "BollyBlindsNGossip",
  "bollywood",
];
