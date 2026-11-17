import { LostReport, FoundReport } from '@/types';

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

export function calculateMatchScore(lost: LostReport, found: FoundReport): number {
  let score = 0;

  // Category match (30 points)
  if (lost.category === found.category) {
    score += 30;
  }

  // Item name similarity (40 points)
  const lostNameTokens = tokenize(lost.item_name);
  const foundNameTokens = tokenize(found.item_name);
  score += jaccardSimilarity(lostNameTokens, foundNameTokens) * 40;

  // Description similarity (20 points)
  const lostDescTokens = tokenize(lost.description);
  const foundDescTokens = tokenize(found.description);
  score += jaccardSimilarity(lostDescTokens, foundDescTokens) * 20;

  // Location similarity (10 points)
  const lostLocTokens = tokenize(lost.last_seen_location);
  const foundLocTokens = tokenize(found.found_location);
  score += jaccardSimilarity(lostLocTokens, foundLocTokens) * 10;

  return Math.round(score);
}

export function findMatches(
  lostReport: LostReport,
  foundReports: FoundReport[],
  threshold = 20
): Array<{ report: FoundReport; score: number }> {
  return foundReports
    .map((found) => ({
      report: found,
      score: calculateMatchScore(lostReport, found),
    }))
    .filter((m) => m.score >= threshold)
    .sort((a, b) => b.score - a.score);
}

export function findMatchesForFound(
  foundReport: FoundReport,
  lostReports: LostReport[],
  threshold = 20
): Array<{ report: LostReport; score: number }> {
  return lostReports
    .map((lost) => ({
      report: lost,
      score: calculateMatchScore(lost, foundReport),
    }))
    .filter((m) => m.score >= threshold)
    .sort((a, b) => b.score - a.score);
}
