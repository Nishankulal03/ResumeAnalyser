import { SkillMatch } from '../types';
import { CheckCircleIcon, XCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface SkillsAnalysisProps {
  skills: SkillMatch[];
}

export function SkillsAnalysis({ skills }: SkillsAnalysisProps) {
  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'Expert':
        return 'bg-gradient-to-r from-green-200 to-emerald-300 text-emerald-800 shadow-sm';
      case 'Intermediate':
        return 'bg-gradient-to-r from-blue-200 to-cyan-300 text-blue-800 shadow-sm';
      default:
        return 'bg-gradient-to-r from-amber-200 to-yellow-300 text-amber-800 shadow-sm';
    }
  };

  const getProficiencyBar = (proficiency: string) => {
    switch (proficiency) {
      case 'Expert':
        return 'w-full';
      case 'Intermediate':
        return 'w-2/3';
      default:
        return 'w-1/3';
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, SkillMatch[]>);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <ChartBarIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Skills Analysis
        </h2>
      </div>
      
      <div className="space-y-8">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 pl-4 border-l-4 border-blue-500">
              {category}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categorySkills.map((skill, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-lg border border-gray-100 relative overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 opacity-50" />
                  
                  {/* Content */}
                  <div className="relative space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {skill.matched ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                        <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-3 py-1 rounded-full ${getProficiencyColor(skill.proficiency)}`}>
                          {skill.proficiency}
                        </span>
                        {skill.yearsOfExperience && (
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            {skill.yearsOfExperience}y exp
                          </span>
                        )}
                      </div>

                      {/* Proficiency bar */}
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getProficiencyBar(skill.proficiency)} bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:opacity-80`}
                        />
                      </div>
                    </div>

                    {skill.frequency && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span className="font-medium">Mentions:</span>
                        <div className="flex gap-0.5">
                          {[...Array(Math.min(skill.frequency, 5))].map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-80"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}