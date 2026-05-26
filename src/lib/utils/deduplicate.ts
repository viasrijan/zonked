export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function titleSimilarity(a: string, b: string): number {
  const normA = normalizeTitle(a);
  const normB = normalizeTitle(b);
  if (normA === normB) return 1;
  const wordsA = new Set(normA.split(" "));
  const wordsB = new Set(normB.split(" "));
  const intersection = new Set([...wordsA].filter((w) => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);
  return intersection.size / union.size;
}

export function isDuplicate(
  title: string,
  existingTitles: string[],
  threshold = 0.75
): boolean {
  return existingTitles.some((t) => titleSimilarity(title, t) >= threshold);
}
