export const FRONTEND_PATTERNS = {
  'javascript': /\b(javascript|js|es6|es2015|ecmascript|vanilla js|dom manipulation)\b/i,
  'typescript': /\b(typescript|ts|type system|interfaces|generics|type safety)\b/i,
  'react': /\b(react|reactjs|react hooks|redux|context api|next\.?js|gatsby)\b/i,
  'vue': /\b(vue|vuejs|vuex|vue router|nuxt\.?js|composition api|options api)\b/i,
  'angular': /\b(angular|angularjs|ng|rxjs|ngrx|angular material|angular universal)\b/i,
  'html': /\b(html|html5|semantic html|accessibility|wcag|aria|seo)\b/i,
  'css': /\b(css|css3|sass|less|tailwind|styled components|css modules|css in js)\b/i,
  'testing': /\b(jest|testing library|cypress|selenium|e2e testing|unit testing|integration testing)\b/i,
  'performance': /\b(performance|optimization|lazy loading|code splitting|bundling|webpack|vite)\b/i,
  'state_management': /\b(redux|mobx|recoil|zustand|state management|flux pattern)\b/i,
  'mobile': /\b(responsive design|mobile first|progressive web apps|pwa|react native|ionic)\b/i,
  'build_tools': /\b(webpack|vite|rollup|parcel|esbuild|babel|swc)\b/i
};

export const FRONTEND_WEIGHTS = {
  'javascript': 1.8,
  'typescript': 1.7,
  'react': 1.7,
  'vue': 1.6,
  'angular': 1.6,
  'html': 1.4,
  'css': 1.5,
  'testing': 1.6,
  'performance': 1.7,
  'state_management': 1.6,
  'mobile': 1.5,
  'build_tools': 1.5
};