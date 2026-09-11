// Repository audit supplied with the September 11 refinement request.
// No commit hashes were supplied; null explicitly means unknown, not latest HEAD.
export const skillAliases = {
  'React Native': ['react native', 'react-native'], React: ['react', 'reactjs', 'react.js'],
  'Next.js': ['next.js', 'nextjs', 'next js'], TypeScript: ['typescript'], JavaScript: ['javascript', 'ecmascript'],
  Expo: ['expo', 'expo sdk'], 'Expo Router': ['expo router'], 'React Navigation': ['react navigation'],
  AsyncStorage: ['asyncstorage', 'async storage'], HealthKit: ['healthkit'], SwiftUI: ['swiftui', 'swift ui'], Swift: ['swift'],
  Vite: ['vite'], Express: ['express', 'express.js', 'expressjs'], Node: ['node', 'node.js', 'nodejs'],
  PostgreSQL: ['postgresql', 'postgres'], PostGIS: ['postgis'], MapLibre: ['maplibre'],
  'Chrome Extension': ['chrome extension', 'chrome extensions', 'browser extension'], 'Manifest V3': ['manifest v3', 'manifest version 3', 'mv3'],
  Electron: ['electron'], 'Three.js': ['three.js', 'threejs'], 'PDF.js': ['pdf.js', 'pdfjs'], OCR: ['ocr', 'tesseract'],
  Python: ['python'], FastAPI: ['fastapi'], MongoDB: ['mongodb', 'mongo'], Firebase: ['firebase'],
  Docker: ['docker', 'containers', 'containerization'], Kubernetes: ['kubernetes', 'k8s'], kind: ['kind kubernetes', 'kind cluster'],
  'GitHub Actions': ['github actions', 'ci/cd', 'continuous integration'], Linux: ['linux'],
  Tailwind: ['tailwind', 'tailwindcss'], CSS: ['css', 'css3'], 'REST API': ['rest api', 'rest apis', 'restful'],
  'Claude API': ['claude', 'claude api'], LLM: ['llm', 'large language model'], AI: ['ai', 'artificial intelligence'],
  Statcast: ['statcast'], NextAuth: ['nextauth', 'next-auth'], SQL: ['sql'],
  Java: ['java'], Go: ['golang', 'go'], Rust: ['rust'], AWS: ['aws', 'amazon web services'], Angular: ['angular'], '.NET': ['.net', 'c#', 'dotnet'], Ruby: ['ruby', 'rails'],
};
export const roleAliases = {
  mobile: ['mobile', 'ios', 'native', 'iphone', 'android'], frontend: ['frontend', 'front-end', 'web', 'website'],
  backend: ['backend', 'back-end', 'database'], infrastructure: ['devops', 'infrastructure', 'deployment'],
  mapping: ['maps', 'mapping', 'geospatial', 'parking'], health: ['fitness', 'health', 'nutrition'],
  commerce: ['commerce', 'storefront', 'shopping'], analytics: ['analytics', 'analysis'],
};
const web = ['Next.js', 'React', 'TypeScript', 'Tailwind'];
const record = (canonicalSkills, supportingTechnologies, capabilities, notes = '') => ({
  verified: true, canonicalSkills, supportingTechnologies, capabilities, notes,
  aliases: Object.fromEntries([...canonicalSkills, ...supportingTechnologies].map(s => [s, skillAliases[s] || [s.toLowerCase()]])),
  evidenceSource: 'User-supplied repository audit findings, September 11, 2026',
  recordedAt: '2026-09-11', auditDate: null, auditCommit: null,
});
export const projectEvidence = {
  PrizeCheck: record([...web, 'Firebase', 'GitHub Actions', 'Docker', 'Kubernetes', 'Linux'], ['kind'], ['frontend', 'infrastructure'], 'Kubernetes runs locally through kind; production remains Vercel.'),
  'DraftKings NBA Optimizer': record(web, ['Python'], ['frontend', 'analytics'], 'The analyst is a local recommendation engine, not an LLM.'),
  'Amazon Room Generator': record([...web, 'Three.js', 'PDF.js', 'OCR'], [], ['frontend', 'commerce']),
  FunkFit: record(['React Native', 'Expo', 'TypeScript', 'Expo Router', 'React Navigation', 'AsyncStorage', 'HealthKit'], [], ['mobile', 'health'], 'Expo SDK 54; native mobile APIs.'),
  CareCation: {...record([], [], []), verified: false, evidenceSource: 'Existing display metadata only; no repository URL supplied.'},
  'backstop.ai': record([...web, 'FastAPI', 'Python', 'PostgreSQL', 'Claude API'], ['Statcast'], ['frontend', 'backend', 'analytics'], 'Claude API and Statcast/ML tooling.'),
  ParkNYC: record(['SwiftUI', 'React', 'Vite', 'TypeScript', 'Express', 'PostgreSQL', 'PostGIS', 'MapLibre', 'REST API'], [], ['mobile', 'frontend', 'backend', 'mapping']),
  'Contessa Shop': record(web, [], ['frontend', 'commerce']),
  'Concrete Jungle Sports': record(web, [], ['frontend']),
  'Hudson Chess': record(['React', 'JavaScript', 'Vite', 'CSS'], [], ['frontend'], 'Vercel serverless functions.'),
  Dragapultist: record([...web, 'MongoDB', 'NextAuth'], ['Electron'], ['frontend', 'analytics']),
  'Marketplace Chrome Extension': record(['JavaScript', 'Chrome Extension', 'Manifest V3'], [], ['commerce'], 'Vanilla JavaScript; content scripts and tabs; Amazon/Facebook Marketplace integration.'),
  'Chess Opening Driller': record(web, [], ['frontend']),
};
