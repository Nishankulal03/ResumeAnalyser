export function calculateFormattingScore(text: string): number {
  let score = 0;
  
  // Check for section headers
  const sections = ['experience', 'education', 'skills', 'projects', 'summary'];
  const foundSections = sections.filter(section => 
    new RegExp(`\\b${section}\\b`, 'i').test(text)
  );
  score += (foundSections.length / sections.length) * 30;

  // Check for bullet points
  const bulletPoints = (text.match(/[•·-]\s+\w+/g) || []).length;
  score += Math.min(bulletPoints / 10, 1) * 20;

  // Check for consistent spacing
  const consistentSpacing = text.match(/\n\s*\n/g)?.length || 0;
  score += Math.min(consistentSpacing / 5, 1) * 20;

  // Check for proper capitalization
  const properCapitalization = (text.match(/\b[A-Z][a-z]+/g) || []).length;
  score += Math.min(properCapitalization / 20, 1) * 30;

  return Math.min(score, 100);
}

export function calculateATSScore(text: string): number {
  let score = 0;
  
  // Check for common ATS-friendly formatting
  if (!/[^\w\s,.-]/.test(text)) score += 20; // Clean formatting
  if (text.includes('summary') || text.includes('objective')) score += 15;
  if (/\b\d{5,}\b/.test(text)) score += 15; // Contains phone numbers/zip codes
  if (/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text)) score += 15; // Contains email
  if (/linkedin\.com/.test(text)) score += 15; // Contains LinkedIn profile
  
  // Check for proper section structure
  const sections = ['experience', 'education', 'skills'];
  const foundSections = sections.filter(section => 
    new RegExp(`\\b${section}\\b`, 'i').test(text)
  );
  score += (foundSections.length / sections.length) * 20;

  return Math.min(score, 100);
}