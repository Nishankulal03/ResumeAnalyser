export const JAVA_PATTERNS = {
  'java': /\b(java|jvm|j2ee|java ee|jakarta ee|core java|java se|java ee)\b/i,
  'spring': /\b(spring|spring boot|spring cloud|spring security|spring mvc|spring data|spring batch)\b/i,
  'hibernate': /\b(hibernate|jpa|orm|jdbc|database persistence|entity mapping)\b/i,
  'junit': /\b(junit|mockito|testing|test driven|tdd|integration testing|selenium)\b/i,
  'build_tools': /\b(maven|gradle|ant|build automation|dependency management|ci cd|jenkins)\b/i,
  'microservices': /\b(microservices|distributed systems|service mesh|api gateway|eureka|zuul|ribbon)\b/i,
  'containers': /\b(docker|kubernetes|k8s|containerization|container orchestration|openshift)\b/i,
  'cloud_java': /\b(aws|azure|gcp|cloud native|pcf|cloud foundry|heroku)\b/i,
  'messaging': /\b(kafka|rabbitmq|activemq|jms|message queue|event driven|pub sub)\b/i,
  'security': /\b(security|oauth|jwt|authentication|authorization|keycloak|identity)\b/i
};

export const JAVA_WEIGHTS = {
  'java': 1.8,
  'spring': 1.7,
  'hibernate': 1.6,
  'junit': 1.5,
  'build_tools': 1.5,
  'microservices': 1.7,
  'containers': 1.6,
  'cloud_java': 1.6,
  'messaging': 1.5,
  'security': 1.6
};