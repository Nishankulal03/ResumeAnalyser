import { CareerMatch } from '../types';
import { BriefcaseIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface CareerMatchesProps {
  matches: CareerMatch[];
}

export function CareerMatches({ matches }: CareerMatchesProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-blue-500 to-indigo-600';
    return 'from-amber-500 to-orange-600';
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <BriefcaseIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Career Path Analysis
        </h2>
      </div>

      <div className="space-y-6">
        {matches.map((match, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-gray-100 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 opacity-50" />
            
            {/* Content */}
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{match.role}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 relative">
                    {/* Circular progress bar */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={175.93}
                        strokeDashoffset={175.93 * (1 - match.matchPercentage / 100)}
                        className={`text-transparent bg-gradient-to-r ${getMatchColor(match.matchPercentage)}`}
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold">{match.matchPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    Present Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {match.keySkillsPresent.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {match.missingSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Skills to Develop
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {match.missingSkills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200 shadow-sm group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}