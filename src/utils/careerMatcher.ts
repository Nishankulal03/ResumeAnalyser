import { CareerMatch, SkillMatch } from '../types';

interface CareerSkillConfig {
  requiredSkills: string[];
  coreSkills: string[];
  weights: { [key: string]: number };
  courses: {
    title: string;
    provider: string;
    skillsCovered: string[];
    url: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    description: string;
  }[];
  suggestions: string[];
}

export const CAREER_PATHS: { [key: string]: CareerSkillConfig } = {
  'Data Analyst': {
    requiredSkills: ['Python', 'SQL', 'Excel', 'Statistics', 'Data Visualization', 'R'],
    coreSkills: ['Python', 'SQL', 'Statistics'],
    weights: {
      'Python': 2.0,
      'SQL': 1.8,
      'Excel': 1.5,
      'Statistics': 1.8,
      'Data Visualization': 1.6,
      'R': 1.4,
      'Machine Learning': 1.3,
      'Data Cleaning': 1.7,
      'BI Tools': 1.5
    },
    courses: [/* ... existing courses ... */],
    suggestions: [/* ... existing suggestions ... */]
  },
  'Data Engineer': {
    requiredSkills: ['Python', 'SQL', 'ETL', 'Big Data', 'AWS', 'Spark'],
    coreSkills: ['ETL', 'Big Data', 'Spark'],
    weights: {
      'Python': 1.5,
      'SQL': 1.6,
      'ETL': 2.0,
      'Big Data': 1.8,
      'AWS': 1.7,
      'Spark': 1.9,
      'Hadoop': 1.6,
      'Data Pipeline': 1.8,
      'Cloud Platforms': 1.7,
      'Data Security': 1.5
    },
    courses: [/* ... existing courses ... */],
    suggestions: [/* ... existing suggestions ... */]
  },
  'Frontend Developer': {
    requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Git'],
    coreSkills: ['JavaScript', 'React', 'TypeScript'],
    weights: {
      'JavaScript': 2.0,
      'React': 1.9,
      'HTML': 1.4,
      'CSS': 1.5,
      'TypeScript': 1.8,
      'Git': 1.3,
      'Testing': 1.6,
      'Performance': 1.7,
      'State Management': 1.7,
      'Build Tools': 1.5
    },
    courses: [/* ... existing courses ... */],
    suggestions: [/* ... existing suggestions ... */]
  },
  'Backend Developer': {
    requiredSkills: ['Node.js', 'Python', 'SQL', 'MongoDB', 'API Design', 'Git'],
    coreSkills: ['Node.js', 'SQL', 'API Design'],
    weights: {
      'Node.js': 2.0,
      'Python': 1.7,
      'SQL': 1.8,
      'MongoDB': 1.6,
      'API Design': 1.9,
      'Git': 1.3,
      'Security': 1.7,
      'Testing': 1.6,
      'Deployment': 1.6,
      'Performance': 1.7
    },
    courses: [/* ... existing courses ... */],
    suggestions: [/* ... existing suggestions ... */]
  },
  'Java Developer': {
    requiredSkills: ['Java', 'Spring', 'SQL', 'Microservices', 'JUnit', 'Git'],
    coreSkills: ['Java', 'Spring', 'Microservices'],
    weights: {
      'Java': 2.0,
      'Spring': 1.9,
      'SQL': 1.6,
      'Microservices': 1.8,
      'JUnit': 1.6,
      'Git': 1.3,
      'Build Tools': 1.5,
      'Containers': 1.7,
      'Cloud Java': 1.6,
      'Security': 1.6
    },
    courses: [/* ... existing courses ... */],
    suggestions: [/* ... existing suggestions ... */]
  }
};

export function analyzeCareerMatches(skills: SkillMatch[]): CareerMatch[] {
  return Object.entries(CAREER_PATHS).map(([role, config]) => {
    let totalWeight = 0;
    let matchedWeight = 0;
    let coreSkillsMatched = 0;

    // Calculate core skills match percentage
    config.coreSkills.forEach(coreSkill => {
      const matchedSkill = skills.find(s => 
        s.skill.toLowerCase() === coreSkill.toLowerCase()
      );
      if (matchedSkill) {
        coreSkillsMatched++;
      }
    });
    const coreSkillsScore = (coreSkillsMatched / config.coreSkills.length) * 100;

    // Calculate weighted skill match
    Object.entries(config.weights).forEach(([skill, weight]) => {
      totalWeight += weight;
      
      const matchedSkill = skills.find(s => 
        s.skill.toLowerCase() === skill.toLowerCase()
      );

      if (matchedSkill) {
        const proficiencyMultiplier = 
          matchedSkill.proficiency === 'Expert' ? 1.0 :
          matchedSkill.proficiency === 'Intermediate' ? 0.7 :
          0.4;

        const experienceMultiplier = matchedSkill.yearsOfExperience 
          ? Math.min(matchedSkill.yearsOfExperience * 0.1 + 1, 1.5)
          : 1;

        const frequencyBonus = Math.min((matchedSkill.frequency || 1) * 0.1, 0.3);
        
        matchedWeight += weight * (proficiencyMultiplier * experienceMultiplier + frequencyBonus);
      }
    });

    // Calculate final match percentage with core skills emphasis
    const skillMatchScore = (matchedWeight / totalWeight) * 100;
    const matchPercentage = Math.round(
      (skillMatchScore * 0.7) + (coreSkillsScore * 0.3)
    );

    return {
      role,
      matchPercentage: Math.min(100, matchPercentage),
      keySkillsPresent: config.requiredSkills.filter(skill => 
        skills.some(s => s.skill.toLowerCase() === skill.toLowerCase())
      ),
      missingSkills: config.requiredSkills.filter(skill => 
        !skills.some(s => s.skill.toLowerCase() === skill.toLowerCase())
      ),
      suggestions: config.suggestions,
      recommendedCourses: config.courses
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}