import { DATA_ANALYSIS_PATTERNS, DATA_ANALYSIS_WEIGHTS } from './dataAnalysis';
import { DATA_ENGINEERING_PATTERNS, DATA_ENGINEERING_WEIGHTS } from './dataEngineering';
import { FRONTEND_PATTERNS, FRONTEND_WEIGHTS } from './frontend';
import { BACKEND_PATTERNS, BACKEND_WEIGHTS } from './backend';
import { JAVA_PATTERNS, JAVA_WEIGHTS } from './java';
import { COMMON_PATTERNS, COMMON_WEIGHTS } from './common';

export const SKILL_PATTERNS = {
  ...DATA_ANALYSIS_PATTERNS,
  ...DATA_ENGINEERING_PATTERNS,
  ...FRONTEND_PATTERNS,
  ...BACKEND_PATTERNS,
  ...JAVA_PATTERNS,
  ...COMMON_PATTERNS,
};

export const SKILL_WEIGHTS = {
  ...DATA_ANALYSIS_WEIGHTS,
  ...DATA_ENGINEERING_WEIGHTS,
  ...FRONTEND_WEIGHTS,
  ...BACKEND_WEIGHTS,
  ...JAVA_WEIGHTS,
  ...COMMON_WEIGHTS,
};

export const SKILL_CATEGORIES = {
  'Data Analysis': Object.keys(DATA_ANALYSIS_PATTERNS),
  'Data Engineering': Object.keys(DATA_ENGINEERING_PATTERNS),
  'Frontend Development': Object.keys(FRONTEND_PATTERNS),
  'Backend Development': Object.keys(BACKEND_PATTERNS),
  'Java Development': Object.keys(JAVA_PATTERNS),
  'Common Skills': Object.keys(COMMON_PATTERNS),
};