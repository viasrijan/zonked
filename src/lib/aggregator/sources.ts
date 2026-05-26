export interface RSSSource {
  name: string;
  url: string;
  category: string;
}

export const RSS_SOURCES: RSSSource[] = [
  {
    name: "Pinkvilla",
    url: "https://www.pinkvilla.com/rss.xml",
    category: "entertainment",
  },
  {
    name: "Koimoi",
    url: "https://www.koimoi.com/feed/",
    category: "entertainment",
  },
  {
    name: "Filmfare",
    url: "https://www.filmfare.com/feed",
    category: "entertainment",
  },
  {
    name: "Bollywood Hungama",
    url: "https://www.bollywoodhungama.com/feed/",
    category: "entertainment",
  },
  {
    name: "Hindustan Times Bollywood",
    url: "https://www.hindustantimes.com/feeds/rss/entertainment/bollywood-news.xml",
    category: "bollywood",
  },
  {
    name: "NDTV Entertainment",
    url: "https://www.ndtv.com/rss/entertainment",
    category: "entertainment",
  },
  {
    name: "India Today Entertainment",
    url: "https://www.indiatoday.in/rss/entertainment",
    category: "entertainment",
  },
  {
    name: "Times of India Entertainment",
    url: "https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms",
    category: "entertainment",
  },
];

export const GOOGLE_NEWS_QUERIES = [
  "Bollywood",
  "Indian celebrities",
  "Bollywood gossip",
  "K-pop India",
  "Indian TV shows",
  "South Indian cinema",
  "Bollywood fashion",
];

export const REDDIT_SUBREDDITS = [
  "Bollywood",
  "BollyBlindsNGossip",
  "bollywood",
];
