import { JobRole } from '../types';

interface JobRecommendationsProps {
  jobs: JobRole[];
}

export function JobRecommendations({ jobs }: JobRecommendationsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recommended Job Roles</h2>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {job.matchPercentage}% Match
              </span>
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}