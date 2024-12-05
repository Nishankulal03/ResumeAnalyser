import { CareerMatch, SkillMatch } from '../types';

export function generateSuggestions(
  text: string,
  careerMatches: CareerMatch[],
  skills: SkillMatch[]
): string[] {
  const suggestions: string[] = [];
  
  // Get the top career match
  const topCareer = careerMatches.reduce((prev, current) => 
    (current.matchPercentage > prev.matchPercentage) ? current : prev
  );

  if (topCareer) {
    // Career-specific suggestions
    if (topCareer.missingSkills.length > 0) {
      suggestions.push(
        `Focus on acquiring these key ${topCareer.role} skills: ${topCareer.missingSkills.join(', ')}`
      );
    }

    // Role-specific certifications
    const certificationSuggestions = {
      'Data Analyst': 'Consider pursuing certifications like Google Data Analytics or IBM Data Analyst Professional Certificate',
      'Data Engineer': 'Look into AWS Certified Data Analytics or Google Cloud Professional Data Engineer certifications',
      'Frontend Developer': 'Consider React certification or Advanced Frontend Masters workshops',
      'Backend Developer': 'Pursue AWS Developer Associate or Node.js certification',
      'Java Developer': 'Consider Oracle Java certification or Spring Professional certification'
    };

    if (certificationSuggestions[topCareer.role]) {
      suggestions.push(certificationSuggestions[topCareer.role]);
    }

    // Skill improvement suggestions
    const beginnerSkills = skills.filter(s => s.proficiency === 'Beginner');
    if (beginnerSkills.length > 0) {
      const relevantBeginnerSkills = beginnerSkills.filter(skill =>
        topCareer.keySkillsPresent.includes(skill.skill) ||
        topCareer.missingSkills.includes(skill.skill)
      );
      
      if (relevantBeginnerSkills.length > 0) {
        suggestions.push(
          `Improve proficiency in these important skills: ${relevantBeginnerSkills.map(s => s.skill).join(', ')}`
        );
      }
    }
  }

  // Portfolio and project suggestions
  if (!text.includes('github.com')) {
    suggestions.push('Create a GitHub portfolio showcasing projects that demonstrate your technical skills');
  }

  if (!text.includes('project') && topCareer) {
    suggestions.push(
      `Build practical projects using ${topCareer.keySkillsPresent.slice(0, 3).join(', ')} to strengthen your portfolio`
    );
  }

  // Professional development
  if (!text.includes('linkedin.com')) {
    suggestions.push('Create a strong LinkedIn profile highlighting your technical expertise and projects');
  }

  return suggestions.slice(0, 5); // Return top 5 most relevant suggestions
}