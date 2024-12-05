import { Course, SkillMatch, CareerMatch } from '../types';

interface CourseCategory {
  patterns: RegExp[];
  courses: Course[];
}

const COURSE_CATEGORIES: Record<string, CourseCategory> = {
  'Data Analyst': {
    patterns: [/python|sql|statistics|tableau|excel|data analysis/i],
    courses: [
      {
        title: 'Data Analysis with Python',
        provider: 'Coursera',
        skillsCovered: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'],
        url: 'https://www.coursera.org/learn/data-analysis-with-python',
        level: 'Advanced',
        duration: '12 weeks',
        description: 'Master data analysis using Python and its powerful libraries.'
      },
      {
        title: 'SQL for Data Analysis',
        provider: 'Udacity',
        skillsCovered: ['SQL', 'Database Design', 'Data Analysis', 'Reporting'],
        url: 'https://www.udacity.com/course/sql-for-data-analysis--ud198',
        level: 'Intermediate',
        duration: '8 weeks',
        description: 'Learn SQL for effective data analysis and reporting.'
      },
      {
        title: 'Data Visualization with Tableau',
        provider: 'Coursera',
        skillsCovered: ['Tableau', 'Data Visualization', 'Dashboard Design', 'Analytics'],
        url: 'https://www.coursera.org/learn/data-visualization-tableau',
        level: 'Intermediate',
        duration: '6 weeks',
        description: 'Create impactful visualizations with Tableau.'
      }
    ]
  },
  'Data Engineer': {
    patterns: [/spark|hadoop|etl|airflow|kafka|data pipeline/i],
    courses: [
      {
        title: 'Data Engineering with Spark',
        provider: 'Coursera',
        skillsCovered: ['Spark', 'PySpark', 'Data Processing', 'ETL'],
        url: 'https://www.coursera.org/learn/spark-data-engineering',
        level: 'Advanced',
        duration: '10 weeks',
        description: 'Build scalable data pipelines with Apache Spark.'
      },
      {
        title: 'AWS Data Engineering',
        provider: 'Coursera',
        skillsCovered: ['AWS', 'ETL', 'Data Lakes', 'Data Warehousing'],
        url: 'https://www.coursera.org/learn/aws-data-engineering',
        level: 'Advanced',
        duration: '12 weeks',
        description: 'Master data engineering on AWS platform.'
      },
      {
        title: 'Apache Airflow Fundamentals',
        provider: 'Udemy',
        skillsCovered: ['Airflow', 'DAGs', 'Pipeline Orchestration', 'Python'],
        url: 'https://www.udemy.com/course/apache-airflow-fundamentals',
        level: 'Intermediate',
        duration: '8 weeks',
        description: 'Learn data pipeline orchestration with Airflow.'
      }
    ]
  },
  'Frontend Developer': {
    patterns: [/react|vue|angular|javascript|typescript|html|css/i],
    courses: [
      {
        title: 'Advanced React Patterns',
        provider: 'Udemy',
        skillsCovered: ['React', 'TypeScript', 'Performance', 'State Management'],
        url: 'https://www.udemy.com/course/advanced-react-patterns',
        level: 'Advanced',
        duration: '8 weeks',
        description: 'Master advanced React patterns and concepts.'
      },
      {
        title: 'Modern JavaScript',
        provider: 'Udemy',
        skillsCovered: ['JavaScript', 'ES6+', 'Async Programming', 'Web APIs'],
        url: 'https://www.udemy.com/course/modern-javascript',
        level: 'Intermediate',
        duration: '10 weeks',
        description: 'Deep dive into modern JavaScript development.'
      },
      {
        title: 'TypeScript Masterclass',
        provider: 'Udemy',
        skillsCovered: ['TypeScript', 'Type System', 'Advanced Types', 'Best Practices'],
        url: 'https://www.udemy.com/course/typescript-masterclass',
        level: 'Advanced',
        duration: '6 weeks',
        description: 'Master TypeScript for large-scale applications.'
      }
    ]
  },
  'Backend Developer': {
    patterns: [/node\.?js|express|mongodb|sql|api|rest/i],
    courses: [
      {
        title: 'Node.js Advanced Concepts',
        provider: 'Udemy',
        skillsCovered: ['Node.js', 'Performance', 'Security', 'Architecture'],
        url: 'https://www.udemy.com/course/advanced-node',
        level: 'Advanced',
        duration: '12 weeks',
        description: 'Master advanced Node.js concepts and patterns.'
      },
      {
        title: 'API Design in Node.js',
        provider: 'Coursera',
        skillsCovered: ['API Design', 'REST', 'GraphQL', 'Security'],
        url: 'https://www.coursera.org/learn/api-design',
        level: 'Advanced',
        duration: '8 weeks',
        description: 'Learn professional API design and implementation.'
      },
      {
        title: 'MongoDB Performance',
        provider: 'MongoDB University',
        skillsCovered: ['MongoDB', 'Database Design', 'Optimization', 'Indexing'],
        url: 'https://learn.mongodb.com/learning-paths/mongodb-performance',
        level: 'Advanced',
        duration: '6 weeks',
        description: 'Optimize MongoDB for high-performance applications.'
      }
    ]
  },
  'Java Developer': {
    patterns: [/java|spring|hibernate|junit|maven/i],
    courses: [
      {
        title: 'Spring Framework 6',
        provider: 'Udemy',
        skillsCovered: ['Spring', 'Spring Boot', 'Microservices', 'Security'],
        url: 'https://www.udemy.com/course/spring-framework-6-beginner-to-guru',
        level: 'Advanced',
        duration: '12 weeks',
        description: 'Master Spring Framework 6 and Spring Boot 3.'
      },
      {
        title: 'Java Testing Masterclass',
        provider: 'Udemy',
        skillsCovered: ['JUnit', 'Mockito', 'TDD', 'Integration Testing'],
        url: 'https://www.udemy.com/course/testing-java',
        level: 'Advanced',
        duration: '8 weeks',
        description: 'Comprehensive testing strategies for Java applications.'
      },
      {
        title: 'Java Microservices',
        provider: 'Coursera',
        skillsCovered: ['Microservices', 'Spring Cloud', 'Docker', 'Kubernetes'],
        url: 'https://www.coursera.org/learn/java-microservices',
        level: 'Advanced',
        duration: '10 weeks',
        description: 'Build scalable microservices with Spring Cloud.'
      }
    ]
  }
};

