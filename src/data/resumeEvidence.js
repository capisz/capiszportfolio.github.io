// Transcribed from public/assets/christopher-capizzuto-resume.pdf.
// Refresh this profile when the user supplies a replacement résumé.
const demonstrated = ['React','Next.js','TypeScript','Node','PostgreSQL','PostGIS','SwiftUI','Tailwind','REST API','MongoDB','Electron','Python','AI','FastAPI','React Native','Docker','Kubernetes','GitHub Actions','Claude API','Playwright'];
const listed = ['JavaScript','HTML','Swift','CSS','Firebase','SQL','Expo','Express','Webpack','Vite','Mongoose','Redis','Supabase','Azure','C++','PyTorch','Google Gemini','Cursor','Codex','AWS','Lambda','Vercel','Cloudflare','Linux','Ubuntu','Figma','Blender','Canva','Framer','Lottie','LottieLab','Git','GitHub','Xcode','Visual Studio','Postman','Vitest','XCUITest','Firebase Emulator Suite','Webhooks'];
export const resumeEvidence = Object.fromEntries([
  ...demonstrated.map(skill=>[skill,{score:95,label:'Demonstrated in résumé projects'}]),
  ...listed.map(skill=>[skill,{score:90,label:'Listed in résumé skills or coursework'}]),
]);
export function assessResume(requested) {
  const skills=requested.map(skill=>({skill,...(resumeEvidence[skill]||{score:null,label:'Not mentioned in current résumé'})}));
  return {
    skills,
    score:skills.length?Math.round(skills.reduce((sum,item)=>sum+(item.score??0),0)/skills.length):null,
    covered:skills.filter(item=>item.score!==null).length,
  };
}
