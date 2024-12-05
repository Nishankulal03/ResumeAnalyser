export interface ResumeScore {
  overall: number;
  keywords: number;
  formatting: number;
  atsCompatibility: number;
}

export interface SkillMatch {
  skill: string;
  matched: boolean;
  proficiency: 'Beginner' | 'Intermediate' | 'Expert';
  yearsOfExperience?: number;
  frequency?: number;
  category: string;
}

export interface CareerMatch {
  role: string;
  matchPercentage: number;
  keySkillsPresent: string[];
  missingSkills: string[];
}

export interface Course {
  title: string;
  provider: string;
  skillsCovered: string[];
  url: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
}

export interface ResumeAnalysis {
  score: ResumeScore;
  skillMatches: SkillMatch[];
  suggestions: string[];
  keywords: string[];
  careerMatches: CareerMatch[];
  experienceLevel: string;
  totalYearsOfExperience: number;
  recommendedCourses: Course[];
}