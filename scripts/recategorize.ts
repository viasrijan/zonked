import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

function inferCategory(title: string, sourceName: string): string {
  const t = title.toLowerCase();

  if (t.includes("kpop") || t.includes("k-pop") || t.includes("k-drama") || t.includes("bts") || t.includes("korean"))
    return "korean";
  if (t.includes("hollywood") || t.includes("marvel") || t.includes("dc") || t.includes("avatar") || t.includes("oscar"))
    return "hollywood";
  if (t.includes("tv") || t.includes("serial") || t.includes("telly") || t.includes("television") || t.includes("channel") || t.includes("anchor") || t.includes("trp"))
    return "television";
  if (t.includes("fashion") || t.includes("style") || t.includes("outfit") || t.includes("wear") || t.includes("couture") || t.includes("ramp") || t.includes("runway") || t.includes("met gala"))
    return "fashion";
  if (t.includes("lifestyle") || t.includes("health") || t.includes("food") || t.includes("fitness") || t.includes("recipe") || t.includes("travel") || t.includes("home") || t.includes("decor"))
    return "lifestyle";
  if (t.includes("south") || t.includes("tamil") || t.includes("telugu") || t.includes("malayalam") || t.includes("kannada") || t.includes("kollywood") || t.includes("tollywood"))
    return "south-cinema";
  if (t.includes("bollywood") || t.includes("bolly") || t.includes("shah") || t.includes("khan") || t.includes("kapoor") || t.includes("deepika") || t.includes("alia") || t.includes("ranbir") || t.includes("ranveer") || t.includes("salman") || t.includes("aamir") || t.includes("hrithik") || t.includes("akshay") || t.includes("priyanka") || t.includes("katrina") || t.includes("kareena") || t.includes("anushka") || t.includes("varun") || t.includes("sidharth") || t.includes("kartik"))
    return "bollywood";

  const s = sourceName.toLowerCase();
  if (s.includes("bollywood") || s.includes("filmfare") || s.includes("koimoi") || s.includes("pinkvilla") || s.includes("hungama"))
    return "bollywood";
  if (s.includes("hollywood"))
    return "hollywood";
  if (s.includes("korean"))
    return "korean";

  return "bollywood";
}

async function main() {
  console.log("Fetching articles with category 'entertainment'...");
  const articles = await sql`
    SELECT id, title, source_name, category FROM articles WHERE category = 'entertainment'
  `;

  console.log(`Found ${articles.length} articles to recategorize.`);

  let updated = 0;
  for (const article of articles) {
    const newCat = inferCategory(article.title, article.source_name);
    if (newCat !== article.category) {
      await sql`
        UPDATE articles SET category = ${newCat} WHERE id = ${article.id}
      `;
      updated++;
      console.log(`  [${newCat}] ${article.title.slice(0, 60)}`);
    }
  }

  console.log(`\nDone! Updated ${updated} articles.`);
}

main().catch(console.error);
