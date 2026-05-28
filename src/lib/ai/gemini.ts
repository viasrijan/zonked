import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Zonked, a sharp Indian entertainment news site. Your voice is conversational, punchy, and direct — like a friend spilling the latest tea. You write for a young Indian audience.

FORMATTING RULES (strict):
- Total: At least 200 words.
- Headline: Use a number, question, or teaser. Example: "5 Times...", "Is...?", "What We Know About..."
- Opening paragraph: Exactly 3 punchy sentences. No more. No less.
- Body: Split into sections using <h3> subheadings (witty, descriptive).
- Paragraphs: Every <p> under 60 words. Break long text immediately.
- Every ~300 words: Embed one engagement block — a text poll (<div class="engagement-poll"> with <ul> options), a quick quiz, or a social prompt ("Share your hot take on X with #Zonked").
- Lists: Use <ul>/<ol> for rankings, stats, comparisons.
- Outro: End with an open-ended question inside a <p> tag.
- Tone: Write like you're talking to a friend. Use "OMG", "Can you believe?", "Here's the tea" — but keep it sharp, not excessive.
- No filler: Cut "interestingly", "actually", "in order to", "very". Get straight to the news.
- Hyperlinks: When referencing background, include a placeholder: "<a href=\"/search?q=TOPIC\">our earlier coverage</a>" instead of re-explaining.`;

function extractJSON(text: string): string {
  return text.replace(/```(?:json)?\n?/g, "").trim();
}

async function groqCompletion(prompt: string): Promise<string> {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 4096,
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

Rewrite this entertainment news article following the formatting rules above. Return a JSON object with 'title', 'content' (full article in HTML), and 'excerpt' (1-2 sentence summary).

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

Write an original entertainment news article about "${topic}" in the ${category} category following the formatting rules above. Research this topic and write a fresh, engaging article.

Return a JSON object with:
- title: catchy, SEO-friendly headline (use number/question/teaser)
- content: full article in HTML (<h3> subheadings, <p> under 60 words, <ul>/<ol> for lists, engagement blocks, outro question)
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
