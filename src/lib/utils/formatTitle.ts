export function decodeHtmlEntities(text: string): string {
  let prev: string;
  let current = text;
  do {
    prev = current;
    current = current
      .replace(/&amp;/g, "&")
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&#x22;/g, '"')
      .replace(/&#34;/g, '"')
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  } while (current !== prev);
  return current;
}

export function truncateTitle(title: string, maxWords = 14, maxChars = 60): string {
  const words = title.split(/\s+/).filter(Boolean);
  let result = words.slice(0, maxWords).join(" ");
  if (result.length > maxChars) {
    result = result.slice(0, maxChars).replace(/\s+\S*$/, "");
  }
  return result;
}

export function getReadingTime(text: string, wordsPerMinute = 200): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export interface FormattedTitle {
  lines: string[];
  truncated: boolean;
}

export function formatTitleLines(
  title: string,
  maxLines = 3,
  maxCharsPerLine = 22
): FormattedTitle {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length === 0) return { lines: [""], truncated: false };
  
  // Truncate to max 14 words
  const maxWords = 14;
  const truncatedWords = words.length > maxWords ? words.slice(0, maxWords) : words;
  const wordCount = truncatedWords.length;
  const truncated = words.length > maxWords;
  
  // Determine number of lines based on word count
  // 1-5 words: 1 line, 6-10 words: 2 lines, 11-14 words: 3 lines
  let numLines: number;
  if (wordCount <= 5) numLines = 1;
  else if (wordCount <= 10) numLines = 2;
  else numLines = 3;
  
  // Don't exceed maxLines
  numLines = Math.min(numLines, maxLines);
  
  // If only 1 line needed, just return the title
  if (numLines === 1) {
    return { lines: [truncatedWords.join(" ")], truncated };
  }
  
  // Distribute words evenly across lines
  const wordsPerLine = Math.ceil(wordCount / numLines);
  const lines: string[] = [];
  
  for (let i = 0; i < wordCount; i += wordsPerLine) {
    const lineWords = truncatedWords.slice(i, i + wordsPerLine);
    const line = lineWords.join(" ");
    
    if (line.length <= maxCharsPerLine) {
      lines.push(line);
    } else {
      const truncatedLine = line.slice(0, maxCharsPerLine - 1).trimEnd() + "…";
      lines.push(truncatedLine);
    }
    
    if (lines.length >= numLines) break;
  }
  
  // Ensure we have exactly numLines
  while (lines.length < numLines) lines.push("");
  
  return { lines: lines.slice(0, numLines), truncated };
}