// Rest of the file remains unchanged
export function recommendCourses(skills: SkillMatch[], careerMatches: CareerMatch[]): Course[] {
  const recommendations = new Set<Course>();
  
  // Get top career match with highest percentage
  const topCareer = careerMatches.reduce((prev, current) => 
    (current.matchPercentage > prev.matchPercentage) ? current : prev
  );

  if (topCareer) {
    const category = COURSE_CATEGORIES[topCareer.role];
    if (category) {
      // Prioritize courses that cover missing skills
      const missingSkillsPattern = new RegExp(topCareer.missingSkills.join('|'), 'i');
      
      // First, add courses that cover missing skills
      category.courses.forEach(course => {
        if (course.skillsCovered.some(skill => missingSkillsPattern.test(skill))) {
          recommendations.add(course);
        }
      });

      // Then, add advanced courses for existing skills
      const expertSkills = skills.filter(s => s.proficiency === 'Expert');
      expertSkills.forEach(skill => {
        category.courses.forEach(course => {
          if (course.level === 'Advanced' && 
              course.skillsCovered.some(s => new RegExp(skill.skill, 'i').test(s))) {
            recommendations.add(course);
          }
        });
      });

      // Fill remaining slots with other relevant courses
      category.courses.forEach(course => {
        if (recommendations.size < 3) {
          recommendations.add(course);
        }
      });
    }
  }

  return Array.from(recommendations).slice(0, 3);
}