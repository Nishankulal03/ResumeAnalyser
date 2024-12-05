export const COMMON_PATTERNS = {
  'git': /\b(git|github|gitlab|version control)\b/i,
  'docker': /\b(docker|container|containerization)\b/i,
  'kubernetes': /\b(kubernetes|k8s|container orchestration)\b/i,
  'ci_cd': /\b(ci\/cd|continuous integration|continuous deployment)\b/i,
  'agile': /\b(agile|scrum|kanban)\b/i,
  'testing': /\b(unit testing|integration testing|test automation)\b/i,
};

export const COMMON_WEIGHTS = {
  'git': 1.0,
  'docker': 1.2,
  'kubernetes': 1.3,
  'ci_cd': 1.2,
  'agile': 1.0,
  'testing': 1.2,
};