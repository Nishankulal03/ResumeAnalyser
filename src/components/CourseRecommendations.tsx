import { Course } from '../types';
import { ArrowTopRightOnSquareIcon, AcademicCapIcon, ClockIcon } from '@heroicons/react/24/outline';

interface CourseRecommendationsProps {
  courses: Course[];
}

export function CourseRecommendations({ courses }: CourseRecommendationsProps) {
  const handleCourseClick = (url: string, title: string) => {
    try {
      const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
      const sanitizedUrl = urlWithProtocol.trim();
      
      new URL(sanitizedUrl);
      const newWindow = window.open(sanitizedUrl, '_blank');
      
      if (newWindow === null) {
        window.location.href = sanitizedUrl;
      }
    } catch (error) {
      console.error('Course URL error:', error);
      alert(`Unable to open the course "${title}". Please try again later.`);
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 shadow-sm';
      case 'Intermediate':
        return 'bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 shadow-sm';
      case 'Advanced':
        return 'bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800 shadow-sm';
      default:
        return 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 shadow-sm';
    }
  };

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <AcademicCapIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Recommended Courses
          </h2>
        </div>
        <p className="text-gray-600">Based on your skills, we'll recommend relevant courses to help you grow.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <AcademicCapIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Recommended Courses
        </h2>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => handleCourseClick(course.url, course.title)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCourseClick(course.url, course.title);
              }
            }}
          >
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50" />
            
            {/* Content */}
            <div className="relative p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getLevelBadgeColor(course.level)}`}>
                  {course.level}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  {course.provider}
                </p>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                {course.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Skills You'll Learn
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.skillsCovered.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCourseClick(course.url, course.title);
                }}
                className="mt-6 group/button flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label={`View ${course.title} course`}
              >
                <span>Start Learning</span>
                <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}