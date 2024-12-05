import type { ResumeAnalysis } from '../types';
import { extractTextFromPDF } from './pdfExtractor';
import { calculateExperience, determineExperienceLevel } from './experienceAnalyzer';
import { calculateFormattingScore, calculateATSScore } from './formatAnalyzer';
import { extractSkillMatches, calculateSkillScore } from './skillMatcher';
import { analyzeCareerMatches } from './careerMatcher';
import { recommendCourses } from './courseRecommender';
import { generateSuggestions } from './suggestionGenerator';
import { validateFile } from './fileValidator';

export async function analyzeResume(file: File): Promise<ResumeAnalysis> {
  if (!file) {
    throw new Error('No file provided for analysis');
  }

  try {
    // Validate file first
    validateFile(file);

    // Extract text based on file type
    let text: string;
    try {
      text = file.type === 'application/pdf' 
        ? await extractTextFromPDF(file)
        : await file.text();
    } catch (error) {
      throw new Error(`Failed to extract text from file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Validate extracted text
    if (!text || text.trim().length === 0) {
      throw new Error('No readable content found in the uploaded file');
    }

    // Clean and normalize text
    const cleanText = text.toLowerCase().replace(/<[^>]*>?/gm, '');

    // Process resume components
    try {
      const experience = calculateExperience(cleanText);
      const skills = extractSkillMatches(cleanText);
      const careerMatches = analyzeCareerMatches(skills);
      
      const keywordScore = calculateSkillScore(skills);
      const formattingScore = calculateFormattingScore(cleanText);
      const atsScore = calculateATSScore(cleanText);

      const overall = Math.round(
        (keywordScore * 0.4) + (formattingScore * 0.3) + (atsScore * 0.3)
      );

      const score = {
        overall,
        keywords: Math.round(keywordScore),
        formatting: Math.round(formattingScore),
        atsCompatibility: Math.round(atsScore)
      };

      const recommendedCourses = recommendCourses(skills, careerMatches);
      const suggestions = generateSuggestions(cleanText, careerMatches, skills);

      return {
        score,
        skillMatches: skills,
        careerMatches,
        suggestions,
        keywords: skills.map(s => s.skill),
        experienceLevel: determineExperienceLevel(experience),
        totalYearsOfExperience: experience,
        recommendedCourses
      };
    } catch (error) {
      throw new Error(`Failed to analyze resume content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } catch (error) {
    // Ensure we're always throwing an Error object with a meaningful message
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during resume analysis';
    console.error('Resume analysis failed:', errorMessage);
    throw new Error(errorMessage);
  }
}