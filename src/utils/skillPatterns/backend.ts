export const BACKEND_PATTERNS = {
  'nodejs': /\b(node\.?js|express|nestjs|fastify|koa|hapi|microservices)\b/i,
  'python_backend': /\b(django|flask|fastapi|pyramid|tornado|aiohttp|uvicorn)\b/i,
  'databases': /\b(mongodb|mongoose|postgresql|mysql|redis|elasticsearch|cassandra)\b/i,
  'caching': /\b(redis|memcached|caching strategies|cache invalidation|distributed cache)\b/i,
  'graphql': /\b(graphql|apollo|prisma|hasura|type definitions|resolvers|schema)\b/i,
  'rest': /\b(rest|restful|api design|swagger|openapi|api documentation|postman)\b/i,
  'security': /\b(authentication|authorization|oauth|jwt|security best practices|csrf|xss)\b/i,
  'testing': /\b(unit testing|integration testing|e2e testing|jest|mocha|chai|supertest)\b/i,
  'deployment': /\b(docker|kubernetes|ci cd|jenkins|github actions|gitlab ci|aws)\b/i,
  'messaging': /\b(rabbitmq|kafka|message queue|pub sub|event driven|websockets|socket\.io)\b/i,
  'monitoring': /\b(logging|monitoring|prometheus|grafana|elk stack|apm|error tracking)\b/i,
  'performance': /\b(performance optimization|load balancing|caching|scaling|profiling|benchmarking)\b/i
};

export const BACKEND_WEIGHTS = {
  'nodejs': 1.8,
  'python_backend': 1.7,
  'databases': 1.7,
  'caching': 1.6,
  'graphql': 1.6,
  'rest': 1.7,
  'security': 1.7,
  'testing': 1.6,
  'deployment': 1.6,
  'messaging': 1.5,
  'monitoring': 1.5,
  'performance': 1.6
};