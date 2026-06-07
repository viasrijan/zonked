export interface ParsedPoll {
  question: string;
  options: string[];
}

export interface ContentSegment {
  type: "html" | "poll";
  html?: string;
  poll?: ParsedPoll;
}

const POLL_REGEX = /<div class="engagement-poll">\s*<p>([\s\S]*?)<\/p>\s*<ul>([\s\S]*?)<\/ul>\s*<\/div>/gi;
const LI_REGEX = /<li>([\s\S]*?)<\/li>/gi;

export function parseArticleContent(content: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(POLL_REGEX)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) {
      segments.push({ type: "html", html: content.slice(lastIndex, matchIndex) });
    }
    const question = stripTags(match[1]).trim();
    const options: string[] = [];
    for (const li of match[2].matchAll(LI_REGEX)) {
      options.push(stripTags(li[1]).trim());
    }
    if (question && options.length >= 2) {
      segments.push({ type: "poll", poll: { question, options } });
    } else {
      segments.push({ type: "html", html: match[0] });
    }
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({ type: "html", html: content.slice(lastIndex) });
  }

  return segments;
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}
