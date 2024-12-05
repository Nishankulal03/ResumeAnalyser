export function calculateExperience(text: string): number {
  const experiencePatterns = [
    /(\d+)\s*(?:\+\s*)?years?\s+(?:of\s+)?experience/i,
    /experience\s*:\s*(\d+)\s*(?:\+\s*)?years?/i,
    /worked\s+(?:for\s+)?(\d+)\s*(?:\+\s*)?years?/i
  ];

  let maxYears = 0;
  for (const pattern of experiencePatterns) {
    const matches = text.match(pattern);
    if (matches && matches[1]) {
      const years = parseInt(matches[1], 10);
      maxYears = Math.max(maxYears, years);
    }
  }

  return maxYears;
}

export function determineExperienceLevel(years: number): string {
  if (years >= 8) return 'Senior';
  if (years >= 4) return 'Mid-Level';
  if (years >= 1) return 'Junior';
  return 'Entry Level';
}