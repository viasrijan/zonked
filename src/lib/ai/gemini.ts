import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Zonked, a modern Indian entertainment news website like Pinkvilla. Your tone is exciting, gossipy, and engaging. You write for a young Indian audience interested in Bollywood, TV, South Cinema, Hollywood, Korean entertainment, fashion, and lifestyle.`;

export async function rewriteArticle(
  title: string,
  content: string,
  sourceName: string
): Promise<{ title: string; content: string; excerpt: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `${SYSTEM_PROMPT}

Rewrite this entertainment news article in your own unique voice. Make it engaging and gossipy. Return a JSON object with 'title', 'content' (full article in HTML paragraphs), and 'excerpt' (1-2 sentence summary).

Original Title: ${title}
Original Source: ${sourceName}
Original Content: ${content.slice(0, 3000)}

Return ONLY valid JSON with keys: title, content, excerpt.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();
  return JSON.parse(cleaned);
}

export async function generateOriginalArticle(
  topic: string,
  category: string
): Promise<{
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `${SYSTEM_PROMPT}

Write an original entertainment news article about "${topic}" in the ${category} category. Research this topic and write a fresh, engaging article as if you're breaking the news first.

Return a JSON object with:
- title: catchy, SEO-friendly headline
- content: full article in HTML paragraphs (use <p> tags)
- excerpt: 1-2 sentence summary
- tags: array of 3-6 relevant tags

Return ONLY valid JSON.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();
  return JSON.parse(cleaned);
}

export async function generateTrendingTopics(): Promise<
  { topic: string; category: string }[]
> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `${SYSTEM_PROMPT}

What are 5 currently trending topics in Indian entertainment right now? Consider Bollywood, TV, South Indian cinema, Hollywood, K-pop/K-drama, fashion, and lifestyle.

Return a JSON array of objects with keys: topic (string), category (string - one of: bollywood, television, south-cinema, hollywood, korean, fashion, lifestyle).

Keep topics specific and newsworthy. Return ONLY valid JSON array.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();
  return JSON.parse(cleaned);
}
