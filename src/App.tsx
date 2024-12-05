import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ScoreCard } from './components/ScoreCard';
import { SkillsAnalysis } from './components/SkillsAnalysis';
import { Suggestions } from './components/Suggestions';
import { CareerMatches } from './components/CareerMatches';
import { CourseRecommendations } from './components/CourseRecommendations';
import type { ResumeAnalysis } from './types';
import { analyzeResume } from './utils/resumeAnalyzer';

function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeResume(file);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error analyzing resume:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Resume Career Path Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume to get detailed insights about your skills, career matches, and personalized recommendations
          </p>
        </div>
        
        <div className="space-y-8">
          <FileUpload onFileUpload={handleFileUpload} />
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Analyzing your resume...</p>
            </div>
          )}
          
          {analysis && (
            <div className="space-y-8">
              <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg backdrop-blur-sm">
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Experience Level: {analysis.experienceLevel}
                </p>
                <p className="text-gray-600">
                  Total Years of Experience: {analysis.totalYearsOfExperience} years
                </p>
              </div>
              <ScoreCard score={analysis.score} />
              <CareerMatches matches={analysis.careerMatches} />
              <SkillsAnalysis skills={analysis.skillMatches} />
              <Suggestions suggestions={analysis.suggestions} />
              <CourseRecommendations courses={analysis.recommendedCourses} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;