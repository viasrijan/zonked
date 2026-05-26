import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Zonked, a modern Indian entertainment news website like Pinkvilla. Your tone is exciting, gossipy, and engaging. You write for a young Indian audience interested in Bollywood, TV, South Cinema, Hollywood, Korean entertainment, fashion, and lifestyle.`;

function extractJSON(text: string): string {
  return text.replace(/```(?:json)?\n?/g, "").trim();
}

async function groqCompletion(prompt: string): Promise<string> {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2048,
  });
  return res.choices[0]?.message?.content || "";
}

async function geminiCompletion(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const res = await model.generateContent(prompt);
  return res.response.text();
}

async function aiCompletion(prompt: string): Promise<string> {
  if (process.env.GROQ_API_KEY) {
    try {
      return await groqCompletion(prompt);
    } catch (err) {
      console.warn("[AI] Groq failed, falling back to Gemini:", String(err).slice(0, 100));
    }
  }
  if (process.env.GEMINI_API_KEY) {
    try {
      return await geminiCompletion(prompt);
    } catch (err) {
      console.warn("[AI] Gemini also failed:", String(err).slice(0, 100));
    }
  }
  throw new Error("No AI provider available (set GROQ_API_KEY or GEMINI_API_KEY)");
}

export async function rewriteArticle(
  title: string,
  content: string,
  sourceName: string
): Promise<{ title: string; content: string; excerpt: string }> {
  const prompt = `${SYSTEM_PROMPT}

Rewrite this entertainment news article in your own unique voice. Make it engaging and gossipy. Return a JSON object with 'title', 'content' (full article in HTML paragraphs), and 'excerpt' (1-2 sentence summary).

Original Title: ${title}
Original Source: ${sourceName}
Original Content: ${content.slice(0, 3000)}

Return ONLY valid JSON with keys: title, content, excerpt.`;

  const text = await aiCompletion(prompt);
  return JSON.parse(extractJSON(text));
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
  const prompt = `${SYSTEM_PROMPT}

Write an original entertainment news article about "${topic}" in the ${category} category. Research this topic and write a fresh, engaging article as if you're breaking the news first.

Return a JSON object with:
- title: catchy, SEO-friendly headline
- content: full article in HTML paragraphs (use <p> tags)
- excerpt: 1-2 sentence summary
- tags: array of 3-6 relevant tags

Return ONLY valid JSON.`;

  const text = await aiCompletion(prompt);
  return JSON.parse(extractJSON(text));
}

export async function generateTrendingTopics(): Promise<
  { topic: string; category: string }[]
> {
  const prompt = `${SYSTEM_PROMPT}

What are 5 currently trending topics in Indian entertainment right now? Consider Bollywood, TV, South Indian cinema, Hollywood, K-pop/K-drama, fashion, and lifestyle.

Return a JSON array of objects with keys: topic (string), category (string - one of: bollywood, television, south-cinema, hollywood, korean, fashion, lifestyle).

Keep topics specific and newsworthy. Return ONLY valid JSON array.`;

  const text = await aiCompletion(prompt);
  return JSON.parse(extractJSON(text));
}
