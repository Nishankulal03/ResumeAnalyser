import { SkillMatch } from '../types';
import { SKILL_PATTERNS, SKILL_WEIGHTS, SKILL_CATEGORIES } from './skillPatterns';

interface SkillContext {
  beforeText: string;
  afterText: string;
  fullSentence: string;
}

function findSkillContext(text: string, skillPattern: RegExp): SkillContext[] {
  const contexts: SkillContext[] = [];
  const sentences = text.split(/[.!?]+/);

  sentences.forEach(sentence => {
    if (skillPattern.test(sentence)) {
      const match = skillPattern.exec(sentence);
      if (match) {
        const startIndex = match.index;
        contexts.push({
          beforeText: sentence.slice(Math.max(0, startIndex - 50), startIndex).trim(),
          afterText: sentence.slice(startIndex + match[0].length, startIndex + match[0].length + 50).trim(),
          fullSentence: sentence.trim()
        });
      }
    }
  });

  return contexts;
}

function analyzeSkillProficiency(
  contexts: SkillContext[],
  yearsOfExperience: number | undefined,
  frequency: number
): 'Beginner' | 'Intermediate' | 'Expert' {
  const expertKeywords = /\b(expert|advanced|senior|lead|architect|specialist)\b/i;
  const intermediateKeywords = /\b(intermediate|mid-level|moderate|proficient)\b/i;
  const beginnerKeywords = /\b(junior|beginner|basic|learning|studying)\b/i;

  const hasExpertContext = contexts.some(ctx => 
    expertKeywords.test(ctx.fullSentence)
  );
  const hasIntermediateContext = contexts.some(ctx => 
    intermediateKeywords.test(ctx.fullSentence)
  );
  const hasBeginnerContext = contexts.some(ctx => 
    beginnerKeywords.test(ctx.fullSentence)
  );

  if (hasExpertContext || yearsOfExperience >= 4 || frequency >= 4) {
    return 'Expert';
  }
  if (hasIntermediateContext || yearsOfExperience >= 2 || frequency >= 2) {
    return 'Intermediate';
  }
  if (hasBeginnerContext || yearsOfExperience === 0) {
    return 'Beginner';
  }

  return frequency > 1 ? 'Intermediate' : 'Beginner';
}

export function extractSkillMatches(text: string): SkillMatch[] {
  const normalizedText = text.toLowerCase();
  const skills: SkillMatch[] = [];

  Object.entries(SKILL_PATTERNS).forEach(([skillName, pattern]) => {
    const matches = normalizedText.match(pattern) || [];
    const frequency = matches.length;

    if (frequency > 0) {
      const contexts = findSkillContext(normalizedText, pattern);
      const yearsPattern = new RegExp(
        `(\\d+)\\s*(?:year|yr)s?\\s*(?:of)?\\s*(?:experience)?\\s*(?:with|in)?\\s*${skillName}`,
        'i'
      );
      const yearsMatch = normalizedText.match(yearsPattern);
      const yearsOfExperience = yearsMatch ? Math.min(parseInt(yearsMatch[1], 10), 20) : undefined;

      const proficiency = analyzeSkillProficiency(contexts, yearsOfExperience, frequency);
      
      // Find the category for this skill
      const category = Object.entries(SKILL_CATEGORIES).find(([_, skills]) => 
        skills.includes(skillName)
      )?.[0] || 'Other';

      skills.push({
        skill: skillName.charAt(0).toUpperCase() + skillName.slice(1),
        matched: true,
        proficiency,
        yearsOfExperience,
        frequency,
        category
      });
    }
  });

  return skills;
}

export function calculateSkillScore(skills: SkillMatch[]): number {
  let totalScore = 0;
  let maxPossibleScore = 0;

  for (const skill of skills) {
    const weight = SKILL_WEIGHTS[skill.skill.toLowerCase()] || 1.0;
    maxPossibleScore += weight * 100;

    if (skill.matched) {
      const proficiencyMultiplier = 
        skill.proficiency === 'Expert' ? 1.0 :
        skill.proficiency === 'Intermediate' ? 0.7 :
        0.4;

      const frequencyBonus = Math.min((skill.frequency || 1) * 0.1, 0.3);
      const experienceBonus = skill.yearsOfExperience 
        ? Math.min(skill.yearsOfExperience * 0.05, 0.2)
        : 0;

      totalScore += weight * 100 * (proficiencyMultiplier + frequencyBonus + experienceBonus);
    }
  }

  return Math.min(100, (totalScore / maxPossibleScore) * 100);
}